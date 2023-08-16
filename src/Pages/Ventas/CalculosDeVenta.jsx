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
import axios from 'axios';
import { async } from 'q';

export const CalculosDeVenta = (props) => {
  const urlVenta = 'http://localhost:3000/api/Ventas/NuevaVentaDbdb';


  const navegate = useNavigate();

  const handleNext = async () => {

    swal({
      title: "Confirmar venta",
      icon: "warning",
      buttons: {
        cancel: "Cancelar",
        confirm: "Confirmar",
      },
    }).then(async (result) => {
      if (result) {
        axios.post(urlVenta,props.venta).then((response) => {
          swal("Venta registrada con exito", "", "success").then(() => {
            const dataResp = {...props.venta,...response.data}
            props.dataVenta(dataResp)
            navegate('/menuVentas/PagoDeVenta')})
          // axios.post(urlBitacoraInsertVenta,dataUsuario)
        })
      } else {//se cancela todo alv

      }
    });
    

  };

  const handleBack = () => {
    navegate('/menuVentas/DetallesDeVenta');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Calculos de Venta</h2>
        <h3>
          .
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

          
              <TextCustom text="Precio del Aro:" className="titleInput" />
              <label>{props.venta.precioAro}</label>
           

              <TextCustom text="Descuento:" className="titleInput" />
              <label >{props.venta.descuento}</label>
             
              <TextCustom text="Aro con descuento:" className="titleInput" />
              <label >{props.venta.nuevoPrecio}</label>
        
    
              <TextCustom text="Precio de Lente" className="titleInput" />
              <label >{props.venta.precioLente}</label>
  
  
              <TextCustom text="Cantidad" className="titleInput" />
              <label>{props.venta.cantidad}</label>
              <TextCustom text="Subtotal" className="titleInput" />
              <label>{props.venta.subtotal}</label>
              <TextCustom text="Rebaja" className="titleInput" />
              <label>{props.venta.rebaja}</label>
              <TextCustom text="Total de la venta" className="titleInput" />
              <label>{props.venta.total}</label>
           

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={handleNext}
              >
                <h1>{'Finish' ? 'Siguiente' : 'Finish'}</h1>
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