import React from "react";

interface Props{
  className?: string
}

const InicioBG = ({className}: Props) => {
  return(
    <div className={className}>
      <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse rx="220" ry="220" fill="#AAF480" fillOpacity="0.5"/>
      </svg>
      <svg style={{position: "absolute", top: "40%", left: "40%"}}
       width="360" height="360" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="200" cy="200" rx="200" ry="200" fill="#F9F870" fillOpacity="0.5"/>
      </svg>
      <svg style={{position: "absolute", bottom: "0%", right: "0%"}}
       width="170" height="360" viewBox="0 0 170 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="200" cy="140" rx="200" ry="200" fill="#F9F870" fillOpacity="0.5"/>
      </svg>
      <svg style={{position: "absolute", bottom: "0%", right: "0%"}}
       width="360" height="170" viewBox="0 0 240 170" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="140" cy="200" rx="200" ry="200" fill="#AAF480" fillOpacity="0.5"/>
      </svg>
    </div>
  );
}

export default InicioBG;