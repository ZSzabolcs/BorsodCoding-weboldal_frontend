import { Link } from "react-router-dom";
import Header from "../modules/Header.jsx";
import { useState } from "react";
import axios from "axios";
import { JWTToken } from "../App.jsx";

const typePassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?-])(?=\S+$).{6,}$/
const oneBigChar = /(?=[A-Z])./
const oneSpecChar = /(?=[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?-])./
const oneNumber = /(?=\d)./
const typeEmail = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
const typeUserName = /\s/

async function POSTToMainPage(url, data, isLogin) {
    try{
    const response = await axios.post(url, data)
    alert(response.data.message)
    
    if (response.status == 200 || response.status == 201) {
        sessionStorage.setItem("username", response.data.value)
        localStorage.removeItem("jwt")
        localStorage.setItem("jwt", response.data.token)
        const body = {
            userName: response.data.value,
            isLogin: isLogin
        }
        await axios.post("https://localhost:7159/api/SendMail/ByUserName", body)
        location.assign("/fooldal")
    }

    }
    catch(error){
        alert(error)
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
        console.log(body)
        if (email.search(typeEmail) == -1 || password.search(typePassword) == -1 || userName.search(typeUserName) > -1) {
            return
        }
        isApproved = true
    }

    if (isApproved) {
        await POSTToMainPage(url, body, isLogin)
    }
}




export function RegistrationOrLoginForm() {
    const [isLogin, setLogin] = useState(true)

    const [passwordState, setPasswordState] = useState({
        isMinLength: false,
        isOneNumber: false,
        isOneBigChar: false,
        isOneSpecChar: false
    })

    const [userNameState, setUserNameState] = useState(false)

    const CheckUserName = (getUserName) => {
        let userNameState = false;
        if (getUserName.search(typeUserName) == -1) {
            userNameState = true;
        }
        setUserNameState(userNameState)
    }

    const CheckPassword = (getPassword) => {
        const currentpasswordState = {
            isMinLength: (getPassword.length >= 6 ? true : false),
            isOneNumber: (getPassword.search(oneNumber) > -1 ? true : false),
            isOneBigChar: (getPassword.search(oneBigChar) > -1 ? true : false),
            isOneSpecChar: (getPassword.search(oneSpecChar) > -1 ? true : false)
        }
                        
        setPasswordState(currentpasswordState)
    }

    const ChangeForm = (isLogin) => {
        if(isLogin) {
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

   return(
            <>
            <Header />
            <div className="container reg">
                <form method="post" id="form"
                    onSubmit={(event) => {SubmitEvent(event, isLogin)}}>
                    <label>Felhasználónév</label>
                    <input className="mb-3 form-control" type="text" name="userName" id="userName" onChange={(event) => {CheckUserName(event.target.value)}} /><br />
                    <p><i className={userNameState ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Nincsen benne szóköz</p>
                    <label>E-mail-cím</label>
                    <input className="mb-3 form-control" type="email" name="email" disabled={isLogin ? true : false} id="userEmail" /><br />
                    <label>Jelszó</label>
                    <input className="mb-3 form-control" type="password" name="password" id="userPassword"
                        onChange={(event) => {CheckPassword(event.target.value)}} />
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


