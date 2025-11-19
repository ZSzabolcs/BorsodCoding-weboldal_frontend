import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from "./Index.jsx"
import "./index.css"
import Navigation from './Navigation.jsx'
import Header from './Header.jsx'
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




