import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';
import logoImg  from "../../IMG/MultiopticaBlanco.png";
import fondoPDF from '../../IMG/FondoPDFH.jpg'


//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx'
import AnalyticsIcon from '@mui/icons-material/Analytics'; //para el boton de excel 

import { Bitacora } from '../../Components/bitacora';


import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import { generatePDF } from '../../Components/generatePDF';


export const ListaExpedientes = (props) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso={
    idRol:props.idRol,
    idObj:4
  }

  
  useEffect(()=>{
    axios.post(urlPermisos,dataPermiso).then((response)=>setPermisos(response.data))
  },[])

  const [cambio, setCambio] = useState(0);
  const urlSalirListaExpediente = 'http://localhost:3000/api/bitacora/SalirListaExpediente';
  const urlExpedientes = 'http://localhost:3000/api/Expediente';
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pdfData, setPdfData] = useState([]);
  
  let [formatDataForPDF, setFormatDataForPDF] = useState();
  let [urlPDF, seturlPDF] = useState('');

  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

  useEffect(() => {
    axios.get(urlExpedientes).then(response =>{
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, [cambio]);
  
const handleGenerarExcel = () => {
    const workbook = XLSX.utils.book_new();
    const currentDateTime = new Date().toLocaleString();
  
    // Datos para el archivo Excel
    const dataForExcel = filteredData.map((row, index) => ({
      'N°': row.IdExpediente,
      'Cliente': row.Cliente,
      'Nombre': row.Nombre,
      'Fecha de creación':  new Date(row.fechaCreacion).toLocaleDateString('es-ES'), // Formatea la fecha,
      'Empleado': row.CreadoPor,
      'Historial':row.TotalRegistros,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['N°', 'Cliente','Nombre', 'Fecha de creación', 'Empleado','Historial'] });

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
    XLSX.writeFile(workbook, 'Lista_de_Expedientes.xlsx');
  };
  
  
  //IMPRIMIR PDF
  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      formatDataForPDF = () => {
        const formattedData = filteredData.map((row) => {
          const fechaCre = new Date(row.fechaCreacion);
          const fechaCreacion = String(fechaCre.getDate()).padStart(2,'0')+"/"+
                                String(fechaCre.getMonth()).padStart(2,'0')+"/"+
                                fechaCre.getFullYear();
          return {
            'N°': row.IdExpediente,
            'Cliente': row.Cliente,
            'Nombre': row.Nombre,
            'Fecha de creación': fechaCreacion,
            'Empleado': row.CreadoPor,
            'Historial':row.TotalRegistros,
          };
        });
        return formattedData;
      };
  
      urlPDF = 'Reporte_Expediente.pdf';
      const subTitulo = "LISTA DE EXPEDIENTES"
      const orientation = "landscape";
  
      generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF);
    }
   
  };
  
  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value && value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  function traducirEstado(estado) {
    if (estado === 1) {
      return "activo";
    } else if (estado === 2) {
      return "inactivo";
    } else {
      return "";
    }
  }

  const columns = [
    { field: 'IdExpediente', headerName: 'No.Expediente', width: 150,headerAlign: 'center' },
    { field: 'Cliente', headerName: 'Identidad', width: 200,headerAlign: 'center' },
    { field: 'Nombre', headerName: 'Nombre', width: 300,headerAlign: 'center' },
    { 
      field: 'fechaCreacion', 
      headerName: 'Fecha de Creación', 
      width: 170,
      headerAlign: 'center',
      renderCell: (params) => (
          <span>
              {new Date(params.value).toLocaleDateString('es-ES')}
          </span>
      ),
  },
    { field: 'CreadoPor', headerName: 'Creado por', width: 200,headerAlign: 'center' },
    {field: 'TotalRegistros', headerName: 'Historial', width: 100,headerAlign: 'center'},
    {

      field: 'borrar',
      headerName: 'Acciones',
      width: 360,
      headerAlign: 'center',

      renderCell: params => (
        <div className="contActions1">
          <Button
            className="btnEdit"
            title='Editar inventario'
            onClick={() => swal("No es posible realizar esta accion", "", "error")}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => swal("No es posible realizar esta accion", "", "error")}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>

          <Button
            className="btnAddExpe"
            onClick={() => handleNewExpediente(params.row)}
          >
            <AddIcon></AddIcon>
          </Button>
        </div>
      ),
    },
  ];


  const handleNewExpediente = (expediente)=>{
    if (permisos[0].insertar === "n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      let data={
        id:expediente.IdExpediente,
        idCliente:expediente.Cliente
      }
    
      console.log(expediente);
       props.data(data)
       navegate('/menuClientes/DatosExpediente');
    }
    
  }
  //Bitacora
  let dataB = {
    Id: props.idUsuario
  }
  const bitacora = {
    urlB: urlSalirListaExpediente,
    activo: props.activo,
    dataB: dataB
  }
  const handleBack = () => {
    Bitacora(bitacora)
    navegate('/menuClientes');
  };

  const handleCloseDialog = () => {
    setShowPdfDialog(false);
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Expedientes</h2>

      <div
        style={{
          height: 400,
          width: '85%',
          position: 'relative',
          left: '130px',
        }}
      >
        <div className="contFilter1">
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
          <div className="btnActionsNewReport1">
            <Button
              className="btnCreate"
              onClick={() => {
                if (permisos[0].insertar === "n") {
                  swal("No cuenta con los permisos para realizar esta accion","","error")
                } else {
                  navegate('/menuClientes/lista');
                }
               
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              NUEVO
            </Button>

            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '3px' }} />
              Generar Excel
            </Button>


            <Button className="btnReport"
            onClick={handleGenerarReporte}
            >
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar PDF
            </Button>
          </div>
        </div>
        <DataGrid
         pagination
          getRowId={tableData => tableData.IdExpediente}
          rows={filteredData}
          autoHeight
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          
        />
      </div>
    </div>
  );
};
