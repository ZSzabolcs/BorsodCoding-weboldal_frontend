import { checkUsername } from "../App"
import Felsoresz from "../modules/Felsoresz"

const Hir = ({ cim, szoveg }) => {
    return (
        <div className="col-md-6 border">
            <h3>{cim}</h3>
            <p>
                {szoveg}
            </p>
        </div>
    )
}

function Index() {
    const username = checkUsername()
    return (
        <>
            <Felsoresz />
            <h2 className="mx-3">Híreink</h2>
            <div className="row mx-3">
                <Hir cim="Kis lépés egy embernek, de hatalmas lépés egy krumplinak" szoveg={
                    <>
                        <p>
                            Elkészült első játékunk, a For The Potato! A róla szóló cikket az alábbi linken tekinthetik meg.<br />
                            <a href="/ajatekrol">link</a>
                        </p>
                    </>
                } />
                <Hir cim="For The Potato 2?" szoveg={
                    <>
                        Igen, tervezünk folytatást a jövőben. Hogy mikor, azt egyelőre mi sem tudjuk, sok mindentől függ, de hamarosan érkezünk a legújabb fejleményekkel és részletekkel.
                    </>
                } />
            </div>
        </>
    )
}

export default Index
