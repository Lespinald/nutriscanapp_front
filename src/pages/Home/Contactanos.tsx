import React, { ChangeEvent, useState } from 'react'
import style from '../Personal/FormPerfil.module.css'
import ComponenteAlert, { AlertType } from '../../assets/ComponenteAlert';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

interface Correo{
  to:string;
  from:string;
  asunto:string;
  mensaje:string;
}

export enum TiposCorreo {
  queja = 'queja',
  reporte = 'reporte',
  sugerencia = 'sugerencia',
  quieroContactar = 'Quiero contactarlos',
}

const Contactanos = () => {
  const correoRedux = useAppSelector((state) => state.auth.infoUsuario?.correo)
  const [searchParams] = useSearchParams()
  const [tipo, setTipo] = useState<TiposCorreo>(searchParams.get('tipo') as TiposCorreo ?? TiposCorreo.quieroContactar);
  const [correo, setCorreo] = useState(correoRedux ?? '');
  const [mensaje, setMensaje] = useState(searchParams.get('mensaje')??'');
  
  const EnviarMensaje = (e) => {
    e.preventDefault();
    const data = {
      service_id: 'service_99szjnl',
      template_id: 'template_zoxbdvj',
      user_id: 'ji_s6op1wCiV9Cvju',
      template_params: {
        'reply_to' : 'jcarrenoar@unal.edu.co ',
        'to_name' : `Administrador: ${tipo}`,
        'from_name': correo,
        'message' : mensaje,
      }
    };

    fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(
      (res) => {
        if(res.ok){
          ComponenteAlert("Correo enviado.",1.5,AlertType.SUCCESS)
          setCorreo(correoRedux ?? '')
          setMensaje('')
        }else{
          ComponenteAlert("Error al enviar correo.",1.5,AlertType.ERROR)
          setCorreo(correoRedux ?? '')
          setMensaje('')
        }
      }
    ).catch((err) => {
      ComponenteAlert("Error al enviar correo.",1.5,AlertType.ERROR)
      setCorreo(correoRedux ?? '')
      setMensaje('')
      console.error(err)
    })
  }

  return (
    <div style={{background: 'white',width:'100%',overflowY:'auto',padding:'1em 3em',margin:'auto',color:'var(--color-6)'}}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '1em' }}></h1>
      <h1 style={{color:'inherit',textAlign:'center'}}>Contactanos: </h1>
      {/* LA FUNCION ENVIAR CORREO PRUEBA FUNCIONA YA SOLO ES PASARLE LOS PARAMETROS NECESARIOS  */}
      <form style={{gap:'2%',display:'grid'}}>
        <div className={style.campo}>
          <label htmlFor="correo" style={{color:"var(--color-6)"}}>Correo:</label>
          <input type="text" name="name" className="form-control" placeholder="Nombre completo" value={correo} onChange={(e) => setCorreo(e.target.value)} required/>
        </div>
        <div className={style.campo}>
          <label htmlFor="tipo" style={{ color: "var(--color-6)" }}>Tipo:</label>
          <select
            name="tipo"
            className="form-control"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TiposCorreo)}
            required
          >
            <option value="" disabled>Seleccione un tipo</option>
            {Object.values(TiposCorreo).map((tipoCorreo) => (
              <option key={tipoCorreo} value={tipoCorreo}>
                {tipoCorreo.charAt(0).toUpperCase() + tipoCorreo.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className={style.campo}>
          <label htmlFor="correo" style={{color:"var(--color-6)"}}>Mensaje:</label>
          <textarea placeholder="Mensaje" className="form-control" name="message" rows={10} value={mensaje} onChange={(e) => setMensaje(e.target.value)} required></textarea>
        </div>
        <button type="submit" className={style.button} onClick={EnviarMensaje}>Enviar Correo</button>
        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '1em' }}></h1>
      </form>
    </div>
  )
}

export default Contactanos
