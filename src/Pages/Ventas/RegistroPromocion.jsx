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
import axios from 'axios'; //Se necesita exportar Axios para consumiar las APIs


//APIS DE PROMOCION
const urlPromocion = //CREAR
  'http://localhost:3000/api/promociones/crear';
const urlUpdPromocion = //ACTUALIZAR
  'http://localhost:3000/api/promociones/actualizar';
const urlDelPromocion = //BORRAR
  'http://localhost:3000/api/promociones/eliminar';


export const RegistroPromocion = (props) => {

  const [descripcion, setdescripcion] = React.useState('');
  const [msj, setmsj] = React.useState('');
  const [errordescripcion, setErrordescripcion] = React.useState(false);

  const [porcentaje, setporcentaje] = React.useState('');
  const [errorporcentaje, setErrorporcentaje] = React.useState(false);
  const [aviso, setaviso] = React.useState(false);

  const [fechaInicial, setfechaInicial] = React.useState('');
  const [mensaje, setmensaje] = React.useState('');
  const [errorfechaInicial, setErrorfechaInicial] = React.useState(false);

  const [fechaFinal, setfechaFinal] = React.useState('');
  const [mensajeF, setmensajeF] = React.useState('');
  const [errorfechaFinal, setErrorfechaFinal] = React.useState(false);

  const [cantidadmin, setcantidadmin] = React.useState('');
  const [advertencia, setadvertencia] = React.useState('');
  const [errorcantidadmin, setErrorcantidadmin] = React.useState(false);

  const navegate = useNavigate();

  //ACTUALIZAR
  const actualizarPromocion = async () => {

    let descPorcent = document.getElementById('descPorcent').value;
    let fechaInicial = document.getElementById('fechaInicial').value;
    let fechaFinal = document.getElementById('fechaFinal').value;
    let estado = document.getElementById('estado').value;
    let descripcion = document.getElementById('descripcion').value;

    const data = {
      descPorcent: descPorcent,
      fechaInicial: fechaInicial,
      fechaFinal: fechaFinal,
      estado: estado,
      descripcion: descripcion,
      IdPromocion: props.data.IdPromocion,
    }


    //Funcion de bitacora 
    /*  let dataB={
       Id: props.idUsuario
     } */

    axios.put(urlUpdPromocion, data).then(() => {
      swal("Promocion Actualizada Correctamente", "", "success").then(() => {
        //axios.post(urlUpdBitacora,dataB) //UPDATE BITACORA 
        navegate('/promocion/listaPromocion');
      })
    }).catch(error => {
      console.log(error);
      swal('Error al Actualizar Promocion! , porfavor revise todos los campos.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  }

  const handleNext = () => {

    let descPorcent = document.getElementById('descPorcent').value;
    let fechaInicial = document.getElementById('fechaInicial').value;
    let fechaFinal = document.getElementById('fechaFinal').value;
    let estado = document.getElementById('estado').value;
    let descripcion = document.getElementById('descripcion').value;

    let data = {
      descPorcent: descPorcent,
      fechaInicial: fechaInicial,
      fechaFinal: fechaFinal,
      estado: estado,
      descripcion: descripcion
    };

    //Consumo de API y lanzamiento se alerta
    axios.post(urlPromocion, data).then(response => {
      swal('Promocion agregada con exito', '', 'success').then(result => {
        //axios.post(urlInsertBitacora, dataB)
        navegate('/promocion/listaPromocion');
      });
    }).catch(error => {
      console.log(error);
      swal('Error al crear Promocion, las descripciones deben ser unicas como tu.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })
  };

  const handleBack = () => {
    navegate('/menuVentas/ListaPromociones');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        {props.actualizar ? <h2>Actualizar Promocion</h2> : <h2>Registro de Promocion</h2>}
        <h3>
          Complete todos los puntos para poder registrar la Promocion.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <div className="contInput">
              <TextCustom text="Porcentaje de Descuento" className="titleInput" />

              <input
                

                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Porcentaje de Descuento"
                id="descPorcent"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Fecha de Inicio" className="titleInput" />
              <input
                type="date"
                name=""
                // helperText={texto}
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha de Inicio"
                id="fechaInicial"
              />

            </div>

            <div className="contInput">
              <TextCustom text="Fecha Final" className="titleInput" />
              <input
                type="date"
                name=""
                // helperText={texto}
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha Final"
                id="fechaFinal"
              />

            </div>

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select name="" className="selectCustom" id="estado">
                <option value={1}>Activo</option>
                <option value={2}>Inactivo</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Descripcion" className="titleInput" />
              <input
                onKeyDown={e => {
                  setdescripcion(e.target.value);
                  if (descripcion === '') {
                    setErrordescripcion(true);
                    setmensaje('Los campos no deben estar vacios');
                  }

                }}
                type="text"
                name=""
                maxLength={50}
                className="inputCustomText"
                placeholder="Descripcion"
                id="descripcion"
              />
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  //Validaciones previo a ejecutar el boton
                  var descPorcent = document.getElementById('descPorcent').value;
                  var fechaInicial = document.getElementById('fechaInicial').value;
                  var fechaFinal = document.getElementById('fechaFinal').value;
                  var estado = document.getElementById('estado').value;
                  var descripcion = document.getElementById('descripcion').value;

                  if (descPorcent === "" || fechaInicial === "" || fechaFinal === "" || estado === "" || descripcion === "") {
                    swal("No deje campos vacíos.", "", "error");
                    /*  } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(descripcion)) {
                       swal("El campo descripcion solo acepta letras y solo un espacio entre palabras.", "", "error"); */
                  } else
                    props.actualizar ? actualizarPromocion() : handleNext();
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
            'https://static.vecteezy.com/system/resources/previews/010/885/906/non_2x/refer-friend-illustration-service-loyalty-referral-man-and-woman-marketing-business-design-concept-network-recommend-announcement-advertising-program-banner-digital-tell-job-commerce-earn-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};