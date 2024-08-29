import style from "./styles/Equipo.module.css"
import { forwardRef } from "react"

const Equipo = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <div className={style.main} ref={ref}>
      <p>¿Quienes somos?</p>
      <div className={style.members}>
        <Card url="" image="/Home/Equipo/JuanRodriguez.jpg" name="Juan Rodriguez" info="Arquiteco de BD & Dev Frontend" />
        <Card url="https://www.linkedin.com/in/lina-sofia-espinal-daza-78ab34305/" image="/Home/Equipo/Lina.jpeg" name="Lina Espinal" info="UX/UI & Frontend Dev" />
        <Card url="https://www.linkedin.com/in/juan-andres-carreño-arevalo-a42a46267/" image="/Home/Equipo/JuanAndres.jpeg" name="Juan Carreño" info="DevOps BD & Backend Dev" />
        <Card url="" image="/Home/Equipo/Oscar.png" name="Oscar Martínez" info="QA & Backend Dev" />
      </div>
      <Background/>
    </div>
  );
}); export default Equipo;

interface CardProps{
  image: string;
  name: string;
  info: string;
  url: string;
}
const Card = ({image, name, info,url}: CardProps) => {
  const redirect = () => {
    window.open(url)
  }

  return(
    <div className={`${style.card} estiloButton`} onClick={redirect}>
      <img src={image} alt={name} />
      <div>
        <h1>{name}</h1>
        <p>{info}</p>
      </div>
    </div>
  );
}

const Background = () => {
  return(
    <div className="backgroundFill">
      <svg style={{position: "absolute", top: "-10%", left: "40%"}}
       width="258" height="225" viewBox="0 0 420 365" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="96.7736" width="350.899" height="247.501" transform="rotate(23.0169 96.7736 0)" fill="var(--color-2)" fillOpacity="0.5"/>
      </svg>
      <svg style={{position: "absolute", top: "35%", left: "-10%"}}
       width="258" height="225" viewBox="0 0 420 365" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="96.7736" width="350.899" height="247.501" transform="rotate(23.0169 96.7736 0)" fill="var(--color-1)" fillOpacity="0.5"/>
      </svg>
      <svg style={{position: "absolute", top: "25%", left: "80%"}}
       width="258" height="225" viewBox="0 0 420 365" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="96.7736" width="350.899" height="247.501" transform="rotate(23.0169 96.7736 0)" fill="var(--color-1)" fillOpacity="0.5"/>
      </svg>
      <svg style={{position: "absolute", top: "75%", left: "35%"}}
       width="258" height="225" viewBox="0 0 420 365" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="96.7736" width="350.899" height="247.501" transform="rotate(23.0169 96.7736 0)" fill="var(--color-2)" fillOpacity="0.5"/>
      </svg>
    </div>
  )
}
