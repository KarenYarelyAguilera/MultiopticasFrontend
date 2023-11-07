//GENERADOR DE PFD
import jsPDF from 'jspdf';
import 'jspdf-autotable';

//GENERADOR DE EXCEL 
import * as XLSX from 'xlsx'

import React from 'react';

import { DataGrid,esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import logoImg  from "../../IMG/MultiopticaBlanco.png";
import fondoPDF from "../../IMG/fondoPDF.jpg";

import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';

//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import BorderAllIcon from '@mui/icons-material/BorderAll'; //para el excel 

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import axios from 'axios'; //Agregarlo siempre porque se necesita para exportar Axios para que se puedan consumir las Apis 
//GENERADOR DE PDF 
import { generatePDF } from '../../Components/generatePDF';

export const ListaModelos = ({idRol,data,update}) => {
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
  

  //URL DE LAS APIS DE MODELO
  const urlModelos ='http://localhost:3000/api/modelos'; //LLama todos los datos de la tabla de modelo.
  const urlDelModelo = 'http://localhost:3000/api/modelo/eliminar'; //Elimina datos de modelo.

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

 useEffect(() => {
  axios.get(urlModelos).then(response=>setTableData(response.data))
}, [cambio]);

//Imprime el EXCEL 
const handleGenerarExcel = () => {
  const workbook = XLSX.utils.book_new();
  const currentDateTime = new Date().toLocaleString();

  // Datos para el archivo Excel
  const dataForExcel = tableData.map((row, index) => ({
    'N°': row.IdModelo,
    'Marca': row.Marca,
    'Modelo': row.Modelo,
    'Año': row.anio,
    //'Estado': row.estado,
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataForExcel);

  // Formato para el encabezado
  worksheet['A1'] = { v: 'LISTA DE MODELOS', s: { font: { bold: true } } };
  worksheet['A2'] = { v: currentDateTime, s: { font: { bold: true } } }; //muestra la hora 
  worksheet['A5'] = { v: 'N°', s: { font: { bold: true } } };
  worksheet['B5'] = { v: 'Marca', s: { font: { bold: true }} };
  worksheet['C5'] = { v: 'Modelo', s: { font: { bold: true }} };
  worksheet['D5'] = { v: 'Año', s: { font: { bold: true } }};
 // worksheet['E5'] = { v: 'Estado', s: { font: { bold: true } }};

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
  XLSX.writeFile(workbook, 'Lista_de_Garantia.xlsx');
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
                                  'N°':row.IdModelo,
                                  'Marca':row.Marca, 
                                  'Modelo':row.Modelo, 
                                  'Año':row.anio, 
                                };
        });
        return formattedData;
      };
  
      const urlPDF = 'Report_Modelos.pdf';
      const subTitulo = "LISTA DE MODELOS"
  
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
    { field: 'IdModelo', headerName: 'ID ', width: 190 },
    { field: 'Marca', headerName: 'Marca', width: 300 },
    { field: 'Modelo', headerName: 'Modelo', width: 300},
    { field: 'anio', headerName: 'Año', width: 300 },

    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 260,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
           onClick={() => handleDel(params.row.IdModelo)}>
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];
 
  
//FUNCION DE ELIMINAR 
function handleDel(id) {
  if (permisos[0].eliminar ==="n") {
    swal("No cuenta con los permisos para realizar esta accion","","error")
  } else {
    swal({
      content: (
        <div>
          <div className="logoModal">¿Desea eliminar este modelo?</div>
          <div className="contEditModal"> 
          </div>
        </div>
      ),
  
      buttons: {
        cancel: 'Eliminar',
        delete: 'Cancelar',
      },
    }).then(async (op) => {
  
      switch (op) {
        case null:
          let data = {
            IdModelo:id
          }; 
          console.log(data);
  
          await axios .delete(urlDelModelo,{data}) .then(response => {
              swal('Modelo eliminado correctamente', '', 'success');
              setCambio(cambio + 1);
            }).catch(error => {
              console.log(error);
              swal('Error al eliminar el modelo, asegúrese que no tenga relación con otros datos', '', 'error');
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
    if (permisos[0].actualizar ==="n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      swal({
        buttons: {
          update: 'Actualizar',
          cancel: 'Cancelar',
        },
        content: (
          <div className="logoModal">
            ¿Desea actualizar este modelo: {id.Marca}?
          </div>
        ),
      }).then((op)  => {
          switch (op) {
            case 'update':
              data(id)
              update(true)
              navegate('/config/RegistroModelo')
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
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Modelos</h2>

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
                if (permisos[0].insertar ==="n") {
                  swal("No cuenta con los permisos para realizar esta accion","","error")
                } else {
                  navegate('/config/RegistroModelo');
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
             onClick={handleGenerarReporte}>
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>

          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdModelo}
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