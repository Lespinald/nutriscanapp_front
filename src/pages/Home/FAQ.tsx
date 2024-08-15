import React, { useRef } from 'react'
import style from './styles/FAQ.module.css'

interface Question {
  id: number;
  question: string;
  answer: string;
}

const questions: Question[] = [
  { id: 10, question: '¿Qué es el NutriScore?', answer: 'Cada producto recibe un NutriScore, una valoración especial que hacemos para indicar cuán saludable es el producto. Esta evaluación se basa en la calidad y cantidad de los nutrientes presentes en el producto, ayudándote a tomar decisiones informadas sobre tu alimentación (llendo de A-E desde lo mas saludable a lo menos respectivamente).' },
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
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '5%' }}>
      <h1 
        className={`${style.titleFAQ}`} 
        style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white', padding: '10px 0' }}
      >
        Preguntas Frecuentes <span style={{ color: '#55E8A0' }}>NutriScan</span>
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', width: '100%' }}>
        <div style={{ width: '100%', height: '2svh' }}></div>
        <table className="table-container" style={{ width: '100%' }}>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id}>
                <td>
                  <Pregunta pregunta={q} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Pregunta: React.FC<{ pregunta: Question }> = ({ pregunta }) => {
  const ref = useRef<HTMLDivElement>(null);

  const toggleActive = () => {
    if (ref.current) {
      ref.current.classList.toggle(style.active);
    }
  };

  return (
    <div className={`${style.pregunta}`} ref={ref} onClick={toggleActive}>
      <h3 style={{ marginBottom: '10px' }}>{pregunta.question}</h3>
      <label className={`${style.respuesta}`}>{pregunta.answer}</label>
    </div>
  );
};

export default FAQ;


