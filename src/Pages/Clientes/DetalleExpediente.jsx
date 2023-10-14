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


const urlNuevoDiagnostico = 'http://localhost:3000/api/ExpedienteDetalle/NuevoExpedinteDetalle'
const urlExpediente = 'http://localhost:3000/api/Expediente'
const urlClientes = 'http://localhost:3000/api/clientes'



export const DetalleExpediente = (props) => {

  const navegate = useNavigate();
  const [tableData, setTableData] = React.useState([]);

  const [NombreOptometrista, setNombreOptometrista] = React.useState('');
  const [errorNombreOptometrista, setErrorNombreOptometrista] = React.useState(false);
  const [Msj, setMsj] = React.useState(false);

  const [NombreAsesor, setNombreAsesor] = React.useState('');
  const [errorNombreAsesor, setErrorNombreAsesor] = React.useState(false);
  const [Aviso, setAviso] = React.useState(false);

  const [AntecedentesC, setAntecedentesC] = React.useState('');
  const [errorAntecendentesC, setErrorAntecedentesC] = React.useState(false);
  const [Advertencia, setAdvertencia] = React.useState(false);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().slice(0, 10));
  const [fechaDespues, setFechaDespues] = useState(() => {
    const fechaHoy = new Date();
    fechaHoy.setFullYear(fechaHoy.getFullYear() + 1);
    return fechaHoy.toISOString().slice(0, 10);
  });

  useEffect(() => {
    setTableData([]);
  }, []);


  const handleNext = async () => {
    let fechaConsulta = document.getElementById('fechaconsulta').value;
    let fechaExpiracion = document.getElementById('fechaexpiracion').value;
    let AsesorVenta = document.getElementById('Asesor').value;
    let Optometrista = document.getElementById('optometrista').value;
    let Antecedentes = document.getElementById('antecendentes').value;


    let fecha = new Date(fechaConsulta)

    let anio = fecha.getFullYear().toString();
    let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    let dia = fecha.getDate().toString().padStart(2, "0");

    let fechaFormateada = anio + "/" + mes + "/" + dia;

    // Agregar un año a la fecha actual

    let fechadespues = new Date(fechaExpiracion)
    fechadespues.setFullYear(fechadespues.getFullYear() + 1);

    let year = fechadespues.getFullYear().toString();
    let month = (fechadespues.getMonth() + 1).toString().padStart(2, "0");
    let day = fechadespues.getDate().toString().padStart(2, "0");

    let fechaModificada = year + "/" + month + "/" + day;

    let data = {
      IdExpediente: props.Data.IdExpediente || props.Data.id,
      fechaConsulta: fechaFormateada,
      Optometrista: Optometrista,
      //fechaExpiracion: fechaModificada,
      fechaExpiracion: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()), //la agrego Johana porque se saltaba 2 años
      AsesorVenta: AsesorVenta,
      Antecedentes: Antecedentes,
    }
    props.data(data)

    //await axios.post(urlNuevoDiagnostico,data).then(response=>{
    // swal('Registro creado con exito', '', 'success').then(result => {
    navegate('/menuClientes/Diagnostico');
    //});

    // }).catch(error=>{
    // console.log(error);
    //swal("Error al registrar.", "", "error")
    //})

  };

  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de un nuevo Historial ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        navegate('/menuClientes/DatosExpediente');
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
                  setNombreOptometrista(e.target.value);
                  if (e.target.value === '') {
                    setErrorNombreOptometrista(true);
                    setMsj('Los campos no deben estar vacíos');
                  } else {
                    setErrorNombreOptometrista(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(e.target.value)) {
                      setErrorNombreOptometrista(true);
                      setMsj('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(e.target.value)) {
                      setErrorNombreOptometrista(true);
                      setMsj('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrorNombreOptometrista(false);
                      setMsj('');
                    }
                  }
                }}
                error={errorNombreOptometrista}
                helperText={Msj}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Optometrista"
                id="optometrista"
              />
              <p className="error">{Msj}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Asesor de Venta" className="titleInput" />

              <input
                onKeyDown={e => {
                  setNombreAsesor(e.target.value);
                  if (e.target.value === '') {
                    setErrorNombreAsesor(true);
                    setAviso('Los campos no deben estar vacíos');
                  } else {
                    setErrorNombreAsesor(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(e.target.value)) {
                      setErrorNombreAsesor(true);
                      setAviso('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(e.target.value)) {
                      setErrorNombreAsesor(true);
                      setAviso('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrorNombreAsesor(false);
                      setAviso('');
                    }
                  }

                }}
                error={errorNombreAsesor}
                helperText={Aviso}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Asesor de Venta"
                id="Asesor"
              />
              <p className="error">{Aviso}</p>
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
                value={fechaDespues}
                disabled
              />
            </div>

            <div className="contInput">
              <TextCustom text="Antecedentes Clinicos" className="titleInput" />
              <input
                onKeyDown={e => {
                  setAntecedentesC(e.target.value);
                  if (e.target.value === '') {
                    setErrorAntecedentesC(true);
                    setAdvertencia('Los campos no deben estar vacíos');
                  } else {
                    setErrorAntecedentesC(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(e.target.value)) {
                      setErrorAntecedentesC(true);
                      setAdvertencia('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(e.target.value)) {
                      setErrorAntecedentesC(true);
                      setAdvertencia('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrorAntecedentesC(false);
                      setAdvertencia('');
                    }
                  }

                }}
                error={errorAntecendentesC}
                helperText={Advertencia}
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
                onClick={() => {
                  var Optometrista = document.getElementById("optometrista").value;
                  var AsesorDeVentas = document.getElementById("Asesor").value;
                  var AntecedentesClinicos = document.getElementById("antecendentes").value;
                  if (Optometrista === "" || AsesorDeVentas === "" || AntecedentesClinicos === "") {
                    swal("No deje campos vacíos.", "", "error");
                  } else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(Optometrista)) {
                    swal("El campo optometrista solo acepta letras mayusculas y un espacio entre palabra.", "", "error");
                  }
                  else if (Optometrista.length < 3) {
                    setErrorNombreOptometrista(true);
                    swal("El campo optometrista no acepta menos de 2 carácteres.", "", "error");
                  }
                   else if (/(.)\1{2,}/.test(Optometrista)) {
                    setErrorNombreOptometrista(true);
                    swal("El campo optometrista no acepta letras consecutivas repetidas.", "", "error");
                  } else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(AsesorDeVentas)) {
                    swal("El campo asesor solo acepta letras mayusculas y un espacio entre palabra.", "", "error");
                  }  else if (AsesorDeVentas.length < 3) {
                    setErrorNombreAsesor(true);
                    swal("El campo Asesor no acepta menos de 2 carácteres.", "", "error");
                  }
                   else if (/(.)\1{2,}/.test(AsesorDeVentas)) {
                    setErrorNombreAsesor(true);
                    swal("El campo asesor no acepta letras consecutivas repetidas.", "", "error");
                  } else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(AntecedentesClinicos)) {
                    swal("El campo antecedentes solo acepta letras mayusculas y un espacio entre palabra.", "", "error");
                  }
                  else if (AntecedentesClinicos.length < 3) {
                    setErrorAntecedentesC(true);
                    swal("El campo Antecendentes no acepta menos de 2 carácteres.", "", "error");
                  } else if (/(.)\1{2,}/.test(AntecedentesClinicos)) {
                    setErrorAntecedentesC(true);
                    swal("El campo antecedentes no acepta letras consecutivas repetidas.", "", "error");
                  } else {
                    handleNext();
                  }

                }}
              //onClick= {handleNext} //INSERTA 
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