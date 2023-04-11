// import React from 'react';
// import { Link, useNavigate } from "react-router-dom";
// //import { NavigateNextIcon } from '@mui/icons-material';

// //Images
// import venta from "../../IMG/mano.png";
// import AddUser from '../../IMG/AddUser.jpg';

// //MuiMaterialIcons
// import { Container, Grid, TextField } from "@mui/material";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Button from '@mui/material/Button';

// //Components
// import { TextCustom } from '../../Components/TextCustom.jsx';

// //Styles
// import "../../Styles/Home.css";

// export const NuevaVenta = () => {
//   const navegate = useNavigate();

//   const Empleado = [
//     {
//       IdEmpleado:'1',
//       Nombre:'Michael Sosa',
//     }
//   ]

//   const Rol = [
//     {
//       IdRol:'1',
//       Rol:'Administrador',
//     },
//     {
//       IdRol:'2',
//       Rol:'Viewer',
//     }
//   ]

//   const handleBack = () => {
//     navegate('/ventas');
//   }

//   const handleDetalleVenta = () => {
//     navegate('/ventas/reportes');
//   };
//   return (
//     <div className="ContUsuarios">
//       <Button 
//       className='btnBack'
//       onClick={handleBack}>
//     	  <ArrowBackIcon className='iconBack'/>
//       </Button>
//       <div className="titleAddUser">
//         <h2>Nueva Venta</h2>
//         <h3>Complete todos los puntos para poder registrar una venta</h3>
//       </div>

//       <div className="infoAddUser">
//         <div className="PanelInfo">
//           <div className="InputContPrincipal1">
//             <div className="contInput">
//               <TextCustom text="Codigo de Venta" className="titleInput" />
//               <input
//                 type="text"
//                 id="codigo"
//                 name=""
//                 className="inputCustom"
//                 placeholder="Codigo"
//               />
//             </div>

//             <div className="contInput">
//               <TextCustom text="Cliente" className="titleInput" />
//               <input
//                 type="text"
//                 id="cliente"
//                 name=""
//                 className="inputCustom"
//                 placeholder="Cliente"
//               />
//             </div>

//             <div className="contInput">
//               <TextCustom text="Empleado" className="titleInput" />
//               <input
//                 type="text"
//                 id="empleado"
//                 name=""
//                 className="inputCustom"
//                 placeholder="Empleado"
//               />
//             </div>

//             <div className="contInput">
//               <TextCustom text="Fecha de Venta" className="titleInput" />
//               <input
//                 type="text"
//                 name=""
//                 id="fechaVenta"
//                 className="inputCustom"
//                 placeholder="Fecha"
//               />
//             </div>

//             <div className="contInput">
//               <TextCustom text="RTN" className="titleInput" />
//               <input
//                 type="text"
//                 name=""
//                 id="RTN"
//                 className="inputCustom"
//                 placeholder="RTN"
//               />
//             </div>

//             <div className="contInput">
//               <TextCustom text="CAI" className="titleInput" />
//               <input
//                 type="text"
//                 name=""
//                 id="CAI"
//                 className="inputCustom"
//                 placeholder="CAI"
//               />
//             </div>

//             <div className="contBtnSventa">
//               <Button
//                 variant="contained"
//                 className="btnSVenta"

//                 onClick={handleDetalleVenta}
//               >
//                 <h1>{'Finish' ? 'Siguiente' : 'Finish'}</h1>
//               </Button>
//             </div>
//           </div>
//         </div>


//         {/* <img className="imgCont" src={Venta} alt="" /> */}
//       </div>
//     </div>
//   );
// };

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

export const NuevaVenta = ({
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
        <h2>Nueva Venta</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos de Nueva Venta.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
           
          <div className="contInput">
              <TextCustom text="Cliente" className="titleInput" />

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
                placeholder="Cliente"
                id="Nidentidad"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="No. Venta" className="titleInput" />

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
                placeholder="No. Venta"
                id="Nidentidad"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Numero de CAI" className="titleInput" />

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
                placeholder="Numero de CAI"
                id="Nidentidad"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="RTN" className="titleInput" />

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
                placeholder="RTN"
                id="Nidentidad"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Empleado" className="titleInput" />

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
                placeholder="Empleado"
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
              <TextCustom text="Fecha de Entrega" className="titleInput" />
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
                placeholder="Fecha de Entrega"
                id="fechaN"
              />
              {<p className="error">{texto}</p>}
            </div>

            <div className="contInput">
              <TextCustom text="Fecha Limite de Entrega" className="titleInput" />
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
                placeholder="Fecha Limite de Entrega"
                id="fechaN"
              />
              {<p className="error">{texto}</p>}
            </div>

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select name="" className="selectCustom" id="genero">
                <option value={1}>No se sabe</option>
                <option value={2}>No se sabe</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Observacion" className="titleInput" />
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
                className="inputCustomText"
                placeholder="Observacion"
                id="apellido"
              />
              <p className="error">{aviso}</p>
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
                <h1>{'Finish' ? 'Siguiente' : 'Finish'}</h1>
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