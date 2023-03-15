import { FilledInput } from '@mui/material';
import { useNavigate } from 'react-router';
import '../Styles/RecuperacionPassword.css';
import { TextCustom } from '../Components/TextCustom.jsx';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRef, useState,useEffect } from 'react';
import { sendData } from '../scripts/sendData.js'
import swal from '@sweetalert/with-react';

export const ConfirmarPassword = props => {
  const refContrasenia = useRef(null);
  const refContrasenia2 = useRef(null);
  const navegate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const Guardar = () => {
    const urlAct = "http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=estado"
    const urlCambio = "http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=cambiarClave"

    let data = {
      clave: refContrasenia.current.value,
      correo: props.correo
    }

    let correo={
      correo:props.correo
    }

    if (refContrasenia.current.value === refContrasenia2.current.value) {
      sendData(urlAct,correo)
      sendData(urlCambio, data)
      navegate('/');
    } else if (refContrasenia.current.value !== refContrasenia2.current.value) {
      swal("Las contraseñas deben coincidir", "", "error")
      refContrasenia.current.value = ""
      refContrasenia2.current.value = ""
    }else if (refContrasenia.current.value===""||refContrasenia2.current.value==="") {
      
    }


  };

  return (
    <div className="contRecuperaPassword">
      <div className="titleRecuPassword">
        <h2>Confirmacion de contraseña</h2>
        <h3>
          Complete los campos requeridos para poder confirmar su contraseña.
        </h3>
      </div>

      <div className="sectionRestaPassword">
        <div className="panelInfo">
          <div className="contInput">
            <TextCustom text="Contraseña" className="titleInput" />
            <FilledInput
              placeholder="Contraseña"
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
              inputRef={refContrasenia2}
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
