

export const ServicioPresupuesto = {

obtenerClientes: async ()=>{

            const clientesDB = collection(db,'clientes');

            const resp = await getDocs(clientesDB);

            return resp.docs.map((doc)=>{
                return {
                    ...doc.data(),
                    id:doc.id
                }
            })

        },

        obtenerClientePorId: async(id)=>{
            const cliRef = doc(db,'clientes', id);

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
