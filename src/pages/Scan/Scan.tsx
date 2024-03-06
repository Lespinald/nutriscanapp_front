import React, { useEffect, useRef, useState } from "react";

const Scan = () => {

  const navigator = window.navigator;

  const videoRef = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream>(null);

  useEffect(() => {

    if(navigator.mediaDevices && !stream.current){

      const constraints = {
        audio: false,
        video: {
          facingMode: "environment"
        }
      };

      navigator.mediaDevices.getDisplayMedia(constraints).then(
        stream => {
          if(videoRef.current) videoRef.current.srcObject = stream;
        }
      );
    }

    
  }, [])

  return (
    <>
    <video ref={videoRef} style={{width:"90vw"}} autoPlay playsInline muted>

    </video>
    </>
  );
}

export default Scan;
