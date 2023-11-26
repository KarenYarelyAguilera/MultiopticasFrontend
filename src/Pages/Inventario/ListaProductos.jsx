import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';
import { generatePDF } from '../../Components/generatePDF';
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

import * as XLSX from 'xlsx'
import AnalyticsIcon from '@mui/icons-material/Analytics'; //para el boton de excel 

//FondoPDF
import fondoPDF from '../../IMG/FondoPDFH.jpg'

export const ListaProductos = (props) => {
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
  const [cambio, setCambio] = useState(0)
  const [inactivo, setInactivo] = useState(false)
  const [Modelo, setModelo] = useState([]);
  const [roles, setRoles] = useState([]);

  const urlProducto = 'http://localhost:3000/api/productos'; //MUESTA LOS PRODUCTOS EN LA TABLA
  const urlProductosInactivos = 'http://localhost:3000/api/productosInactivos';
  //const urlDelProducto = 'http://localhost:3000/api/producto/eliminar'; //ELIMINA PRODUCTO

  const urlModelos = 'http://localhost:3000/api/modelos'; //MUESTRA LOA MODELOS

  const [tableData, setTableData] = useState([]);
  const [tableDataInactivos, setTableDataInactivos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //COLOCAR APIS DE BITACORA AQUI---
  //-------------------------------------------------------------------

  const [precio, setprecio] = useState('');
  const [errorprecio, setErrorprecio] = useState(false);
  const [aviso, setaviso] = useState(false);

  const [cantidadmax, setcantidadmax] = useState('');
  const [mensaje, setmensaje] = useState('');
  const [errorcantidadmax, setErrorcantidadmax] = useState(false);

  const [cantidadmin, setcantidadmin] = useState('');
  const [advertencia, setadvertencia] = useState('');
  const [errorcantidadmin, setErrorcantidadmin] = useState(false);

  const [descrpcion, setdescripcion] = useState('');
  const [msj, setmsj] = useState('');
  const [errordescripcion, setErrordescripcion] = useState(false);

  useEffect(() => {
    fetch(urlProducto).then(response => response.json()).then(data => setTableData(data));
    fetch(urlProductosInactivos).then(response => response.json()).then(data => setTableDataInactivos(data));
    fetch(urlModelos).then(response => response.json()).then(data => setModelo(data));
  }, [cambio, inactivo]);

  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const filteredDataInactivos = 
  tableDataInactivos.filter(row =>
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
      const dataForExcel =  (inactivo === false ? filteredData : tableDataInactivos).map((row, index)  => ({
        'ID': row.IdProducto,
        'Modelo': row.Modelo,
        'Marca': row.Marca,
        'Descripcion': row.descripcion,
        'Precio': row.precio,
        'CantidadMinima': row.cantidadMin,
        'CantidadMaxima': row.cantidadMax,
        'Estado': row.estado,
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['ID', 'Modelo','Marca', 'Precio', 'CantidadMinima', 'CantidadMaxima', 'Estado'] });



      XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
      XLSX.writeFile(workbook, 'Reporte_Productos.xlsx');
    };
  };

  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const formatDataForPDF = () => {
        const formattedData = (inactivo === false ? filteredData : tableDataInactivos).map((row) => {
          const fechaCre = new Date(row.fechaYHora);
          const fechaYHora = String(fechaCre.getDate()).padStart(2, '0') + "/" +
            String(fechaCre.getMonth()).padStart(2, '0') + "/" +
            fechaCre.getFullYear();
          return {
            'ID': row.IdProducto,
            'Modelo': row.Modelo,
            'Marca': row.Marca,
            'Descripcion': row.descripcion,
            'Precio': row.precio,
            'CantidadMinima': row.cantidadMin,
            'CantidadMaxima': row.cantidadMax,
            'Estado': row.estado,
          };
        });
        return formattedData;
      };

      const urlPDF = 'Reporte_Productos.pdf';
      const subTitulo = "LISTA DE PRODUCTOS"

      const orientation = "landscape";
      generatePDF(formatDataForPDF, urlPDF, subTitulo,  orientation, fondoPDF);
    }

  };

  const columns = [
    // Field: nombre en que se esta llamando en la consulta SELECT
    { field: 'IdProducto', headerName: 'ID', width: 100 },
    { field: 'Modelo', headerName: 'Modelo', width: 190 },
    { field: 'Marca', headerName: 'Marca', width: 190 },
    { field: 'descripcion', headerName: 'Descripción', width: 190 },
    { field: 'precio', headerName: 'Precio', width: 120 },
    { field: 'cantidadMin', headerName: 'Cantidad minima', width: 150 },
    { field: 'cantidadMax', headerName: 'Cantidad máxima', width: 150 },
    { field: 'estado', headerName: 'Estado', width: 100, headerAlign: 'center' },

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
            onClick={() => handleDel(params.row.IdProducto)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];




  //FUNCION DE ELIMINAR 
  function handleDel(IdProducto) {
    if (permisos[0].eliminar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      swal({
        content: (
          <div>

            <div className="logoModal">¿Desea Eliminar este Producto?</div>
            <div className="contEditModal">

            </div>

          </div>
        ),
        buttons: {delete:'Eliminar', cancel:'Cancelar'},
      }).then(async op => {
        switch (op) {
          case 'delete':

            /* let data = {
              IdProducto: IdProducto,
            }; */

            //Funcion de Bitacora 
            /*  let dataB = {
               Id:props.idUsuario
             } */

            //console.log(data);

//            await axios
              //.delete(urlDelProducto, { data })
              //.then(response => {
                //axios.post (urlDelBitacora, dataB) //Bitacora de eliminar un empleado
                swal('No es posible realizar esta acción ', '', 'error');
                setCambio(cambio + 1);
              
              

            break;

          default:
            break;
        }
      });
    }

  }

  //FUNCION DE ACTUALIZAR
  function handleUpdt(id) {

    if (permisos[0].actualizar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      swal({
        buttons: {
          update: 'ACTUALIZAR',
          cancel: 'CANCELAR',
        },
        content: (
          <div className="logoModal">
            ¿Desea actualizar el producto: {id.Modelo} ?
          </div>
        ),
      }).then(
        op => {
          switch (op) {
            case 'update':
              props.data(id)
              props.update(true)
              navegate('/menuInventario/RegistroProducto2')
              break;
            default:
              break;
          }
        });
    }


  };

  //Funcion de Bitacora 
  let dataB = {
    Id: props.idUsuario
  }

  const handleBack = () => {
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Productos</h2>

      <div
        style={{
          height: 400,
          width: '85%',
          position: 'relative',
          left: '130px',
        }}
      >
        <div className="contFilter2">
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
          <div className="btnActionsNewReport2">
            <Button
              className="btnCreate"
              onClick={() => {
                if (permisos[0].insertar === "n") {
                  swal("No tiene permisos para realizar esta acción", "", "error")
                } else {
                  navegate('/menuInventario/RegistroProducto2');
                }
              }}><AddIcon style={{ marginRight: '3px' }} />Nuevo
            </Button>

            <Button className="btnInactivo" onClick={() => { setInactivo(inactivo === false ? true : false) }}>
              <AddIcon style={{ marginRight: '5px' }} />
              {inactivo === false ? "Inactivos" : "Activos"}
            </Button>

            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '3px' }} />Generar Excel
            </Button>

            <Button className="btnReport"
              onClick={handleGenerarReporte}>
              <PictureAsPdfIcon style={{ marginRight: '3px' }}/> Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdProducto}
          rows={inactivo === false ? filteredData : filteredDataInactivos}
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