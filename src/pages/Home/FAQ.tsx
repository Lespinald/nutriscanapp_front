import React, { useRef } from 'react'
import style from './styles/FAQ.module.css'

interface Question {
    id: number;
    question: string;
    answer: string;
  }

const questions: Question[] = [
  { id: 10, question: '¿Qué es el NutriScore?', answer: 'cada producto recibe un NutriScore, una valoración especial que hacemos para indicar cuán saludable es el producto. Esta evaluación se basa en la calidad y cantidad de los nutrientes presentes en el producto, ayudándote a tomar decisiones informadas sobre tu alimentación (llendo de A-E desde lo mas saludable a lo menos respectivamente).' },
  { id: 0, question: 'Ingreso una consulta y no busca', answer: 'Recuerda que tras ingresar cualquier consulta por ID o nombre, debes oprimir enter que realice la consulta' },
  { id: 1, question: '¿Qué información puedo obtener al escanear un producto?', answer: 'Recibiras un nutriscore donde se le clasficica a cada producto con una valoracion de A-E, además de informacion nutricional como cantidad de azucares,sodio,grasas, fireba ,calorias,etc.' },
  { id: 2, question: '¿Cómo funciona el plan de pago para usuarios regulares?', answer: "El plan de pago para usuarios regulares incluye acceso a estadísticas detalladas de tus consumos, un historial de alimentos consumidos, y un seguimiento preciso de calorías y nutrientes." },
  { id: 3, question: '¿Cómo puedo crear un producto como tienda?', answer: 'Las tiendas pueden crear productos personalizados completando un formulario detallado que incluye información nutricional, ingredientes, y un enlace a su página web. Recuerda que toda la información solicitada debe ser completada para poder valorar el producto con un nutriscore.' },
  { id: 4, question: '¿Qué beneficios tiene suscribirme al plan de pago para tiendas?', answer: 'Las tiendas que se suscriben pueden agregar productos personalizados a la base de datos de NutriScan y vincularlos a su página web para redirigir a los clientes para obtener más visibilidad.' },
  { id: 5, question: '¿Qué pasa si un producto no está en la base de datos?', answer: 'Si un producto no se encuentra en la base de datos, puedes sugerir su inclusión o, si eres una tienda, agregarlo tú mismo a través del formulario disponible en el plan de pago.' },
  { id: 6, question: '¿Cómo se calculan las estadísticas de consumo?', answer: 'Las estadísticas se calculan en función de los productos escaneados y los datos registrados en tu historial de consumo, ofreciendo una visión completa de tu ingesta nutricional.' },
  { id: 7, question: '¿Cómo se protege mi información personal?', answer: 'La información personal se maneja de acuerdo con la ley de protección de datos de Colombia, garantizando que tus datos sean utilizados únicamente para el funcionamiento de la app y no serán compartidos con terceros.' },
  { id: 8, question: '¿Qué sucede si olvido mi contraseña o detecto un uso no autorizado de mi cuenta?', answer: 'Si deseas cambiar tu contraseña hay una opcion disponible en el login de la aplicación y de cambiar su clasve esta información se verá en tu panel del perfil del usuario.' },
  { id: 9, question: '¿Qué información se muestra de los productos?', answer: 'Cuando buscas un producto en nuestra plataforma, mostramos detalles completos sobre sus nutrientes, como carbohidratos, grasas, grasas saturadas, azúcar, proteínas, sodio, fibra, energía (calorías), y la cantidad por porción..' },
  // Agrega más preguntas aquí
  ];

const FAQ = () => {
  return (
    <div style={{display:'flex',flexWrap:'wrap',alignItems:"center",padding:'5%'}}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 600"
      version="1.1"
      width="3em"
      height="3em"
    >
      <defs id="defs9728" />
      <path
        style={{
          strokeWidth: "1.05103",
          color: "#000000",
          fill: "#55E8A0",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          paintOrder: "stroke fill markers",
        }}
        d="m 300.60937,-12.792969 c -173.60599,0 -315.214839,141.724839 -315.214839,315.404299 0,173.67945 141.608849,315.40429 315.214839,315.40429 173.606,0 315.21485,-141.72484 315.21485,-315.40429 0,-173.67946 -141.60885,-315.404299 -315.21485,-315.404299 z m 0,84.082031 c 128.13278,10e-7 231.13086,103.052738 231.13086,231.322268 0,128.26952 -102.99808,231.32226 -231.13086,231.32226 C 172.4766,533.93359 69.476562,430.88085 69.476562,302.61133 69.476563,174.3418 172.4766,71.289062 300.60937,71.289062 Z"
        transform="matrix(0.95173205,0,0,0.95115787,13.901174,12.168794)"
      />
      <path
        style={{
          color: "#000000",
          fill: "#55E8A0",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          paintOrder: "stroke fill markers",
        }}
        d="m 300,384 c -27.14042,0 -50,22.85958 -50,50 0,27.14042 22.85958,50 50,50 27.14042,0 50,-22.85958 50,-50 0,-27.14042 -22.85958,-50 -50,-50 z"
      />
      <path
        style={{
          color: "#000000",
          fill: "#55E8A0",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          paintOrder: "stroke fill markers",
        }}
        d="m 278.08676,111.38574 c -38.36479,8.45756 -69.16019,39.17753 -76.79854,78.69745 a 40,40 0 0 0 31.68395,46.86538 40,40 0 0 0 46.86346,-31.68355 c 1.79434,-9.28366 9.286,-15.75589 18.73178,-16.18385 9.44577,-0.42798 17.49014,5.33989 20.11664,14.42326 2.6265,9.08335 -1.09839,18.25628 -9.3149,22.93547 a 40,40 0 0 0 -9.35711,7.71088 40,40 0 0 0 -0.004,0.003 c -33.0243,21.0091 -50.8245,59.64136 -45.33599,98.39549 a 40,40 0 0 0 45.21236,33.99557 40,40 0 0 0 33.99709,-45.21467 c -1.11453,-7.86962 2.36064,-15.41229 9.06697,-19.67825 a 40,40 0 0 0 8.31175,-7.07224 c 38.40211,-23.26481 56.80531,-69.96796 44.27655,-113.29678 -12.77812,-44.19116 -54.63578,-74.20291 -100.59015,-72.12083 -5.74431,0.26027 -11.37926,1.01551 -16.85995,2.22373 z"
      />
    </svg>
        <h1 className={`${style.titleFAQ}`}>Preguntas Frecuentes <span style={{color:'#55E8A0'}}>NutriScan</span></h1>
        <div style={{display:'flex',flexWrap:'wrap',alignItems:"center"}}>
            <div style={{width:'100%',height:'2svh'}}></div>
            {questions.map((q) => (
                <Pregunta
                    key={q.id} 
                    pregunta={q}
                ></Pregunta>
            ))}
        </div>
    </div>
  )
}

const Pregunta:React.FC<{pregunta:Question}>  = ({pregunta}) => {
    const ref = useRef<HTMLDivElement>(null)

    const toggleActive = () => {
        if (ref.current) {
          ref.current.classList.toggle(style.active);
        }
    };

    return(
        <div className={`${style.pregunta}`} ref={ref} onClick={toggleActive}>
            <h3>{pregunta.question}</h3>
            <label className={`${style.respuesta}`}>{pregunta.answer}</label>
        </div>
    )
}

export default FAQ
