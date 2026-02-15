import { Link } from 'react-router-dom'

function Navigation() {
  return(
    <div className="container-fluid navigation">
        <div className="row justify-content-center text-center">
                <div className="col-xxl-1 col-md-3 col-sm-4 p-2 mx-4">
                <Link to="/fooldal">Kezdőlap</Link>
            </div>
                <div className="col-xxl-1 col-md-3 col-sm-4 p-2 mx-4">
                <Link to="/ajatekrol">A játékról</Link>                       
            </div>
                <div className="col-xxl-1 col-md-3 col-sm-4 p-2 mx-4">
                <Link to="/rolunk">Rólunk</Link>                         
            </div>
                <div className="col-xxl-1 col-md-3 col-sm-4 p-2 mx-4">
                <Link to="/kapcsolat">Kapcsolat</Link>                         
            </div>
                <div className="col-xxl-1 col-md-3 col-sm-4 p-2 mx-4">
                <Link to="/statisztika">Statisztika</Link>                         
            </div>
                <div className="col-xxl-1 col-md-3 col-sm-4 p-2 mx-4">
                <Link to="/fiok">Fiók</Link>                         
            </div>
                <div className="col-xxl-1 col-md-3 col-sm-4 p-2 mx-4">
                <Link to="/velemeny">Vélemény</Link>                         
            </div>
        </div>
        

    </div>
  )
}

export default Navigation;