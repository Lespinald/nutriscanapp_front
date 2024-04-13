

import { storage } from '../firebase';
import { UploadTaskSnapshot, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const useStorge = () => {

    const agregarImg = async (ruta: string, file: Blob): Promise<void> => {
        const dRef = ref(storage, ruta);
        const uploadTask = uploadBytes(dRef, file);
    
        try {
            await uploadTask;
            console.log("Subida Exitosa ed photo perfil");
            // Aquí puedes realizar otras operaciones después de la subida exitosa
        } catch (error) {
            console.error('Error al subir el archivo', error);
            // Aquí puedes manejar el error de subida
        }
    }

    const obtenerURL = async (ruta: string): Promise<string> => {
        try {
            const dRef = ref(storage, ruta);
            const url = await getDownloadURL(dRef);
            return url;
        } catch (error) {
            console.error(error);
            return ''; // Devuelve una cadena vacía en caso de error
        }
    }

    return {
        agregarImg,
        obtenerURL,
    }
}