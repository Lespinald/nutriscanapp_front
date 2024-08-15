import { Producto, Tienda } from "./models/tienda";

export async function TraerInfoTienda(idTienda: string): Promise<Tienda | null> {
console.log("🚀 ~ TraerInfoTienda ~ idTienda:", idTienda)

    try {
        const respuesta = await fetch(`https://api.nutriscan.com.co/api/tiendas/${idTienda}`);
        if (!respuesta.ok) {
            throw new Error('Error en la solicitud');
        }
    
        const datos = await respuesta.json();
        console.log("🚀 ~ TraerInfoTienda ~ datos:", datos)
      
        const tienda = {
            ID_tienda: datos.ID_tienda,
            uid: datos.uid,
            nombre: datos.nombre,
            direccion: datos.direccion,
            enlace: datos.enlace,
            descripcion: datos.descripcion,
            fotos: datos.fotos,
        };
        console.log("🚀 ~ TraerInfoTienda ~ tienda:", tienda);
        return tienda;
    } catch (error) {
      console.error('Error en la solicitud fetch:', error);
      return null;
    }
  }


export async function TraerProductosTienda(idTienda: string): Promise<Producto[] | null> {
    try {
      const respuesta = await fetch(`https://api.nutriscan.com.co/api/productostienda/${idTienda}`);
      if (!respuesta.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const datos = await respuesta.json();
      console.log("🚀 ~ TraerProductosTienda ~ datos:", datos);
  
      const productos: Producto[] = [];
  
      // Assuming datos is an array of product data objects
      datos.forEach((productoData: any) => {
        const producto: Producto = {
          ID_producto: productoData.ID_producto,
          ID_tienda: productoData.ID_tienda,
          referencia: productoData.referencia,
          nombre: productoData.nombre,
          descripcion: productoData.descripcion,
          foto: productoData.foto,
          categorias: productoData.categorias ?? [],
        };
        productos.push(producto);
      });
  
      console.log("🚀 ~ TraerProductosTienda ~ productos:", productos);
      return productos;
    } catch (error) {
      console.error('Error en consulta informacion productos de tienda.');
      return null;
    }
}