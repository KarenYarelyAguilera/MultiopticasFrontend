import React, { useRef, useState } from 'react';
import { TextCustom } from '../../TextCustom';
// import "./PageOne.css";
import '../../../Styles/RecuperacionPassword.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PageOne = ({ correo, onButtonClick }) => {
  const navegate = useNavigate();

  const [contra2, setContra2] = useState("");
  const [errorContra2, setErrorContra2] = useState(false);
  const [advertencia, setadvertencia] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const refContrasenia = useRef(null);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };


  const handleBack = () => {
    navegate('/dashboard');
  };

  const handleClick = () => {
    const urlCompararContra = "http://localhost:3000/api/login/compare"
    const contra1 = document.getElementById("contra1").value
    //const contra2 = document.getElementById("contra2").value

    const data = {
      correo: correo,
      clave: contra1,
    }

    axios.post(urlCompararContra, data).then(response => {
      console.log(response.data);
      if (response.data.result === false) {
        swal("La contraseña no es correcta", "", "error")
      } else {
        onButtonClick('pagetwo')
      }

    })
  }


  return (
    <main>
      <form className="measure">
        <div className="contPrincipalRecuperacion">
          <div className='divInfoRecuperacion' style={{fontSize:'17px'}}>

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
                id="contra1"
                //placeholder='******************'
                //value={props.infoPerfil.Contrasenia} 
                className="inputCustomPass"
                type={showPassword ? 'text' : 'password'}
                inputProps={{ maxLength: 20, minLenght: 8 }}
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
            value="Cancelar"
            onClick={() => { navegate('/config/perfil') }}
          />
          <input
            className="btnSubmit"
            type="button"
            value="Siguiente"
            onClick={handleClick}
          />


        </div>
      </form>
    </main>

  );
};

export default PageOne;
