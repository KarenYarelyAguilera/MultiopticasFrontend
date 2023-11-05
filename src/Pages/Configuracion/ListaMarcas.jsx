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
import fondoPDF from "../../IMG/fondoPDF.jpg";


//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import BorderAllIcon from '@mui/icons-material/BorderAll'; //para el boton de excel 

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';

//GENERADOR DE PDF 
import { generatePDF } from '../../Components/generatePDF';

import axios from 'axios';

export const ListaMarcas = ({idRol,data,update}) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso={
    idRol:idRol,
    idObj:8
  }
  useEffect(()=>{
    axios.post(urlPermisos,dataPermiso).then((response)=>setPermisos(response.data))
  },[])
  const [marcah, setMarcah] = useState()
  const [cambio, setCambio] = useState(0)

  const urlMarcas = 'http://localhost:3000/api/marcas';
  const urlDelMarca = 'http://localhost:3000/api/marcas/eliminar';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    axios.get(urlMarcas).then(response=>setTableData(response.data))
  }, [cambio]);

  //Imprime el EXCEL 
  const handleGenerarExcel = () => {
    const workbook = XLSX.utils.book_new();
    const currentDateTime = new Date().toLocaleString();
  
    // Datos para el archivo Excel
    const dataForExcel = tableData.map((row, index) => ({
      'N°': row.IdMarca,
      'Marca':row.descripcion, 
     // 'Estado': row.estado,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
  
    // Formato para el encabezado
    worksheet['A1'] = { v: 'LISTA DE MARCAS', s: { font: { bold: true } } };
    worksheet['A2'] = { v: currentDateTime, s: { font: { bold: true } } }; //muestra la hora 
    worksheet['A5'] = { v: 'N°', s: { font: { bold: true } } };
    worksheet['B5'] = { v: 'Marca', s: { font: { bold: true }} };
   // worksheet['E5'] = { v: 'Estado', s: { font: { bold: true } }};
  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
    XLSX.writeFile(workbook, 'Lista_de_Marca.xlsx');
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
                                  'N°':row.IdMarca,
                                  'Marca':row.descripcion, 
                                };
        });
        return formattedData;
      };
  
      const urlPDF = 'Report_MARCA.pdf';
      const subTitulo = "LISTA DE MARCAS"
  
      const orientation = "landscape";
    generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation);
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

  const columns = [
    { field: 'IdMarca', headerName: 'ID Marca', width: 500 },
    { field: 'descripcion', headerName: 'Marca', width: 500 },

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
            onClick={() => handleDel(params.row.IdMarca)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
      
    },
  ];

//BOTON DE RETROCEDER 
  const handleBack = () => {
    navegate('/config');
  };

//FUNCION DE ELIMINAR 
  function handleDel(id) {
    if (permisos[0].eliminar === "n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      swal({
        content: (
          <div>
            <div className="logoModal">¿Desea Elimiar esta marca?</div>
            <div className="contEditModal">
            </div>
          </div>
        ),
        buttons: {
          cancel: 'Eliminar',
          delete: 'Cancelar',
        },
      }).then(async(op) => {
  
        switch (op) {
          case null:
  
            let data = {
              IdMarca: id
            };
      
            console.log(data);
      
            await axios.delete(urlDelMarca,{data}).then(response=>{
              swal("Marca eliminada correctamente","","success")
              setCambio(cambio+1)
            }).catch(error=>{
              console.log(error);
              swal("Error al eliminar la marca, asegúrese que no tenga relación con otros datos.","","error")
            })
           
          break;
        
          default:
          break;
        }
      });
    }
    
  };
 
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
          <div className="logoModal">
            ¿Desea actualizar la marca?: {id.marca} ?
          </div>
        ),
      }).then((op) => {
        switch (op) {
            case 'update':
            data(id)
            update(true)
        navegate('/config/RegistroMarcas')
        break;
        default:
        break;
        }
      });
    }
   
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Marcas</h2>

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
                  swal("No cuenta con los permisos para realizar esta accion","","error")
                } else {
                  navegate('/config/RegistroMarcas');
                }
                
              }}
            > 
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo
            </Button>

            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <BorderAllIcon style={{ marginRight: '3px' }} />
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
          getRowId={tableData => tableData.IdMarca}
          rows={filteredData}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};
