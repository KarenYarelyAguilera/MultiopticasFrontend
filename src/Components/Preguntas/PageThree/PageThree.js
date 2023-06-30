import React, { useRef, useState } from 'react';

import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const PageThree = ({ onButtonClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfi, setShowPasswordConfi] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleClickShowPasswordConfi = () => setShowPasswordConfi(show => !show);
  const refContrasenia = useRef(null);
  const refContraseniaConfi = useRef(null);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <main>
      <form className="measure">
        <div className="contPrincipalRecu">
          <div className="divInfoQuestionResp">
            <TextCustom text="Nueva contraseña:" className="titleInput" />
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

          <div className="divInfoQuestionResp">
            <TextCustom text="Confirmar nueva contraseña:" className="titleInput" />
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
        <div className="divSubmitQuestion">
          <input
            className="btnSubmitPreguntas"
            type="submit"
            value="Enviar"
            // onClick={() => onButtonClick('pagetwo')}
          />
        </div>
      </form>
    </main>
  );
};

export default PageThree;
