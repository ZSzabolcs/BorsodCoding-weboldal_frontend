import { useEffect, useState } from "react";
import Felsoresz from "../modules/Felsoresz";
import { CheckUserName } from "../App";
import axios from "axios";

const postErtekeles = async (body) => {
    try {
        const tartalom = await axios.post("https://localhost:7159/api/Velemeny", body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        alert(tartalom.data.message)
    } catch (error) {
        console.log(error)
    }
}

const putErtekeles = async (body) => {
    try {
        const tartalom = await axios.put("https://localhost:7159/api/Velemeny", body, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        alert(tartalom.data.message)
    } catch (error) {
        console.log(error)
    }
}

const deleteErtekeles = async (userName) => {
    try {
        const tartalom = await axios.delete(`https://localhost:7159/api/Velemeny?userName=${userName}`, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        alert(tartalom.data.message)
    } catch (error) {
        console.log(error)
    }
    
}


function CsillagErtekelo() {
    const userName = CheckUserName()
    const [pending, setPending] = useState(false)
    const [adat, setAdat] = useState({
        ertekeles: 0,
        megjegyzes: ""
    })
    const [vaneVelemeny, setvaneVelemeny] = useState(false)
    const [ertekeles, setErtekeles] = useState(0)

    const getErtekeles = async () => {
        try {
            setPending(true)
            const tartalom = await axios.get(`https://localhost:7159/api/Velemeny/${userName}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            if (typeof (tartalom.data) === "string") {
                setvaneVelemeny(false)
            }
            else {
                setErtekeles(Number(tartalom.data.value.ertekeles))
                setAdat({
                    ertekeles : Number(tartalom.data.value.ertekeles),
                    megjegyzes : tartalom.data.value.megjegyzes
                })
                setvaneVelemeny(true)
            }

        } catch (error) {
            console.log(error)
        }
        finally {
            setPending(false)
        }
    }

    useEffect(() => { getErtekeles() }, [])

    return (
        <>
            {vaneVelemeny ? <></> : <><h2>Még nem adtál véleményt!</h2></>}
            <form method="post" onSubmit={(event) => {
                event.preventDefault()
                event.persist()

                const ujMegjegyzes = event.target.megjegyzes.value

                if (ertekeles == adat?.ertekeles && ujMegjegyzes == adat?.megjegyzes) {
                    return
                }

                const body = {
                    userName: userName,
                    ertekeles: String(ertekeles),
                    megjegyzes: ujMegjegyzes
                }

                if (vaneVelemeny) {
                    putErtekeles(body)
                }else{
                    postErtekeles(body)
                    setvaneVelemeny(true)
                }

            }}>
                <div className="fs-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <i
                            key={num}
                            className={num <= ertekeles ? "bi bi-star-fill m-3" : "bi bi-star m-3"}
                            onClick={() => setErtekeles(num)}
                        ></i>
                    ))}
                </div>
                <input type="text" name="megjegyzes" defaultValue={adat.megjegyzes} /><br />
                <input type="submit" />
                {(vaneVelemeny) ?
                <button onClick={() => {
                    deleteErtekeles(userName);
                    setErtekeles(0)
                    setAdat({
                        ertekeles: 0,
                        megjegyzes: ""
                    })
                    setvaneVelemeny(false)
                }}>Törlés</button>
                : <></>
                }
            </form>
        </>
    );
}


function Velemeny() {

    return (
        <>
            <Felsoresz />
            <h1>Hogyan tetszett a játék?</h1>
            <h2>Mondd el a véleményed róla.</h2>
            <p>Egy teljes csillag a "Nagyon rossz" az öt teljes csillag a "Kiváló"-t jelenti.</p>
            <CsillagErtekelo></CsillagErtekelo>
        </>
    )
}

export default Velemeny;