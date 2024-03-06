import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {

  const navigate = useNavigate();

  return (
    <>
    <div className="homeMain">
      <img className="scannerImg" src="/Home/scanner_.png" alt="scanner"/>
      <div className="homeTitulo">Bienvenido a NutriScan</div>

      <div className="homeInfo">
        <img src="/Home/patatas.png" alt="patatas" />
        <div>Identifique la tabla nutricional al respaldo de su empaque</div>
        <img src="/Home/scanear.png" alt="scanear" />
        <div>Utilice su celular para escanear la tabla nutricional, procure enmarcar la imagen a la tabla que se va a usar</div>
      </div>

      <button className="botonBasico" onClick={() => navigate("/Scan")}>
        Empezar
      </button>
    </div>
    </>
  );
}

export default Home;
