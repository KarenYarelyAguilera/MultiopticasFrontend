import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DataGrid,esES } from '@mui/x-data-grid';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';
import { generatePDF } from '../../Components/generatePDF';
import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';
import axios from 'axios';
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


import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';

export const Kardex = (props) => {
  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso = {
    idRol: props.idRol,
    idObj: 3
  }
  useEffect(() => {
    axios.post(urlPermisos, dataPermiso).then((response) => setPermisos(response.data))
  }, [])
  const urlKardex ='http://localhost:3000/api/kardex';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(urlKardex)
      .then(response => response.json())
      .then(data => setTableData(data));
  }, []);

  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const handleGenerarExcel = () => {

    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const workbook = XLSX.utils.book_new();
      const currentDateTime = new Date().toLocaleString();

      // Datos para el archivo Excel
      const dataForExcel = filteredData.map((row, index) => ({

        'ID':row.IdKardex,
        'Tipo Movimiento':row.TipoMovimiento, 
        'Producto':row.Producto,
        'Cantidad': row.cantidad,
        'Fecha':new Date(row.fechaYHora).toLocaleDateString('es-ES'), // Formatea la fecha
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['ID', 'Tipo Movimiento', 'Producto', 'Cantidad', 'Fecha'] });



      XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
      XLSX.writeFile(workbook, 'Reporte_Kardex.xlsx');


    }

  };

  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      const formatDataForPDF = () => {
        const formattedData = filteredData.map((row) => {
          const date = new Date(row.fechaYHora);
          const formattedDate = date.toLocaleDateString('es-ES'); // Formato de fecha corto en español
  
          return {
            'ID':row.IdKardex,
            'Tipo Movimiento':row.TipoMovimiento, 
            'Producto':row.Producto,
            'Cantidad': row.cantidad,
            'Fecha':formattedDate,
          };
        });
        return formattedData;
      };
  
      const urlPDF = 'Reporte_Kardex.pdf';
      const subTitulo = "LISTA DE KARDEX"
  
      const orientation = "landscape";
    generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF);
    }
  
  };

  const columns = [
    { field: 'IdKardex', headerName: 'ID', width: 50 },
    { field: 'TipoMovimiento', headerName: 'Tipo de Movimiento', width: 150 },
    { field: 'Producto', headerName: 'Producto', width: 200 },
    { field: 'cantidad', headerName: 'Cantidad', width: 90 },
    {
      field: 'fechaYHora', headerName: 'Fecha', width: 200,
      valueGetter: (params) => {
        const date = new Date(params.row.fechaYHora);
        return date.toLocaleDateString('es-ES'); // Formato de fecha corto en español
      },
    },
    { field: 'descripcion', headerName: 'Descripcion', width: 200 },

  ];

  function handleUpdt(param) {
   
  }

  function handleDel(id) {

  }
  const handleBack = () => {
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Kardex</h2>

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
                  navegate('/menuInventario/Kardex2');
                }
                
              }} > <AddIcon style={{ marginRight: '3px' }}/>Nuevo
            </Button>

            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '3px' }} /> Generar Excel
            </Button>

            <Button className="btnReport"
              onClick={handleGenerarReporte}>
              <PictureAsPdfIcon style={{ marginRight: '3px' }}/>Generar reporte
            </Button>

          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdKardex}
          rows={filteredData}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pagination
          autoHeight
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>
    </div>
  );
};