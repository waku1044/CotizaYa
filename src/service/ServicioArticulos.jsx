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

        actualizarArticulo: async(id)=>{
            const artRef = doc(db, 'articulos', id);

            await updateDoc(artRef);
        },

        eliminarArticulo: async (id)=>{
            const artRef = doc(db,'articulos', id);

            await deleteDoc(artRef)
        }
    };



        
        


