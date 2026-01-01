import Felsoresz from "../modules/Felsoresz";
import { CheckUserName } from "../App";
import { useEffect, useState } from "react";
import axios from "axios";


function Statisztika() {
    const userName = CheckUserName()
    const [adatok, setAdatok] = useState([]);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        axios
            .get(
                `http://localhost:5233/api/User/Statistic/${userName}`,
            )
            .then((tartalom) => { setAdatok(tartalom.data) })
            .catch((error) => { console.log(error); })
            .finally(() => { setPending(false) })
    }, [userName]);

    if (typeof (adatok.value) === "undefined") {
        return (
            <>
                <Felsoresz />
                <h1>Betöltés...</h1>
            </>
        );
    }
    else if (adatok.value === null) {
        return (
            <>
                <Felsoresz />
                <h1>{userName}</h1>
                <h1>{adatok.message}!</h1>
            </>
        );
    }
    const {
        regDate,
        points,
        pontArany,
        level,
        szintArany,
        language,
        nyelvArany
    } = adatok.value


    return (
        <>
            <Felsoresz />
            <h1>{userName}</h1>
            <h2>A játékot elkezdte: {regDate}</h2>
            <h2>Pontszám: {points}</h2>
            <h2>Ön és a játékosok {pontArany.szazalek}%-a van ennyi pontja.</h2>
            <h2>Szint: {level}</h2>
            <h2>Ön és a játékosok {szintArany.szazalek}%-a van ezen a szinten.</h2>
            <h2>Nyelv: {(language === "hu" ? "magyar" : "angol")}</h2>
            <h2>Ön és a játékosok {nyelvArany.szazalek}%-a {(language === "hu" ? "magyar" : "angol")} nyelven játszik.</h2>
        </>
    );




}

export default Statisztika;