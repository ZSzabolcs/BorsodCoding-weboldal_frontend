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
                `http://localhost:5233/api/User/Fiok/${userName}`
            )
            .then((tartalom) => { setAdatok(tartalom.data) })
            .catch((error) => { console.log(error) })
            .finally(() => { setPending(false) })
    }, [userName]);

    if (typeof (adatok.value) === "undefined") {
        return (
            <>
                <Felsoresz />
                <h1>...Betöltés</h1>
            </>
        )
    }
    const { regDate, modDate, password, email } = adatok.value
    return (
        <>
            <Felsoresz />
            <h1>{userName}</h1>
            <h2>A fiók létrejött ekkor: {regDate}</h2>
            <h2>A fiók adatai utoljára módosítva ekkor: {modDate}</h2>
            <form method="post" onSubmit={(event) => {
                event.preventDefault()
                const newPassword = event.target.newpassword.value
                const oldPassword = event.target.oldpassword.value
                const newEmail = event.target.newemail.value

                const frissitettAdatok = {
                    ...adatok,
                    password: newPassword === oldPassword ? newPassword : password,
                    email: email !== newEmail ? newEmail : adatok.email
                }
                
                console.log(frissitettAdatok)
                axios
                    .put(
                        "http://localhost:5233/api/User",
                        frissitettAdatok
                    )
                    .then((tartalom) => {
                        alert(tartalom.data.message);
                        axios
                            .get(`http://localhost:5233/api/User/Fiok/${userName}`)
                            .then((tartalom) => { setAdatok(tartalom.data.value); event.target.newpassword.value = "" })
                            .catch((error) => { console.log(error) })
                    })
                    .catch((error) => { console.log(error) })

            }}>
                <label>Jelszó:</label>
                <input type="password" name="oldpassword" defaultValue={password} />
                <label>jelszó újra:</label>
                <input type="password" name="newpassword" />
                <label>Email:</label>
                <input type="email" name="newemail" defaultValue={email} />
                <input type="submit" />
            </form>
        </>
    )

}

export default Fiok