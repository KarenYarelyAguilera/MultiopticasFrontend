import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';



//Styles
import '../../Styles/Usuarios.css';

//Components

import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';


const urlNuevoDiagnostico = 'http://194.163.45.55:4000/api/ExpedienteDetalle/NuevoExpedinteDetalle'
const urlPostCitas = 'http://194.163.45.55:4000/api/recordatorioCitas/agregar';
const urlBitacoraAggCita = 'http://194.163.45.55:4000/api/bitacora/agregarcita';


export const Diagnostico = (props) => {

  const navegate = useNavigate();


  const handleNext = async () => {
    let EsferaOjoDerecho = document.getElementById('ODEsfera').value;
    let EsferaOjoIzquierdo = document.getElementById('OIEsfera').value;
    let CilindroOjoDerecho = document.getElementById('ODCilindro').value;
    let CilindroOjoIzquierdo = document.getElementById('OICilindro').value;
    let EjeOjoDerecho = document.getElementById('ODEje').value;
    let EjeOjoIzquierdo = document.getElementById('OIEje').value;
    let AdicionOjoDerecho = document.getElementById('AdicionOD').value;
    let AdicionOjoIzquierdo = document.getElementById('AdicionOI').value;
    let AlturaOjoDerecho = document.getElementById('AlturaOD').value;
    let AlturaOjoIzquierdo = document.getElementById('AlturaOI').value;
    let DistanciaPupilarOjoDerecho = document.getElementById('DistanciapupilarOD').value;
    let DistanciaPupilarOjoIzquierdo = document.getElementById('DistanciapupilarOI').value;
    let EnfermedadPresentada = document.getElementById('Enfermedadpresentada').value;

    let data = {
      diagnostico: EnfermedadPresentada,
      ODEsfera: EsferaOjoDerecho,
      OIEsfera: EsferaOjoIzquierdo,
      ODCilindro: CilindroOjoDerecho,
      OICilindro: CilindroOjoIzquierdo,
      ODEje: EjeOjoDerecho,
      OIEje: EjeOjoIzquierdo,
      ODAdicion: AdicionOjoDerecho,
      OIAdicion: AdicionOjoIzquierdo,
      ODAltura: AlturaOjoDerecho,
      OIAltura: AlturaOjoIzquierdo,
      ODDistanciaPupilar: DistanciaPupilarOjoDerecho,
      OIDistanciaPupilar: DistanciaPupilarOjoIzquierdo,
    }
    data = { ...props.data, ...data }
    console.log(data);


/*     console.log(props.data.idCliente);
    console.log(props.id.idCliente); */
     console.log(props.datosclientes.idCliente);

    let dataIdCliente = {
      IdCliente: props.datosclientes.idCliente,
      Nota: "Reservación de cita - " + EnfermedadPresentada,
      fecha: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())
    }
    console.log(dataIdCliente);

    let dataUsuario = {
      Id: props.idUsuario
    }
    console.log(dataUsuario);


    await axios.post(urlNuevoDiagnostico, data).then(response => {

      

      swal('Diagnostico creado con éxito', '', 'success').then(result => {

        axios.post(urlPostCitas, dataIdCliente).then(response => {
          //swal('Se creo una cita', '', 'success').then(result => {
          axios.post(urlBitacoraAggCita, dataUsuario);
          //navegate('/recordatorio');
          // });
  
        }).catch(error => {
          console.log(error);
          swal("Error al agregar cita.", "", "error")
  
        });

        navegate('/menuClientes/ListaExpedientes');
      });

    }).catch(error => {
      console.log(error);
      swal("Error al registrar el diagnostico.", "", "error")
    })


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
        <h2>Diagnostico</h2>
        <h3>
          Complete todos los datos para el historial del paciente.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <div className="contInput">
              <TextCustom text="Esfera OD" className="titleInput" />
              <input
                type="number"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Esfera OD"
                id="ODEsfera"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Esfera OI" className="titleInput" />

              <input
                type="number"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Esfera OI"
                id="OIEsfera"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Cilindro OD" className="titleInput" />

              <input
                type="number"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Cilindro OD"
                id="ODCilindro"
              />
            </div>


            <div className="contInput">
              <TextCustom text="Cilindro OI" className="titleInput" />
              <input
                type="number"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Cilindro OI"
                id="OICilindro"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Eje OD" className="titleInput" />

              <input
                type="number"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Eje OD"
                id="ODEje"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Eje OI" className="titleInput" />

              <input
                type="number"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Eje OI"
                id="OIEje"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Adicion OD" className="titleInput" />
              <input

                type="number"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Adicion OD"
                id="AdicionOD"
              />

            </div>

            <div className="contInput">
              <TextCustom text="Adicion OI" className="titleInput" />

              <input

                type="number"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Adicion OI"
                id="AdicionOI"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Altura OD" className="titleInput" />

              <input
                type="number"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Altura OD"
                id="AlturaOD"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Altura OI" className="titleInput" />

              <input
                type="number"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Altura OI"
                id="AlturaOI"
              />

            </div>

            <div className="contInput">
              <TextCustom text="DP OD" className="titleInput" />

              <input
                type="number"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="DP OD"
                id="DistanciapupilarOD"
              />
            </div>

            <div className="contInput">
              <TextCustom text="DP OI" className="titleInput" />

              <input

                type="number"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="DP OI"
                id="DistanciapupilarOI"
              />

            </div>

            <div className="contInput">
              <TextCustom text="Enfermedad Presentada" className="titleInput" />
              <input

                type="text"
                name=""
                maxLength={100}
                className="inputCustomText"
                placeholder="Enfermedad Presentada"
                id="Enfermedadpresentada"
              />

            </div>


            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={handleNext}
              >
                <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>

        { /* <imgn
          src={
            'https://static.vecteezy.com/system/resources/previews/010/351/676/non_2x/rewriting-text-color-icon-illustration-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        /> */}
      </div>
    </div>
  );
};


