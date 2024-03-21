import React from 'react'

const Registro = () => {
  return (
    <div className='fondoLogin'>
        <h1 className='loginTitle'>BIENVENIDO</h1>
        <form style={{display:'flex',flexDirection:'column'}}>
            <input autoComplete='true' type='text' id='name' placeholder='Nombre'></input>
            <input autoComplete='true' type='email' id='email' placeholder='Correo'></input>
            <input autoComplete='true' type='password' id='password' placeholder='Contraseña'></input>
            <input autoComplete='true' type='tel' id='telefono' placeholder='Celular'></input>
            <input autoComplete='true' type='date' id='birthday' placeholder='Fecha de nacimiento'></input>
            <input autoComplete='true' type='number' id='altura' placeholder='Altura(m)'></input>
            <input autoComplete='true' type='number' id='pesp' placeholder='Peso(Kg)'></input>
            <button className='button_logIn'>
                Registrarse
            </button>
            <div className='fondoLogin-line'></div>
            <button className='button_google'>
                <img src='\Login\GoogleIcon.png'></img>
                <p>Continuar con Google</p>
            </button>
        </form>
        <a  className='fondoLogin_label' href='/Login'>¿Ya tienes cuenta? Ingresa aquí</a>
    </div>
  )
}

export default Registro
