import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { Bitacora } from '../../Components/bitacora';

//Styles
import '../../Styles/Usuarios.css';

//Components

import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';


const urlNuevoDiagnostico = 'http://localhost:3000/api/ExpedienteDetalle/NuevoExpedinteDetalle'
const urlPostCitas = 'http://localhost:3000/api/recordatorioCitas/agregar';
const urlBitacoraAggCita = 'http://localhost:3000/api/bitacora/agregarcita';

const urlBitacoraInsertDiagnostico = 'http://localhost:3000/api/bitacora/Diagnostico';


export const Diagnostico = (props) => {

  const navegate = useNavigate();

  const [EnfermedadPresentada, setEnfermedadPresentada] = React.useState('');
  const [errorEnfermedadPresentada, setErrorEnfermedadPresentada] = React.useState(false);
  const [Advertencia, setAdvertencia] = React.useState(false);

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

    //Bitacora
    let dataB = {
      Id: props.idUsuario
    }
    const bitacora = {
      urlB: urlBitacoraInsertDiagnostico,
      activo: props.activo,
      dataB: dataB
    }

    let dataUsuario = {
      Id: props.idUsuario
    }
    console.log(dataUsuario);


    const urlFechaCita = 'http://localhost:3000/api/recordatorios/fecha';

    await axios.post(urlNuevoDiagnostico, data).then(response => {

      let dataIdClienteU = {
        IdCliente: props.datosclientes.idCliente,
      }
      console.log(dataIdClienteU, "este es el id del cliente");

      axios.post(urlFechaCita, dataIdClienteU).then(response => {
        console.log( response.data.fechaExpiracion, "este es LA PRIMERA");
        const fechaExpiracion = response.data.fechaExpiracion;
        console.log(fechaExpiracion, "este es LA FEHCHA");

        // Crear un objeto Date con la fechaExpiracion
        const fechaFormateada = new Date(response.data.fechaExpiracion)

        // Obtener el año, mes y día
        const year = fechaFormateada.getFullYear();
        const month = (fechaFormateada.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 porque los meses son indexados desde 0
        const day = fechaFormateada.getDate().toString().padStart(2, '0');

        // Formatear la fecha como Año/Mes/Día
        const fechaFinal = `${year}/${month}/${day}`;
        console.log(fechaFinal);


        let dataIdCliente = {
          IdCliente: props.datosclientes.idCliente,
          Nota: "CITA " + EnfermedadPresentada,
          fecha: fechaFinal
        }
        console.log(dataIdCliente);


        axios.post(urlPostCitas, dataIdCliente).then(response => {
          //swal('Se creo una cita', '', 'success').then(result => {
          //axios.post(urlBitacoraAggCita, dataUsuario);
          //navegate('/recordatorio');
          // });

        }).catch(error => {
          console.log(error, "Error al agregar cita, es posible que ya exista");
          //swal("Error al agregar cita.", "", "error")

        });


      });



      swal('Diagnostico creado correctamente', '', 'success').then(result => {
        Bitacora(bitacora)
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
        
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

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
              <TextCustom text="Enfermedad Presentada" className="titleInput" />
              <input
                onKeyDown={e => {
                  setEnfermedadPresentada(e.target.value);
                  if (e.target.value === '') {
                    setErrorEnfermedadPresentada(true);
                    setAdvertencia('Los campos no deben estar vacíos');
                  } else {
                    setErrorEnfermedadPresentada(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(e.target.value)) {
                      setErrorEnfermedadPresentada(true);
                      setAdvertencia('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(e.target.value)) {
                      setErrorEnfermedadPresentada(true);
                      setAdvertencia('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrorEnfermedadPresentada(false);
                      setAdvertencia('');
                    }
                  }

                }}
                error={errorEnfermedadPresentada}
                helperText={Advertencia}
                type="text"
                name=""
                maxLength={40}
                className="inputCustomText"
                placeholder="Enfermedad Presentada"
                id="Enfermedadpresentada"
              />

            </div>


            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  var EnfermedadPresentada = document.getElementById("Enfermedadpresentada").value;
                  if (EnfermedadPresentada === "") {
                    swal("No deje campos vacíos.", "", "error");
                  }
                  else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(EnfermedadPresentada)) {
                    swal("El campo enfermedad solo acepta letras mayusculas y un espacio entre palabra.", "", "error");
                  }
                  else if (EnfermedadPresentada.length < 3) {
                    setErrorEnfermedadPresentada(true);
                    swal("El campo enfermedad no acepta menos de 2 carácteres.", "", "error");
                  }
                  else if (/(.)\1{2,}/.test(EnfermedadPresentada)) {
                    setErrorEnfermedadPresentada(true);
                    swal("El campo enfermedad no acepta letras consecutivas repetidas.", "", "error");
                  }
                  else {
                    handleNext();
                  }
                }}
              // onClick={handleNext}
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


