import style from "./styles/Equipo.module.css"
import { forwardRef } from "react"

const Equipo = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <div className={style.main}>
      <Background/>
    </div>
  );
}); export default Equipo;

const Background = () => {
  return(
    <div className="backgroundFill">
      <svg width="420" height="365" viewBox="0 0 420 365" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="96.7736" width="350.899" height="247.501" transform="rotate(23.0169 96.7736 0)" fill="#AAF480" fill-opacity="0.5"/>
      </svg>
    </div>
  )
}
