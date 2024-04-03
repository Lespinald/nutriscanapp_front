import style from "./styles/Marketing.module.css"
import { forwardRef } from "react";

const Marketing = forwardRef<HTMLDivElement>(({}, ref) => {
  return(
  <div className={style.main} ref={ref}>
      <div className={style.left}>
        <img src="/Home/Marketing/logoColor1.png" alt="logo Nutriscan" className={style.logo}/>
        <p className={style.quote}>
          - "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.""
        </p>
      </div>
      <div className={style.right}>
        <p>La Nueva Era de la Nutrición</p>
        <video src="/Home/Marketing/randomMercado.mp4" controls></video>
      </div>
  </div>
  );
});

export default Marketing
