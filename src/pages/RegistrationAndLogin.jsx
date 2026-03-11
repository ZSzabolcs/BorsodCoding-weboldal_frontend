import { Link } from "react-router-dom";
import Header from "../modules/Header.jsx";
import { useState } from "react";
import axios from "axios";
import { catchErrors, checkStates, PasswordState } from "../App.jsx";

const typePassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?-])(?=\S+$).{6,}$/
const oneBigChar = /(?=[A-Z])./
const oneSpecChar = /(?=[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?-])./
const oneNumber = /(?=\d)./
const typeEmail = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
const typeUserName = /\s/
const ekezetes = /(?=[öüóőúáűéíÍÉÁŰŐÚÖÜÓ])./


export const checkEmail = (getEmail) => {
    if (getEmail.search(typeEmail) != -1) {
        return true;
    }
    else {
        return false;
    }
}

export const checkIsMinLengthReached = (getPassword) => {
    if (getPassword.length >= 6){
        return true;
    }
    else{
        return false;
    }
}

export const checkIsOneNumber = (getPassword) => {
    if (getPassword.search(oneNumber) > -1){
        return true;
    }
    else{
        return false;
    }
}

export const checkIsOneBigChar = (getPassword) => {
    if (getPassword.search(oneBigChar) > -1){
        return true;
    }
    else{
        return false;
    }
}

export const checkIsOneSpecChar = (getPassword) => {
    if (getPassword.search(oneSpecChar) > -1){
        return true;
    }
    else{
        return false;
    }
}

export const CheckPassword = (getPassword) => {
    const currentpasswordState = new PasswordState()
    currentpasswordState.isMinLengthReached = checkIsMinLengthReached(getPassword);
    currentpasswordState.isOneNumber = checkIsOneNumber(getPassword)
    currentpasswordState.isOneBigChar = checkIsOneBigChar(getPassword)
    currentpasswordState.isOneSpecChar = checkIsOneBigChar(getPassword)
    return currentpasswordState;
}

export function RegistrationOrLoginForm() {
    const [isLogin, setLogin] = useState(true)
    const [firstPasswordState, setFirstPasswordState] = useState(new PasswordState())
    const [secondPasswordState, setSecondPasswordState] = useState(null)
    const [userNameState, setUserNameState] = useState({ isNoSpace: false, isNotEkezetes: false })
    const [emailState, setEmailState] = useState(null)

    const CheckUserName = (getUserName) => {
        const currentUserNameState = {
            isNoSpace: (getUserName.search(typeUserName) == -1 ? true : false),
            isNotEkezetes: (getUserName.search(ekezetes) == -1 ? true : false)
        }
        setUserNameState(currentUserNameState)
    }

    const ChangeForm = () => {
        if (isLogin) {
            setLogin(false)
            setEmailState(false)
            setSecondPasswordState(new PasswordState())
        } else {
            setLogin(true)
            setEmailState(null)
            setSecondPasswordState(null)
        }
    }

    const POSTToMainPage = async (url, adatok) => {
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

    const RegistOrLogin = (getInputs) => {
        let url = ""
        let body = null
        if (isLogin) {
            url = "https://localhost:7159/auth/login"
            body = {
                userName: getInputs.userName,
                password: getInputs.password
            }

        }

        else {
            url = "https://localhost:7159/auth/register"
            body = {
                userName: getInputs.userName,
                password: getInputs.password,
                email: getInputs.email
            }

        }

        POSTToMainPage(url, body)

    }

    const SubmitEvent = (event) => {
        event.preventDefault()
        event.persist()

        const userName = event.target.userName.value
        const email = event?.target?.email?.value
        const password1 = event.target.passwordOne.value

        const inputs = {
            userName: userName,
            email: email,
            password: password1
        }

        RegistOrLogin(inputs)
    }

    const states = { userNameState, emailState, firstPasswordState, secondPasswordState }
    const { isNoSpace, isNotEkezetes } = userNameState

    return (
        <>
            <Header />
            <div className="container reg">
                <h1>{isLogin ? "Bejelentkezés" : "Regisztráció"}</h1>
                <form method="post" id="form" onSubmit={(event) => { SubmitEvent(event, isLogin) }}>
                    <label>Felhasználónév</label>
                    <input className="mb-3 form-control" type="text" name="userName" placeholder='Felhasználónév' id="userName" onChange={(event) => { CheckUserName(event.target.value) }} /><br />
                    <p><i className={isNoSpace ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Nincsen benne szóköz</p>
                    <p><i className={isNotEkezetes ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Nincsen benne ékezet</p>
                    {!isLogin ?
                        <>
                            <label>E-mail-cím</label>
                            <input className="mb-3 form-control" type="email" placeholder='E-mail-cím' name="email" id="userEmail" onChange={(event) => { setEmailState(checkEmail(event.target.value)) }} /><br />
                            <p><i className={emailState ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Helyes e-mail cím</p>
                        </> : <></>}
                    <label>Jelszó</label>
                    <input className="mb-3 form-control" type="password" placeholder='Jelszó' name="passwordOne" id="userPassword"
                        onChange={(event) => { setFirstPasswordState(CheckPassword(event.target.value)) }} />
                    <p className={firstPasswordState.isMinLength ? "text-success" : "text-danger"}><i className={firstPasswordState.isMinLength ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 6 karakter hosszú</p>
                    <p className={firstPasswordState.isOneBigChar ? "text-success" : "text-danger"}><i className={firstPasswordState.isOneBigChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 nagy karakter</p>
                    <p className={firstPasswordState.isOneNumber ? "text-success" : "text-danger"}><i className={firstPasswordState.isOneNumber ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 szám</p>
                    <p className={firstPasswordState.isOneSpecChar ? "text-success" : "text-danger"}><i className={firstPasswordState.isOneSpecChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 speciális karakter</p>
                    {!isLogin ?
                        <>
                            <label>Jelszó ismétlése</label>
                            <input className="mb-3 form-control" type="password" placeholder='Jelszó újra' name="passwordTwo" id="userPasswordAgain"
                                onChange={(event) => { setSecondPasswordState(CheckPassword(event.target.value)) }} />
                            <p className={secondPasswordState.isMinLength ? "text-success" : "text-danger"}><i className={secondPasswordState.isMinLength ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 6 karakter hosszú</p>
                            <p className={secondPasswordState.isOneBigChar ? "text-success" : "text-danger"}><i className={secondPasswordState.isOneBigChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 nagy karakter</p>
                            <p className={secondPasswordState.isOneNumber ? "text-success" : "text-danger"}><i className={secondPasswordState.isOneNumber ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 szám</p>
                            <p className={secondPasswordState.isOneSpecChar ? "text-success" : "text-danger"}><i className={secondPasswordState.isOneSpecChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 speciális karakter</p>
                        </>
                        :
                        <></>}
                    <div className="regDiv">
                        <button type="submit" disabled={checkStates(states)} className="btn btn-primary regGomb" id="gomb">{isLogin ? "Bejelentkezés" : "Regisztráció"}</button>
                        <Link to="/" onClick={() => { ChangeForm(); }} className="regLink">{isLogin ? "Még nincs fiókod?" : "Már van fiókod?"}</Link>
                    </div>
                </form>
            </div>
        </>
    )

}