import { useState } from "react";

interface Props{
    opciones: string[];
    current: string[];
    setCurrent: (fieldName: string, response?: string|string[]) => (e: {
        target: {
            value: any;
        };
    }) => void;
}

const SelectorArray = ({opciones,current,setCurrent}:Props) => {
  const [open, setOpen] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const HandleAdd = (categoria:string) => {
    let temporalCurrent:string[];
    if(!current.includes(categoria)){
        temporalCurrent = [...current, categoria];
    }else{
        temporalCurrent = current.filter(item => item !== categoria);
    }
    console.log("🚀 ~ HandleAdd ~ temporalCurrent:", temporalCurrent)
    const handleChange = setCurrent('categorias',temporalCurrent);
    handleChange({ target: { value: temporalCurrent } });
  }

  const filteredOptions = opciones.filter(option =>
    option.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
        <div className="selectorArray" onClick={() => setOpen(true)}>
            {current.map((current) => (
                <p>{current}</p>
            ))}
            {current.length === 0 && <label style={{width:'100%',background:'rgb(0,0,0,0.5)'}}>Elije una categoria</label>}
        </div>
        <div className="modal_background" style={!open ? {display:'none'}:{}} onClick={() => setOpen(false)}>
            <div className="modal_content" onClick={(e) => {e.stopPropagation()}}>
                <input placeholder="Busque una categoría" style={{width:'100%'}} value={busqueda} onChange={(e) => setBusqueda(e.target.value)}></input>
                <div className="contain_busquedas">
                    {filteredOptions.map((option, index) => (
                        <p key={index} 
                        onClick={() => HandleAdd(option)}
                        className={`opcionesSelector estiloButton ${current.includes(option) ? 'opcionesSelector_active' : ''}`}>
                            {option}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default SelectorArray
