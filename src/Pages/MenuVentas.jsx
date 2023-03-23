import { Container, Grid } from "@mui/material";
import venta from "../IMG/mano.png";
import registro from "../IMG/reporte.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Styles
import '../Styles/Home.css';

//FontAwesome
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export const MenuVentas = () => {

  const dataCards = 
  [
    {
      titulo: "Nueva venta",
      imagen: venta,
      vinculo: "/ventas/nuevaventa", 
    },
    {
      titulo: "Registro de ventas",
      imagen: registro,
      vinculo: "/ventas/reportes", 
    }
    
  ]

  return (
    <div className="CardUsuarios">
    <div className="contPrimaryVentas">
      {dataCards.length ? (
        dataCards.map((datas, index) => (
          <div key={index}>
            <div className="contCard">
              {datas.imagen ? (
                <img src={datas.imagen} className="imgCard" alt="" />
              ) : (
                <div>
                  <FontAwesomeIcon className="ErroImg" icon={faImage} />
                  <h1>Error al mostrar la imagen</h1>
                </div>
              )}
              <Link className="btnCard" to={datas.vinculo}>
                <h1>{datas.titulo}</h1>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="NoInformation">Error al mostrar la información</div>
      )}
    </div>
  </div>
  );
};
