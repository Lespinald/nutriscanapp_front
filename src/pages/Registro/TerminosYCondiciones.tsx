import React from 'react'
import styleLogin from '../Login/login.module.css'
import { Link, useNavigate } from 'react-router-dom'

const TerminosYCondiciones = () => {
  const navigate = useNavigate()
  return (
    <div className={styleLogin.fondoLogin} style={{height:'-webkit-fill-available',overflowY:'auto',justifyContent:'flex-start'}}>
      <div className={styleLogin.TerminosYCondiciones}>
        <div className={styleLogin.backButton} onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="2em" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="2em" xmlSpace="preserve" fill='white'>
            <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
          </svg>
        </div>
        <h1>Términos de Uso</h1>

        <p>NutriScan es una plataforma que brinda información nutricional a los usuarios, para que puedan tomar mejores decisiones en cuanto a sus hábitos de consumo.</p>

        <h2>Condiciones de Uso para los Usuarios</h2>

        <h3>Registro y Protección de Datos Personales</h3>
        <p>Para disfrutar de ciertas funcionalidades, es posible crear una cuenta personal en el sitio. Los usuarios se comprometen a introducir datos veraces en el momento de registrarse y a actualizarlos si se producen cambios. Los datos personales se recogen para permitir el servicio y no se venderán ni transmitirán a terceros no involucrados en la prestación del mismo.</p>
        <p>Este sitio web maneja los datos personales de acuerdo a la ley de datos personales de Colombia (Ley 1581 de 2012), de acuerdo a lo cual la información recolectada solo se usa con fines de funcionamiento del sitio, así como la caracterización interna anónima de los usuarios.</p>
        <p>La cuenta es personal, única e intransferible, es decir, que bajo ningún concepto se podrá vender o ceder a otra persona. Se accede a ella con la clave personal de seguridad que haya elegido y que deberá mantener bajo estricta confidencialidad. En cualquier caso, la Persona Usuaria será la única responsable por las operaciones que se realicen en su cuenta. En caso de detectar un uso no autorizado de su cuenta, deberá notificar de forma inmediata y fehaciente a NutriScan. En caso de detectar un comportamiento inapropiado, podremos cancelar el acceso al usuario incluso si cuenta con una suscripción vigente sin que esto genere un derecho a resarcimiento ni devolución de los valores facturados.</p>
        <p>Podremos rechazar una solicitud de registro o bien cancelar un registro ya aceptado, sin que esto genere derecho a un resarcimiento. No podrán registrarse nuevamente en el Sitio las Personas Usuarias que hayan sido inhabilitadas previamente.</p>
        <p>Además, en caso de detectar el uso de más de una cuenta, podremos aplicar retenciones, débitos y/o cualquier otra medida si consideramos que ese accionar puede perjudicar al resto de las personas que usan el Sitio, más allá de las sanciones que pudieran corresponder.</p>

        <h3>Exactitud de la Información y los Datos Proporcionados</h3>
        <p>NutriScan no garantiza la universalidad de la información y los datos presentes en el sitio y en la base de datos (incluidos, entre otros, los datos del producto: fotos, código de barras, nombre, nombre genérico, cantidad, embalaje, marcas, categorías, orígenes, etiquetas, certificaciones, premios, códigos de embalaje, ingredientes, aditivos, alérgenos, trazas, información nutricional, datos ecológicos, etc.).</p>
        <p>La información y los datos son introducidos por los colaboradores del sitio. Pueden contener errores debido, por ejemplo, a información inexacta en las etiquetas y los embalajes, a la introducción manual de datos o al procesamiento de los datos. Para permitir que los usuarios verifiquen los datos, se invita a los colaboradores a subir fotos de etiquetas y embalajes que muestren los datos.</p>

        <h3>Integridad y Exhaustividad de la Información y los Datos</h3>
        <p>NutriScan no garantiza la integridad y exhaustividad de la información y los datos presentes en el sitio y en la base de datos. El hecho de que un producto esté presente en el sitio o en la base de datos no garantiza que todos los datos correspondientes estén presentes. Los usuarios que encuentren información o datos que falten están invitados a editar y agregar información a la página del producto.</p>
        <p>Además, no todos los productos alimenticios están presentes en NutriScan, dada la cantidad de productos alimenticios que existen en el mundo y la cantidad de productos nuevos que se crean cada día.</p>
        <p>Los promedios y otra información estadística se calculan sobre la base de los productos y los datos presentes en la base de datos de NutriScan, y no sobre todos los productos existentes en el mercado. Del mismo modo, las comparaciones con promedios y las comparaciones de productos se establecen sobre la base de los productos y los datos presentes en la base de datos de NutriScan.</p>

        <h3>Advertencia</h3>
        <p>La información y los datos se proporcionan sólo a modo de información indicativa. Pueden contener errores y no deben utilizarse con fines médicos.</p>

        <h3>Descargo de Responsabilidad</h3>
        <p>El servicio se proporciona tal cual. NutriScan no garantiza su conformidad con ningún uso particular, ni su compatibilidad con ningún servicio de terceros. De igual modo, la información y los datos se proporcionan tal cual. NutriScan no garantiza su exactitud, integridad, exhaustividad ni conformidad con ningún uso particular. El servicio puede interrumpirse temporalmente por mantenimiento o por motivos ajenos al control de NutriScan, como problemas técnicos (hardware o software).</p>
        <p>El editor ni visor de NutriScan no se hace responsable de ningún posible daño, directo o indirecto, ni de ninguna pérdida de datos, debido al uso o a la imposibilidad de usar sus servicios, o al acceso o a la imposibilidad de acceder al contenido de los servicios, o al posible hecho de que la información y los datos no sean precisos, completos o exhaustivos.</p>

        <h2>Condiciones para las Tiendas</h2>

        <h3>Registro y Protección de Datos Personales</h3>
        <p>Para disfrutar de las funcionalidades, se debe crear una cuenta personal en el sitio. Los usuarios de tiendas se comprometen a introducir datos veraces en el momento de registrarse y a actualizarlos si se producen cambios. Los datos personales se recogen para permitir el servicio y no se venderán ni transmitirán a terceros.</p>
        <p>Este sitio web maneja los datos personales de acuerdo a la ley de datos personales de Colombia (Ley 1581 de 2012), de acuerdo a lo cual la información recolectada solo se usa con fines de funcionamiento del sitio, así como la caracterización interna anónima de los usuarios.</p>
        <p>La cuenta es personal, única e intransferible, es decir, que bajo ningún concepto se podrá vender o ceder a otra persona. Se accede a ella con la clave personal de seguridad que haya elegido y que deberá mantener bajo estricta confidencialidad. En cualquier caso, la Persona Usuaria será la única responsable por las operaciones que se realicen en su cuenta. En caso de detectar un uso no autorizado de su cuenta, deberá notificar de forma inmediata y fehaciente a NutriScan. En caso de detectar un comportamiento inapropiado, podremos cancelar el acceso al usuario incluso si cuenta con una suscripción vigente sin que esto genere un derecho a resarcimiento ni devolución de los valores facturados.</p>
        <p>Podremos rechazar una solicitud de registro o bien cancelar un registro ya aceptado, sin que esto genere derecho a un resarcimiento. No podrán registrarse nuevamente en el Sitio las Personas Usuarias que hayan sido inhabilitadas previamente.</p>
        <p>Además, en caso de detectar el uso de más de una cuenta, podremos aplicar retenciones, débitos y/o cualquier otra medida si consideramos que ese accionar puede perjudicar al resto de las personas que usan el Sitio, más allá de las sanciones que pudieran corresponder.</p>

        <h3>Advertencia</h3>
        <p>La información y los datos se proporcionan sólo a modo de información indicativa. Pueden contener errores y no deben utilizarse con fines médicos.</p>

        <h3>Descargo de Responsabilidad</h3>
        <p>El servicio se proporciona tal cual. NutriScan no garantiza su conformidad con ningún uso particular, ni su compatibilidad con ningún servicio de terceros. De igual modo, la información y los datos se proporcionan tal cual. NutriScan no garantiza su exactitud, integridad, exhaustividad ni conformidad con ningún uso particular. El servicio puede interrumpirse temporalmente por mantenimiento o por motivos ajenos al control de NutriScan, como problemas técnicos (hardware o software).</p>
        <p>El editor ni visor de NutriScan no se hace responsable de ningún posible daño, directo o indirecto, ni de ninguna pérdida de datos, debido al uso o a la imposibilidad de usar sus servicios, o al acceso o a la imposibilidad de acceder al contenido de los servicios, o al posible hecho de que la información y los datos no sean precisos, completos o exhaustivos.</p>
      </div>
    </div>
  )
}

export default TerminosYCondiciones
