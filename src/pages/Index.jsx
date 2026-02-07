import { CheckUserName } from "../App"
import Felsoresz from "../modules/Felsoresz"

const Hir = ({cim, szoveg}) => {
    return(
        <div className="col-md-6 border">
            <h3>{cim}</h3>
            <p>
                {szoveg}
            </p>
        </div>
    )
}

function Index() {
  const username = CheckUserName()
  return (
    <>
    <Felsoresz/>
    <h1>Üdvözöljük <span>{username}!</span></h1>
    <br />
    <h2>Híreink</h2>
    <div className="row">
        <Hir cim="Történetünk első játéka" szoveg={
            <>
                Elkészült a <strong>For The Potato</strong> című <strong>Legelső játékunk!</strong> Katttintson a játékról nevű gomba, ha érdekli.
            </>
        }/>
        <Hir cim="Mikor lesz For The Potato 2?" szoveg={
            <>
                A legelső játék készítése alatt már a folytatásai is kirajzolódott. A For The Potato 2 játékot 2026-ban vagy 2027-ben tervezzzük 
            </>
        }/>
    </div>
    </>
  )
}

export default Index
