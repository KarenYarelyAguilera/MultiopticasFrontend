//GENERADOR DE PFD
import jsPDF from 'jspdf';
import 'jspdf-autotable';
//GENERADOR DE EXCEL 
import * as XLSX from 'xlsx'

import { DataGrid,esES } from '@mui/x-data-grid';
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

import AnalyticsIcon from '@mui/icons-material/Analytics';  //para el boton de excel 
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';

//GENERADOR DE PDF 
import { generatePDF } from '../../Components/generatePDF';

import axios from 'axios';
import { Bitacora } from '../../Components/bitacora';

export const ListaPais = (props) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso={
    idRol:props.idRol,
    idObj:8
  }
  useEffect(()=>{
    axios.post(urlPermisos,dataPermiso).then((response)=>setPermisos(response.data))
  },[])
  const [cambio, setCambio] = useState(0)
  const [marcah, setMarcah] = useState()

  const urlPais = 'http://localhost:3000/api/paises';
  const urlDelPais = 'http://localhost:3000/api/pais/eliminar';
  const urlListaPaisesInactivos = 'http://localhost:3000/api/pais/paisInactivo';
  const urlBorrarBitacora = 'http://localhost:3000/api/bitacora/eliminarPais';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [tableDataInactivos, setTableDataInactivos] = useState([]);
  const [inactivo, setInactivo] = useState(false)

  //Filtracion de fechas
const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

  useEffect(() => {
    axios.get(urlPais).then(response=>setTableData(response.data))
    axios.get (urlListaPaisesInactivos).then(response=> setTableDataInactivos(response.data))

  }, [cambio, inactivo]);

//GENERADOR DE EXCEL
const handleGenerarExcel = () => {
  const workbook = XLSX.utils.book_new();
  const currentDateTime = new Date().toLocaleString();

  // Datos para el archivo Excel
  const dataForExcel = filteredData.map((row, index) => ({
    'N°':row.IdPais,
    'País':row.Pais, 
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['N°', 'País'] });

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
  XLSX.writeFile(workbook, 'Lista_de_Paises.xlsx');
};

 //IMPRIMIR PDF
 const handleGenerarReporte = () => {
  if (permisos[0].consultar === "n") {
    swal("No cuenta con los permisos para realizar esta accion","","error")
  } else {
    const formatDataForPDF = () => {
      const formattedData = tableData.map((row) => {
        const fechaCre = new Date(row.fechaNacimiento);
        const fechaNacimiento = String(fechaCre.getDate()).padStart(2,'0')+"/"+
                              String(fechaCre.getMonth()).padStart(2,'0')+"/"+
                              fechaCre.getFullYear();
                              return {
                                'N°':row.IdPais,
                                'País':row.Pais, 
                              };
      });
      return formattedData;
    };
  
    const urlPDF = 'Report_Países.pdf';
    const subTitulo = "LISTA DE PAÍSES"
  
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
    { field: 'IdPais', headerName: 'ID', width: 400 },
    { field: 'Pais', headerName: 'País', width: 400 },
    { field: 'estado', headerName: 'Estado', width: 300 },


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
            onClick={() => handleDel(params.row.IdPais)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  //FUNCION DE ACTUALIZAR 
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
          <div  
           className="logoModal">  ¿Desea actualizar este País: {id.Pais}?
          </div>
        ),
      }).then((op) => {
        switch (op) {
            case 'update':
            props.data(id)
            props.update(true)
        navegate('/config/RegistroPais')
        break;
        default:
        break;
        }
      });
    }
    
  };

//FUNCION DE ELIMINAR 
  function handleDel(id) {
    if (permisos[0].eliminar === "n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      swal({
        content: (
          <div>
            <div className="logoModal">¿Desea elimiar este país?</div>
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
              IdPais: id
            };
            let dataB =
          {
            Id: props.idUsuario
          };
          const bitacora = {
            urlB: urlBorrarBitacora,
            activo: props.activo,
            dataB: dataB
          };
            console.log(data);
      
            await axios .delete(urlDelPais,{data}) .then(response => {
              swal('País eliminado correctamente', '', 'success');
              Bitacora(bitacora)
              setCambio(cambio + 1);
            }).catch(error => {
              console.log(error);
              swal("Error al eliminar el país , asegúrese que no tenga relación con otros datos.", '', 'error');
            });
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
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Países</h2>

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
                if (permisos[0].insertar ==="n") {
                  swal("No cuenta con los permisos para realizar esta accion","","error")
                } else {
                  navegate('/config/RegistroPais');
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
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
        pagination
          getRowId={tableData => tableData.IdPais}
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
