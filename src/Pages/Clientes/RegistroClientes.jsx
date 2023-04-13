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


export const RegistroClientes = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {
  

  useEffect(() => {
    // fetch()
    //   .then(response => response.json())
    //   .then(data => setSucursales(data));
  }, []);

  const navegate = useNavigate();

  const handleNext = () => {

   
    
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
              <TextCustom text="ID Expediente" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Expediente"
                id="Nidentidad"
              />
            </div>

            {/* <div className="contInput">
              <TextCustom text="ID De Detalle de Expediente" className='titleInput'/>
              <input

                onKeyDown={e => {
                  setNombre(e.target.value);
                  if (Nombre === '') {
                    setErrorNombre(true);
                    setMsj('Los campos no deben estar vacios');
                  } else {
                    setErrorNombre(false);
                    var preg_match = /^[a-zA-Z]+$/;
                    if (!preg_match.test(Nombre)) {
                      setErrorNombre(true);
                      setMsj('Solo debe de ingresar letras');
                    } else {
                      setErrorNombre(false);
                      setMsj('');
                    }
                  }
                }}
                error={errorNombre}
                type="text"
                name=""
                className="inputCustom"
                maxLength={50}
                placeholder="ID Expediente"
                variant="standard"
                id="nombre"
                label="Usuario"
              />

              <p className="error">{Msj}</p>
            </div> */}

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select name="" className="selectCustom" id="genero">
                <option value={1}>Actual</option>
                <option value={2}>Historico</option>
              </select>

            </div>

            <div className="contInput">
              <TextCustom text="Diagnostico" className="titleInput" />
              <input
                type="text"
                name=""
                
                maxLength={50}
                className="inputCustomText"
                placeholder="Diagnostico"
                id="apellido"
              />
            </div>

            {/* <div className="contInput">
              <TextCustom text="Historial Clinico" className="titleInput" />
              <input
                type="phone"
                name=""

                helperText={texto}
                maxLength={100}

                className="inputCustomText"
                placeholder="Historial Clinico"
                id="phone"
              />
              {<p className="error">{texto}</p>}
            </div>         */}

            

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
