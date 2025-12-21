import Felsoresz from "../modules/Felsoresz";
import { CheckUserName } from "../App";

function Statisztika() {
    const userName = CheckUserName()
    const date = new Date()
    return(
        <>
        <Felsoresz/>
        <h1>{userName}</h1>
        <h2>A fiókját készítette: {date.toJSON()}</h2>
        <h2>Pontszám:</h2>
        <h2>Szint:</h2>
        <h2>Nyelv:</h2>
        </>
    );
}

export default Statisztika;