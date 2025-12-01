import { Link } from "react-router-dom";
import { bejelentkezes, regisztracio } from "../regist";


export function RegistrationPage() {
    return (
        <div className="container">
        <form method="post" id="form">
            <input className="mb-3 form-control" type="text" id="userName"/><br/>
            <input className="mb-3 form-control" type="email" id="userEmail"/><br/>
            <input className="mb-3 form-control" type="password" id="userPassword"/>
            <button type="submit" className="btn btn-primary" onClick={() => { regisztracio() }} id="gomb">Regisztráció</button>
            <Link to="/login">Már van fiókod?</Link>
        </form>
    </div>
    )
}


export function LoginPage(){
    return (
        <div className="container">
        <form method="post" id="form">
            <input className="mb-3 form-control" type="text" id="userName"/><br/>
            <input className="mb-3 form-control" type="email" disabled={true} id="userEmail"/><br/>
            <input className="mb-3 form-control" type="password" id="userPassword"/>
            <button type="submit" className="btn btn-primary" onClick={ () => { bejelentkezes() }} id="gomb">Bejelentkezés</button>
            <Link to="/">Még nincs fiókod?</Link>
        </form>
    </div>
    )
}

