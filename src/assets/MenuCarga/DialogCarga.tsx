import style from './carga.module.css'

type ColorCargar =  "--color-1" | "--color-2" | "--color-3" | "--color-4" | "--color-5" | "--color-6";

interface Props{
  isOpen: boolean;
  color?: ColorCargar;
}


const DialogCarga = ({isOpen, color = "--color-1"}:Props) => {
  return (
    <div className={style.fondo} style={isOpen?{backgroundColor: "#FFFFFF7F"}:{display:'none'}}>
      <div className={`${style.contain_logo} ${style[`contain_logo${color}`]}`}>
        <img src={`/logo${color}.png`} alt='Logo' className={style.logo}></img>
      </div>
      <p className={style.cargando} style={{color: `var(${color})`}}>Cargando</p>
    </div>
  )
}

export default DialogCarga
