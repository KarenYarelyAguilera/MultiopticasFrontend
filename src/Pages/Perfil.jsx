import React, { useRef } from 'react';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sendData } from '../scripts/sendData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Styles
import '../Styles/Usuarios.css';

//Components
//import VerticalStepper from '../../Components/VerticalStepper.jsx';
import swal from '@sweetalert/with-react';
import { ContentPasteGoOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { TextCustom } from '../Components/TextCustom.jsx';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';

const urlSucursal =
  'http://localhost/APIS-Multioptica/Gestion/controller/gestion.php?op=InsertSucursal';

export const Perfil = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {
  const [sucursales, setSucursales] = useState([]);

  const navegate = useNavigate();

  const [contra2, setContra2] = useState("");
  const [errorContra2, setErrorContra2] = useState(false);
  const [advertencia, setadvertencia] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const refContrasenia = useRef(null);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handlePerfilStepper = () => {
  navegate("/perfilStepper");
  };

  const handleNext = () => {
    let departamento = document.getElementById('departamento').value;
    let ciudad = document.getElementById('ciudad').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;

    let data = {
      departamento: departamento,
      ciudad: ciudad,
      direccion: direccion,
      telefono: telefono,
    };

    console.log(data);
    if (sendData(urlSucursal, data)) {
      swal('Sucursal agregada con exito', '', 'success').then(result => {
        navegate('/config/RegistroSucursal');
      });
    }
    // if (sendData(urlSucursal, data)) {
    //   swal('Sucursal agregada con exito',"", 'success')
    //     navegate('/config/RegistroSucursal');
    //   };
  };

  const handleBack = () => {
    navegate('/config');
  };

  return (
    <div className="ContProfile">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Perfil</h2>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal2">
            <div className="contInput">
              <TextCustom text="Nombre de usuario:" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Nombre usuario"
                id="nameUser"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Nombre" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Nombre"
                id="nombre"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Apellido" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Apellido"
                id="apellido"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Correo Electronico" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Correo"
                id="correo"
              />
            </div>
          </div>
        </div>
        
        <section className='section2'>

        <div className="contPreguntasProfile">
          <div className="titlesPreguntasProfile">
            <TextCustom text="Preguntas" className="titleInput" />
            <TextCustom text="Respuestas" className="titleInput" />
          </div>
          <div className="contPadrePreRes">
            <div className="contPreguntasInputs">
              <select name="" className="selectCustom">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
              </select>

              <select name="" className="selectCustom">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
              </select>

              <select name="" className="selectCustom">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
              </select>
            </div>

            <div className="contRespuestasInputs">
            <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Respuesta"
                id="Respuesta1"
              />
              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Respuesta"
                id="Respuesta2"
              />
              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Respuesta"
                id="Respuesta3"
              />
            </div>
          </div>

          <div className="contUpdatePassword">
          <TextCustom text="Contraseña:" className="titleInput" />
          <FilledInput
                onChange={(e) => {
                  setContra2(e.target.value);
                  if (contra2 === "") {
                    setErrorContra2(true);
                    setadvertencia("Los campos no deben estar vacíos");
                  }
                  }
                }
                id="filled-adornment-password"
                placeholder='******************'
                className="inputCustomUpdatePassword"
                type={showPassword ? 'text' : 'password'}
                inputProps={{ maxLength: 20, minLenght:8 }}
                inputRef={refContrasenia}
                endAdornment={

                  <InputAdornment position="end">
                    <IconButton
                      maxLength={30}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              ></FilledInput>

              <button 
               className="btnUpdatePassword"
               type='submit' 
               onClick={handlePerfilStepper}
              >Cambiar contraseña</button>
          </div>
        </div>
        </section>
      </div>
    </div>
  );
};
