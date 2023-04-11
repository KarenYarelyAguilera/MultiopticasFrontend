import { Container, Grid } from "@mui/material";
import venta from "../../IMG/mano.png";
import registro from "../../IMG/reporte.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Styles
import '../../Styles/Home.css';

//FontAwesome
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export const MenuVentas = () => {

  const dataCards = 
  [
    {
      titulo: "Nueva Venta",
      imagen: 'https://static.vecteezy.com/system/resources/previews/002/331/740/non_2x/successful-task-completion-and-time-management-concept-young-smiling-businessman-cartoon-character-standing-near-tablet-flat-illustration-vector.jpg',
      vinculo: "/menuVentas/NuevaVenta", 
    },
    {
      titulo: "Detalle de Venta",
      imagen: 'https://static.vecteezy.com/system/resources/previews/002/331/740/non_2x/successful-task-completion-and-time-management-concept-young-smiling-businessman-cartoon-character-standing-near-tablet-flat-illustration-vector.jpg',
      vinculo: "/menuVentas/DetalleVenta", 
    },
    {
      titulo: "Detalle de Venta Descuento",
      imagen: 'https://static.vecteezy.com/system/resources/previews/002/331/740/non_2x/successful-task-completion-and-time-management-concept-young-smiling-businessman-cartoon-character-standing-near-tablet-flat-illustration-vector.jpg',
      vinculo: "/menuVentas/DetalleVentaDescuento", 
    },
    {
      titulo: "Detalle de Venta Promocion",
      imagen: 'https://static.vecteezy.com/system/resources/previews/002/331/740/non_2x/successful-task-completion-and-time-management-concept-young-smiling-businessman-cartoon-character-standing-near-tablet-flat-illustration-vector.jpg',
      vinculo: "/menuVentas/DetalleVentaPromocion", 
    },
    {
      titulo: "Detalle de Venta Promocion por la Marca",
      imagen: 'https://static.vecteezy.com/system/resources/previews/002/331/740/non_2x/successful-task-completion-and-time-management-concept-young-smiling-businessman-cartoon-character-standing-near-tablet-flat-illustration-vector.jpg',
      vinculo: "/menuVentas/DetallePromocionMarca", 
    },
    {
      titulo: "Lista de Venta",
      imagen: 'https://static.vecteezy.com/system/resources/previews/002/331/740/non_2x/successful-task-completion-and-time-management-concept-young-smiling-businessman-cartoon-character-standing-near-tablet-flat-illustration-vector.jpg',
      vinculo: "/menuVentas/ListaVenta", 
    },
    {
      titulo: "Nueva Compra",
      imagen: 'https://static.vecteezy.com/system/resources/previews/002/331/740/non_2x/successful-task-completion-and-time-management-concept-young-smiling-businessman-cartoon-character-standing-near-tablet-flat-illustration-vector.jpg',
      vinculo: "/menuVentas/NuevaCompra", 
    },
    {
      titulo: "Lista de Compra",
      imagen: 'https://static.vecteezy.com/system/resources/previews/002/331/740/non_2x/successful-task-completion-and-time-management-concept-young-smiling-businessman-cartoon-character-standing-near-tablet-flat-illustration-vector.jpg',
      vinculo: "/menuVentas/ListaCompra", 
    },
    {
      titulo: "Registro de Garantias",
      imagen: 'https://static.vecteezy.com/system/resources/previews/021/640/196/non_2x/3d-quality-guarantee-medal-with-star-and-ribbon-icon-isolated-on-white-background-3d-prize-winner-and-award-concept-cartoon-minimal-style-3d-badge-icon-render-illustration-vector.jpg',
      vinculo: "/menuVentas/RegistroGarantia", 
    },
    {
      titulo: "Lista de Garantias",
      imagen: 'https://static.vecteezy.com/system/resources/previews/002/099/543/non_2x/man-made-a-grocery-list-for-the-store-recipe-flat-illustration-vector.jpg',
      vinculo: "/menuVentas/listaGarantias", 
    },
    {
      titulo: "Registro de Sucursal",
      imagen: 'https://static.vecteezy.com/system/resources/previews/020/745/745/non_2x/isometric-bank-building-with-car-parking-in-front-of-street-yard-view-vector.jpg',
      vinculo: "/menuVentas/RegistroSucursal", 
    },
    {
      titulo: "Lista de Sucursal",
      imagen: 'https://static.vecteezy.com/system/resources/previews/007/382/723/non_2x/clipboard-with-checklist-icon-to-do-list-symbol-illustration-free-vector.jpg',
      vinculo: "/menuVentas/listaSucursal", 
    },
    {
      titulo: "Registro de Descuento",
      imagen: 'https://static.vecteezy.com/system/resources/previews/017/012/645/non_2x/design-illustration-of-shopping-time-and-discount-clock-that-appears-from-the-shopping-cart-to-show-the-time-of-best-offer-can-be-used-for-web-website-posters-apps-brochures-free-vector.jpg',
      vinculo: "/menuVentas/RegistroDescuento", 
    },
    {
      titulo: "Lista de Descuento",
      imagen: 'https://static.vecteezy.com/system/resources/previews/002/331/740/non_2x/successful-task-completion-and-time-management-concept-young-smiling-businessman-cartoon-character-standing-near-tablet-flat-illustration-vector.jpg',
      vinculo: "/menuVentas/listaDescuento", 
    },
    
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
