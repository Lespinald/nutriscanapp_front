import React, { useState } from 'react'
import styleLogin from '../Login/login.module.css'
import style from './styles/ManualUsuario.module.css'
import { Link, useNavigate } from 'react-router-dom'

enum IndiceEncabezados {
  AccesoUsuario = "Acceso usuario",
  UsoDeBusqueda = "Uso de busqueda",
  TiposDeUsuarios = "Tipos de usuarios",
  ModosDePago = "Modos de pago",
  TipoTienda = "Tipo tienda",
  QuejasYSugerencias = "Quejas y sugerencias"
}

enum IndiceSubtitulo {
  // Subtítulos para AccesoUsuario
  RegistroUsuario = "Registro usuario",
  LoginUsuario = "Login usuario",

  // Subtítulos para UsoDeBusqueda
  BusquedaConEscaner = "Busqueda con escaner",
  BusquedaPorNombre = "Busqueda por nombre",

  // Subtítulos para TiposDeUsuarios
  Freemium = "Freemium",
  Suscrito = "Suscrito",
  Tienda = "ienda",

  // Subtítulos para TipoTienda
  CrearYEditarTienda = "Crear y editar mi tienda",
  CrearYEditarProducto = "Crear y editar mi producto",

  QuejasYSugerencias = "Quejas y sugerencias",
  ModosDePago = "Modos de pago",
  TiposDeUsuarios = "Tipos de usuarios",
}


const ManualDeUsuario = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState({indice:'',subindice:''})

  const ChangeSubindice = (input) => {
    setShow( {...show,["subindice"] : input})
  }

  const ChangeIndice = (input) => {
    if(input === '') {
      setShow( {indice:'',subindice:''})
    }else{
      setShow( {...show,["indice"] : input})
    }
  }

  const mostrarSubindices = () => {
    switch (show.indice){
      case (IndiceEncabezados.AccesoUsuario):
        return(
          <>
            <button onClick={() => ChangeSubindice(IndiceSubtitulo.RegistroUsuario)}>{IndiceSubtitulo.RegistroUsuario} {'>'}</button>
            <button onClick={() => ChangeSubindice(IndiceSubtitulo.LoginUsuario)}>{IndiceSubtitulo.LoginUsuario} {'>'}</button>
          </>
        )
      
      case (IndiceEncabezados.UsoDeBusqueda):
        return(
          <>
            <button onClick={() => ChangeSubindice(IndiceSubtitulo.BusquedaConEscaner)}>{IndiceSubtitulo.BusquedaConEscaner} {'>'}</button>
            <button onClick={() => ChangeSubindice(IndiceSubtitulo.BusquedaPorNombre)}>{IndiceSubtitulo.BusquedaPorNombre} {'>'}</button>
          </>
        )

      case (IndiceEncabezados.TipoTienda):
        return(
          <>
            <button onClick={() => ChangeSubindice(IndiceSubtitulo.CrearYEditarTienda)}>{IndiceSubtitulo.CrearYEditarTienda} {'>'}</button>
            <button onClick={() => ChangeSubindice(IndiceSubtitulo.CrearYEditarProducto)}>{IndiceSubtitulo.CrearYEditarProducto} {'>'}</button>
          </>
        )

      default: 
        ChangeSubindice(show.indice)
    }
  }

  return (
    <div className={`${styleLogin.fondoLogin} ${style.containerManual}`} style={{ height: '100%' }}>
      <div style={{ height: "fit-content", display: "flex", alignItems: "center", margin: '20px' }}>
        <h2 style={{ marginLeft: '10px', color: '#fff' }}>Manual de Usuario</h2>
      </div>
      
      {show.indice && <div className={style.refencia}>
        <p onClick={() => ChangeIndice('')}>{'>'} <span style={{textDecoration: "underline"}}>{show.indice}</span></p>
        {show.subindice && show.indice !== IndiceEncabezados.ModosDePago && show.indice !== IndiceEncabezados.QuejasYSugerencias && show.indice !== IndiceEncabezados.TiposDeUsuarios &&
          <p onClick={() => ChangeSubindice('')}>{'>'} <span style={{textDecoration: "underline"}}>{show.subindice}</span></p>}
      </div>}

      {!show.indice && <>
        <button onClick={() => ChangeIndice(IndiceEncabezados.AccesoUsuario)}>{IndiceEncabezados.AccesoUsuario} {'>'}</button>
        <button onClick={() => ChangeIndice(IndiceEncabezados.UsoDeBusqueda)}>{IndiceEncabezados.UsoDeBusqueda} {'>'}</button>
        <button onClick={() => ChangeIndice(IndiceEncabezados.TiposDeUsuarios)}>{IndiceEncabezados.TiposDeUsuarios} {'>'}</button>
        <button onClick={() => ChangeIndice(IndiceEncabezados.TipoTienda)}>{IndiceEncabezados.TipoTienda} {'>'}</button>
        <button onClick={() => ChangeIndice(IndiceEncabezados.ModosDePago)}>{IndiceEncabezados.ModosDePago} {'>'}</button>
        <button onClick={() => ChangeIndice(IndiceEncabezados.QuejasYSugerencias)}>{IndiceEncabezados.QuejasYSugerencias} {'>'}</button>
      </>}

      {show.indice && !show.subindice && <>
        {mostrarSubindices()}
      </>}

      {show.indice && show.subindice && 
        <div className={style.contenido} 
          style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '10px', color: '#333', flex:'1', overflowY:'auto',display:'flex',flexDirection:'column'}}>
          {diccionarioMostrar[show.subindice]}
        </div>}
    </div>
  )
}

export default ManualDeUsuario

const diccionarioMostrar: { [key in IndiceSubtitulo]: JSX.Element } = {
  [IndiceSubtitulo.RegistroUsuario]: (
    <>
      <h2>Registro Usuario</h2>
      <p>Todos los usuarios deben registrarse para acceder a los servicios de NutriScan. No se permite el acceso como invitado. La creación de una cuenta es gratuita y se realiza en la ruta <strong>/Registro</strong> llenando un formulario:</p>
      <img src='/Home/Manual/img_registro_form.png' style={{alignSelf:'center'}}></img>
      <ul>
        <li>El registro de usuario debe incluir información como celular y debe ser un número válido siguiendo el siguiente formato sin espacio:</li>
        <ul>
          <li>123-456-7890</li>
          <li>123456-7890</li>
          <li>123.456.7890</li>
          <li>+1234567890</li>
          <li>+1123456-7890</li>
        </ul>
        <li>Una fecha de nacimiento con una edad menor a 150 años por precaución y mayor a 18 años.</li>
        <li>Debe aceptar los términos y condiciones de NutriScan.</li>
        <li>Se puede agregar opcionalmente una altura y un peso:</li>
        <ul>
          <li>La altura debe ir en metro separados con un punto el decimal, ejemplo 1.70</li>
          <li>El peso debe ser un valor válido en Kg</li>
        </ul>
      </ul>

      <h3>Registro con Correo</h3>
      <p>Para este registro se debe de ingresar un correo electrónico válido, evitando los espacios, y una contraseña igual a su confirmación. Luego, darle clic a registrarse.</p>

      <h3>Registro con Correo Google</h3>
      <p>Para registrarse con Google, necesitas un correo electrónico del proveedor Google y darle clic a "Continuar con Google". Aparecerá una ventana emergente para seleccionar el correo electrónico que desea asignar.</p>
    </>
  ),
  [IndiceSubtitulo.LoginUsuario]: (
    <>

      <h1>Login Usuario</h1>

      <p>Para realizar el login de un usuario, debe existir una cuenta previamente registrada. Dependiendo de cómo se haya registrado, si el usuario tiene una contraseña, podrá acceder mediante el método de correo o Google.</p>
      <img src='/Home/Manual/img_login.png' style={{alignSelf:'center'}}></img>
      <p>Si la cuenta se creó a través de Google y no se tiene una contraseña, se puede recuperar utilizando la opción de <strong>"Olvidé mi contraseña"</strong> o modificarla en el panel de usuario.</p>

    </>
  ),
  [IndiceSubtitulo.BusquedaConEscaner]: (
    <>
      <h2>Búsqueda con Escáner</h2>

      <p>Esta funcionalidad se puede acceder desde la opción de "Buscar" en el menú o presionando nuestro logo en el banner. Esto te redirigirá a la pantalla donde tendrás la opción de capturar, que abrirá la cámara del dispositivo para escanear el código de barras del producto.</p>
      <img src='/Home/Manual/img_scan.png' style={{alignSelf:'center'}}></img>
      <p>Si es la primera vez que utilizas esta función, se te pedirá permiso para acceder a la cámara del dispositivo. Luego, debes enfocar el código de barras, y en cuanto se lea el producto, serás redirigido a la consulta del producto para obtener su información.</p>
      <img src='/Home/Manual/img_scan_2.png' style={{alignSelf:'center'}}></img>

    </>
  ),
  [IndiceSubtitulo.BusquedaPorNombre]: (
    <>
      <h2>Búsqueda por Nombre</h2>

      <p>Si accedes a NutriScan desde un dispositivo de escritorio, serás redirigido directamente a la pantalla de búsqueda por nombre. Si prefieres, puedes seleccionar la opción de "Buscar por nombre" en lugar de "Capturar", lo cual te llevará a una página donde puedes escribir una palabra y el sistema la buscará en la base de datos de productos, encontrando coincidencias en los nombres.</p>
      <img src='/Home/Manual/img_busqueda.png' style={{alignSelf:'center'}}></img>
      <p>En esta pantalla, podrás ver las búsquedas más recientes. Al seleccionar una de ellas, el campo de búsqueda se completará automáticamente. Para confirmar la búsqueda, simplemente presiona "Enter".</p>

      <p>Si prefieres escribir el código de barras en lugar de escanearlo, también puedes hacerlo, pero asegúrate de no incluir espacios entre los números. Después de ingresar el código, presiona "Enter" para confirmar la búsqueda por código de barras.</p>

      <p>Por ejemplo, si buscas "Gr", el sistema podría mostrarte yougurt Griego que contienen estas letras en ese orden, y los resultados aparecerán en la parte inferior de la pantalla.</p>
      <img src='/Home/Manual/img_busqueda_2.png' style={{alignSelf:'center'}}></img>
    </>
  ),
  [IndiceSubtitulo.Freemium]: (<p>{IndiceSubtitulo.Freemium}</p>),
  [IndiceSubtitulo.Suscrito]: (<p>{IndiceSubtitulo.Suscrito}</p>),
  [IndiceSubtitulo.Tienda]: (<p>{IndiceSubtitulo.Tienda}</p>),
  [IndiceSubtitulo.CrearYEditarTienda]: (
    <>
      <p>Para ir al apartado de <strong>Tienda</strong> tendrás que tener una suscripción de este tipo y darle en el banner al botón <strong>Mi Tienda</strong>.</p>
      <img src='/Home/Manual/img_banner.png' style={{alignSelf:'center'}}></img>
      <h2>CREAR Y EDITAR MI TIENDA</h2>
      <p>En el apartado de Tienda, si no tienes una tienda creada, podrás crearla dando a la opción correspondiente y yendo al formulario para crearla.</p>
      <img src='/Home/Manual/img_tienda.png' style={{alignSelf:'center'}}></img>

      <p>En el formulario, encontrarás información por defecto como ejemplo. Podrás ingresar la información necesaria para crear una tienda. Debes cambiar cualquier cosa para que el botón <strong>Guardar cambios</strong> se active, y podrás agregar una foto desde la información de tu propio dispositivo.</p>
      <img src='/Home/Manual/img_tienda_2.png' style={{alignSelf:'center'}}></img>

      <p>Si deseas editar la información ya agregada, se podrá modificar posteriormente bajo este mismo formulario, haciendo el proceso lo más sencillo posible para ti, el usuario. Para acceder a este, debes darle al banner detrás de la foto de perfil.</p>
      <img src='/Home/Manual/img_tienda_3.png' style={{alignSelf:'center'}}></img>

    </>
  ),
  [IndiceSubtitulo.CrearYEditarProducto]: (
    <>
      <p>Para ir al apartado de <strong>Tienda</strong> tendrás que tener una suscripción de este tipo y darle en el banner al botón <strong>Mi Tienda</strong>.</p>
      <img src='/Home/Manual/img_banner.png' style={{alignSelf:'center'}}></img>

      <h2>CREAR Y EDITAR PRODUCTO</h2>
      <p>Para crear un producto, tenemos un formulario mucho más extenso en el cual procuramos recopilar la mayor información posible sobre tu producto. Esto nos permite asignarle un <strong>NutriScore</strong>, con el cual valoramos la calidad del producto (este proceso es independiente de tu suscripción, pues evaluamos la calidad de la información proporcionada).</p>
      <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignSelf:'center', maxWidth:'80%',justifyContent:'center'}}>
        <img src='/Home/Manual/img_prod.png'></img>
        <img src='/Home/Manual/img_prod_2.png'></img>
        <img src='/Home/Manual/img_prod_3.png'></img>
      </div>
      <p>En este formulario, pedimos la información correspondiente a una porción de tu producto, ya sea un paquete o una orden del mismo. Además, solicitamos una foto para complementar la información. Todos los campos son obligatorios y deben completarse (en caso de no tener la información, colocar 0).</p>

      <p>Si tu producto tiene un código de barras, inclúyelo en el formulario. Si no tiene, selecciona la opción correspondiente, y se asignará automáticamente.</p>

    </>
  ),
  [IndiceSubtitulo.QuejasYSugerencias]: (
    <>
      <h2>QUEJAS Y SUGERENCIAS</h2>
      <p>Tenemos un apartado de <strong>contáctanos</strong> al cual puedes acceder al pie de página donde te puedes dirigir a la página de quejas y sugerencias.</p>
      <img src='/Home/Manual/img_foot.png' style={{alignSelf:'center'}}></img>
      <p>En esta página podemos escribir un correo electrónico que se enviará a un encargado perteneciente a NutriScan, quien podrá darle seguimiento a su caso y ver cómo se le puede dar respuesta lo más pronto posible.</p>
      <img src='/Home/Manual/img_foot_2.png' style={{alignSelf:'center'}}></img>
    </>
  ),
  [IndiceSubtitulo.ModosDePago]: (
    <>
      <h2>Modos de Pago</h2>

      <p>Puedes pagar por transferencia bancaria con tarjeta de crédito, débito, y medios de pago autorizados por Google Pay. Esto amplía la gama de opciones a Efecty e incluso facturación del operador de telefonía celular (como Claro).</p>
      <img src='/Home/Manual/img_pago.png' style={{alignSelf:'center'}}></img>
      <p>Para realizar el pago de una suscripción, debes ir a una de nuestras páginas de checkout. En esta página, puedes elegir el plan que deseas pagar. Si decides optar por el tipo Tienda en lugar del plan Plus, puedes ingresar un nombre y correo, principalmente para nuestra factura interna, pero estos campos no son obligatorios. Al darle a pagar, serás dirigido a nuestra pasarela de pago Stripe.</p>
      <img src='/Home/Manual/img_pago_2.png' style={{alignSelf:'center'}}></img>

      <p>Allí, deberás ingresar tu información para completar la compra y darle clic en "Suscribirse". Una vez realizado el pago, serás redirigido a nuestra página de recibo, donde podrás ver la información básica de tu compra y una opción para ir a la página donde comenzar a disfrutar de los nuevos beneficios.</p>
      <img src='/Home/Manual/img_pago_3.png' style={{alignSelf:'center'}}></img>

    </>
  ),
  [IndiceSubtitulo.TiposDeUsuarios]: (
    <>
      <h2>Tipos de Usuarios</h2>

      <p>En nuestra aplicación, encontrarás dos tipos de usuarios. Puedes verificar tu tipo de usuario en la sección de perfil.</p>
      <img src='/Home/Manual/img_tipos.png' style={{alignSelf:'center'}}></img>
      <h3>Suscrito:</h3>
      <ul>
        <li>Acceso a todas las funciones del usuario Freemium, sin publicidad.</li>
        <li>Información más detallada y de mayor calidad sobre los alimentos escaneados.</li>
        <li>Historial permanente de calorías e ingredientes, mientras dure la suscripción.</li>
        <li>Ver gráficos como una forma más intuitiva de visualizar el historial del usuario.</li>
        <li>Acceso a estadísticas nutricionales y la pestaña de emprendimientos saludables.</li>
      </ul>

      <h3>Tienda:</h3>
      <ul>
        <li>Los usuarios tipo Tienda pueden ofrecer sus productos a través de NutriScan.</li>
        <li>Cada producto listado tiene un enlace directo a la página web de la tienda para realizar la compra.</li>
        <li>Las tiendas pagan una suscripción mensual para mantener sus productos visibles en la plataforma.</li>
      </ul>

    </>
  )
};