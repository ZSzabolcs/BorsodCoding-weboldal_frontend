import Felsoresz from "../modules/Felsoresz";
import { useState, useEffect } from "react";
import { catchErrors, CheckUserName } from "../App";
import axios from "axios";
import { PasswordState } from "../App";
import { checkEmail, CheckPassword } from "./RegistrationAndLogin";

function Fiok() {
    const userName = CheckUserName()
    const [adatok, setAdatok] = useState({});
    const [pending, setPending] = useState(false);
    const [newPasswordState, setNewPasswordState] = useState(new PasswordState())
    const [oldPasswordState, setOldPasswordState] = useState(new PasswordState())
    const [emailState, setEmailState] = useState(true)
    const getFiok = async () => {
        try {
            setPending(true);

            const response = await axios
                .get(
                    `https://localhost:7159/auth/Fiok/${userName}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("jwt")}`
                        }
                    }
                )
            setAdatok(response.data)
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
                <h1>Betöltés...</h1>
            </>
        )
    }
    const { birthdate, modDate, email } = adatok.value
    const modositva = (modDate == "0001-01-01T00:00:00" ? "Nem történt módosítás azóta." : `A fiók adatai utoljára módosítva ekkor: ${modDate}`)

    const putFiok = async (frissitettAdatok) => {
        try {
            setPending(true)
            const tartalom = await axios
                .put("https://localhost:7159/auth/Modositas",
                    frissitettAdatok,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("jwt")}`
                        }
                    },
                )
            alert(tartalom.data.message)
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

    return (
        <>
            <Felsoresz />
            <h1>{userName}</h1>
            <h2>A fiók létrejött ekkor: {birthdate}</h2>
            <h2>{modositva}</h2>
            <form method="post" onSubmit={(event) => { submitVelemeny(event) }}>
                <label htmlFor="oldpassword">Jelszó:</label>
                <input type="password" name="oldpassword" id="oldpassword" onChange={(event) => { setOldPasswordState(CheckPassword(event.target.value)) }} />
                <p className={oldPasswordState.isMinLength ? "text-success" : "text-danger"}><i className={oldPasswordState.isMinLength ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 6 karakter hosszú</p>
                <p className={oldPasswordState.isOneBigChar ? "text-success" : "text-danger"}><i className={oldPasswordState.isOneBigChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 nagy karakter</p>
                <p className={oldPasswordState.isOneNumber ? "text-success" : "text-danger"}><i className={oldPasswordState.isOneNumber ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 szám</p>
                <p className={oldPasswordState.isOneSpecChar ? "text-success" : "text-danger"}><i className={oldPasswordState.isOneSpecChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 speciális karakter</p>
                <label htmlFor="newpassword">Jelszó újra:</label>
                <input type="password" name="newpassword" id="newpassword" onChange={(event) => { setNewPasswordState(CheckPassword(event.target.value)) }} />
                <p className={newPasswordState.isMinLength ? "text-success" : "text-danger"}><i className={newPasswordState.isMinLength ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 6 karakter hosszú</p>
                <p className={newPasswordState.isOneBigChar ? "text-success" : "text-danger"}><i className={newPasswordState.isOneBigChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 nagy karakter</p>
                <p className={newPasswordState.isOneNumber ? "text-success" : "text-danger"}><i className={newPasswordState.isOneNumber ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 szám</p>
                <p className={newPasswordState.isOneSpecChar ? "text-success" : "text-danger"}><i className={newPasswordState.isOneSpecChar ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Legalább 1 speciális karakter</p>
                <label htmlFor="newemail">Email:</label>
                <input type="email" name="newemail" id="newemail" defaultValue={email} onChange={(event) => { setEmailState(checkEmail(event.target.value)) }} />
                <p><i className={emailState ? "bi bi-check-lg" : "bi bi-x-lg"}></i>Helyes e-mail cím</p>
                <button type="submit">Módosítás</button>
            </form>
        </>
    )

}

export default Fiok