import '../Styles/Home.css';
import { Link } from 'react-router-dom';
import MulltiOptica from '../IMG/MultiopticaBlanco.png';
import MulltiOpticaOjo from '../IMG/MultiopticaOjo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';


import {
  faClipboardList,
  faPeopleRoof,
  faHandHoldingDollar,
  faCalendar,
  faUsers,
  faFileLines,
  faShieldHalved,
  faGear,
  faRightFromBracket,
  faChevronRight,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { sendData } from '../scripts/sendData';
import axios from 'axios';

import { Bitacora } from '../Components/bitacora.jsx';


//--------------------URL DE BITACORAS----------------------------------
const urlBitacoraModEmple = 'http://localhost:3000/api/bitacora/Empleado';
const urlCierre = 'http://localhost:3000/api/bitacora/Cierre';
const urlBitacoraConfig = 'http://localhost:3000/api/bitacora/Configuracion';
const urlBIngresoPCita='http://localhost:3000/api/bitacora/citas';
const urlIngresoInventario ='http://localhost:3000/api/bitacora/PantallaInventarioB';
const urlPermisos = 'http://localhost:3000/api/permisosRol'
//-----------------------------------------------------------------------

export const BarraLateral = props => {
  //Funcion de bitacora
  const dataB = {
    Id: props.idUsuario,
  };
  const bitacora = {
    urlB:urlBIngresoPCita,
    activo:props.activo,
    dataB:dataB
  };

  const [permisos, setPermisos] = useState([]);

  const dataP={
      idRol:props.idRol
  }

  useEffect(() => {
      axios.post(urlPermisos,dataP).then((response) => setPermisos(response.data))
  }, [])

  console.log(permisos);

  let pantallas = Object.values(permisos).map(({ Objeto}) => Objeto
  ); //permite acceder a la propiedad del objeto y aislarla a un array aparte
  let consulta = Object.values(permisos).map(
    ({ PermConsul }) => PermConsul,
  );
  console.log(consulta);

  //------------------------Componentes del menu-------------------------
  const Usuario = () => {
    if (consulta[0] === 's' && pantallas[0] === "Usuario") {
      return (
        <li>
          <Link className="link" to="/usuarios" onClick={() => props.obj(2)}>
            <FontAwesomeIcon className="iconLi" icon={faUsers} />
            <h1>ADMINISTRACION</h1>
          </Link>
        </li>
      );
    }
  };

  const Inventario = () => {
    if (consulta[1] === 's' && pantallas[1] === "Inventario") {
      return (
        <li>
          <Link className="link" to="/inventario">
            <FontAwesomeIcon className="iconLi" icon={faClipboardList} />
            <h1>INVENTARIO</h1>
          </Link>
        </li>
      );
    }
  };

  const Clientes = () => {
    if (consulta[2] === 's' && pantallas[2] === "Clientes") {
      return (
        <li>
          <Link className="link" to="/menuClientes">
            <FontAwesomeIcon className="iconLi" icon={faPeopleRoof} />
            <h1>CLIENTES</h1>
          </Link>
        </li>
      );
    }
  };


  const Recordatorios = () => {
    if (consulta[3] === 's' && pantallas[3] === "Citas") {
      return (
        <li>
          <Link className="link" to="/recordatorio">
            <FontAwesomeIcon className="iconLi" icon={faCalendar} />
            <h1>CITAS</h1>
          </Link>
        </li>
      );
    }
  };

  const Seguridad = () => {
    if (consulta[5] === 's' && pantallas[5] === "Seguridad") {
      return (
        <li>
          <Link className="link" to="/seguridad">
            <FontAwesomeIcon className="iconLi" icon={faShieldHalved} />
            <h1>SEGURIDAD</h1>
          </Link>
        </li>
      );
    }
  };
  const Configuracion = () => {
    if (consulta[6] === 's' && pantallas[6] === "Configuracion") {
      return (
        <li>
          <Link className="link" to="/config">
            <FontAwesomeIcon className="iconLi" icon={faGear} />
            <h1>MANTENIMIENTO </h1>
          </Link>
        </li>
      );
    }
  };

  const Ventas = () => {
    if (consulta[7] === 's' && pantallas[7] === "Ventas") {
      return (
        <li>
          <Link className="link" to="/ventas">
            <FontAwesomeIcon className="iconLi" icon={faHandHoldingDollar} />
            <h1>VENTAS</h1>
          </Link>
        </li>
      );
    }
  };

  const logout = () => {
    axios.post(urlCierre, dataB);
    props.mail('');
    props.user('');
    props.access('inactivo');
    props.rol('');
  };

  const handleClick = event => {
    const sidebar = document.querySelector('.BarraLateral');
    const toggle = document.querySelector('.iconClose');

    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('close');
    });
  };
  return (
    <div className="BarraLateral close">
      <div className="imglogo">
        <Link to="/dashboard">
          <img src={MulltiOptica} alt="logo" className="logoBarraLateral" />
        </Link>
        <Link to="/dashboard">
          <img src={MulltiOpticaOjo} alt="logo" className="logoOjo" />
        </Link>
        <FontAwesomeIcon
          onClick={handleClick}
          className="iconClose"
          icon={faChevronRight}
        />
      </div>

      <div className="navPrincipal">
        <nav>
          <ul>

            <Usuario></Usuario>  
            <Ventas></Ventas>
            <Inventario/>
            <Clientes></Clientes>
            <Recordatorios></Recordatorios>
            <Seguridad></Seguridad>
            <Configuracion></Configuracion>
           
  
            

            {/* <Usuario />
            <Ventas />
            <Inventario/>
            <Clientes />
            <Reportes />
            <Configuracion />
            <Recordatorios />

            <Seguridad /> */}
            
          </ul>
        </nav>
      </div>

      <div className="logout">
        <ul>
          <li>
            <Link className="linkLogout" to="/" onClick={logout => {}}>
              <FontAwesomeIcon className="iconLi" icon={faRightFromBracket} />
              <h1>CERRAR SESIÓN</h1>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
