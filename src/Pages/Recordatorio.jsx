//import React, { useCallback, useState } from 'react';
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

//Mui-Material-Icons
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

import { DataGrid, esES } from '@mui/x-data-grid';
import axios from 'axios';
import { useState, useEffect, React } from 'react';

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

export const Recordatorio =  () => {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState(events);

  const [cambio, setCambio] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [citas, setCitas] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');

  const navegate = useNavigate();

  const urlGetCitas = 'http://localhost:3000/api/recordatorios';
  const urlGetCita = 'http://localhost:3000/api/recordatorio';

  const handleAddEvent = () => {
    navegate("/recordatorioCitas");

  };

  const handleBack = () => {
    //axios.post (urlBitacoraBotonSalirLE,dataB)
    navegate('/');
  };

  const objectDate = new Date();
  const day = objectDate.getDate();
  const month = objectDate.getMonth();
  const year = objectDate.getFullYear();
  let format1 = month + "/" + day + "/" + year;



  useEffect(() => {
    axios.get(urlGetCita).then(response => {
      setCitas(response.data)
    }).catch(error => console.log(error))
  }, []);

  












  useEffect(() => {
    axios.get(urlGetCitas).then(response => {
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, []);

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );





  const columns = [
    //son los de la base no los de node
    { field: 'IdCliente', headerName: 'Id', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 100 },
    { field: 'Nota', headerName: 'Nota', width: 150},
    { field: 'fecha', headerName: 'Fecha', width: 200 },

/* 
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 260,


      renderCell: params => (
        <div className="contActions1">
          <Button className="btnEdit" onClick={() => handleUpdt(params.row.Id_Usuario)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleDel(params.row.Id_Usuario)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    }, */
  ];



  /*  const citas = [
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
 */
  //const proximasCitas = [
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
 // ];

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
          
      
          {/* <div className="cardCitas">
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
          </div> */}
  
          <div style={{ height: 400, width: '100%',  position: 'relative', left: '50px', }} >
            <h2>Citas</h2>
            <h1>Citas programadas para este mes</h1>
            <br />
            <hr />

            <br />
            <div className="contNewCita">
                <TextCustom text="Fecha" className="titleInput" />
                <div className="contInput">
                  <select id="fecha" className="inputCustomPreguntas">
                    {citas.length ? (
                      citas.map(pre => (
                        <option key={pre.IdRecordatorio} value={pre.IdRecordatorio}>
                          {pre.fecha}
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

              {/*  <div className="contFilter"> */}
              {/* <div className="buscador"> */}
              {/*  <SearchIcon
                  style={{ position: 'absolute', color: 'gray', paddingLeft: '10px' }}
                /> */}
              {/* <input
                  type="text"
                  className="inputSearch"
                  placeholder="Buscar"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                /> */}
              {/* </div> */}
              {/*  <div className="btnActionsNewReport">
                  <Button
                    className="btnCreate"
                    onClick={() => {
                      navegate('/recordatorioCitas');
                    }}
                  >
                    <AddIcon style={{ marginRight: '5px' }} />
                    Nuevo
                  </Button>
                </div> */}
              {/*   </div> */}

            <br />
            <DataGrid
              getRowId={tableData => tableData.fecha}//este id me permite traer la lista
              rows={filteredData}
              columns={columns}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              pageSize={5}
              //aqui iba el onrow
              rowsPerPageOptions={[5]}
            />


          </div>





       
            <br />
          {/* <div className="cardCitas">
            <h1>Proximas citas</h1>
            <hr />
            <div className="listCitas">
              {proximasCitas.length ? (
                proximasCitas.map((proximasCitasM, index) => (
                  <div key={index}>
                    <span><KeyboardArrowRightIcon />{proximasCitasM.paciente}</span>
                    <span className='fechaCita'>{proximasCitasM.fecha}</span>
                  </div>
                ))
              ) : (
                <h1 className='advertencia'>No tienes proximas citas programadas en este momento.</h1>
              )}
            </div>
          </div>  */}

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
          <button onClick={handleAddEvent} className='btnGuardarRecor'>Agregar Cita</button>
        </section> 

      </div>
    </div>
  );
};

