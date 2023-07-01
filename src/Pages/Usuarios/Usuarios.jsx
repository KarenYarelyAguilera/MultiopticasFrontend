import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState,useEffect } from 'react';

//Styles
import '../../Styles/Usuarios.css';

//FontAwesome
import { faImage } from '@fortawesome/free-solid-svg-icons';

//Images
import AddUser from '../../IMG/AddUser.jpg';
import InforUsers from '../../IMG/InforUsers.jpg';
import ListUsers from '../../IMG/ListUsers.jpg';

export const Usuarios = (props) => {

  // const urlP = "http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=Pobjetos"
  // const [Permisos, setPermisos] = useState([])

  // const data = {
  //   idObj:props.obj,
  //   rol:props.rol
  // }

  // useEffect(()=>{
  //   fetch(urlP, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setPermisos(data))
  // },[])
  
  let usuario = [
    {
      insert:"s",
      imagen: AddUser,
      titulo: 'Nuevo usuario',
      vinculo: '/usuarios/crearusuario',
    },
    {
      consulta:"s",
      imagen: ListUsers,
      titulo: 'Lista de usuarios',
      vinculo: '/usuarios/lista',
    },
    {
      insert:"s",
      imagen: InforUsers,
      titulo: 'Datos generales',
      vinculo: '/usuarios/crearempleado',
    },
    {
      consulta:"s",
      imagen: 'https://static.vecteezy.com/system/resources/previews/021/621/727/non_2x/career-opportunity-concept-executive-job-human-resources-find-employee-flat-modern-illustration-vector.jpg',
      titulo: 'Lista de empleados',
      vinculo: '/empleados/lista',
    },
    
    
  ];
  let Permisos = {
    Permiso_Consultar:"s",
    Permiso_Insercion:"s"
  }
  console.log(Permisos.Permiso_Insercion===usuario[3].insert);

  let mostrar=[]
  for (let i = 0; i < usuario.length; i++) {
      if (Permisos.Permiso_Consultar===usuario[i].consulta) {
        mostrar.push(usuario[i])
      }else if (Permisos.Permiso_Insercion===usuario[i].insert) {
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
