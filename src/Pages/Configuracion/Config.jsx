import { Link } from "react-router-dom";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Configuracion = ()=>{

    let opcion = [
        {
          titulo: 'Configurar Roles',
          imagen: 'https://static.vecteezy.com/system/resources/previews/006/946/052/non_2x/abstract-concept-of-social-role-social-norms-gender-stereotypes-social-norms-role-exchange-is-an-abstract-metaphor-illustration-in-flat-modern-style-vector.jpg',
          vinculo: '/config/roles',
        },
        {
          titulo:'Lista de Permisos',
          imagen: 'https://static.vecteezy.com/system/resources/previews/007/132/142/non_2x/handy-flat-illustration-of-task-list-vector.jpg',
          vinculo:'/config/verpermisos',
        },
        {
          titulo: "Registro de Sucursal",
          imagen: 'https://static.vecteezy.com/system/resources/previews/020/745/745/non_2x/isometric-bank-building-with-car-parking-in-front-of-street-yard-view-vector.jpg',
          vinculo: "/config/RegistroSucursal", 
        },
        {
          titulo: "Lista de Sucursal",
          imagen: 'https://static.vecteezy.com/system/resources/previews/007/382/723/non_2x/clipboard-with-checklist-icon-to-do-list-symbol-illustration-free-vector.jpg',
          vinculo: "/config/listaSucursal", 
        },
        {
          titulo: "Lista de Parametros",
          imagen: 'https://static.vecteezy.com/system/resources/previews/001/860/124/non_2x/clipboard-check-mark-list-icon-isolated-style-free-vector.jpg',
          vinculo: "/config/ListaParametros", 
        },
        {
          titulo: "Bitacora",
          imagen: 'https://static.vecteezy.com/system/resources/previews/002/788/724/non_2x/checklist-on-smartphone-screen-online-survey-concept-hand-holds-mobile-phone-and-check-list-with-checkmark-illustration-flat-vector.jpg',
          vinculo: "/config/Bitacora", 
        },
        {
          imagen: 'https://static.vecteezy.com/system/resources/previews/001/879/450/non_2x/doctor-checks-patient-eyes-health-with-snellen-chart-glasses-for-eye-disease-eye-clinic-or-optical-eyewear-store-optician-professional-illustration-for-business-card-banner-brochure-flyer-ads-free-vector.jpg',
          titulo: 'Registro de Modelo',
          vinculo: '/config/RegistroModelo',
        },
        {
          imagen: 'https://static.vecteezy.com/system/resources/previews/008/296/869/non_2x/to-do-list-concept-illustration-free-vector.jpg',
          titulo: 'Lista de Modelo',
          vinculo: '/config/lista',
        },
        {
          imagen: 'https://static.vecteezy.com/system/resources/previews/021/089/243/non_2x/house-with-file-folder-design-of-property-documents-premium-icon-vector.jpg',
          titulo: 'Registro de la Marca',
          vinculo: '/config/RegistroMarcas',
        },
        {
          imagen: 'https://static.vecteezy.com/system/resources/previews/020/475/342/non_2x/to-do-list-work-planning-or-schedule-concept-productive-businessman-with-pencil-and-to-do-list-clipboard-modern-flat-illustration-vector.jpg',
          titulo: 'Lista de Marcas',
          vinculo: '/config/ListaMarcas',
        },
        {
          imagen: 'https://static.vecteezy.com/system/resources/previews/020/475/342/non_2x/to-do-list-work-planning-or-schedule-concept-productive-businessman-with-pencil-and-to-do-list-clipboard-modern-flat-illustration-vector.jpg',
          titulo: 'Metodos De Pago',
          vinculo: '/config/MetodosDePago',
        },
        {
          imagen: 'https://static.vecteezy.com/system/resources/previews/020/475/342/non_2x/to-do-list-work-planning-or-schedule-concept-productive-businessman-with-pencil-and-to-do-list-clipboard-modern-flat-illustration-vector.jpg',
          titulo: 'Lista Metodos De Pago',
          vinculo: '/config/ListaMetodosDePago',
        },
      ];

      return (
        <div className="CardUsuarios">
          <div className="contPrimary">
            {opcion.length ? (
              opcion.map((opcion, index) => (
                <div key={index}>
                
                  <div className="contCard">
                    {opcion.imagen ? (
                      <img src={opcion.imagen} className="imgCard" alt="" />
                    ) : (
                      <div>
                        <FontAwesomeIcon className="ErroImg" icon={faImage} />
                        <h1>Error al mostrar la imagen</h1>
                      </div>
                    )}
                    <Link className="btnCard" to={opcion.vinculo}>
                      <h1>{opcion.titulo}</h1>
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
    
}