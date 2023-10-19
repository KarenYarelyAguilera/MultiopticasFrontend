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

export const LoginxPrimeraVez = props => {




  const navigate = useNavigate();
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

  const dataUser = {
    Id_Usuario: props.idUsuario,
    user: props.user,
  };
  //console.log(dataUser);


  const dataId = {
    Id_Usuario: props.id,
  };
  console.log(dataId);

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
    { field: 'Pregunta', headerName: 'Preguntas', width: 450, headerAlign: 'center' },
    {
      field: 'Respuesta', headerName: 'Respuestas', width: 440, headerAlign: 'center',
      valueGetter: (params) => {
        // Obtener la respuesta original
        const originalRespuesta = params.row.Respuesta;
        // Crear un string de asteriscos con la misma longitud que la respuesta original
        const asterisks = '*'.repeat(originalRespuesta.length);
        return asterisks;
      },
    },
  ];



  const handleBack = () => {
    navigate('/');
  };




  const handleClick = async () => {
    try {
      const response = await axios.get(urlParametro);
      setParametro(response.data);
      console.log(response.data);

      const cantidadRegistros = filteredData.length;
      console.log(cantidadRegistros);

      if (cantidadRegistros > parseInt(response.data)) {
        swal("Ya no puede agregar más preguntas", "", "error");
      } else if (cantidadRegistros === parseInt(response.data)) {
        swal("Preguntas configuradas, porfavor configure la nueva contraseña", "", "success");
        navigate('/cambiocontrasenia'); //Redireccionar al nuevo componente
      } else if (cantidadRegistros === 0) {
        swal("Comenzando configuracion", "", "success");
        navigate('/preguntasLoginxPV');
      } else {
        navigate('/preguntasLoginxPV');
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };


  return (
    <div className="ContProfile">


      <div
        style={{
          height: 300,
          width: '80%',
          position: 'relative',
          left: '190px',
        }}
      >
        <br />
        <h2  >Configurar preguntas de seguridad</h2>
        <br />
        
        <div className="contFilter">
          <div className="btnActionsNewReport">
            <Button
              className="btnCreate"
              onClick={handleClick}
            >
              <AddIcon style={{ marginRight: '10px' }} />
              Agregar
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
