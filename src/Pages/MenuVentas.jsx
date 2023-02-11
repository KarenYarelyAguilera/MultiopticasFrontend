import { Container, Grid } from "@mui/material";
import venta from "../IMG/mano.png";
import registro from "../IMG/reporte.png";
import "../Styles/Home.css";
import { Link } from "react-router-dom";

export const MenuVentas = () => {
  return (
    <Container>
      <Grid container spacing={40}>
        <Grid item xs={6}>
          <Link className="LinkStyleNone" to="./NuevaVenta">
            <img src={venta} width="200px" alt="LogoVenta" />
            <h2 className="Enlace">Venta</h2>
          </Link>
        </Grid>
        <Grid item xs={5}>
          <Link className="LinkStyleNone" to="./reportes">
            <img src={registro} width="200px" alt="LogoVenta" />
            <h2 className="Enlace">Registro de ventas</h2>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
