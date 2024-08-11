import { useEffect, useRef } from "react";
// import style from "./styles/Home.module.css"
import Inicio from "./Inicio";
import Marketing from "./Marketing";
import { useParams } from "react-router-dom";
import Equipo from "./Equipo";
import FootPage from "./FootPage";
import Objetivos from "./Objetivos";
import Servicio from "./Servicio";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInWithCustomToken } from "firebase/auth";

const Home = () => {
  const dispatch = useDispatch();
  const section = useParams().section;

  const inicio = useRef<HTMLDivElement>(null);
  const marketing = useRef<HTMLDivElement>(null);
  const equipo = useRef<HTMLDivElement>(null);
  const servicio = useRef<HTMLDivElement>(null);
  const objetivos = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollOpt: ScrollIntoViewOptions =  {behavior: "smooth"}
    switch(section){
      case("equipo"):
      equipo.current?.scrollIntoView(scrollOpt);
      break;
      case("servicios"):
      servicio.current?.scrollIntoView(scrollOpt);
      break;
      case("objetivos"):
      objetivos.current?.scrollIntoView(scrollOpt);
      break;
      case(null || undefined):
      inicio.current?.scrollIntoView(scrollOpt);
      break
    }
  })

  return (
    <>
      <Inicio ref={inicio} />
      <Marketing ref={marketing} />
      <Equipo ref={equipo} />
      <Objetivos ref={objetivos} />
      <Servicio ref={servicio} />
    </>
  );
}

export default Home;
