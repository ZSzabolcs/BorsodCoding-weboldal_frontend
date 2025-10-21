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
    <App />
    </StrictMode>
    </>
)

function HeaderModule() {
  return(
    <header>
        <h1 class="text-center">
            For the potato
        </h1>
        <h3 class="mx-2">
            A Borsod Coding csapatától
        </h3>
    </header>
  )
}
