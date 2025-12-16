import { Link } from "react-router-dom";
import { bejelentkezes, regisztracio } from "../regist.js";
import Header from "../modules/Header.jsx";

export function Registration() {
    return (
    <>
        <Header/>
        <div className="container reg">
            <form method="post" id="form">
                <label>Felhasználónév</label>
                <input className="mb-3 form-control" type="text" id="userName"/><br/>
                <label>E-mail-cím</label>
                <input className="mb-3 form-control" type="email" id="userEmail"/><br/>
                <label>Jelszó</label>
                <input className="mb-3 form-control" type="password" id="userPassword"/>
                <div className="regDiv">
                    <button type="submit" className="btn btn-primary regGomb" onClick={() => { regisztracio() }} id="gomb">Regisztráció</button>
                    <Link to="/login" className="regLink">Már van fiókod?</Link>
                </div>
            </form>
        </div>
    </>
    )
}


export function Login(){
    return (
    <>
        <Header/>
        <div className="container reg">
            <form method="post" id="form">
                <label>Felhasználónév</label>
                <input className="mb-3 form-control" type="text" id="userName"/><br/>
                <label>E-mail-cím</label>
                <input className="mb-3 form-control" type="email" disabled={true} id="userEmail"/><br/>
                <label>Jelszó</label>
                <input className="mb-3 form-control" type="password" id="userPassword"/>
                <div className="regDiv">
                    <button type="submit" className="btn btn-primary regGomb" onClick={ () => { bejelentkezes() }}  id="gomb">Bejelentkezés</button>
                    <Link to="/" className="regLink">Még nincs fiókod?</Link>
                </div>
            </form>
        </div>
    </>
    )
}

