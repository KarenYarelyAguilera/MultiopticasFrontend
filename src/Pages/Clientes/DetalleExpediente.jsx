import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { DataGrid, esES } from '@mui/x-data-grid';


//Styles
import '../../Styles/Usuarios.css';

//Components

import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';


const urlNuevoDiagnostico='http://localhost:3000/api/ExpedienteDetalle/NuevoExpedinteDetalle'
const urlExpediente='http://localhost:3000/api/Expediente'
const urlClientes = 'http://localhost:3000/api/clientes'



export const DetalleExpediente = (props) => {

  const navegate = useNavigate();
  const [tableData, setTableData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().slice(0, 10));


  useEffect(() => {
    setTableData([]);
  }, []);


  const handleNext = async() => {
    let fechaConsulta = document.getElementById('fechaconsulta').value;
    let fechaExpiracion = document.getElementById('fechaexpiracion').value;
    let AsesorVenta= document.getElementById('Asesor').value;
    let Optometrista= document.getElementById('optometrista').value;
    let Antecedentes= document.getElementById('antecedentes').value;


    let fecha = new Date(fechaConsulta)

    let anio = fecha.getFullYear().toString();
    let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    let dia = fecha.getDate().toString().padStart(2, "0");

    let fechaFormateada = anio + "/" + mes + "/" + dia;
    
    let data = {
      fechaConsulta:fechaFormateada,
      Optometrista:Optometrista,
      fechaExpiracion:fechaExpiracion,
      AsesorVenta:AsesorVenta,
      Antecedentes:Antecedentes,
   }

   await axios.post(urlNuevoDiagnostico,data).then(response=>{
    swal('Registro creado con exito', '', 'success').then(result => {
      navegate('/menuClientes/DatosExpediente');
    });

  }).catch(error=>{
    console.log(error);
    swal("Error al registrar.", "", "error")
  })

  };

  const handleBack = () => {
    navegate('/menuClientes/DatosExpediente');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Detalle De Expediente</h2>
        <h3>
          Complete todos los puntos para completar el Detalle de Expediente.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Fecha de Consulta" className="titleInput" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha de Consulta"
                id="fechaconsulta"
                value={fechaActual}
                disabled
              />
            </div>

            <div className="contInput">
              <TextCustom text="Optometrista" className="titleInput" />
              <input
               onKeyDown={e => {
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Optometrista"
                id="optometrista"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Asesor de Venta" className="titleInput" />

              <input
               onKeyDown={e => {
                
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Asesor de Venta"
                id="Asesor"
              />
            
            </div>

            <div className="contInput">
              <TextCustom text="Fecha de Expiracion" className="titleInput" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha de Expiracion"
                id="fechaexpiracion"
                value={fechaActual}
                disabled
              />
            </div>

            <div className="contInput">
              <TextCustom text="Antecedentes Clinicos" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={100}
                className="inputCustom"
                placeholder="Antecedentes Clinicos"
                id="antecendentes"
              />

            </div> 

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"

                onClick= {handleNext} //INSERTA 
               /*  onClick={() => {

                  navegate('/menuClientes/Diagnostico');
                }} */
              >
                <h1>{'Finish' ? 'Siguiente' : 'Finish'}</h1>
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