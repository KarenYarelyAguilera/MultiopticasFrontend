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

  const [garantia, setGarantia] = useState('');
  const [mensaje, setmensaje] = useState('');
  const [errorGarantia, seterrorgarantia] = useState(false);

  const [descripcion, setDescripcion] = useState('');
  const [leyenda, setleyenda] = useState('');
  const [errorDescripcion, setErrorDescripcion] = useState(false);
  
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
                onKeyDown={e => {
                  setGarantia(e.target.value);

                  if (garantia.length > 10) {
                    seterrorgarantia(true);
                  setmensaje('A excedido al numero de caracteres');
                  }
                  if (garantia === '') {
                    seterrorgarantia(true);
                    setmensaje('Los campos no deben estar vacios');
                  }
                   else {
                    seterrorgarantia(false);
                    var expresion = /^[a-zA-Z0-9\s]+$/;
                    if (!expresion.test(garantia)) {
                      seterrorgarantia(true);
                      setmensaje('Formato invalido');
                    }

                     else {
                      seterrorgarantia(false);
                      setmensaje('');
                    }
                  }
                }}
                type="text"
                name=""
                maxLength={11}
                className="inputCustom"
                placeholder="Meses"
                id="meses"
              />
            <p class="error">{mensaje}</p>
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
                    onKeyDown={e => {
                      setDescripcion(e.target.value);
    
                      if (descripcion.length > 100) {
                        setErrorDescripcion(true);
                      setleyenda('A excedido al numero de caracteres');
                      }
                      if (descripcion === '') {
                        setErrorDescripcion(true);
                        setleyenda('Los campos no deben estar vacios');
                      }
                       else {
                        setErrorDescripcion(false);
                        var expresion = /^[a-zA-Z0-9\s]+$/;
                        if (!expresion.test(descripcion)) {
                          setErrorDescripcion(true);
                          setleyenda('Formato invalido');
                        }
                         else {
                          setErrorDescripcion(false);
                          setleyenda('');
                        }
                      }
                    }}
                type="text"
                name=""
                maxLength={100}
                className="inputCustomText"
                placeholder="Descripcion"
                id="descripcion"
              />
              <p class="error">{leyenda}</p>
            </div>
            

            <div className="contBtnStepper">
              <Button
               onClick={() => {
                  swal('Garantia agregada con exito', '', 'success')
                navegate('/menuVentas/listaGarantias')
                handleNext();

              }}
                  
                variant="contained"
                className="btnStepper"
                
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