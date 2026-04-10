import Felsoresz from "../modules/Felsoresz";
import { catchErrors, throwFetchErrorResponse, checkUsername, getDateByOwnStringFormat } from "../App";
import { useEffect, useState } from "react";
import Betoltes from "../modules/Betoltes";


function Statisztika() {
    const username = checkUsername()
    const [adatok, setAdatok] = useState(null);
    const [pending, setPending] = useState(false);

    const getStatisztika = async () => {
    try {
        setPending(true);
        const response = await fetch(`https://localhost:7159/api/Save/Statisztika/${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            }
        });
        const responseText = await response.text()
        if (!response.ok) {
            setAdatok(responseText)
            throwFetchErrorResponse(responseText)
        }
        else{
            const data = JSON.parse(responseText)
            setAdatok(data);
        }


    } catch (error) {
        catchErrors(error, false);
    } finally {
        setPending(false);
    }
};

    useEffect(() => { getStatisztika(); }, [username]);

    if (adatok === null) {
        return (
            <>
                <Felsoresz />
                <Betoltes />
            </>
        );
    }
    else if (adatok != null && typeof (adatok) === "string") {
        return (
            <>
                <Felsoresz />
                <h1>{username}</h1>
                <h1>{adatok}</h1>
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
        nyelvArany,
        jatekosDb
    } = adatok.value


    const nyelv = (language === "hu" ? "magyar" : "angol")
    const pontAranySzoveg = (pontArany < 100 ? `Ön mint a játékosok ${pontArany}%-a van ennyi pontja.` : "Önnek van csak ennyi pontja.")
    const szintAranySzoveg = (szintArany < 100 ? `Ön mint a játékosok ${szintArany}%-a van ezen a szinten.` : "Ön van csak ezen a szinten.")
    const nyelvAranySzoveg = (nyelvArany < 100 ? `Ön mint a játékosok ${nyelvArany}%-a ${nyelv} nyelven játszik.` : `Ön játszik csak ezen a nyelven.`)
    return (
        <>
            <Felsoresz />
            <div className="m-4">
                <h1>{username}</h1>
                <h2>A játékot elkezdte: {getDateByOwnStringFormat(regDate)}</h2>
                <h2>Pontszám: {points}</h2>
                <h2>{pontAranySzoveg}</h2>
                <h2>Szint: {level}</h2>
                <h2>{szintAranySzoveg}</h2>
                <h2>Nyelv: {nyelv}</h2>
                <h2>{nyelvAranySzoveg}</h2>
                <h2>Játékosok száma: {jatekosDb}</h2>
            </div>
        </>
    );




}

export default Statisztika;