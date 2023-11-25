import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DataGrid, esES } from '@mui/x-data-grid';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';
import * as XLSX from 'xlsx'
import AnalyticsIcon from '@mui/icons-material/Analytics'; //para el boton de excel 


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
import { Bitacora } from '../../Components/bitacora';

import { WorkWeek } from 'react-big-calendar';
import { generatePDF } from '../../Components/generatePDF';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import fondoPDF from '../../IMG/FondoPDFH.jpg'


export const ListaClientes = (props) => {
  const [cambio, setCambio] = useState(0);
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso={
    idRol:props.idRol,
    idObj:4
  }
  useEffect(()=>{
    axios.post(urlPermisos,dataPermiso).then((response)=>setPermisos(response.data))
  },[])

  const urlSalirListaClientes = 'http://localhost:3000/api/bitacora/SalirListacliente';

  const urlClientes =
    'http://localhost:3000/api/clientes';
  const urlUpdateCliente =
    'http://localhost:3000/api/clientes/actualizar';

  const urlDelCliente = "http://localhost:3000/api/clientes/eliminar"

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado
  

  useEffect(() => {
    axios.get(urlClientes).then(response => {
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, [cambio]);


  const handleGenerarExcel = () => {
    const workbook = XLSX.utils.book_new();
    const currentDateTime = new Date().toLocaleString();
  
    // Datos para el archivo Excel
    const dataForExcel = filteredData.map((row, index) => ({
      'Identidad': row.idCliente,
      'Nombre': row.nombre,
      'Apellido': row.apellido,
      'Genero': row.genero,
      'Fecha Nacimiento': new Date(row.fechaNacimiento).toLocaleDateString('es-ES'), // Formatea la fecha
      'Direccion': row.direccion,
      'Telefono': row.Telefono,
      'Email': row.Email,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['Identidad', 'Nombre', 'Apellido', 'Genero', 'Fecha Nacimiento', 'Direccion', 'Telefono', 'Email'] });
  
  
  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
    XLSX.writeFile(workbook, 'Lista_de_Clientes.xlsx');
  };
  

  //IMPRIMIR PDF
  const handleGenerarReporte = () => {
    if (permisos[0].consultar==="n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      const formatDataForPDF = () => {
        const formattedData = filteredData.map((row) => {
          const fechaCre = new Date(row.fechaNacimiento);
          const fechaNacimiento = String(fechaCre.getDate()).padStart(2, '0') + "/" +
            String(fechaCre.getMonth()).padStart(2, '0') + "/" +
            fechaCre.getFullYear();
          return {
            'DNI': row.idCliente,
            'Nombre': row.nombre,
            'Apellido': row.apellido,
            'Genero': row.genero,
            'Fecha Nacimiento': fechaNacimiento,
            'Direccion': row.direccion,
            'Telefono': row.Telefono,
            'Email': row.Email,
          };
        });
        return formattedData;
      };
  
      const urlPDF = 'Reporte_Clientes.pdf';
      const subTitulo = "LISTA DE CLIENTES"
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

  const handleNewExpediente = (id) => {
    if (permisos[0].insertar === "n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      props.datosclientes({ idCliente: id.idCliente })
    navegate('/menuClientes/DatosExpediente');
    }
    
  }

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
            ¿Desea actualizar este cliente: {id.nombre}?
          </div>
        ),
      }).then((op) => {
        switch (op) {
          case 'update':
            props.data(id)
            props.update(true)
            navegate('/menuClientes/nuevoCliente')
            break;
          default:
            break;
        }
      });
    }
   
  };


  const columns = [
    { field: 'COD_CLIENTE', headerName: 'ID', width: 80,headerAlign: 'center' },
    { field: 'idCliente', headerName: 'Identidad', width: 165, headerAlign: 'center' },
    { field: 'nombre', headerName: 'Nombre', width: 190, headerAlign: 'center' },
    { field: 'apellido', headerName: 'Apellido', width: 190,headerAlign: 'center' },
    
    //{ field: 'genero', headerName: 'Género', width: 165, headerAlign: 'center' },
    { 
      field: 'fechaNacimiento', 
      headerName: 'Fecha de Nacimiento', 
      width: 170,
      headerAlign: 'center',
      renderCell: (params) => (
          <span>
              {new Date(params.value).toLocaleDateString('es-ES')}
          </span>
      ),
  },

    //{ field: 'fechaNacimiento', headerName: 'Fecha de Nacimiento', width: 120 ,headerAlign: 'center'},
    { field: 'direccion', headerName: 'Dirección', width: 200,headerAlign: 'center' },
    { field: 'Telefono', headerName: 'Teléfono', width: 135,headerAlign: 'center' },
    // { field: 'Email', headerName: 'Correo Electrónico', width: 165,headerAlign: 'center' },


    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 260,

      renderCell: params => (
        <div className="contActions1">
          <Button className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>

          <Button
            className="btnDelete"
            onClick={() => handleDel(params.row.idCliente)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>

          <Button
            className="btnAddExpe"
            onClick={() => handleNewExpediente(params.row)}
          >
            <AddIcon></AddIcon>
          </Button>
        </div>
      ),
    },
  ];

  function handleDel(id) {
    if (permisos[0].eliminar === "n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      swal({
        content: (
          <div>
           <div className="logoModal">
            ¿Desea Eliminar este cliente: {id.nombre}?
          </div>
            <div className="contEditModal">
  
            </div>
          </div>
        ),
        buttons: {
          cancel: 'Cencelar',
          delete: 'Eliminar',
        }
      }).then(async (op) => {
  
        switch (op) {
          case 'delete':
  
            let data = {
              idCliente: id,
            };
  
            console.log(data);
  
            await axios.delete(urlDelCliente, { data }).then(response => {
              swal("Cliente Eliminado correctamente", "", "success")
              setCambio(cambio + 1)
            }).catch(error => {
              console.log(error);
              swal("Error al eliminar el cliente", "", "error")
            })
  
            break;
  
          default:
            break;
        }
  
      });
    }
   
  }
  //Bitacora
  let dataB = {
    Id: props.idUsuario
  }
  const bitacora = {
    urlB: urlSalirListaClientes,
    activo: props.activo,
    dataB: dataB
  }

  const handleBack = () => {
    Bitacora(bitacora)
    navegate('/menuClientes');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Clientes</h2>

      <div
        style={{
          height: 400,
          width: '85%',
          position: 'relative',
          left: '130px',
        }}



        
      >
        <div className="contFilter1">
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
          <div className="btnActionsNewReport1">
            <Button
              className="btnCreate"
              onClick={() => {
                if (permisos[0].insertar === "n") {
                  swal("No cuenta con los permisos para realizar esta accion","","error")
                } else {
                  navegate('/menuClientes/nuevoCliente');
                }
               
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              NUEVO
            </Button>

            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '3px' }} />
              Generar Excel
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
          getRowId={tableData => tableData.idCliente}
          rows={filteredData}
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