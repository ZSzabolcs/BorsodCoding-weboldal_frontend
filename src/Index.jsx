const Hir = ({cim, szoveg } ) => {
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
  const username = sessionStorage.getItem("username")
  if (username === "" || username === null) {
    document.location.assign("registration.html")
  }
  else
  return (
    <>
    <h1>Üdvözöljük <span>{username}!</span></h1>
    <br />
    <h2>Híreink</h2>
    <div className="row">
        <div className="col-md-6 border">
            <h3>Történetünk első játéka</h3>
            <p>
                Elkészült a <strong>For The Potatoe</strong> című <strong>legelső játékunk!</strong>  Kattintson a játékról nevű gombra, ha érdekli.
            </p>
        </div>
        <div className="col-md-6 border">
            <h3>Mikor lesz For The Potatoe 2?</h3>
            <p>
                A legelső játék készítése alatt már a folytatásai is kirajzolódott. A For The Potatoe 2 játékot 2026-ban vagy 2027-ben tervezzük elkezdeni a pénz függvényében.
            </p>
        </div>
    </div>
    </>
  )
}

export default Index
