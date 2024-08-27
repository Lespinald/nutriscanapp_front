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
          NutriScan es una innovadora herramienta diseñada
          para mejorar tu salud al proporcionarte información 
          clara y accesible. En un mundo donde las etiquetas
          nutricionales pueden ser confusas y difíciles de 
          interpretar, NutriScan te ayuda a entender que
          contienen tus alimentos, guiándote hacia opciones más
          saludables.
        </p>
        <br></br>
        <p className={style.quote}>
          Con NutriScan, solo necesitas escanear el código de 
          barras de un producto para recibir un análisis  
          detallado de sus componentes y valores nutricionales.
          Además, la herramienta te sugiere alternativas más  
          saludables permitiéndote tomar decisiones informadas
          al momento de comprar y consumir alimentos.
        </p>
        <br></br>
        <p className={style.quote}>
          NutriScan no solo complementa los sellos 
          nutricionales en los empaques, sino que también 
          ofrece información más detallada y personalizada,
          ayudándote a mantener una dieta balanceada. En 
          futuras actualizaciones, NutriScan integrará relaciones
          entre el consumo excesivo de ciertos alimentos
          y posibles riesgos para la salud, así como alianzas
          con profesionales de la salud para ofrecerte
          un acompañamiento aún más completo.
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
