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

//URL DE INSERTAR Y ACTUALIZAR 
const urlInsertMarca = 'http://localhost:3000/api/marcas/crear';
const urlUpdateMarca = 'http://localhost:3000/api/marcas/actualizar';

export const RegistroMarcas = (props) => {
  const navegate = useNavigate();

  // const [marca, setmarca] = React.useState('');
  // const [leyenda, setleyenda] = React.useState('');
  // const [errorMarca, setErrorMarca] = React.useState(false);

  //Validacion 
  const [marca, setmarca] = React.useState(props.data.descripcion||'');
  const [aviso, setaviso] = React.useState('');
  const [errormarca, setErrormarca] = React.useState(false);
  
  //INSERTAR MARCA 

  const handleNext = async () => {
    let marca = document.getElementById("Marca").value;

    let data = {
      descripcion:marca 
    }
    
    if (await axios.post(urlInsertMarca, data)) {
      swal('Marca creada exitosamente.','', 'success');
      navegate('/config/ListaMarcas');
    }

  };

//ACTUALIZAR
const actualizarMarca = async () => {

  let marca = document.getElementById("Marca").value;

  const data = {

    descripcion:marca,
    IdMarca: props.data.IdMarca, //El dato de IdProducto se obtiene de Producto seleccionado.
  }

  axios.put(urlUpdateMarca, data).then(() => {
    swal("Marca Actualizada Correctamente", "", "success").then(() => {
      navegate('/config/ListaMarcas');
    })
  }).catch(error => {
    console.log(error);
    swal('Error al Actualizar Marca , porfavor revise todos los campos.', '', 'error')
    // axios.post(urlErrorInsertBitacora, dataB)
  })

};

//BOTON DE RETROCESO 
  const handleBack = () => {
    navegate('/config/ListaMarcas');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>

      <div className="titleAddUser">
      {props.actualizar ? <h2>Actualizar Marca</h2> : <h2>Registro de Marca</h2>}

        <h3>Complete todos los puntos para poder registrar los datos de la Marca.</h3>
      </div>

      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
             <div className="contInput">
              <TextCustom text="Nombre de la Marca" className="titleInput" />
              <input

              onKeyDown={e => 
                {
                setmarca(e.target.value);
                if (marca === '') 
                {
                  setErrormarca(true);
                  setaviso('Los campos no deben estar vacíos');
                } else 
                {
                  setErrormarca(false);
                  var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                  if (!regex.test(marca))
                   {
                    setErrormarca(true);
                    setaviso('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                  } else if (/(.)\1{2,}/.test(marca))
                  {
                    setErrormarca(true);
                    setaviso('No se permiten letras consecutivas repetidas');
                  } else 
                  {
                    setErrormarca(false);
                    setaviso('');
                  }
                }
              }}
              onChange={e => setmarca(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errormarca}

                helperText={aviso}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Nombre de la Marca"
                id="Marca"
                value ={marca}
              />
            </div>
            <p className="error">{aviso}</p>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={()=> {
                  var Marca = document.getElementById("Marca").value;
                  if (Marca ==="")
                  {
                    swal ("No deje campos vacíos.", "", "error");
                  }   else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(Marca)) {
                    swal("El campo marca solo acepta letras mayúsculas y solo un espacio entre palabras.", "", "error");
                } else if (/(.)\1{2,}/.test(Marca)) {
                  setmarca(true);
                  swal("El campo direccion no acepta letras mayúsculas consecutivas repetidas.", "", "error");
                }else{

                  props.actualizar ? actualizarMarca() : handleNext();}
                }
              }
              >
                 {props.actualizar ? <h1>{'Finish' ? 'Actualizar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
              </Button>
             
            </div>
          </div>
        </div>
        <img src={'https://static.vecteezy.com/system/resources/previews/010/351/676/non_2x/rewriting-text-color-icon-illustration-vector.jpg'}
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};