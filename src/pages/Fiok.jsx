import Felsoresz from "../modules/Felsoresz";
import { useState, useEffect } from "react";
import { catchErrors, checkUserName, checkStates } from "../App";
import axios from "axios";
import { checkEmail, checkPassword, PasswordState } from "./RegistrationAndLogin";
import { useNavigate } from "react-router-dom";
import Betoltes from "../modules/Betoltes";

function Fiok() {
    const navigate = useNavigate()
    const userName = checkUserName()
    const [adatok, setAdatok] = useState({});
    const [pending, setPending] = useState(false);
    const [firstPasswordState, setFirstPasswordState] = useState(new PasswordState())
    const [secondPasswordState, setSecondPasswordState] = useState(new PasswordState())
    const [emailState, setEmailState] = useState(false)

    const getFiok = async () => {
        try {
            setPending(true);

            const response = await axios.get(`https://localhost:7159/auth/Fiok/${userName}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("jwt")}`
                        }
                    }
                )
            setAdatok(response.data)
            setEmailState(checkEmail(response.data.value.email))
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
    const modositva = (modDate == "0001-01-01T00:00:00" ? "Nem történt módosítás azóta." : `A fiók adatai utoljára módosítva ekkor: ${modDate}`)

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

    return (
        <>
            <Felsoresz />
            <h1>{userName}</h1>
            <h2>A fiók létrejött ekkor: {birthdate}</h2>
            <h2>{modositva}</h2>
            <form method="post" onSubmit={(event) => { submitVelemeny(event) }}>
                <label htmlFor="oldpassword">Jelszó:</label>
                <input type="password" name="oldpassword" id="oldpassword" onChange={(event) => { setFirstPasswordState(checkPassword(event.target.value)) }} />
                <p className={firstPasswordState.isMinLengthReached ? "text-success" : "text-danger"}><i className={firstPasswordState.isMinLengthReached ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 6 karakter hosszú</p>
                <p className={firstPasswordState.isOneBigChar ? "text-success" : "text-danger"}><i className={firstPasswordState.isOneBigChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 nagy karakter</p>
                <p className={firstPasswordState.isOneNumber ? "text-success" : "text-danger"}><i className={firstPasswordState.isOneNumber ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 szám</p>
                <p className={firstPasswordState.isOneSpecChar ? "text-success" : "text-danger"}><i className={firstPasswordState.isOneSpecChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 speciális karakter</p>
                <label htmlFor="newpassword">Jelszó újra:</label>
                <input type="password" name="newpassword" id="newpassword" onChange={(event) => { setSecondPasswordState(checkPassword(event.target.value)) }} />
                <p className={secondPasswordState.isMinLengthReached ? "text-success" : "text-danger"}><i className={secondPasswordState.isMinLengthReached ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 6 karakter hosszú</p>
                <p className={secondPasswordState.isOneBigChar ? "text-success" : "text-danger"}><i className={secondPasswordState.isOneBigChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 nagy karakter</p>
                <p className={secondPasswordState.isOneNumber ? "text-success" : "text-danger"}><i className={secondPasswordState.isOneNumber ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 szám</p>
                <p className={secondPasswordState.isOneSpecChar ? "text-success" : "text-danger"}><i className={secondPasswordState.isOneSpecChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 speciális karakter</p>
                <label htmlFor="newemail">Email:</label>
                <input type="email" name="newemail" id="newemail" defaultValue={email} onChange={(event) => { setEmailState(checkEmail(event.target.value)) }} />
                <p><i className={emailState ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Helyes e-mail cím</p>
                <button type="submit" disabled={checkStates(states)}>Módosítás</button>
            </form>
        </>
    )

}

export default Fiok