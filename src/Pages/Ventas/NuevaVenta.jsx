import React from 'react';
import Button from '@mui/material/Button';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Styles
import '../../Styles/Usuarios.css';

//Components
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';


const urlVenta = 'http://localhost/APIS-Multioptica/Venta/controller/venta.php?op=InsertVenta';

export const NuevaVenta = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {


  const navegate = useNavigate();

  const handleNext = () => {

    let data={
      fecha:new Date(),
      fechaLimiteEntrega:document.getElementById("fechaLimite").value,
      fechaEntrega:document.getElementById("fechaEntrega").value,
      estado:parseInt(document.getElementById("estado").value),
      observacion:document.getElementById("observacion").value,
      
    }

    navegate('/menuVentas/DetalleVenta');

  };

  const handleBack = () => {
    navegate('/ventas');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Nueva Venta</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos de Nueva Venta.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <div className="contInput">
              <TextCustom text="Identidad del Cliente" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Cliente"
                id="Nidentidad"
              />
            </div>

            <div className="contInput">
              <TextCustom text="RTN" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="RTN"
                id="RTN"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Empleado" className="titleInput" />
              <select name="" id="empleado">

              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Fecha de Entrega" className="titleInput" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha de Entrega"
                id="fechaEntrega"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Fecha Limite de Entrega" className="titleInput" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha Limite de Entrega"
                id="fechaLimite"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select name="" className="selectCustom" id="estado">
                <option value={1}>Pendiente</option>
                <option value={2}>Finalizado</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Observacion" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustomText"
                placeholder="Observacion"
                id="observacion"
              />
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={handleNext}
              >
                <h1>{'Finish' ? 'Siguiente' : 'Finish'}</h1>
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>

        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/018/942/487/non_2x/business-strategic-planning-illustration-concept-on-white-background-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};