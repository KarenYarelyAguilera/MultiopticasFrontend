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


const urlGarantias ='http://localhost/APIS-Multioptica/Venta/controller/venta.php?op=InsertGarantia';
const urlProducto = "http://localhost/APIS-Multioptica/producto/controller/producto.php?op=Productos";

export const RegistroGarantia = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };
  const [Productos, setProductos] = useState([])
  
  useEffect(()=>{
    fetch(urlProducto).then(response =>response.json()).then(data=>setProductos(data))
  },[])

  const navegate = useNavigate();

  console.log(Productos);

  const handleNext = () => {

    let idProducto = parseInt(document.getElementById("producto").value)
    let meses = document.getElementById("meses").value
    let estado = document.getElementById("estado").value
    let descripcion = document.getElementById("descripcion").value

    let data = {
      descripcion:descripcion,
      mesesGarantia:meses,
      IdProducto:idProducto,
      estado:estado
    }

    if (sendData(urlGarantias,data)) {
      swal("Garantia registrada con exito","","success")
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
        <h2>Registro de Garantia</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos del modelo.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
           
          <div className="contInput">
              <TextCustom text="ID Producto" className="titleInput" />
              <select name="" className="selectCustom" id="producto">
              {Productos.length ? (
                  Productos.map(pre => (
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

            <div className="contInput">
              <TextCustom text="Meses" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Meses"
                id="meses"
              />
            </div>
            

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select name="" className="selectCustom" id="estado">
                <option value={1}>Activo</option>
                <option value={2}>Inactivo</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Descripcion" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustomText"
                placeholder="Descripcion"
                id="descripcion"
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
            'https://static.vecteezy.com/system/resources/previews/015/655/076/non_2x/health-insurance-icon-isometric-style-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};