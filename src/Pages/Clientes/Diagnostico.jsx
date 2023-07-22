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


const urlMarca =
  'http://localhost/APIS-Multioptica/producto/controller/producto.php?op=InsertMarca';

export const Diagnostico = ({
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
    let id = parseInt(document.getElementById("idMarca").value)
    let marca = document.getElementById("Marca").value
    let data = {
      IdMarca: id ,
      descripcion:marca 
    }
    
    if (sendData(urlMarca, data)) {
      swal('Marca agregada con exito', '', 'success').then(result => {
        navegate('/menuInventario/ListaMarcas');
      });
    }
  };

  const handleBack = () => {
    navegate('/menuClientes/DatosExpediente');
  };


  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Diagnostico</h2>
        <h3>
        Complete todos los datos para el historial del paciente.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            
            <div className="contInput">
              <TextCustom text="Esfera OD" className="titleInput" />

              <input
               onKeyDown={e => {
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Esfera OD"
                id="ODEsfera"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Esfera OI" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Esfera OI"
                id="OIEsfera"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Cilindro OD" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Cilindro OD"
                id="ODCilindro"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Eje OD" className="titleInput" />

              <input
            
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Eje OD"
                id="ODEje"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Adicion OD" className="titleInput" />
              <input
               
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Adicion OD"
                id="AdicionOD"
              />
            
            </div>

            <div className="contInput">
              <TextCustom text="Adicion OI" className="titleInput" />

              <input
             
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Adicion OI"
                id="AdicionOI"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Altura OD" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Altura OD"
                id="AlturaOD"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Altura OI" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Altura OI"
                id="AlturaOI"
              />
        
            </div>

            <div className="contInput">
              <TextCustom text="DP OD" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="DP OD"
                id="Marca"
              />
            </div>

            <div className="contInput">
              <TextCustom text="DP OI" className="titleInput" />

              <input
           
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="DP OI"
                id="Marca"
              />
               
            </div>

            <div className="contInput">
              <TextCustom text="Enfermedad Presentada" className="titleInput" />
              <input
             
                type="text"
                name=""
                maxLength={100}
                className="inputCustomText"
                placeholder="Enfermedad Presentada"
                id="direccion"
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

      { /* <imgn
          src={
            'https://static.vecteezy.com/system/resources/previews/010/351/676/non_2x/rewriting-text-color-icon-illustration-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        /> */}
      </div>
    </div>
  );
};


