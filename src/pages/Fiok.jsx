import Felsoresz from "../modules/Felsoresz";
import { useState, useEffect } from "react";
import { CheckUserName } from "../App";
import axios from "axios";



function Fiok() {
    const userName = CheckUserName()
    const [adatok, setAdatok] = useState({});
    const [pending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        axios
            .get(
                `https://localhost:7159/auth/Fiok/${userName}`
            )
            .then((tartalom) => { setAdatok(tartalom.data) })
            .catch((error) => { console.log(error) })
            .finally(() => { setPending(false) })
    }, [userName]);

    if (typeof (adatok.value) === "undefined") {
        return (
            <>
                <Felsoresz />
                <h1>Betöltés...</h1>
            </>
        )
    }
    const { birthdate, modDate, password, email } = adatok.value
    return (
        <>
            <Felsoresz />
            <h1>{userName}</h1>
            <h2>A fiók létrejött ekkor: {birthdate}</h2>
            <h2>A fiók adatai utoljára módosítva ekkor: {modDate == "0001-01-01T00:00:00" ? <span>{birthdate}</span> : modDate}</h2>
            <form method="post" onSubmit={(event) => {
                event.preventDefault()
                const newPassword = event.target.newpassword.value
                const oldPassword = event.target.oldpassword.value
                const newEmail = event.target.newemail.value

                const frissitettAdatok = {
                    userName : userName,
                    password: newPassword === oldPassword ? newPassword : password,
                    email: email !== newEmail ? newEmail : email,
                    birthdate: new Date().toJSON()
                }

                console.log(frissitettAdatok)
                axios
                    .put(
                        "https://localhost:7159/auth/Modositas",
                        frissitettAdatok
                    )
                    .then((tartalom) => {
                        alert(tartalom.data.message);
                        axios
                            .get(`https://localhost:7159/auth/Fiok/${userName}`)
                            .then((tartalom) => { setAdatok(tartalom.data.value); event.target.newpassword.value = "" })
                            .catch((error) => { console.log(error) })
                    })
                    .catch((error) => { console.log(error) })

            }}>
                <label htmlFor="oldpassword">Jelszó:</label>
                <input type="password" name="oldpassword" id="oldpassword" defaultValue={password} />
                <label htmlFor="newpassword">jelszó újra:</label>
                <input type="password" name="newpassword" id="newpassword"/>
                <label htmlFor="newemail">Email:</label>
                <input type="email" name="newemail" id="newemail" defaultValue={email} />
                <input type="submit" />
            </form>
        </>
    )

}

export default Fiok