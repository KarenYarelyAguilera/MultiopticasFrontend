import React from 'react';
import Button from '@mui/material/Button';
import { sendData } from '../../scripts/sendData';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Styles
import '../../Styles/Usuarios.css';

//Components
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';

const urlExpedienteDetalle ='http://localhost/APIS-Multioptica/Expediente/controller/expediente.php?op=InsertDetallesExpediente';

export const RegistroClientes = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {


  const navegate = useNavigate();

  const handleNext = () => {

   let diagnostico = document.getElementById("diagnostico").value
   let HClinico = document.getElementById("HClinico").value

   let data = {
    diagnostico:diagnostico,
    historialClinico:HClinico
   }

   if (sendData(urlExpedienteDetalle,data)) {
    swal("Expediente agregado con exito","","success")
    navegate("/menuClientes/listaExpedientes")
   }
    
  };

  const handleBack = () => {
    navegate('/menuClientes');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Datos de Expediente</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos del cliente
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <div className="contInput">
              <TextCustom text="Diagnostico" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustomText"
                placeholder="Diagnostico"
                id="diagnostico"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Historial Clinico" className="titleInput" />
              <input
                type="phone"
                name=""
                maxLength={100}
                className="inputCustomText"
                placeholder="Historial Clinico"
                id="HClinico"
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
            'https://static.vecteezy.com/system/resources/previews/002/085/434/non_2x/people-work-from-home-in-front-of-computer-with-data-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};
