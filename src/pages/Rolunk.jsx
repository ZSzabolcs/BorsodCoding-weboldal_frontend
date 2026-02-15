import { CheckUserName } from "../App.jsx"
import Felsoresz from "../modules/Felsoresz.jsx"
import Csiger from "../kepek/csigerkep.jpeg"
import Zelenak from "../kepek/szabolcskep.jpg"

const Kartya = ({kep, nev, foglalkozas, monolog}) => {
    return (
        <div className="col-xxl-6">
            <div className="card" style={{width:"400px"}}>
                <img className="card-img-top" src={kep}/>
                <div className="card-body">
                    <h4 className="card-title">{nev}</h4>
                    <p className="card-text">{foglalkozas}</p>
                    <p className="card-text">{monolog}</p>
                </div>
            </div>
        </div>
    )
}

function Rolunk() {
    CheckUserName()
    return (
        <>
        <Felsoresz/>
        <div className="container">
        <h1 className="text-center my-4">
            Rólunk
        </h1>
        <p>
            <span className="paragraph">Egy</span> középiskolai projektként indultunk, azonban ennél többre akartuk vinni. Vállalkozássá akartuk kinőni magunkat, erre törekedtünk a kezdetektől fogva.
        </p>
        <p>
            <span className="paragraph">A</span> nevünk egy emlékeztető arra, honnan indultunk és milyen utat jártunk be ezidáig. Borsodi származásúak vagyunk.
        </p>
        <h2>
            Csapatunk
        </h2>
        <div className="row">
            <div className="col-xxl-6">
                <div className="card" style={{width:"400px"}}>
                    <img className="card-img-top" src={Zelenak}/>
                    <div className="card-body">
                      <h4 className="card-title">Zelenák Szabolcs</h4>
                      <p className="card-text">Ötletgazda, tervező</p>
                      <p className="card-text">Soha nem gondoltam volna hogy ezzel fogok foglalkozni, de amikor jött a lehetőség, éltem vele.</p>
                    </div>
                </div>
            </div>
            <div className="col-xxl-6">
                <div className="card" style={{width:"400px"}}>
                    <img className="card-img-top" src={Csiger}/>
                    <div className="card-body">
                      <h4 className="card-title">Csiger Imre Krisztián</h4>
                      <p className="card-text">Háttérfolyamatokért felelős programozó</p>
                      <p className="card-text">Gyerekkorom óta érdekel a számítógép világa. Szeretném minél jobban megismerni a digitális teret ami körül vesz minket. Feltett szándékom valami különlegeset alkotni a felhasználók szórakoztatására.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default Rolunk