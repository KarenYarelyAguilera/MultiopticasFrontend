import { Container, Grid } from "@mui/material";
import "../Styles/Home.css";
import reporte from "../IMG/reporte.png";

export const DetalleVenta = () =>{

    return(
        <Container>
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <h1 className="inlineB">Detalle de las ventas</h1>
                <img src={reporte} width="80px" alt="reportelogo" />
              </Grid>
            </Grid>
        </Container>
    )
    
}
