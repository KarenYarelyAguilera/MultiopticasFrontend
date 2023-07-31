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

export const RegistroDepartamento = ({
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

  const [marca, setmarca] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorMarca, setErrorMarca] = React.useState(false);

  const [nombremarca, setnombremarca] = React.useState('');
  const [aviso, setaviso] = React.useState('');
  const [errornombremarca, setErrornombremarca] = React.useState(false);

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
    navegate('/config/ListaDepartamentos');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Registro De Departamento</h2>
        <h3>
          Complete todos los puntos para poder registrar los departamentos.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            

            <div className="contInput">

              <TextCustom text="Departamento" className="titleInput" />

              <input
               
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Departamento"
                id="Departamento"
              />
               {/* <p class="error">{aviso}</p> */}
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
            'https://static.vecteezy.com/system/resources/previews/010/351/676/non_2x/rewriting-text-color-icon-illustration-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};