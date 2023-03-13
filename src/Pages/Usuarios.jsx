import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState,useEffect } from 'react';

//Styles
import '../Styles/Usuarios.css';

//FontAwesome
import { faImage } from '@fortawesome/free-solid-svg-icons';

//Images
import AddUser from '../IMG/AddUser.jpg';
import InforUsers from '../IMG/InforUsers.jpg';
import ListUsers from '../IMG/ListUsers.jpg';

export const Usuarios = (props) => {
  const urlP="http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=subobjetos"

  const [pantallas,setPantallas]=useState([])

  const data = {
    rol:props.rol,
    idObj:props.obj
}

console.log(data)
  useEffect(()=>{
    fetch(urlP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setPantallas(data))
  },[])
  let cards = Object.values(pantallas).map(({ Id_subObjeto }) => parseInt(Id_subObjeto)) //permite acceder a la propiedad del objeto y aislarla a un array aparte
  let consulta = Object.values(pantallas).map(({ Permiso_Consultar }) => Permiso_Consultar)

  
  let usuario = [
    {
      id:1,
      consulta:"s",
      imagen: AddUser,
      titulo: 'Nuevo usuario',
      vinculo: '/usuarios/crearusuario',
    },
    {
      id:2,
      consulta:"s",
      imagen: InforUsers,
      titulo: 'Datos generales',
      vinculo: '/usuarios/crearempleado',
    },
    {
      id:3,
      consulta:"s",
      imagen: ListUsers,
      titulo: 'Lista de empleados',
      vinculo: '/empleados/lista',
    },
    {
      id:4,
      consulta:"s",
      imagen: ListUsers,
      titulo: 'Lista de usuarios',
      vinculo: '/usuarios/lista',
    },
    
  ];
 
  let mostrar = []
  for (let  i= 0; i < usuario.length; i++) {
    if (cards[i]===usuario[i].id &&consulta[i]===usuario[i].consulta) {
      mostrar.push(usuario[i])
    }
  }
  
  return (
    <div className="CardUsuarios">
      <div className="contPrimary">
        {mostrar.length ? (
          mostrar.map((mostrar, index) => (
            <div key={index}>
            
              <div className="contCard">
                {mostrar.imagen ? (
                  <img src={mostrar.imagen} className="imgCard" alt="" />
                ) : (
                  <div>
                    <FontAwesomeIcon className="ErroImg" icon={faImage} />
                    <h1>Error al mostrar la imagen</h1>
                  </div>
                )}
                <Link className="btnCard" to={mostrar.vinculo}>
                  <h1>{mostrar.titulo}</h1>
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
