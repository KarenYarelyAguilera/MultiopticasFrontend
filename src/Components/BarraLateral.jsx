import'../Styles/Home.css'
import {Link} from 'react-router-dom'

export const BarraLateral = () => {
    return (
        <div className="BarraLateral">
            <ul>
                <li>
                    <Link to="/inventario"> INVENTARIO</Link>
                </li>
                <li>
                    <Link to=""> CLIENTES</Link>
                </li>
                <li>
                    <Link to=""> VENTAS</Link>
                </li>
                <li>
                    <Link to=""> RECORDATORIOS</Link>
                </li>
                <li>
                    <Link to=""> USUARIOS</Link>
                </li>
                <li>
                    <Link to=""> REPORTES</Link>
                </li>
                <li>
                    <Link to=""> SEGURIDAD</Link>
                </li>
                <li>
                    <Link to=""> CONFIGURACION</Link>
                </li>
            </ul>
        </div>
    )
}
