import '../Styles/Home.css';

import { BarraLateral } from '../Components/BarraLateral.jsx';
import { BarraHorizontal } from '../Components/BarraHorizontal.jsx';

//Imagenes
import RegistroInventory from '../IMG/RegistroInventory.jpg';

export const Home = () => {
  return (
    <div className="">
      <BarraLateral />
      <BarraHorizontal />
      <div className="contInventory"></div>
    </div>
  );
};
