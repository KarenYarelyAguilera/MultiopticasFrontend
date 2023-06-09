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


const urlCliente =
  'http://localhost/APIS-Multioptica/Venta/controller/venta.php?op=InsertDescuento';

export const RegistroDescuento = ({
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
  const [descuentocliente, setDescuentoCliente] = useState('');
  const [mensaje, setmensaje] = useState('');
  const [errordescuentocliente, setErrorDescuentocliente] = useState(false);

  const [descuentoempleado, setDescuentoEmpleado] = useState('');
  const [advertencia, setadvertencia] = useState('');
  const [errordescuentoempleado, setErrorDescuentoempleado] = useState(false);


  const handleNext = () => {
    let descCliente = parseFloat(document.getElementById("descCliente").value)
    let descEmpleado = parseFloat(document.getElementById("descEmpleado").value)
    let estado = parseInt(document.getElementById("estado").value)

    let data = {
      estado:estado,
      descPorcent:descCliente,
      descPorcentEmpleado:descEmpleado
    };
    if (sendData(urlCliente, data)) {
      swal('Cliente agregado con exito', '', 'success').then(result => {
        navegate('/menuClientes/listaClientes');
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
        <h2>Registro de Descuentos</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos del modelo.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

          <div className="contInput">
              <TextCustom text="Descuento del Cliente" className="titleInput" />

              <input
               onKeyDown={e => {
                setDescuentoCliente(e.target.value);

                if (descuentocliente.length > 10) {
                  setErrorDescuentocliente(true);
                setmensaje('A excedido al numero de caracteres');
                }
                if (descuentocliente === '') {
                  setErrorDescuentocliente(true);
                  setmensaje('Los campos no deben estar vacios');
                }
                 else {
                  setErrorDescuentocliente(false);
                  var expresion = /^\d+(\.\d{1,2})?$/;
                  if (!expresion.test(descuentocliente)) {
                    setErrorDescuentocliente(true);
                    setmensaje('Formato invalido');
                  }
                   else {
                    setErrorDescuentocliente(false);
                    setmensaje('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={10}
                className="inputCustom"
                
                placeholder="Descuento del Cliente"
                id="descCliente"
              />
              <p class="error">{mensaje}</p>

            </div>

            <div className="contInput">
              <TextCustom text="Descuento de Empleado" className="titleInput" />
              <input
                       onKeyDown={e => {
                        setDescuentoEmpleado(e.target.value);
        
                        if (descuentoempleado.length > 10) {
                          setErrorDescuentoempleado(true);
                      setadvertencia('A excedido al numero de caracteres');
                        }
                        if (descuentoempleado === '') {
                          setErrorDescuentoempleado(true);
                          setadvertencia('Los campos no deben estar vacios');
                        }
                         else {
                          setErrorDescuentoempleado(false);
                          var expresion = /^\d+(\.\d{1,2})?$/;
                          if (!expresion.test(descuentoempleado)) {
                            setErrorDescuentoempleado(true);
                            setadvertencia('Formato invalido');
                          }
                           else {
                            setErrorDescuentoempleado(false);
                            setadvertencia('');
                          }
                        }
                      }}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Descuento de Empleado"
                id="descEmpleado"
              />
              <p class="error">{advertencia}</p>

            </div>
           
          <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select name="" className="selectCustom" id="estado">
                <option value={1}>Activo</option>
                <option value={2}>Inactivo</option>
              </select>
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
           'https://static.vecteezy.com/system/resources/previews/002/302/922/non_2x/flash-sale-promos-discounts-and-purchase-bonuses-illustration-suitable-for-landing-page-ui-website-mobile-app-editorial-poster-flyer-article-and-banner-vector.jpg'
        }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};