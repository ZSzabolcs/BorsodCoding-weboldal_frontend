import { Link } from "react-router-dom";
import { bejelentkezes, regisztracio } from "../regist.js";


export function Registration() {
    return (
        <div className="container regDiv">
        <form method="post" id="form">
            <input className="mb-3 form-control" type="text" id="userName"/><br/>
            <input className="mb-3 form-control" type="email" id="userEmail"/><br/>
            <input className="mb-3 form-control" type="password" id="userPassword"/>
            <button type="submit" className="btn btn-primary regGomb" onClick={() => { regisztracio() }} id="gomb">Regisztráció</button>
            <Link to="/login" className="regLink">Már van fiókod?</Link>
        </form>
    </div>
    )
}


export function Login(){
    return (
        <div className="container regDiv">
        <form method="post" id="form">
            <input className="mb-3 form-control" type="text" id="userName"/><br/>
            <input className="mb-3 form-control" type="email" disabled={true} id="userEmail"/><br/>
            <input className="mb-3 form-control" type="password" id="userPassword"/>
            <button type="submit" className="btn btn-primary regGomb" onClick={ () => { bejelentkezes() }} id="gomb">Bejelentkezés</button>
            <Link to="/" className="regLink">Még nincs fiókod?</Link>
        </form>
    </div>
    )
}

