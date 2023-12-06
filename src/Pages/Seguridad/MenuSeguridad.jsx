import { Container, Grid } from "@mui/material";
import venta from "../../IMG/mano.png";
import registro from "../../IMG/reporte.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Styles
import '../../Styles/Home.css';

//FontAwesome
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import ListUsers from '../../IMG/ListUsers.jpg';


export const MenuSeguridad = () => {

  const dataCards = 
  [
    {
      consulta:"s",
      imagen: ListUsers,
      titulo: 'Usuarios',
      vinculo: '/usuarios/lista',
    },
    // {
    //   titulo: "Nueva Venta",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/021/621/716/non_2x/global-marketing-strategy-concept-marketing-team-macromarketing-flat-modern-illustration-vector.jpg',
    //   vinculo: "/menuVentas/NuevaVenta", 
    // },
    {
      titulo: 'Permisos',
      imagen: 'https://static.vecteezy.com/system/resources/previews/007/132/142/non_2x/handy-flat-illustration-of-task-list-vector.jpg',
      vinculo: '/config/verpermisos',
    },
    {
      titulo: "Roles",
      imagen: 'https://static.vecteezy.com/system/resources/previews/000/517/735/non_2x/cyber-security-vector.png',
      vinculo: "/config/roles", 
    },
    // {
    //   titulo: "Detalle de Venta",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/021/621/736/non_2x/company-growth-concept-key-to-success-business-assets-company-mission-vision-and-philosophy-flat-modern-illustration-vector.jpg',
    //   vinculo: "/menuVentas/DetalleVenta", 
    // },
    // {
    //   titulo: "Conclusion de Venta",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/021/621/720/non_2x/company-goals-and-philosophy-concept-business-mission-flat-modern-illustration-vector.jpg',
    //   vinculo: "/menuVentas/DetalleVentaDescuento", 
    // },
    {
      titulo: "Parametros",
      imagen: 'https://static.vecteezy.com/system/resources/previews/001/860/124/non_2x/clipboard-check-mark-list-icon-isolated-style-free-vector.jpg',
      vinculo: "/config/ListaParametros",
    },
    {
      imagen: 'https://static.vecteezy.com/system/resources/previews/006/409/490/non_2x/people-thinking-to-make-decision-problem-solving-and-find-creative-ideas-with-question-mark-in-flat-cartoon-background-for-poster-illustration-vector.jpg',
      titulo: 'Preguntas de Seguridad',
      vinculo: '/config/PreguntasSeguridad',
    },
    {
      consulta:"s",
      titulo: "Bitacora",
      imagen: 'https://static.vecteezy.com/system/resources/previews/002/788/724/non_2x/checklist-on-smartphone-screen-online-survey-concept-hand-holds-mobile-phone-and-check-list-with-checkmark-illustration-flat-vector.jpg',
      vinculo: "/Administracion/Bitacora", 
    },

    {
      consulta:"s",
      titulo: "BackUp",
      imagen: 'https://static.vecteezy.com/system/resources/previews/004/689/194/non_2x/server-computer-network-free-vector.jpg',
      vinculo:"/usuarios/backup", 
    },
    
    // {
    //   titulo: "Detalle de Venta Promocion",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/021/621/718/non_2x/global-marketing-strategy-concept-marketing-team-target-affiliate-program-flat-modern-illustration-vector.jpg',
    //   vinculo: "/menuVentas/DetalleVentaPromocion", 
    // },
    // {
    //   titulo: "Detalle de Venta Promocion por la Marca",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/012/444/007/non_2x/target-investment-business-analysis-vector.jpg',
    //   vinculo: "/menuVentas/DetallePromocionMarca", 
    // },
    // {
    //   titulo: "Lista de Venta",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/000/622/840/non_2x/to-do-list-page-with-check-marks-and-pencil-concept-illustration-for-time-and-project-management-vector-illustration-template-in-flat-style.jpg',
    //   vinculo: "/menuVentas/ListaVenta", 
    // },
    // {
    //   titulo: "Nueva Compra",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/012/446/648/non_2x/successful-business-target-plan-vector.jpg',
    //   vinculo: "/menuVentas/NuevaCompra", 
    // },
    // {
    //   titulo: "Compras",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/002/513/157/non_2x/effective-planning-time-management-business-concept-vector.jpg',
    //   vinculo: "/menuInventario/ListaCompra", 
    // },
    // {
    //   titulo: "Registro de Garantias",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/021/640/196/non_2x/3d-quality-guarantee-medal-with-star-and-ribbon-icon-isolated-on-white-background-3d-prize-winner-and-award-concept-cartoon-minimal-style-3d-badge-icon-render-illustration-vector.jpg',
    //   vinculo: "/menuVentas/RegistroGarantia", 
    // },
    // {
    //   titulo: "Lista de Garantias",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/002/099/543/non_2x/man-made-a-grocery-list-for-the-store-recipe-flat-illustration-vector.jpg',
    //   vinculo: "/menuVentas/listaGarantias", 
    // },
    // // {
    // //   titulo: "Registro de Sucursal",
    // //   imagen: 'https://static.vecteezy.com/system/resources/previews/020/745/745/non_2x/isometric-bank-building-with-car-parking-in-front-of-street-yard-view-vector.jpg',
    // //   vinculo: "/menuVentas/RegistroSucursal", 
    // // },
    // // {
    // //   titulo: "Lista de Sucursal",
    // //   imagen: 'https://static.vecteezy.com/system/resources/previews/007/382/723/non_2x/clipboard-with-checklist-icon-to-do-list-symbol-illustration-free-vector.jpg',
    // //   vinculo: "/menuVentas/listaSucursal", 
    // // },
    // {
    //   titulo: "Registro de Descuento",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/017/012/645/non_2x/design-illustration-of-shopping-time-and-discount-clock-that-appears-from-the-shopping-cart-to-show-the-time-of-best-offer-can-be-used-for-web-website-posters-apps-brochures-free-vector.jpg',
    //   vinculo: "/menuVentas/RegistroDescuento", 
    // },
    // {
    //   titulo: "Lista de Descuento",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/002/331/740/non_2x/successful-task-completion-and-time-management-concept-young-smiling-businessman-cartoon-character-standing-near-tablet-flat-illustration-vector.jpg',
    //   vinculo: "/menuVentas/listaDescuento", 
    // },
    // {
    //   titulo: "Registro de Promociones",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/001/879/515/non_2x/refer-a-friend-for-affiliate-and-referral-program-promotion-and-marketing-with-mobile-ads-and-seo-smartphone-technology-to-connect-people-illustration-for-business-card-banner-brochure-flyer-free-vector.jpg',
    //   vinculo: "/menuVentas/RegistroPromociones", 
    // },
    // {
    //   titulo: "Lista de Promociones ",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/000/659/679/non_2x/check-list-business-document-in-the-clipboard-design-vector.jpg',
    //   vinculo: "/menuVentas/ListaPromociones", 
    // },
    // {
    //   titulo: "Registro de Promocion del Producto",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/010/596/578/non_2x/refferal-program-flat-style-illustration-design-free-vector.jpg',
    //   vinculo: "/menuVentas/PromocionProducto", 
    // },
    // {
    //   titulo: "Lista de Productos Promociones ",
    //   imagen: 'https://static.vecteezy.com/system/resources/previews/015/400/087/non_2x/hands-holding-clipboard-with-checklist-with-green-check-marks-and-pen-human-filling-control-list-on-notepad-concept-of-survey-quiz-to-do-list-or-agreement-illustration-in-flat-style-vector.jpg',
    //   vinculo: "/menuVentas/ListaPromocionProducto", 
    // },
    
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
