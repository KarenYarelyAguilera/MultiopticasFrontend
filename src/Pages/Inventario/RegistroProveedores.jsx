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

export const RegistroProveedores = ({
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
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Registro de Proveedores</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos de los Proveedores.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Empresa Proveedora" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="Empresa Proveedora"
                id="idMarca"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Codigo Postal" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="Codigo Postal"
                id="Marca"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Persona Encargada" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="ID Persona Encargada"
                id="idMarca"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Pais" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="Pais"
                id="Marca"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Telefono" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="Telefono"
                id="idMarca"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Ciudad" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="Ciudad"
                id="Marca"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Correo Electronico" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="Correo Electronico"
                id="Marca"
              />
            </div>
            
            <div className="contInput">
              <TextCustom text="Direccion" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustomText"
                placeholder="Direccion"
                id="modelo"
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
            'https://static.vecteezy.com/system/resources/previews/014/049/158/non_2x/flat-cloud-data-storage-remote-backup-of-files-data-center-and-database-concept-outline-design-style-minimal-illustration-for-landing-page-web-banner-infographics-hero-images-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};