import Felsoresz from "../modules/Felsoresz";
import { useState, useEffect } from "react";
import { catchErrors, checkUserName, getDateByOwnStringFormat } from "../App";
import axios from "axios";
import { checkEmail, getCurrentPasswordState, PasswordState } from "./RegistrationAndLogin";
import { useNavigate } from "react-router-dom";
import Betoltes from "../modules/Betoltes";

function Fiok() {
    const navigate = useNavigate()
    const userName = checkUserName()
    const [adatok, setAdatok] = useState({});
    const [, setPending] = useState(false);
    const [firstPasswordState, setFirstPasswordState] = useState(new PasswordState())
    const [secondPasswordState, setSecondPasswordState] = useState(new PasswordState())
    const [emailState, setEmailState] = useState({ isEmail : false, isChanged: false})


    const getFiok = async () => {
        try {
            setPending(true);

            const {data} = await axios.get(`https://localhost:7159/auth/Fiok/${userName}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("jwt")}`
                        }
                    }
                )
            setAdatok(data)
            setEmailState({isEmail: checkEmail(data.value.email), isChanged: false})
        } catch (error) {
            catchErrors(error)
        }
        finally {
            setPending(false)
        }
    }

    useEffect(() => { getFiok(); }, [userName])


    if (typeof (adatok.value) === "undefined") {
        return (
            <>
                <Felsoresz />
                <Betoltes/>
            </>
        )
    }
    const { birthdate, modDate, email } = adatok.value

    const putFiok = async (frissitettAdatok) => {
        try {
            setPending(true)
            const tartalom = await axios.put("https://localhost:7159/auth/Modositas", frissitettAdatok,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("jwt")}`
                        }
                    },
                )
            alert(tartalom.data.message)
            navigate(0)
        } catch (error) {
            catchErrors(error)
        }
        finally {
            setPending(false)
        }

    }

    const submitVelemeny = (event) => {
        event.preventDefault()
        event.persist()
        const newPassword = event.target.newpassword.value
        const oldPassword = event.target.oldpassword.value
        const newEmail = event.target.newemail.value

        const frissitettAdatok = {
            userName: userName,
            password: newPassword === oldPassword && newPassword.length > 1 ? newPassword : null,
            email: email !== newEmail ? newEmail : null,
        }

        putFiok(frissitettAdatok)
    }

    const states = {firstPasswordState, secondPasswordState, emailState}

    const emailIsChanged = (currentEmail) => {
        if (email != currentEmail) {
            return true;
        }
        return false;
    }

    const checkIsPasswordCorrect = (passwordState) => {
        if (passwordState.isMinLengthReached && passwordState.isOneBigChar && passwordState.isOneNumber && passwordState.isOneSpecChar) {
            return true;
        }
        return false;
    }


    const checkDataStatus = () => {
       if (states.emailState.isChanged && states.emailState.isEmail) {
        return false;
       }
       else if (checkIsPasswordCorrect(states.firstPasswordState) && checkIsPasswordCorrect(states.secondPasswordState)) {
            return false;
       }
       return true;

    }



    const modositva = (modDate == "0001-01-01T00:00:00" ? "Nem történt módosítás azóta." : `A fiók adatai utoljára módosítva ekkor: ${getDateByOwnStringFormat(modDate)}`)
    return (
        <>
            <Felsoresz />
            <h1>{userName}</h1>
            <h2>A fiók létrejött ekkor: {getDateByOwnStringFormat(birthdate)}</h2>
            <h2>{modositva}</h2>
            <form method="post" onSubmit={(event) => { submitVelemeny(event) }}>
                <label htmlFor="oldpassword">Jelszó:</label>
                <input type="password" name="oldpassword" id="oldpassword" onChange={(event) => { setFirstPasswordState(getCurrentPasswordState(event.target.value)) }} />
                <p className={firstPasswordState.isMinLengthReached ? "text-success" : "text-danger"}><i className={firstPasswordState.isMinLengthReached ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 6 karakter hosszú</p>
                <p className={firstPasswordState.isOneBigChar ? "text-success" : "text-danger"}><i className={firstPasswordState.isOneBigChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 nagy karakter</p>
                <p className={firstPasswordState.isOneNumber ? "text-success" : "text-danger"}><i className={firstPasswordState.isOneNumber ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 szám</p>
                <p className={firstPasswordState.isOneSpecChar ? "text-success" : "text-danger"}><i className={firstPasswordState.isOneSpecChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 speciális karakter</p>
                <label htmlFor="newpassword">Jelszó újra:</label>
                <input type="password" name="newpassword" id="newpassword" onChange={(event) => { setSecondPasswordState(getCurrentPasswordState(event.target.value)) }} />
                <p className={secondPasswordState.isMinLengthReached ? "text-success" : "text-danger"}><i className={secondPasswordState.isMinLengthReached ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 6 karakter hosszú</p>
                <p className={secondPasswordState.isOneBigChar ? "text-success" : "text-danger"}><i className={secondPasswordState.isOneBigChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 nagy karakter</p>
                <p className={secondPasswordState.isOneNumber ? "text-success" : "text-danger"}><i className={secondPasswordState.isOneNumber ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 szám</p>
                <p className={secondPasswordState.isOneSpecChar ? "text-success" : "text-danger"}><i className={secondPasswordState.isOneSpecChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 speciális karakter</p>
                <label htmlFor="newemail">Email:</label>
                <input type="email" name="newemail" id="newemail" defaultValue={email} onChange={(event) => { setEmailState({isEmail: checkEmail(event.target.value), isChanged: emailIsChanged(event.target.value)}) }} />
                <p><i className={emailState.isEmail ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Helyes e-mail cím</p>
                <button type="submit" disabled={checkDataStatus()}>Módosítás</button>
            </form>
        </>
    )

}

export default Fiok