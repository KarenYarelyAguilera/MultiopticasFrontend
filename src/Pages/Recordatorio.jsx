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

  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
  };

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
        <div className="contAddRecordatorio">
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
        </div>
      </section>
    </div>
  );
};
