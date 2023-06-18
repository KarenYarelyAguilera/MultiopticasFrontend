import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Styles
import '../../Styles/Usuarios.css';

//Components
import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';


const urlProducto="http://localhost/APIS-Multioptica/producto/controller/producto.php?op=InsertProducto"
const urlModelos="http://localhost/APIS-Multioptica/producto/controller/producto.php?op=Modelos"

export const RegistroProducto = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {

  const [Modelo, setModelo] = useState([])

  useEffect(()=>{
    fetch(urlModelos).then(response =>response.json()).then(data =>setModelo(data))
  },[])


  const navegate = useNavigate();

  const [leyenda, setleyenda] = React.useState('');
  const [errorproducto, setErrorproducto] = React.useState(false);
  const [producto, setproducto] = React.useState(false);

  const [precio, setprecio] = React.useState('');
  const [errorprecio, setErrorprecio] = React.useState(false);
  const [aviso, setaviso] = React.useState(false);

  const [cantidadmax, setcantidadmax] = React.useState('');
  const [mensaje, setmensaje] = React.useState('');
  const [errorcantidadmax, setErrorcantidadmax] = React.useState(false);

  const [cantidadmin, setcantidadmin] = React.useState('');
  const [advertencia, setadvertencia] = React.useState('');
  const [errorcantidadmin, setErrorcantidadmin] = React.useState(false);

  const [descrpcion, setdescripcion] = React.useState('');
  const [msj, setmsj] = React.useState('');
  const [errordescripcion, setErrordescripcion] = React.useState(false);



  const handleNext = () => {
   
    let data = {
      IdProducto:parseInt(document.getElementById("idProducto").value),
      IdModelo:parseInt(document.getElementById("modelo").value),
      precio:document.getElementById("precio").value,
      cantidadMin:parseInt(document.getElementById("cantMin").value),
      cantidadMax:parseInt(document.getElementById("cantMax").value),
      descripcion:document.getElementById("producto").value
    };

    if (sendData(urlProducto, data)) {
      swal('Producto agregado con exito', '', 'success').then(result => {
        navegate('/menuInventario/ListaProductos');
      });
    }
  };

  const handleBack = () => {
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Registro de Producto</h2>
        <h3>
          Complete todos los puntos para poder registrar el producto.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
            <TextCustom text="ID Producto" className="titleInput" />

              <input
                   onKeyDown={e => {
                    setproducto(e.target.value);
                    if (producto === '') {
                      setErrorproducto(true);
                      setleyenda('Los campos no deben estar vacios');
                    } else {
                      setErrorproducto(false);
                      var preg_match = /^[0-9]+$/;
                      if (!preg_match.test(producto)) {
                        setErrorproducto(true);
                        setleyenda('Solo deben de ingresar numeros');
                      } else {
                        setErrorproducto(false);
                        setleyenda('');
                      }
                    }
                  }}
                error={errorproducto}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="ID Marca"
                id="idProducto"
              />
              <p class="error">{leyenda}</p>
            </div>
            

            <div className="contInput">
              <TextCustom text="ID Modelo" className="titleInput" />
              <select name="" className="selectCustom" id="modelo">
              {Modelo.length ? (
                  Modelo.map(pre => (
                    <option key={pre.IdModelo} value={pre.IdModelo}>
                      {pre.detalle}
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
              <TextCustom text="Precio" className="titleInput" />

              <input
               onKeyDown={e => {
                setprecio(e.target.value);
                if (precio === '') {
                  setErrorprecio(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrorprecio(false);
                  var preg_match = /^[0-9]+$/;
                  if (!preg_match.test(precio)) {
                    setErrorprecio(true);
                    setaviso('Solo deben de ingresar numeros');
                  } else {
                    setErrorprecio(false);
                    setaviso('');
                  }
                }
              }}
                error={errorprecio}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Precio"
                id="precio"
              />
              <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Cantidad Maxima" className="titleInput" />

              <input
              onKeyDown={e => {
                setcantidadmax(e.target.value);
                if (cantidadmax === '') {
                  setErrorcantidadmax(true);
                  setmensaje('Los campos no deben estar vacios');
                } else {
                  setErrorcantidadmax(false);
                  var preg_match = /^[0-9]+$/;
                  if (!preg_match.test(cantidadmax)) {
                    setErrorcantidadmax(true);
                    setmensaje('Solo deben de ingresar numeros');
                  } else {
                    setErrorcantidadmax(false);
                    setmensaje('');
                  }
                }
              }}
                error={errorcantidadmax}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Cantidad Maxima"
                id="cantMax"
              />
              <p class="error">{mensaje}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Cantidad Minima" className="titleInput" />
            
              <input
              onKeyDown={e => {
                setcantidadmin(e.target.value);
                if (cantidadmin === '') {
                  setErrorcantidadmin(true);
                  setadvertencia('Los campos no deben estar vacios');
                } else {
                  setErrorcantidadmin(false);
                  var preg_match = /^[0-9]+$/;
                  if (!preg_match.test(cantidadmin)) {
                    setErrorcantidadmin(true);
                    setadvertencia('Solo deben de ingresar numeros');
                  } else {
                    setErrorcantidadmin(false);
                    setadvertencia('');
                  }
                }
              }}
                error={errorcantidadmin}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Cantidad Minima"
                id="cantMin"
              />
              <p class="error">{advertencia}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Descripcion del Producto" className="titleInput" />
              <input
               onKeyDown={e => {
                setdescripcion(e.target.value);
                if (descrpcion == '') {
                  setErrordescripcion(true);
                  setmsj('Los campos no deben estar vacios');
                }  else {
                    setErrordescripcion(false);
                    setmsj('');
                  }
                }
              }
                error={errordescripcion}
                type="text"
                name=""
                maxLength={60}
                className="inputCustomText"
                placeholder="Descripcion del Producto"
                id="producto"
              />
               <p class="error">{msj}</p>
            </div>
            

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={handleNext}
              >
                <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>
              </Button>
            </div>
          </div>
        </div>

        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/007/059/184/non_2x/abstract-button-icon-folder-with-documents-on-a-white-background-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};