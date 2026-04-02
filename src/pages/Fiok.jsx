import Felsoresz from "../modules/Felsoresz";
import { useState, useEffect } from "react";
import { catchErrors, checkUsername, getDateByOwnStringFormat } from "../App";
import axios from "axios";
import { checkEmail, getCurrentPasswordState, PasswordState } from "./RegistrationAndLogin";
import { useNavigate } from "react-router-dom";
import Betoltes from "../modules/Betoltes";

function Fiok() {
    const navigate = useNavigate()
    const username = checkUsername()
    const [adatok, setAdatok] = useState({});
    const [, setPending] = useState(false);
    const [firstPasswordState, setFirstPasswordState] = useState(new PasswordState())
    const [secondPasswordState, setSecondPasswordState] = useState(new PasswordState())
    const [emailState, setEmailState] = useState({ isEmail: false, isChanged: false })
    const [firstPasswordText, setFirstPasswordText] = useState("")
    const [secondPasswordText, setSecondPasswordText] = useState("")


    const getFiok = async () => {
        try {
            setPending(true);

            const { data } = await axios.get(`https://localhost:7159/auth/Fiok/${username}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`
                    }
                }
            )
            setAdatok(data)
            setEmailState({ isEmail: checkEmail(data.value.email), isChanged: false })
        } catch (error) {
            catchErrors(error)
        }
        finally {
            setPending(false)
        }
    }

    useEffect(() => { getFiok(); }, [username])


    if (typeof (adatok.value) === "undefined") {
        return (
            <>
                <Felsoresz />
                <Betoltes />
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
            username: username,
            password: newPassword === oldPassword && newPassword.length > 1 ? newPassword : null,
            email: email !== newEmail ? newEmail : null,
        }

        putFiok(frissitettAdatok)
    }

    const states = { firstPasswordState, secondPasswordState, emailState }

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
    const bothReachedMinLength = secondPasswordState.isMinLengthReached && firstPasswordState.isMinLengthReached && firstPasswordText == secondPasswordText
    const bothThereIsOneBigChar = secondPasswordState.isOneBigChar && firstPasswordState.isOneBigChar && firstPasswordText == secondPasswordText
    const bothThereIsOneNumber = secondPasswordState.isOneNumber && firstPasswordState.isOneNumber && firstPasswordText == secondPasswordText
    const bothThereIsOneSpecChar = secondPasswordState.isOneSpecChar && firstPasswordState.isOneSpecChar && firstPasswordText == secondPasswordText

    return (
        <>
            <Felsoresz />
            <div className="m-4">
                <h2>Fiókadatok</h2>
                <div className="adatok mx-3">
                    <h3>{username}</h3>
                    <h3>A fiók létrejött ekkor: {getDateByOwnStringFormat(birthdate)}</h3>
                    <h3>{modositva}</h3>
                </div>
                <h2>Jelszó megváltoztatása</h2>

                <form method="post" onSubmit={(event) => { submitVelemeny(event) }}>
                    <div className="mx-3">
                        <label htmlFor="oldpassword">Jelszó:</label><br />
                        <input type="password" name="oldpassword" id="oldpassword" onChange={(event) => { setFirstPasswordState(getCurrentPasswordState(event.target.value)); setFirstPasswordText(event.target.value) }} /><br />
                        <label htmlFor="newpassword" className="my-2">Jelszó újra:</label><br />
                        <input type="password" name="newpassword" id="newpassword" onChange={(event) => { setSecondPasswordState(getCurrentPasswordState(event.target.value)); setSecondPasswordText(event.target.value) }} />
                        <div className="check my-3">
                            <p className={bothReachedMinLength ? "text-success" : "text-danger"}><i className={bothReachedMinLength ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 6 karakter hosszúnak kell lennie</p>
                            <p className={bothThereIsOneBigChar ? "text-success" : "text-danger"}><i className={bothThereIsOneBigChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 nagybetűs karakter</p>
                            <p className={bothThereIsOneNumber ? "text-success" : "text-danger"}><i className={bothThereIsOneNumber ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 szám</p>
                            <p className={bothThereIsOneSpecChar ? "text-success" : "text-danger"}><i className={bothThereIsOneSpecChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 speciális karakter</p>
                        </div>
                    </div>

                    <h2>E-mail-cím megváltoztatása</h2>
                    <div className="mx-3">
                        <label htmlFor="newemail">Email:</label><br/>
                        <input type="email" name="newemail" id="newemail" defaultValue={email} onChange={(event) => { setEmailState({ isEmail: checkEmail(event.target.value), isChanged: emailIsChanged(event.target.value) }) }} />
                        <p className={emailState.isEmail ? "text-success check my-3" : "text-danger check my-3"}><i className={emailState.isEmail ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Megfelelő formátum</p>
                        <button className="btn btn-primary" type="submit" disabled={checkDataStatus()}>Módosítás</button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default Fiok