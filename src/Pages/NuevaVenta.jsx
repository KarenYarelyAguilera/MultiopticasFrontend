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
                // onClick={insertar}
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
