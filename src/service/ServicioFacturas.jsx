   // Importaciones clave de Firebase
    import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc} from 'firebase/firestore';
    import { db } from '../firebase/config';


    export const ServicioFacturas = {

        obtenerFacturas: async ()=>{
            
            const facturasDB = collection(db,'facturas');

            const resp = await getDocs(facturasDB);

            return resp.docs.map((doc)=>{
                return {

                    ...doc.data(),
                    id:doc.id
                }
            })

        },

        guardarFacturas: async(facturaCompleta)=>{
            const facturasDB = collection(db,'facturas');

            await addDoc(facturasDB, facturaCompleta);
        },

        eliminarFactura : async (id)=>{
            const factuRef = doc(db,'facturas', id);

            await deleteDoc(factuRef)
        }


    };