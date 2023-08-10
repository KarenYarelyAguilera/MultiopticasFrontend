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


//URLS
const urlVentaDetalle = 'http://localhost:3000/api/Ventas/NuevaVentaDetalle';
const urlProducto = 'http://localhost:3000/api/productos';
const urlLente = 'http://localhost:3000/api/lentes';
const urlDescuento = 'http://localhost:3000/api/Descuento';
const urlDescuentoLente = 'http://localhost:3000/api/DescuentosLentes';
const urlPromocion = 'http://localhost:3000/api/promociones';
const urlGarantia = 'http://localhost:3000/api/garantias';

export const DetallesDeVenta = (props) => {

  const [Producto, setProducto] = useState([]);
  const [Lente, setLente] = useState([]);
  const [Descuento, setDescuento] = useState([]);
  const [DescuentoLente, setDescuentoLente] = useState([]);
  const [Promocion, setPromocion] = useState([]);
  const [Garantia, setGarantia] = useState([]);


  useEffect(() => {
    fetch(urlProducto).then(response => response.json()).then(data => setProducto(data))
    fetch(urlLente).then(response => response.json()).then(data => setLente(data))
    fetch(urlDescuento).then(response => response.json()).then(data => setDescuento(data))
    fetch(urlDescuentoLente).then(response => response.json()).then(data => setDescuentoLente(data))
    fetch(urlPromocion).then(response => response.json()).then(data => setPromocion(data))
    fetch(urlGarantia).then(response => response.json()).then(data => setGarantia(data))
  }, [])

  const navegate = useNavigate();

  const handleNext = async () => {

    let Producto = parseInt(document.getElementById('producto').value);
    let Lente = parseInt(document.getElementById('lente').value);
    let Descuento = parseInt(document.getElementById('descuentoAro').value);
    let DescuentoLente = parseInt(document.getElementById('descuentoLente').value);
    let Promocion = parseInt(document.getElementById('promocion').value);
    let Garantia = parseInt(document.getElementById('garantia').value);


    let data = {
      IdGarantia: Garantia,
      IdDescuento: Descuento,
      IdDescuentoLente: DescuentoLente,
      IdPromocion: Promocion,
      IdProducto: Producto,
      IdLente: Lente,
    }

    /* await axios.post(urlVentaDetalle, data).then(response => {
      swal('Detalles registrados exitosamente, continue con el proceso', '', 'success').then(result => {
        navegate('/menuVentas/CalculosDeVenta');
      });

    }).catch(error => {
      console.log(error);
      swal("Error al registrar venta.", "", "error")
    })
 */
console.log(data);

  };

  const handleBack = () => {
    navegate('/menuVentas/NuevaVenta');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Detalles de Venta</h2>
        <h3>
          Complete todos los puntos para poder registrar los Detalles de Venta.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <div className="contInput">
              <TextCustom text="Aros:" className="titleInput" />
              <select name="" className="selectCustom" id="producto">
                {Producto.length ? (
                  Producto.map(pre => (
                    <option key={pre.IdProducto} value={pre.IdProducto}>
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
{/* 
            <div className="contInput">
              <TextCustom text="Tipo de Lente:" className="titleInput" />
              <select name="" className="selectCustom" id="lente">
              {Lente.length ? (
                  Lente.map(pre => (
                    <option key={pre.IdLente} value={pre.IdLente}>
                      {pre.lente}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>

                )}
              </select>
            </div> */}

            <div className="contInput">
              <TextCustom text="Descuento Aro:" className="titleInput" />
              <select name="" className="selectCustom" id="descuentoAro">
              {Descuento.length ? (
                  Descuento.map(pre => (
                    <option key={pre.IdDescuento} value={pre.IdDescuento}>
                      {pre.descPorcent}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>

                )}
              </select>
            </div>

           {/*  <div className="contInput">
              <TextCustom text="Descuento Lente:" className="titleInput" />
              <select name="" className="selectCustom" id="descuentoAro">
              {DescuentoLente.length ? (
                  DescuentoLente.map(pre => (
                    <option key={pre.IdDescuentoLente} value={pre.IdDescuentoLente}>
                      {pre.descuentoLente}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>

                )}
              </select>
            </div> */}

            <div className="contInput">
              <TextCustom text="Promocion de venta:" className="titleInput" />
              <select name="" className="selectCustom" id="promocion">
              {Promocion.length ? (
                  Promocion.map(pre => (
                    <option key={pre.IdPromocion} value={pre.IdPromocion}>
                      {pre.descPorcent}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>

                )}
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Garantia de venta:" className="titleInput" />
              <select name="" className="selectCustom" id="garantia">
              {Garantia.length ? (
                  Garantia.map(pre => (
                    <option key={pre.IdGarantia} value={pre.IdGarantia}>
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

            <div className="contInput">
              <TextCustom text="Cantidad" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Cantidad"
                id="Cantidad"
              />
            </div>

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