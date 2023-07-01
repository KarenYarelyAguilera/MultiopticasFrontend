import React, { useRef, useState } from 'react';
import passwordRecovery from '../../IMG//registration.png';
import { TextCustom } from '../../Components/TextCustom';
import { useNavigate } from 'react-router';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Registration = props => {
  const navegate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfi, setShowPasswordConfi] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleClickShowPasswordConfi = () => setShowPasswordConfi(show => !show);
  const refContrasenia = useRef(null);
  const refContraseniaConfi = useRef(null);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const handleProgress = () => {
    navegate("/progress")
  }

  const handleLogin = () => {
    navegate("/")
  }

  const [Nombreusuario, setNombreusuario] = React.useState("");
  const [errorNombreusuario, setErrorNombreusuario] = React.useState(false);
  const [mensaje, setMensaje] = React.useState(false);

  const [Nombre, setNombre] = React.useState('');
  const [errorNombre, setErrorNombre] = React.useState(false);
  const [Msj, setMsj] = React.useState(false);

  const [Apellido, setApellido] = React.useState('');
  const [errorApellido, setErrorApellido] = React.useState(false);
  const [aviso, setAviso] = React.useState(false);

  const [iIdentidad, setiIdentidad] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorIdentidad, setErrorIdentidad] = React.useState(false);

  const [correoe, setcorreoe] = React.useState('');
  const [prueba, setprueba] = React.useState('');
  const [errorcorreo, setErrorcorreo] = React.useState(false);

  const[contrasenia, setcontrasenia] = React.useState('');
  const[advertencia, setadvertencia] = React.useState('');
  const[errorContrasenia, seterrorContrasenia] = React.useState('');
  


  return (
    <div className="divRegistration">
      <div className="divImgSection">
        <img src={passwordRecovery} alt="Iamgen no encontrada" />
      </div>

      <div className="divSectionRegis">
        <div className="titleRegistration">
          <h2>Registrate</h2>
          <h3>Gracias por confiar y formar parte de la familia de Multiopticas</h3>
        </div>

        <div className="divInfoQuestionRegis">
          <div className="sectInput">
            <TextCustom text="Usuario" className="titleInput" />
            <div className="contInput">
              <input 
              onKeyDown={(e) => {
                setNombreusuario(e.target.value);
                if (Nombreusuario == "") {
                  setErrorNombreusuario(true);
                  setMensaje("Los campos no deben estar vacios");
                }
                else {
                  setErrorNombreusuario(false)
                  var preg_match = /^[A-Z]+$/;
                  if (!preg_match.test(Nombreusuario)) {
                    setErrorNombreusuario(true)
                    setMensaje("Solo debe de ingresar letras mayusculas")
                  } else {
                    setErrorNombreusuario(false);
                    setMensaje("");
                  }
                }
              }}
              type="text"
              name="" 
              className="inputCustomRegis" 
              error={errorNombreusuario}
              helperText={mensaje}
              maxLength={15}
              placeholder="Nombre"
              variant="standard"
              id="nombre"
              label="Usuario"
              />
            </div>
            <p>

            </p>
            <p className='error'>{mensaje}</p>
          </div>

          <div className="sectInput">
            <TextCustom text="Nombre" className="titleInput" />
            <div className="contInput">
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
              type="text" 
              name="" 
              className="inputCustomRegis"
              error={errorNombre}
              helperText={Msj}
              maxLength={50}
              placeholder="Nombre"
              variant="standard"
              id="nombre"
              label="Usuario"
               />
                <p className="error">{Msj}</p>
            </div>

          </div>

          <div className="sectInput">
            <TextCustom text="Apellido" className="titleInput" />
            <div className="contInput">
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
               className="inputCustomRegis" 
               error={errorApellido}
               type="text"
               name=""
               helperText={aviso}
               maxLength={50}
               placeholder="Apellido"
               id="apellido"
               />
             <p className="error">{aviso}</p>
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Identidad" className="titleInput" />
            <div className="contInput">
              <input 
              error={errorIdentidad}
              type="text"
              name=""
              maxLength={13}
              className="inputCustomRegis"
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
          </div>

          <div className="sectInput">
            <TextCustom text="Telefono" className="titleInput" />
            <div className="contInput">
              <input 
               onKeyDown={e => {
                setcorreoe(e.target.value);
                if (correoe === '') {
                  setErrorcorreo(true);
                  setprueba('Los campos no deben estar vacios');
                } else {
                  setErrorcorreo(false);
                  var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!expresion.test(correoe)) {
                    setErrorcorreo(true);
                    setprueba('Formato invalido');
                  } else {
                    setErrorcorreo(false);
                    setprueba('');
                  }
                }
              }}
               className="inputCustomRegis"
               error={errorcorreo}
              placeholder="Usuario"
              maxLength={50} 
              />
               <p class="error">{prueba}</p>
            </div>
          </div>


          <div className="sectInput">
            <TextCustom text="Correo" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Contraseña" className="titleInput" />
            <div className="contInput">
            <FilledInput
              id="filled-adornment-password"
              className="inputCustomPassRegis"
              maxLength={150}
              type={showPassword ? 'text' : 'password'}
              inputRef={refContrasenia}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Confirmar Contraseña" className="titleInput" />
            <div className="contInput">
            <FilledInput
              id="filled-adornment-password"
              className="inputCustomPassRegis"
              maxLength={150}
              type={showPasswordConfi ? 'text' : 'password'}
              inputRef={refContraseniaConfi}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordConfi}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            </div>
          </div>
        </div>

        <div className="sectInput">
            <TextCustom text="Genero" className="titleInput" />
            <div className="contInput">

            <select className="inputCustomRegis" name="">
              <option value="1">Masculino</option>
              <option value="2">Femenino</option>
            </select>

            </div>
          </div>
          
        <div className="divSubmitRegis">
          <button className="buttonCustomRegis" onClick={handleProgress}>Siguiente</button>
        </div>
<br />
        <span className="refInicioSesion">
          <b>
            ¿Ya tienes una cuenta? <a href="/">Inicia Sesión</a>
          </b>
        </span>
      </div>
    </div>
  );
};
