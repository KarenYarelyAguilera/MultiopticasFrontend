//GENERADOR DE PFD
import jsPDF from 'jspdf';
import 'jspdf-autotable';
//GENERADOR DE EXCEL 
import * as XLSX from 'xlsx'

import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';

import logoImg from "../../IMG/MultiopticaBlanco.png";
import fondoPDF from '../../IMG/FondoPDFH.jpg'


//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Icon } from '@mui/material';

import AnalyticsIcon from '@mui/icons-material/Analytics';

import BorderAllIcon from '@mui/icons-material/BorderAll'; //para el excel 

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import axios from 'axios';

//GENERADOR DE PDF
import { generatePDF } from '../../Components/generatePDF';

export const ListaGarantia = ({ idRol, data, update }) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso = {
    idRol: idRol,
    idObj: 8
  }
  useEffect(() => {
    axios.post(urlPermisos, dataPermiso).then((response) => setPermisos(response.data))
  }, [])
  const [marcah, setMarcah] = useState()
  const [cambio, setCambio] = useState(0)
  const [inactivo, setInactivo] = useState(false)

  //URL DE GARANTIA GET Y DELETE 
  const urlGarantias = 'http://localhost:3000/api/garantias';
  const urlGarantiasInactivas = 'http://localhost:3000/api/garantiasInactivas';
  const urlDelGarantias = 'http://localhost:3000/api/garantias/eliminar';

  const [tableData, setTableData] = useState([]);
  const [tableDataInactivos, setTableDataInactivos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(urlGarantias).then(response => {
      setTableData(response.data);
    })
      .catch(error => console.log(error));
    axios.get(urlGarantiasInactivas).then(response => {
      setTableDataInactivos(response.data);
    })
      .catch(error => console.log(error));
  }, [cambio, inactivo]);

  //Imprime el EXCEL 
  const handleGenerarExcel = () => {
    const workbook = XLSX.utils.book_new();
    const currentDateTime = new Date().toLocaleString();

    // Datos para el archivo Excel
    const dataForExcel = tableData.map((row, index) => ({
      'N°': row.IdGarantia,
      'Descripción': row.descripcion,
      'Meses de Garantía': row.Meses,
      'Producto': row.producto,
      'Estado': row.estado,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);

    // Formato para el encabezado
    worksheet['A1'] = { v: 'LISTA DE GARANTIA', s: { font: { bold: true } } };
    worksheet['A2'] = { v: currentDateTime, s: { font: { bold: true } } }; //muestra la hora 
    worksheet['A5'] = { v: 'N°', s: { font: { bold: true } } };
    worksheet['B5'] = { v: 'Descripción', s: { font: { bold: true } } };
    worksheet['C5'] = { v: 'Meses de Garantía', s: { font: { bold: true } } };
    worksheet['D5'] = { v: 'Producto', s: { font: { bold: true } } };
    worksheet['E5'] = { v: 'Estado', s: { font: { bold: true } } };

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
    XLSX.writeFile(workbook, 'Lista_de_Garantia.xlsx');
  };

  //IMPRIMIR PDF
  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const formatDataForPDF = () => {
        const formattedData = tableData.map((row) => {
          const fechaCre = new Date(row.fechaNacimiento);
          const fechaNacimiento = String(fechaCre.getDate()).padStart(2, '0') + "/" +
            String(fechaCre.getMonth()).padStart(2, '0') + "/" +
            fechaCre.getFullYear();
          return {
            'N°': row.IdGarantia,
            'Descripción': row.descripcion,
            'Meses de Garantia': row.Meses,
            'Producto': row.producto,
            'Estado': row.estado,
          };
        });
        return formattedData;
      };

      const urlPDF = 'Report_Garantias.pdf';
      const subTitulo = "LISTA DE GARANTIAS"

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
    { field: 'IdGarantia', headerName: 'ID', width: 210 },
    { field: 'descripcion', headerName: 'Descripción', width: 310 },
    { field: 'Meses', headerName: 'Meses de Garantia', width: 210 },
    { field: 'Modelo', headerName: 'Producto', width: 210 },
    { field: 'estado', headerName: 'Estado', width: 210 },

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
            onClick={() => handleDel(params.row.IdGarantia)}
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
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      swal({
        content: (
          <div>
            <div className="logoModal">¿Desea Elimiar esta garantia?</div>
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
              IdGarantia: id,
            };

            console.log(data);

            await axios.delete(urlDelGarantias, { data }).then(response => {
              swal("Garantia eliminada correctamente", "", "success")
              setCambio(cambio + 1)
            }).catch(error => {
              console.log(error);
              swal("Error al eliminar la garantia", "", "error")
            })
            break;
          default:
            break;
        }
      });
    }

  };

  //BOTON DE RETROCEDER 
  const handleBack = () => {
    navegate('/config');
  };

  //FUNCION DE ACTUALIZAR 
  function handleUpdt(id) {
    if (permisos[0].actualizar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      swal({
        buttons: {
          update: 'Actualizar',
          cancel: 'Cancelar',
        },
        content: (
          <div className="logoModal">
            ¿Desea actualizar la Garantia: {id.descripcion}?
          </div>
        ),
      }).then((op) => {
        switch (op) {
          case 'update':
            data(id)
            update(true)
            navegate('/menuVentas/RegistroGarantia')
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
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Garantias</h2>

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
                  swal("No cuenta con los permisos para realizar esta accion", "", "error")
                } else {
                  navegate('/menuVentas/RegistroGarantia');
                }

              }}
            >
              <AddIcon style={{ marginRight: '3px' }} />
              Nuevo
            </Button>

            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '3px' }} />
              Generar excel
            </Button>

             
            <Button className="btnInactivo" onClick={() => { setInactivo(inactivo === false ? true : false) }}>
              <AddIcon style={{ marginRight: '5px' }} />
              {inactivo === false ? "Inactivos" : "Activos"}
            </Button>

            <Button className="btnReport" onClick={handleGenerarReporte}>
              <PictureAsPdfIcon style={{ marginRight: '3px' }} />
              Generar reporte
            </Button>

          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdGarantia}
          rows={inactivo === false ? filteredData : filteredDataInactivos}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};
