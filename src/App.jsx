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
      location.assign("/")
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
        sessionStorage.setItem("username", name)
        location.assign("index")
  }
} catch (error) {
  console.error(error);
};
}