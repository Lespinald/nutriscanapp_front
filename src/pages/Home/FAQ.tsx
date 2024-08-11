import React, { useRef } from 'react'
import style from './styles/FAQ.module.css'

interface Question {
    id: number;
    question: string;
    answer: string;
  }

const questions: Question[] = [
    { id: 1, question: '¿Qué es Lorem Ipsum?', answer: 'Lorem Ipsum es simplemente el texto de relleno...' },
    { id: 2, question: '¿Por qué lo usamos?', answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem et voluptatibus laboriosam voluptatem delectus illum corrupti, veniam amet atque hic maiores perferendis ipsam quidem numquam est repudiandae ut maxime nam." },
    { id: 3, question: '¿De dónde proviene?', answer: 'Contrary to popular belief, Lorem Ipsum no es simplemente texto aleatorio...' },
    { id: 4, question: '¿De dónde proviene?', answer: 'Contrary to popular belief, Lorem Ipsum no es simplemente texto aleatorio...' },
    { id: 5, question: '¿De dónde proviene?', answer: 'Contrary to popular belief, Lorem Ipsum no es simplemente texto aleatorio...' },
    { id: 6, question: '¿De dónde proviene?', answer: 'Contrary to popular belief, Lorem Ipsum no es simplemente texto aleatorio...' },
    // Agrega más preguntas aquí
  ];

const FAQ = () => {
  return (
    <div style={{display:'flex',flexWrap:'wrap',alignItems:"center",padding:'5%'}}>
        <svg xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1" id="svg9724" sodipodi:docname="question-circle.svg" inkscape:version="1.2.2 (1:1.2.2+202212051550+b0a8486541)" width="3em" height="3em">
            <defs id="defs9728"/>
            <sodipodi:namedview id="namedview9726" pagecolor="#ffffff" bordercolor="#666666" borderopacity="1.0" inkscape:showpageshadow="2" inkscape:pageopacity="0.0" inkscape:pagecheckerboard="0" inkscape:deskcolor="#d1d1d1" showgrid="true" inkscape:zoom="1.1896171" inkscape:cx="190.3974" inkscape:cy="339.18477" inkscape:window-width="1920" inkscape:window-height="1009" inkscape:window-x="0" inkscape:window-y="1080" inkscape:window-maximized="1" inkscape:current-layer="svg9724" showguides="true">
                <inkscape:grid type="xygrid" id="grid9972" originx="0" originy="0"/>
                <sodipodi:guide position="300,360" orientation="1,0" id="guide1208" inkscape:locked="false"/>
            </sodipodi:namedview>
            <path style={{strokeWidth:"1.05103",color:"#000000",fill:"#55E8A0",strokeLinecap:"round",strokeLinejoin:"round",paintOrder:"stroke fill markers"}} d="m 300.60937,-12.792969 c -173.60599,0 -315.214839,141.724839 -315.214839,315.404299 0,173.67945 141.608849,315.40429 315.214839,315.40429 173.606,0 315.21485,-141.72484 315.21485,-315.40429 0,-173.67946 -141.60885,-315.404299 -315.21485,-315.404299 z m 0,84.082031 c 128.13278,10e-7 231.13086,103.052738 231.13086,231.322268 0,128.26952 -102.99808,231.32226 -231.13086,231.32226 C 172.4766,533.93359 69.476562,430.88085 69.476562,302.61133 69.476563,174.3418 172.4766,71.289062 300.60937,71.289062 Z" id="path390" transform="matrix(0.95173205,0,0,0.95115787,13.901174,12.168794)"/>
            <path style={{color:"#000000",fill:"#55E8A0",strokeLinecap:"round",strokeLinejoin:"round",paintOrder:"stroke fill markers"}} d="m 300,384 c -27.14042,0 -50,22.85958 -50,50 0,27.14042 22.85958,50 50,50 27.14042,0 50,-22.85958 50,-50 0,-27.14042 -22.85958,-50 -50,-50 z" id="path1629" sodipodi:nodetypes="sssss"/>
            <path id="path343" style={{color:"#000000",fill:"#55E8A0",strokeLinecap:"round",strokeLinejoin:"round",paintOrder:"stroke fill markers"}} d="m 278.08676,111.38574 c -38.36479,8.45756 -69.16019,39.17753 -76.79854,78.69745 a 40,40 0 0 0 31.68395,46.86538 40,40 0 0 0 46.86346,-31.68355 c 1.79434,-9.28366 9.286,-15.75589 18.73178,-16.18385 9.44577,-0.42798 17.49014,5.33989 20.11664,14.42326 2.6265,9.08335 -1.09839,18.25628 -9.3149,22.93547 a 40,40 0 0 0 -9.35711,7.71088 40,40 0 0 0 -0.004,0.003 c -33.0243,21.0091 -50.8245,59.64136 -45.33599,98.39549 a 40,40 0 0 0 45.21236,33.99557 40,40 0 0 0 33.99709,-45.21467 c -1.11453,-7.86962 2.36064,-15.41229 9.06697,-19.67825 a 40,40 0 0 0 8.31175,-7.07224 c 38.40211,-23.26481 56.80531,-69.96796 44.27655,-113.29678 -12.77812,-44.19116 -54.63578,-74.20291 -100.59015,-72.12083 -5.74431,0.26027 -11.37926,1.01551 -16.85995,2.22373 z"/>
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
