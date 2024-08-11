import React from 'react'
import styleLogin from '../Login/login.module.css'
import { Link, useNavigate } from 'react-router-dom'

const TerminosYCondiciones = () => {
    const navigate = useNavigate()
  return (
    <div className={styleLogin.fondoLogin}>
        <div className={styleLogin.backButton} onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="3svh" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="3svh" xmlSpace="preserve" fill='white'>
                <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
            </svg>
        </div>
        TerminosYCondiciones
    </div>
  )
}

export default TerminosYCondiciones
