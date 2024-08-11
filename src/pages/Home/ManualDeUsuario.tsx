import React from 'react'
import styleLogin from '../Login/login.module.css'
import { Link, useNavigate } from 'react-router-dom'

const ManualDeUsuario = () => {
  const navigate = useNavigate()
  return (
    <div className={styleLogin.fondoLogin} style={{ height: 'fit-content' }}>
      <div style={{ height: "fit-content", display: "flex", alignItems: "center", marginBottom: '20px' }}>
        <div className={styleLogin.backButton} onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="2em" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="2em" xmlSpace="preserve" fill='white'>
            <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " />
          </svg>
        </div>
        <h2 style={{ marginLeft: '10px', color: '#fff' }}>Manual de Usuario</h2>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '10px', color: '#333' }}>
        <h3>1. Registro y Acceso</h3>
        <p><strong>Registro de Usuario:</strong> Todos los usuarios deben registrarse para acceder a los servicios de NutriScan. No se permite el acceso como invitado. La creación de una cuenta es gratuita.</p>
        <p><strong>Inicio de Sesión:</strong> Una vez registrado, el usuario puede iniciar sesión para utilizar las funcionalidades de la aplicación.</p>

        <h3>2. Escáner NutriScan</h3>
        <p><strong>Funcionalidad Principal:</strong> El escáner es la característica central de NutriScan. Utiliza la cámara del dispositivo para escanear la lista de ingredientes de un producto alimenticio.</p>
        <p><strong>Proceso de Escaneo:</strong></p>
        <ul>
          <li>Escanee la tabla de ingredientes utilizando la cámara.</li>
          <li>NutriScan reconoce el texto y busca los ingredientes en su base de datos.</li>
          <li>Los ingredientes dañinos identificados se muestran al usuario junto con la explicación del porqué son considerados perjudiciales.</li>
        </ul>

        <h3>3. Tipos de Usuarios</h3>
        <h4>Freemium:</h4>
        <ul>
          <li>Acceso al escáner de ingredientes y a la información básica del análisis.</li>
          <li>Puede escanear tablas nutricionales y recibir la información de los ingredientes.</li>
          <li>No puede eliminar anuncios.</li>
          <li>El historial de ingredientes se elimina cada 5 días.</li>
          <li>Puede acceder a una pestaña con emprendimientos que venden comida saludable y redirigirse a sus páginas para realizar compras.</li>
        </ul>
        
        <h4>Suscrito:</h4>
        <ul>
          <li>Acceso a todas las funciones del usuario Freemium, sin publicidad.</li>
          <li>Información más detallada y de mayor calidad sobre los alimentos escaneados.</li>
          <li>Historial permanente de calorías y ingredientes, mientras dure la suscripción.</li>
          <li>Posibilidad de buscar manualmente ingredientes específicos.</li>
          <li>Acceso a estadísticas nutricionales y pestaña de emprendimientos saludables.</li>
        </ul>

        <h4>Tienda:</h4>
        <ul>
          <li>Los usuarios tipo Tienda pueden ofrecer sus productos a través de NutriScan.</li>
          <li>Cada producto listado tiene un enlace directo a la página web de la tienda para realizar la compra.</li>
          <li>Las tiendas pagan una suscripción mensual para mantener sus productos visibles en la plataforma.</li>
        </ul>

        <h3>4. Perfil del Usuario y de la Tienda</h3>
        <p><strong>Perfil del Usuario:</strong></p>
        <ul>
          <li>Información recopilada: nombre, apellido, altura (cm), peso (kg) y selección de 5 alimentos favoritos.</li>
        </ul>

        <p><strong>Perfil de la Tienda:</strong></p>
        <ul>
          <li>Información recopilada: nombre de la tienda, descripción, redes de contacto, y cantidad de productos en venta.</li>
        </ul>

        <h3>5. Publicidad Personalizada</h3>
        <p><strong>Función:</strong> La publicidad en NutriScan se personaliza utilizando la información de los alimentos favoritos seleccionados por el usuario.</p>

        <h3>6. Modelo de Funcionamiento</h3>
        <p><strong>Modelo Cooperativo:</strong> NutriScan opera bajo un modelo cooperativo.</p>
        <p><strong>Portal de Pagos:</strong> Las transacciones y facturación se gestionan a través de PayPal.</p>
      </div>
    </div>
  )
}

export default ManualDeUsuario