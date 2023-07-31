// React, { useCallback} from 'react';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';




import { DataGrid, esES } from '@mui/x-data-grid';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router';
import swal from '@sweetalert/with-react';


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

export const Recordatorio = (props) => {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState(events);

  const [cambio, setCambio] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [citas, setCitas] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  // Estado para almacenar la fecha seleccionada
  const [selectedDate, setSelectedDate] = useState('')

  const navegate = useNavigate();

  const urlGetCitas = 'http://localhost:3000/api/recordatorios';
  const urlGetCita = 'http://localhost:3000/api/recordatorio';

  const handleAddEvent = () => {
    navegate("/recordatorioCitas");

  };

  const handleBack = () => {
    //axios.post (urlBitacoraBotonSalirLE,dataB)
    navegate('/dashboard');
  };


 


  const objectDate = new Date();
  const day = objectDate.getDate();
  const month = objectDate.getMonth();
  const year = objectDate.getFullYear();
  let format1 = month + "/" + day + "/" + year;


  /* 
    useEffect(() => {
      axios.get(urlGetCita).then(response => {
        setCitas(response.data)
      }).catch(error => console.log(error))
    }, []);
   */













  useEffect(() => {
    axios.get(urlGetCita).then(response => {
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, [cambio]);

  const filteredData = tableData.filter(row =>
    Object.values(row.fecha).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );
 

   // Función para manejar el cambio en el input de fecha
/*    const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Actualizar el estado con la fecha seleccionada
  };


  const filteredData = tableData.filter(row => {
    // Asegurarse de que la columna "fecha" esté en formato ISO 8601 ("YYYY-MM-DD")
    const rowDate = row.fecha ? row.fecha.slice(0, 10) : '';
    return (
      rowDate &&
      rowDate === selectedDate // Comparar si la fecha de la fila coincide con la fecha seleccionada
    );
  }); */




  const columns = [
    //son los de la base no los de node
    { field: 'IdCliente', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 100 },
    { field: 'Nota', headerName: 'Nota', width: 150 },
    { field: 'fecha', headerName: 'Fecha', width: 200 },


    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 260,


      renderCell: params => (
        <div className="contActions1">
          <Button className="btnEdit" onClick={() => handleUpdt(params.row.fecha)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleDel(params.row.fecha)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  //funcion de eliminar
  function handleDel(id) {
    swal({
      content: (
        <div>
          <div className="logoModal">¿Desea Eliminar esta Respuesta? </div>
          <div className="contEditModal"></div>
        </div>
      ),
      buttons: ['Eliminar', 'Cancelar'],
    }).then(async op => {
      switch (op) {
        case null:

          let data = {
            Id_Pregunta: id,
          };
          console.log(data);

          /* await axios.delete(urlDelRespuesta, { data }).then(response => {
              swal('Respuesta eliminada correctamente', '', 'success');
              setCambio(cambio + 1);
            })
            .catch(error => {
              console.log(error);
              swal('Error al eliminar respuesta', '', 'error');
            }); */

          break;

        default:
          break;
      }
    });
  }

  //funcion de actualizar
  function handleUpdt(id) {
    console.log(id);

    /* let data = {
      Id_Pregunta:id,
    }; */

    props.data({
      Id_Pregunta: id,
    })


    swal({
      buttons: {
        update: 'ACTUALIZAR',
        cancel: 'CANCELAR',
      },
      content: (
        <div className="logoModal">
          ¿Desea modificar esta pregunta: ? {id.Id_Pregunta}
        </div>
      ),
    }).then(op => {
      switch (op) {
        case 'update':

          let data = {
            Id_Pregunta: id,
          };
          console.log(data)

          props.data(id)
          props.update(true)

          navegate("/");
      }
    });
  }




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

  /*  const onSelectSlot = useCallback(slotInfo => {
     swal(
     <div>
       <input
         type="text"
         placeholder="Add Title"
         style={{ width: '20%', marginRight: '10px' }}
         value={newEvent.title}
         onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
       />
       <DatePicker
         placeholderText="Start Date"
         style={{ marginRight: '10px' }}
         selected={newEvent.start}
         onChange={start => setNewEvent({ ...newEvent, start })}
       />
       <DatePicker
         placeholderText="End Date"
         style={{ marginRight: '10px' }}
         selected={newEvent.end}
         onChange={end => setNewEvent({ ...newEvent, end })}
       />
     </div>
     ).then(() => {
       <button onClick={handleAddEvent}></button>
     });
   }, []); */



  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Citas Programasdas</h2>

      <div
        style={{
          height: 400,
          width: '85%',
          position: 'relative',
          left: '130px',
        }}>
        <div className="contFilter">
          {/* <div className="buscador"> */}
         {/*  <SearchIcon
            style={{ position: 'absolute', color: 'gray', paddingLeft: '10px' }}
          /> */}

           {/* Input de tipo "date" para seleccionar la fecha */}
          {/*   <input type="date" value={selectedDate}  onChange={handleDateChange} /> */}
          <input type="date" id="dateInput"></input>


          {/* <DatePicker
            type="text"
            className="inputSearch"
            placeholderText="Buscar por fecha"
            id="fecha"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          /> */}
        
          {/* <input
          type="text"
          className="inputSearch"
          placeholder="Buscar"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          /> */}


          {/* </div> */}
          <div className="btnActionsNewReport">
            <Button
              className="btnCreate"
              onClick={() => {
                navegate('/recordatorioCitas');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo
            </Button>

          </div>  
        </div>
        <DataGrid
          getRowId={tableData => tableData.fecha}//este id me permite traer la lista
          //getRowId={row => row.fecha} // Utiliza la propiedad "fecha" como el ID para las filas
          rows={filteredData}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
     
    </div>
  );
};

