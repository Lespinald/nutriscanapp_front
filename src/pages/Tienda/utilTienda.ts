export interface OffData {
  imagenFrontalUrl?: string;
  nivelesAltos?: any;
  imagenFrontal?: File;
  cantidad: number;
  unidadCantidad: string;
  imagenNutricionalUrl?: string;
  imagenNutricional?: File;
  energia: number;
  unidadEnergia: string;
  grasas: number;
  unidadGrasas: string;
  grasaSaturada: number;
  unidadGrasaSaturada: string;
  carbohidratos: number;
  unidadCarbohidratos: string;
  azucar: number;
  unidadAzucar: string;
  fibra: number;
  unidadFibra: string;
  proteina: number;
  unidadProteina: string;
  sodio: number;
  unidadSodio: string;
}

const translations = {
  "fat": "Grasas",
  "salt": "Sal",
  "saturated-fat": "Grasas saturadas",
  "sugars": "Azúcares"
};

export function OffData(data: any){
  try{
    const {nutriments, product_quantity, product_quantity_unit, image_url, nutrient_levels} = data.product;
    console.log("🚀 ~ OffData ~ nutrient_levels:", nutrient_levels)

    const offData: OffData = {
      carbohidratos: nutriments.carbohydrates_value,
      unidadCarbohidratos: nutriments.carbohydrates_unit,
      grasas: nutriments.fat_value,
      unidadGrasas: nutriments.fat_unit,
      grasaSaturada: nutriments["saturated-fat_value"],
      unidadGrasaSaturada: nutriments["saturated-fat_unit"],
      azucar: nutriments.sugars_value,
      unidadAzucar: nutriments.sugras_unit,
      proteina: nutriments.proteins_value,
      unidadProteina: nutriments.proteins_unit,
      sodio: nutriments.sodium_value,
      unidadSodio: nutriments.sodium_unit,
      fibra: nutriments.fiber_value,
      unidadFibra: nutriments.fiber_unit,
      energia: nutriments.energy_value,
      unidadEnergia: nutriments.energy_unit,
      cantidad: product_quantity,
      unidadCantidad: product_quantity_unit,
      imagenFrontalUrl: image_url,
      nivelesAltos: Object.keys(nutrient_levels)
      .filter(key => nutrient_levels[key] === "high")
      .map(key => translations[key]),
    }

    return offData;
  }catch(e){
    return undefined
  }
}

export interface NutriScanDatos {
  nombre: string;
  descripcion: string;
  categorias: string[];
}

export function formatearTexto(campo) {
  // Remueve la palabra "unidad" si existe y añade un espacio
  if(campo === 'cantidad'){
    return 'Cantidad total'
  }

  campo = campo.replace(/^unidad/, 'Unidad ');

  // Inserta un espacio antes de cada letra mayúscula (excepto al inicio)
  campo = campo.replace(/([a-z])([A-Z])/g, '$1 $2');

  // Convierte el primer carácter a mayúscula
  return campo.charAt(0).toUpperCase() + campo.slice(1).toLowerCase();
}

export type DatosForm = NutriScanDatos & OffData;