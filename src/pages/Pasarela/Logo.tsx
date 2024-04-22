import style from './Receive.module.css'

interface Props{
    color:string;
    children:string;
}

const Logo = ({children,color}:Props) => {
  return (
    <div className={style.logo}>
        <img className={style.hoja} src='/public/Pasarela/HojaLogo.png' alt='Imagen Hoja'></img>
        <div className={style.borde} style={{border:`10px solid ${color}`}}>
            <div className={style.letra} style={{color:`${color}`}}>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Logo
