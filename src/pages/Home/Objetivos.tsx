import style from "./styles/Objetivos.module.css"

import { forwardRef } from "react";

const Objetivos = forwardRef<HTMLDivElement>(({}, ref) => {
  return(
    <div className={style.main} ref={ref}>
      <div>
        <h1>
          VISIÓN
        </h1>
        <p>
        Para el 2028 con más de 10 millones de usuarios activos volviéndonos
        líderes en la industria de la información nutricional ofreciendo una
        plataforma y servicios de alta calidad que transformen la manera en
        que las personas interactúan con su alimentación.
        </p>
      </div>
      <div>
        <h1>
          MISIÓN
        </h1>
        <p>
        Nuestra misión en NutriScan es empoderar a las personas para que tomen
        decisiones informadas y saludables sobre su alimentación. Nos
        comprometemos a promover hábitos alimenticios equilibrados y a fomentar
        un estilo de vida saludable.
        </p>
      </div>
    </div>
  );
});

export default Objetivos;
