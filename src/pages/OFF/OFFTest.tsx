import { useEffect } from "react";

const OFFTest = () => {
  useEffect(() => {
    const message = document.getElementById("message") as HTMLParagraphElement;
    const barcodeInput = document.getElementById("barcode") as HTMLInputElement;
    const barbutton = document.getElementById("barbutton") as HTMLButtonElement;
    const checkTags = document.getElementById("tagButton") as HTMLButtonElement;

    barbutton.addEventListener("click", e =>{
      e.preventDefault();
      
      const url = `https://world.openfoodfacts.net/api/v2/product/${barcodeInput.value}`;
      console.log(url);
      fetch(url).then(
        res => {
          if(res.ok) return res.json();
          else throw Error(`status code: ${res.status}`)
        }
      ).then(
        data => {
          message.innerText = JSON.stringify(data);
          console.log(data);
        }
      ).catch(e => alert(e));
    })

    checkTags.addEventListener("click", e => {
      e.preventDefault();

      fetch(`https://world.openfoodfacts.net/api/v2/product/${barcodeInput.value}?fields=misc_tags`).then(
        res => {
          if(res.ok) return res.json();
          else throw Error(`status code: ${res.status}`)
        }
      ).then(
        data => {
          message.innerText = JSON.stringify(data);
          console.log(data);
        }
      ).catch(e => alert(e));
    })
    
  }, [])

  return(
    <>
    <div>
    <input id="barcode" placeholder="barcode"></input>
    <button id="barbutton">Ingresar</button>
    <button id="tagButton">check missing tags</button>
    </div>
    <div style={{overflow: "auto"}}>
    <p id="message" style={{maxWidth: "100svw"}}></p>
    </div>
    </>
  );
}

export default OFFTest;
