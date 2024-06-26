import React, { useEffect, useRef, useState } from "react";

interface Props{
  codigo?: string;
  setCodigo?: (codigo:string) => void;
  mainClass?: string;
  buttonClass?: string;
  inputClass?: string;
}

export type barcodeState = "noBarcode" | (string & {});

const InputCodigoBarras = ({codigo, setCodigo,  mainClass, buttonClass, inputClass}: Props) => {
  
  const [inputHidden, setInputHidden] = useState<boolean>(!!codigo && codigo.startsWith("20009"));
  const [inputDisabled, setInputDisabled] = useState<boolean>(!!codigo);
  
  const [inputValue, setInputValue] = useState<barcodeState>(() => {
    if(inputHidden) return "noBarcode";
    if(codigo) return codigo;
    return "";
  });

  const HandleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    if(setCodigo) setCodigo(e.currentTarget.value);
  }

  const HandleAddBarcode = () => {
    setInputHidden(false);
    setInputDisabled(false);
    if(inputValue === "noBarcode"){
      setInputValue("");
    }
  }

  const HandleNoBarcode = () => {
    setInputHidden(true);
    setInputDisabled(true);
    setInputValue("noBarcode");
  }

  useEffect(() => {
    if(setCodigo) setCodigo(inputValue);
  }, [inputValue]) 

  return(
    <div className={mainClass} style={{display:'flex',flexDirection:'column',alignItems:'stretch',width:'80%',gap:'10px'}}>
      {inputHidden &&
        "Producto no tiene codigo de barras"
      }
      <input className={inputClass} type="text" onChange={HandleInputChange}
        value={inputValue} disabled={inputDisabled} hidden={inputHidden} style={{borderRadius:'0.5rem'}}>
      </input>
      <button className={buttonClass} hidden={!inputHidden} style={{fontSize: "1rem"}} onClick={HandleAddBarcode}>
        {(!codigo || inputHidden)? "Agregar": "Cambiar"} codigo de barras
      </button>
      <button className={buttonClass} hidden={inputHidden} style={{fontSize: "1rem"}} onClick={HandleNoBarcode}>
        No se tiene codigo de barras
      </button>
    </div>
  );
}

export default InputCodigoBarras
