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
import axios from 'axios'; //Agregarlo siempre porque se necesita para exportar Axios para que se puedan consumir las Apis 
import { Bitacora } from '../../Components/bitacora.jsx';

const urlInsertDepartamento = 'http://194.163.45.55:4000/api/departamento/crear';
const urlUpdateDepartamento = 'http://194.163.45.55:4000/api/departamento/actualizar';
const urlInsertBitacora = 'http://194.163.45.55:4000/api/bitacora/insertDepartamento';
const urlUpdateBitacora = 'http://194.163.45.55:4000/api/bitacora/actualizarDepartamento';
export const RegistroDepartamento = (props) => {

  const navegate = useNavigate();

  const [departamento, setDepartamento] = React.useState(props.data.departamento || '');
  const [errorDepartamento, setErrorDepartamento] = React.useState(false);
  const [aviso, setAviso] = React.useState(false);

  const [estado, setEstado] = useState(props.data.estado || null)


  const handleNext = () => {
    let departamento = document.getElementById("departamento").value;
    let estado = document.getElementById('estado').value;

    let data = {
      departamento: departamento.toUpperCase(),
      estado: estado,
    };
    console.log(data)

    let dataB =
    {
      Id: props.idUsuario
    };
    const bitacora = {
      urlB: urlInsertBitacora,
      activo: props.activo,
      dataB: dataB
    };

    axios.post(urlInsertDepartamento, data).then(response => {
      console.log(response)
      if (response.data == false) {
        swal('¡Este Departamento ya existe!', '', 'error')
      } else {
        swal('Departamento agregado con exito', '', 'success').then(result => {
          Bitacora(bitacora)
          navegate('/config/ListaDepartamentos');
        });
      }
    }).catch(error => {
      console.log(error);
      swal('Error al crear el departamento, por favor revise los campos.', '', 'error')
    })
  };

  //ACTUALIZAR 

  const actualizarDepartamento = async () => {
    let departamento = document.getElementById("departamento").value;
    let estado = document.getElementById('estado').value;

    const data = {
      departamento: departamento.toUpperCase(),
      estado: estado,
      IdDepartamento: props.data.IdDepartamento,
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

    //Consumo de API y lanzamiento se alerta
    axios.put(urlUpdateDepartamento, data).then(response => {

      console.log(response)
      if (response.data == false) {
        swal('¡Este Departamento ya existe!', '', 'error')
      } else {
        swal('Departamento actualizado con exito', '', 'success').then(result => {
          props.limpiarData({});
          props.limpiarUpdate(false)
          Bitacora(bitacora)
          navegate('/config/ListaDepartamentos');
        });
      }
    }).catch(error => {
      console.log(error);
      swal('Error al crear el departamento, porfavor revise los campos.', '', 'error')
    })
  };

  //BOTON DE RETROCESO
  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de departamentos ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        props.limpiarData({});
        props.limpiarUpdate(false)
        props.update(false)
        props.Data({})
        navegate('/config/ListaDepartamentos');
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
        {props.actualizar ? <h2>Actualizar Departamento</h2> : <h2>Registro de Departamento</h2>}
        <h3>Complete todos los puntos para poder registrar los departamentos.</h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">


            <div className="contInput">

              <TextCustom text="Departamento" className="titleInput" />

              <input
                onKeyDown={e => {
                  setDepartamento(e.target.value);
                  if (departamento === "") {
                    setErrorDepartamento(true);
                    setAviso('Los campos no deben estar vacíos');
                  } else {
                    setErrorDepartamento(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(departamento)) {
                      setErrorDepartamento(true);
                      setAviso('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(departamento)) {
                      setErrorDepartamento(true);
                      setAviso('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrorDepartamento(false);
                      setAviso("");
                    }
                  }
                }}


                onChange={e => setDepartamento(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar

                erro={errorDepartamento}
                type="text"
                helperText={aviso}
                name=""
                className="inputCustom"
                maxLength={30}
                placeholder="Departamento"
                id="departamento"
                value={departamento}
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
                  var departamento = document.getElementById("departamento").value;
                  if (departamento === "") {
                    swal("No deje campos vacíos.", "", "error");
                  }
                  else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(departamento)) {
                    swal("El campo departamento solo acepta letras mayúsculas y solo un espacio entre palabras.", "", "error");
                  } else if (/(.)\1{2,}/.test(departamento)) {
                    setErrorDepartamento(true);
                    swal("El campo departamento no acepta letras mayúsculas consecutivas repetidas.", "", "error");
                  } else {
                    props.actualizar ? actualizarDepartamento() : handleNext();
                  }

                }
                }
              >
                {props.actualizar ? <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
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