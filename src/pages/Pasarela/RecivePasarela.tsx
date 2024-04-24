import style from './Receive.module.css'

import Logo from './Logo'
import { IsMobile } from '../../assets/Utils'

const RecivePasarela = () => {
  const condicionesTienda = [
    "Incluye recomendaciones basadas en tus preferencias",
    "Seguimiento de nutrición diaría",
    "No pierdes tus registros semanalmente",
    "Información nutricional de calidad"
  ];

  return (
    <div className={style.page}>
      <div className={style.contain}>
        <Logo color='var(--color-5)'>Bienvenido NutriScan</Logo>
        {!IsMobile() && <>
          <p>Tu plan incluye:</p>
          <ul className={style.listado}>
            {condicionesTienda.map((condicion,index) => (
                <li key={index}>{condicion}</li>
            ))}
          </ul>
          <button className={style.button} >PROBAR FUNCIONES</button>
        </>}
      </div>
      <div className={style.factura}>
        <h1 style={{textAlign:'center',fontSize:'4svh'}}>RESUMEN</h1>
        <div style={{textWrap: 'nowrap',overflow: 'hidden'}}>----------------------------------------------------------</div>
        <div className={style.campo}>
            <label>NOMBRE</label>
            <label>nombre</label>
        </div>
        <div className={style.campo}>
            <label>FECHA</label>
            <label>23-4-2024</label>
        </div>
        <div className={style.campo}>
            <label>ESTADO</label>
            <label>aprovada</label>
        </div>
        <div className={style.campo}>
            <label>VALOR</label>
            <label>$ 50.000</label>
        </div>
        <div className={style.campo}>
            <label>TIPO</label>
            <label>TIENDA</label>
        </div>
        {IsMobile() && <button className={style.button} >PROBAR FUNCIONES</button>}
      </div>
    </div>
  )
}

export default RecivePasarela
