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

export const RegistroMarcas = ({
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
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Registro de Marcas</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos de la Marca.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
             
             <TextCustom text="ID Marca" className="titleInput" />
              <input
                 onKeyDown={e => {
                setmarca(e.target.value);
                if (marca === '') {
                  setErrorMarca(true);
                  setleyenda('Los campos no deben estar vacios');
                } else {
                  setErrorMarca(false);
                  var preg_match = /^[0-9]+$/;
                  if (!preg_match.test(marca)) {
                    setErrorMarca(true);
                    setleyenda('Solo deben de ingresar numeros');
                  } else {
                    setErrorMarca(false);
                    setleyenda('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="ID Marca"
                id="idMarca"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Nombre de la Marca" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Nombre de la Marca"
                id="Marca"
              />
               <p class="error">{aviso}</p>
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