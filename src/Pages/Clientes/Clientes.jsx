import { Container, Grid } from '@mui/material';
import venta from '../../IMG/mano.png';
import registro from '../../IMG/reporte.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Styles
import '../../Styles/Home.css';

//FontAwesome
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const Clientes = () => {
  const dataCards = [
    {
      titulo: 'Registro de Cliente',
      imagen:
        'https://static.vecteezy.com/system/resources/previews/018/030/753/non_2x/support-business-consulting-customer-man-online-consultant-service-abstract-circle-background-flat-color-icon-free-vector.jpg',
      vinculo: '/menuClientes/nuevoCliente',
    },
    {
      titulo: 'Lista de Clientes',
      imagen:
        'https://static.vecteezy.com/system/resources/previews/021/272/476/non_2x/isometric-flat-3d-illustration-concept-of-man-filling-personal-data-form-free-vector.jpg',
      vinculo: '/menuClientes/lista',
    },
    // {
    //   titulo: 'Datos de Expediente',
    //   imagen:
    //     'https://static.vecteezy.com/system/resources/previews/021/272/478/non_2x/isometric-flat-3d-illustration-concept-of-man-filling-registration-form-on-screen-free-vector.jpg',
    //   vinculo: '/menuClientes/registroCliente',
    // },
    {
      titulo: 'Listas De Expedientes',
      imagen:
        'https://static.vecteezy.com/system/resources/previews/021/238/368/non_2x/documents-icon-design-free-vector.jpg',
      vinculo: '/menuClientes/listaExpedientes',
    },
  ];

  return (
    <div className="CardUsuarios">
      <div className="contPrimaryClientes">
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
