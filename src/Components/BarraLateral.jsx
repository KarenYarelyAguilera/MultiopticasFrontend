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
                    <Link to="/clientes"> CLIENTES</Link>
                </li>
                <li>
                    <Link to="/ventas"> VENTAS</Link>
                </li>
                <li>
                    <Link to="/recordatorios"> RECORDATORIOS</Link>
                </li>
                <li>
                    <Link to="/usuarios"> USUARIOS</Link>
                </li>
                <li>
                    <Link to="/reporte"> REPORTES</Link>
                </li>
                <li>
                    <Link to="/seguridad"> SEGURIDAD</Link>
                </li>
                <li>
                    <Link to="/config"> CONFIGURACION</Link>
                </li>
            </ul>
        </div>
    )
}
