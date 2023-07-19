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
import axios from 'axios'; 


//APIS DE PROVEEDOR
const urlProveedor = //CREAR
  'http://localhost:3000/api/proveedor/NuevoProveedor';
const urlUpdProveedor = //ACTUALIZAR
  'http://localhost:3000/api/proveedor/ActualizarProveedor';
const urlDelProveedor = //BORRAR
  'http://localhost:3000/api/proveedor/EliminarProveedor';

export const RegistroProveedores = (props) => {
  
  const [proveedores, setProveedores]= useState([]);

  const [proveed, setproveed] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorproveedor, setErrorproveedor] = React.useState(false);

  const [codigopostal, setcodigopostal] = React.useState('');
  const [aviso, setaviso] = React.useState('');
  const [errorcodigopostal, setErrorcodigopostal] = React.useState(false);

  const [nombre, setnombre] = React.useState('');
  const [msj, setmsj] = React.useState('');
  const [errornombre, setErrornombre] = React.useState(false);
 
  const [encargado, setencargado] = React.useState('');
  const [mensaje, setmensaje] = React.useState('');
  const [errorencargado, setErrorencargado] = React.useState(false);

  const [pais, setpais] = React.useState('');
  const [avi, setavi] = React.useState('');
  const [errorpais, setErrorpais] = React.useState(false);

  const [ciudad, setciudad] = React.useState('');
  const [advertencia, setadvertencia] = React.useState('');
  const [errorciudad, setErrorciudad] = React.useState(false);

  const [direccion, setdireccion] = React.useState('');
  const [validacion, setvalidacion] = React.useState('');
  const [errordireccion, setErrordireccion] = React.useState(false);

  const [tel, settel] = React.useState('');
  const [adv, setadv] = React.useState('');
  const [errortel, setErrortel] = React.useState(false);

  const [correo, setcorreo] = React.useState('');
  const [parrafo, setparrafo] = React.useState('');
  const [errorcorreo, setErrorcorreo] = React.useState(false);

  const navegate = useNavigate();


  const handleNext = () => {
    let CiaProveedora = document.getElementById("CiaProveedora").value
    let encargado = document.getElementById("encargado").value;
    let pais = document.getElementById("pais").value;
    let ciudad = document.getElementById("ciudad").value;
    let codigoPostal = document.getElementById("codigoPostal").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let correoElectronico = document.getElementById("correoElectronico").value;
 
    let data = {
      CiaProveedora:CiaProveedora,
      encargado:encargado,
      pais:pais,
      ciudad:ciudad,
      codigoPostal:codigoPostal,
      direccion:direccion,
      telefono:telefono,
      correoElectronico:correoElectronico
    };
    
    //Consumo de API y lanzamiento se alerta
    axios.post(urlProveedor, data).then(response => {
      swal('Proveedor agregado con exito', '', 'success').then(result => {
        //axios.post(urlInsertBitacora, dataB)
        navegate('/menuInventario/ListaProveedores');
      });
    }).catch(error => {
      console.log(error);
      swal('Error al crear Proveedor, porfavor revise los campos.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })
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
        <h2>Registro de Proveedores</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos de los Proveedores.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Empresa Proveedora" className="titleInput" />

              <input
              onKeyDown={e => {
                setnombre(e.target.value);
                if (nombre == '') {
                  setErrornombre(true);
                  setmsj('Los campos no deben estar vacios');
                } else {
                  setErrornombre(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombre)) {
                    setErrornombre(true);
                    setmsj('Solo deben de ingresar letras');
                  } else {
                    setErrornombre(false);
                    setmsj('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="nombreProveedor"
                id="CiaProveedora"
              />
              <p class="error">{msj}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Codigo Postal" className="titleInput" />

              <input

                onKeyDown={e => {
                  setcodigopostal(e.target.value);
                  if (codigopostal === '') {
                    setErrorcodigopostal(true);
                    setaviso('Los campos no deben estar vacios');
                  } else {
                    setErrorcodigopostal(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(codigopostal)) {
                      setErrorcodigopostal(true);
                      setaviso('Solo deben de ingresar numeros');
                    } else {
                      setErrorcodigopostal(false);
                      setaviso('');
                    }
                  }
                }}
                type="text"
                name=""
                maxLength={15}
                className="inputCustom"
                placeholder="codigoPostal"
                id="codigoPostal"
              />
              <p class="error">{aviso}</p>
            </div>
            <div className="contInput">
              <TextCustom text="Persona Encargada" className="titleInput" />
              
              <input
                 onKeyDown={e => {
                  setencargado(e.target.value);
                  if (encargado == '') {
                    setErrorencargado(true);
                    setmensaje('Los campos no deben estar vacios');
                  } else {
                    setErrorencargado(false);
                    var preg_match = /^[a-zA-Z]+$/;
                    if (!preg_match.test(encargado)) {
                      setErrorencargado(true);
                      setmensaje('Solo deben de ingresar letras');
                    } else {
                      setErrorencargado(false);
                      setmensaje('');
                    }
                  }
                }}
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="encargado"
                id="encargado"
              />
               <p class="error">{mensaje}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Pais" className="titleInput" />
          
              <input
                  onKeyDown={e => {
                    setpais(e.target.value);
                    if (pais == '') {
                      setErrorpais(true);
                      setavi('Los campos no deben estar vacios');
                    } else {
                      setErrorpais(false);
                      var preg_match = /^[a-zA-Z]+$/;
                      if (!preg_match.test(pais)) {
                        setErrorpais(true);
                        setavi('Solo deben de ingresar letras');
                      } else {
                        setErrorpais(false);
                        setavi('');
                      }
                    }
                  }}
                type="text"
                name=""
                maxLength={25}
                className="inputCustom"
                placeholder="pais"
                id="pais"
              />
               <p class="error">{avi}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Telefono" className="titleInput" />

              <input

                  onKeyDown={e => {
                    settel(e.target.value);
                    if (tel === '') {
                      setErrortel(true);
                      setadv('Los campos no deben estar vacios');
                    } else {
                      setErrortel(false);
                      var preg_match = /^[0-9]+$/;
                      if (!preg_match.test(tel)) {
                        setErrortel(true);
                        setadv('Solo deben de ingresar numeros');
                      } else {
                        setErrortel(false);
                        setadv('');
                      }
                    }
                  }}
                type="text"
                name=""
                maxLength={20}
                className="inputCustom"
                placeholder="telefono"
                id="telefono"
              />
              <p class="error">{adv}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Ciudad" className="titleInput" />

              <input
                  onKeyDown={e => {
                    setciudad(e.target.value);
                    if (ciudad == '') {
                      setErrorciudad(true);
                      setadvertencia('Los campos no deben estar vacios');
                    } else {
                      setErrorciudad(false);
                      var preg_match = /^[a-zA-Z]+$/;
                      if (!preg_match.test(ciudad)) {
                        setErrorciudad(true);
                        setadvertencia('Solo deben de ingresar letras');
                      } else {
                        setErrorciudad(false);
                        setadvertencia('');
                      }
                    }
                  }}

                type="text"
                name=""
                maxLength={25}
                className="inputCustom"
                placeholder="ciudad"
                id="ciudad"
              />
               <p class="error">{advertencia}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Correo Electronico" className="titleInput" />

              <input
              onKeyDown={e => {
                setcorreo(e.target.value);
                if (correo == '') {
                  setErrorcorreo(true);
                  setparrafo('Los campos no deben estar vacios');
                }
                 else {
                  setErrorcorreo(false);
                  var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!expresion.test(correo)) {
                    setErrorcorreo(true);
                    setparrafo('Formato invalido');
                  } else {
                    setErrorcorreo(false);
                    setparrafo('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={100}
                className="inputCustom"
                placeholder="correoElectronico"
                id="correoElectronico"
              />
               <p class="error">{parrafo}</p>
            </div>
            
            <div className="contInput">
              <TextCustom text="Direccion" className="titleInput" />
              <input
                onKeyDown={e => {
                  setdireccion(e.target.value);
                  if (direccion == '') {
                    setErrordireccion(true);
                    setvalidacion('Los campos no deben estar vacios');
                  }  else {
                      setErrordireccion(false);
                      setvalidacion('');
                    }
                  }
                }
                type="text"
                name=""
                maxLength={100}
                className="inputCustomText"
                placeholder="direccion"
                id="direccion"
              />
               <p class="error">{validacion}</p>
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
            'https://static.vecteezy.com/system/resources/previews/014/049/158/non_2x/flat-cloud-data-storage-remote-backup-of-files-data-center-and-database-concept-outline-design-style-minimal-illustration-for-landing-page-web-banner-infographics-hero-images-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};