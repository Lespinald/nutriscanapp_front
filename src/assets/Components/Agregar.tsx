import React, { CSSProperties } from 'react'

interface Props{
    color:string;
    background: string;
    style: CSSProperties;
    className?:string;
    onClick?:any;
}

const Agregar = ({color,background,style,className,onClick}:Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 14" fill={color} style={style} className={className} onClick={onClick}>
      <path fillRule="evenodd" fill={background} d="M7,13 C3.6862915,13 1,10.3137085 1,7 C1,3.6862915 3.6862915,1 7,1 C10.3137085,1 13,3.6862915 13,7 C13,10.3137085 10.3137085,13 7,13 Z M8,8 L10,8 C10.5522847,8 11,7.55228475 11,7 C11,6.44771525 10.5522847,6 10,6 L8,6 L8,4 C8,3.44771525 7.55228475,3 7,3 C6.44771525,3 6,3.44771525 6,4 L6,6 L4,6 C3.44771525,6 3,6.44771525 3,7 C3,7.55228475 3.44771525,8 4,8 L6,8 L6,10 C6,10.5522847 6.44771525,11 7,11 C7.55228475,11 8,10.5522847 8,10 L8,8 Z"/>
    </svg>
  )
}

export default Agregar
