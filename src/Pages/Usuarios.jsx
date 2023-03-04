import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Styles
import '../Styles/Usuarios.css';

//FontAwesome
import { faImage } from '@fortawesome/free-solid-svg-icons';

//Images
import AddUser from '../IMG/AddUser.jpg';
import InforUsers from '../IMG/InforUsers.jpg';
import ListUsers from '../IMG/ListUsers.jpg';

export const Usuarios = (props) => {
  let usuario = [
    {
      imagen: AddUser,
      titulo: 'Nuevo usuario',
      vinculo: '/usuarios/crearusuario',
    },
    {
      imagen: InforUsers,
      titulo: 'Datos generales',
      vinculo: '/usuarios/crearempleado',
    },
    {
      imagen: ListUsers,
      titulo: 'Lista de empleados',
      vinculo: '/empleados/lista',
    },
    {
      imagen: ListUsers,
      titulo: 'Lista de usuarios',
      vinculo: '/usuarios/lista',
    },

  ];

  if (props.rol!=="Admin") {
     usuario = [
      {
        imagen: AddUser,
        titulo: 'Nuevo usuario',
        vinculo: '/usuarios/crearusuario',
      },
      {
        imagen: InforUsers,
        titulo: 'Datos generales',
        vinculo: '/usuarios/crearempleado',
      },
      {
        imagen: ListUsers,
        titulo: 'Lista de empleados',
        vinculo: '/empleados/lista',
      }
  
    ];
  }

  return (
    <div className="CardUsuarios">
      <div className="contPrimary">
        {usuario.length ? (
          usuario.map((usuarios, index) => (
            <div key={index}>
            
              <div className="contCard">
                {usuarios.imagen ? (
                  <img src={usuarios.imagen} className="imgCard" alt="" />
                ) : (
                  <div>
                    <FontAwesomeIcon className="ErroImg" icon={faImage} />
                    <h1>Error al mostrar la imagen</h1>
                  </div>
                )}
                <Link className="btnCard" to={usuarios.vinculo}>
                  <h1>{usuarios.titulo}</h1>
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
