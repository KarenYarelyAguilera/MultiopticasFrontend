import { DataGrid,esES } from '@mui/x-data-grid';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';

import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';
import axios from 'axios';
import { generatePDF } from '../../Components/generatePDF';
//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx'
import AnalyticsIcon from '@mui/icons-material/Analytics'; //para el boton de excel 
import fondoPDF from '../../IMG/FondoPDFH.jpg'


import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import { Bitacora } from '../../Components/bitacora.jsx';

export const ListaLentes = (props) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://194.163.45.55:4000/api/permiso/consulta'
  const dataPermiso={
    idRol:props.idRol,
    idObj:3
  }
  useEffect(()=>{
    axios.post(urlPermisos,dataPermiso).then((response)=>setPermisos(response.data))
  },[])

  const urlLentes ='http://194.163.45.55:4000/api/Lentes';
  const urlLentesInactivos ='http://194.163.45.55:4000/api/LentesInactivos';

  const urlLentesEliminar ='http://194.163.45.55:4000/api/Lentes/BorrarLente';

//Bitacora
const urlBitacoraDeleteLentes='http://194.163.45.55:4000/api/bitacora/eliminarlentes';
const urlBitacoraSalirListaLentes='http://194.163.45.55:4000/api/bitacora/saliolistalentes';




  const [cambio, setCambio] = useState(0)
  const [inactivo, setInactivo] = useState(false)
  const [tableData, setTableData] = useState([]);
  const [tableDataInactivos, setTableDataInactivos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [Lente, setLente] = useState([]);

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetch(urlLentes)
    .then(response => response.json())
    .then(data => setTableData(data));
  fetch(urlLentesInactivos)
    .then(response => response.json())
    .then(data => setTableDataInactivos(data));

  }, [cambio, inactivo]);

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

//Excel
const handleGenerarExcel = () => {
  const workbook = XLSX.utils.book_new();
  const currentDateTime = new Date().toLocaleString();

  // Datos para el archivo Excel
  const dataForExcel = (inactivo === false ? filteredData : tableDataInactivos).map((row, index) => ({
    'ID':row.IdLente,
    'Lente':row.lente,
    'Precio': row.precio,
    'Estado':row.estado,

  }));

  const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['ID', 'Lente', 'Precio', 'Estado'] });



  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
  XLSX.writeFile(workbook, 'Lista_de_Lentes.xlsx');
};
  const handleGenerarReporte = () => {
    if (permisos[0].consultar==="n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    }else{
    const formatDataForPDF = () => {
      const formattedData = filteredData.map((row) => {
        const fechaCre = new Date(row.fechaCompra);
        const fechaCompra = String(fechaCre.getDate()).padStart(2, '0') + "/" +
          String(fechaCre.getMonth()).padStart(2, '0') + "/" +
          fechaCre.getFullYear();
        return {
          'ID':row.IdLente,
          'Lente':row.lente,
          'Precio': row.precio,
          'Estado':row.estado,
        };
      });
      return formattedData;
    };

    const urlPDF = 'Reporte_Lentes.pdf';
    const subTitulo = "LISTA DE LENTES "

    const orientation = "landscape";
  generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF);
        
}
  };


  const columns = [
    { field: 'IdLente', headerName: 'ID', width: 380 },
    { field: 'lente', headerName: 'Tipo de lente', width: 380 },
    { field: 'precio', headerName: 'Precio', width: 280 },
    { field: 'estado', headerName: 'Estado', width: 100, headerAlign: 'center' },
   
    
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 380,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
           onClick={() => handleDel(params.row.IdLente)}>
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
  }else{
    swal({
      content: (
        <div>
          <div className="logoModal">
              ¿Desea Eliminar este Lente: {id.lente}?
            </div>
          <div className="contEditModal"> 
          </div>
        </div>
      ),
  
      buttons: {
        cancel: 'Cencelar',
        delete: 'Eliminar',
      },
    }).then(async (op) => {
  
      switch (op) {
        case 'delete':
          let data = {
            IdLente:id
          }; 
          //Funcion de Bitacora 
          let dataB = {
            Id: props.idUsuario
          };
          const bitacora = {
            urlB: urlBitacoraDeleteLentes,
            activo: props.activo,
            dataB: dataB
          };
          console.log(data);
  
          await axios .delete(urlLentesEliminar,{data}) .then(response => {
              swal('Lente eliminado correctamente', '', 'success');
              Bitacora(bitacora)
              setCambio(cambio + 1);
            }).catch(error => {
              console.log(error);
              swal('Error al eliminar el lente.', '', 'error');
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
      if (permisos[0].actualizar==="n") {
        swal("No cuenta con los permisos para realizar esta accion","","error")
      }else{
        swal({
          buttons: {
            update: 'Actualizar',
            cancel: 'Cancelar',
          },
          content: (
            <div className="logoModal">
              ¿Desea actualizar este Lente: {id.lente}?
            </div>
          ),
        }).then((op)  => {
            switch (op) {
              case 'update':
                props.data(id)
                props.update(true)
                navegate('/Inventario/RegistroLente')
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
      urlB: urlBitacoraSalirListaLentes,
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
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Lentes</h2>

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
                  swal("No cuenta con los permisos para realizar esta accion","","error")
                }else{
                  navegate('/Inventario/RegistroLente');
                }
              }}
            >
              <AddIcon style={{ marginRight: '3px' }} />
              Nuevo
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
             onClick={handleGenerarReporte}
            >
              <PictureAsPdfIcon style={{ marginRight: '3px' }} />
              Generar PDF
            </Button>
          </div>
        </div>
        <DataGrid
        pagination
          getRowId={tableData => tableData.IdLente}
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