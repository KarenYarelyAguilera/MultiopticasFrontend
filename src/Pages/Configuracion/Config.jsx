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