import '../Styles/Home.css';
import { Link } from 'react-router-dom';
import MulltiOptica from '../IMG/MultiopticaBlanco.png';
import MulltiOpticaOjo from '../IMG/MultiopticaOjo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
} from '@fortawesome/free-solid-svg-icons';

export const BarraLateral = () => {
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
        <Link to="/">
          <img src={MulltiOptica} alt="logo" className="logoBarraLateral" />
        </Link>
        <Link to="/">
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
            <li>
              <Link className="link" to="/inventario">
                <FontAwesomeIcon className="iconLi" icon={faClipboardList} />
                <h1>INVENTARIO</h1>
              </Link>
            </li>
            <li>
              <Link className="link" to="/recuperacionPassword">
                <FontAwesomeIcon className="iconLi" icon={faPeopleRoof} />
                <h1>CLIENTES</h1>
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
              <Link className="link" to="">
                <FontAwesomeIcon className="iconLi" icon={faCalendar} />
                <h1>RECORDATORIOS</h1>
              </Link>
            </li>
            <li>
              <Link className="link" to="/usuarios">
                <FontAwesomeIcon className="iconLi" icon={faUsers} />
                <h1>USUARIOS</h1>
              </Link>
            </li>
            <li>
              <Link className="link" to="/preguntasSeguridad">
                <FontAwesomeIcon className="iconLi" icon={faFileLines} />
                <h1>REPORTES</h1>
              </Link>
            </li>
            <li>
              <Link className="link" to="">
                <FontAwesomeIcon className="iconLi" icon={faShieldHalved} />
                <h1>SEGURIDAD</h1>
              </Link>
            </li>
            <li>
              <Link className="link" to="">
                <FontAwesomeIcon className="iconLi" icon={faGear} />
                <h1>CONFIGURACION</h1>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="logout">
        <ul>
          <li>
            <Link className="linkLogout" to="">
              <FontAwesomeIcon className="iconLi" icon={faRightFromBracket} />
              <h1>CERRAR SESIÓN</h1>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
