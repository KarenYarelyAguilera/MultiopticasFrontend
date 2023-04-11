// import React, { useCallback, useState } from 'react';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import format from 'date-fns/format';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from 'date-fns/getDay';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import swal from '@sweetalert/with-react';

// const locales = {
//   'en-US': require('date-fns/locale/en-US'),
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// const events = [
//   {
//     title: 'Big Meeting',
//     allDay: true,
//     start: new Date(2023, 3, 4),
//     end: new Date(2023, 3, 4),
//   },
//   {
//     title: 'Vacation',
//     start: new Date(2023, 3, 5),
//     end: new Date(2023, 3, 5),
//   },
//   {
//     title: 'Conference',
//     start: new Date(2023, 3, 5),
//     end: new Date(2023, 3, 5),
//   },
// ];

// export const Recordatorio = () => {
//   const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
//   const [allEvents, setAllEvents] = useState(events);

//   const handleAddEvent = () => {
//     setAllEvents([...allEvents, newEvent]);
//   };

//   const onSelectSlot = useCallback(slotInfo => {
//     swal(<h1>Hola</h1>);
//   }, []);

//   return (
//     <div>
//       <h2>Add New Event</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="Add Title"
//           style={{ width: '20%', marginRight: '10px' }}
//           value={newEvent.title}
//           onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
//         />
//         <DatePicker
//           placeholderText="Start Date"
//           style={{ marginRight: '10px' }}
//           selected={newEvent.start}
//           onChange={start => setNewEvent({ ...newEvent, start })}
//         />
//         <DatePicker
//           placeholderText="End Date"
//           style={{ marginRight: '10px' }}
//           selected={newEvent.end}
//           onChange={end => setNewEvent({ ...newEvent, end })}
//         />
//         <button style={{ marginTop: '10px' }} onClick={handleAddEvent}>
//           Add Event
//         </button>
//       </div>
//       <Calendar
//         selectable
//         localizer={localizer}
//         events={allEvents}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ width: 1300, height: 630, margin: '50px' }}
//         onSelectSlot={onSelectSlot}
//       ></Calendar>
//     </div>
//   );
// };
