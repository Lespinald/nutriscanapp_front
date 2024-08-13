import React, { ChangeEvent, useState } from 'react'
import style from '../Personal/FormPerfil.module.css'
import { EnviarCorreo } from '../../assets/Utils';

interface Correo{
    to:string;
    from:string;
    asunto:string;
    mensaje:string;
}

const Contactanos = () => {

    return (
        <div>
            <div style={{background: 'var(--color-6)',width:'100%',overflowY:'auto'}}>
                <h1 style={{color:'white'}}>Contactanos:</h1>
                <form target="_blank" action="https://formsubmit.co/jcarrenoar@unal.edu.co" method="POST">
                    <div className={style.campo}>
                        <label htmlFor="correo">Correo:</label>
                        <input type="text" name="name" className="form-control" placeholder="Full Name" required/>
                    </div>
                    <div className={style.campo}>
                        <label htmlFor="correo">Correo:</label>
                        <textarea placeholder="Your Message" className="form-control" name="message" rows={10} required></textarea>
                    </div>
                    <button type="submit" className={style.button}>Enviar Correo</button>
                    <button type="submit" hidden name='_next' value={"https://nutriscan.com.co/Contactanos"}></button>
                </form>
            </div>
        </div>
    )
}

export default Contactanos
