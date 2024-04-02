import { useEffect, useState } from "react";
import { GetViewportHeight, GetViewportWidth } from "./Utils";

export function useViewportRezise(){
  const [size, setSize] = useState({
    width: GetViewportWidth(),
    height: GetViewportHeight()
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize({
        width: GetViewportWidth(),
        height: GetViewportHeight()
      });
    })
  }, [])

  return size;
}