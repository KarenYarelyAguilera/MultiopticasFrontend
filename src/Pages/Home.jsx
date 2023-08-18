import '../Styles/Home.css';
//import '../Styles/login.css';
import ojo from '../IMG/MultiopticaOjo.png'

import logo from '../IMG/Multioptica.png';

export const Home = () => {
  return (
    <div className="container">
      <div className="contInventory">
       {/*  <div className="centeredContent">
          <section className="section">
            <img src={ojo} alt="logo" className="logoPrincipal" />
          </section>
        </div> */}
        <div className="titleAddUser">
          <h2>¡Bienvenidos a MultiOpticas!</h2>
        </div>
        <div className="centeredContent">
          <section className="section2">
            <img src={logo} alt="logo" className="logoPrincipal" />
          </section>
        </div>
      </div>
    </div>
  );
};
