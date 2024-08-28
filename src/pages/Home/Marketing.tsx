import style from "./styles/Marketing.module.css"
import { forwardRef } from "react";

const Marketing = forwardRef<HTMLDivElement>(({}, ref) => {
  return(
  <div className={style.main} ref={ref}>
    <div className={style.left}>
      <h4>
      ¿Qué es NutriScan?
      </h4>
      <br></br>
      <p className={style.quote}>
        <strong>NutriScan</strong> es una innovadora herramienta diseñada
        para mejorar tu salud al proporcionarte información 
        clara y accesible. En un mundo donde las etiquetas
        nutricionales pueden ser confusas y difíciles de 
        interpretar, <strong>NutriScan</strong> te ayuda a entender que
        contienen tus alimentos, guiándote hacia opciones más
        saludables.
      </p>
      <br></br>
      <p> Descubre cómo NutriScan puede ser tu aliado en el camino hacia un estilo de vida más saludable.</p>
    </div>
    <div className={style.right}>
      <p>La Nueva Era de la Nutrición</p>
      <video src="/Home/Marketing/UN_NutriScan.mp4" controls></video>
    </div>
  </div>
  );
});

export default Marketing
