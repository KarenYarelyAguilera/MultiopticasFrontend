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
import { Bitacora } from '../../Components/bitacora';

 //API DE GENERO
 const urlInsetGenero = 'http://localhost:3000/api/Genero/insertar';
 const urlUpdateGenero = 'http://localhost:3000/api/Genero/actualizar';
 const urlInsertBitacora = 'http://localhost:3000/api/bitacora/insertGenero';
 const urlUpdateBitacora= 'http://localhost:3000/api/bitacora/actualizarGenero';

export const RegistroGenero = (props) => {

  const navegate = useNavigate();

  // /props.data.descripcion ||'' ) <= para jalar datos cuando se actualiza
  const [genero, setgenero] = React.useState(props.data.descripcion ||'');
  const [leyenda, setleyenda] = React.useState('');
  const [errorgenero, seterrorgenero] = React.useState(false);

  const [estado, setEstado] = useState(props.data.estado || null)

  //INSERTAR DATOS 
  const handleNext = async () => {
    let genero = document.getElementById("Genero").value;
    let estado = document.getElementById('estado').value;

    let data = {
      descripcion:genero.toUpperCase(),
      estado: estado,
    };
    console.log(data)
    let dataB=
    {
      Id:props.idUsuario
    }; 
    const bitacora = {
      urlB: urlInsertBitacora,
      activo: props.activo,
      dataB: dataB
    };

    axios.post(urlInsetGenero, data).then(response => {
      console.log(response);
      if (response.data == false) {
        swal('¡Este Genero ya existe!', '', 'error')
      } else {
      swal('Genero agregado con exito', '', 'success').then(result => {
       Bitacora(bitacora)
        navegate('/config/ListaGenero');
      });
    }
    }).catch(error => {
      console.log(error);
      swal('Error al crear el Genero', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })
  };

  //ACTUALIZAR
const actualizarGenero = async () => {

  let genero = document.getElementById("Genero").value;
  let estado = document.getElementById('estado').value;

  const data = {

    descripcion:genero.toUpperCase(),
    estado: estado,
    IdGenero: props.data.IdGenero, //El dato de IdProducto se obtiene de Producto seleccionado.
  };
  let dataB=
    {
      Id:props.idUsuario
    };
    const bitacora = {
      urlB: urlUpdateBitacora,
      activo: props.activo,
      dataB: dataB
    };

  axios.put(urlUpdateGenero, data).then(() => {
    swal("Género Actualizado Correctamente", "", "success").then(() => {
      Bitacora(bitacora)
      props.limpiarData({});
      props.limpiarUpdate(false)
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
  swal({
    title: 'Advertencia',
    text: 'Hay un proceso de creación de generos ¿Estás seguro que deseas salir?',
    icon: 'warning',
    buttons: ['Cancelar', 'Salir'],
    dangerMode: true,
  }).then((confirmExit) => {
    if (confirmExit) {
      props.limpiarData({});
      props.limpiarUpdate(false)
      props.update(false)
      props.Data({})
      navegate('/config/ListaGenero');
    } else {
    }
  });
};

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" 
      onClick={handleBack}>
        <ArrowBackIcon 
        className="iconBack" />
      </Button>
      <div className="titleAddUser">
      {props.actualizar ? <h2>Actualización de Género</h2> : <h2>Registro de Género</h2>}
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
                    var genero = document.getElementById("Genero").value;

                    if (genero ==="")
                    {
                      swal ("No deje campos vacíos.", "", "error");
                    } else  if (!/^[A-Z]+(?: [A-Z]+)*$/.test(genero))
                    {
                      swal("El campo genero solo acepta letras mayúsculas y solo un espacio entre palabras.", "", "error");
                    }else if (/(.)\1{2,}/.test(genero))
                    {
                      seterrorgenero(true);
                      swal("El no acepta letras mayúsculas consecutivas repetidas.", "", "error")
                    } else 
                      {
                      props.actualizar ? actualizarGenero() : handleNext();
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