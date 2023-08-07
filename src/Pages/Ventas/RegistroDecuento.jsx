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
import { ContentPasteGoOutlined } from '@mui/icons-material';

//APIS DE DESCUENTO
const urlDescuento = //CREAR
  'http://localhost:3000/api/Descuento/NuevoDescuento';
const urlUpdDescuento = //ACTUALIZAR
  'http://localhost:3000/api/Descuento/ActualizarDescuento';

export const RegistroDescuento = (props) => {

  const [descPorcent, setdescPorcent] = React.useState('');
  const [mensaje, setmensaje] = React.useState('');
  const [errordescPorcent, setErrordescPorcent] = React.useState(false);

  const [descPorcentEmpleado, setdescPorcentEmpleado] = React.useState('');
  const [advertencia, setadvertencia] = React.useState('');
  const [errordescPorcentEmpleado, setErrordescPorcentEmpleado] = React.useState(false);

  const navegate = useNavigate();

  //ACTUALIZAR
  const actualizarDescuento = async () => {

    let estado = document.getElementById('estado').value;
    let descPorcent = parseFloat(document.getElementById('descPorcent').value);
    let descPorcentEmpleado = parseFloat(document.getElementById('descPorcentEmpleado').value);


    const data = {
      estado: estado,
      descPorcent: descPorcent,
      descPorcentEmpleado: descPorcentEmpleado,
      IdDescuento: props.data.IdDescuento,
    }


    //Funcion de bitacora 
    /*  let dataB={
       Id: props.idUsuario
     } */

    axios.put(urlUpdDescuento, data).then(() => {
      swal("Descuento Actualizado Correctamente", "", "success").then(() => {
        //axios.post(urlUpdBitacora,dataB) //UPDATE BITACORA 
        navegate('/menuVentas/listaDescuento');
      })
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
    let descPorcentEmpleado = parseFloat(document.getElementById('descPorcentEmpleado').value);


    let data = {
      estado: estado,
      descPorcent: descPorcent,
      descPorcentEmpleado: descPorcentEmpleado,
    };

    console.log(data)

    axios.post(urlDescuento, data).then(response => {
      swal('Descuento agregado con exito', '', 'success').then(result => {
        //axios.post(urlInsertBitacora, dataB)
        navegate('/menuVentas/listaDescuento');
      });
    }).catch(error => {
      console.log(error);
      swal('Error al crear Descuento, los lugar deben ser unico como tu.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  };

  const handleBack = () => {
    navegate('/ventas');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        {props.actualizar ? <h2>Actualizar Descuentos</h2> : <h2>Registro de Descuentos</h2>}
        <h3>
          Complete todos los puntos para poder registrar los datos del descuento.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <div className="contInput">
              <TextCustom text="Descuento del Cliente" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={10}
                className="inputCustom"

                placeholder="Descuento del Cliente"
                id="descPorcent"
              />
              <p class="error">{mensaje}</p>

            </div>

            <div className="contInput">
              <TextCustom text="Descuento de Empleado" className="titleInput" />
              <input
            
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Descuento de Empleado"
                id="descPorcentEmpleado"
              />
              <p class="error">{advertencia}</p>

            </div>

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select name="" className="selectCustom" id="estado">
                <option value={1}>Activo</option>
                <option value={2}>Inactivo</option>
              </select>
            </div>




            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"

                onClick={() => {
                  //Validaciones previo a ejecutar el boton
                  var descPorcent = document.getElementById('descPorcent').value;
                  var descPorcentEmpleado = document.getElementById('descPorcentEmpleado').value;

                  if (descPorcent === "" || descPorcentEmpleado === "") {
                    swal("No deje campos vacíos.", "", "error");
                  } else
                    props.actualizar ? actualizarDescuento() : handleNext();
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
            'https://static.vecteezy.com/system/resources/previews/002/302/922/non_2x/flash-sale-promos-discounts-and-purchase-bonuses-illustration-suitable-for-landing-page-ui-website-mobile-app-editorial-poster-flyer-article-and-banner-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};