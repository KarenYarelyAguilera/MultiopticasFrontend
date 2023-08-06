import React from 'react';
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
import axios from 'axios'; //Agregarlo siempre porque se necesita para exportar Axios para que se puedan consumir las Apis 

//APIS DE MODELO 
const urlMarcas = 'http://localhost:3000/api/marcas'; 
const urlInsertModelo ='http://localhost:3000/api/modelos/crear';
const urlUpdateModelo ='http://localhost:3000/api/modelo/actualizar';

export const RegistroModelo = (props) => {

  const [Marca, setMarca] = useState([])

  const [modelo, setmodelo] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errormodelo, setErrorModelo] = React.useState(false);

  const [detalle, setDetalle] = React.useState('');
  const [aviso, setaviso] = React.useState('');
  const [errordescripcion, setErrordescripcion] = React.useState(false);

  const navegate = useNavigate();

  //Se usa para mostrar informacion en un listbox en este caso es el de marca.
  useEffect(() => {
    axios.get (urlMarcas).then (response=>setMarca(response.data))
  }, []);

 //INSERTAR MODELO
 const handleNext = () => {
  let IdMarca = parseInt(document.getElementById("IdMarca").value);
  let detalle = document.getElementById("detalle").value;
  let anio = document.getElementById("anio").value;
 
  let data = {
    IdMarca: IdMarca,
    detalle: detalle,
    anio: anio,
  };

  //Consumo de API y lanzamiento se alerta
  axios.post(urlInsertModelo, data).then(response => {
    swal('Modelo agregado con exito', '', 'success').then(result => {
      navegate('/config/lista');
    });
  }).catch(error => {
    console.log(error);
    swal('Error al crear el modelo, por favor revise los campos.', '', 'error')
 
  })
};

//ACTUALIZAR
const actualizarModelo = async () => {
  let IdMarca = parseInt(document.getElementById("IdMarca").value);
  let detalle = document.getElementById("detalle").value;
  let anio = document.getElementById("anio").value;

  const data = {
    IdMarca: IdMarca,
    detalle: detalle,
    anio: anio,
    IdModelo: props.data. IdModelo, 
  }

  axios.put(urlUpdateModelo, data).then(() => {
    swal("Modelo actualizado correctamente", "", "success").then(() => {
      navegate('/config/lista');
    })
  }).catch(error => {
    console.log(error);
    swal('Error al actualizar este modelo, por favor revise todos los campos.', '', 'error')
    // axios.post(urlErrorInsertBitacora, dataB)
  })
};
  // const handleNext = async() => {

  //   let data = {
  //     IdModelo:parseInt(document.getElementById("idModelo").value),
  //     idMarca:parseInt(document.getElementById("marca").value),
  //     detalle:document.getElementById("modelo").value
  //   }
  //   if (sendData(urlModelo,data)) {
  //     swal("Modelo Registrado con Exito","","success")
  //     navegate('/menumodelos/lista')
  //   }
  // };

  //BOTON DE RETROCESO
  const handleBack = () => {
    navegate('/config/lista');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
      {props.actualizar ? <h2>Actualizar Modelo</h2> : <h2>Registro de Modelo</h2>}
        <h3>
          Complete todos los puntos para poder registrar los datos del modelo.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Marca" className="titleInput" />
              <select name="" className="selectCustom" id="IdMarca">
              {Marca.length ? (
                  Marca.map(pre => (
                    <option key={pre.IdMarca} value={pre.IdMarca}>
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
              <TextCustom text="Modelo" className="titleInput" />

              <input
               onKeyDown={e=>
                {
                  setmodelo(e.target.value);
                  if (e.target.value==="")
                  {
                    setErrorModelo(true);
                    setleyenda('Los campos no deben estar vacíos');
                  } else 
                  {
                    setErrorModelo(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if(!regex.test(e.target.value))
                    {
                      setErrorModelo(true);
                      setleyenda ('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(e.target.value))
                    {
                      setErrorModelo(true);
                      setleyenda ('No se permiten letras consecutivas repetidas');
                    } else{
                      setErrorModelo(false);
                      setleyenda("");
                    }
                  }
                }}

                error={errormodelo}
                helperText={leyenda}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Modelo"
                id="detalle"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Año" className="titleInput" />
              <input

            //   onKeyDown={e=>
            //   {
            //     if (typeof anio !== 'number' || !Number.isInteger(anio)) {
            //       return false; // No es un número entero
            //     }
                
            //     if (anio < 0 || anio.toString().length !== 4) {
            //       return false; // No es un año válido (menor a 0 o no tiene 4 dígitos)
            //     }
            //     return true;
            //   }
            // }

              // error={errorprecio}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Año"
                id="anio"
              />
              {/* <p class="error">{aviso}</p> */}
            </div>
          
            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={()=>
                {
                  //Validaciones previo a ejecutar el boton
                  var detalle = document.getElementById("detalle").value;
                  var anio = document.getElementById("anio").value;

                  if (detalle === "" || anio === "") {
                    swal("No deje campos vacíos.", "", "error");
                 /*  } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(descripcion)) {
                    swal("El campo descripcion solo acepta letras y solo un espacio entre palabras.", "", "error"); */
                  } 
                    props.actualizar ? actualizarModelo() : handleNext();
                }
              }
              >
                 {props.actualizar ? <h1>{'Finish' ? 'Actualizar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
              </Button>
            </div>
          </div>
        </div>

        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/001/890/486/non_2x/summer-sunglasses-accessory-flat-style-icon-free-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};