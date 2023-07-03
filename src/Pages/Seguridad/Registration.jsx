import React, { useRef, useState } from 'react';
import passwordRecovery from '../../IMG//registration.png';
import { TextCustom } from '../../Components/TextCustom';
import { useNavigate } from 'react-router';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import swal from '@sweetalert/with-react';
import axios from 'axios';

const urlIEmpleado = 'http://localhost:3000/api/empleado';
const urlUsuario = 'http://localhost:3000/api/usuario/insert';

export const Registration = ({
  msgError = '',
  success = false,
  warning = false,
  props,

}) => {

  const [Nombreusuario, setNombreusuario] = useState("");
  const [errorNombreusuario, setErrorNombreusuario] = useState(false);
  const [mensaje, setMensaje] = useState(false);

  const [Nombre, setNombre] = React.useState('');
  const [errorNombre, setErrorNombre] = React.useState(false);
  const [Msj, setMsj] = React.useState(false);

  const [Apellido, setApellido] = React.useState('');
  const [errorApellido, setErrorApellido] = React.useState(false);
  const [aviso, setAviso] = React.useState(false);

  const [iIdentidad, setiIdentidad] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorIdentidad, setErrorIdentidad] = React.useState(false);

  const [errorTelefono, setErrorTelefono] = React.useState(false);
  const [texto, setTexto] = React.useState(false);

  const [correo, setCorreo] = useState("");
  const [textoCorreo, setTextoCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState(false);

  const [contra1, setContra1] = useState("");
  const [msj, setMsjs] = useState("");
  const [errorContra1, setErrorContra1] = useState(false);

  const [contra2, setContra2] = useState("");
  const [errorContra2, setErrorContra2] = useState(false);
  const [advertencia, setadvertencia] = useState(false);

  const [Telefono, setTelefono] = useState('');

  const [Identidad, setIdentidad] = useState(0);
  const [Telefonoc, setTelefonoc] = useState(0);


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

  const handleProgress = async () => {
    let nombre = document.getElementById('nombre').value; //Nombre de usuario
    let nombres = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellido').value;
    let identidad = document.getElementById('Nidentidad').value;
    let telefono = document.getElementById('phone').value;
    let genero = parseInt(document.getElementById('genero').value);
    let correo = document.getElementById('correo').value;

    let data = {
      nombre: nombre,
      nombre: nombres.toUpperCase(),
      apellido: apellidos.toUpperCase(),
      telEmple: telefono,
      idGenero: genero,
      numId: identidad,
      correo: correo,
      clave: refContrasenia.current.value,
    };

    await axios.post(urlIEmpleado, data).then(response => {
      swal('Proceso exitoso', '', 'success').then(result => {
      });
    }).catch(error => {
      console.log(error);
      swal('Error al registrar el empleado', '', 'success')
    })
    await axios.post(urlUsuario, data).then(response => { });

    navegate("/progress")
  }

  const handleLogin = () => {
    navegate("/")
  }




  return (
    <div className="divRegistration">
      <div className="divImgSection">
        <img src={passwordRecovery} alt="Iamgen no encontrada" />
      </div>

      <div className="divSectionRegis">
        <div className="titleRegistration">
          <h2>Registrate</h2>
          <h3>Gracias por confiar y formar parte de la familia Multioptica</h3>
        </div>

        <div className="divInfoQuestionRegis">
          <div className="contInput">
            <TextCustom text="Nombre de Usuario"
              className="titleInput" />
            <input
              onKeyDown={(e) => {
                setNombreusuario(e.target.value);
                if (Nombreusuario == "") {
                  setErrorNombreusuario(true);
                  setMensaje("Los campos no deben estar vacios");
                }
                else {
                  setErrorNombreusuario(false)
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(Nombreusuario)) {
                    setErrorNombreusuario(true)
                    setMensaje("Solo se debe de ingresar letras sin espacios vacios")
                  } else {
                    setErrorNombreusuario(false);
                    setMensaje("");
                  }
                }
              }}
              error={errorNombreusuario}
              type="text"
              helperText={mensaje}
              name=""
              className="inputCustom"
              maxLength={15}
              placeholder="Nombre"
              variant="standard"
              id="usuario"
              label="Usuario"
            />
            <p className='error'>{mensaje}</p>
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
                  var preg_match = /^[a-zA-Z\s]+$/;
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
                  var preg_match = /^[a-zA-Z\s]+$/;
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
            <TextCustom text="Numero de Identidad" className="titleInput" />

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
              placeholder="Identidad"
              id="Nidentidad"
            />
            <p class="error">{leyenda}</p>
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
              helperText={textoCorreo}
              maxLength={8}
              className="inputCustom"
              placeholder="Telefono"
              id="phone"
            />
            {<p className="error">{texto}</p>}
          </div>



        <div className='contInput'>
      <TextCustom text="Correo Electronico" className="titleInput"/>
      <input
        onKeyDown={(e) => {
          setCorreo(e.target.value)
          var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!expresion.test(correo)) {
            setErrorCorreo(true)
            setTextoCorreo("Formato invalido");
          }
          else {
            setErrorCorreo(false);
            setTextoCorreo("");
          }
        }}
        onClick={e => {
          setCorreo(e.target.value);
          if (correo === '') {
            setErrorCorreo(true);
            setTextoCorreo('Los campos no deben estar vacios');
          } else {
            setErrorCorreo(false);
            setTextoCorreo('');
          }
        }}
              type="text"
              name=""
              id="correo"
              className="inputCustom"
              placeholder="Correo Electronico"
              error={errorCorreo}
              helperText={textoCorreo}
              maxLength={30}

            />
            <p className='error'>{textoCorreo}</p>

        </div>
         
          <div className="contInput">
            <TextCustom text="Contraseña" className="titleInput" />
            <FilledInput

              onKeyDown={(e) => {
                setContra1(e.target.value);
                if (contra1 === "") {
                  setErrorContra1(true);
                  setMsjs("Los campos no deben estar vacios");
                }
                else {
                  setErrorContra1(false)
                  var regularExpression = /^[a-zA-Z0-9!@#$%^&*]+$/;
                  if (!regularExpression.test(contra1)) {
                    setErrorContra1(true)
                    setMsjs("");
                  }
                  else {
                    setMsjs("La contraseña debe de tener letras, numeros y caracteres especiales");
                    setErrorContra1(false);
                  }
                }
              }}

              id="filled-adornment-password"
              placeholder='Contraseña'
              className="inputCustomPass"
              type={showPassword ? 'text' : 'password'}
              inputProps={{ maxLength: 20 }}
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
            <p className='error'>{msj}</p>
          </div>

          <div className="contInput">
            <TextCustom text="Confirmar Contraseña" className="titleInput" />
            <div className="contInput">
              <FilledInput
                onKeyDown={(e) => {
                  setContra2(e.target.value);
                  if (contra2 === "") {
                    setErrorContra2(true);
                    setadvertencia("Los campos no deben estar vacios");
                  }
                  else {
                    setErrorContra2(false)
                    var regularExpression = /^[a-zA-Z0-9!@#$%^&*]+$/;
                    if (!regularExpression.test(contra2)) {
                      setErrorContra2(true)
                      setadvertencia("");
                    }
                    else {
                      setadvertencia("La contraseña debe de tener letras, numeros y caracteres especiales");
                      setErrorContra2(false);
                    }
                    if (contra1 !== contra2) {
                      // Las contraseñas son iguales
                      setadvertencia("Las contraseñas coinciden.");
                    } else {
                      // Las contraseñas son diferentes
                      setadvertencia("Las contraseñas no coinciden.");
                    }
                  }
                  
                }}

                id="filled-adornment-password"
                placeholder='Contraseña'
                className="inputCustomPass"
                type={showPassword ? 'text' : 'password'}
                inputProps={{ maxLength: 20 }}
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
               <p className='error'>{advertencia}</p>
            </div>
          </div>
        </div>

        <div className="sectinput">
            <TextCustom text="Genero" className="titleInput" />
            <select name="" className="inputCustomRegis" id="genero">
              <option value={1}>Masculino</option>
              <option value={2}>Femenino</option>
            </select>
          </div>

        <div className="divSubmitRegis">
          <button className="buttonCustomRegis"
           onClick={() => {
            var usuario = document.getElementById("usuario").value;
            var nombre = document.getElementById("nombre").value;
            var apellido = document.getElementById("apellido").value;
            var Nidentidad = document.getElementById("Nidentidad").value;
            var phone = document.getElementById("phone").value;
            var correo = document.getElementById("correo").value;
            var password = document.getElementById("filled-adornment-password").value;
            
            if (usuario === "" || nombre === "" || apellido === "" || Nidentidad === "" || phone === "" || password === "" || correo === "") {
              swal("No deje campos vacíos.", "", "error");
            } else if (!/^[a-zA-Z]+$/.test(usuario)) {
              swal("El campo usuario solo acepta letras.", "", "error");
            } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
              swal("El campo nombre solo acepta letras.", "", "error");
            } else if (!/^[a-zA-Z\s]+$/.test(apellido)) {
              swal("El campo apellido solo acepta letras.", "", "error");
            } else if (isNaN(parseInt(Nidentidad))) {
              swal("El campo identidad solo acepta números.", "", "error");
            } else if (isNaN(parseInt(phone))) {
              swal("El campo teléfono solo acepta números.", "", "error");
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
              swal("El campo correo debe contener un correo válido.", "", "error");
            } 
            else if (!/^[a-zA-Z0-9!@#$%^&*]+$/.test(document.getElementById("filled-adornment-password").value)) {
              swal("El campo contraseña debe incluir letras, números y caracteres especiales", "", "error");
            }
          
            else {
              handleProgress();
            }
          }}  
          >Siguiente</button>
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