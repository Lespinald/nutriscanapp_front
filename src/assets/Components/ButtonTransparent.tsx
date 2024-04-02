import React from 'react'

interface Props{
    children?: any
    color?: string
    onClick: () => void;
}

const ButtonTransparent = ({onClick,children,color}: Props) => {
  return (
    <button onClick={onClick} style={{backgroundColor: color ?? 'var(--color-2)', borderRadius:'15px',
  color: 'var(--color-5)', border: 'none',cursor: 'pointer'}}>
      {children}
    </button>
  )
}

export default ButtonTransparent
