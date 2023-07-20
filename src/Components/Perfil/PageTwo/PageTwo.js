import React, { useRef, useState } from 'react';
import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';
import axios from 'axios';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';

export const PageTwo = ({ onButtonClick,correo1,id, autor }) => {
  const urlUserExist = "http://localhost:3000/api/login"
  const urlEnviarCodigo = 'http://localhost:3000/api/token/enviarCodigo';

  const [contra2, setContra2] = useState("");
  const [errorContra2, setErrorContra2] = useState(false);
  const [advertencia, setadvertencia] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const refContrasenia = useRef(null);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const data={
    correo:correo1
  }
  

  const handleClick = async () => {
    const respuesta = document.getElementById('respuesta').value;
    if (correo1 === respuesta) {
      await axios.post(urlUserExist,data).then(response=>{

        id(response.data[0].Id_Usuario)
        autor(response.data[0].Nombre_Usuario)
        if (response.data) {

          const data2 = {
            "correo": correo1,
            "id": response.data[0].Id_Usuario,
          };
  
           axios.post(urlEnviarCodigo, data2).then(()=> onButtonClick('pagethree'))
        }else{
          swal("El correo que ingreso es erroneo o no esta registrado")
        }

       
      
      })
      
    } else {
      swal("El correo que ingreso no coincide con el correo que proporcionó anteriormente.", "", "error")
    }
  };
  return (
    <main>
      <form className="measure">
        <div className="contPrincipalRecuperacion">
          <div className='divInfoRecuperacion'>

          <TextCustom text="Nueva Contraseña:" className="titleInput" />
          <div className="contInput">
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
                className="inputCustomPass"
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
          </div>
          </div>
        </div>
        <div className='divSubmitRecuperacion'>
          <input
            className="btnSubmit"
            type="button"
            value="Siguiente"
            onClick={() => {
              onButtonClick('pagethree')}}
          />
        </div>
      </form>
    </main>
  );
};
