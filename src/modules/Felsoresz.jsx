import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import Navigation from "./Navigation.jsx";

const backToLoginAndRegistPage = () => {
    sessionStorage.removeItem("username")
    localStorage.removeItem("jwt")
    location.assign("/")
}

const Felsoresz = () => {
    return(
        <>
            <Header/>
            <Navigation/>
            <button className="btn btn-primary" onClick={backToLoginAndRegistPage}>Kijelentkezés</button>
        </>
    )
}

export default Felsoresz;