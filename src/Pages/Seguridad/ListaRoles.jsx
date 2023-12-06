import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';
import swal from '@sweetalert/with-react';

//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { generatePDF } from '../../Components/generatePDF';
import fondoPDF from '../../IMG/FondoPDFH.jpg'
import * as XLSX from 'xlsx'
import AnalyticsIcon from '@mui/icons-material/Analytics'; //para el boton de excel 


import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import axios from 'axios';

export const ListaRoles = (props) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://194.163.45.55:4000/api/permiso/consulta'
  const dataPermiso = {
    idRol: props.idRol,
    idObj: 2
  }
  useEffect(() => {
    axios.post(urlPermisos, dataPermiso).then((response) => setPermisos(response.data))
  }, [])

  const [cambio, setCambio] = useState(0);
  const [generos, setGeneros] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

  const urlRoles ='http://194.163.45.55:4000/api/Rol';

 // const urlDeteleRol ='http://194.163.45.55:4000/api/Rol/RolEliminado';

  const urlRolesInactivos="http://194.163.45.55:4000/api/RolesInactivos";

  //--------------------URL DE BITACORA--------------------
 /*  const urlDelBitacora =
    'http://194.163.45.55:4000/api/bitacora/EliminarEmpleado';

  const urlBitacoraBotonSalirLE =
    'http://194.163.45.55:4000/api/bitacora/SalirListaEmpleado'; */
  //--------------------------------------------------------

  const [tableData, setTableData] = useState([]);
  const [tableDataInactivos, setTableDataInactivos] = useState([]);
  const [inactivo, setInactivo] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(urlRoles).then(response => { setTableData(response.data); })
    axios.get(urlRolesInactivos).then(response => setTableDataInactivos(response.data))
      .catch(error => console.log(error));
  }, [cambio, inactivo]);



  function formatearFecha(fecha) {
    const año = fecha.getUTCFullYear();
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getUTCDate().toString().padStart(2, '0');

    return `${año}-${mes}-${dia}`;
  }



  const handleGenerarExcel = () => {
    const workbook = XLSX.utils.book_new();
    const currentDateTime = new Date().toLocaleString();
  
    // Datos para el archivo Excel
    const dataForExcel = (inactivo === false ? filteredData : tableDataInactivos).map((row, index) => ({
            'ID': row.Id_Rol,
            'Rol': row.Rol,
            'Descripcion': row.Descripcion,
            'Estado': row.estado,
            
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['ID', 'Rol', 'Descripcion', 'Estado'] });
  
  
  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
    XLSX.writeFile(workbook, 'Lista_de_Roles.xlsx');
  };
 //PDF
 const handleGenerarReporte = () => {
  if (permisos[0].consultar === "n") {
    swal("No cuenta con los permisos para realizar esta accion", "", "error");
  } else {
    const formatDataForPDF = () => {
      const formattedData = (inactivo === false ? filteredData : tableDataInactivos).map((row) => {
        return {
          'ID': row.Id_Rol,
            'Rol': row.Rol,
            'Descripcion': row.Descripcion,
            'Estado': row.estado
        };
      });
      return formattedData;
    };

    const urlPDF = 'Reporte_Roles.pdf';
    const subTitulo = "LISTA DE ROLES";
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
    //son los de la base no los de node
    { field: 'Id_Rol', headerName: 'ID', width: 100, headerAlign: 'center' },
    { field: 'Rol', headerName: 'Rol', width: 300, headerAlign: 'center' },
    { field: 'Descripcion', headerName: 'Descripción', width: 300, headerAlign: 'center' },
    { field: 'estado', headerName: 'Estado', width: 200, headerAlign: 'center', valueGetter: (params) => (params.value === 'A' ? 'ACTIVO' : 'INACTIVO') },

    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 400, headerAlign: 'center',

      renderCell: params => (
        <div className="contActions1">
          <Button className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleDel(params.row.Id_Rol)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  //funcion de eliminar
  function handleDel(id) {
    /* if (permisos[0].eliminar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else { */
      swal({
        content: (
          <div>

            <div className="logoModal">¿Desea Eliminar este Rol?</div>
            <div className="contEditModal">

            </div>

          </div>
        ),
        buttons: {delete:'Eliminar',cancel: 'Cancelar'},
      }).then(async op => {
        switch (op) {
          case 'delete':

          /*   let data = {
              Id_Rol: id,
            }; */

            //Funcion de Bitacora 
            let dataB = {
              Id: props.idUsuario
            }

            //console.log(data);

            swal('No es posible realizar esta acción ', '', 'error');
            setCambio(cambio + 1);
         

            break;

          default:
            break;
        }
      });
    //}

  }



  //funcion de actualizar
  function handleUpdt(id) {
   /*  if (permisos[0].actualizar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else { */
      swal({
        buttons: {
          update: 'ACTUALIZAR',
          cancel: 'CANCELAR',
        },
        content: (
          <div className="logoModal">
            ¿Desea actualizar el Rol: {id.Rol} ?
          </div>
        ),
      }).then(op => {
        switch (op) {
          case 'update':
            props.data(id)
            props.update(true)
            navegate('/config/crearRol')
        }
      });
    //}



    //}//}//
  }

  //Funcion de Bitacora 
  let dataB = {
    Id: props.idUsuario
  }

  const handleBack = () => {
    //axios.post(urlBitacoraBotonSalirLE, dataB)
    navegate('/config/roles');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Roles</h2>

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
                  navegate('/config/crearRol');
                }

              }}
            >
              <AddIcon style={{ marginRight: '3' }} />
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
        paginatio
          getRowId={tableData => tableData.Id_Rol}
          rows={inactivo===false?filteredData:filteredDataInactivos}
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