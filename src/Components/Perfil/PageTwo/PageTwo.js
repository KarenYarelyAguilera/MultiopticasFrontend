import React, { useRef, useState } from 'react';
import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import { useNavigate } from "react-router";


import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';

export const PageTwo = ({ correo: password2, id, autor }) => {
  const navegate = useNavigate()

  const urlUserExist = "http://194.163.45.55:4000/api/login"

  const [contra1, setContra1] = useState("");
  const [errorContra1, setErrorContra1] = useState(false);
  const [msj, setMsjs] = useState("");

  const [contra2, setContra2] = useState("");
  const [errorContra2, setErrorContra2] = useState(false);
  const [advertencia, setadvertencia] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const refContrasenia = useRef(null);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };


  const handleClick = () => {
    const urlBitacoraPerfil = 'http://194.163.45.55:4000/api/bitacora/cambiocontrasena';
    const urlUpdPassword = "http://194.163.45.55:4000/api/usuario/UpdContra"
    const contra1 = document.getElementById("contra1").value
    const contra2 = document.getElementById("contra2").value

    const data = {
      correo: password2,
      clave: contra1,
      id: id,
      autor: autor
    }

    const dataId = {
      Id: id,
    };
    if (contra1 !== contra2) {
      swal("Las contraseñas no coinciden", "", "warning")
    } else {

      axios.put(urlUpdPassword, data).then(response => {
        console.log(response.data);
        if (response.data === false) {
          swal("La contraseña no puede ser igual que la anterior", "", "error")
        } else {
          swal("Contraseña actualizada", "", "success").then(() => navegate("/config/perfil"))
          axios.post(urlBitacoraPerfil, dataId)
        }
      })
    }
  }



  return (
    <main>
      <form className="measure">
        <div className="contPrincipalRecuperacion">

          <div className='divInfoRecuperacion'>
            <TextCustom text="Nueva contraseña" className="titleInput" />
            <div className="contInput">
              <input

                onChange={(e) => {
                  setContra1(e.target.value);
                  if (contra1 === "") {
                    setErrorContra1(true);
                    setMsjs("Los campos no deben estar vacíos");
                  } else {
                    setErrorContra1(false);
                    var regularExpression = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/;
                    if (!regularExpression.test(contra1)) {
                      setErrorContra1(true);
                      setMsjs("La contraseña debe contener al menos una letra, un número y un carácter especial");
                    } else {
                      setErrorContra1(false);
                      setMsjs("");
                    }
                  }
                }}
                placeholder='Contraseña'
                type={showPassword ? 'text' : 'password'}
                inputProps={{ maxLength: 20 }}
                inputRef={refContrasenia}
                name=""
                className="inputCustom"
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
              />
              <p className='error'>{msj}</p>
            </div>
          </div>

          <div className='divInfoRecuperacion'>
            <TextCustom text="" className="titleInput" />
            <TextCustom text="Confirme la nueva contraseña" className="titleInput" />
            <div className="contInput">
              <input
                onChange={(e) => {
                  setContra2(e.target.value);
                  if (contra2 === "") {
                    setErrorContra2(true);
                    setadvertencia("Los campos no deben estar vacíos");
                  }
                  if (contra2 === contra1) {
                  } else {
                  }
                }
                }
                placeholder='Contraseña'
                type={showPassword ? 'text' : 'password'}
                inputProps={{ maxLength: 20 }}
                inputRef={refContrasenia}
                name=""
                className="inputCustom"
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
              />
              <p className='error'>{advertencia}</p>
            </div>
          </div>

        </div>
        <div className='divSubmitRecuperacion'>
          <input
            className="btnSubmit"
            type="button"
            value="Cambiar contraseña"
            /*  onClick={handleClick} */

            onClick={() => {
              var password = document.getElementById("contra1").value;
              var password2 = document.getElementById("contra2").value;

              if (password === "" || password2 === "") {
                swal("No deje campos vacíos.", "", "error");
              }else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/.test(password2)) {
                swal("La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial.", "", "error");
              } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/.test(password)) {
                swal("La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial.", "", "error");
              } else if (contra1 !== contra2) {
                swal("Las contraseñas deben coincidir.", "", "error");
              }else {
                handleClick()
              }
            }}
          />
        </div>
      </form>
    </main>
  );
};
