import {
    collection,
    getDocs,
    getDoc,
    setDoc,
    doc,
    addDoc,
    deleteDoc,
    QuerySnapshot,
    CollectionReference,
    QueryDocumentSnapshot,
    DocumentReference,
    DocumentSnapshot,
    DocumentData,
    query,
    orderBy,
    where,
    updateDoc,
    increment,
    serverTimestamp,
    arrayUnion,
    FieldValue,
    arrayRemove,
} from 'firebase/firestore';
import { firestore } from '../firebase';

// import {firestore} from './firebase2'


const useBaseDatos = () => {
  
    // Obtener un documento de Cloud Firestore
    const recogerDoc = async (ruta:string) => {
      try {
        const docRef:DocumentReference = doc(firestore,ruta);
        const documento = await getDoc(docRef);
        if (documento.exists()) {
          // El documento existe, devuelve sus datos
          return documento;
        } else {
          // El documento no existe
          console.error('El documento no existe');
          return null;
        }
      } catch (error) {
        // Manejo de errores
        console.error('Error obteniendo el documento:', error);
        return null;
      }
    }
  
    // Eliminar un documento de Cloud Firestore
    const borrarDoc = async (ruta:string) => {
      try {
        await deleteDoc(doc(firestore,ruta));
        // Documento eliminado exitosamente
        return true;
      } catch (error) {
        // Manejo de errores
        console.error('Error eliminando el documento:', error);
        return false;
      }
    }
  
    // Actualizar un documento en Cloud Firestore
    const actualizarDoc = async (ruta:string, newData:any) => {
      try {
        await updateDoc(doc(firestore,ruta),newData);
        // Documento actualizado exitosamente
        return true;
      } catch (error) {
        // Manejo de errores
        console.error('Error actualizando el documento:', error);
        return false;
      }
    }
  
    // Crear un nuevo documento en Cloud Firestore
    const crearDoc = async (ruta:string, data:any) => {
      try {
        await setDoc(doc(firestore,ruta),data);
        // Documento creado exitosamente
        return true;
      } catch (error) {
        // Manejo de errores
        console.error('Error creando el documento:', error);
        return false;
      }
    }
  
    return {
      recogerDoc,
      borrarDoc,
      actualizarDoc,
      crearDoc
    };
  }
  
  export default useBaseDatos;
