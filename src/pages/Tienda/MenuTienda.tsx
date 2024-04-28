import { useState } from "react";
import { useAppLayoutContext } from "../AppLayout"

interface ShopInfo{
  name: string;
  banner: string;
  logo: string;
}

const MenuTienda = () => {
  const {mobile} = useAppLayoutContext();
  const [banner, setBanner] = useState<string>("https://firebasestorage.googleapis.com/v0/b/nutriscan-9f5cf.appspot.com/o/TiendaTest%2Fimagen_2024-04-27_221044323.png?alt=media&token=ec5d519f-c9e4-4c73-94b6-38b68746af33")

  return (
    <>
    {
      mobile?
      <></>:
      <TiendaDesktop name="tienda" logo="" banner={banner}/>
    }
    </>
  );
}


const TiendaDesktop = ({name, banner, logo}:ShopInfo) => {
  return (
    <>
      <img src={banner} alt="banner"></img>
    </>
  );
}

export default MenuTienda
