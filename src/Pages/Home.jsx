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
      <img src={logo} alt="logo" id="loguito" />
    </>  
    
  );
};

