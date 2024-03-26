import { useEffect, useRef } from "react";
import style from "./styles/Home.module.css"
import Inicio from "./Inicio";
import Marketing from "./Marketing";
import { useParams } from "react-router-dom";

const Home = () => {
  const section = useParams().section;

  const inicio = useRef<HTMLDivElement>(null);
  const marketing = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollOpt: ScrollIntoViewOptions =  {behavior: "smooth"}
    switch(section){
      case("equipo"):
      marketing.current?.scrollIntoView({behavior: "smooth"});
      break;
      case("servicios"):
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
    </>
  );
}

export default Home;
