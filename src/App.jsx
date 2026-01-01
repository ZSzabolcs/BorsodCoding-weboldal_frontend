import { Routes, Route, useNavigate } from "react-router-dom";
import AJatekrol from './pages/Ajatekrol.jsx'
import { Registration, Login } from './pages/RegistrationAndLogin.jsx'
import Rolunk from './pages/Rolunk.jsx'
import Kapcsolat from './pages/Kapcsolat.jsx'
import Index from "./pages/Index.jsx"
import Statisztika from "./pages/Statisztika.jsx";
import Fiok from "./pages/Fiok.jsx";

export const App = () => {
return (
<>
<Routes>
    <Route index element={<Registration />} />
    <Route path="/login" element={<Login/>} />
    <Route path="/rolunk" element={<Rolunk />} />
    <Route path="/kapcsolat" element={<Kapcsolat />} />
    <Route path="/ajatekrol" element={<AJatekrol />} />
    <Route path="/fooldal" element={<Index />} />
    <Route path="/statisztika" element={<Statisztika />} />
    <Route path="/fiok" element={<Fiok />} />
</Routes>
</>
);
}

export const CheckUserName = () => {
  const navigate = useNavigate()
  const username = sessionStorage.getItem("username")
  if (username === "" || username === null) {
      navigate("/")
  }
  return username;
}

export async function POSTToMainPage(url, data) {
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const {name} = data;
const raw = JSON.stringify(data);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

try {
  const response = await fetch(url, requestOptions);
  const result = await response.text();
  console.log(response.body)
  console.log(result)
  
  if (response.ok) {
    if (url === "http://localhost:5233/api/User/Login") {
              alert("Sikeres bejelentkezés")
      }
      else {
        alert("Sikeres regisztráció")
      }
        sessionStorage.setItem("username", name)
        location.assign("fooldal")
  }
  else{
      if (url === "http://localhost:5233/api/User/Login") {
          alert("Sikertelen bejelentkezés")
      }
      else {
        alert("Sikertelen regisztráció")
      }
  }
} catch (error) {
  
  alert(error)
};
}