import { useNavigate } from 'react-router-dom';
import ButtonTransparent from '../../assets/Components/ButtonTransparent';
import TiendaLogo from '../../assets/Components/TiendaLogo';
import { IsMobile } from '../../assets/Utils'
import style from './PublicidadTienda.module.css'
import ReactDOMServer from 'react-dom/server';

const PublicidadTienda:React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={style.page}>
      <div className={style.backTriangulos}> 
        <div style={{width:'60svh',height:'fit-content',display:'flex',flexDirection:'column',gap:'15px'}}>
          <img src="/Home/Inicio/textLogo.png" alt="nutriscan" style={{width:'100%'}}/>
          <div style={{width:'70%',aspectRatio:'3/0.5',display:'flex',justifyContent:'center',alignSelf:'center'}}>
            <button className={style.button} onClick={() => navigate('/pago/tienda')}>COMENZAR AHORA</button>
          </div>
        </div>
        <div style={{flex:'1',display:'flex',flexDirection:'column',minWidth:'40svh',justifyContent:'center',gap:'15px'}}>
          <p className={`${style.italic}`}>¿Buscando donde promocionar tus productos saludables?</p>
          <div className={style.promotion}>
            <img src='https://firebasestorage.googleapis.com/v0/b/nutriscan-9f5cf.appspot.com/o/TiendaTest%2Fimagen_2024-04-27_221044323.png?alt=media&token=ec5d519f-c9e4-4c73-94b6-38b68746af33' alt='default tienda' style={{width:'100%'}}></img>
            <div className={style.foot}>
              <TiendaLogo></TiendaLogo>
              <p>
                <span>TU TIENDA</span><br></br>
                Productos saludables para todos
              </p>
            </div>
          </div>
          <p className={`${style.italic} ${style.italic_little}`}>Publicita tus productos a quienes mas los quieren</p>
        </div>
      </div>
      <div className={style.backDark}>
        <h2 className={style.subtitule}>Muestra lo que ofreces y encuentra nuevos clientes</h2>
        <img src='/Publicidad/screenTienda.png' style={{width:'100%',borderRadius:'15px',margin:'7svh 0'}} className={style.screenDesktop}></img>
        <img src='/Publicidad/screenMobile.png' style={{borderRadius:'15px',margin:'7svh 0'}} className={style.screenMobile}></img>
      </div>
    </div>
  )
}

export default PublicidadTienda
