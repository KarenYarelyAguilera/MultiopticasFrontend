import { Container, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import venta from "../IMG/mano.png";
import { TextCustom } from '../Components/TextCustom.jsx';
import Button from '@mui/material/Button';
import "../Styles/Home.css";

export const NuevaVenta = () => {
  return (
    // <Container>
    //   <Grid container spacing={4}>
    //     <Grid  item xs={12} md={12} lg={12} xl={12}>
    //       <h2  className="inlineB titulo">Nueva Venta</h2>
    //       <img src={venta} width="80px" alt="LogoVenta" />
    //     </Grid>
    //     <Grid item xs={12} md={12} lg={12} xl={12}>
          
    //         <label>Codigo de venta: </label>
    //         <TextField className="text"
    //           id="filled-hidden-label-small"
    //           label=""
    //           variant="filled"
    //           size="small"
    //         />
    //     </Grid>
    //     <Grid item xs={12} md={12} lg={12} xl={12}>
          
    //         <label>Cliente: </label>
    //         <TextField className="text"
    //           id="filled-hidden-label-small"
    //           label=""
    //           variant="filled"
    //           size="small"
    //         />
    //     </Grid>
    //     <Grid item xs={12} md={12} lg={12} xl={12}>
          
    //         <label>Empleado: </label>
    //         <TextField className="text"
    //           id="filled-hidden-label-small"
    //           label=""
    //           variant="filled"
    //           size="small"
    //         />
         
    //     </Grid>
    //     <Grid item xs={12} md={12} lg={12} xl={12}>
          
    //         <label>RTN: </label>
    //         <TextField className="text"
    //           id="filled-hidden-label-small"
    //           label=""
    //           variant="filled"
    //           size="small"
    //         />
    //     </Grid>
    //     <Grid item xs={12} md={12} lg={12} xl={12}>
          
    //         <label>CAI: </label>
    //         <TextField className="text"
    //           id="filled-hidden-label-small"
    //           label=""
    //           variant="filled"
    //           size="small"
    //         />
         
    //     </Grid>
    //     <Grid item xs={12} md={12} lg={12} xl={12}>
    //         <Link className="LinkStyleNone" to="./DetalleVenta"><label className="siguiente">➔</label></Link>
    //     </Grid>
        
    //   </Grid>
    // </Container>
    <div className="ContUsuarios">
      <div className="titleAddUser">
        <h2>Nueva Venta</h2>
        <h3>Complete todos los puntos para poder registrar una venta</h3>
      </div>

      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Empleado" className="titleInput" />
              <select id="empleado" className="selectCustom">
                {Empleado.length ? (
                  Empleado.map(pre => (
                    <option key={pre.IdEmpleado} value={pre.IdEmpleado}>
                      {pre.Nombre}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>
                )}
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Nombre de Usuario" className="titleInput" />
              <input
                type="text"
                id="usuario"
                name=""
                className="inputCustom"
                placeholder="Usuario"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Contraseña" className="titleInput" />
              <input
                type="text"
                id="usuario"
                name=""
                className="inputCustom"
                placeholder="Usuario"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Correo Electronico" className="titleInput" />
              <input
                type="text"
                name=""
                id="correo"
                className="inputCustom"
                placeholder="Correo Electronico"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Rol" className="titleInput" />
              <select id="cargo" className="selectCustom">
                {Rol.length ? (
                  Rol.map(pre => (
                    <option key={pre.Id_Rol} value={pre.Id_Rol}>
                      {pre.Rol}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>
                )}
              </select>
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={insertar}
              >
                <h1>{'Finish' ? 'Crear Usuario' : 'Finish'}</h1>
              </Button>
            </div>
          </div>
        </div>
        
        <img src={AddUser} alt="" />
      </div>
    </div>

  );
};
