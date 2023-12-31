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


const urlPago = 'http://194.163.45.55:4000/api/pagos/crear';
const urlMetodoPago = 'http://194.163.45.55:4000/api/tipopago';
const urlEstadoVenta = 'http://194.163.45.55:4000/api/VentasEstados';
const urlInsertPagoB = 'http://194.163.45.55:4000/api/bitacora/insertpago';

export const PagoDeVenta = (props) => {

  const [MetodoPago, setMetodo] = useState([]);
  const [EstadoVenta, setEstado] = useState([]);
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().slice(0, 10));
  const [Abono, setAbono] = React.useState('');
  const [Restante, setRestante] = React.useState();

  useEffect(() => {
    fetch(urlMetodoPago).then(response => response.json()).then(data => setMetodo(data))
    fetch(urlEstadoVenta).then(response => response.json()).then(data => setEstado(data))
  }, [])


  const navegate = useNavigate();

  const handleNext = async () => {

    let MetodoPago= parseInt(document.getElementById('metodopago').value);
    let saldoAbono= parseFloat(document.getElementById('saldoAbono').value);
    let saldoRestante= parseFloat(document.getElementById('saldoRestante').value);


    let data={
      IdVenta:props.venta.id || props.venta.id,
      IdTipoPago: MetodoPago,
      fecha: fechaActual,
      saldoAbono: saldoAbono,
      saldoRestante: saldoRestante
      
    }

    //Funcion de bitacora 
    // let data2={
    //   Id:props.idUsuario
    // }
    console.log(props.venta.id);
    console.log(data);

    if (data.saldoAbono===null) {
      swal("Error al registrar el pago\nEl saldo abonado debe ser númerico","","error")
    }else if (isNaN(data.saldoAbono)) {
      swal("Error al registrar el pago","","error")
    }else if (typeof data.saldoAbono ==="string") {
      swal("Error al registrar el pago\nEl saldo abonado debe ser númerico","","error")
    }else if (data.saldoAbono <=0) {
      swal("Error al registrar el pago\nEl saldo abonado debe ser un numero positivo","","error")
    }else{
      await axios.post(urlPago,data).then(()=>{
       
        swal(`Pago registrado con exito`,"","success").then(()=>{
          //axios.post(urlInsertPagoB,data2)
          if (data.saldoAbono<=data.saldoRestante ) {
            swal(`El saldo restante es de: L.${(data.saldoRestante-data.saldoAbono)}`).then(()=>{
              props.dataVenta({}) 
              navegate('/menuVentas/ListaPagos')
             
            }) 
          }else {
            swal(`El cambio sera de: L${(data.saldoAbono-data.saldoRestante)}`).then(()=>{
              props.dataVenta({}) 
              navegate('/menuVentas/ListaPagos')
             
            })  

          }
          })
        
      }).catch(()=>swal("Error al registrar el pago","","error"))

    }




  };

  const handleBack = () => {
    navegate('/menuVentas/ListaPagos');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Pago De La Venta</h2>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

          <div className="contInput" style={{fontSize:'17px'}}>
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

            <div className="contInput" style={{fontSize:'17px'}}>
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

            <div className="contInput" style={{fontSize:'17px'}}>
              <TextCustom text="Saldo Restante" className="titleInput" />

              <input
                type="text"
                name=""

                value={props.venta.total || props.venta.saldoRestante}

                maxLength={13}
                className="inputCustom"
                placeholder="Saldo Restante"
                id="saldoRestante"
                disabled
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