import { regisztracio, bejelentkezes } from "./regist.js"

function Registration() {
    document.getElementById("form").addEventListener("submit", regisztracio);
    document.getElementById("bejelentkezes").addEventListener("click", (event) => {
    if (document.title == "Regisztráció") {
        document.title = "Bejelentkezés"
        document.getElementById("gomb").firstChild.textContent = "Bejelentkezés"
        document.getElementById("form").addEventListener("submit", bejelentkezes)
        event.target.firstChild.textContent = "Még nincs fiókod?"
        
    }
    else{
        document.title = "Regisztráció"
        document.getElementById("gomb").firstChild.textContent = "Regisztráció"
        document.getElementById("form").addEventListener("submit", regisztracio)
        event.target.firstChild.textContent = "Már van fiókod?"
    }
})
    return (
        <>
        <div className="container">
        <form method="post" id="form">
            <input className="mb-3 form-control" type="text" name="userName"/><br/>
            <input className="mb-3 form-control" type="email" name="userEmail"/><br/>
            <input className="mb-3 form-control" type="password" name="userPassword"/>
            <button type="submit" className="btn btn-primary" id="gomb">Regisztráció</button>
            <a href="#" id="bejelentkezes">Már van fiókod?</a>
        </form>
    </div>
    <script src="regist.js"></script>
    </>
    )
}
export default Registration;