
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

export const RecordatorioCitas = () => {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState(events);
  const navegate = useNavigate();

  const [Nombre, setNombre] = useState([]);
  const [tableData, setTableData] = useState([]);


  const urlCitas = 'http://localhost:3000/api/recordatorioCitas/agregar';
  const urlClientes = 'http://localhost:3000/api/clientes';
  

  //para las preguntas
  useEffect(() => {
    axios.get(urlClientes).then(response => {
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, []);



  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
  };

  const handleBack = () => {
    navegate('/recordatorio');
  };

  const objectDate = new Date();
  const day = objectDate.getDate();
  const month = objectDate.getMonth();
  const year = objectDate.getFullYear();
  let format1 = month + "/" + day + "/" + year;


  // const onSelectSlot = useCallback(slotInfo => {
  //   swal(
  //   <div>
  //     <input
  //       type="text"
  //       placeholder="Add Title"
  //       style={{ width: '20%', marginRight: '10px' }}
  //       value={newEvent.title}
  //       onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
  //     />
  //     <DatePicker
  //       placeholderText="Start Date"
  //       style={{ marginRight: '10px' }}
  //       selected={newEvent.start}
  //       onChange={start => setNewEvent({ ...newEvent, start })}
  //     />
  //     <DatePicker
  //       placeholderText="End Date"
  //       style={{ marginRight: '10px' }}
  //       selected={newEvent.end}
  //       onChange={end => setNewEvent({ ...newEvent, end })}
  //     />
  //   </div>
  //   ).then(() => {z
  //     <button onClick={handleAddEvent}>
  //     </button>
  //   }
  //   );
  // }, []);




  const handleClick = async () => {


    let idCliente = parseInt(document.getElementById('idClientes').value);
    let Nota = document.getElementById('nota').value;
    let fecha = document.getElementById('fecha').value




    let data = {
      // IdRecordatorio:IdRecordatorio,
      IdCliente: idCliente,
      Nota: Nota,
      fecha: fecha,

    };


    //console.log(data);

    await axios.post(urlCitas, data).then(response => {
      swal('Cita agregado con éxito', '', 'success').then(result => {
        navegate('/recordatorio');
      });

    }).catch(error => {
      console.log(error);
      swal("Error al agendar cita.", "", "error")

    });
    return navegate('/recordatorio');
  };


  return (
    <div className='ContUsuarios'>
      <Button className="btnBack" style={{ top: "-35px" }} onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="contRecordatorios">
        <div className="contRecordCitas">
          <div className="cardCitas">
            <h1>Nueva Cita</h1>
            <hr />
            <div className="contPrincipalNewCita">
              <div className="contNewCita">
                <TextCustom text="Cliente" className="titleInput" />
                <div className="contInput">
                  <select id="idClientes" className="inputCustomPreguntas">
                    {tableData.length ? (
                      tableData.map(pre => (
                        <option key={pre.idCliente} value={pre.idCliente}>
                          {pre.nombre}
                        </option>
                      ))
                    ) : (
                      <option value="No existe informacion">
                        No existe informacion
                      </option>
                    )}
                  </select>
                </div>
              </div>



              <div className="contNewCita">
                <TextCustom text="Fecha" className="titleInput" />
                <DatePicker
                  type="text"
                  name=""
                  maxLength={40}
                  className="inputCustom"
                  placeholderText="Fecha"
                  id="fecha"
                />
              </div>


              <div className="contNewCita">
                <TextCustom text="Nota" className="titleInput" />
                <input
                  type="text"
                  name=""
                  maxLength={40}
                  className="inputCustomText"
                  placeholder="Nota"
                  id="nota"
                />
              </div>


              <div className="contNewCitaButtons">
                <button className='btnAgregarCita' onClick={handleClick}>Agregar</button>
                <button className='btnCancelar' onClick={handleBack} >Cancelar</button>
              </div>
            </div>
          </div>
        </div>

        <section className="contPrimary">
          <Calendar
            messages={{
              next: "Siguiente",
              previous: "Atras",
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día"
            }}
            selectable
            popup={true}
            onSelectSlot={(e) => console.log(e)}
            culture='es'
            localizer={localizer}
            events={allEvents}
            className='calendar'
            startAccessor="start"
            endAccessor="end"
            style={{ width: '103%', height: '80vh' }}
          // onSelectSlot={onSelectSlot}
          ></Calendar>
          {/* <div className="contAddRecordatorio">
          <div className="inputConte">
          <TextCustom text='Titulo' className='titleInput'/>
          <input
            type="text"
            placeholder="Titulo"
            className='inputCustom'
            value={newEvent.title}
            onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          </div>
          <div className='inputConte'>
          <TextCustom text='Fecha Inicial' className='titleInput'/>
          <DatePicker
            placeholderText="Fecha"
            className='inputCustom'
            selected={newEvent.start}
            onChange={start => setNewEvent({ ...newEvent, start })}
          />

          </div>
          <div className="inputConte">
          <TextCustom text='Fecha Final' className='titleInput'/>
          <DatePicker
            placeholderText="Fecha"
            selected={newEvent.end}
            className='inputCustom'
            onChange={end => setNewEvent({ ...newEvent, end })}
          />
          </div>
          <button onClick={handleAddEvent} className='btnGuardarRecor'>Guardar</button>
        </div> */}
        </section>

        
      </div>
    </div>
  );
};
