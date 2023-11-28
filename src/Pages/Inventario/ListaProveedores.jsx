import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';

import swal from '@sweetalert/with-react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import fondoPDF from '../../IMG/FondoPDFH.jpg'

import { generatePDF } from '../../Components/generatePDF';
import * as XLSX from 'xlsx'
import AnalyticsIcon from '@mui/icons-material/Analytics'; //para el boton de excel 

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import { Bitacora } from '../../Components/bitacora.jsx';

export const ListaProveedores = (props) => {
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso={
    idRol:props.idRol,
    idObj:3
  }
  useEffect(()=>{
    axios.post(urlPermisos,dataPermiso).then((response)=>setPermisos(response.data))
  },[])

  const [cambio, setCambio] = useState(0)
  const [inactivo, setInactivo] = useState(false)
  const [Modelo, setModelo] = useState([]);
  const [roles, setRoles] = useState([]);
  const [marcah, setMarcah] = useState()
  const [permisos, setPermisos] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  
  //URLS
  const urlProveedores = 'http://localhost:3000/api/proveedor';
  const urlProveedoresInactivos = 'http://localhost:3000/api/ProveedoresInactivos';
  const urlDelProveedor = 'http://localhost:3000/api/proveedor/EliminarProveedor';

  const [tableData, setTableData] = useState([]);
  const [tableDataInactivos, setTableDataInactivos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [Pais, setPais] = useState([]);
  const [Ciudad, setCiudad] = useState([]);

  //BITACORAS
 const urlBitacoraDeleteProveedor='http://localhost:3000/api/bitacora/eliminarproveedores';
 const urlBitacoraSalirListaProveedor='http://localhost:3000/api/bitacora/saliolistaproveedores';

  //-------------------------------------------------------------------

  const [proveed, setproveed] = useState('');
  const [leyenda, setleyenda] = useState('');
  const [errorproveedor, setErrorproveedor] = useState(false);

  const [codigopostal, setcodigopostal] = useState('');
  const [aviso, setaviso] = useState('');
  const [errorcodigopostal, setErrorcodigopostal] = useState(false);

  const [nombre, setnombre] = useState('');
  const [msj, setmsj] = useState('');
  const [errornombre, setErrornombre] = useState(false);

  const [encargado, setencargado] = useState('');
  const [mensaje, setmensaje] = useState('');
  const [errorencargado, setErrorencargado] = useState(false);


  const [avi, setavi] = useState('');
  const [errorpais, setErrorpais] = useState(false);


  const [advertencia, setadvertencia] = useState('');
  const [errorciudad, setErrorciudad] = useState(false);

  const [direccion, setdireccion] = useState('');
  const [validacion, setvalidacion] = useState('');
  const [errordireccion, setErrordireccion] = useState(false);

  const [tel, settel] = useState('');
  const [adv, setadv] = useState('');
  const [errortel, setErrortel] = useState(false);

  const [correo, setcorreo] = useState('');
  const [parrafo, setparrafo] = useState('');
  const [errorcorreo, setErrorcorreo] = useState(false);

  //Pa' cargar los proveedores
  useEffect(() => {
    fetch(urlProveedores).then(response => response.json()).then(data => setTableData(data));
      axios.get(urlProveedoresInactivos).then(response => setTableDataInactivos(response.data))
  }, [cambio, inactivo]);



  const handleGenerarExcel = () => {
    const workbook = XLSX.utils.book_new();
    const currentDateTime = new Date().toLocaleString();
  
    // Datos para el archivo Excel
    const dataForExcel = (inactivo === false ? filteredData : tableDataInactivos).map((row, index) => ({
      'ID': row.IdProveedor,
      'Empresa Proveedora': row.CiaProveedora,
      'Encargado': row.encargado,
      'Productos': row.Productos,
      'Pais': row.Pais,
      'Ciudad': row.Ciudad,
      'Direccion': row.direccion,
      'Telefono': row.telefono,
      'Email': row.correoElectronico,
      'Estado':row.estado,

    }));
  
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['ID', 'Empresa Proveedora', 'Encargado', 'Productos','Pais','Ciudad','Direccion','Telefono', 'Email','Estado'] });
  
  
  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
    XLSX.writeFile(workbook, 'Lista_de_Proveedores.xlsx');
  };

  //IMPRIMIR PDF

  

  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const formatDataForPDF = () => {
        const formattedData = filteredData.map((row) => {
          const fechaCre = new Date(row.fechaNacimiento);
          const fechaNacimiento = String(fechaCre.getDate()).padStart(2, '0') + "/" +
            String(fechaCre.getMonth()).padStart(2, '0') + "/" +
            fechaCre.getFullYear();
          return {
            'ID': row.IdProveedor,
            'Empresa Proveedora': row.CiaProveedora,
            //'Encargado': row.encargado,
            'Productos': row.Productos,
            'Pais': row.Pais,
            //'Ciudad': row.Ciudad,
            //'Direccion': row.direccion,
            'Telefono': row.telefono,
            'Email': row.correoElectronico,
            'Estado':row.estado,
          };
        });
        return formattedData;
      };

      const urlPDF = 'Reporte_Proveedores.pdf';
      const subTitulo = "LISTA DE PROVEEDORES"
      const orientation = "landscape";

      generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF);

      
    }

  };

  


  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const filteredDataInactivos = tableDataInactivos.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [
    { field: 'IdProveedor', headerName: 'ID', width: 70, headerAlign: 'center' },
    { field: 'CiaProveedora', headerName: 'Empresa', width: 150,  headerAlign: 'center' },
    { field: 'encargado', headerName: 'Encargado', width: 200, headerAlign: 'center' },
    { field: 'Pais', headerName: 'Pais', width: 150, headerAlign: 'center' },
    { field: 'Ciudad', headerName: 'Ciudad', width: 150, headerAlign: 'center' },
    { field: 'Productos', headerName: 'Producto', width: 300, headerAlign: 'center' },
    { field: 'telefono', headerName: 'Teléfono', width: 150, headerAlign: 'center' },
    //{ field: 'direccion', headerName: 'Dirección', width: 150, headerAlign: 'center' },
    { field: 'correoElectronico', headerName: 'Correo Electrónico', width: 200, headerAlign: 'center' },
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
            onClick={() => handleDel(params.row.IdProveedor)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  //FUNCION DE ELIMINAR 
  function handleDel(IdProveedor) {
    if (permisos[0].eliminar==="n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      swal({
        content: (
          <div>
  
            <div className="logoModal">¿Desea Eliminar este Proveedor?</div>
            <div className="contEditModal">
  
            </div>
  
          </div>
        ),
        buttons: {delete: 'Eliminar', cancel:'Cancelar'},
      }).then(async op => {
        switch (op) {
          case 'delete':
  
            let data = {
              IdProveedor: IdProveedor,
            };
            //Funcion de Bitacora 
            let dataB = {
              Id: props.idUsuario
            };
            const bitacora = {
              urlB: urlBitacoraDeleteProveedor,
              activo: props.activo,
              dataB: dataB
            };
            console.log(data);
  
            await axios
              .delete(urlDelProveedor, { data })
              .then(response => {
                Bitacora(bitacora)
                swal('Proveedor eliminado correctamente', '', 'success');
                setCambio(cambio + 1);
              })
              .catch(error => {
                console.log(error);
                swal('Error al eliminar el Proveedor', '', 'error');
              });
  
            break;
  
          default:
            break;
        }
      });
    }
   
  }

  //FUNCION DE ACTUALIZAR
  function handleUpdt(id) {
    if (permisos[0].actualizar==="n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      swal({
        buttons: {
          cancel: 'CANCELAR',
          update: 'ACTUALIZAR',
        },
        content: (
          <div className="logoModal">
            ¿Desea actualizar el proveedor: {id.CiaProveedora} ?
          </div>
        ),
      }).then(
        op => {
          switch (op) {
            case 'update':
              props.data(id)
              props.update(true)
              navegate('/menuInventario/RegistroProveedores')
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
  };
  const bitacora = {
    urlB: urlBitacoraSalirListaProveedor,
    activo: props.activo,
    dataB: dataB
  };
  const handleBack = () => {
    Bitacora(bitacora)
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Proveedores</h2>

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
                if (permisos[0].insertar==="n") {
                  swal("No tiene permisos para realizar esta acción","","error")
                } else {
                  navegate('/menuInventario/RegistroProveedores');
                }
               
              }}
            >
              <AddIcon style={{ marginRight: '3px' }} />
              NUEVO
            </Button>


            <Button className="btnInactivo" onClick={() => { setInactivo(inactivo === false ? true : false) }}>
              <AddIcon style={{ marginRight: '5px' }} />
              {inactivo === false ? "Inactivos" : "Activos"}
            </Button>

            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '3px' }} />
              Generar Excel
            </Button>


            <Button className="btnReport"  
            onClick={handleGenerarReporte}>
              <PictureAsPdfIcon style={{ marginRight: '3px' }} />
              Generar PDF
            </Button>
          </div>
        </div>
        <DataGrid
          pagination
          getRowId={tableData => tableData.IdProveedor}
          rows={inactivo === false ? filteredData : filteredDataInactivos}
          columns={columns}
          autoHeight
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>
    </div>
  );


};