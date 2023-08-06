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

export const PagoDeVenta = ({
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
    navegate('/menuVentas/CalculosDeVenta');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Pago De La Venta</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos de Pago de la Venta.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

          <div className="contInput">
              <TextCustom text="Metodo de Pago" className="titleInput" />
              <select name="" className="selectCustom" id="Metodo de Pago">
                <option value={1}>Sin informacion</option>
                <option value={2}>Sin informacion</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select name="" className="selectCustom" id="Estado">
                <option value={1}>Sin informacion</option>
                <option value={2}>Sin informacion</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Saldo Abonado" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Saldo Abonado"
                id="Sado Abonado"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Saldo Restante" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Saldo Restante"
                id="Saldo Restante"
              />
            </div>

            

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={handleNext}
              >
                <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>
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