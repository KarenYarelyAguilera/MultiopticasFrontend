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
import { MarkChatReadOutlined } from '@mui/icons-material';

//URL DE INSERTAR Y ACTUALIZAR 
const urlInsertMarca = 'http://194.163.45.55:4000/api/marcas/crear';
const urlUpdateMarca = 'http://194.163.45.55:4000/api/marcas/actualizar';
const urlInsertBitacora = 'http://194.163.45.55:4000/api//bitacora/insertmarca';
const urlUpdateBitacora = 'http://194.163.45.55:4000/api/bitacora/actualizarmarca';

export const RegistroMarcas = (props) => {
  const navegate = useNavigate();

  // const [marca, setmarca] = React.useState('');
  // const [leyenda, setleyenda] = React.useState('');
  // const [errorMarca, setErrorMarca] = React.useState(false);

  //Validacion 
  const [marca, setmarca] = React.useState(props.data.descripcion||'');
  const [aviso, setaviso] = React.useState('');
  const [errormarca, setErrormarca] = React.useState(false);

  const [estado, setEstado] = useState(props.data.estado || null)
  
  //INSERTAR MARCA 

  const handleNext = async () => {
    let marca = document.getElementById("Marca").value;
    let estado = document.getElementById('estado').value;

    let data = {
      descripcion:marca,
      estado: estado
    };
     //Bitacora
  let dataB = {
    Id: props.idUsuario
  };
  const bitacora = {
    urlB: urlInsertBitacora,
    activo: props.activo,
    dataB: dataB
  };

    axios.post(urlInsertMarca, data).then(response => {
      console.log(response);
      if (response.data == false) {
        swal('¡Esta marca ya existe!', '', 'error')
      } else {
        swal('Marca creada exitosamente!', '', 'success').then(result => {
          Bitacora(bitacora)
          navegate('/config/ListaMarcas');
        });
      }
    }).catch(error => {
      console.log(error);
      swal('Error al crear marca.', '', 'error')
    }
    )

  };

//ACTUALIZAR
const actualizarMarca = async () => {

  let marca = document.getElementById("Marca").value;
  let estado = document.getElementById('estado').value;

  const data = {

    descripcion:marca,
    estado: estado,
    IdMarca: props.data.IdMarca, //El dato de IdProducto se obtiene de Producto seleccionado.
  };
  //Bitacora
  let dataB = {
    Id: props.idUsuario
  };
  const bitacora = {
    urlB: urlUpdateBitacora,
    activo: props.activo,
    dataB: dataB
  };
  axios.put(urlUpdateMarca, data).then(() => {
    swal("Marca Actualizada Correctamente", "", "success").then(() => {
      Bitacora(bitacora)
      props.limpiarData({});
      props.limpiarUpdate(false)
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
  swal({
    title: 'Advertencia',
    text: 'Hay un proceso de creación de marcas ¿Estás seguro que deseas salir?',
    icon: 'warning',
    buttons: ['Cancelar', 'Salir'],
    dangerMode: true,
  }).then((confirmExit) => {
    if (confirmExit) {
      props.limpiarData({});
      props.limpiarUpdate(false)
      props.update(false)
      props.Data({})
      navegate('/config/ListaMarcas');
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
      {props.actualizar ? <h2>Actualizar Marca</h2> : <h2>Registro de Marca</h2>}
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
                onClick={()=> {
                  var Marca = document.getElementById("Marca").value;
                  var estado = document.getElementById('estado').value;
                  if (Marca ==="" || estado==="")
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