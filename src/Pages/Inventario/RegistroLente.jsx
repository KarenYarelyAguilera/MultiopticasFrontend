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
const urlInsertLente = 'http://localhost:3000/api/Lentes/NuevoLente';
const urlUpdateLente = 'http://localhost:3000/api/Lentes/ActualizarLente';

export const RegistroLente = (props) => {

  // const [marca, setmarca] = React.useState('');
  // const [leyenda, setleyenda] = React.useState('');
  // const [errorMarca, setErrorMarca] = React.useState(false);

  //Validacion 
  const [lente, setLente] = React.useState(props.data.lente || '');
  const [avisoL, setavisoL] = React.useState('');
  const [errorLente, setErrorLente] = React.useState(false);

  const [precio, setPrecio] = React.useState(props.data.precio || '');
  const [avisoP, setavisoP] = React.useState('');
  const [errorPrecio, setErrorPrecio] = React.useState(false);

  const navegate = useNavigate();

  //INSERTAR LENTE

  const handleNext = async (props) => {
    let lente = document.getElementById("lente").value;
    let precio = parseFloat(document.getElementById("precio").value);

    let data = {
      lente: lente,
      precio: precio,
    }

    if (await axios.post(urlInsertLente, data)) {
      swal('Lente creado exitosamente.', '', 'success');
      navegate('/MenuInventario/ListaLentes');
    }

  };

  //ACTUALIZAR
  const actualizarLente = async () => {

    let lente = document.getElementById("lente").value;
    let precio = parseFloat(document.getElementById("precio").value);


    const data = {

      lente: lente,
      precio: precio,
      IdLente: props.data.IdLente,//El dato de IdProducto se obtiene de Producto seleccionado.
    }

    axios.put(urlUpdateLente, data).then(() => {
      swal("Lente Actualizado Correctamente", "", "success").then(() => {
        navegate('/MenuInventario/ListaLentes');
      })
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

        <h3>Complete todos los puntos para poder registrar los datos del Lente.</h3>
      </div>

      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

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



            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  var lente = document.getElementById("lente").value;
                  var precio = parseFloat(document.getElementById("precio").value);
                  if (lente === "" || precio=== "") {
                    swal("No deje campos vacíos.", "", "error");
                  }else if (precio <= 0) {
                    swal("El campo precio no acepta valores negativos.", "", "error");
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
        <img src={'https://static.vecteezy.com/system/resources/previews/010/351/676/non_2x/rewriting-text-color-icon-illustration-vector.jpg'}
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};