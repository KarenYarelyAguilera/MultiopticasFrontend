import'../Styles/Home.css'
import { Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import logo from '../IMG/Multioptica.png'

export const BarraHorizontal = (props) => {

    const navegate = useNavigate();
    const logout = () => {
        props.access("inactivo");
        props.user("");
        navegate("/");
      };

    return (
        <div className="BarraHorizontal">
            <Link to="/Home"> <img src={logo} alt="logo" id='logoBarra'/> </Link>
            <div className='derecha'><p id="usuario">{props.user}</p></div>            
        </div>
    )
}


