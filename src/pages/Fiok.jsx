import Felsoresz from "../modules/Felsoresz";
import { useState, useEffect } from "react";
import { CheckUserName } from "../App";
import axios from "axios";



function Fiok() {
    const userName = CheckUserName()
    const [adatok, setAdatok] = useState([]);
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
    }, []);
    console.log(pending)

    if (typeof (adatok.value) === "undefined") {
        return (
            <>
                <Felsoresz />
                <h1>...Betöltés</h1>
            </>
        )
    }
    const { regDate, modDate, password, email } = adatok.value
    const info = {
        name: userName,
        password: password,
        email: email
    }
    return (
        <>
            <Felsoresz />
            <h1>{userName}</h1>
            <h2>A fiók létrejött ekkor: {regDate}</h2>
            <h2>A fiók adatai utoljára módosítva: {modDate}</h2>
            <form method="post" onSubmit={(event) => {
                event.preventDefault()
                const newPassword = event.target.newpassword.value
                const oldPassword = event.target.oldpassword.value
                const newEmail = event.target.newemail.value
                
                if (newPassword === oldPassword) {
                    info.password = newPassword
                }

                if (info.email !== newEmail) {
                    info.email = newEmail
                }

                axios
                .put(
                    "http://localhost:5233/api/User",
                    info
                )
                .then((tartalom) => { 
                    console.log(tartalom.data); 
                    alert(tartalom.data.message); 
                    axios
                    .get(`http://localhost:5233/api/User/Fiok/${userName}`)
                    .then((tartalom) => { setAdatok(tartalom.data) })
                    .catch((error) => { console.log(error) })
                 })
                .catch((error) => { console.log(error) })
                
            }}>
                <label>Jelszó:</label>
                <input type="password" name="oldpassword" defaultValue={password}/>
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