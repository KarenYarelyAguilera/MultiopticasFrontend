import React from 'react';
import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from "date-fns/locale/es";
import { TextCustom } from '../Components/TextCustom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import swal from '@sweetalert/with-react';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

import axios from 'axios';
import Select from 'react-select';

import { Bitacora } from '../Components/bitacora.jsx';

import  oftalmologoFondo  from '../IMG/oftalmologofondo.png'

import '../Styles/Usuarios.css';

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Big Meeting',
    allDay: true,
    start: new Date(2023, 3, 4),
    end: new Date(2023, 3, 4),
  },
  {
    title: 'Vacation',
    start: new Date(2023, 3, 5),
    end: new Date(2023, 3, 5),
  },
  {
    title: 'Conference',
    start: new Date(2023, 3, 5),
    end: new Date(2023, 3, 5),
  },
];

export const RecordatorioCitas = (props) => {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState(events);
  const navegate = useNavigate();

  const [Nombre, setNombre] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [Fech, setFecha] = useState('');

  const [fecha, setFechas] = React.useState(props.data.fecha || '');

  const [Notas, setNotas] = React.useState(props.data.Nota || '');
  const [errorNotas, setErrorNotas] = React.useState();
  const [Msj, setMsj] = React.useState(false);




  const urlPostCitas = 'http://localhost:3000/api/recordatorioCitas/agregar';
  const urlClientes = 'http://localhost:3000/api/clientesEx';
  const urlFechaCita = 'http://localhost:3000/api/recordatorios/fecha';
  const urlBitacoraAggCita = 'http://localhost:3000/api/bitacora/agregarcita';

  const [selectedOption, setSelectedOption] = useState(null); // Estado para la opción seleccionada



  //para el el cliente
  useEffect(() => {
    axios.get(urlClientes).then(response => {
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, []);








  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
  };

  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de un nueva cita ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        navegate('/recordatorio');
      } else {
      }
    });
  };

  const objectDate = new Date();
  const day = objectDate.getDate();
  const month = objectDate.getMonth();
  const year = objectDate.getFullYear();
  let format1 = month + "/" + day + "/" + year;




  const handleClick = async () => {


    // let idCliente = document.getElementById('idClientes').value;

    let idCliente = selectedOption.value; // Usamos el valor de la opción seleccionada
    let Nota = document.getElementById('nota').value;
    // let fecha = document.getElementById('fecha').value

    let dataIdCliente = {
      IdCliente: idCliente,
    }


    await axios.post(urlFechaCita, dataIdCliente).then(response => {

      // console.log(response.data)
      const fechaFormateada = new Date(response.data.fechaExpiracion).toISOString().slice(0, 10);
      console.log(fechaFormateada);

      let dataC = {
        //IdRecordatorio:props.data.IdRecordatorio,
        IdCliente: idCliente,
        Nota: Nota.toUpperCase(),
        //fecha: fecha,
        fecha: fechaFormateada

      };
      console.log(dataC);

      let dataB = {
        Id: props.data.IdRecordatorio
      }

      let dataUsuario = {
        Id: props.idUsuario
      }
      const bitacora = {
        urlB: urlBitacoraAggCita,
        activo: props.activo,
        dataB: dataUsuario,
      };

      //console.log(data);
      axios.post(urlPostCitas, dataC).then(response => {
        swal('Cita agregada con éxito', '', 'success').then(result => {
          Bitacora(bitacora);
          navegate('/recordatorio');
        });

      }).catch(error => {
        console.log(error);
        swal("¡Error al agregar cita! es posible que ya exista", "", "error")

      });


    }).catch(error => {
      console.log(error);
      swal("Error al obtener la fecha.", "", "error")
    });

    /* setFecha(response.data)
    console.log(response.data) */



    return navegate('/recordatorio');
  };


  return (
    <div className="divSection">
      <div className="divInfoQuestion1">
        <Button className="btnBack" onClick={handleBack}>
         <ArrowBackIcon className="iconBack" />
       </Button>
       <div className="contRecordatorios">
        <div className="contRecordCitas">
          <div >
            <h1>Nueva Cita</h1>
            <hr />
            <div className="contPrincipalNewCita">
              <div className="contNewCita">
                <TextCustom text="Cliente" className="titleInput" />
                <div className="contInput">
                  {/* <select id="idClientes" className="inputCustomPreguntas">
                    {tableData.length ? (
                      tableData.map(pre => (
                        <option key={pre.idCliente} value={pre.idCliente}>
                             {`${pre.idCliente} - ${pre.nombre}`}
                        </option>
                      ))
                    ) : (
                      <option value="No existe informacion">
                        No existe informacion
                      </option>
                    )}
                  </select> */}
                  <Select
                    id="idClientes"
                    // className="inputCustomPreguntas"
                    options={tableData.map(pre => ({ value: pre.idCliente, label: `${pre.idCliente} - ${pre.nombre}  ${pre.apellido}` }))}
                    value={selectedOption}
                    onChange={setSelectedOption}
                    placeholder="Seleccione un cliente"
                  />


                </div>
              </div>


              {/* 
              <div className="contNewCita">
                <TextCustom text="Fecha" className="titleInput" />   */}
              {/* <DatePicker
                  type="text"
                  name=""
                  maxLength={40}
                  className="inputCustom"
                  placeholderText="Fecha"
                  id="fecha"
                /> */}

              {/*     <input type="date" className="inputCustom" id="fecha" ></input>  */}

              {/*   <input
                  //onChange={e => setFecha(e.target.value)}
                  type="text"
                  id="fecha"
                  className="inputCustom"
                  placeholderText="Fecha"
                  value={fecha}
                  disabled
                ></input>  */}
              {/*     </div>  */}


              <div className="contNewCita">
                <TextCustom text="Nota" className="titleInput" />
                <input
                  onKeyDown={e => {
                    setNotas(e.target.value);
                    if (Notas === '') {
                      setErrorNotas(true);
                      setMsj('Los campos no deben estar vacíos');
                    } else {
                      setErrorNotas(false);
                      var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                      if (!regex.test(Notas)) {
                        setErrorNotas(true);
                        setMsj('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                      } else if (/(.)\1{2,}/.test(Notas)) {
                        setErrorNotas(true);
                        setMsj('No se permiten letras consecutivas repetidas');
                      } else {
                        setErrorNotas(false);
                        setMsj('');
                      }
                    }
                  }}

                  onChange={e => setNotas(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                  error={errorNotas}
                  type="text"
                  helperText={Msj}
                  name=""
                  maxLength={40}
                  className="inputCustomText"
                  placeholder="Nota"
                  id="nota"
                  value={Notas}
                />
                {/*  <p className='error'>{Msj}</p> */}
              </div>


              <div className="contBtnStepperRecord">

                <Button
                  className='btnStepperCan'
                  onClick={() => navegate('/recordatorio')}
                >Cancelar</Button>

                <Button
                  className='btnStepperGuardar'
                  onClick={() => {

                    var nota = document.getElementById("nota").value;

                    if (nota === "") {
                      swal("No deje campos vacíos.", "", "error");
                    } else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(nota)) {
                      swal("El campo nombre solo acepta letras mayúsculas y solo un espacio entre palabras.", "", "error");
                    } else if (/(.)\1{2,}/.test(nota)) {
                      setErrorNotas(true);
                      swal("El campo nombre no acepta letras mayúsculas consecutivas repetidas.", "", "error");
                    } else {
                      handleClick();
                    }
                  }}
                >Guardar</Button>

              </div>
            </div>
          </div>
        </div>


      </div>
      </div>

      <div className="divImgSection">
        <img src={oftalmologoFondo} alt="Iamgen no encontrada" />
      </div>
    </div>
  );
};
