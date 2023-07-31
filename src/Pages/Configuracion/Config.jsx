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
        // {
        //   titulo: "Registro de Sucursal",
        //   imagen: 'https://static.vecteezy.com/system/resources/previews/020/745/745/non_2x/isometric-bank-building-with-car-parking-in-front-of-street-yard-view-vector.jpg',
        //   vinculo: "/config/RegistroSucursal", 
        // },
        {
          titulo: "Lista de Sucursal",
          imagen: 'https://static.vecteezy.com/system/resources/previews/020/745/745/non_2x/isometric-bank-building-with-car-parking-in-front-of-street-yard-view-vector.jpg',
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
        // {
        //   imagen: 'https://static.vecteezy.com/system/resources/previews/001/879/450/non_2x/doctor-checks-patient-eyes-health-with-snellen-chart-glasses-for-eye-disease-eye-clinic-or-optical-eyewear-store-optician-professional-illustration-for-business-card-banner-brochure-flyer-ads-free-vector.jpg',
        //   titulo: 'Registro de Modelo',
        //   vinculo: '/config/RegistroModelo',
        // },
        {
          imagen: 'https://static.vecteezy.com/system/resources/previews/001/879/450/non_2x/doctor-checks-patient-eyes-health-with-snellen-chart-glasses-for-eye-disease-eye-clinic-or-optical-eyewear-store-optician-professional-illustration-for-business-card-banner-brochure-flyer-ads-free-vector.jpg',
          titulo: 'Lista de Modelo',
          vinculo: '/config/lista',
        },
        // {
        //   imagen: 'https://static.vecteezy.com/system/resources/previews/021/089/243/non_2x/house-with-file-folder-design-of-property-documents-premium-icon-vector.jpg',
        //   titulo: 'Registro de la Marca',
        //   vinculo: '/config/RegistroMarcas',
        // },
        {
          imagen: 'https://static.vecteezy.com/system/resources/previews/021/089/243/non_2x/house-with-file-folder-design-of-property-documents-premium-icon-vector.jpg',
          titulo: 'Lista de Marcas',
          vinculo: '/config/ListaMarcas',
        },
        // {
        //   imagen: 'https://static.vecteezy.com/system/resources/previews/008/064/144/non_2x/payment-methods-icon-illustration-for-transaction-payment-machine-credit-card-check-concept-on-financial-finance-marketplace-perfect-for-ui-ux-mobile-app-web-brochure-marketing-vector.jpg',
        //   titulo: 'Metodos De Pago',
        //   vinculo: '/config/MetodosDePago',
        // },
        {
          imagen: 'https://static.vecteezy.com/system/resources/previews/025/143/512/non_2x/invoice-icon-design-free-vector.jpg',
          titulo: 'Lista Metodos De Pago',
          vinculo: '/config/ListaMetodosDePago',
        },
        // {
        //   imagen: 'https://static.vecteezy.com/system/resources/previews/020/475/342/non_2x/to-do-list-work-planning-or-schedule-concept-productive-businessman-with-pencil-and-to-do-list-clipboard-modern-flat-illustration-vector.jpg',
        //   titulo: 'Registro de Departamento',
        //   vinculo: '/config/RegistroDepartamento',
        // },
        {
          imagen: 'https://static.vecteezy.com/system/resources/previews/014/889/899/non_2x/map-of-an-imaginary-city-with-point-on-the-map-with-skyscrapers-and-park-illustration-vector.jpg',
          titulo: 'Lista De Departamentos',
          vinculo: '/config/ListaDepartamentos',
        },
        // {
        //   imagen: 'https://static.vecteezy.com/system/resources/previews/020/475/342/non_2x/to-do-list-work-planning-or-schedule-concept-productive-businessman-with-pencil-and-to-do-list-clipboard-modern-flat-illustration-vector.jpg',
        //   titulo: 'Registro de Ciudad',
        //   vinculo: '/config/RegistroCiudad',
        // },
        {
          imagen: 'https://static.vecteezy.com/system/resources/previews/000/144/534/non_2x/free-flat-line-marketing-vector-icons.jpg',
          titulo: 'Lista De Ciudad',
          vinculo: '/config/ListaCiudad',
        },
        // {
        //   imagen: 'https://static.vecteezy.com/system/resources/previews/020/475/342/non_2x/to-do-list-work-planning-or-schedule-concept-productive-businessman-with-pencil-and-to-do-list-clipboard-modern-flat-illustration-vector.jpg',
        //   titulo: 'Registro de Pais',
        //   vinculo: '/config/RegistroPais',
        // },
        {
          imagen: 'https://static.vecteezy.com/system/resources/previews/000/144/399/non_2x/dotted-world-map-vector.jpg',
          titulo: 'Lista De Paises',
          vinculo: '/config/ListaPais',
        },
        // {
        //   imagen: 'https://static.vecteezy.com/system/resources/previews/020/475/342/non_2x/to-do-list-work-planning-or-schedule-concept-productive-businessman-with-pencil-and-to-do-list-clipboard-modern-flat-illustration-vector.jpg',
        //   titulo: 'Registro de Genero',
        //   vinculo: '/config/RegistroGenero',
        // },
        {
          imagen: 'https://static.vecteezy.com/system/resources/previews/007/737/986/non_2x/male-and-female-gender-icon-symbol-free-vector.jpg',
          titulo: 'Lista De Genero',
          vinculo: '/config/ListaGenero',
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