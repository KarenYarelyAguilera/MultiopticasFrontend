//GENERADOR DE PFD
import jsPDF from 'jspdf';
import 'jspdf-autotable';
//GENERADOR DE EXCEL 
import * as XLSX from 'xlsx'

import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import logoImg  from "../../IMG/MultiopticaBlanco.png";
import fondoPDF from '../../IMG/FondoPDFH.jpg'

import AnalyticsIcon from '@mui/icons-material/Analytics';  //para el boton de excel 

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

export const ListaSucursal = (props) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso={
    idRol:props.idRol,
    idObj:8
  }
  useEffect(()=>{
    axios.post(urlPermisos,dataPermiso).then((response)=>setPermisos(response.data))
  },[])
  const [roles, setRoles] = useState([]);
  const [Departamento, setDepartamento] = useState(props.data.Departamento || null);
  const [ciudad, setCiudad] = useState(props.data.Ciudad|| null);
  const [cambio, setCambio] = useState(0)
  const [tableDataInactivos, setTableDataInactivos] = useState([]);
  const [inactivo, setInactivo] = useState(false)

  const urlDepartamentos = 'http://localhost:3000/api/departamentos';
  const urlCiudades = 'http://localhost:3000/api/ciudades';

  const urlSucursales = 'http://localhost:3000/api/sucursales';
  const urlDelSucursal = 'http://localhost:3000/api/sucursal/eliminar';
  const urlListaSucursalesInactivas = 'http://localhost:3000/api/sucursalInactivas';

//Filtracion de fechas
  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

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

  //COLOCAR APIS DE BITACORA AQUI---  
  
  //-------------------------------------------------------------------

  useEffect(() => {
    fetch(urlSucursales) .then(response => response.json()) .then(data => setTableData(data));
    fetch(urlDepartamentos) .then(response => response.json()) .then(data => setDepartamento(data));
    fetch(urlCiudades).then(response => response.json()).then(data => setCiudad(data));

    axios.get (urlListaSucursalesInactivas).then(response=> setTableDataInactivos(response.data))
  }, [cambio, inactivo]);

  //GENERADOR DE EXCEL
const handleGenerarExcel = () => {
  const workbook = XLSX.utils.book_new();
  const currentDateTime = new Date().toLocaleString();

  // Datos para el archivo Excel
  const dataForExcel = filteredData.map((row, index) => ({
    'N°':row.IdSucursal,
    'Departamento':row.departamento, 
    'Ciudad':row.ciudad, 
    'Dirección':row.direccion, 
    'Teléfono':row.telefono,   
    'Estado': row.estado,

  }));

  const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['N°','Departamento','Ciudad','Dirección','Teléfono'] });

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
  XLSX.writeFile(workbook, 'Lista_de_Sucursales.xlsx');
};

//IMPRIMIR PDF
const handleGenerarReporte = () => {
  if (permisos[0].consultar === "n") {
    swal("No cuenta con los permisos para realizar esta accion","","error")
  } else {
    const formatDataForPDF = () => {
      const formattedData = (inactivo === false ? filteredData : tableDataInactivos).map((row) => {
        const fechaCre = new Date(row.fechaNacimiento);
        const fechaNacimiento = String(fechaCre.getDate()).padStart(2,'0')+"/"+
                              String(fechaCre.getMonth()).padStart(2,'0')+"/"+
                              fechaCre.getFullYear();
                              return {
                                'N°':row.IdSucursal,
                                'Departamento':row.departamento, 
                                'Ciudad':row.ciudad, 
                                'Dirección':row.direccion, 
                                'Teléfono':row.telefono,   
                                'Estado': row.estado,
                              };
      });
      return formattedData;
    };

    const urlPDF = 'Report_MARCA.pdf';
    const subTitulo = "LISTA DE MARCAS"

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
    { field: 'IdSucursal', headerName: 'ID Sucursal', width: 100 },
    { field: 'departamento', headerName: 'Departamento', width: 205 },
    { field: 'ciudad', headerName: 'Ciudad', width: 200 },
    { field: 'direccion', headerName: 'Dirección', width: 250 },
    { field: 'telefono', headerName: 'Teléfono', width: 225 },
    { field: 'estado', headerName: 'Estado', width: 120 },

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
            onClick={() => handleDel(params.row.IdSucursal)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  //FUNCION DE ELIMINAR 
  function handleDel(IdSucursal) {
    if (permisos[0].eliminar ==="n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      swal({
        content: (
          <div>
  
            <div className="logoModal">¿Desea Eliminar esta Sucursal?</div>
            <div className="contEditModal">
  
            </div>
  
          </div>
        ),
        buttons: {delete:'Eliminar',cancel: 'Cancelar'},
      }).then(async op => {
        switch (op) {
          case 'delete':
  
            /* let data = {
              IdSucursal: IdSucursal,
            }; */
  
            //Funcion de Bitacora 
            /*  let dataB = {
               Id:props.idUsuario
             } */
  /* 
            console.log(data);
  
            await axios
              .delete(urlDelSucursal, { data })
              .then(response => {
                //axios.post (urlDelBitacora, dataB) //Bitacora de eliminar un empleado
                swal('Sucursal eliminada correctamente', '', 'success');
                setCambio(cambio + 1);
              })
              .catch(error => {
                console.log(error);
                swal('Error al eliminar la sucursal', '', 'error');
              }); */
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
    if (permisos[0].actualizar ==="n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      swal({
        buttons: {
          update: 'ACTUALIZAR',
          cancel: 'CANCELAR',
        },
        content: (
          <div className="logoModal">
            ¿Desea actualizar la sucursal: {id.direccion} ?
          </div>
        ),
      }).then(
        op => {
          switch (op) {
            case 'update':
              props.data(id)
              props.update(true)
              navegate('/config/RegistroSucursal')
              break;
            default:
              break;
          }
        });
    }
  
  };

  
  const handleBack = () => {
    navegate('/config');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Sucursal</h2>

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
                  swal("No cuenta con los permisos para realizar esta accion","","error")
                } else {
                  navegate('/config/RegistroSucursal');
                }
                
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo
            </Button>

            <Button className="btnInactivo" onClick={() => { setInactivo(inactivo === false ? true : false) }}>
              <AddIcon style={{ marginRight: '5px' }} />
              {inactivo === false ? "Inactivos" : "Activos"}
            </Button>

            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '3px' }} />
              Generar excel
            </Button>

            <Button className="btnReport" 
            onClick={handleGenerarReporte}>
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar PDF
            </Button>
          </div>
        </div>
        <DataGrid
        pagination
          getRowId={tableData => tableData.IdSucursal}
          rows={inactivo === false ? filteredData : filteredDataInactivos}
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
