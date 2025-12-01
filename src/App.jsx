import { Routes, Route } from "react-router-dom";
import AJatekrol from './pages/Ajatekrol.jsx'
import { RegistrationPage, LoginPage } from './pages/RegistrationAndLogin.jsx'
import Rolunk from './pages/Rolunk.jsx'
import Kapcsolat from './pages/Kapcsolat.jsx'
import Index from "./pages/Index.jsx"

export const App = () => {
return (
<>
<Routes>
    <Route path="/" element={<RegistrationPage />} />
    <Route path="/login" element={<LoginPage/>} />
    <Route path="/rolunk" element={<Rolunk />} />
    <Route path="/kapcsolat" element={<Kapcsolat />} />
    <Route path="/ajatekrol" element={<AJatekrol />} />
    <Route path="/index" element={<Index />} />
</Routes>
</>
);
}

export const CheckUserName = () => {
  const username = sessionStorage.getItem("username")
  if (username === "" || username === null) {
    document.location.assign("/")
  }
  return username;
}
