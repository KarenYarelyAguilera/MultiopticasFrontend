import React from 'react';
import { Link } from 'react-router-dom';

//Styles
import '../Styles/Home.css';

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
      {datos.length ? (
        datos.map((datas, index) => (
          <div key={index}>
            <div className="contCard">
              <img
                src={datas.imagen}
                className="imgCard"
                alt="No se encontro la imagen"
              />

              <Link className="btnCard" to={datas.vinculo}>
                <h1>{datas.titulo}</h1>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="NoInformation">Informacion no encontrada</div>
      )}
    </div>
  );
};
