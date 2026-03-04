import { data, Link } from "react-router-dom";
import Header from "../modules/Header.jsx";
import { useState } from "react";
import axios from "axios";
import { catchErrors, PasswordState } from "../App.jsx";

const typePassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?-])(?=\S+$).{6,}$/
const oneBigChar = /(?=[A-Z])./
const oneSpecChar = /(?=[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?-])./
const oneNumber = /(?=\d)./
const typeEmail = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
const typeUserName = /\s/
const ekezetes = /(?=[öüóőúáűéíÍÉÁŰŐÚÖÜÓ])./

async function POSTToMainPage(url, adatok, isLogin) {
    try {
        const { status, data } = await axios.post(url, adatok)
        alert(data.message)
        if (status == 200 || status == 201) {
            sessionStorage.setItem("username", data.value)
            localStorage.removeItem("jwt")
            localStorage.setItem("jwt", data.token)
            const body = {
                userName: data.value,
                isLogin: isLogin
            }
            await axios.post("https://localhost:7159/api/SendMail/ByUserName", body)
            location.assign("/fooldal")
        }
    }
    catch (error) {
        catchErrors(error)

    }

}

async function RegistOrLogin(userName, email, password, isLogin) {
    let url = ""
    let body = null
    let isApproved = false;
    if (isLogin) {
        url = "https://localhost:7159/auth/login"
        body = {
            userName: userName,
            password: password
        }

        if (password.search(typePassword) == -1 || userName.search(typeUserName) > -1) {
            return
        }

        isApproved = true
    }

    else {
        url = "https://localhost:7159/auth/register"
        body = {
            userName: userName,
            password: password,
            email: email
        }

        if (email.search(typeEmail) == -1 || password.search(typePassword) == -1 || userName.search(typeUserName) > -1) {
            return
        }
        isApproved = true
    }

    if (isApproved) {
        POSTToMainPage(url, body, isLogin)
    }
}


export const checkEmail = (getEmail) => {
    if (getEmail.search(typeEmail) != -1) {
        return true;
    }
    else {
        return false;
    }
}

export const CheckPassword = (getPassword) => {
    const currentpasswordState = new PasswordState()
    currentpasswordState.isMinLength = (getPassword.length >= 6 ? true : false)
    currentpasswordState.isOneNumber = (getPassword.search(oneNumber) > -1 ? true : false)
    currentpasswordState.isOneBigChar = (getPassword.search(oneBigChar) > -1 ? true : false)
    currentpasswordState.isOneSpecChar = (getPassword.search(oneSpecChar) > -1 ? true : false)
    return currentpasswordState;
}

export function RegistrationOrLoginForm() {
    const [isLogin, setLogin] = useState(true)

    const [passwordState, setPasswordState] = useState(new PasswordState())

    const [userNameState, setUserNameState] = useState({ isNoSpace: false, isNotEkezetes: false })

    const [emailState, setEmailState] = useState(false)

    const CheckUserName = (getUserName) => {
        const currentUserNameState = {
            isNoSpace: (getUserName.search(typeUserName) == -1 ? true : false),
            isNotEkezetes: (getUserName.search(ekezetes) == -1 ? true : false)
        }
        setUserNameState(currentUserNameState)
    }

    const ChangeForm = (isLogin) => {
        if (isLogin) {
            setLogin(false)
        } else {
            setLogin(true)
        }
    }

    const SubmitEvent = (event, formIs) => {
        event.preventDefault()
        event.persist()

        const userName = event.target.userName.value
        const email = event.target.email.value
        const password = event.target.password.value

        RegistOrLogin(userName, email, password, formIs)
    }



    return (
        <>
            <Header />
            <div className="container reg">
                <h1>{isLogin ? "Bejelentkezés" : "Regisztráció"}</h1>
                <form method="post" id="form" onSubmit={(event) => { SubmitEvent(event, isLogin) }}>
                    <label>Felhasználónév</label>
                    <input className="mb-3 form-control" type="text" name="userName" id="userName" onChange={(event) => { CheckUserName(event.target.value) }} /><br />
                    <p><i className={userNameState.isNoSpace ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Nincsen benne szóköz</p>
                    <p><i className={userNameState.isNotEkezetes ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Nincsen benne ékezet</p>
                    <label>E-mail-cím</label>
                    <input className="mb-3 form-control" type="email" name="email" disabled={isLogin ? true : false} id="userEmail" onChange={(event) => { setEmailState(checkEmail(event.target.value)) }} /><br />
                    {!isLogin ? <p><i className={emailState ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Helyes e-mail cím</p> : <></>}
                    <label>Jelszó</label>
                    <input className="mb-3 form-control" type="password" name="password" id="userPassword"
                        onChange={(event) => { setPasswordState(CheckPassword(event.target.value)) }} />
                    <p className={passwordState.isMinLength ? "text-success" : "text-danger"}><i className={passwordState.isMinLength ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 6 karakter hosszú</p>
                    <p className={passwordState.isOneBigChar ? "text-success" : "text-danger"}><i className={passwordState.isOneBigChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 nagy karakter</p>
                    <p className={passwordState.isOneNumber ? "text-success" : "text-danger"}><i className={passwordState.isOneNumber ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 szám</p>
                    <p className={passwordState.isOneSpecChar ? "text-success" : "text-danger"}><i className={passwordState.isOneSpecChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 speciális karakter</p>
                    <div className="regDiv">
                        <button type="submit" className="btn btn-primary regGomb" id="gomb">{isLogin ? "Bejelentkezés" : "Regisztráció"}</button>
                        <Link to="/" onClick={() => ChangeForm(isLogin)} className="regLink">{isLogin ? "Még nincs fiókod?" : "Már van fiókod?"}</Link>
                    </div>
                </form>
            </div>
        </>
    )

}