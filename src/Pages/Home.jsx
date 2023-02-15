import '../Styles/Home.css';

import { BarraLateral, BarraHorizontal } from '../Components';

//Imagenes
import RegistroInventory from '../IMG/RegistroInventory.jpg';


export const Home = () => {
  return (
    <div className="contInventory">
      <BarraLateral />
      <BarraHorizontal />
      <div>
        <img className="imgCard" src={RegistroInventory} alt="" />
      </div>
    </div>
  );
};
