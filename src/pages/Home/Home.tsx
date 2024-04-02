import { useEffect, useRef } from "react";
// import style from "./styles/Home.module.css"
import Inicio from "./Inicio";
import Marketing from "./Marketing";
import { useParams } from "react-router-dom";
import Equipo from "./Equipo";
import FootPage from "./FootPage";
import Servicio from "./Servicio";

const Home = () => {
  const section = useParams().section;

  const inicio = useRef<HTMLDivElement>(null);
  const marketing = useRef<HTMLDivElement>(null);
  const equipo = useRef<HTMLDivElement>(null);
  const servicio = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollOpt: ScrollIntoViewOptions =  {behavior: "smooth"}
    switch(section){
      case("equipo"):
      equipo.current?.scrollIntoView({behavior: "smooth"});
      break;
      case("servicios"):
      servicio.current?.scrollIntoView({behavior: "smooth"});
      break;
      case(null || undefined):
      inicio.current?.scrollIntoView(scrollOpt);
      break
    }
  })
  return (
    <>
      <Inicio ref={inicio}/>
      <Marketing ref={marketing} />
      <Equipo ref={equipo} />
      <Servicio ref={servicio} />
      <FootPage/>
    </>
  );
}

export default Home;
