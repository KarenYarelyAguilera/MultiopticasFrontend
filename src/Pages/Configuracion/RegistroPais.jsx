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
import { Bitacora } from '../../Components/bitacora.jsx';

const urlInsertPais = 'http://localhost:3000/api/pais/crear';
const urlUpdatePais = 'http://localhost:3000/api/pais/actualizar';
const urlInsertBitacora = 'http://localhost:3000/api/bitacora/insertPais';
const urlUpdateBitacora = 'http://localhost:3000/api/bitacora/actualizarPais';

export const RegistroPais = (props) => {

  const navegate = useNavigate();

  const [pais, setPais] = React.useState(props.data.Pais || '');
  const [errorPais, setErrorPais] = React.useState(false);
  const [aviso, setAviso] = React.useState(false);

  const [estado, setEstado] = useState(props.data.estado || null)

  //INSERTAR DATOS
  const handleNext = async () => {
    let pais = document.getElementById("pais").value;
    let estado = document.getElementById('estado').value;

    let data = {
      pais: pais.toUpperCase(),
      estado: estado,
    };
    let dataB =
    {
      Id: props.idUsuario
    };
    const bitacora = {
      urlB: urlInsertBitacora,
      activo: props.activo,
      dataB: dataB
    };
    axios.post(urlInsertPais, data).then(response => {
      console.log(response);
      if(response.data==false)
      {
        swal('¡Este Pais ya existe!', '', 'error')
      }else{
        swal('Pais creado exitosamente', '', 'success').then(result => {
          Bitacora(bitacora)
          navegate('/config/ListaPais');
      });
      }
    }).catch(error => {
      console.log(error);
      swal('Error al crear el pais, por favor revise los campos.', '', 'error')
    })
  };

  //ACTUALIZAR
  const actualizar = async () => {

    let pais = document.getElementById("pais").value;
    let estado = document.getElementById('estado').value;

    const data = {
      pais: pais.toUpperCase(),
      estado: estado,
      IdPais: props.data.IdPais, //El dato de IdProducto se obtiene de Producto seleccionado.
    };
    let dataB =
          {
            Id: props.idUsuario
          };
          const bitacora = {
            urlB: urlUpdateBitacora,
            activo: props.activo,
            dataB: dataB
          };

    axios.put(urlUpdatePais, data).then(() => {
      swal("Datos Actualizado Correctamente", "", "success").then(() => {
        props.limpiarData({});
        props.limpiarUpdate(false)
        Bitacora(bitacora)
        navegate('/config/ListaPais');
      })
    }).catch(error => {
      console.log(error);
      swal('Error al Actualizar! , por favor revise todos los campos.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  };

  //BOTON DE RETROCESO 
  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de países ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        props.limpiarData({});
        props.limpiarUpdate(false)
        props.update(false)
        props.Data({})
        navegate('/config/ListaPais');
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
        {props.actualizar ? <h2>Actualizacion de Pais</h2> : <h2>Registro de Pais</h2>}
        <h3>Complete todos los puntos para poder registrar el pais.</h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Pais" className="titleInput" />
              <input

                onKeyDown={e => {
                  setPais(e.target.value);
                  if (pais === "") {
                    setErrorPais(true);
                    setAviso('Los campos no deben estar vacíos');
                  } else {
                    setErrorPais(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(pais)) {
                      setErrorPais(true);
                      setAviso('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(pais)) {
                      setErrorPais(true);
                      setAviso('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrorPais(false);
                      setAviso("");
                    }
                  }
                }}
                onChange={e => setPais(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errorPais}
                helperText={aviso}
                type="text"
                name=""
                maxLength={30}
                className="inputCustom"
                placeholder="Pais"
                id="pais"
                value={pais}
              />
              <p className="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select id="estado" className="selectCustom" value={estado} onChange={(e) => {
                setEstado(e.target.value)
              }}>
                <option value={'Activo'}>Activo</option>
                <option value={'Inactivo'}>Inactivo</option>
              </select>
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  var pais = document.getElementById("pais").value;

                  if (pais === "") {
                    swal("No deje campos vacíos.", "", "error");
                  }
                  else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(pais)) {
                    swal("El campo pais solo acepta letras mayúsculas y solo un espacio entre palabras.", "", "error");
                  } else if (/(.)\1{2,}/.test(pais)) {
                    setErrorPais(true);
                    swal("El campo pais no acepta letras mayúsculas consecutivas repetidas.", "", "error");
                  } else {
                    props.actualizar ? actualizar() : handleNext();
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
            'https://static.vecteezy.com/system/resources/previews/000/144/399/non_2x/dotted-world-map-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};