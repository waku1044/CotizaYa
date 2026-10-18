import { useNavigate } from 'react-router-dom';
import './BotonAgregar.css';



const BotonAgregar = ({tipo})=>{
const navigate = useNavigate(); 


const redirigir = ()=>{

    switch(tipo){
        case 'crearFactura':
            navigate('/facturas/nuevo');
            break;
        case 'crearPresupuesto':
            navigate('/presupuestos/nuevo');
            break;
        case 'crearCliente':
            navigate('/clientes/nuevo');
            break;
        case 'crearArticulo':
            navigate('/articulos/nuevo');
            break;
        }

}

        return(
            <>  
             <button 
        className="btn-flotante" 
        onClick={() => redirigir()}
      >
        +
      </button>
            </>
        )


};

export default BotonAgregar;