// import { Container, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { TextCustom } from '../Components/TextCustom.jsx';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Venta from '../IMG/venta.jpg';

import '../Styles/Home.css';

export const NuevaVenta = () => {
  const navegate = useNavigate();

  const handleDetalleVenta = () => {
    navegate('/ventas/reportes');
  };
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
              <TextCustom text="Codigo de Venta" className="titleInput" />
              <input
                type="text"
                id="codigo"
                name=""
                className="inputCustom"
                placeholder="Codigo"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Cliente" className="titleInput" />
              <input
                type="text"
                id="cliente"
                name=""
                className="inputCustom"
                placeholder="Cliente"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Empleado" className="titleInput" />
              <input
                type="text"
                id="empleado"
                name=""
                className="inputCustom"
                placeholder="Empleado"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Fecha de Venta" className="titleInput" />
              <input
                type="text"
                name=""
                id="fechaVenta"
                className="inputCustom"
                placeholder="Fecha"
              />
            </div>

            <div className="contInput">
              <TextCustom text="RTN" className="titleInput" />
              <input
                type="text"
                name=""
                id="RTN"
                className="inputCustom"
                placeholder="RTN"
              />
            </div>

            <div className="contInput">
              <TextCustom text="CAI" className="titleInput" />
              <input
                type="text"
                name=""
                id="CAI"
                className="inputCustom"
                placeholder="CAI"
              />
            </div>

            <div className="contBtnSventa">
              <Button
                variant="contained"
                className="btnSVenta"
                startIcon={<NavigateNextIcon />}
                onClick={handleDetalleVenta}
              >
                <h1>{'Finish' ? 'Siguiente' : 'Finish'}</h1>
              </Button>
            </div>
          </div>
        </div>

        <img className="imgCont" src={Venta} alt="" />
      </div>
    </div>
  );
};
