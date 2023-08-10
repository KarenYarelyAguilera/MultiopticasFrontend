import React from 'react';
import Button from '@mui/material/Button';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import ReactModal from 'react-modal';
import jsPDF from 'jspdf';

//Styles
import '../../Styles/Usuarios.css';

//Components
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';


const urlPago = 'http://localhost:3000/api/pagos/crear';
const urlMetodoPago = 'http://localhost:3000/api/tipopago';
const urlEstadoVenta = 'http://localhost:3000/api/VentasEstados';

export const PagoDeVenta = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {

  const [MetodoPago, setMetodo] = useState([]);
  const [EstadoVenta, setEstado] = useState([]);
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().slice(0, 10));
  const [Abono, setAbono] = React.useState('');
  const [Restante, setRestante] = React.useState('');

  useEffect(() => {
    fetch(urlMetodoPago).then(response => response.json()).then(data => setMetodo(data))
    fetch(urlEstadoVenta).then(response => response.json()).then(data => setEstado(data))
  }, [])


  const navegate = useNavigate();

  const handleNext = () => {

    let MetodoPago= parseInt(document.getElementById('metodopago').value);
    let saldoAbono= document.getElementById('saldoabono').value;
    let saldoRestante= document.getElementById('saldorestante').value;


    let data={
      IdPago: MetodoPago,
      fecha: fechaActual,
      saldoAbono: saldoAbono,
      saldoRestante: saldoRestante
      
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
              <select name="" className="selectCustom" id="metodopago">
              {MetodoPago.length ? (
                  MetodoPago.map(pre => (
                    <option key={pre.IdTipoPago} value={pre.IdTipoPago}>
                      {pre.descripcion}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>

                )}
              </select>
            </div>

          {/*   <div className="contInput">
              <TextCustom text="Fecha" className="titleInput" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha"
                id="fecha"
                value={fechaActual}
                disabled
              /> 
            </div> */}

            <div className="contInput">
              <TextCustom text="Saldo Abonado" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Saldo Abonado"
                id="saldoAbono"
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
                id="saldoRestante"
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