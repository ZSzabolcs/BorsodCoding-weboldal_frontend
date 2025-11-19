import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from "./Index.jsx"
import "./index.css"
import Navigation from './Navigation.jsx'
import Header from './Header.jsx'
import AJatekrol from './Ajatekrol.jsx'
import Registration from './Registration.jsx'
import Rolunk from './Rolunk.jsx'
import Kapcsolat from './Kapcsolat.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

if (document.getElementById("root")) {
    createRoot(document.getElementById('root')).render(
    <>
    <StrictMode>
    <Header />
    <Navigation/>
    <Index />
    </StrictMode>
    </>
    )
}

else if(document.getElementById("ajatekrol")){
    createRoot(document.getElementById('ajatekrol')).render(
    <>
    <StrictMode>
    <Header />
    <Navigation/>
    <AJatekrol/>
    </StrictMode>
    </>
    )
}

else if(document.getElementById("kapcsolat")){
    createRoot(document.getElementById('kapcsolat')).render(
    <>
    <StrictMode>
    <Header />
    <Navigation/>
    <Kapcsolat/>
    </StrictMode>
    </>
    )
}

else if(document.getElementById("rolunk")){
    createRoot(document.getElementById('rolunk')).render(
    <>
    <StrictMode>
    <Header />
    <Navigation/>
    <Rolunk/>
    </StrictMode>
    </>
    )
}


