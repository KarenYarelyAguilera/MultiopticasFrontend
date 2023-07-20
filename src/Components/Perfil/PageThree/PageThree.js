import React, { useRef } from 'react';

import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from 'sweetalert';
import axios from 'axios';
import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';

export const PageThree = ({ onButtonClick, correo, id }) => {
  const urlVerificar = 'http://localhost:3000/api/token/verificar';
  const [pasar,setPasar]=useState(false)

  const [contra2, setContra2] = useState("");
  const [errorContra2, setErrorContra2] = useState(false);
  const [advertencia, setadvertencia] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const refContrasenia = useRef(null);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleClick = async () => {
    const codigo = document.getElementById('codigo').value;
    let data = {
      correo: correo,
      codigo: codigo,
      id: id,
    };
    await axios.post(urlVerificar, data).then(response=>{
      
      if (response.data==false) {
        swal(
          'Por favor ingrese su codigo de verificacion',
          '',
          'warning',
        )
      }else{
        onButtonClick('pagefour')

      }
    });
   
    return pasar;
  };

  return (
    <main>
      <form className="measure">
        <div className="contPrincipalRecuperacion">
          <div className='divInfoRecuperacion'>

          <TextCustom text="Confirmar Contraseña:" className="titleInput" />
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
            value="Guardar"
            // onClick={() => {
            //   onButtonClick('pagethree')}}
          />
        </div>
      </form>
    </main>
  );
};

export default PageThree;
