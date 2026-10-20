    // Importaciones clave de Firebase
    import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc} from 'firebase/firestore';
    import { db } from '../firebase/config';

    export const ServicioArticulos = {
        
        obtenerArticulos: async()=>{
            
            const articulosDB = collection(db,'articulos');
            
            const resp = await getDocs(articulosDB);    
            
            return resp.docs.map((doc)=>{
                return {
                    ...doc.data(),
                    id:doc.id
                };
            })
        },

        obtenerArticuloPorId: async(id)=>{
            const artRef = doc(db,'articulos', id);

            await getDoc(artRef);


        },

        guardarArticulo: async(articuloCompleto)=>{
            const articulosDB = collection(db,'articulos');

            await addDoc(articulosDB, articuloCompleto);
        },

        actualizarArticulo: async (id, datosActualizados) => {
    // 1. Localiza el documento por su ID dentro de la colección 'articulos'
    const artRef = doc(db, 'articulos', id);

    // 2. Envía los nuevos datos para actualizar los campos correspondientes
    await updateDoc(artRef, datosActualizados);
}

        },

        eliminarArticulo = async (id)=>{
            const artRef = doc(db,'articulos', id);

            await deleteDoc(artRef)
        }
    



        
        


