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
import { MarkChatReadOutlined } from '@mui/icons-material';
import { Bitacora } from '../../Components/bitacora.jsx';

//URL DE INSERTAR Y ACTUALIZAR 
const urlInsertLente = 'http://localhost:3000/api/Lentes/NuevoLente';
const urlUpdateLente = 'http://localhost:3000/api/Lentes/ActualizarLente';
//Bitacora
const urlBitacoraInsertLentes='http://localhost:3000/api/bitacora/insertolentes';
const urlBitacoraUpdateLentes='http://localhost:3000/api/bitacora/actualizolentes';

export const RegistroLente = (props) => {

  //Validacion 
  const [lente, setLente] = React.useState(props.data.lente || '');
  const [avisoL, setavisoL] = React.useState('');
  const [errorLente, setErrorLente] = React.useState(false);

  const [precio, setprecio] = React.useState(props.data.precio ||'');
  const [errorprecio, setErrorprecio] = React.useState(false);
  const [aviso, setaviso] = React.useState(false);

  const [estado, setEstado] = useState(props.data.estado || null)

  const navegate = useNavigate();

  //INSERTAR LENTE

  const handleNext = async () => {
    let lente = document.getElementById("lente").value;
    let precio = parseFloat(document.getElementById('precio').value);

    let data = {
      lente: lente.toUpperCase(),
      precio: precio,
      estado: document.getElementById('estado').value
    };
     //Funcion de Bitacora 
     let dataB = {
      Id: props.idUsuario
    };
    const bitacora = {
      urlB: urlBitacoraInsertLentes,
      activo: props.activo,
      dataB: dataB
    };
    console.log(data);

    //Consumo de API y lanzamiento se alerta
    axios.post(urlInsertLente, data).then(response => {
      console.log(response);
      if (response.data == false) {
        swal('¡Este Lente ya existe!', '', 'error')
      } else {
        swal('Lente agregado con exito', '', 'success').then(result => {
          Bitacora(bitacora)
          navegate('/MenuInventario/ListaLentes');
        });
      }
    }).catch(error => {
      console.log(error);
      swal('Error al crear lente, porfavor revise los campos.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  };

  //ACTUALIZAR
  const actualizarLente = async () => {

    let lente = document.getElementById("lente").value;
    let precio = parseFloat(document.getElementById("precio").value);


    const data = {

      lente: lente.toUpperCase(),
      precio: precio,
      estado: document.getElementById('estado').value,
      IdLente: props.data.IdLente,//El dato de IdProducto se obtiene de Producto seleccionado.
    };
     //Funcion de Bitacora 
     let dataB = {
      Id: props.idUsuario
    };
    const bitacora = {
      urlB: urlBitacoraUpdateLentes,
      activo: props.activo,
      dataB: dataB
    };
    console.log(data);

    axios.put(urlUpdateLente, data).then(response => {
      console.log(response);
      if (response.data == false) {
        swal('¡Este Lente ya existe!', '', 'error')
      } else {
        swal("Lente Actualizado Correctamente", "", "success").then(() => {
          Bitacora(bitacora)
          props.limpiarData({});
          props.limpiarUpdate(false)
          navegate('/MenuInventario/ListaLentes');
        });
      }
    }).catch(error => {
      console.log(error);
      swal('Error al Actualizar Lente , porfavor revise todos los campos.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  };

  //BOTON DE RETROCESO 
  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de Lentes ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        props.limpiarData({});
        props.limpiarUpdate(false)
        props.update(false)
        props.Data({})
        navegate('/MenuInventario/ListaLentes');
      } else {
      }
    });
   
  };
  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>

      <div className="titleAddUser">
        {props.actualizar ? <h2>Actualizar Lente</h2> : <h2>Registro de Lente</h2>}
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

          <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select id="estado" className="selectCustom" value={estado} onChange={(e) => {
                setEstado(e.target.value)
              }}>
                <option value={"Activo"}>Activo</option>
                <option value={"Inactivo"}>Inactivo</option>
              </select>
            </div>

            <p className="error">{aviso}</p>
            <div className="contInput">
              <TextCustom text="Lente" className="titleInput" />
              <input

                onChange={e => setLente(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errorLente}

                helperText={avisoL}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Lente"
                id="lente"
                value={lente}
              />
            </div>
            <p className="error">{avisoL}</p>

          
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
                onChange={e => setprecio(e.target.value)}
                error={errorprecio}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Precio"
                id="precio"
                value={precio}
              />
              <p class="error">{aviso}</p>
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  var precio = parseFloat(document.getElementById('precio').value);
                  var lente = document.getElementById('lente').value;
                

                  if (precio === "" || lente === "" ) {
                    swal("No deje campos vacíos.", "", "error");
                  }else if (precio <= 0 ) {
                    swal("El campo precio no acepta valores negativos.", "", "error");
                  } else if(isNaN(parseFloat(precio))) {
                    swal("El campo precio solo acepta números.", "", "error");  
                  }else {
                    props.actualizar ? actualizarLente() : handleNext();
                  }
                }
                }
              >
                {props.actualizar ? <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
              </Button>

            </div>
          </div>
        </div>

        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/002/302/922/non_2x/flash-sale-promos-discounts-and-purchase-bonuses-illustration-suitable-for-landing-page-ui-website-mobile-app-editorial-poster-flyer-article-and-banner-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>

      {/* div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <p className="error">{avisoP}</p>
            <div className="contInput">
              <TextCustom text="Lente" className="titleInput" />
              <input

                onChange={e => setLente(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errorLente}

                helperText={avisoL}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Lente"
                id="lente"
                value={lente}
              />
            </div>
            <p className="error">{avisoL}</p>

            <div className="contInput">
              <TextCustom text="Precio" className="titleInput" />
              <input
                onChange={e => setPrecio(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errorPrecio}

                helperText={avisoP}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Precio"
                id="precio"
                value={precio}
              />
            </div>

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select id="estado" className="selectCustom" value={estado} onChange={(e)=>{
                setEstado(e.target.value)
              }}>
                <option value={"Activo"}>Activo</option>
                <option value={"Inactivo"}>Inactivo</option>
              </select>
            </div>


            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  var lente = document.getElementById("lente").value;
                  var precio = parseFloat(document.getElementById("precio").value);

                  if (precio <= 0) {
                    swal("El campo precio no acepta valores negativos.", "", "error");
                  } else if(lente === "" || precio=== ""){
                    swal("No deje campos vacíos.", "", "error");
                  }else{        
                    props.actualizar ? actualizarLente() : handleNext();
                  }
                }
                }
              >
                {props.actualizar ? <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
              </Button>

            </div>
          </div>
        </div>
        <img src={'https://static.vecteezy.com/system/resources/previews/010/351/676/non_2x/rewriting-text-color-icon-illustration-vector.jpg'}
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div> */}
    </div>
  );
};