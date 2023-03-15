import { Link } from "react-router-dom";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Configuracion = ()=>{

    let opcion = [
        {
          titulo: 'Configurar Roles',
          vinculo: '/config/roles',
        },
        {
          titulo:'Lista de Permisos',
          vinculo:'/config/verpermisos'
        }
        
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