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


import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';

//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import AnalyticsIcon from '@mui/icons-material/Analytics';  //para el boton de excel 
import { Button } from '@mui/material';

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import axios from 'axios'; //Agregarlo siempre porque se necesita para exportar Axios para que se puedan consumir las Apis 
import { Bitacora } from '../../Components/bitacora';

//GENERADOR DE PDF 
import { generatePDF } from '../../Components/generatePDF';

export const ListaDescuento = (props) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso={
    idRol:props.idRol,
    idObj:8
  }
  useEffect(()=>{
    axios.post(urlPermisos,dataPermiso).then((response)=>setPermisos(response.data))
  },[])
  const [marcah, setMarcah] = useState()
  const [cambio, setCambio] = useState(0)

  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

//URL DE DESCUENTO
const urlListaDescuentos = 'http://localhost:3000/api/Descuento';
const urlListaDescuentosInactivos = 'http://localhost:3000/api/DescuentosInactivos';
const urlDelDescuento = 'http://localhost:3000/api/Descuento/BorrarDescuento';

const urlBorrarDescuentoB ='http://localhost:3000/api/bitacora/EliminarDescuento';
const urlSalirListaDescuento ='http://localhost:3000/api/bitacora/salirlistadescuento';

const [tableData, setTableData] = useState([]);
const [tableDataInactivos, setTableDataInactivos] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [inactivo, setInactivo] = useState(false)
 
  useEffect(() => {
    axios.get (urlListaDescuentos).then(response=> setTableData(response.data))
    axios.get (urlListaDescuentosInactivos).then(response=> setTableDataInactivos(response.data))
  }, [cambio, inactivo]);

//Imprime el EXCEL 
const handleGenerarExcel = () => {
  const workbook = XLSX.utils.book_new();
  const currentDateTime = new Date().toLocaleString();

  // Datos para el archivo Excel
  const dataForExcel = (inactivo === false ? filteredData : tableDataInactivos).map((row, index) => ({
    'N°': row.IdDescuento,
    'Estado': row.estado,
    'Descuento': row.descPorcent,
    //'Descuento del Empleado': row.descPorcentEmpleado, 
   'Estado': row.estado,
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataForExcel);

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
  XLSX.writeFile(workbook, 'Lista_de_Descuentos.xlsx');
};

  //IMPRIMIR PDF
  const handleGenerarReporte = () => {
    if (permisos[0].consultar ==="n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      const formatDataForPDF = () => {
        const formattedData = (inactivo === false ? filteredData : tableDataInactivos).map((row) => {
          const fechaCre = new Date(row.fechaNacimiento);
          const fechaNacimiento = String(fechaCre.getDate()).padStart(2,'0')+"/"+
                                String(fechaCre.getMonth()).padStart(2,'0')+"/"+
                                fechaCre.getFullYear();
                                return {
                                  'N°':row.IdDescuento,
                                  'Descuento':row.descPorcent, 
                                  //'Descuento del Empleado':row.descPorcentEmpleado, 
                                  'Estado':row.estado, 
                                };
        });
        return formattedData;
      };
  
      const urlPDF = 'Report_Descuento.pdf';
      const subTitulo = "LISTA DE DESCUENTO"
  
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
  
  //ESTRUCTURA DE LA TABLA 
  const columns = [
    { field: 'IdDescuento', headerName: 'ID', width: 210 },
    { field: 'descPorcent', headerName: 'Descuento', width: 300 },
    { field: 'estado', headerName: 'Estado', width: 300 },
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190,

      renderCell: params => (
        <div className="contActions1">
          <Button className="btnEdit" onClick={() => handleUpdate(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleDel(params.row.IdDescuento)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

 //FUNCION DE ELIMINAR 
  function handleDel(id) {
    if (permisos[0].eliminar === "n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      swal({
        content: (
          <div>
            <div className="logoModal">
            ¿Desea Eliminar este Descuento?</div>
            <div className="contEditModal">
            </div>
          </div>
        ),
  
        buttons: {
        cancel: 'Cancelar',
        delete: 'Eliminar',
        },
       
      }).then(async(op) => {
  
        switch (op) {
          case 'delete':
  
            let data = {
              IdDescuento: id
            };
            let dataB =
            {
              Id: props.idUsuario
            };
            const bitacora = {
              urlB: urlBorrarDescuentoB,
              activo: props.activo,
              dataB: dataB
            };
            console.log(data);
  
            await axios.delete(urlDelDescuento,{data}).then(response=>{
              swal("Descuento eliminado correctamente","","success")
              Bitacora(bitacora)
              setCambio(cambio+1)
            }).catch(error=>{
              console.log(error);
              swal("Error al eliminar el descuento","","error")
            })
            break;
            default:
            break;
        }
      });
    }
 
  };

  //FUNCION DE ACTUALIZAR 
  function handleUpdate (id) {
    if (permisos[0].actualizar === "n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      swal({
        buttons: {
          update: 'Actualizar',
          cancel: 'Cancelar',
        },
        content: (
          <div className="logoModal">
            ¿Desea actualizar el descuento ?: {id.descPorcent}?
          </div>
        ),
      }).then((op) => {
        switch (op) {
            case 'update':
              props.data(id)
              props.update(true)
        navegate('/MenuVentas/RegistroDescuento')
        break;
        default:
        break;
        }
      });
    }
    
  };

  let dataB =
  {
    Id: props.idUsuario
  };
  const bitacora = {
    urlB: urlSalirListaDescuento,
    activo: props.activo,
    dataB: dataB
  };
    //BOTON DE RETROCEDER 
  const handleBack = () => {
    Bitacora(bitacora)
    navegate('/config');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Descuentos</h2>

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
                  navegate('/menuVentas/RegistroDescuento');
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
          getRowId={tableData => tableData.IdDescuento}
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
