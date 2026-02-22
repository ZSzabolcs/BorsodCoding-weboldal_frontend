import { Link } from "react-router-dom";
import Header from "../modules/Header.jsx";
import { useState } from "react";
import axios from "axios";

const typePassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?-])(?=\S+$).{6,}$/
const oneBigChar = /(?=[A-Z])./
const oneSpecChar = /(?=[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?-])./
const oneNumber = /(?=\d)./
const typeEmail = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
const typeUserName = /\s/

async function POSTToMainPage(url, data) {
    try{
    const response = await axios.post(url, data)
    alert(response.data.message)
    
    if (response.status == 200 || response.status == 201) {
        sessionStorage.setItem("username", response.data.value)
        localStorage.removeItem("jwt")
        localStorage.setItem("jwt", response.data.token)
        location.assign("/fooldal")

    }

    }
    catch(error){
        alert(error)
    }
}

async function RegistOrLogin(userName, email, password, mode) {
    let url = ""
    let body = null
    if (mode === "login") {
        url = "https://localhost:7159/auth/login"
        body = {
            userName: userName,
            password: password
        }

        if (password.search(typePassword) == -1 || userName.search(typeUserName) > -1) {
            return
        }

        await POSTToMainPage(url, body)
    }

    if (mode === "regist") {
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

        await POSTToMainPage(url, body)
    }
}

export function Registration() {
    const [passwordState, setPasswordState] = useState({
        isMinLength: false,
        isOneNumber: false,
        isOneBigChar: false,
        isOneSpecChar: false
    })
    return (
        <>
            <Header />
            <div className="container reg">
                <form method="post" id="form" onSubmit={(event) => {
                    event.preventDefault()
                    event.persist()

                    const userName = event.target.userName.value
                    const email = event.target.email.value
                    const password = event.target.password.value

                    RegistOrLogin(userName, email, password, "regist")

                }}>
                    <label>Felhasználónév</label>
                    <input className="mb-3 form-control" type="text" name="userName" id="userName" /><br />
                    <label>E-mail-cím</label>
                    <input className="mb-3 form-control" type="email" name="email" id="userEmail" /><br />
                    <label>Jelszó</label>
                    <input className="mb-3 form-control" type="password" name="password" id="userPassword" onChange={(event) => {
                        const password = event.target.value
                        const currentpasswordState = {
                            isMinLength: (password.length >= 6 ? true : false),
                            isOneNumber: (password.search(oneNumber) > -1 ? true : false),
                            isOneBigChar: (password.search(oneBigChar) > -1 ? true : false),
                            isOneSpecChar: (password.search(oneSpecChar) > -1 ? true : false)
                        }
                        setPasswordState(currentpasswordState)
                    }} />
                        <p className={passwordState.isMinLength ? "text-success" : "text-danger"}><i className={passwordState.isMinLength ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 6 karakter hosszú</p>
                        <p className={passwordState.isOneBigChar ? "text-success" : "text-danger"}><i className={passwordState.isOneBigChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 nagy karakter</p>
                        <p className={passwordState.isOneNumber ? "text-success" : "text-danger"}><i className={passwordState.isOneNumber ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 szám</p>
                        <p className={passwordState.isOneSpecChar ? "text-success" : "text-danger"}><i className={passwordState.isOneSpecChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 speciális karakter</p>
                    <div className="regDiv">
                        <button type="submit" className="btn btn-primary regGomb"  id="gomb">Regisztráció</button>
                        <Link to="/login" className="regLink">Már van fiókod?</Link>
                    </div>
                </form>
            </div>
        </>
    )
}


export function Login() {
    const [passwordState, setPasswordState] = useState({
        isMinLength: false,
        isOneNumber: false,
        isOneBigChar: false,
        isOneSpecChar: false
    })

    return (
        <>
            <Header />
            <div className="container reg">
                <form method="post" id="form"
                    onSubmit={(event) => {
                        event.preventDefault()
                        event.persist()

                        const userName = event.target.userName.value
                        const email = event.target.email.value
                        const password = event.target.password.value

                        RegistOrLogin(userName, email, password, "login")

                    }}>
                    <label>Felhasználónév</label>
                    <input className="mb-3 form-control" type="text" name="userName" id="userName" /><br />
                    <label>E-mail-cím</label>
                    <input className="mb-3 form-control" type="email" name="email" disabled={true} id="userEmail" /><br />
                    <label>Jelszó</label>
                    <input className="mb-3 form-control" type="password" name="password" id="userPassword"
                        onChange={(event) => {
                            const password = event.target.value
                            const currentpasswordState = {
                                isMinLength: (password.length >= 6 ? true : false),
                                isOneNumber: (password.search(oneNumber) > -1 ? true : false),
                                isOneBigChar: (password.search(oneBigChar) > -1 ? true : false),
                                isOneSpecChar: (password.search(oneSpecChar) > -1 ? true : false)
                            }
                            setPasswordState(currentpasswordState);

                        }} />
                        <p className={passwordState.isMinLength ? "text-success" : "text-danger"}><i className={passwordState.isMinLength ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 6 karakter hosszú</p>
                        <p className={passwordState.isOneBigChar ? "text-success" : "text-danger"}><i className={passwordState.isOneBigChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 nagy karakter</p>
                        <p className={passwordState.isOneNumber ? "text-success" : "text-danger"}><i className={passwordState.isOneNumber ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 szám</p>
                        <p className={passwordState.isOneSpecChar ? "text-success" : "text-danger"}><i className={passwordState.isOneSpecChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 speciális karakter</p>
                    <div className="regDiv">
                        <button type="submit" className="btn btn-primary regGomb" id="gomb">Bejelentkezés</button>
                        <Link to="/" className="regLink">Még nincs fiókod?</Link>
                    </div>
                </form>
            </div>
        </>
    )
}