import { useNavigate } from "react-router-dom";
import logo from '../IMG/Multioptica.png'
import '../Styles/Home.css'
export const Home = (props) => {
  const navegate = useNavigate();

  const logout = () => {
    props.access("inactivo");
    props.user("");
    navegate("/");
  };
  return (
    <>
      <h2>{props.user}</h2>
      <div className="Home">
            <div className="Home_items">
                <a href="#"> INICIO</a>
                <a href="#">INVENTARIO </a>
                <a href="#">CLIENTES</a>
                <a href="#"> VENTAS</a>
                <a href="#"> RECORDATORIOS</a>
                <a href="#"> USUARIOS</a>
                <a href="#"> REPORTES</a>
                <a href="#"> SEGURIDAD</a>
                <a href="#"> CONFIGURACION</a>
            </div>
        </div>
    </>  
    
  );
};

