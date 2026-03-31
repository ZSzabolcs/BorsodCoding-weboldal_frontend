import axios from "axios"
import { catchErrors } from "../App.jsx"
import Felsoresz from "../modules/Felsoresz.jsx"
import { useState } from "react"

function AJatekrol() {
    const [pending, setPending] = useState(false)

    const jatekSetupLetoltese = async () => {
        try {
            setPending(true)
            const response = await axios.get('https://localhost:7159/api/Setup/download', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                },
            })

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', 'For The Potato Demo Setup.exe');

            document.body.appendChild(link);
            link.click();

            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            catchErrors(error)
        } finally {
            setPending(false)
        }

    }

    return (
        <>
            <Felsoresz />
            <div className="container">
                <h1 className="text-center my-4">
                    A játékról
                </h1>
                <p>
                    <span className="paragraph">Játékunk</span> egy 2D-s platformer rage game.
                </p>
                <p>
                    <span className="paragraph">A</span> története nagyon egyszerű. Volt egyszer egy troll, akinek a legjobb barátja egy krumpli volt, akit Kolompérnak hívtak. Az orosz katonák ellopták ezt a krumplit, hogy vodkát csináljanak belőle. A troll ezt nem engedhette meg, ezért elindult kiszabadítani.
                </p>
                <h2>
                    Irányítás
                </h2>
                <ul>
                    <li>
                        <i className="bi bi-arrow-up"></i> - ugrás
                    </li>
                    <li>
                        <i className="bi bi-arrow-left"></i> - haladás balra
                    </li>
                    <li>
                        <i className="bi bi-arrow-right"></i> - haladás jobbra
                    </li>
                    <li>
                        ESC - játék megállítása, menü megnyitása
                    </li>
                </ul>
                <button className="btn btn-primary" onClick={() => {
                    jatekSetupLetoltese()
                }}>Játék letöltése</button>

            </div>
        </>
    )
}

export default AJatekrol