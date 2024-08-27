import React, { ChangeEvent, useState } from 'react'
import style from '../Personal/FormPerfil.module.css'
import ComponenteAlert, { AlertType } from '../../assets/ComponenteAlert';
import { useSearchParams } from 'react-router-dom';

interface Correo{
  to:string;
  from:string;
  asunto:string;
  mensaje:string;
}

const Contactanos = () => {
  const [searchParams] = useSearchParams()
  const [correo, setCorreo] = useState(searchParams.get('correo')??'');
  const [mensaje, setMensaje] = useState(searchParams.get('mensaje')??'');
  
  const EnviarMensaje = (e) => {
    e.preventDefault();
    const data = {
      service_id: 'service_99szjnl',
      template_id: 'template_zoxbdvj',
      user_id: 'ji_s6op1wCiV9Cvju',
      template_params: {
        'reply_to' : 'jcarrenoar@unal.edu.co ',
        'to_name' : 'Administrador',
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
          setCorreo('')
          setMensaje('')
        }else{
          ComponenteAlert("Error al enviar correo.",1.5,AlertType.ERROR)
          setCorreo('')
          setMensaje('')
        }
      }
    ).catch((err) => {
      ComponenteAlert("Error al enviar correo.",1.5,AlertType.ERROR)
      setCorreo('')
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
