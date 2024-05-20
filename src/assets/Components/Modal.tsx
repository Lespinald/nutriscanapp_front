import React, { ReactNode, forwardRef, useEffect, useRef } from 'react'

interface Props{
    children:ReactNode;
    isOpen:boolean;
    ref: React.RefObject<HTMLDivElement>;
    setIsOpen:(e:boolean) => void;
}

const Modal = ({isOpen,setIsOpen,children,ref}:Props) => {
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ modal.current:", modal.current)
    if(modal.current){
      console.log('aqui 3')
      modal.current.scrollIntoView({behavior:'smooth',block:'center'})
    }
  },[isOpen])

  return (
    <div className="modal_background" style={!isOpen ? {display:'none'}:{}} onClick={() => setIsOpen(false)}>
        <div className="modal_content" onClick={(e) => {e.stopPropagation()}} ref={ref}>
          {children}
        </div>
    </div>
  )
}

export default Modal
