import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';
import { generatePDF } from '../../Components/generatePDF';
import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';

import fondoPDF from '../../IMG/FondoPDFH.jpg'


//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import axios from 'axios';

import * as XLSX from 'xlsx'
import AnalyticsIcon from '@mui/icons-material/Analytics'; //para el boton de excel 


export const InventarioDisponible = (props) => {
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

  const urlInventario = 'http://localhost:3000/api/inventarios';

  const [cambio, setcambio] = useState(0)
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(urlInventario).then((response) => setTableData(response.data))
    console.log(tableData);
  }, [cambio]);

  const navegate = useNavigate();

  const rowsWithIds = tableData.map((row, index) => ({
    ...row,
    id: `${row.name}-${index}`
  }));

  const filteredData = rowsWithIds.filter(row =>
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
      const dataForExcel = filteredData.map((row, index)  => ({
            '#': row.IdInventario,
            'ID Producto': row.IdProducto,
            'Marca': row.descripcion,
            'Producto': row.detalle,
            'Cantidad': row.cantidad,
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['#', 'ID Producto','Marca', 'Producto', 'Cantidad'] });



      XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
      XLSX.writeFile(workbook, 'Reporte_Inventario_Disponible.xlsx');
    };
  };

  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const formatDataForPDF = () => {
        const formattedData = filteredData.map((row) => {
          const fechaCre = new Date(row.fechaYHora);
          const fechaYHora = String(fechaCre.getDate()).padStart(2, '0') + "/" +
            String(fechaCre.getMonth()).padStart(2, '0') + "/" +
            fechaCre.getFullYear();
          return {
            'ID': row.IdInventario,
            'ID Producto': row.IdProducto,
            'Marca': row.descripcion,
            'Producto': row.detalle,
            'Cantidad': row.cantidad,
          };
        });
        return formattedData;
      };

      const urlPDF = 'Reporte_Inventario_Disponible.pdf';
      const subTitulo = "LISTA DE INVENTARIO DISPONIBLE"

      const orientation = "landscape";
      generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF);
    }

  };
  const columns = [
    { field: 'IdInventario', headerName: 'Número de inventario', width: 200, headerAlign: 'center' },
    { field: 'descripcion', headerName: 'Marca', width: 200, headerAlign: 'center' },
    { field: 'detalle', headerName: 'Producto', width: 200, headerAlign: 'center' },
    { field: 'cantidad', headerName: 'Cantidad', width: 200, headerAlign: 'center' },



    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 300,

      renderCell: params => (
        <div className="contActions1">
          <Button
            className="btnImprimirExp"
            onClick={() =>
              ListaMovimiento(params.row)}
          >
            <Visibility></Visibility>
          </Button>
        </div>
      ),
    },
  ];

  const ListaMovimiento = (param) => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      console.log(param);
      props.data(param)
      navegate('/menuInventario/listaInventario')
    }

  }

  const handleBack = () => {
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Inventario</h2>

      <div
        style={{
          height: 400,
          width: '85%',
          position: 'relative',
          left: '130px',
        }}>
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
                  navegate('/menuInventario/RegistroProducto2');
                }
               }}><AddIcon style={{ marginRight: '5px' }} /> Nuevo
            </Button>

            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '3px' }} />Generar Excel
            </Button>

            <Button className="btnReport"
              onClick={handleGenerarReporte} >
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />  Generar PDF
            </Button>

          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.id}
          rows={filteredData}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          pagination
          autoHeight
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>
    </div>
  );
};