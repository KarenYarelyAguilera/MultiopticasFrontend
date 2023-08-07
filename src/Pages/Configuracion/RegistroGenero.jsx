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

 //API DE GENERO
 const urlInsetGenero = 'http://localhost:3000/api/Genero/insertar';
 const urlUpdateGenero = 'http://localhost:3000/api/Genero/actualizar';
 

export const RegistroGenero = (props) => {

  const navegate = useNavigate();

  // /props.data.descripcion ||'' ) <= para jalar datos cuando se actualiza
  const [genero, setgenero] = React.useState( props.data.descripcion ||'');
  const [leyenda, setleyenda] = React.useState('');
  const [errorgenero, seterrorgenero] = React.useState(false);


  //INSERTAR DATOS 
  const handleNext = async () => {
    let genero = document.getElementById("Genero").value;

    let data = {
      descripcion:genero 
    }
    
    if (await axios.post(urlInsetGenero, data)) {
      swal('Género creado exitosamente.','', 'success');
      navegate('/config/ListaGenero');
    }
  };

  //ACTUALIZAR
const actualizarGenero = async () => {

  let genero = document.getElementById("Genero").value;

  const data = {

    descripcion:genero,
    IdGenero: props.data.IdGenero, //El dato de IdProducto se obtiene de Producto seleccionado.
  }

  axios.put(urlUpdateGenero, data).then(() => {
    swal("Género Actualizado Correctamente", "", "success").then(() => {
      navegate('/config/ListaGenero');
    })
  }).catch(error => {
    console.log(error);
    swal('Error al Actualizar Género , por favor revise todos los campos.', '', 'error')
    // axios.post(urlErrorInsertBitacora, dataB)
  })
  
};

//BOTON DE RETROCESO 
  const handleBack = () => {
    navegate('/config/ListaGenero');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" 
      onClick={handleBack}>
        <ArrowBackIcon 
        className="iconBack" />
      </Button>
      <div className="titleAddUser">
      {props.actualizar ? <h2>Actualizacion de Género</h2> : <h2>Registro de Género</h2>}
        <h3>
          Complete todos los puntos para poder registrar el Género.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            
            <div className="contInput">
              <TextCustom text="Género"/>
              <input

                onKeyDown={e => {
                  setgenero(e.target.value);
                  if (genero === '') {
                    seterrorgenero(true);
                    setleyenda('Los campos no deben estar vacíos');
                  } else {
                    seterrorgenero(false);
                    var regex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
                    if (!regex.test(genero)) {
                      seterrorgenero(true);
                      setleyenda('Solo debe ingresar letras y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(genero)) {
                      seterrorgenero(true);
                      setleyenda('No se permiten letras consecutivas repetidas');
                    } else {
                      seterrorgenero(false);
                      setleyenda('');
                    }
                  }
                }}
               
                onChange={e => setgenero(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errorgenero}

                type="text"
                helperText={leyenda}
                name=""
                className="inputCustom"
                maxLength={40}
                placeholder="Género"
                id="Genero"
                value={genero} 
              />
               <p class="error">{leyenda}</p>
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={()=> 
                  {
                    var genero = document.getElementById("Genero").value;

                    if (genero ==="")
                    {
                      swal ("No deje campos vacíos.", "", "error");
                    } else 
                    {
                      props.actualizar ? actualizarGenero() : handleNext();

                    }
                  }
                
                }
              >
                {props.actualizar ? <h1>{'Finish' ? 'Actualizar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
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