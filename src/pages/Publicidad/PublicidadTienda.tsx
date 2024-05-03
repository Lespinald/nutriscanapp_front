import ButtonTransparent from '../../assets/Components/ButtonTransparent';
import TiendaLogo from '../../assets/Components/TiendaLogo';
import { IsMobile } from '../../assets/Utils'
import style from './PublicidadTienda.module.css'
import ReactDOMServer from 'react-dom/server';

const PublicidadTienda:React.FC = () => {

  return (
    <div className={style.page}>
      <div className={style.backTriangulos}> 
        <div style={{width:'40svw',height:'fit-content',display:'flex',flexDirection:'column'}}>
          <img src="/Home/Inicio/textLogo.png" alt="nutriscan" style={{width:'100%'}}/>
          <div style={{width:'70%',aspectRatio:'3/0.5',display:'flex',justifyContent:'center',alignSelf:'center'}}>
            <ButtonTransparent onClick={() => {}} color='var(--color-2)'>COMENZAR AHORA</ButtonTransparent>
          </div>
        </div>
        <div style={{flex:'1',display:'flex',flexDirection:'column'}}>
          <p className={`${style.italic}`}>¿Buscando donde promocionar tus productos saludables?</p>
          <div className={style.promotion}>
            <img src='https://firebasestorage.googleapis.com/v0/b/nutriscan-9f5cf.appspot.com/o/TiendaTest%2Fimagen_2024-04-27_221044323.png?alt=media&token=ec5d519f-c9e4-4c73-94b6-38b68746af33' alt='default tienda' style={{width:'100%'}}></img>
            <div className={style.foot}>
              <TiendaLogo></TiendaLogo>
              <p style={{fontWeight:'400'}}>
                <span style={{fontWeight:'700',fontSize:'x-large'}}>TU TIENDA</span><br></br>
                Productos saludables para todos
              </p>
            </div>
          </div>
          <p className={`${style.italic} ${style.italic_little}`}>Publicita tus productos a quienes mas los quieren</p>
        </div>
      </div>
    </div>
  )
}

export default PublicidadTienda
