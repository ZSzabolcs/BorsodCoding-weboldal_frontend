import { Routes, Route, useNavigate } from "react-router-dom";
import AJatekrol from './pages/Ajatekrol.jsx'
import { RegistrationOrLoginForm } from './pages/RegistrationAndLogin.jsx'
import Rolunk from './pages/Rolunk.jsx'
import Kapcsolat from './pages/Kapcsolat.jsx'
import Index from "./pages/Index.jsx"
import Statisztika from "./pages/Statisztika.jsx";
import Fiok from "./pages/Fiok.jsx";
import Velemeny from "./pages/Velemeny.jsx";


export const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<RegistrationOrLoginForm />} />
        <Route path="/rolunk" element={<Rolunk />} />
        <Route path="/kapcsolat" element={<Kapcsolat />} />
        <Route path="/ajatekrol" element={<AJatekrol />} />
        <Route path="/fooldal" element={<Index />} />
        <Route path="/statisztika" element={<Statisztika />} />
        <Route path="/fiok" element={<Fiok />} />
        <Route path="/velemeny" element={<Velemeny />} />
      </Routes>
    </>
  );
}

export const checkUsername = () => {
  const username = sessionStorage.getItem("username")
  if (username === "" || username === null || username === undefined) {
    sessionStorage.removeItem("username")
    location.assign("/")
  }
  return username;
}

export const getDateByOwnStringFormat = (date) => {
  const givenDate = new Date(date)
  return `${givenDate.toLocaleDateString()} ${givenDate.getHours()}:${givenDate.getMinutes()}:${givenDate.getSeconds()}`
}

export async function catchErrors(error) {
  let hibatipus;
  if (error.response && error.response.data instanceof Blob) {
        const hibaSzoveg = await error.response.data.text();
        
        console.error("Szerver hibaüzenete:", hibaSzoveg);
        alert(hibaSzoveg);
  }
  else if (error.response) {
    hibatipus = "Válasz hiba:"
    if (typeof(error.response.data) === "string") {
      console.error(`${hibatipus} ${error.response.data}`)
      alert(error.response.data)
    }
    else{
      console.error(`${hibatipus} ${error.response.data.message}`)
      alert(error.response.data.message)
    }

  }
  else if (error.request) {
    hibatipus = "Nincs kapcsolat a szerverrel:"
    console.error(`${hibatipus} ${error.message}`)
  }
  else {
    console.error(`Hiba történt: ${error.message}` )
  }
}



