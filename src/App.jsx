import { Routes, Route } from "react-router-dom";
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

export const CheckUserName = () => {
  const username = sessionStorage.getItem("username")
  if (username === "" || username === null || username === undefined) {
    sessionStorage.removeItem("username")
    location.assign("/")
  }
  return username;
}

export function catchErrors(error) {
  if (error.response) {
    console.error(`Hiba: ${error.response.data}`)
    alert(error.response.data)
  }
  else if (error.request) {
    console.error("Nincs kapcsolat a szerverrel: ", error.message)
  }
  else {
    console.error("Hiba történt: ", error.message)
  }
}

export class PasswordState {
  constructor() {
    this.isMinLength = false;
    this.isOneNumber = false;
    this.isOneBigChar = false;
    this.isOneSpecChar = false;
  }
}


