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
import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';


const urlCliente =
  'http://localhost/APIS-Multioptica/Cliente/controller/cliente.php?op=InsertCliente';

export const NuevaCompra = ({
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


  const navegate = useNavigate();

  const handleNext = () => {
    let identidad = document.getElementById('Nidentidad').value;
    let nombres = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellido').value;
    let telefono = document.getElementById('phone').value;
    let genero = parseInt(document.getElementById('genero').value);
    let direccion = parseInt(document.getElementById('direccion').value);
    let correo = document.getElementById('correo').value
    let fechaN = document.getElementById('Fnacimiento').value

    let data = {
      idCliente:identidad,
      nombre:nombres,
      apellido:apellidos,
      idGenero:genero,
      fechaNacimiento:fechaN,
      direccion:direccion,
      telefonoCliente:telefono,
      correoElectronico:correo
    };
    if (sendData(urlCliente, data)) {
      swal('Cliente agregado con exito', '', 'success').then(result => {
        navegate('/menuClientes/listaClientes');
      });
    }
  };

  const handleBack = () => {
    navegate('/ventas');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Nueva Compra</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos de Nueva Compra.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
           
          <div className="contInput">
              <TextCustom text="No. de Compra" className="titleInput" />

              <input
                error={errorIdentidad}
                type="text"
                name=""
                maxLength={13}
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
                placeholder="No. de Compra"
                id="Nidentidad"
              />
              <p class="error">{leyenda}</p>
            </div>

           <div className="contInput">
              <TextCustom text="Proveedor" className="titleInput" />
              <select name="" className="selectCustom" id="genero">
                <option value={1}>No se sabe</option>
                <option value={2}>No se sabe</option>
              </select>
            </div>
            <div className="contInput">
              <TextCustom text="Producto" className="titleInput" />
              <select name="" className="selectCustom" id="genero">
                <option value={1}>No se sabe</option>
                <option value={2}>No se sabe</option>
              </select>
            </div>

          <div className="contInput">
              <TextCustom text="Cantidad" className="titleInput" />

              <input
                error={errorIdentidad}
                type="text"
                name=""
                maxLength={13}
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
                placeholder="Cantidad"
                id="Nidentidad"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Fecha" className="titleInput" />
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
                placeholder="Fecha"
                id="fechaN"
              />
              {<p className="error">{texto}</p>}
            </div>

            <div className="contInput">
              <TextCustom text="Costo de la Compra" className="titleInput" />

              <input
                error={errorIdentidad}
                type="text"
                name=""
                maxLength={13}
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
                placeholder="Costo de la Compra"
                id="Nidentidad"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Total" className="titleInput" />

              <input
                error={errorIdentidad}
                type="text"
                name=""
                maxLength={13}
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
                placeholder="Total"
                id="Nidentidad"
              />
              <p class="error">{leyenda}</p>
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
                  } else if (
                    typeof (
                      parseInt(document.getElementById('Nidentidad').value) !==
                      'number'
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
        
        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/015/655/076/non_2x/health-insurance-icon-isometric-style-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};