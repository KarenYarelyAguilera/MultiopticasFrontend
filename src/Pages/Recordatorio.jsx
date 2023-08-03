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
  const urlDelCita = 'http://localhost:3000/api/eliminarCita'

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
    Object.values(row).some(
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
    { field: 'IdRecordatorio', headerName: 'No.', width: 50, headerAlign: 'center' },
    { field: 'IdCliente', headerName: 'Identidad', width: 120, headerAlign: 'center' },
    { field: 'nombre', headerName: 'Nombre', width: 100, headerAlign: 'center' },
    { field: 'apellido', headerName: 'Apellido', width: 100, headerAlign: 'center' },
    { field: 'Nota', headerName: 'Nota', width: 290, headerAlign: 'center' },
    { field: 'fecha', headerName: 'Fecha', width: 90, headerAlign: 'center' },


    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190, headerAlign: 'center',


      renderCell: params => (
        <div className="contActions1">
          <Button className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleDel(params.row.IdRecordatorio)}
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
          <div className="logoModal">¿Desea Eliminar esta cita? </div>
          <div className="contEditModal"></div>
        </div>
      ),
      buttons: ['Eliminar', 'Cancelar'],
    }).then(async op => {
      switch (op) {
        case null:

          let data = {
            IdRecordatorio: id,
          };
          console.log(data);

          await axios.delete(urlDelCita, { data }).then(response => {
            swal('Cita eliminada correctamente', '', 'success');
            setCambio(cambio + 1);
          })
            .catch(error => {
              console.log(error);
              swal('Error al eliminar cita', '', 'error');
            });

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
      IdRecordatorio: id.IdRecordatorio,
      nombre: id.nombre,
      fecha: id.fecha,
      Nota: id.Nota,
    })





    swal({
      buttons: {
        update: 'ACTUALIZAR',
        cancel: 'CANCELAR',
      },
      content: (
        <div className="logoModal">
          ¿Desea modificar esta cita: {id.nombre} ?
        </div>
      ),
    }).then(op => {
      switch (op) {
        case 'update':

          let data = {
            IdRecordatorio: id.IdRecordatorio,
            nombre: id.nombre,


          };
          console.log(data)

          props.data(id)
          props.update(true)

          navegate("/recordatorioCitasEditar");
      }
    });
  }




  return (
    <div className="ContUsuarios">
      {/* <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button> */}
      <h2 style={{ color: 'black', fontSize: '40px' }}>Citas Programadas</h2>

      <div
        style={{
          height: 400,
          width: '80%',
          position: 'relative',
          left: '100px',
        }}>

        <div className="contFilter">
          {/* <div className="buscador"> */}
          <SearchIcon
            style={{ position: 'absolute', color: 'gray', paddingLeft: '10px' }}
          />
          <input
            type="text"
            className="inputSearch"
            placeholder="Buscar"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {/* </div> */}
          <div className="btnActionsNewReport">
            <Button
              className="btnCreate"
              onClick={() => { navegate('/recordatorioCitas'); }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>

        <DataGrid
          getRowId={tableData => tableData.IdRecordatorio}//este id me permite traer la lista
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

