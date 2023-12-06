import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData.js';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import InforUsers from '../../IMG/InforUsers.jpg';

//Styles
import '../../Styles/Usuarios.css';

//Components
import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';
import axios from 'axios';
import { Bitacora } from '../../Components/bitacora.jsx';

const urlInsertRol = 'http://194.163.45.55:4000/api/Rol/NuevoRol';
const urlUpdRol = 'http://194.163.45.55:4000/api/Rol/RolActualizado'

//----------------------------------URL de bitacora --------------------------------------------
const urlUpdBitacora = 'http://194.163.45.55:4000/api/bitacora/ActualizarEmpleado';
const urlInsertBitacora = 'http://194.163.45.55:4000/api/bitacora/RegistroEmpleado';
const urlErrorInsertBitacora = 'http://194.163.45.55:4000/api/bitacora/ErrorActualizarEmpleado';
const urlBitacoraSalirRE = 'http://194.163.45.55:4000/api/bitacora/SalirRegistroEmpleado';
//---------------------------------------------------------------- ------------------------------

export const RegistroRoles = (props) => {

  //estas líneas de código establecen y gestionan variables de estado en un componente de React, lo que permite almacenar y modificar valores en la aplicación, y controlar el comportamiento en función de estos estados.

  const [Rol, setRol] = React.useState(props.data.Rol || '');
  const [errorRol, setErrorRol] = React.useState(false);
  const [Msj, setMsj] = React.useState(false);

  const [Descripcion, setDescripcion] = React.useState(props.data.Descripcion || '');
  const [errorDescripcion, setErrorDescripcion] = React.useState(false);
  const [aviso, setAviso] = React.useState(false);


  //const urlEmpleadoExist = 'http://194.163.45.55:4000/api/empleado/RegistroInvalido'; 

  const navegate = useNavigate();

  const actualizarRol = async () => {
    let Rol = document.getElementById('Rol').value;
    let Descripcion = document.getElementById('Descripcion').value;



    const data = {
      Rol: Rol.toUpperCase(),
      Descripcion: Descripcion.toUpperCase(),
      estado: document.getElementById('estado').value,
      Id_Rol: props.data.Id_Rol,
    }


    //Funcion de bitacora 
    let dataB = {
      Id: props.idUsuario
    }

    axios.put(urlUpdRol, data).then(response => {
      if (response.data == false) {
        swal('¡Este Rol ya éxiste!', '', 'error')
      } else {
        swal("Rol Actualizado Correctamente", "", "success").then(() => {
          //axios.post(urlUpdBitacora, dataB) //UPDATE BITACORA 
          navegate('/config/ListaRoles')
        });
      }
    }).catch(error => {
      console.log(error);
      swal('Error al Actualizar Rol! , Sus campos pueden ser erroneos o ya existen en otro rol.', '', 'error')
      axios.post(urlErrorInsertBitacora, dataB)
    })

  }

  const insertRol = async () => {
    let Rol = document.getElementById('Rol').value;
    let Descripcion = document.getElementById('Descripcion').value;
    let estado = document.getElementById('estado').value;

    let data = {
      Rol: Rol.toUpperCase(),
      Descripcion: Descripcion.toUpperCase(),
      estado: estado,
    };
    /* if (sendData(urlIEmpleado, data)) {
      swal('Empleado agregado con exito', '', 'success').then(result => {
        swal({
          title: '¿Desea crearle un usuario al empleado agregado?',
          icon: 'question',
          buttons: true,
          dangerMode: true,
          buttons: ['Cancelar', 'Aceptar'],
        }).then(result => {
          if (result) navegate('/usuarios/crearusuario');
          else {
            navegate('/empleados/lista');
          }
        });

        navegate('/empleados/lista');
      });
    } */

    //Funcion de bitacora 
    let dataB = {
      Id: props.idUsuario
    }



    // Validacion para que no cree empleado con la misma Identidad
    /*   const dataValida = {
        numId: identidad
      } */

    /* await axios.post(urlEmpleadoExist,dataValida).then(response=>{
      if (response.dataValida) {
        swal("El numero de Identidad ya es existente en los registros.");
      }else{
     axios.post(urlIEmpleado, data).then(response => {
      swal('Empleado agregado con exito', '', 'success').then(result => {
        axios.post(urlInsertBitacora, dataB)
          navegate('/empleados/lista');
          });
        }).catch(error => {
          console.log(error);
          swal('Error al crear empleado, ingrese sus datos correctamente, puede que alguno de estos ya exista.', '', 'error')
          axios.post(urlErrorInsertBitacora, dataB)
        })
      }
    }) */
    const bitacora = {
      urlB: urlInsertBitacora,
      activo: props.activo,
      dataB: dataB
    }

    axios.post(urlInsertRol, data).then(response => {
      if (response.data == false) {
        swal('¡Este Rol ya éxiste!', '', 'error')
      } else {
        swal('¡Rol agregado con exito!', '', 'success').then(result => {
          Bitacora(bitacora)
          navegate('/config/ListaRoles');
        });
      }
    }).catch(error => {
      console.log(error);
      swal('Error al crear Rol.', '', 'error')
      axios.post(urlErrorInsertBitacora, dataB)
    })

  };

  //Funcion de bitacora 
  let dataB = {
    Id: props.idUsuario
  };
  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de Rol ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        props.Data({})
        props.update(false)
        axios.post(urlBitacoraSalirRE, dataB)//BOTON DE RETROCESO API BITACORA 
        navegate('/config/ListaRoles');
      } else {
      }
    });

  }

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        {props.actualizar ? <h2>Actualizar Rol</h2> : <h2>Registro de Rol</h2>}
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1" style={{ fontSize: '17px' }}>
            <div className="contInput">
              <TextCustom text="Rol" className="titleInput"  />
              <input

                onChange={e => setRol(e.target.value)}

                value={Rol}
                error={errorRol}
                type="text"
                helperText={Msj}
                name=""
                className="inputCustom"
                maxLength={50}
                placeholder="Rol"
                variant="standard"
                id="Rol"

              />
              <p className="error">{Msj}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Descripcion" className="titleInput" />
              <input

                onChange={e => setDescripcion(e.target.value)}
                error={errorDescripcion}
                type="text"
                value={Descripcion}
                name=""
                helperText={aviso}
                maxLength={50}
                className="inputCustom"
                placeholder="Descripcion"
                id="Descripcion"
              />
              <p className="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select id="estado" className="selectCustom" >
                <option value={"Activo"}>Activo</option>
                <option value={"Inactivo"}>Inactivo</option>
              </select>
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  var Rol = document.getElementById('Rol').value;
                  var Descripcion = document.getElementById('Descripcion').value;

                  if (Rol === "" || Descripcion === "") {
                    swal("No deje campos vacíos.", "", "error");
                  } else {
                    if (!/^[A-Z]+(?: [A-Z]+)*$/.test(Rol)) {
                      swal(
                        "El campo rol solo acepta letras mayúsculas y solo un espacio entre palabras.",
                        "",
                        "error"
                      );
                    } else if (Rol.length < 3) {
                      setErrorRol(true);
                      swal(
                        "El campo rol no acepta menos de 3 caracteres.",
                        "",
                        "error"
                      );
                    } else if (/(.)\1{2,}/.test(Rol)) {
                      setErrorRol(true);
                      swal(
                        "El campo rol no acepta letras mayúsculas consecutivas repetidas.",
                        "",
                        "error"
                      );
                    } else {
                      setErrorRol(false);
                      if (!/^[A-Z]+(?: [A-Z]+)*$/.test(Descripcion)) {
                        swal(
                          "El campo descripción solo acepta letras mayúsculas y un espacio entre palabras.",
                          "",
                          "error"
                        );
                      } else if (Descripcion.length < 3) {
                        setErrorDescripcion(true);
                        swal(
                          "El campo descripción no acepta menos de 3 caracteres.",
                          "",
                          "error"
                        );
                      } else if (/(.)\1{2,}/.test(Descripcion)) {
                        setErrorDescripcion(true);
                        swal(
                          "El campo descripción no acepta letras consecutivas repetidas.",
                          "",
                          "error"
                        );
                      } else {
                        props.actualizar ? actualizarRol() : insertRol();
                      }
                    }
                  }
                }}
              >
                {/* Corregí la condición dentro del texto del botón */}
                {props.actualizar ? <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
              </Button>;

              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>

        <img src={InforUsers} alt="No se encuentro la imagen" />
      </div>
    </div>
  );
};