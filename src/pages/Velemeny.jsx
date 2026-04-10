import { useEffect, useState } from "react";
import Felsoresz from "../modules/Felsoresz";
import { catchErrors, throwFetchErrorResponse, checkUsername, } from "../App";
import { useNavigate } from "react-router-dom";



function Velemeny() {
    const navigate = useNavigate()
    const username = checkUsername()
    const [, setPending] = useState(false)
    const [adat, setAdat] = useState({ ertekeles: 0, megjegyzes: "" })
    const [vanEVelemeny, setvanEVelemeny] = useState(false)
    const [isMegjegyzesChanged, setMegjegyzesChanged] = useState(false)
    const [isErtekelesChanged, setErtekelesChanged] = useState(false)
    const [ertekelesJelenleg, setErtekelesJelenleg] = useState(0)

    const putErtekeles = async (body) => {
        try {
            const response = await fetch(`https://localhost:7159/api/Velemeny`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throwFetchErrorResponse(await response.text())
        }
        const data = await response.json()
        alert(data.message)
        navigate(0)
        
        } catch (error) {
            catchErrors(error)
        }
    }

    const deleteErtekeles = async (username) => {
        try {
            const tartalom = await fetch(`https://localhost:7159/api/Velemeny?username=${username}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            const data = await tartalom.json()
            alert(data.message)
            navigate(0)
        } catch (error) {
            catchErrors(error)
        }

    }

    const postErtekeles = async (body) => {
        try {
            const tartalom = await fetch("https://localhost:7159/api/Velemeny", {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = await tartalom.json()
            alert(data.message)
            setvanEVelemeny(true)
            navigate(0)
        } catch (error) {
            catchErrors(error)
        }
    }

    const getErtekeles = async () => {
        try {
            setPending(true)
            const response = await fetch(`https://localhost:7159/api/Velemeny/${username}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                    'Content-Type': 'application/json'
                }
            })
            const responseText = await response.text()
            if (!response.ok) {
                throwFetchErrorResponse(responseText)
                setvanEVelemeny(false)
            }
            else {
                const data = JSON.parse(responseText)
                setErtekelesJelenleg(Number(data.value.ertekeles))
                setAdat({
                    ertekeles: Number(data.value.ertekeles),
                    megjegyzes: data.value.megjegyzes
                })
                setvanEVelemeny(true)
            }

        } catch (error) {
            catchErrors(error, false)
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
            username: username,
            ertekeles: String(ertekelesJelenleg),
            megjegyzes: ujMegjegyzes
        }

        if (vanEVelemeny) {
            await putErtekeles(body)
        } else {
            await postErtekeles(body)
        }
    }

    const torolVelemeny = async () => {
        await deleteErtekeles(username);
        setAdat({
            ertekeles: 0,
            megjegyzes: ""
        })
        setvanEVelemeny(false)
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
        if (vanEVelemeny) {
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
            <div className="m-4">
                <h2 className="ertekeles">Értékelés</h2>
                <form method="post" onSubmit={(event) => { submitVelemeny(event); }}>
                    <div className="fs-1">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <i
                                key={num}
                                style={{color: "rgba(240, 188, 18, 1)"}}
                                className={num <= ertekelesJelenleg ? "bi bi-star-fill m-3" : "bi bi-star m-3"}
                                onClick={() => { setErtekelesChanged(ertekelesIsChanged(num)); setErtekelesJelenleg(num) }}
                            ></i>
                        ))}
                    </div>
                    <textarea id="comment" className="my-3" type="text" name="megjegyzes" defaultValue={megjegyzes} onChange={(event) => { setMegjegyzesChanged(megjegyzesIsChanged(event.target.value)) }} /><br />
                    <input className="btn btn-primary" type="submit" disabled={checkDataStatus()} />
                    {(vanEVelemeny) ?
                        <button className="btn btn-danger mx-2" type="button" onClick={() => { torolVelemeny() }}>Törlés</button>
                        : <></>
                    }
                    {vanEVelemeny ? <></> : <><p className="text-danger">Mező kitöltése kötelező!</p></>}
                </form>
            </div>
        </>
    )
}

export default Velemeny;