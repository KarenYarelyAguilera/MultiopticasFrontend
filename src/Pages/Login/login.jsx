import { Container, Grid, TextField, Button } from '@mui/material';
import { FilledInput } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//import { ForgetPsswrd } from "../scripts/login"
import '../../Styles/login.css';
import logo from '../../IMG/Multioptica.png';
import ImgLogin from '../../IMG/ImgLogin.png';
import swal from '@sweetalert/with-react';
import { useEffect, useState } from 'react';
import { useRef } from 'react'; /**Este hook ayuda a referenciar un componente
sin necesidad del getElementById */
import {
  Link,
  useNavigate,
} from 'react-router-dom'; /**Este hook ayuda a redireccionar
a una pagina diferente mediante el "path" */
import { TextCustom } from '../../Components/TextCustom';
import axios from "axios";

export const Login = props => {
  const urlLogin =
    'http://localhost:3000/api/login/compare';
  const urlDUsuario =
    'http://localhost:3000/api/login';
  const urlFechaExpiracion =
    'http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=fechaExpiracion';

  const urlBitacoraLogin =
    'http://localhost/APIS-Multioptica/bitacora/controller/bitacora.php?op=login';
  const urlIntentos =
    'http://localhost/APIS-Multioptica/parametros/controller/parametro.php?op=intentos';

  const [usuario, setUsuario] = useState('');
  const [prueba, setprueba] = useState('');
  const [errorUsuario, setErrorUsuario] = useState(false);
  const [contra, setContra] = useState('');
  const [msj, setMsj] = useState('');
  const [errorContra, setErrorContra] = useState(false);

  const [intentos, setIntentos] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  // useEffect(() => {
  //   axios.get(urlIntentos)
  //     .then(resp => resp.data)
  //     .then(data => setIntentos(parseInt(data.valor)))
  //     .catch(error => {
  //       // Manejo de errores
  //       console.error(error);
  //     });
  // }, []);


  const [contador, setContador] = useState(0);
  const navegate = useNavigate();
  const refUsuario = useRef(null);
  const refContrasenia = useRef(null);

  const handleLogin = async () => {
    const data = {
      correo: refUsuario.current.value,
      clave: refContrasenia.current.value
    };

    const data2 = {
      correo: refUsuario.current.value,
    };

    try {

      const respJsonPss = await axios.post(urlLogin, data) //sendData(urlLogin, data);
      const respJsonUsr = await axios.post(urlDUsuario, data2) //sendData(urlDUsuario, data2);
      //const respJsonFec = await sendData(urlFechaExpiracion, data2);


      // const dataBitacora = {
      //   Id: respJsonUsr.data[0].Id_Usuario,
      // };

      console.log(respJsonPss.data.result && respJsonUsr.data[0].Estado_Usuario === 'Activo');

      if (respJsonPss.data.result && respJsonUsr.data[0].Estado_Usuario === 'Nuevo') {
        props.mail(respJsonUsr.data[0].Correo_Electronico);
        props.user(respJsonUsr.data[0].Nombre_Usuario);
        navegate('/preguntasSeguridad');
      }
      if (respJsonPss.data.result && respJsonUsr.data[0].Estado_Usuario === 'Activo') {
        // sendData(urlBitacoraLogin, dataBitacora);
        props.access(respJsonUsr.data[0].Estado_Usuario); //Paso la propiedad estado para cambiar el hook y poder iniciar sesion.
        props.user(respJsonUsr.data[0].Nombre_Usuario);
        props.rol(respJsonUsr.data[0].Rol);
        props.mail(respJsonUsr.data[0].Correo_Electronico);
        props.idUsuario(respJsonUsr.data[0].Id_Usuario)
        navegate('/Home');
      }
    } catch (error) {
      swal(
        'El usuario que ingreso no existe o\nIngreso credenciales erroneas',
        '',
        'error',
      );
      //setContador(contador + 1);
    }
  };

  return (
    <div className="contPadre">
      <div className="contLogin">
        <img src={logo} alt="logo" width="270px" />
        <h1 className="titleHello">Hola, Bienvenido</h1>
        <div className="contHijoLogin">
          <div className="contInputLogin">
            <TextCustom text="Usuario" className="titleInput" />
            <input
              onKeyDown={e => {
                setUsuario(e.target.value);

                if (usuario.length > 47) {
                  setErrorUsuario(true);
                  setprueba('A excedido al numero de caracteres');
                } else {
                  setErrorUsuario(false);
                  var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!expresion.test(usuario)) {
                    setErrorUsuario(true);
                    setprueba('Formato invalido');
                  } else {
                    setErrorUsuario(false);
                    setprueba('');
                  }
                }
              }}
              onClick={e => {
                setUsuario(e.target.value);
                if (usuario === '') {
                  setErrorUsuario(true);
                  setprueba('Los campos no deben estar vacios');
                } else {
                  setErrorUsuario(false);
                  setprueba('');
                }
              }}
              error={errorUsuario}
              placeholder="Usuario"
              className="inputCustomLogin"
              maxLength={50}
              ref={refUsuario}
            />
            <p className="errorMessage">
              {/* <ErrorIcon /> */}
              {prueba}
            </p>
          </div>

          <div className="contInputLogin">
            <TextCustom text="Password" className="titleInput" />
            <FilledInput
              onKeyDown={e => {
                setContra(e.target.value);
                if (contra === '') {
                  setErrorContra(true);
                  setMsj('Los campos no deben estar vacios');
                } else {
                  setMsj('');
                  setErrorContra(false);
                }
              }}
              error={errorContra}
              placeholder="Password"
              id="filled-adornment-password"
              className="inputCustomPass"
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
            <p className="errorMessage">
              {/* <ErrorIcon /> */}
              {msj}
            </p>
          </div>
        </div>
        <div className="contButtons">
          <div className="secondButtons">
            <div className="contRecuerdame">
              <input
                type="checkbox"
                name="Recuerdame"
                className="btnRecuerdame"
              />
              Recuerdame
            </div>
            <Link className="btnOlvidar" to={'/recuperacion'}>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button className="btnIngresar" onClick={handleLogin}>
            Iniciar sesion
          </Button>
        </div>
      </div>
      <div className="contImgLogin">
        <img src={ImgLogin} className="imgLogin" alt="No existe la imagen" />
      </div>
    </div>
  );
};
