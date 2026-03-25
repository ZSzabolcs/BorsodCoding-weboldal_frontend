import { useEffect, useState } from "react";
import Felsoresz from "../modules/Felsoresz";
import { catchErrors, checkUserName, } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Velemeny() {
    const navigate = useNavigate()
    const userName = checkUserName()
    const [, setPending] = useState(false)
    const [adat, setAdat] = useState({ ertekeles: 0, megjegyzes: "" })
    const [vaneVelemeny, setVanEVelemeny] = useState(false)
    const [isMegjegyzesChanged, setMegjegyzesChanged] = useState(false)
    const [isErtekelesChanged, setErtekelesChanged] = useState(false)
    const [ertekelesJelenleg, setErtekelesJelenleg] = useState(0)

    const putErtekeles = async (body) => {
        try {
            const tartalom = await axios.put("https://localhost:7159/api/Velemeny", body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            alert(tartalom.data.message)
            navigate(0)
        } catch (error) {
            catchErrors(error)
        }
    }

    const deleteErtekeles = async (userName) => {
        try {
            const tartalom = await axios.delete(`https://localhost:7159/api/Velemeny?userName=${userName}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            alert(tartalom.data.message)
            navigate(0)
        } catch (error) {
            catchErrors(error)
        }

    }

    const postErtekeles = async (body) => {
        try {
            const tartalom = await axios.post("https://localhost:7159/api/Velemeny", body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            alert(tartalom.data.message)
            setVanEVelemeny(true)
        } catch (error) {
            catchErrors(error)
        }
    }

    const getErtekeles = async () => {
        try {
            setPending(true)
            const { data } = await axios.get(`https://localhost:7159/api/Velemeny/${userName}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            if (typeof (data) === "string") {
                setVanEVelemeny(false)
            }
            else {
                setErtekelesJelenleg(Number(data.value.ertekeles))
                setAdat({
                    ertekeles: Number(data.value.ertekeles),
                    megjegyzes: data.value.megjegyzes
                })
                setVanEVelemeny(true)
            }

        } catch (error) {
            catchErrors(error)
        }
        finally {
            setPending(false)
        }
    }

    const submitVelemeny = async (event) => {
        event.preventDefault()
        event.persist()

        const ujMegjegyzes = event.target.megjegyzes.value


        const body = {
            userName: userName,
            ertekeles: String(ertekelesJelenleg),
            megjegyzes: ujMegjegyzes
        }

        if (vaneVelemeny) {
            await putErtekeles(body)
        } else {
            await postErtekeles(body)
        }
    }

    const torolVelemeny = async () => {
        await deleteErtekeles(userName);
        setAdat({
            ertekeles: 0,
            megjegyzes: ""
        })
        setVanEVelemeny(false)
        setErtekelesJelenleg(0)
        navigate(0)
    }

    const ertekelesIsChanged = (number) => {
        if (adat.ertekeles != number) {
            return true;
        }
        return false;
    }


    const megjegyzesIsChanged = (megjegyzes) => {
        if (adat.megjegyzes != megjegyzes) {
            return true;
        }
        return false;
    }



    useEffect(() => { getErtekeles() }, [])

    const states = { isMegjegyzesChanged, isErtekelesChanged }

    const checkDataStatus = () => {
        if (vaneVelemeny) {
            if (states.isMegjegyzesChanged || states.isErtekelesChanged) {
                return false;
            }
            return true;
        }
        if (states.isMegjegyzesChanged && states.isErtekelesChanged) {
            return false;
        }
        return true;

    }

    const { megjegyzes } = adat;

    return (
        <>
            <Felsoresz />
            <h1>Hogyan tetszett a játék?</h1>
            <h2>Mondd el a véleményed róla.</h2>
            <p>Egy teljes csillag a "Nagyon rossz" az öt teljes csillag a "Kiváló"-t jelenti.</p>
            {vaneVelemeny ? <></> : <><h2>Még nem adtál véleményt!</h2></>}
            <form method="post" onSubmit={(event) => { submitVelemeny(event); }}>
                <div className="fs-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <i
                            key={num}
                            className={num <= ertekelesJelenleg ? "bi bi-star-fill m-3" : "bi bi-star m-3"}
                            onClick={() => { setErtekelesChanged(ertekelesIsChanged(num)); setErtekelesJelenleg(num) }}
                        ></i>
                    ))}
                </div>
                <input id="comment" type="text" name="megjegyzes" defaultValue={megjegyzes} onChange={(event) => { setMegjegyzesChanged(megjegyzesIsChanged(event.target.value)) }} /><br />
                <input type="submit" disabled={checkDataStatus()} />
                {(vaneVelemeny) ?
                    <button type="button" onClick={() => { torolVelemeny() }}>Törlés</button>
                    : <></>
                }
            </form>
        </>
    )
}

export default Velemeny;