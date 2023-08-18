import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
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

const urlSucursales = 'http://localhost:3000/api/empleado/sucursal';

/* const urlUsers =
  'http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=users'; */
const urlIEmpleado = 'http://localhost:3000/api/empleado'; //Api para crear el empleado
const urlUpdEmpleado = 'http://localhost:3000/api/empleado/actualizar'


//----------------------------------URL de bitacora --------------------------------------------
const urlUpdBitacora = 'http://localhost:3000/api/bitacora/ActualizarEmpleado';
const urlInsertBitacora = 'http://localhost:3000/api/bitacora/RegistroEmpleado';
const urlErrorInsertBitacora = 'http://localhost:3000/api/bitacora/ErrorActualizarEmpleado';
const urlBitacoraSalirRE = 'http://localhost:3000/api/bitacora/SalirRegistroEmpleado';
//---------------------------------------------------------------- ------------------------------

export const DatosEmpleado = (props) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };
  const [sucursales, setSucursales] = useState([]);
  //estas líneas de código establecen y gestionan variables de estado en un componente de React, lo que permite almacenar y modificar valores en la aplicación, y controlar el comportamiento en función de estos estados.
  const [iIdentidad, setiIdentidad] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorIdentidad, setErrorIdentidad] = React.useState(false);

  const [Nombre, setNombre] = React.useState(props.data.nombre || '');
  const [errorNombre, setErrorNombre] = React.useState(false);
  const [Msj, setMsj] = React.useState(false);

  const [Apellido, setApellido] = React.useState(props.data.apellido || '');
  const [errorApellido, setErrorApellido] = React.useState(false);
  const [aviso, setAviso] = React.useState(false);

  const [errorTelefono, setErrorTelefono] = React.useState(false);
  const [texto, setTexto] = React.useState(false);

  const [Telefono, setTelefono] = useState(props.data.telefonoEmpleado || '');

  const [Identidad, setIdentidad] = useState(props.data.numeroIdentidad || '');
  const [Telefonoc, setTelefonoc] = useState(0);

  const urlEmpleadoExist = 'http://localhost:3000/api/empleado/RegistroInvalido';




  /*   useEffect(() => {
      fetch(urlSucursales).then(response => response.json())
        .then(data => setSucursales(data));
    }, []); */

  useEffect(() => {
    axios.get(urlSucursales).then(response => {
      setSucursales(response.data)
    }).catch(error => console.log(error))
  }, []);

  const navegate = useNavigate();

  const actualizarEmpleado = async () => {
    let identidad = document.getElementById('Nidentidad').value;
    let nombres = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellido').value;
    let telefono = document.getElementById('phone').value;
    let genero = parseInt(document.getElementById('genero').value);
    let sucursal = parseInt(document.getElementById('sucursal').value);

    const data = {
      nombre: nombres.toUpperCase(),
      apellido: apellidos.toUpperCase(),
      telEmple: telefono,
      idSucursal: sucursal,
      idGenero: genero,
      numId: identidad,
      IdEmpleado: props.data.IdEmpleado,
    }


    //Funcion de bitacora 
    let dataB = {
      Id: props.idUsuario
    }

    axios.put(urlUpdEmpleado, data).then(() => {
      swal("Empleado Actualizado Correctamente", "", "success").then(() => {
        axios.post(urlUpdBitacora, dataB) //UPDATE BITACORA 
        navegate('/empleados/lista')
      })
    }).catch(error => {
      console.log(error);
      swal('Error al Actualizar Empleado! , Sus campos pueden ser erroneos o ya existen en otro empleado.', '', 'error')
      axios.post(urlErrorInsertBitacora, dataB)
    })

  }

  const insertEmpleado = async () => {
    let identidad = document.getElementById('Nidentidad').value;
    let nombres = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellido').value;
    let telefono = document.getElementById('phone').value;
    let genero = parseInt(document.getElementById('genero').value);
    let sucursal = parseInt(document.getElementById('sucursal').value);

    //tienen que estar igual a las apis del node
    let data = {
      nombre: nombres.toUpperCase(),
      apellido: apellidos.toUpperCase(),
      telEmple: telefono,
      idGenero: genero,
      idSucursal: sucursal,
      numId: identidad,
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
    const dataValida = {
      numId: identidad
    }

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

  };

  //Funcion de bitacora 
  let dataB = {
    Id: props.idUsuario
  };
  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de empleado ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        props.Data({})
        props.update(false)
        axios.post(urlBitacoraSalirRE, dataB)//BOTON DE RETROCESO API BITACORA 
        navegate('/empleados/lista');
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
        {props.actualizar ? <h2>Actualizar Empleado</h2> : <h2>Registro de Empleado</h2>}

        <h3>
          Complete todos los puntos para poder registrar los datos del empleado
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Numero de Identidad" className="titleInput" />

              <input
                error={errorIdentidad}
                type="text"
                name=""
                maxLength={13}
                onChange={e => setIdentidad(e.target.value)}
                value={Identidad}
                className="inputCustom"
                onKeyDown={e => {
                  setiIdentidad(e.target.value);
                  setIdentidad(e.target.value);
                  if (iIdentidad === '') {
                    setErrorIdentidad(true);
                    setleyenda('Los campos no deben estar vacios');
                  } else {
                    setErrorIdentidad(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(iIdentidad)) {
                      setErrorIdentidad(true);
                      setleyenda('Solo deben de ingresar numeros');
                    } else {
                      setErrorIdentidad(false);
                      setleyenda('');
                    }

                  }
                }}
                placeholder="Identidad"
                id="Nidentidad"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Nombre" />
              <input

                onKeyDown={e => {
                  setNombre(e.target.value);
                  if (Nombre === '') {
                    setErrorNombre(true);
                    setMsj('Los campos no deben estar vacíos');
                  } else {
                    setErrorNombre(false);
                    var regex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
                    if (!regex.test(Nombre)) {
                      setErrorNombre(true);
                      setMsj('Solo debe ingresar letras y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(Nombre)) {
                      setErrorNombre(true);
                      setMsj('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrorNombre(false);
                      setMsj('');
                    }
                  }
                }}
                onChange={e => setNombre(e.target.value)}

                error={errorNombre}
                type="text"
                helperText={Msj}
                name=""
                className="inputCustom"
                maxLength={50}
                placeholder="Nombre"
                variant="standard"
                id="nombre"
                value={Nombre}
                label="Usuario"
              />
              <p className="error">{Msj}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Apellido" className="titleInput" />
              <input
                onChange={e => setApellido(e.target.value)}
                onKeyDown={e => {
                  setApellido(e.target.value);
                  if (Apellido === '') {
                    setErrorApellido(true);
                    setAviso('Los campos no deben estar vacíos');
                  } else {
                    setErrorApellido(false);
                    var regex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
                    if (!regex.test(Apellido)) {
                      setErrorApellido(true);
                      setAviso('Solo deben ingresar letras y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(Apellido)) {
                      setErrorApellido(true);
                      setAviso('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrorApellido(false);
                      setAviso('');
                    }
                  }
                }}
                error={errorApellido}
                type="text"
                value={Apellido}
                name=""
                helperText={aviso}
                maxLength={50}
                className="inputCustom"
                placeholder="Apellido"
                id="apellido"
              />
              <p className="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Genero" className="titleInput" />
              <select name="" className="selectCustom" id="genero">
                <option value={1}>Masculino</option>
                <option value={2}>Femenino</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Telefono" className="titleInput" />
              <input
                 onChange={e => setTelefono(e.target.value)}

                 onKeyDown={e => {
                   setTelefono(e.target.value);
                   if (Telefono === '') {
                     setTexto('Los campos no deben estar vacíos');
                     setErrorTelefono(true);
                   }else if (Telefono.length !== 8) {
                     setErrorTelefono(true);
                     setTexto('El número de telefono debe tener exactamente 8 dígitos');
                   } else {
                     setErrorTelefono(false);
                     var regex = /^[0-9]{8}$/; // Se espera un número de teléfono de 8 dígitos
                     if (!regex.test(Telefono)) {
                       setErrorTelefono(true);
                       setTexto('Debe ingresar un número de teléfono válido de 8 dígitos');
                     }else if (/(.)\1{2,}/.test(Telefono)) {
                       setErrorTelefono(true);
                       setTexto('No se permiten numeros consecutivas repetidos');
                     } else {
                       setErrorTelefono(false);
                       setTexto('');
                     }
                   }
                 }}
                 
                error={errorTelefono}
                type="phone"
                name=""
                helperText={texto}
                maxLength={8}
                className="inputCustom"
                placeholder="Telefono"
                id="phone"
                value={Telefono}
              />
              {<p className="error">{texto}</p>}
            </div>

            <div className="contInput">
              <TextCustom text="Sucursal" className="titleInput" />
              <select name="" className="selectCustom" id="sucursal">
                {sucursales.length ? (
                  sucursales.map(pre => (
                    <option key={pre.IdSucursal} value={pre.IdSucursal}>
                      {pre.direccion}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>
                )}
              </select>
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  var Nidentidad = document.getElementById("Nidentidad").value;
                  var nombre = document.getElementById("nombre").value;
                  var apellido = document.getElementById("apellido").value;
                  var telefono = document.getElementById("phone").value;

                  if (nombre === "" || apellido === "" || Nidentidad === "" || telefono === "") {
                    swal("No deje campos vacíos.", "", "error");
                  } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(nombre)) {
                    swal("El campo nombre solo acepta letras y solo un espacio entre palabras.", "", "error");
                  } else if (/(.)\1{2,}/.test(nombre)) {
                    setErrorNombre(true);
                    swal("El campo nombre no acepta letras consecutivas repetidas.", "", "error");
                  } else if (!/^[a-zA-Z\s]+$/.test(apellido)) {
                    swal("El campo apellido solo acepta letras y solo un espacio entre palabras.", "", "error");
                  } else if (/(.)\1{2,}/.test(apellido)) {
                    setErrorApellido(true);
                    swal("El campo apellido no acepta letras consecutivas repetidas.", "", "error");
                  } else if (isNaN(parseInt(Nidentidad))) {
                    swal("El campo identidad solo acepta números.", "", "error");
                  } else {
                    setErrorIdentidad(false);
                    var primeroscuatrodigitos = parseInt(Nidentidad.substring(0, 4));
                    if (primeroscuatrodigitos < 101 || primeroscuatrodigitos > 1811) {
                      setErrorIdentidad(true);
                      setleyenda('El número de identidad es inválido');
                      swal("El número de identidad es inválido", "", "error");
                    } else {
                      setErrorIdentidad(false);
                      var regex = /^\d{13}$/;
                      if (!regex.test(Nidentidad)) {
                        setErrorIdentidad(true);
                        setleyenda('El número de identidad debe tener el formato correcto');
                        swal("El número de identidad debe tener el formato correcto", "", "error");
                      } else if (isNaN(parseInt(telefono))) {
                        swal("El campo teléfono solo acepta números.", "", "error");

                      }
                      else if (! /^[0-9]+$/.test(telefono)) {
                        swal("El campo teléfono solo acepta números.", "", "error");
                      }

                      else {
                        props.actualizar ? actualizarEmpleado() : insertEmpleado();
                      }
                    }
                  }
                }
                }
              >
                {props.actualizar ? <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}

              </Button>
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