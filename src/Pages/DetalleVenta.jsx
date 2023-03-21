import { Button, Container, Grid } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../Styles/Usuarios.css";
import reporte from "../IMG/reporte.png";
import { useNavigate } from "react-router";

export const DetalleVenta = () =>{
  const navegate = useNavigate();

  const handleBack = () => {
    navegate('/ventas');
  }

    return(
        <Container className="ContUsuarios">
                <Button 
      className='btnBack'
      onClick={handleBack}>
    	  <ArrowBackIcon className='iconBack'/>
      </Button>
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <h1 className="inlineB">Detalle de las ventas</h1>
                <img src={reporte} width="80px" alt="reportelogo" />
              </Grid>
            </Grid>
        </Container>
    )
    
}
