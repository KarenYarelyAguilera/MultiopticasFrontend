import React from 'react';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sendData } from '../../scripts/sendData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Styles
import '../../Styles/Usuarios.css';

//Components
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import { Bitacora } from '../../Components/bitacora.jsx';

import { ContentPasteGoOutlined } from '@mui/icons-material';

//APIS DE DESCUENTO
const urlDescuento = //CREAR
  'http://localhost:3000/api/Descuento/NuevoDescuento';
const urlUpdDescuento = //ACTUALIZAR
  'http://localhost:3000/api/Descuento/ActualizarDescuento';

  const urlInsertBitacora =  'http://localhost:3000/api/bitacora/NuevoDescuento';
  const urlUpdateBitacora =  'http://localhost:3000/api/bitacora/ActualizacionDescuento';

export const RegistroDescuento = (props) => {

  const [descPorcent, setdescPorcent] = React.useState(props.data.descPorcent ||'');
  const [mensaje, setmensaje] = React.useState('');
  const [errordescPorcent, setErrordescPorcent] = React.useState(false);

  const [descuento, setDescuento] = useState(props.data.descPorcent || null)
  const [estado, setEstado] = useState(props.data.estado || null)
  
  const navegate = useNavigate();

  //ACTUALIZAR
  const actualizarDescuento = async () => {

    let estado = document.getElementById('estado').value;
    let descPorcent = parseFloat(document.getElementById('descPorcent').value);

    const data = {
      estado: estado,
      descPorcent: descPorcent,
      IdDescuento: props.data.IdDescuento,
    };
    //Funcion de bitacora 
    let dataB=
    {
      Id:props.idUsuario
    };
    const bitacora = {
      urlB: urlUpdateBitacora,
      activo: props.activo,
      dataB: dataB
    };
     axios.put(urlUpdDescuento, data).then(response=> {
      console.log(response);
      if (response.data == false) {
        swal('¡Este Descuento ya existe!', '', 'error')
      } else {
        swal("Descuento Actualizado Correctamente", "", "success").then(() => {
          Bitacora(bitacora)
          navegate('/menuVentas/listaDescuento');
      });
    } 
    }).catch(error => {
      console.log(error);
      swal('Error al Actualizar Descuento! , porfavor revise todos los campos.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  }


  //INSERTAR  
  const handleNext = () => {
    let estado = document.getElementById('estado').value;
    let descPorcent = parseFloat(document.getElementById('descPorcent').value);


    let data = {
      estado: estado,
      descPorcent: descPorcent,
    };
    let dataB=
    {
      Id:props.idUsuario
    };
    const bitacora = {
      urlB: urlInsertBitacora,
      activo: props.activo,
      dataB: dataB
    };
    console.log(data)

    axios.post(urlDescuento, data).then(response => {

      console.log(response);
      if (response.data == false) {
        swal('¡Este Descuento ya existe!', '', 'error')
      } else {
      swal('Descuento agregado con exito', '', 'success').then(result => {
       Bitacora(bitacora)
        navegate('/menuVentas/listaDescuento');
      });
    }
    }).catch(error => {
      console.log(error);
      swal('Error al crear Descuento, los lugar deben ser unico como tu.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  };

  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de Producto ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        props.update(false)
        props.Data({})
        navegate('/menuVentas/listaDescuento');
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
        {props.actualizar ? <h2>Actualizar Descuentos</h2> : <h2>Registro de Descuentos</h2>}
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <div className="contInput">
              <TextCustom text="Descuento" className="titleInput" />

              <input

                onKeyDown={e => {
                  setdescPorcent(e.target.value);
                  if (descPorcent === '') {
                    setErrordescPorcent(true);
                    setmensaje('Los campos no deben estar vacíos');
                  } else {
                    var regex = /^[A-Z0-9-]+(?: [A-Z0-9-]+)*$/;
                    if (!regex.test(descPorcent)) {
                      setErrordescPorcent(true);
                    } else if (/(.)\1{2,}/.test(descPorcent)) {
                      setErrordescPorcent(true);
                    } else {
                      setErrordescPorcent(false);
                      setmensaje("");
                    }
                  }
                }}
                onChange={e => setdescPorcent(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errordescPorcent}
                helperText={mensaje}
                type="text"
                name=""
                maxLength={4}
                className="inputCustom"
                placeholder="Descuento"
                id="descPorcent"
                value={descPorcent}
              />
              <p class="error">{mensaje}</p>

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
                  // Validaciones previas a ejecutar el botón
                  var descPorcent = document.getElementById('descPorcent').value;
                
                  if (descPorcent === "") {
                    swal("No deje campos vacíos.", "", "error");
                  } else if (isNaN(parseFloat(descPorcent))) {
                    swal("El campo descuento solo acepta números decimales.", "", "error");
                  } else if (descPorcent < 0) {
                    swal("No es permitido este valor.", "", "error");
                  } else {
                    // El campo es válido, puedes ejecutar la lógica deseada aquí
                    props.actualizar ? actualizarDescuento() : handleNext();
                  }
                }}
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
            'https://static.vecteezy.com/system/resources/previews/002/302/922/non_2x/flash-sale-promos-discounts-and-purchase-bonuses-illustration-suitable-for-landing-page-ui-website-mobile-app-editorial-poster-flyer-article-and-banner-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};