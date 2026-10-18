import { Outlet } from 'react-router-dom';
import Nav from '../../componentes/navegador/nav';



const Layout = ()=>{


    return (
        <div > 
        <main>
            <Outlet />
        </main>
        <Nav />
        
    
  </div>
    );
};

export default Layout;