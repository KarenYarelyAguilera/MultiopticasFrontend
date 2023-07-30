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

const handleChange = (event) => {
  const { name, value } = event.target;
  console.log(`Nuevo valor de ${name}: ${value}`);
};

//URL DE INSERTAR Y ACTUALIZAR 
const urlInsertMarca = 'http://localhost:3000/api/marcas/crear';
const urlUpdateMarca = 'http://localhost:3000/api/marcas/actualizar';

export const RegistroMarcas = (props) => {
  const navegate = useNavigate();

  const [marca, setmarca] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorMarca, setErrorMarca] = React.useState(false);

  const [nombremarca, setnombremarca] = React.useState('');
  const [aviso, setaviso] = React.useState('');
  const [errornombremarca, setErrornombremarca] = React.useState(false);

  //INSERTAR MARCA 

  const handleNext = async () => {
    let marca = document.getElementById("Marca").value;

    let data = {
      descripcion: marca
    }

    if (await axios.post(urlInsertMarca, data)) {
      swal('Marca creada exitosamente.', '', 'success');
      navegate('/config/ListaMarcas');
    }

  };

  //ACTUALIZAR
  const actualizarMarca = async () => {

    let marca = document.getElementById("Marca").value;

    const data = {

      descripcion: marca,
      IdMarca: props.data.IdMarca, //El dato de IdProducto se obtiene de Producto seleccionado.
    }

    axios.put(urlUpdateMarca, data).then(() => {
      swal("Marca Actualizada Correctamente", "", "success").then(() => {
        navegate('/config/ListaMarcas');
      })
    }).catch(error => {
      console.log(error);
      swal('Error al Actualizar Narca! , porfavor revise todos los campos.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  };

  //BOTON DE RETROCESO 
  const handleBack = () => {
    navegate('/config');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>

      <div className="titleAddUser">
        {props.update ? <h2>Actualizacion de Marca</h2> : <h2>Registro de Marcas</h2>}
        <h3>Complete todos los puntos para poder registrar los datos de la Marca.</h3>
      </div>

      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Nombre de la Marca" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={40}
                onChange={e => setmarca(e.target.value)}
                value={marca}
                className="inputCustom"
                placeholder="Nombre de la Marca"
                id="Marca"
              />
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  var Marca = document.getElementById("Marca").value;

                  props.actualizar ? actualizarMarca() : handleNext();
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