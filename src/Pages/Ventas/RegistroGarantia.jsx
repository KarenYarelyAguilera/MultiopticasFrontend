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
import { TextField } from '@mui/material';
import axios from 'axios';

const urlGarantia = 'http://localhost:3000/api/garantias/crear';
const urlProductos = 'http://localhost:3000/api/productos';



export const RegistroGarantia = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {

  const [Productos, setProductos] = useState([])
  

  const [mesesGarantia, setGarantia] = React.useState('');
  const [mensaje, setmensaje] = React.useState('');
  const [errormesesGarantia, seterrormesesGarantia] = React.useState(false);

  const [descripcion, setDescripcion] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorDescripcion, setErrorDescripcion] = React.useState(false);


  useEffect(() => {
    axios.get(urlProductos).then(response => {
      setProductos(response.data)
    }).catch(error => console.log(error))
  }, []);

  const navegate = useNavigate();


  const handleNext = async () => {

    let IdProducto = parseInt(document.getElementById("IdProducto").value)
   
    let mesesGarantia = document.getElementById("mesesGarantia").value
    let estado = parseInt(document.getElementById("estado").value)  
    let descripcion = document.getElementById("descripcion").value


    let data = {
      descripcion: descripcion,
      mesesGarantia: mesesGarantia,
      IdProducto: IdProducto,
      estado: estado
    }

    await axios.post(urlGarantia, data).then(response => {
      swal('Garantia agregada con exito', '', 'success').then(result => {
        navegate('/menuVentas/listaGarantias');
      });

    }).catch(error => {
      console.log(error);
      swal('Error al registrar la garantia', '', 'success')
    })

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
          Complete todos los puntos para poder registrar la garantia.
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

                  if (mesesGarantia === '') {
                    seterrormesesGarantia(true);
                    setmensaje('Los campos no deben estar vacios');
                  }
                  else {
                   /*  seterrormesesGarantia(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(mesesGarantia)) {
                      seterrormesesGarantia(true);
                       //setTexto('Solo deben de ingresar numeros');
                    } else {
                      seterrormesesGarantia(false);
                       //setTexto('');
                    } */
                  }
                }}
                type="text"
                name=""
                maxLength={2}
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

                onKeyDown={(e) => {
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
                    var expresion = /^[a-zA-Z0-9]+$/;
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

                onClick={() => {


                  handleNext()

                }}

                

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