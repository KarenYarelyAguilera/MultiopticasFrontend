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
        <img src={MulltiOptica} alt="logo" className="logoBarraLateral" />
        <img src={MulltiOpticaOjo} alt="logo" className="logoOjo" />
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
              <FontAwesomeIcon className="iconLi" icon={faClipboardList} />
              <Link className="link" to="/inventario">
                {' '}
                INVENTARIO
              </Link>
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faPeopleRoof} />
              <Link className="link" to="">
                {' '}
                CLIENTES
              </Link>
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faHandHoldingDollar} />
              <Link className="link" to="">
                {' '}
                VENTAS
              </Link>
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faCalendar} />
              <Link className="link" to="">
                {' '}
                RECORDATORIOS
              </Link>
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faUsers} />
              <Link className="link" to="">
                {' '}
                USUARIOS
              </Link>
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faFileLines} />
              <Link className="link" to="">
                {' '}
                REPORTES
              </Link>
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faShieldHalved} />
              <Link className="link" to="">
                {' '}
                SEGURIDAD
              </Link>
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faGear} />
              <Link className="link" to="">
                {' '}
                CONFIGURACION
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="logout">
        <ul>
          <li>
            <FontAwesomeIcon className="iconLi" icon={faRightFromBracket} />
            <Link className="linkLogout" to="">
              {' '}
              CERRAR SESIÓN
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
