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

export const ListaEmpleados = (props) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
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

  const urlEmployees = 'http://localhost:3000/api/empleados';
  const urlEmpleadosInactivos = "http://localhost:3000/api/empleados/inactivos"
  const urlDelEmployees = 'http://localhost:3000/api/empleado/eliminar';

  //--------------------URL DE BITACORA--------------------
  const urlDelBitacora =
    'http://localhost:3000/api/bitacora/EliminarEmpleado';

  const urlBitacoraBotonSalirLE =
    'http://localhost:3000/api/bitacora/SalirListaEmpleado';
  //--------------------------------------------------------

  const [tableData, setTableData] = useState([]);
  const [tableDataInactivos, setTableDataInactivos] = useState([]);
  const [inactivo, setInactivo] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');

  const [Nombre, setNombre] = useState('');
  const [errorNombre, setErrorNombre] = useState(false);
  const [Msj, setMsj] = useState(false);

  const [Apellido, setApellido] = useState('');
  const [errorApellido, setErrorApellido] = useState(false);
  const [aviso, setAviso] = useState(false);

  const [errorTelefono, setErrorTelefono] = useState(false);
  const [texto, setTexto] = useState(false);

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    axios.get(urlEmployees).then(response => { setTableData(response.data); })
    axios.get(urlEmpleadosInactivos).then(response => setTableDataInactivos(response.data))
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
            'ID': row.IdEmpleado,
            'Nombre': row.nombre,
            'Apellido': row.apellido,
            'Telefono': row.telefonoEmpleado,
            'Sucursal': row.direccion,
            'Género': row.descripcion,
            'Numero de identidad': row.numeroIdentidad,
            'Fecha Nacimiento':new Date(row.fechaCumpleanos).toLocaleDateString('es-ES'), 
            'Fecha Ingreso':new Date(row.fechaIngreso).toLocaleDateString('es-ES'),
            'Estado':row.estado,

    }));
  
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['ID', 'Nombre', 'Apellido', 'Telefono','Sucursal','Género','Numero de identidad','Fecha Nacimiento', 'Fecha Ingreso','Estado'] });
  
  
  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
    XLSX.writeFile(workbook, 'Lista_de_Clientes.xlsx');
  };
  ///pdf

  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error");
    } else {
      const formatDataForPDF = () => {
        const formattedData = (inactivo === false ? filteredData : tableDataInactivos).map((row) => {
          const fechaCre = new Date(row.fechaNacimiento);
          const fechaNacimiento = String(fechaCre.getDate()).padStart(2, '0') + "/" +
            String(fechaCre.getMonth()).padStart(2, '0') + "/" +
            fechaCre.getFullYear();
          return {
            'ID': row.IdEmpleado,
            'Nombre': row.nombre,
            'Apellido': row.apellido,
            'Telefono': row.telefonoEmpleado,
            'Sucursal': row.direccion,
            'Género': row.descripcion,
            'Numero de identidad': row.numeroIdentidad,
            'Fecha Nacimiento': new Date(row.fechaCumpleanos).toLocaleDateString('es-ES'),
            'Fecha Ingreso': new Date(row.fechaIngreso).toLocaleDateString('es-ES'),
            'Estado': row.estado,
          };
        });
        return formattedData;
      };
  
      const urlPDF = 'Reporte_Empleados.pdf';
      const subTitulo = "LISTA DE EMPLEADOS";
      const orientation = "landscape";
  
      generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF);
    }
  };
  

  /////////

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
    { field: 'IdEmpleado', headerName: 'ID', width: 100, headerAlign: 'center' },
    { field: 'numeroIdentidad', headerName: 'Número de identidad', width: 190, headerAlign: 'center' },
    { field: 'nombre', headerName: 'Nombre', width: 190, headerAlign: 'center' },
    { field: 'apellido', headerName: 'Apellido', width: 190, headerAlign: 'center' },
    { field: 'telefonoEmpleado', headerName: 'Teléfono', width: 150, headerAlign: 'center' },
    { field: 'direccion', headerName: 'Sucursal', width: 210, headerAlign: 'center' },
    //{ field: 'descripcion', headerName: 'Género', width: 190, headerAlign: 'center' },

    // {
    //   field: 'fechaIngreso', headerName: 'Fecha Ingreso', width: 190,
    //   valueGetter: (params) => {
    //     const date = new Date(params.row.fechaIngreso);
    //     return date.toLocaleDateString('es-ES'); // Formato de fecha corto en español
    //   },
    // },
    // {
    //   field: 'fechaCumpleanos', headerName: 'Fecha Nacimiento', width: 190,
    //   valueGetter: (params) => {
    //     const date = new Date(params.row.fechaCumpleanos);
    //     return date.toLocaleDateString('es-ES'); // Formato de fecha corto en español
    //   }
    // },
    { field: 'estado', headerName: 'Estado', width: 150, headerAlign: 'center' },
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 260, headerAlign: 'center',

      renderCell: params => (
        <div className="contActions1">
          <Button className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
                  <Button
          className="btnDelete"
          onClick={() => swal("No es posible realizar esta acción", "", "error")}
        >
          <DeleteForeverIcon></DeleteForeverIcon>
        </Button>
        </div>
      ),
    },
  ];

/*   //funcion de eliminar
  function handleDel(id) {
    if (permisos[0].eliminar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      swal({
        content: (
          <div>

            <div className="logoModal">¿Desea Eliminar este empleado?</div>
            <div className="contEditModal">

            </div>

          </div>
        ),
        buttons: ['Eliminar', 'Cancelar'],
      }).then(async op => {
        switch (op) {
          case null:

            let data = {
              IdEmpleado: id,
            };

            //Funcion de Bitacora 
            let dataB = {
              Id: props.idUsuario
            }

            console.log(data);

            await axios
              .delete(urlDelEmployees, { data })
              .then(response => {
                axios.post(urlDelBitacora, dataB) //Bitacora de eliminar un empleado
                swal('Empleado eliminado correctamente', '', 'success');
                setCambio(cambio + 1);
              })
              .catch(error => {
                console.log(error);
                swal('Error al eliminar el empleado', '', 'error');
              });

            break;

          default:
            break;
        }
      });
    }

  } */
 



  //funcion de actualizar
  function handleUpdt(id) {
    if (permisos[0].actualizar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      swal({
        buttons: {
          cancel: 'CANCELAR',
          update: 'ACTUALIZAR',
          
        },
        content: (
          <div className="logoModal">
            ¿Desea actualizar el empleado: {id.nombre} ?
          </div>
        ),
      }).then(op => {
        switch (op) {
          case 'update':
            props.data(id)
            props.update(true)
            navegate('/usuarios/crearempleado')
        }
      });
    }



    //}//}//
  }

  //Funcion de Bitacora 
  let dataB = {
    Id: props.idUsuario
  }

  const handleBack = () => {
    axios.post(urlBitacoraBotonSalirLE, dataB)
    navegate('/usuarios');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Empleados</h2>

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
                  navegate('/usuarios/crearempleado');
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
          getRowId={tableData => tableData.IdEmpleado}
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