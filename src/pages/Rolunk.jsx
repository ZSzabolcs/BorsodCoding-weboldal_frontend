import { checkUsername } from "../App.jsx"
import Felsoresz from "../modules/Felsoresz.jsx"
import Csiger from "../kepek/csigerkep.jpeg"
import Zelenak from "../kepek/szabolcskep.jpg"

const Kartya = ({ kep, nev, foglalkozas, monolog }) => {
    return (
        <div className="col-xxl-6">
            <div className="card" style={{ width: "400px" }}>
                <img className="card-img-top" src={kep} />
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
    checkUsername()
    return (
        <>
            <Felsoresz />
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
                    <Kartya
                        kep={Zelenak}
                        nev="Zelenák Szabolcs"
                        foglalkozas="Ötletgazda, tervező"
                        monolog="Soha nem gondoltam volna hogy ezzel fogok foglalkozni, de amikor jött a lehetőség, éltem vele."
                    />
                    <Kartya
                        kep={Csiger}
                        nev="Csiger Imre Krisztián"
                        foglalkozas="Háttérfolyamatokért felelős programozó"
                        monolog="Gyerekkorom óta érdekel a számítógép világa. Szeretném minél jobban megismerni a digitális teret ami körül vesz minket. Feltett szándékom valami különlegeset alkotni a felhasználók szórakoztatására."
                    />
                </div>
            </div>
        </>
    )
}

export default Rolunk