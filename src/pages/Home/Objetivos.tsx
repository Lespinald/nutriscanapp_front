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
        Para el 2028 contaremos con 10 millones de usuarios registrados, siendo líderes en la divulgación de información nutricional veraz y coherente.
        </p>
      </div>
      <div>
        <h1>
          MISIÓN
        </h1>
        <p>
        Nuestra misión es empoderar a las personas para que tomen decisiones veraces, coherentes y saludables sobre su alimentación, mejorando su salud al proporcionarles acceso fácil y rápido a información precisa sobre nutrición.
        </p>
      </div>
    </div>
  );
});

export default Objetivos;
