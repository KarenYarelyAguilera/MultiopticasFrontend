import {Container,Grid,TextField,Button} from "@mui/material";
import {ForgetPsswrd}  from "../scripts/login"
import '../Styles/login.css'
import logo from '../IMG/Multioptica.png'

import { useRef } from "react"; /**Este hook ayuda a referenciar un componente
sin necesidad del getElementById */
import { useNavigate } from "react-router-dom"; /**Este hook ayuda a redireccionar
a una pagina diferente mediante el "path" */

const urlLogin =
  "http://localhost/Multioptica/login/controller/user.php?op=user";

const sendData = async (urlAPI, data) => {
  //De aqui
  const resp = await fetch(urlAPI, {
    //Realiza una peticion asincrona fetch para consumir una API segun su URL
    method: "post", //Se le indica el metodo a utilizar (sino se hace esto, el fetch toma el metodo "Get" por default)
    body: JSON.stringify(data), //Se le manda el data con el que se consumira el API
    headers: {
      //Se le especifica que enviara un json.
      "Content-Type": "application/json",
    },
  }); //A aqui!!!!
  //console.log(resp)
  const json = await resp.json(); //Retorna los datos de la API y los convierte a json para utilizarlos despues
  //console.log(json)

  return json;
  //SIEMPRE que se realiza una consulta a la bdd los metodos deben ser async
};

export const Login = (props) => {
  const navegate = useNavigate();
  const refUsuario = useRef(null);
  const refContrasenia = useRef(null);

  const handleLogin = async () => {
    const data = {
      usuario: refUsuario.current.value,
      clave: refContrasenia.current.value,
    };
    const respJson = await sendData(urlLogin, data);

    console.log("Respuesta desde el evento ", respJson[0].Estado_Usuario);
    props.access(respJson[0].Estado_Usuario); //Paso la propiedad estado para cambiar el hook y poder iniciar sesion.
    props.user(respJson[0].Nombre_Usuario);
    if (respJson[0].Estado_Usuario === "Activo") {
      navegate("/Home");
    }
  };

  return (
    <Container maxWidth="lg" id="login">
      <Grid container spacing={8}>
        <Grid item xs={6} md={4}>
            <img src={logo} alt="logo"  width="400px"/>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={0.5}>
            <Grid item md={10} xs={12}>
              <div id="loginContent">
                <h2>Iniciar Sesion</h2>
                <div className="espacio">
                  <TextField label="Usuario" size="small" margin="dense"  inputRef={refUsuario}/>
                </div>
                <div className="espacio">
                <TextField label="Contraseña" size="small" margin="normal"type="password" inputRef={refContrasenia}/>
                </div>
                <div className="espacio">
                <Button variant="contained" onClick={handleLogin}>Iniciar sesion</Button>
                </div>
                <div className="espacio">
                <Button onClick={ForgetPsswrd} variant="contained">¿Olvidaste tu contraseña?</Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
