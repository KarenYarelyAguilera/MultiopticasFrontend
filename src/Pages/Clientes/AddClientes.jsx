import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Styles
import '../../Styles/Usuarios.css';

//Components
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';


const urlCliente =
  'http://localhost/APIS-Multioptica/Cliente/controller/cliente.php?op=InsertCliente';

export const AddClientes = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };

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


  const navegate = useNavigate();

  const handleNext = () => {
    let identidad = document.getElementById('Nidentidad').value;
    let nombres = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellido').value;
    let telefono = document.getElementById('phone').value;
    let genero = parseInt(document.getElementById('genero').value);
    let direccion = document.getElementById('direccion').value;
    let correo = document.getElementById('correo').value
    let fechaN = document.getElementById('fechaN').value

    let fecha = new Date(fechaN)

    let anio = fecha.getFullYear().toString();
    let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    let dia = fecha.getDate().toString().padStart(2, "0");


    let fechaFormateada = anio + "/" + mes + "/" + dia;


    let data = {
      idCliente:identidad,
      nombre:nombres,
      apellido:apellidos,
      IdGenero:genero,
      fechaNacimiento:fechaFormateada,
      direccion:direccion,
      telefonoCliente:telefono,
      correoElectronico:correo
    };

    if (sendData(urlCliente, data)) {
      swal('Cliente agregado con exito', '', 'success').then(result => {
        navegate('/menuClientes/lista');
      });
    }

  };

  const handleBack = () => {
    navegate('/menuClientes');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Datos del Cliente</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos del cliente
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
                className="inputCustom"
                onKeyDown={e => {
                  setiIdentidad(e.target.value);
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
                    var preg_match = /^[a-zA-Z]+$/;
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
                    var preg_match = /^[a-zA-Z]+$/;
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
              <TextCustom text="Direccion" className="titleInput" />
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
                placeholder="Direccion"
                id="direccion"
              />
              {<p className="error">{texto}</p>}
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
              <TextCustom text="Correo Electronico" className="titleInput" />
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
                placeholder="Correo Electronico"
                id="correo"
              />
              {<p className="error">{texto}</p>}
            </div>

            <div className="contInput">
              <TextCustom text="Fecha de Nacimiento" className="titleInput" />
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
                type="date"
                name=""
                helperText={texto}
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha de Nacimiento"
                id="fechaN"
              />
              {<p className="error">{texto}</p>}
            </div>

            <div className="contInput">
              <TextCustom text="Genero" className="titleInput" />
              <select name="" className="selectCustom" id="genero">
                <option value={1}>Masculino</option>
                <option value={2}>Femenino</option>
              </select>
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                onClick={handleNext}
                className="btnStepper">
                <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>

        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/011/873/935/non_2x/online-voting-concept-flat-style-design-illustration-tiny-people-with-voting-poll-online-survey-working-together-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};
