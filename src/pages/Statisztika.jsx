import Felsoresz from "../modules/Felsoresz";
import { CheckUserName } from "../App";
import { useEffect, useState } from "react";
import axios from "axios";


function Statisztika() {
    const userName = CheckUserName()
    const [adatok, setAdatok] = useState(null);
    const [pending, setPending] = useState(false);

    const getStatisztika = async () => {
        try {
        setPending(true);
        const tartalom = await axios
            .get(
                `https://localhost:7036/api/Save/Statisztika/${userName}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`
                    }
                }
            )
        setAdatok(tartalom.data)
        } catch (error) {
            console.log(error)
        }
        finally{
            setPending(false)
        }
        
    }

    useEffect(() => { getStatisztika(); }, [userName]);

    if (adatok === null) {
        return (
            <>
                <Felsoresz />
                <h1>Betöltés...</h1>
            </>
        );
    }
    else if (adatok != null && typeof(adatok) === "string") {
        return (
            <>
                <Felsoresz />
                <h1>{userName}</h1>
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
        nyelvArany
    } = adatok.value


    const nyelv = (language === "hu" ? "magyar" : "angol")
    const pontAranySzoveg = (pontArany < 100 ? `Ön mint a játékosok ${pontArany}%-a van ennyi ponja.` : "Önnek van csak ennyi pontja.")
    const szintAranySzoveg = (szintArany < 100 ? `Ön mint a játékosok ${szintArany}%-a van ezen a szinten.` : "Ön van csak ezen a szinten.")
    const nyelvAranySzoveg = (nyelvArany < 100 ? `Ön mint a játékosok ${nyelvArany}%-a ${nyelv} nyelven játszik.` : `Ön játszik csak ezen a nyelven.`)
    return (
        <>
            <Felsoresz />
            <h1>{userName}</h1>
            <h2>A játékot elkezdte: {regDate}</h2>
            <h2>Pontszám: {points}</h2>
            <h2>{pontAranySzoveg}</h2>
            <h2>Szint: {level}</h2>
            <h2>{szintAranySzoveg}</h2>
            <h2>Nyelv: {nyelv}</h2>
            <h2>{nyelvAranySzoveg}</h2>
        </>
    );




}

export default Statisztika;