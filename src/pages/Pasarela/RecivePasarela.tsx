import style from './Receive.module.css'

import Logo from './Logo'

const RecivePasarela = () => {
  return (
    <div className={style.page}>
      <Logo color='var(--color-5)'>Bienvenido NutriScan</Logo>
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
        <button className={style.button} >PROBAR FUNCIONES</button>
      </div>
    </div>
  )
}

export default RecivePasarela
