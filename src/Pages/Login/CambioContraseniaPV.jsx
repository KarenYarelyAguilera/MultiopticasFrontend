
import React, { useRef, useState } from 'react';
import { TextCustom } from '../../Components/TextCustom';
//import '../../../Styles/RecuperacionPassword.css';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import swal from "sweetalert";
import { useNavigate } from "react-router";
import axios from "axios";
import { blue } from '@mui/material/colors';
import passwordRecovery from '../../IMG/passwordrecovery.png';


export const CambioContraseniaPV = ({ correo, idUsuario, autor, loginpvez, id, primeraVez }) => {

  const [clave1, setContra1] = useState("");
  const [errorContra1, setErrorContra1] = useState(false);
  const [msj, setMsjs] = useState("");

  const [clave2, setContra2] = useState("");
  const [errorContra2, setErrorContra2] = useState(false);
  const [advertencia, setadvertencia] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfi, setShowPasswordConfi] = useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const refContrasenia = useRef(null);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };



  const navegate = useNavigate()
  const handleClick = () => {

    const urlUpdPassword = "http://localhost:3000/api/usuario/UpdContra"
    const urlEstadoA = 'http://localhost:3000/api/usuario/EstadoActivo';



    const contra1 = document.getElementById("contra1").value
    const contra2 = document.getElementById("contra2").value

    const dataId = {
      Id_Usuario: idUsuario,
    };
    console.log(dataId);

    const data = {
      correo: correo,
      clave: contra1,
      id: idUsuario || id,
      autor: autor
    }

    console.log(data);

    if (contra1 !== contra2) {
      swal("Las contraseñas no coinciden", "", "warning")
    } else {

      axios.put(urlUpdPassword, data).then(response => {
        console.log(response.data);
        if (response.data === false) {
          swal("La contraseña no puede ser igual que la anterior", "", "error")
        } else {
          axios.put(urlEstadoA, dataId).then(response => { //Cambia el estado del usuario a Activo
            loginpvez(0)
            swal("Contraseña actualizada", "", "success").then(() => navegate("/"))
          });
        }
      })
    }
  }
  return (
    <main >
      <div className="divSection">
        <div className="divInfoQuestion">

          <form className="measure">
            <div className="contPrincipalRecuperacion">
              <h1>Configuracion de nueva contraseña por Primer Login</h1> <br></br>
              <TextCustom text="Asegurate de que la nueva contraseña sea robusta:" className="titleInputCambio" />
              <TextCustom text="Debe de incluir letras mayúsculas, minúsculas y almenos dos caracteres especiales ." className="titleInputCambio"></TextCustom>
              <br />
              <br />
              <div className='divInfoRecuperacion'>
                <div className="contInput">
                <TextCustom text="Nueva contraseña" className="titleInput" />
                  <FilledInput
                    onKeyDown={(e) => {
                      setContra1(e.target.value);
                      if (clave1 === "") {
                        setErrorContra1(true);
                        setMsjs("Los campos no deben estar vacios");
                      } else {
                        setErrorContra1(false)
                        var regularExpression = /^[a-zA-Z0-9!@#$%^&*]+$/;
                        if (!regularExpression.test(clave1)) {
                          setErrorContra1(true)
                          setMsjs("");
                        } else {
                          setMsjs("La contraseña debe de tener letras, numeros y caracteres especiales");
                          setErrorContra1(false);
                        }
                      }
                    }}
                    type={showPassword ? 'text' : 'password'}
                    inputProps={{ maxLength: 20 }}
                    //inputRef={refContrasenia}
                    minLength="8"
                    name=""
                    className="inputCustomPass"
                    id="contra1"
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
                </div>
                <p className='error'>{msj}</p>
              </div>

              <div className='divInfoRecuperacion'>
               
                <div className="contInput">
                <TextCustom text="Confirme la nueva contraseña" className="titleInput" />
                  <FilledInput
                    onKeyDown={(e) => {
                      setContra2(e.target.value);
                      if (clave2 === "") {
                        setErrorContra2(true);
                        setadvertencia("Los campos no deben estar vacios");
                      }
                      else {
                        setErrorContra2(false)
                        var regularExpression = /^[a-zA-Z0-9!@#$%^&*]+$/;
                        if (!regularExpression.test(clave2)) {
                          setErrorContra2(true)
                          setadvertencia("");
                        }
                        else {
                          setadvertencia("La contraseña debe de tener letras, numeros y caracteres especiales");
                          setErrorContra2(false);
                        }
                      }

                    }}
                    type={showPassword ? 'text' : 'password'}
                    inputProps={{ maxLength: 20 }}
                    minLength="8"
                    //inputRef={refContrasenia}
                    name=""
                    className="inputCustomPass"
                    id="contra2"
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
                </div>
                <p className='error'>{advertencia}</p>
              </div>
            </div>
            <div className='divSubmitRecuperacion'>
              <input
                className="btnSubmit"
                type="button"
                value="Cambiar contraseña"
                /* onClick={handleClick} */
                onClick={() => {
                  var password = document.getElementById("contra1").value;
                  var password2 = document.getElementById("contra2").value;

                  if (password === "" || password2 === "") {
                    swal("No deje campos vacíos.", "", "error");
                  } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/.test(password2)) {
                    swal("La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial.", "", "error");
                  } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/.test(password)) {
                    swal("La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial.", "", "error");
                  } else if (clave1 !== clave2) {
                    swal("Las contraseñas deben coincidir.", "", "error");
                  } else {
                    handleClick()
                  }
                }}


              />
            </div>
          </form>
        </div>
        <div className="divImgSection">
          <img src={passwordRecovery} alt="Iamgen no encontrada" />
        </div>
      </div>

    </main>

  );
};
