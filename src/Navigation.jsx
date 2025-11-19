function Navigation() {
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

export default Navigation