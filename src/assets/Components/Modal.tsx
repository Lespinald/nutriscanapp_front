import React, { ReactNode } from 'react'

interface Props{
    children:ReactNode;
    isOpen:boolean;
    setIsOpen:(e:boolean) => void;
}

const Modal = ({isOpen,setIsOpen,children}:Props) => {
  return (
    <div className="modal_background" style={!isOpen ? {display:'none'}:{}} onClick={() => setIsOpen(false)}>
        <div className="modal_content" onClick={(e) => {e.stopPropagation()}}>
            {children}
        </div>
    </div>
  )
}

export default Modal
