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


//--------------------URL DE BITACORAS----------------------------------
const urlBitacoraModEmple = 'http://localhost:3000/api/bitacora/Empleado';
const urlCierre = 'http://localhost:3000/api/bitacora/Cierre';
const urlBitacoraConfig = 'http://localhost:3000/api/bitacora/Configuracion';
const urlBIngresoPCita='http://localhost:3000/api/bitacora/citas';
//-----------------------------------------------------------------------

export const BarraLateral = props => {
  //Funcion de bitacora
  const dataB = {
    Id: props.idUsuario,
  };

  const [permisos, setPermisos] = useState([]);

  // useEffect(() => {
  //   fetch(urlP, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setPermisos(data))
  // }, [])

  let pantallas = Object.values(permisos).map(({ Id_Objeto }) =>
    parseInt(Id_Objeto),
  ); //permite acceder a la propiedad del objeto y aislarla a un array aparte
  let consulta = Object.values(permisos).map(
    ({ Permiso_Consultar }) => Permiso_Consultar,
  );

  //------------------------Componentes del menu-------------------------
  const Usuario = () => {
    if (consulta[0] === 's' && pantallas[0] === 2) {
      return (
        <li>
          <Link className="link" to="/usuarios" onClick={() => props.obj(2)}>
            {/* fetch(urlBitacoraUsuario, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataB),
            })
            props.obj(2)}}> */}

            <FontAwesomeIcon className="iconLi" icon={faUsers} />
            <h1>ADMINISTRACION</h1>
          </Link>
        </li>
      );
    }
  };

  const Inventario = () => {
    if (consulta[1] === 's' && pantallas[1] === 3) {
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
    if (consulta[2] === 's' && pantallas[2] === 4) {
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
    if (consulta[3] === 's' && pantallas[3] === 5) {
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

  const Reportes = () => {
    if (consulta[4] === 's' && pantallas[4] === 6) {
      return (
        <li>
          <Link className="link" to="/preguntasSeguridad">
            <FontAwesomeIcon className="iconLi" icon={faFileLines} />
            <h1>REPORTES</h1>
          </Link>
        </li>
      );
    }
  };
  console.log(consulta[5] === 's' && pantallas[5] === 7 && props.idRol===1);
  const Seguridad = () => {
    if (consulta[5] === 's' && pantallas[5] === 7 && props.idRol===1) {
      return (
        <li>
          <Link className="link" to="">
            <FontAwesomeIcon className="iconLi" icon={faShieldHalved} />
            <h1>SEGURIDAD</h1>
          </Link>
        </li>
      );
    }
  };
  const Configuracion = () => {
    if (consulta[6] === 's' && pantallas[6] === 8) {
      return (
        <li>
          <Link className="link" to="/config">
            <FontAwesomeIcon className="iconLi" icon={faGear} />
            <h1>CONFIGURACION</h1>
          </Link>
        </li>
      );
    }
  };

  const Ventas = () => {
    if (consulta[7] === 's' && pantallas[7] === 9) {
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

            {props.idRol===1?<>
              <li>
              <Link
                className="link"
                to="/usuarios"
                onClick={() => {
                  axios.post(urlBitacoraModEmple, dataB); //Bitacora del modulo de usuario/empleado
                  props.obj(2);
                }}>
                <FontAwesomeIcon className="iconLi" icon={faUsers} />
                <h1>ADMINISTRACION</h1>
              </Link>
            </li>
            </>:<></>}
            
            <li>
              <Link className="link" to="/menuClientes">
                <FontAwesomeIcon className="iconLi" icon={faPeopleRoof} />
                <h1>CLIENTES</h1>
              </Link>
            </li>

            <li>
              <Link className="link" to="/inventario">
                <FontAwesomeIcon className="iconLi" icon={faClipboardList} />
                <h1>INVENTARIO</h1>
              </Link>
            </li>
            <li>
              <Link className="link" to="/ventas">
                <FontAwesomeIcon
                  className="iconLi"
                  icon={faHandHoldingDollar}
                />
                <h1>VENTAS</h1>
              </Link>
            </li>

            <li>
              <Link className="link" to="/compras">
                <FontAwesomeIcon
                  className="iconLi"
                  icon={faCartShopping}
                />
                <h1>COMPRAS</h1>
              </Link>
            </li>

            <li>
              <Link className="link" to="/recordatorio"   onClick={() => {
                  axios.post(urlBIngresoPCita, dataB); //Bitacora del modulo de usuario/empleado
                  props.obj(2);
                }}>
                <FontAwesomeIcon className="iconLi" icon={faCalendar} />
                <h1>CITAS</h1>
              </Link>
            </li>

                {props.idRol===1?<>
                  <li>
              <Link className="link" to="/config/roles">
                <FontAwesomeIcon className="iconLi" icon={faShieldHalved} />
                <h1>SEGURIDAD</h1>
              </Link>
            </li>

            <li>
              <Link
                className="link"
                to="/config"
                onClick={() => {
                  axios.post(urlBitacoraConfig, dataB); //Bitacora de etrar a la pantalla de configuracion
                  props.obj(2);
                }}
              >
                <FontAwesomeIcon className="iconLi" icon={faGear} />
                <h1>MANTENIMIENTO</h1>
              </Link>
            </li>
                </>:<></>}
            

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
