import React, { useRef, useState } from 'react';
import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import { useNavigate } from "react-router";


import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';

export const PageTwo = ({ correo, id, autor }) => {
  const navegate = useNavigate()

  const urlUserExist = "http://localhost:3000/api/login"

  const [contra1, setContra1] = useState("");
  const [msj, setMsjs] = useState("");
  const [errorContra1, setErrorContra1] = useState(false);
  const [contra2, setContra2] = useState("");
  //const [contra2, setContra2] = useState("");
  const [errorContra2, setErrorContra2] = useState(false);
  const [advertencia, setadvertencia] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const refContrasenia = useRef(null);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };


  const handleClick = () => {
    const urlBitacoraPerfil = 'http://localhost:3000/api/bitacora/cambiocontrasena';
    const urlUpdPassword = "http://localhost:3000/api/usuario/UpdContra"
    const contra1 = document.getElementById("contra1").value
    const contra2 = document.getElementById("contra2").value

    const data = {
      correo: correo,
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
                type="password"
                name=""
                className="inputCustom"
                id="contra1"
              />
            </div>
          </div>

          <div className='divInfoRecuperacion'>
            <TextCustom text="" className="titleInput" />
            <TextCustom text="Confirme la nueva contraseña" className="titleInput" />
            <div className="contInput">
              <input
                type="password"
                name=""
                className="inputCustom"
                id="contra2"
              />
            </div>
          </div>

        </div>
        <div className='divSubmitRecuperacion'>
          <input
            className="btnSubmit"
            type="button"
            value="Cambiar contraseña"
            onClick={handleClick}
          />
        </div>
      </form>
    </main>
  );
};
