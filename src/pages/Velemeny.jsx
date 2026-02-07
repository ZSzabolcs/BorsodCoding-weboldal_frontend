import { useState } from "react";
import Felsoresz from "../modules/Felsoresz";

function CsillagErtekelo() {
    const [rating, setRating] = useState(0);

    return (
        <div className="fs-1">
            {[1, 2, 3, 4, 5].map((num) => (
                <i
                    key={num}
                    className={num <= rating ? "bi bi-star-fill m-3" : "bi bi-star m-3"}
                    onClick={() => setRating(num)}
                ></i>
            ))}
        </div>
    );
}


function Velemeny() {

    return(
        <>
            <Felsoresz/>
            <h1>Hogyan tetszett a játék?</h1>
            <h2>Mondd el a véleményed róla.</h2>
            <p>Egy teljes csillag a "Nagyon rossz" az öt teljes csillag a "Kiváló"-t jelenti.</p>
            <CsillagErtekelo></CsillagErtekelo>
        </>
    )
}

export default Velemeny;