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


const urlInsertCiudad = 'http://localhost:3000/api/ciudad/crear';
const urlUpdateCiudad= 'http://localhost:3000/api/ciudad/actualizar';


export const RegistroCiudad = (props) => {
  
  const navegate = useNavigate();

  const [ciudad, setCiudad] = React.useState(props.data.ciudad ||'');
  const [errorCiudad, setErrorCiudad] = React.useState(false);
  const [aviso, setAviso] = React.useState(false);
   
  const [estado, setEstado] = useState(props.data.estado || null)

 
  const handleNext = async () => {
    let ciudad = document.getElementById("ciudad").value;
    let estado = document.getElementById('estado').value;

    let data = {
      ciudad:ciudad,
      estado:estado,
    }
console.log(data)
    //Consumo de API y lanzamiento se alerta
  axios.post(urlInsertCiudad, data).then(response => {
    console.log(response);
    if(response.data==false)
    {
      swal('¡Esta Ciudad ya existe!', '', 'error')
    }else{
      swal('Ciudad agregada con exito', '', 'success').then(result => {
        navegate('/config/ListaCiudad');

    });
  }
  }).catch(error => {
    console.log(error);
    swal('Error al crear la Ciudad, por favor revise los campos.', '', 'error')
 
  })
  };

//ACTUALIZAR 
  const actualizarCiudad = async () => {
    let ciudad = document.getElementById("ciudad").value;
    let estado = document.getElementById('estado').value;

    const data = {
      ciudad:ciudad,
      estado:estado,
      IdCiudad:props.data.IdCiudad, 
    };
    
    //Consumo de API y lanzamiento se alerta
  axios.put(urlUpdateCiudad, data).then(response => {
    swal('Ciudad actualizada con exito', '', 'success').then(result => {
      navegate('/config/ListaCiudad');
    })
  }).catch(error => {
    console.log(error);
    swal('Error al crear la ciudad, porfavor revise los campos.', '', 'error')
  })
  };

 //BOTON DE RETROCESO
const handleBack = () => {
  swal({
    title: 'Advertencia',
    text: 'Hay un proceso de creación de ciudades ¿Estás seguro que deseas salir?',
    icon: 'warning',
    buttons: ['Cancelar', 'Salir'],
    dangerMode: true,
  }).then((confirmExit) => {
    if (confirmExit) {
      props.update(false)
      props.Data({})
      navegate('/config/ListaCiudad');
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
      {props.actualizar ? <h2>Actualizar Ciudad</h2> : <h2>Registro de Ciudad</h2>}
        <h3>
          Complete todos los puntos para poder registrar las ciudades.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            
            <div className="contInput">
              <TextCustom text="Ciudad" className="titleInput" />
              <input

               onKeyDown={e => 
                {
                setCiudad(e.target.value);
                if (ciudad === '') 
                {
                  setErrorCiudad(true);
                  setAviso('Los campos no deben estar vacíos');
                } else 
                {
                  setErrorCiudad(false);
                  var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                  if (!regex.test(ciudad))
                   {
                    setErrorCiudad(true);
                    setAviso('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                  } else if (/(.)\1{2,}/.test(ciudad))
                  {
                    setErrorCiudad(true);
                    setAviso('No se permiten letras consecutivas repetidas');
                  } else 
                  {
                    setErrorCiudad(false);
                    setAviso('');
                  }
                }
              }}

              onChange={e => setCiudad(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errorCiudad}

                type="text"
                helperText={aviso}
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Ciudad"
                id="ciudad"
                value={ciudad}
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
                onClick={()=>
                  {
                    var ciudad = document.getElementById("ciudad").value;
                    var estado = document.getElementById('estado').value;

                    if (ciudad ==="" || estado==="")
                    {
                      swal ("No deje campos vacíos.", "", "error");
                    }else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(ciudad)) {
                      swal("El campo ciudad solo acepta letras mayúsculas y solo un espacio entre palabras.", "", "error");
                  } else if (/(.)\1{2,}/.test(ciudad)) {
                    setErrorCiudad(true);
                    swal("El campo ciudad no acepta letras mayúsculas consecutivas repetidas.", "", "error");
                  }else{

                    props.actualizar ? actualizarCiudad() : handleNext();}

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