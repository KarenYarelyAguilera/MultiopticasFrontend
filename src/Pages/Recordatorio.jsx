
import React, { useCallback, useState } from 'react';
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

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router';


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

export const Recordatorio = () => {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState(events);

  const navegate = useNavigate();

  const handleAddEvent = () => {
    navegate("/recordatorioCitas");

  };

  const objectDate = new Date();
  const day = objectDate.getDate();
  const month = objectDate.getMonth();
  const year = objectDate.getFullYear();
  let format1 = month + "/" + day + "/" + year;

  const citas = [
    {
      paciente: "Kevin Lopez",
      fecha: format1,
    },
    {
      paciente: "Michael Sosa",
      fecha: format1,
    },
    {
      paciente: "Juan Perez",
      fecha: format1,
    }
  ];

  const proximasCitas = [
    // {
    //   paciente: "Manuel Gonzales",
    //   fecha: format1,
    // },
    // {
    //   paciente: "Juan Lopez",
    //   fecha: format1,
    // },
    // {
    //   paciente: "Ana Salgado",
    //   fecha: format1,
    // }
  ];

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

  return (
    <div className='ContUsuarios'>
      <div className="contRecordatorios">
        <div className="contRecordCitas">
          <div className="cardCitas">
            <h1>Citas</h1>
            <h2>Citas programadas para este mes</h2>
            <hr />
            <div className="listCitas">
              {citas.length ? (
                citas.map((citasM, index) => (
                  <div key={index}>
                    <span><KeyboardArrowRightIcon/>{citasM.paciente}</span>
                    <span className='fechaCita'>{citasM.fecha}</span>
                  </div>
                  ))
                  ) : (
                    <h1>No tienes citas programadas en este momento.</h1>
              )}
            </div>
          </div>

          <div className="cardCitas">
            <h1>Proximas citas</h1>
            <hr />
            <div className="listCitas">
              {proximasCitas.length ? (
                proximasCitas.map((proximasCitasM, index) => (
                  <div key={index}>
                    <span><KeyboardArrowRightIcon/>{proximasCitasM.paciente}</span>
                    <span className='fechaCita'>{proximasCitasM.fecha}</span>
                  </div>
                  ))
                  ) : (
                    <h1 className='advertencia'>No tienes proximas citas programadas en este momento.</h1>
              )}
            </div>
          </div>
          </div>
      <section className="contPrimaryRecord">
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
          onSelectSlot={(e)=>console.log(e)}
          culture='es'
          localizer={localizer}
          events={allEvents}
          className='calendar'
          startAccessor="start"
          endAccessor="end"
          style={{ width: '103%', height: '80vh' }}
          // onSelectSlot={onSelectSlot}
        ></Calendar>
          <button onClick={handleAddEvent} className='btnGuardarRecor'>Agregar Cita</button>
      </section>
      </div>
    </div>
  );
};
