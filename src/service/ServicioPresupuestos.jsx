   // Importaciones clave de Firebase
    import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc} from 'firebase/firestore';
    import { db } from '../firebase/config';


    export const ServicioPresupuestos = {

        obtenerPresupuestos: async ()=>{
            
            const presupuestosDB = collection(db,'presupuestos');

            const resp = await getDocs(presupuestosDB);

            return resp.docs.map((doc)=>{
                return {

                    ...doc.data(),
                    id:doc.id
                }
            })

        },

        guardarPresupuesto: async(presupuestoCompleto)=>{
            const presupuestosDB = collection(db,'presupuestos');

            await addDoc(presupuestosDB, presupuestoCompleto);
        },

        eliminarPresupuesto : async (id)=>{
            const presuRef = doc(db,'presupuestos', id);

            await deleteDoc(presuRef)
        }


    };