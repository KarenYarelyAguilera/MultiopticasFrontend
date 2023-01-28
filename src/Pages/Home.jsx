import { useNavigate } from "react-router-dom";

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
        <input type="button" value="Logout" onClick={logout} />
        <input type="button" value="ventas" onClick={()=>navegate("/ventas")}/>
    </>  
    
  );
};
