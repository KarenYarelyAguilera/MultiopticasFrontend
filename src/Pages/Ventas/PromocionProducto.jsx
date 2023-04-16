
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


const urlPromocionProducto ='http://localhost/APIS-Multioptica/Venta/controller/venta.php?op=InsertProductoPromocion';
const urlProducto ='http://localhost/APIS-Multioptica/producto/controller/producto.php?op=Productos';
const urlPromocion = 'http://localhost/APIS-Multioptica/Venta/controller/venta.php?op=Promociones';


export const PromocionProducto = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };
  // const [sucursales, setSucursales] = useState([]);

  // const [iIdentidad, setiIdentidad] = React.useState('');
  // const [leyenda, setleyenda] = React.useState('');
  // const [errorIdentidad, setErrorIdentidad] = React.useState(false);

  // const [Nombre, setNombre] = React.useState('');
  // const [errorNombre, setErrorNombre] = React.useState(false);
  // const [Msj, setMsj] = React.useState(false);

  // const [Apellido, setApellido] = React.useState('');
  // const [errorApellido, setErrorApellido] = React.useState(false);
  // const [aviso, setAviso] = React.useState(false);

  // const [errorTelefono, setErrorTelefono] = React.useState(false);
  // const [texto, setTexto] = React.useState(false);

  // const [Telefono, setTelefono] = useState('');

  // const [Identidad, setIdentidad] = useState(0);
  // const [Telefonoc, setTelefonoc] = useState(0);

const[Producto, setProducto]= useState([]);
const[Promocion, setPromocion]= useState([]);

useEffect(()=>{
  fetch(urlProducto).then(response =>response.json()).then(data=>setProducto(data))
  fetch(urlPromocion).then(response =>response.json()).then(data=>setPromocion(data))
},[])

  const navegate = useNavigate();

  const handleNext = () => {
    let IdPromocion = parseInt(document.getElementById('Promocion').value);
    let IdProducto = parseInt(document.getElementById('Producto').value);

    let data = {
      IdPromocion:IdPromocion,
      IdProducto:IdProducto

    };
    
console.log(data)

    if (sendData(urlPromocionProducto, data)) {
      swal('Promocion de producto agregada con exito', '', 'success').then(result => {
        navegate('/menuVentas/PromocionProducto');
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
        <h2>Registro Promocion de Producto</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos Promocion de Producto.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
           
          <div className="contInput">
              <TextCustom text="Promocion" className="titleInput" />
              <select name="" className="selectCustom" id="Promocion">
              {Promocion.length ? (
                  Promocion.map(pre => (
                    <option key={pre.IdPromocion} value={pre.IdPromocion}>
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
              <TextCustom text="Producto" className="titleInput" />
              <select name="" className="selectCustom" id="Producto">
              {Producto.length ? (
                  Producto.map(pre => (
                    <option key={pre.IdProducto} value={pre.IdProducto}>
                      {pre.producto}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>
                )}
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
            'https://static.vecteezy.com/system/resources/previews/013/590/422/non_2x/businessman-analyzing-data-illustration-concept-on-white-background-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};