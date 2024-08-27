import React from 'react'
import style from './styles/FootPage.module.css'
import ButtonTransparent from '../../assets/Components/ButtonTransparent'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'
import ComponenteAlert, { AlertType } from '../../assets/ComponenteAlert'

const FootPage = () => {
  const autenticado = useAppSelector((state) => state.auth.status === 'authenticated')
  const navigate = useNavigate();

  return (
    <footer className={style.back}>
      <section className={style.sidebar}>
            <svg style={{margin:"0.24em"}} xmlns="http://www.w3.org/2000/svg" width="1.52em" height="1.52em" viewBox="0 0 24 24" fill='white' onClick={() => {window.open('https://twitter.com/UN_ScanNutri')}}>
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-.139 9.237c.209 4.617-3.234 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.08-4.03 3.199-4.03.943 0 1.797.398 2.395 1.037.748-.147 1.451-.42 2.086-.796-.246.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.439.656-.996 1.234-1.639 1.697z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="2em" height="2em" fill='white' onClick={() => {window.open('https://www.instagram.com/un_nutriscan/')}}>
                <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="2em" height="2em" fill='white' onClick={() => {window.open('https://www.facebook.com/profile.php?id=61556562670860')}}>
                <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z"/>
            </svg>
            <svg style={{margin:"0.125em"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="1.75em" height="1.75em" fill='white' onClick={() => {window.open('https://www.tiktok.com/@un_nutriscan')}}>
                <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"/>
            </svg>
      </section>
      <section className={style.header}>
            <div>
                <h3>Nosotros</h3>
                <br></br>
                <p onClick={() =>{navigate('/conocenos')}}>¿Quienes Somos?</p>
                <p onClick={() =>{navigate('/objetivos')}}>Mision</p>
                <p onClick={() =>{navigate('/equipo')}}>Equipo</p>
            </div>
            <div>
                <h3>Soporte</h3> 
                <br></br>
                <p onClick={() =>{navigate('/FAQ')}}>Preguntas frecuentes</p>
                <p onClick={() =>{navigate('/Manual')}}>Manual de usuario</p>
                <p onClick={() =>{navigate('/Contactanos')}}>Contactanos</p>
            </div>
      </section>
    </footer>
  )
}

export default FootPage
