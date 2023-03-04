import { FilledInput } from '@mui/material';
import { useNavigate } from 'react-router';
import '../Styles/RecuperacionPassword.css';
import { TextCustom } from '../Components/TextCustom.jsx';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRef, useState } from 'react';

export const Metodos1 = props => {
    const refContrasenia = useRef(null);
    const navegate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
  
    const handleClickShowPassword = () => setShowPassword(show => !show);
  
    const handleMouseDownPassword = event => {
      event.preventDefault();
    };

  const Guardar = () => {
    // let correo = document.getElementById('correo').value;
    // props.correo(correo);

    navegate('/');
  };

  return (
    <div className="contRecuperaPassword">
      <div className="titleRecuPassword">
        <h2>Restablezca su contraseña</h2>
        <h3>
          Complete los campos requeridos para poder restablecer su contraseña.
        </h3>
      </div>

      <div className="sectionRestaPassword">
        <div className="panelInfo">
          <div className="contInput">
            <TextCustom text="Nueva Contraseña" className="titleInput" />
            <FilledInput
              placeholder="Nueva Contraseña"
              id="filled-adornment-password"
              className="inputCustomPass"
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
            ></FilledInput>
          </div>

          <div className="contInput">
            <TextCustom text="Confirme la Contraseña" className="titleInput" />

            <FilledInput
              placeholder="Confirme la Contraseña"
              id="filled-adornment-password"
              className="inputCustomPass"
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
            ></FilledInput>
          </div>
          <div className="contBtnRestPassword">
            <Button className="btnSubmit" variant="container" onClick={Guardar}>
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
