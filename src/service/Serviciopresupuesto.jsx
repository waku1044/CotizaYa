import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc} from 'firebase/firestore';
import { db } from '../firebase/config';


export const ServicioPresupuesto = {

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

        obtenerPresupuestoPorId: async(id)=>{
            const cliRef = doc(db,'presupuestos', id);

            await getDoc(cliRef);

        },

        guardarCliente: async(clienteCompleto)=>{
            const clientesDB = collection(db,'clientes');

            await addDoc(clientesDB, clienteCompleto);
        },

        actualizarCliente: async(id, datosActualizados)=>{
            const cliRef = doc(db, 'clientes', id);

            await updateDoc(cliRef, datosActualizados);
        },

        eliminarCliente: async (id)=>{
            const cliRef = doc(db,'clientes', id);

            await deleteDoc(cliRef)
}
}
