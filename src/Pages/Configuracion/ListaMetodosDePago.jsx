//GENERADOR DE PFD
import jsPDF from 'jspdf';
import 'jspdf-autotable';

//GENERADOR DE EXCEL 
import * as XLSX from 'xlsx'

import { DataGrid,esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
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
import AnalyticsIcon from '@mui/icons-material/Analytics'; //para el boton de excel 

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
//GENERADOR DE PDF 
import { generatePDF } from '../../Components/generatePDF';

import axios from 'axios'; //Agregarlo siempre porque se necesita para exportar Axios para que se puedan consumir las Apis 
//import { Bitacora } from './Bitacora';
import { BiotechTwoTone } from '@mui/icons-material';

export const ListaMetodosDePago = ({idRol,data,update,props}) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso={
    idRol:idRol,
    idObj:8
  }
  useEffect(()=>{
    axios.post(urlPermisos,dataPermiso).then((response)=>setPermisos(response.data))
  },[])

  const [cambio, setCambio] = useState(0)
  const [marcah, setMarcah] = useState()

  const [Modelo, setModelo] = useState([]);
  const [roles, setRoles] = useState([]);
  

  //URL DE LAS APIS DE METODOS DE PAGO
    const urlMetodosPago = 'http://localhost:3000/api/tipopago';
    const urlDelMetodosPago = 'http://localhost:3000/api/tipopago/eliminar';
    const urlLisTipoPagoInactivos = 'http://localhost:3000/api/tipopago/PagoInactivo';
  //const urlBorrarMetodoPagoB = 'http://localhost:3000/api/bitacora/eliminarMetodopago';
    
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableDataInactivos, setTableDataInactivos] = useState([]);
  const [inactivo, setInactivo] = useState(false)

  //Filtracion de fechas
const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

 useEffect(() => {
  axios.get(urlMetodosPago).then(response=>setTableData(response.data))
  axios.get (urlLisTipoPagoInactivos).then(response=> setTableDataInactivos(response.data))
}, [cambio, inactivo]);

   //GENERADOR DE EXCEL
const handleGenerarExcel = () => {
  const workbook = XLSX.utils.book_new();
  const currentDateTime = new Date().toLocaleString();

  // Datos para el archivo Excel
  const dataForExcel = (inactivo === false ? filteredData : tableDataInactivos).map((row, index) => ({
    'N°':row.IdTipoPago,
    'Método De Pago':row.descripcion,
    'Estado':row.estado,

  }));

  const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['N°', 'Método De Pago'] });

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
  XLSX.writeFile(workbook, 'Lista_de_MetodoPago.xlsx');
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
                                  'N°':row.IdTipoPago,
                                  'Método':row.descripcion, 
                                  'Estado':row.estado,

                                };
        });
        return formattedData;
      };
    
      const urlPDF = 'Report_MetodosPago.pdf';
      const subTitulo = "LISTA DE MÉTODOS DE PAGO"
    
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
    { field: 'IdTipoPago', headerName: 'ID', width: 500 },
    { field: 'descripcion', headerName: 'Método', width: 500 },
    { field: 'estado', headerName: 'Estado', width: 120 },

    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
           onClick={() => handleDel(params.row.IdTipoPago)}>
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
          <div className="logoModal">¿Desea Eliminar este Método de Pago?</div>
          <div className="contEditModal"> 
          </div>
        </div>
      ),
  
      buttons: {
        cancel: 'Cancelar',
        delete: 'Eliminar',
      },
    }).then(async (op) => {
  
      switch (op) {
        case 'delete':
          let data = {
            IdTipoPago:id
          }; 
          console.log(data);
      
          await axios .delete(urlDelMetodosPago,{data}) .then(response => {
              swal('Método de Pago eliminado correctamente', '', 'success');
              setCambio(cambio + 1);
            }).catch(error => {
              console.log(error);
              swal('Error al eliminar', '', 'error');
            });
  
          break;
          default:
          break;
      }
    });
  }
  
};
  
  //FUNCION DE ACTUALIZAR DATOS 
  function handleUpdt(id) {
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
            ¿Desea actualizar el método de pago: {id.descripcion}?
          </div>
        ),
      }).then((op)  => {
          switch (op) {
            case 'update':
              data(id)
              update(true)
              navegate('/config/MetodosDePago')
              break;
              default:
              break;
          }
        });
    }
  };

  
//Boton de atras 
  const handleBack = () => {
    navegate('/config');
  };

  //ESTRUCTURA 
  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Método de Pago</h2>

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
                  navegate('/config/MetodosDePago');
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
            onClick={handleGenerarReporte}
            >
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar PDF
            </Button>
          </div>
        </div>
        <DataGrid
         pagination
          getRowId={tableData => tableData.IdTipoPago}
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