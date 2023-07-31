import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect, React } from 'react';
import { Await, useNavigate } from 'react-router';
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
/*   const [generos, setGeneros] = useState([]);
  const [sucursales, setSucursales] = useState([]); */

 
//--------------------URL DE BITACORA--------------------
const urlDelBitacora = 
'http://localhost:3000/api/bitacora/EliminarEmpleado';

const urlBitacoraBotonSalirLE= 
'http://localhost:3000/api/bitacora/SalirListaEmpleado';
//--------------------------------------------------------


const urlPyR= 'http://localhost:3000/api/pregYresp'
const urlDelRespuesta= 'http://localhost:3000/api/eliminarRespuesta'
const urlPregunta = 'http://localhost:3000/api/pregunta';


  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [Preguntas, setPreguntas] = useState([]);


  const navegate = useNavigate();

 /*  const [Nombre, setNombre] = useState('');
  const [errorNombre, setErrorNombre] = useState(false);
  const [Msj, setMsj] = useState(false);

  const [Apellido, setApellido] = useState('');
  const [errorApellido, setErrorApellido] = useState(false);
  const [aviso, setAviso] = useState(false);

  const [errorTelefono, setErrorTelefono] = useState(false);
  const [texto, setTexto] = useState(false); */

  const dataId = {
    Id_Usuario:props.idUsuario,
  }; 
  //axios para que me traiga las preguntas y respuestas
  useEffect(() => {
    axios.post(urlPyR,dataId).then(response => {
      setTableData(response.data);})
      .catch(error => console.log(error));
  }, [cambio]);

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [
    //son los de la base no los de node
    { field: 'Id_Pregunta', headerName: 'Id_Pregunta', width: 150 },
    { field: 'Pregunta', headerName: 'Preguntas', width: 350 },
    { field: 'Respuesta', headerName: 'Respuestas', width: 250,
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
          <Button className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete" onClick={() => handleDel(params.row.Id_Pregunta)}
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
            Id_Pregunta:id,
          };
          console.log(data);

          await axios.delete(urlDelRespuesta, { data }).then(response => {
              swal('Respuesta eliminada correctamente', '', 'success');
              setCambio(cambio + 1);
            })
            .catch(error => {
              console.log(error);
              swal('Error al eliminar respuesta', '', 'error');
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
      Id_Pregunta: id.Id_Pregunta,
      Pregunta:id.Pregunta,
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

          navegate("/editarPreguntas");
      }
    });
  } 




/*   function handleUpdt(id) {

    console.log(id);
    
    swal(
      <div>
        <div className="logoModal">Datos a actualizar</div>
        <div className="contEditModal">
          <div className="contInput">
            <TextCustom text="Pregunta:" className="titleInput" />
            <input
              type="text"
              id="Preguntas"
              className='inputCustom'
              placeholder="Pregunta"
              value={id.Pregunta}
            />
          </div>
  
          <div className='contInput'>
            <TextCustom text="Respuesta:" className="titleInput" />
            <input
              maxLength="20"
              type="text"
              name=""
              className="inputCustom"
              placeholder="Respuesta"
              id='respuestap'
              value={columns.Respuesta}
            />
          </div>
        
          
        </div>
      </div>
    ).then( async() => {
  
      let Pregunta = document.getElementById('Preguntas').value
      let Respuesta = document.getElementById('respuestap').value
      
  
  
      let data = {
        Pregunta:Pregunta,
        Respuesta: Respuesta,
        Id_Pregunta: id,
      };


      let dataId = {
        Id_Pregunta: id,
      };
  
   
       await axios.get(urlPregunta,dataId).then(response => {
          setPreguntas(response.data);
          console.log(response.data);
        }).catch(error => console.log(error))
     
  


  
  
    });
  
  }
 */




  const handleBack = () => {
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
                navegate('/preguntasPerfil');
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