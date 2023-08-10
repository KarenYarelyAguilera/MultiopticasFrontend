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


//URL DE INSERTAR Y ACTUALIZAR 
const urlInsertMetodoPago = 'http://localhost:3000/api/tipopago/crear';
const urlUpdateMetodoPago = 'http://localhost:3000/api/tipopago/actualizar';
export const MetodosDePago  = (props) => {

  const navegate = useNavigate();

  const [descripcion, setDescripcion] = React.useState(props.data.descripcion ||'');
  const [leyenda, setleyenda] = React.useState(false);
  const [errorDescripcion, setErrorDescripcion] = React.useState(false);

//CREAR
  const handleNext = async () => {
    let descripcion = document.getElementById("descripcion").value
    let data = {
      descripcion: descripcion,
    }
    
    if (await axios.post(urlInsertMetodoPago, data)) {
      swal('Metodo de pago creado exitosamente.','', 'success');
      navegate('/config/ListaMetodosDePago');
    }
  };

//ACTUALIZAR
const actualizarMetodoPago = async () => {

  let descripcion = document.getElementById("descripcion").value;

  const data = {

    descripcion:descripcion,
    IdTipoPago: props.data.IdTipoPago, 
  }

  axios.put(urlUpdateMetodoPago, data).then(() => {
    swal("Metodo de Pago Actualizado Correctamente", "", "success").then(() => {
      navegate('/config/ListaMetodosDePago');
    })
  }).catch(error => {
    console.log(error);
    swal('Error al Actualizar Metodo de pago! , porfavor revise todos los campos.', '', 'error')
    // axios.post(urlErrorInsertBitacora, dataB)
  })

};

   //BOTON DE RETROCESO
   const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de métodos de pago ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        props.update(false)
        props.Data({})
        navegate('/config');
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
      {props.actualizar ? <h2>Actualizacion de Método de Pago</h2> : <h2>Registro de Método de Pago</h2>}        <h3>
          Complete todos los puntos para poder actualizar los Métodos de Pago.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            

            <div className="contInput">

              <TextCustom text="Tipo de Pago" className="titleInput" />

              <input
            
                onKeyDown={e => {
                  setDescripcion(e.target.value);
                  if (descripcion === '') {
                    setErrorDescripcion(true);
                    setleyenda('Los campos no deben estar vacíos');
                  } else {
                    setErrorDescripcion(false);
                    var regex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
                    if (!regex.test(descripcion)) {
                      setErrorDescripcion(true);
                      setleyenda('Solo debe ingresar letras y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(descripcion)) {
                      setErrorDescripcion(true);
                      setleyenda('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrorDescripcion(false);
                      setleyenda('');
                    }
                  }
                }}
                onChange={e => setDescripcion(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errorDescripcion}

                helperText={leyenda}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Tipo de Pago"
                id="descripcion"
                value={descripcion}
              />
               <p class="error">{leyenda}</p>
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={()=> 
                  {
                    var descripcion = document.getElementById("descripcion").value;

                    if (descripcion ==="")
                    {
                      swal ("No deje campos vacíos.", "", "error");
                    } else 
                    {
                      props.actualizar ? actualizarMetodoPago() : handleNext();

                    }
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
            'https://static.vecteezy.com/system/resources/previews/010/351/676/non_2x/rewriting-text-color-icon-illustration-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};