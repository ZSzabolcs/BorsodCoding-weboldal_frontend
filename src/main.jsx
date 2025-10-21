import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.jsx"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

createRoot(document.getElementById('root')).render(
    <>
    <StrictMode>
    <HeaderModule />
    <NavigationModule></NavigationModule>
    <App />
    </StrictMode>
    </>
)

function HeaderModule() {
  return(
    <header>
        <h1 className="text-center">
            For the potato
        </h1>
        <h3 className="mx-2">
            A Borsod Coding csapatától
        </h3>
    </header>
  )
}

function NavigationModule() {
  return(
    <div className="container-fluid navigation">
        <div className="row justify-content-center text-center">
            <div className="col-xxl-1 col-md-3 col-sm-4 p-2 mx-4">
                <a href="index.html">
                    Kezdőlap
                </a>
            </div>
            <div className="col-xxl-1 col-md-3 col-sm-4 p-2 mx-4">
                <a href="ajatekrol.html">
                    A játékról
                </a>                        
            </div>
            <div className="col-xxl-1 col-md-3 col-sm-4 p-2 mx-4">
                <a href="rolunk.html">
                    Rólunk
                </a>                        
            </div>
            <div className="col-xxl-1 col-md-3 col-sm-4 p-2 mx-4">
                <a href="kapcsolat.html">
                    Kapcsolat
                </a>                        
            </div>
        </div>
    </div>
  )
}
