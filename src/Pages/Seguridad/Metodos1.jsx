import { FilledInput } from '@mui/material';
import { useNavigate } from 'react-router';
import '../../Styles/RecuperacionPassword.css';
import { TextCustom } from '../../Components/TextCustom.jsx';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRef, useState,useEffect } from 'react';
import { sendData } from '../../scripts/sendData';
import swal from '@sweetalert/with-react';

export const Metodos1 = props => {
  const urlHist = "http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=histContra"
  const urlUser = "http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=user"

 

  const correo = {
    correo:props.correo
  }
  const refContrasenia = useRef(null);
  const refContrasenia2 = useRef(null);
  const navegate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [Usuario, setUsuario] = useState([])
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  useEffect(()=>{
    fetch(urlUser,{
      method: "POST",
      body: JSON.stringify(correo),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(data => setUsuario(data)); 
    
  },[])

  
  const Guardar = () => {
    const urlCambio = "http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=cambiarClave"
   

   

    let data ={
      clave:refContrasenia.current.value,
      correo:props.correo
    }

    const hist={
      id:Usuario[0].Id_Usuario,
      contra:refContrasenia.current.value,
      autor:Usuario[0].Usuario
    }

    if (refContrasenia.current.value.length<8) {
      swal('Su contraseña no es suficientemente segura\nPara que sea segura asegure de que su contraseña tenga al menos 8 caracteres','','error')
    }else{
    if (refContrasenia.current.value===refContrasenia2.current.value) {
      sendData(urlCambio,data)
      sendData(urlHist,hist)
      navegate('/');
    }else if (refContrasenia.current.value!==refContrasenia2.current.value) {
      swal(<h1>Las contraseñas no coinciden</h1>,"","error")
      refContrasenia = ""
      refContrasenia2 = ""
    }}


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
