import React from 'react';
import Button from '@mui/material/Button';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Styles
import '../../Styles/Usuarios.css';

//Components
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';
import axios from 'axios'; //Agregarlo siempre porque se necesita para exportar Axios para que se puedan consumir las Apis 

//URL DE ACTUALIZAR 
const urlUpdateParametro = 'http://194.163.45.55:4000/api/parametros/actualizacion';//API DE ACTUALIZAR

export const ActualizarParametro = (props) => {

  const [Valor, setValor] = React.useState(props.data.Valor ||'');
  const [leyenda, setleyenda] = React.useState('');
  const [errorValor, setErrorValor] = React.useState(false);

  const navegate = useNavigate();

  //ACTUALIZAR
const handleUpdate = async () => {

  let Valor = document.getElementById("Valor").value;

  //El dato de IdProducto se obtiene de Producto seleccionado.
 const data = {
    Valor: Valor,
    Id_Parametro:props.data.Id_Parametro,
  };

  axios.put(urlUpdateParametro,data).then(() => {
    swal("Parametro Actualizado Correctamente", "", "success").then(() => {
      navegate('/config/ListaParametros');
    })
  }).catch(error => {
    console.log(error);
    swal('Error al Actualizar Parametro! , porfavor revise todos los campos.', '', 'error')
  })
};

  //BOTON DE RETROCESO 
  const handleBack = () => {
    navegate('/config/ListaParametros');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Actualización de Parámetro</h2>
      </div>

      <div className="infoAddUser">
         <div className="PanelInfo">
          <div className="InputContPrincipal1">
          
             <div className="contInput" style={{fontSize:'17px'}}>
             <TextCustom text="Valor" className="titleInput" />
              <input

             
                onChange={e => setValor(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar

                error= {errorValor}
                type="text"
                name=""
                maxLength={100}
                className="inputCustom"
                placeholder="Valor"
                id="Valor"
                value={Valor}
              />
              <p class="error">{leyenda}</p>
            </div>  

 
            {/* <div className="contInput">
              <TextCustom text="Descripcion" className="titleInput" />
              <input
                onKeyDown={e => { setDescripcion(e.target.value);
                  if (descripcion === "") {
                    setErrorDescripcion(true);
                    setleyenda("Los campos no deben de quedar vacíos");
                  } else {
                    setErrorDescripcion(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(descripcion)) {
                      setErrorDescripcion(true);
                      setleyenda('Solo debe ingresar letras mayúsculas y un espacio entre palabras')
                    } else if (/(.)\1{2,}/.test(descripcion)) {
                      setErrorDescripcion(true);
                      setleyenda("No se permiten letras consecutivas repetidas");
                    } else {
                      setErrorDescripcion(false);
                      setleyenda("");
                    }
                  }
                }
                }
                onChange={e => setDescripcion(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error= {errorDescripcion}
                type="text"
                name=""
                maxLength={100}
                className="inputCustomText"
                placeholder="Descripcion"
                id="descripcion"
                value={descripcion}
              />
              <p class="error">{leyenda}</p>
            </div> */}


            <div className="contBtnStepper">
              <Button
              variant="contained"
              className="btnStepper"

              onClick={() => {
                // Validaciones previo a ejecutar el botón
                var Valor = parseFloat(document.getElementById("Valor").value);
                if (isNaN(Valor)) {
                  swal("Ingrese un valor numérico válido.", "", "error");
                } else if (Valor <= 0) {
                  swal("El valor debe ser mayor que 0.", "", "error");
                } else {
                  handleUpdate();
                }
              }
              
                  
                }
                
        
              >
                <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>
              </Button>
            </div>
          </div>
        </div> 

        <img
          src={'https://static.vecteezy.com/system/resources/previews/014/049/158/non_2x/flat-cloud-data-storage-remote-backup-of-files-data-center-and-database-concept-outline-design-style-minimal-illustration-for-landing-page-web-banner-infographics-hero-images-vector.jpg'}
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};