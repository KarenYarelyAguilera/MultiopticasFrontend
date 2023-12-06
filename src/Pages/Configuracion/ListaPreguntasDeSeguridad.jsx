//GENERADOR DE PFD
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import logoImg from "../../IMG/MultiopticaBlanco.png";
import fondoPDF from '../../IMG/FondoPDFH.jpg'



import swal from '@sweetalert/with-react';
import axios from 'axios';

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

//GENERADOR DE PDF
import { generatePDF } from '../../Components/generatePDF';

export const ListaPreguntasDeSeguridad = (props) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://194.163.45.55:4000/api/permiso/consulta'
  const dataPermiso = {
    idRol: props.idRol,
    idObj: 8
  }
  useEffect(() => {
    axios.post(urlPermisos, dataPermiso).then((response) => setPermisos(response.data))
  }, [])
  const [roles, setRoles] = useState([]);
  const [Departamento, setDepartamento] = useState([]);
  const [ciudad, setCiudad] = useState([]);
  const [cambio, setCambio] = useState(0)

  const urlDepartamentos = 'http://194.163.45.55:4000/api/preguntas';
  const urlCiudades = 'http://194.163.45.55:4000/api/ciudades';

  const urlSucursales = 'http://194.163.45.55:4000/api/sucursales';
  const urlDelSucursal = 'http://194.163.45.55:4000/api/sucursal/eliminar';

  const urlGetPreguntas = 'http://194.163.45.55:4000/api/preguntas';
  const urlDelPreguntas = 'http://194.163.45.55:4000/api/preguntas/eliminar'


  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [errordepartamento, setErrordepartamento] = useState(false);
  const [aviso, setaviso] = useState(false);


  const [mensaje, setmensaje] = useState('');
  const [errorciudad, setErrorciudad] = useState(false);

  const [direccion, setdireccion] = useState('');
  const [advertencia, setadvertencia] = useState('');
  const [errordireccion, setErrordireccion] = useState(false);

  const [descrpcion, setdescripcion] = useState('');
  const [msj, setmsj] = useState('');
  const [errordescripcion, setErrordescripcion] = useState(false);

  const [errorTelefono, setErrorTelefono] = useState(false);
  const [texto, setTexto] = useState(false);

  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

  //COLOCAR APIS DE BITACORA AQUI---  

  //-------------------------------------------------------------------

  /*   useEffect(() => {
      fetch(urlSucursales)
        .then(response => response.json())
        .then(data => setTableData(data));
      fetch(urlDepartamentos)
        .then(response => response.json())
        .then(data => setDepartamento(data));
        fetch(urlCiudades)
        .then(response => response.json())
        .then(data => setCiudad(data));
    }, [cambio]); */

  //IMPRIMIR PDF
  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const formatDataForPDF = () => {
        const formattedData = tableData.map((row) => {
          const fechaCre = new Date(row.fechaNacimiento);
          const fechaNacimiento = String(fechaCre.getDate()).padStart(2, '0') + "/" +
            String(fechaCre.getMonth()).padStart(2, '0') + "/" +
            fechaCre.getFullYear();
          return {
            'N°': row.Id_Pregunta,
            'Preguntas': row.Pregunta,
          };
        });
        return formattedData;
      };

      const urlPDF = 'Report_PreguntasDeSeguridad.pdf';
      const subTitulo = "LISTA DE PREGUNTAS DE SEGURIDAD"

      const orientation = "landscape";
      generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF);
    }

  };

  const navegate = useNavigate();


  useEffect(() => {
    axios.get(urlGetPreguntas).then(response => {
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

  const columns = [
    { field: 'Id_Pregunta', headerName: 'ID', width: 250 },
    { field: 'Pregunta', headerName: 'Preguntas', width: 550 },


    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190,

      renderCell: params => (
        <div className="contActions1">
          <Button className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleDel(params.row.Id_Pregunta)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  //FUNCION DE ELIMINAR 
  function handleDel(Id_Pregunta) {
    if (permisos[0].eliminar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
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
              Id_Pregunta: Id_Pregunta,
            };

            //Funcion de Bitacora 
            /*  let dataB = {
               Id:props.idUsuario
             } */

            console.log(data);

            await axios
              .delete(urlDelPreguntas, { data })
              .then(response => {
                //axios.post (urlDelBitacora, dataB) //Bitacora de eliminar un empleado
                swal('Pregunta eliminada correctamente', '', 'success');
                setCambio(cambio + 1);
              })
              .catch(error => {
                console.log(error);
                swal('Error al eliminar la pregunta', '', 'error');
              });

            break;

          default:
            break;
        }
      });
    }

  }

  //FUNCION DE ACTUALIZAR
  function handleUpdt(Id_Pregunta) {
    // if (permisos[0].actualizar ==="n") {
    //   swal("No cuenta con los permisos para realizar esta accion","","error")
    // } else {
    swal({
      buttons: {
        update: 'ACTUALIZAR',
        cancel: 'CANCELAR',
      },
      content: (
        <div className="logoModal">
          ¿Desea actualizar Esta Pregunta: "{Id_Pregunta.Pregunta}" ?
        </div>
      ),
    }).then(
      op => {
        switch (op) {
          case 'update':
            props.data(Id_Pregunta)
            props.update(true)

            navegate('/config/AgregarPreguntas')
            break;
          default:
            break;
        }
      });
    // }

  };

  //Funcion de Bitacora 
  let dataB = {
    Id: props.idUsuario
  }

  const handleBack = () => {
    navegate('/seguridad');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Preguntas de Seguridad</h2>

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
                if (permisos[0].insertar === "n") {
                  swal("No cuenta con los permisos para realizar esta accion", "", "error")
                } else {
                  navegate('/config/AgregarPreguntas');
                }

              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo
            </Button>
            <Button className="btnReport"
              onClick={handleGenerarReporte}>
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar PDF
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.Id_Pregunta}
          rows={filteredData}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pagination
          autoHeight
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>
    </div>
  );
};
