import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Styles
import '../../Styles/Home.css';

//FontAwesome
import { faImage } from '@fortawesome/free-solid-svg-icons';

import RegistroInventario from '../../IMG/RegistroInventario.jpg';
import InventarioDisponible from '../../IMG/InventarioDisponible.jpg';
import DescuentosPromociones from '../../IMG/DescuentosPromociones.jpg';
import Garantias from '../../IMG/Garantias.jpg';
import Kardex from '../../IMG/Kardex.jpg';


export const Inventario = props => {
  const datos = [
    {
      imagen: RegistroInventario,
      titulo: 'Registro de Inventario',
      vinculo: '/registroInventario',
    },
    {
      imagen: InventarioDisponible,
      titulo: 'Inventario Disponible',
      vinculo: '',
    },
    // {
    //   imagen: DescuentosPromociones,
    //   titulo: 'Descuentos y promociones',
    //   vinculo: '',
    // },
    // {
    //   imagen: Garantias,
    //   titulo: 'Garantias',
    //   vinculo: '',
    // },
    {
      imagen: Kardex,
      titulo: 'Kardex',
      vinculo: '',
    },
    {
      imagen: 'https://static.vecteezy.com/system/resources/previews/021/089/243/non_2x/house-with-file-folder-design-of-property-documents-premium-icon-vector.jpg',
      titulo: 'Registro de la Marca',
      vinculo: '/menuInventario/RegistroMarcas',
    },
    {
      imagen: 'https://static.vecteezy.com/system/resources/previews/020/475/342/non_2x/to-do-list-work-planning-or-schedule-concept-productive-businessman-with-pencil-and-to-do-list-clipboard-modern-flat-illustration-vector.jpg',
      titulo: 'Lista de Marcas',
      vinculo: '/menuInventario/ListaMarcas',
    },
    {
      imagen: 'https://static.vecteezy.com/system/resources/previews/001/879/450/non_2x/doctor-checks-patient-eyes-health-with-snellen-chart-glasses-for-eye-disease-eye-clinic-or-optical-eyewear-store-optician-professional-illustration-for-business-card-banner-brochure-flyer-ads-free-vector.jpg',
      titulo: 'Registro de Modelo',
      vinculo: '/menuInventario/RegistroModelo',
    },
    {
      imagen: 'https://static.vecteezy.com/system/resources/previews/008/296/869/non_2x/to-do-list-concept-illustration-free-vector.jpg',
      titulo: 'Lista de Modelo',
      vinculo: '/menumodelos/lista',
    },
    {
      imagen: 'https://static.vecteezy.com/system/resources/previews/008/323/514/non_2x/3d-realistic-data-folder-icon-illustration-vector.jpg',
      titulo: 'Registro de Producto',
      vinculo: '/menuInventario/RegistroProducto', 
    },
    {
      imagen: 'https://static.vecteezy.com/system/resources/previews/006/945/991/non_2x/my-order-list-illustration-exclusive-design-inspiration-vector.jpg',
      titulo: 'Lista de Productos',
      vinculo: '/menuInventario/ListaProductos',
    },
  ];

  return (
    <div className="CardInventario">
      <div className="contPrimary">
        {datos.length ? (
          datos.map((datas, index) => (
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
