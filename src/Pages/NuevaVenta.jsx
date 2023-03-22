import React from 'react';
import { Link, useNavigate } from "react-router-dom";

//Images
import venta from "../IMG/mano.png";
import AddUser from '../IMG/AddUser.jpg';

//MuiMaterialIcons
import { Container, Grid, TextField } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

//Components
import { TextCustom } from '../Components/TextCustom.jsx';

//Styles
import "../Styles/Home.css";

export const NuevaVenta = () => {
  const navegate = useNavigate();

  const Empleado = [
    {
      IdEmpleado:'1',
      Nombre:'Michael Sosa',
    }
  ]

  const Rol = [
    {
      IdRol:'1',
      Rol:'Administrador',
    },
    {
      IdRol:'2',
      Rol:'Viewer',
    }
  ]

  const handleBack = () => {
    navegate('/ventas');
  }

  const handleDetalleVenta = () => {
    navegate('/ventas/reportes');
  };
  return (
    <div className="ContUsuarios">
      <Button 
      className='btnBack'
      onClick={handleBack}>
    	  <ArrowBackIcon className='iconBack'/>
      </Button>
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
