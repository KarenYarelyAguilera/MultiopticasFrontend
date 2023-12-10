import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect, useContext } from 'react';

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

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import axios from 'axios';

//FondoPDF
import fondoPDF from '../../IMG/FondoPDFH.jpg'

import { generatePDF } from '../../Components/generatePDF';
import * as XLSX from 'xlsx'
import AnalyticsIcon from '@mui/icons-material/Analytics'; //para el boton de excel 

export const ListUsuarios = ({ idRol, data, update, }) => {
  const [roles, setRoles] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso = {
    idRol: idRol,
    idObj: 2
  }
  useEffect(() => {
    axios.post(urlPermisos, dataPermiso).then((response) => setPermisos(response.data))
  }, [])



  const urlUsers =
    'http://localhost:3000/api/usuarios';

  const urlDelUser =
    'http://localhost:3000/api/usuario/delete';

  const urlUserBlock = "http://localhost:3000/api/usuarios/inactivos"

  //  const urlBitacoraDelUsuario=
  //    'http://localhost:3000/api/bitacora/EliminarUsuario';

  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado
  const [tableData, setTableData] = useState([]);
  const [tableDataBlock, setTableDataBlock] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cambio, setCambio] = useState(0)
  const [inactivo, setInactivo] = useState(false)

  useEffect(() => {
    axios.get(urlUsers).then(response => setTableData(response.data))
    axios.get(urlUserBlock).then(response => setTableDataBlock(response.data))
  }, [cambio, inactivo]);

  const handleGenerarExcel = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const workbook = XLSX.utils.book_new();
      const currentDateTime = new Date().toLocaleString();

      // Datos para el archivo Excel
      const dataForExcel =  (inactivo === false ? filteredData : tableDataBlock).map((row, index)  => ({
        '#': row.id_Usuario,
        'Usuario': row.Usuario,
        'Nombre': row.Nombre_Usuario,
        'Rol': row.rol,
        'Estado': row.Estado_Usuario,
        'Email': row.Correo_Electronico,
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['#', 'Usuario','Nombre', 'Rol', 'Estado', 'Email'] });



      XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
      XLSX.writeFile(workbook, 'Reporte_Usuarios.xlsx');
    };
  };
  //IMPRIMIR PDF
  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const formatDataForPDF = () => {
        const formattedData = (inactivo === false ? filteredData : tableDataBlock).map((row) => {
          const fechaCre = new Date(row.fechaNacimiento);
          const fechaNacimiento = String(fechaCre.getDate()).padStart(2, '0') + "/" +
            String(fechaCre.getMonth()).padStart(2, '0') + "/" +
            fechaCre.getFullYear();
          return {
            '#': row.id_Usuario,
            'Usuario': row.Usuario,
            'Nombre': row.Nombre_Usuario,
            'Rol': row.rol,
            'Estado': row.Estado_Usuario,
            'Email': row.Correo_Electronico,

          };
        });
        return formattedData;
      };

      const urlPDF = 'Reporte_Usuarios.pdf';
      const subTitulo = "LISTA DE USUARIOS"

      const orientation = "landscape";
      generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF);
    };
  }


  const navegate = useNavigate();


  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  )

  const filteredDataBlock =
    tableDataBlock.filter(row =>
      Object.values(row).some(
        value =>
          value &&
          value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
      ),
    )

  const columns = [
    { field: 'id_Usuario', headerName: 'ID', width: 70, headerAlign: 'center' },
    { field: 'Usuario', headerName: 'Usuario', width: 200, headerAlign: 'center' },
    { field: 'rol', headerName: 'Rol', width: 200, headerAlign: 'center' },
    { field: 'Correo_Electronico', headerName: 'Correo electrónico', width: 200, headerAlign: 'center' },
    /* {field: 'Fecha_Ultima_Conexion',headerName: 'Ultima Conexion',width: 150, headerAlign: 'center'}, */
    // {field: 'Fecha_Vencimiento', headerName: 'Fecha de vencimiento', width: 200, headerAlign: 'center',valueGetter: (params) => {
    //   const date = new Date(params.row.Fecha_Vencimiento);
    //   return date.toLocaleDateString('es-ES'); // Formato de fecha corto en español
    // },
    // },
    { field: 'Estado_Usuario', headerName: 'Estado', width: 100, headerAlign: 'center' },
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 300, headerAlign: 'center',

      renderCell: params => (
        <div className="contActions">
          <Button className="btnEdit" onClick={() => handleUpdt(params.row)}><EditIcon></EditIcon></Button>
          <Button className="btnDelete" onClick={() => handleDel(params.row.id_Usuario)}><DeleteForeverIcon></DeleteForeverIcon></Button>
        </div>
      ),
    },
  ];
  const handleBack = () => {
    navegate('/seguridad');
  };

  function handleDel(id) {
    if (permisos[0].eliminar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      swal({
        content: (

          <div className="logoModal">
            ¿Desea Eliminar este usuario: {id.nombre}?
          </div>


        ),
        buttons: {
          cancel: 'Cencelar',
          delete: 'Eliminar',
        }

      }).then(async (op) => {

        switch (op) {
          case 'delete':

            /* let data = {
              id: id,
            };

            // let dataB = {
            //   Id: props.idU
            // }

            console.log(data);

            await axios.delete(urlDelUser, { data }).then(response => {
              swal("Usuario eliminado correctamente", "", "success")
              // axios.post(urlBitacoraDelUsuario,dataB)
              setCambio(cambio + 1)
            }).catch(error => {
              console.log(error);
              swal("Error al eliminar el empleado", "", "error")
            }) */
            swal('No es posible realizar esta acción ', '', 'error');
            setCambio(cambio + 1);

            break;

          default:
            break;
        }

      });
    }


  }

  function handleUpdt(id) {
    if (permisos[0].actualizar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      swal({
        buttons: {
          cancel: 'Cancelar',
          update: 'Actualizar',
        },
        content: (
          <div className="logoModal">
            ¿Desea actualizar este usuario: {id.nombre}?
          </div>
        ),
      }).then(
        op => {
          switch (op) {
            case 'update':
              data(id)
              update(true)
              navegate('/usuarios/crearusuario')
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
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Usuarios</h2>

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

          <div className="btnActionsNewReport2">
            <Button
              className="btnCreate"
              onClick={() => {
                if (permisos[0].insertar === "n") {
                  swal("No tiene permisos para realizar esta acción", "", "error")
                } else {
                  navegate('/usuarios/crearusuario');
                }
              }}>
              <AddIcon style={{ marginRight: '3px' }} />Nuevo
            </Button>

            <Button className="btnInactivo" onClick={() => { setInactivo(inactivo === false ? true : false) }}>
              <AddIcon style={{ marginRight: '5px' }} />{inactivo === false ? "Inactivos" : "Activos"}
            </Button>

            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '3px' }} />Generar Excel
            </Button>

            <Button className="btnReport"
              onClick={handleGenerarReporte}>
              <PictureAsPdfIcon style={{ marginRight: '3px' }} />Generar PDF
            </Button>
          </div>

        </div>
        <DataGrid
          getRowId={tableData => tableData.id_Usuario}
          rows={inactivo === false ? filteredData : filteredDataBlock}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          pagination
          autoHeight
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>
    </div>
  );
};