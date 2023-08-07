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

  const navegate = useNavigate();
  const [cambio, setCambio] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [Preguntas, setPreguntas] = useState([]);

  const urlPyR = 'http://localhost:3000/api/pregYresp'
  const urlDelRespuesta = 'http://localhost:3000/api/eliminarRespuesta'
  const urlPregunta = 'http://localhost:3000/api/pregunta';
  //parametros
  const [Parametro, setParametro] = useState('');
  const urlParametro = 'http://localhost:3000/api/parametros/AdminPreguntas';


  const dataId = {
    Id_Usuario: props.idUsuario,
  };

  //axios para que me traiga las preguntas y respuestas
  useEffect(() => {
    axios.post(urlPyR, dataId).then(response => {
      setTableData(response.data);
    })
      .catch(error => console.log(error));
  }, [cambio]);

  useEffect(() => {
    const filteredData = tableData.filter(row =>
      Object.values(row).some(
        value =>
          value &&
          value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
      ),
    );
    setFilteredData(filteredData);
  }, [tableData, searchTerm]);

  const columns = [
    //son los de la base no los de node
    //{ field: 'Id_Pregunta', headerName: 'Id_Pregunta', width: 100, headerAlign: 'center' },
    { field: 'Pregunta', headerName: 'Preguntas', width: 350, headerAlign: 'center' },
    {
      field: 'Respuesta', headerName: 'Respuestas', width: 250, headerAlign: 'center',
      valueGetter: (params) => {
        // Obtener la respuesta original
        const originalRespuesta = params.row.Respuesta;
        // Crear un string de asteriscos con la misma longitud que la respuesta original
        const asterisks = '*'.repeat(originalRespuesta.length);
        return asterisks;
      },
    },
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 100, headerAlign: 'center',

      renderCell: params => (
        <div className="contActions1">
          {/* <Button className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button> */}
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
          <div className="logoModal">¿Desea Eliminar esta Pregunta? </div>
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

          await axios.delete(urlDelRespuesta, { data }).then(response => {
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

  //funcion de actualizar que no la utilizo aqui, pero sirve UwU
  function handleUpdt(id) {
    console.log(id);

    /* let data = {
      Id_Pregunta:id,
    }; */

    props.data({
      Id_Pregunta: id.Id_Pregunta,
      Pregunta: id.Pregunta,
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




  const handleBack = () => {
    navegate('/config/perfil');
  };


  const handleClick = async () => {
    try {
      const response = await axios.get(urlParametro);
      setParametro(response.data);
      //console.log(response.data);

      const cantidadRegistros = filteredData.length;
      //console.log(cantidadRegistros);

      if (cantidadRegistros > parseInt(response.data)) {
        swal("Ya no puede agregar más preguntas", "", "error");
      } else if (cantidadRegistros === parseInt(response.data)) {
        swal("Ya llegó al límite de preguntas para configurar", "", "error");
        /* } else if (cantidadRegistros === 0) {
         swal("Debe agregar al menos una pregunta", "", "error");  */
      } else {
        navegate('/preguntasPerfil');
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };


  return (
    <div className="ContProfile">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Preguntas de configuración</h2>

      <div
        style={{
          height: 400,
          width: '80%',
          position: 'relative',
          left: '190px',
        }}
      >
        <div className="contFilter">
          {/* <div className="buscador"> */}
          {/*  <SearchIcon
            style={{ position: 'absolute', color: 'gray', paddingLeft: '10px' }}
          />
          <input
            type="text"
            className="inputSearch"
            placeholder="Buscar"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          /> */}
          {/* </div> */}
          <div className="btnActionsNewReport">

            <Button
              style={{ position: 'absolute', color: 'gray', paddingLeft: '10px', alignItems: 'center' }}
              className="btnCreate"
              onClick={handleClick}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.Id_Pregunta}//este id me permite traer la lista
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