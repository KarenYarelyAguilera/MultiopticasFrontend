import React from 'react';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sendData } from '../../scripts/sendData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


//Styles
import '../../Styles/Usuarios.css';

//Components
//import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { ContentPasteGoOutlined } from '@mui/icons-material';

const  urlSucursal ='http://localhost/APIS-Multioptica/Gestion/controller/gestion.php?op=InsertSucursal';

export const RegistroSucursal = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {

  const [sucursales, setSucursales] = useState([]);

  const navegate = useNavigate();

  const handleNext = () => {
    let departamento = document.getElementById('departamento').value;
    let ciudad = document.getElementById('ciudad').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;

    let data = {
      departamento:departamento,
      ciudad:ciudad,
      direccion:direccion,
      telefono:telefono
    };

  console.log(data)  
  if (sendData(urlSucursal, data)) {
    swal('Sucursal agregada con exito','', 'success').then(result => {
      navegate('/config/RegistroSucursal');
    });
  }
    // if (sendData(urlSucursal, data)) {
    //   swal('Sucursal agregada con exito',"", 'success')
    //     navegate('/config/RegistroSucursal');
    //   };
  };

  const handleBack = () => {
    navegate('/config');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Registro de Sucursal</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos del modelo.
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
                maxLength={13}
                className="inputCustom"
                
                placeholder="departamento"
                id="departamento"
              />
             
            </div>

            <div className="contInput">
              <TextCustom text="Ciudad" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                
                placeholder="ciudad"
                id="ciudad"
              />
              
            </div>

            <div className="contInput">
              <TextCustom text="Direccion" className="titleInput" />

              <input
               
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                
                placeholder="direccion"
                id="direccion"
              />
              
            </div>

            <div className="contInput">
              <TextCustom text="Telefono" className="titleInput" />

              <input
               
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                
                placeholder="telefono"
                id="telefono"
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
            'https://static.vecteezy.com/system/resources/previews/005/005/494/non_2x/the-central-cloud-server-has-many-branch-offices-free-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};