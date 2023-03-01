import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Styles
import '../Styles/Home.css';

//FontAwesome
import { faImage } from '@fortawesome/free-solid-svg-icons';

import RegistroInventario from '../IMG/RegistroInventario.jpg';
import InventarioDisponible from '../IMG/InventarioDisponible.jpg';
import DescuentosPromociones from '../IMG/DescuentosPromociones.jpg';
import Garantias from '../IMG/Garantias.jpg';
import Kardex from '../IMG/Kardex.jpg';

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
    {
      imagen: DescuentosPromociones,
      titulo: 'Descuentos y promociones',
      vinculo: '',
    },
    {
      imagen: Garantias,
      titulo: 'Garantias',
      vinculo: '',
    },
    {
      imagen: Kardex,
      titulo: 'Kardex',
      vinculo: '',
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
