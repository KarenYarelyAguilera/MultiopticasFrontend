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
const urlProducto = 'http://localhost:3000/api/productos';
const urlLente = 'http://localhost:3000/api/lentes';
const urlDescuento = 'http://localhost:3000/api/Descuento';
const urlDescuentoLente = 'http://localhost:3000/api/DescuentosLentes';
const urlPromocion = 'http://localhost:3000/api/promociones';
const urlGarantia = 'http://localhost:3000/api/garantias';
const urlVenta = 'http://localhost:3000/api/Ventas/NuevaVenta';
const urlBitacoraInsertVenta = 'http://localhost:3000/api/bitacora/insertventa';


export const DetallesDeVenta = (props) => {

  const [Producto, setProducto] = useState([]);
  const [Lente, setLente] = useState([]);
  const [Descuento, setDescuento] = useState([]);
  const [DescuentoLente, setDescuentoLente] = useState([]);
  const [Promocion, setPromocion] = useState([]);
  const [Garantia, setGarantia] = useState([]);

  const [selectedAros, setSelectedAros] = useState(null); // Estado para la opción seleccionada
  const [selectedPromocion, setSelectedPromocion] = useState(null);
  const [selectedGarantia, setSelectedGarantia] = useState(null);



  useEffect(() => {
    fetch(urlProducto).then(response => response.json()).then(data => setProducto(data))
    fetch(urlDescuento).then(response => response.json()).then(data => setDescuento(data))
    fetch(urlPromocion).then(response => response.json()).then(data => setPromocion(data))
    fetch(urlGarantia).then(response => response.json()).then(data => setGarantia(data))
  }, [])

  const navegate = useNavigate();

  const handleNext = async () => {

    let producto = selectedAros.value;
    let Descuento = parseInt(document.getElementById('descuentoAro').value);
    let Promocion = selectedPromocion.value;
    let Garantia = selectedGarantia.value;
    let cantidad = parseInt(document.getElementById("Cantidad").value)
    let lente = parseFloat(document.getElementById("lente").value)

    let data = {
      IdGarantia: Garantia,
      IdDescuento: Descuento,
      IdPromocion: Promocion,
      IdProducto: producto,
      cantidad: cantidad,
      precioLente: lente,
      idUsuario: props.idUsuario
    }

    data = { ...props.venta, ...data }

    //Funcion de bitacora 
    //  let dataUsuario={
    //   Id:props.idUsuario
    // }



    swal({
      title: "Confirmar venta",
      icon: "warning",
      buttons: {
        cancel: "Cancelar",
        confirm: "Confirmar",
      },
    }).then((result) => {
      if (result) {//axios
        axios.post(urlVenta, data).then((response) => {
          props.dataVenta(response.data)
          swal("Venta registrada con exito", "", "success").then(() => navegate('/menuVentas/PagoDeVenta'))
          // axios.post(urlBitacoraInsertVenta,dataUsuario)
        })
      } else {//se cancela todo alv

      }
    });


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
              <div className="contInput">
                <Select
                  id="producto"
                  // className="inputCustomPreguntas"
                  options={Producto.map(pre => ({ value: pre.IdProducto, label: `${pre.descripcion} L${pre.precio}` }))}
                  value={selectedAros}
                  onChange={setSelectedAros}
                  placeholder="Seleccione un Aro"
                />
              </div>
            </div>


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


            <div className="contInput">
              <TextCustom text="Promocion de venta:" className="titleInput" />
              <div className="contInput">
                <Select
                  id="promocion"
                  // className="inputCustomPreguntas"

                  options={Promocion.map(pre => ({ value: pre.IdPromocion, label: `${pre.descripcion} - ${pre.descPorcent}` }))}
                  value={selectedPromocion}
                  onChange={setSelectedPromocion}
                  placeholder="Seleccione una Promocion"
                />
              </div>
            </div>

            <div className="contInput">
              <TextCustom text="Garantia de venta:" className="titleInput" />
              <div className="contInput">
                <Select
                  id="garantia"
                  // className="inputCustomPreguntas"
                  options={Garantia.map(pre => ({value: pre.IdGarantia, label: `${pre.descripcion} - ${pre.Meses}` }))}
                  value={selectedGarantia}
                  onChange={setSelectedGarantia}
                  placeholder="Seleccione una Garantia"
                />
              </div>
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

            {/* <div className="contInput">
              <TextCustom text="Precio del lente" className="titleInput" />
              <div className="contInput">
                <Select
                  id="lente"
                  // className="inputCustomPreguntas"
                  options={Lente.map(pre => ({label: `${pre.lente} L.${pre.precio}` }))}
                  value={selectedOption}
                  onChange={setSelectedOption}
                  placeholder="Seleccione un Lente"
                />
              </div>
            </div> */}

            <div className="contInput">
              <TextCustom text="Precio del lente" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Precio del lente"
                id="lente"
              />
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  var cantidad = parseInt(document.getElementById("Cantidad").value)
                  var lente = parseFloat(document.getElementById("lente").value)

                  if (cantidad === "" || lente === "") {
                    swal("No deje campos vacíos.", "", "error");
                  } else if (isNaN(parseInt(cantidad))) {
                    swal("El campo cantidad solo acepta números.", "", "error");
                  } else if (isNaN(parseFloat(lente))) {
                    swal("El campo precio de lente solo acepta números.", "", "error");
                  } else if (cantidad <= 0) {
                    swal("El campo cantidad no acepta valores negativos.", "", "error");
                  } else if (lente <= 0) {
                    swal("El campo precio de lente no acepta valores negativos.", "", "error");
                  }
                  else {

                    handleNext();
                  }
                }
                }
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