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

const urlSucursales =
  'http://localhost:3000/api/empleado/sucursal';
/* const urlUsers =
  'http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=users'; */
const urlIEmpleado =
  'http://localhost:3000/api/empleado';

export const DatosEmpleado = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };
  const [sucursales, setSucursales] = useState([]);

  const [iIdentidad, setiIdentidad] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorIdentidad, setErrorIdentidad] = React.useState(false);

  const [Nombre, setNombre] = React.useState('');
  const [errorNombre, setErrorNombre] = React.useState(false);
  const [Msj, setMsj] = React.useState(false);

  const [Apellido, setApellido] = React.useState('');
  const [errorApellido, setErrorApellido] = React.useState(false);
  const [aviso, setAviso] = React.useState(false);

  const [errorTelefono, setErrorTelefono] = React.useState(false);
  const [texto, setTexto] = React.useState(false);

  const [Telefono, setTelefono] = useState('');

  const [Identidad, setIdentidad] = useState(0);
  const [Telefonoc, setTelefonoc] = useState(0);

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

  const handleNext = async () => {
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

    await axios.post(urlIEmpleado, data).then(response => {
      swal('Empleado agregado con exito', '', 'success').then(result => {
        navegate('/empleados/lista');
      });

    }).catch(error => {
      console.log(error);
      swal('Error al registrar el cliente', '', 'success')
    })

  };

  const handleBack = () => {
    navegate('/usuarios');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Datos del empleado</h2>
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
                minLength={13}
                className="inputCustom"
                onKeyDown={e => {
                  setiIdentidad(e.target.value);
                  setIdentidad(parseInt(e.target.value));
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
                  if (Nombre == '') {
                    setErrorNombre(true);
                    setMsj('Los campos no deben estar vacios');
                  } else {
                    setErrorNombre(false);
                    var preg_match =/^[a-zA-Z\s]*$/;
                    if (!preg_match.test(Nombre)) {
                      setErrorNombre(true);
                      setMsj('Solo debe de ingresar letras');
                    } else {
                      setErrorNombre(false);
                      setMsj('');
                    }
                  }
                }}
                error={errorNombre}
                type="text"
                helperText={Msj}
                name=""
                className="inputCustom"
                maxLength={50}
                placeholder="Nombre"
                variant="standard"
                id="nombre"
                label="Usuario"
              />
              <p className="error">{Msj}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Apellido" className="titleInput" />
              <input
                onKeyDown={e => {
                  setApellido(e.target.value);
                  if (Apellido == '') {
                    setErrorApellido(true);
                    setAviso('Los campos no deben estar vacios');
                  } else {
                    setErrorApellido(false);
                    var preg_match =/^[a-zA-Z\s]*$/;
                    if (!preg_match.test(Apellido)) {
                      setErrorApellido(true);
                      setAviso('Solo deben de ingresar letras');
                    } else {
                      setErrorApellido(false);
                      setAviso('');
                    }
                  }
                }}
                error={errorApellido}
                type="text"
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
                onKeyDown={e => {
                  setTelefono(e.target.value);
                  if (Telefono == '') {
                    setTexto('Los campos no deben estar vacios');
                    setErrorTelefono(true);
                  } else {
                    setErrorTelefono(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(Telefono)) {
                      setErrorTelefono(true);
                      setTexto('Solo deben de ingresar numeros');
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
              />
              {<p className="error">{texto}</p>}
            </div>

            <div className="contInput">
              <TextCustom text="Sucursal" className="titleInput" />
              <select name="" className="selectCustom" id="sucursal">
                {sucursales.length ? (
                  sucursales.map(pre => (
                    <option key={pre.IdSucursal} value={pre.IdSucursal}>
                      {pre.departamento}
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
                  if (
                    document.getElementById('Nidentidad').value == '' ||
                    document.getElementById('nombre').value == '' ||
                    document.getElementById('apellido').value == ''
                  ) {
                    swal('No deje campos vacios.', '', 'error');
                  } else if (typeof (parseInt(document.getElementById('Nidentidad').value) !== 'number'
                  )
                  ) {
                    swal('El campo identidad solo acepta numeros', '', 'error');
                  } else if (
                    typeof document.getElementById('nombre').value !== 'string'
                  ) {
                    swal('El campo nombre solo acepta letras', '', 'error');
                  }
                  if (
                    typeof document.getElementById('apellido').value !==
                    'string'
                  ) {
                    swal('El campo apellido solo acepta letras', '', 'error');
                  }
                  if (isNaN(Telefonoc) || isNaN(Identidad)) {
                    swal('Corrija los campos Erroneos', '', 'error');
                  } else {
                    handleNext();
                  }
                }}
              >
                <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>
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
