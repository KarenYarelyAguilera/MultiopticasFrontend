import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Styles
import '../../Styles/Usuarios.css';

//Components
import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';


const urlPromocion = 'http://localhost/APIS-Multioptica/Venta/controller/venta.php?op=InsertPromocion';

export const RegistroPromocion = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };
  
  const navegate = useNavigate();

  const handleNext = () => {

    let descPorcent = document.getElementById('descPorcent').value;
    let fechaInicial = document.getElementById('fechaInicial').value;
    let fechaFinal = document.getElementById('fechaFinal').value;
    let estado = document.getElementById('estado').value;
    let descripcion = document.getElementById('descripcion').value;

    let data = {
      descPorcent:descPorcent,
      fechaInicial:fechaInicial,
      fechaFinal:fechaFinal,
      estado:estado,
      descripcion:descripcion
    };
    if (sendData(urlPromocion, data)) {
      swal('Promocion agregada con exito', '', 'success').then(result => {
        navegate('/menuVentas/RegistroPromociones');
      });
    }
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
        <h2>Registro de Promocion</h2>
        <h3>
          Complete todos los puntos para poder registrar las Promociones.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
           
            <div className="contInput">
              <TextCustom text="Porcentaje de Descuento" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Porcentaje de Descuento"
                id="descPorcent"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Fecha de Inicio" className="titleInput" />
              <input
                type="date"
                name=""
                // helperText={texto}
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha de Inicio"
                id="fechaInicial"
              />
              
            </div>
            
            <div className="contInput">
              <TextCustom text="Fecha Final" className="titleInput" />
              <input
                type="date"
                name=""
                // helperText={texto}
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha Final"
                id="fechaFinal"
              />
        
            </div>

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select name="" className="selectCustom" id="estado">
                <option value={1}>Activo</option>
                <option value={2}>Inactivo</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Descripcion" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustomText"
                placeholder="Descripcion"
                id="descripcion"
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
            'https://static.vecteezy.com/system/resources/previews/010/885/906/non_2x/refer-friend-illustration-service-loyalty-referral-man-and-woman-marketing-business-design-concept-network-recommend-announcement-advertising-program-banner-digital-tell-job-commerce-earn-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};