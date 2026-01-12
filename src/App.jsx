import { Routes, Route } from "react-router-dom";
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
  const username = sessionStorage.getItem("username")
  if (username === "" || username === null || username === undefined) {
    sessionStorage.removeItem("username")
        location.assign("/")
  }
  return username;
}
