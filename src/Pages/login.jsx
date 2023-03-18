import { Container, Grid, TextField, Button } from '@mui/material';
import { FilledInput } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//import { ForgetPsswrd } from "../scripts/login"
import '../Styles/login.css';
import logo from '../IMG/Multioptica.png';
import swal from '@sweetalert/with-react';
import { useState } from 'react';
import { useRef } from 'react'; /**Este hook ayuda a referenciar un componente
sin necesidad del getElementById */
import { useNavigate } from 'react-router-dom'; /**Este hook ayuda a redireccionar
a una pagina diferente mediante el "path" */
import { sendData } from '../scripts/sendData';

const urlLogin =
  'http://localhost/APIS-Multioptica/login/controller/user.php?op=psswrd';
const urlDUsuario =
  'http://localhost/APIS-Multioptica/login/controller/user.php?op=user';
const urlFechaExpiracion =
  'http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=fechaExpiracion';

const urlBitacoraLogin = "http://localhost/APIS-Multioptica/bitacora/controller/bitacora.php?op=login";

export const Login = props => {

  const [usuario, setUsuario]= useState("");
    const [prueba, setprueba]= useState("");
    const [errorUsuario, setErrorUsuario]= useState(false);

    const [contra, setContra]= useState("");
    const [msj, setMsj]= useState("");
    const [errorContra, setErrorContra]= useState(false);


  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [contador, setContador] = useState(0)
  const navegate = useNavigate();
  const refUsuario = useRef(null);
  const refContrasenia = useRef(null);

  const handleLogin = async () => {
    const data = {
      correo: refUsuario.current.value,
      clave: refContrasenia.current.value,
    };

    const data2 = {
      correo: refUsuario.current.value,
    };
   
    

    try {
      const respJsonPss = await sendData(urlLogin, data);
      const respJsonUsr = await sendData(urlDUsuario, data2);
      const respJsonFec = await sendData(urlFechaExpiracion, data2);

      const dataBitacora = {
        Id:respJsonUsr[0].Id_Usuario
      }


      if (respJsonPss && respJsonUsr[0].Estado_Usuario==="Nuevo") {
        props.mail(respJsonUsr[0].Correo_Electronico)
        props.user(respJsonUsr[0].Nombre_Usuario);
        navegate('/preguntasSeguridad');
      }
      if (respJsonPss && respJsonUsr[0].Estado_Usuario==="Activo") {
        sendData(urlBitacoraLogin,dataBitacora)
        props.access(respJsonUsr[0].Estado_Usuario); //Paso la propiedad estado para cambiar el hook y poder iniciar sesion.
        props.user(respJsonUsr[0].Nombre_Usuario);
        props.rol(respJsonUsr[0].Rol)
        props.mail(respJsonUsr[0].Correo_Electronico)
        navegate('/Home');
      }

    } catch (error) {
      swal('El usuario que ingreso no existe o\nIngreso credenciales erroneas', '', 'error')
      setContador(contador + 1)
    }

  };

  return (
    <Container maxWidth="lg" id="login">
      <Grid container spacing={8}>
        <Grid item xs={6} md={4}>
          <img src={logo} alt="logo" width="400px" />
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={0.5}>
            <Grid item md={10} xs={12}>
              <div id="loginContent">
                <h2>Iniciar Sesión</h2>
                <div className="espacio">
                  <TextField

                   onKeyDown={(e) =>{
                  
                    setUsuario(e.target.value);
                
                    if(usuario.length>47 ){
                      setErrorUsuario(true);
                      setprueba("A excedido al numero de caracteres");
                      
                    }
                    else{
                      setErrorUsuario(false);
                      var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!expresion.test(usuario)){
                        setErrorUsuario(true)
                        setprueba("Formato invalido");
                         }
                         else{
                          setErrorUsuario(false);
                          setprueba("");
  
                      }
                   }
                  }
                 }
                  onClick= {(e) =>{
                    setUsuario(e.target.value);
                    if (usuario===""){
                      setErrorUsuario(true);
                      setprueba("Los campos no deben estar vacios");
                    }
                    else{
                      setErrorUsuario(false);
                      setprueba("");
                    }
                  }}
                  error={errorUsuario}
                  label="Usuario"
                  variant="standard"
                  inputProps={{maxLength:50}}
                  inputRef={refUsuario}
                
                  />
                  <p>{prueba}</p>
                </div>
                <div className="espacio">
                

                  <FilledInput

                    onKeyDown= {(e) =>{
                      setContra(e.target.value);
                      if (contra===""){
                        setErrorContra(true);
                        setMsj("Los campos no deben estar vacios");
                      }
                      else{
                        setMsj("");
                        setErrorContra(false);
                      }
                    }}
                    error={errorContra}
                   
                    id="filled-adornment-password"
                    inputProps={{maxLength:150}}
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
                  <p>{msj} </p>
                </div>
              



                <div className="espacio">
                  <Button variant="contained" onClick={handleLogin}>
                    Iniciar sesion
                  </Button>
                </div>
                <div className="espacio">
                  <Button
                    onClick={() => {
                      navegate('/recuperacion');
                    }}
                    variant="contained"
                  >
                    ¿Olvidaste tu contraseña?
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
