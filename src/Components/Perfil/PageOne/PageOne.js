import React, { useRef, useState } from 'react';
import { TextCustom } from '../../TextCustom';
// import "./PageOne.css";
import '../../../Styles/RecuperacionPassword.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';

export const PageOne = ({ onButtonClick, correo }) => {

  const [contra2, setContra2] = useState("");
  const [errorContra2, setErrorContra2] = useState(false);
  const [advertencia, setadvertencia] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const refContrasenia = useRef(null);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (

    <main>
      
      <form className="measure">
        <div className="contPrincipalRecuperacion">
          <div className='divInfoRecuperacion'>

          <TextCustom text="Contraseña actual:" className="titleInput" />
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
              onButtonClick('pagetwo')}}
          />
        </div>
      </form>
    </main>

  );
};

export default PageOne;
