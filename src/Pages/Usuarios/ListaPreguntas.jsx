import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';
import swal from '@sweetalert/with-react';

//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import axios from 'axios';

//import { PageThree } from '../../Components/LoginPorPrimeraVez/PageThree/PageThree';

export const ListaPreguntas = (props) => {
  const [cambio, setCambio] = useState(0);
  const [generos, setGeneros] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const urlEmployees = 'http://localhost:3000/api/empleado';
  const urlDelEmployees = 'http://localhost:3000/api/empleado/eliminar';
 
//--------------------URL DE BITACORA--------------------
const urlDelBitacora = 
'http://localhost:3000/api/bitacora/EliminarEmpleado';

const urlBitacoraBotonSalirLE= 
'http://localhost:3000/api/bitacora/SalirListaEmpleado';
//--------------------------------------------------------


const urlPyR= 'http://localhost:3000/api/pregYresp'


  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [Nombre, setNombre] = useState('');
  const [errorNombre, setErrorNombre] = useState(false);
  const [Msj, setMsj] = useState(false);

  const [Apellido, setApellido] = useState('');
  const [errorApellido, setErrorApellido] = useState(false);
  const [aviso, setAviso] = useState(false);

  const [errorTelefono, setErrorTelefono] = useState(false);
  const [texto, setTexto] = useState(false);

  const dataId = {
    Id_Usuario:props.idUsuario,
  }; 
  //axios para que me traiga las preguntas y respuestas
  useEffect(() => {
    axios
      .post(urlPyR,dataId)
      .then(response => {
        setTableData(response.data);
      })
      .catch(error => console.log(error));
  }, [cambio]);

  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [
    //son los de la base no los de node
    { field: 'Pregunta', headerName: 'Preguntas', width: 550 },
    { field: 'Respuesta', headerName: 'Respuestas', width: 550,
      valueGetter: (params) => {
        // Obtener la respuesta original
        const originalRespuesta = params.row.Respuesta;
        
        // Crear un string de asteriscos con la misma longitud que la respuesta original
        const asterisks = '*'.repeat(originalRespuesta.length);
        
        return asterisks;
      },},
    
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
    },
  ];

  //funcion de eliminar
  function handleDel(id) {
    swal({
      content: (
        <div>

          <div className="logoModal">¿Desea Eliminar esta Pregunta?</div>
          <div className="contEditModal">

          </div>

        </div>
      ),
      buttons: ['Eliminar', 'Cancelar'],
    }).then(async op => {
      switch (op) {
        case null:
          
          let data = {
            IdEmpleado: id,
          };

          //Funcion de Bitacora 
          let dataB = {
            Id:props.idUsuario
          }

          console.log(data);

          await axios
            .delete(urlDelEmployees, { data })
            .then(response => {
              axios.post (urlDelBitacora, dataB) //Bitacora de eliminar un empleado
              swal('Pregunta eliminada correctamente', '', 'success');
              setCambio(cambio + 1);
            })
            .catch(error => {
              console.log(error);
              swal('Error al eliminar pregunta', '', 'error');
            });

          break;

        default:
          break;
      }
    });
  }

  //funcion de actualizar


  function handleUpdt(id) {
    // onRowClick={empleado => {
    swal({
      buttons: {
        update: 'ACTUALIZAR',
        cancel: 'CANCELAR',
      },
      content: (
        <div className="logoModal">
          ¿Desea modificar esta pregunta: ?
        </div>
      ),
    }).then(op => {
      switch (op) {
        case 'update':
          props.data(id)
          props.update(true)
          //navegate('../Components/LoginPorPrimeraVez/PageThree/PageThree')
      }
    });

    //}//}//
  }

 //Funcion de Bitacora 
 let dataB = {
  Id:props.idUsuario
}

  const handleBack = () => {
    //axios.post (urlBitacoraBotonSalirLE,dataB)
    navegate('/config/perfil');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Preguntas y Respuestas</h2>

      <div
        style={{
          height: 400,
          width: '85%',
          position: 'relative',
          left: '130px',
        }}
      >
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
              onClick={() => {
                navegate('');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo
            </Button>
            {/* <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button> */}
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.Id_Pregunta}//este id me permite traer la lista
          rows={filteredData}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={5}
          //aqui iba el onrow
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};