import React, { useRef, useState } from 'react';
import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import swal from "sweetalert";
import { useNavigate } from "react-router";
import axios from "axios";


export const PageFour = ({ correo, id, autor }) => {

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

    const urlUpdPassword = "http://194.163.45.55:4000/api/usuario/UpdContra"


    const contra1 = document.getElementById("contra1").value
    const contra2 = document.getElementById("contra2").value

    const data = {
      correo: correo,
      clave: contra1,
      id: id,
      autor: autor
    }
    if (contra1 !== contra2) {
      swal("Las contraseñas no coinciden", "", "warning")
    } else {

      axios.put(urlUpdPassword, data).then(response => {
        console.log(response.data);
        if (response.data === false) {
          swal("La contraseña no puede ser igual que la anterior", "", "error")
        } else {
          swal("Contraseña actualizada", "", "success").then(() => navegate("/"))
        }
      })
    }
  }
  return (
    <main>
      {/* <div className="titleRecuperacion">
        <TextCustom text="Asegurate que la nueva contraseña tenga como mínimo 8 caracteres los cuales debe de incluir letras mayúsculas y minúsculas."/>
      </div> */}
      <form className="measure">
        <div className="contPrincipalRecuperacion" >

          
          <div className='divInfoRecuperacion'>
            <div className="contInput" style={{ fontSize: "17px" }}>
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

            <div className="contInput" style={{ fontSize: "17px" }}>
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
        <div className='divSubmitRecuperacion'  style={{ fontSize: "17px" }}>
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
    </main>

  );
};
export default PageFour;