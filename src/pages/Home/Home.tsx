import { useRef } from "react";
import "./Home.css";
import Inicio from "./Inicio";
import Marketing from "./Marketing";

const Home = () => {
  const inicio = useRef<HTMLDivElement>(null);
  const marketing = useRef<HTMLDivElement>(null);
  return (
    <>
    <Inicio ref={inicio}/>
    <Marketing ref={marketing} />
    </>
  );
}

export default Home;
