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



export const Perfil = (props) => {
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

  const handlePreguntas = () => {
    navegate("/preguntasPerfil");
  };



  const handleBack = () => {
    navegate('/dashboard');
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
                  value={props.infoPerfil.Nombre_Usuario}
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
                  value={props.infoPerfil.nombre}
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
                  value={props.infoPerfil.apellido}
                />
              </div>

              <div className="contInput">
                <TextCustom text="Identidad" className="titleInput" />
                <input
                  type="text"
                  name=""
                  maxLength={13}
                  className="inputCustom"
                  placeholder="Identidad"
                  id="identidad"
                  value={props.infoPerfil.numeroIdentidad}
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
                  value={props.infoPerfil.Correo_Electronico}
                />
              </div>

              <div className="contInput">
                <TextCustom text="Cargo" className="titleInput" />
                <input
                  type="text"
                  name=""
                  maxLength={13}
                  className="inputCustom"
                  placeholder="Rol"
                  id="rol"
                  value={props.infoPerfil.Rol}
                />
              </div>

              <div className="contUpdatePassword">
                <TextCustom text="Preguntas:" className="titleInput" />
                <FilledInput
                 
                  id="filled-adornment-password"
                  placeholder='******************'
                  className="inputCustomUpdatePassword"

                  // value={'******************'}
                  disabled
                  type={showPassword ? 'text' : 'password'}
                  inputProps={{ maxLength: 20, minLenght: 8 }}
                  inputRef={refContrasenia}

                ></FilledInput>

                <button
                  className="btnUpdatePassword"
                  type='submit'
                  onClick={handlePreguntas}
                >Modificar Preguntas</button>

              </div>

              <div className="contUpdatePassword">

                <TextCustom text="Contraseña:" className="titleInput" />
                <FilledInput
                  

                  id="filled-adornment-password"
                  // placeholder='******************'
                  value={props.infoPerfil.Contrasenia}

                  className="inputCustomUpdatePassword"
                  type={showPassword ? 'text' : 'password'}
                  inputProps={{ maxLength: 20, minLenght: 8 }}
                  inputRef={refContrasenia}
                  disabled

                ></FilledInput>

                <button
                  className="btnUpdatePassword"
                  type='submit'
                  onClick={handlePerfilStepper}
                >Cambiar contraseña</button>

              </div>
              
            </div>
          </div>

         {/*  <section className='section2'>
            <div className="titlesPreguntasProfile">
            </div>
          </section> */}


        </div>


        
      </div>




  );
};
