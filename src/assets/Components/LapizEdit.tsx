import React from 'react'

const LapizEdit = ({color,style}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M14.1 5.9L3 17v4h4L18.1 9.9 14.1 5.9zM15.6 4.4L18 2l4 4-2.4 2.4L15.6 4.4z"></path>
    </svg>
  )
}

export default LapizEdit
