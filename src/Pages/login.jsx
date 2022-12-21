import {Container,Grid,TextField,Button} from "@mui/material";
import {ForgetPsswrd}  from "../scripts/login"
import '../Styles/login.css'

export const Login = () => {
  return (
    <Container maxWidth="lg" id="login">
      <Grid container spacing={0.5}>
        <Grid item xs={6} md={4}>
            <h1>Multiopticas</h1>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={0.5}>
            <Grid item md={10} xs={12}>
              <div id="loginContent">
                <h2>Iniciar Sesion</h2>
                <div className="espacio">
                  <TextField label="Usuario"id="user" size="small" margin="dense"/>
                </div>
                <div className="espacio">
                <TextField label="Contraseña" id="password" size="small" margin="normal"type="password"/>
                </div>
                <div className="espacio">
                <Button variant="contained">Iniciar sesion</Button>
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
