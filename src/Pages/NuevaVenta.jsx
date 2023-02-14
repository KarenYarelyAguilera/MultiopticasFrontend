import { Container, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import venta from "../IMG/mano.png";
import "../Styles/Home.css";

export const NuevaVenta = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid  item xs={12} md={12} lg={12} xl={12}>
          <h2  className="inlineB titulo">Nueva Venta</h2>
          <img src={venta} width="80px" alt="LogoVenta" />
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          
            <label>Codigo de venta: </label>
            <TextField className="text"
              id="filled-hidden-label-small"
              label=""
              variant="filled"
              size="small"
            />
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          
            <label>Cliente: </label>
            <TextField className="text"
              id="filled-hidden-label-small"
              label=""
              variant="filled"
              size="small"
            />
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          
            <label>Empleado: </label>
            <TextField className="text"
              id="filled-hidden-label-small"
              label=""
              variant="filled"
              size="small"
            />
         
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          
            <label>RTN: </label>
            <TextField className="text"
              id="filled-hidden-label-small"
              label=""
              variant="filled"
              size="small"
            />
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          
            <label>CAI: </label>
            <TextField className="text"
              id="filled-hidden-label-small"
              label=""
              variant="filled"
              size="small"
            />
         
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12}>
            <Link className="LinkStyleNone" to="./DetalleVenta"><label className="siguiente">➔</label></Link>
        </Grid>
        
      </Grid>
    </Container>
  );
};
