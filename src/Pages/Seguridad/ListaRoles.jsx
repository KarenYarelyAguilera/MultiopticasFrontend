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

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import axios from 'axios';

export const ListaRoles = (props) => {
/*   const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso = {
    idRol: props.idRol,
    idObj: 2
  }
  useEffect(() => {
    axios.post(urlPermisos, dataPermiso).then((response) => setPermisos(response.data))
  }, []) */
  const [cambio, setCambio] = useState(0);
  const [generos, setGeneros] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const urlRoles ='http://localhost:3000/api/Rol';

  const urlDeteleRol ='http://localhost:3000/api/Rol/RolEliminado';

  const urlRolesInactivos="http://localhost:3000/api/RolesInactivos";

  //--------------------URL DE BITACORA--------------------
 /*  const urlDelBitacora =
    'http://localhost:3000/api/bitacora/EliminarEmpleado';

  const urlBitacoraBotonSalirLE =
    'http://localhost:3000/api/bitacora/SalirListaEmpleado'; */
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

  //IMPRIMIR PDF
  const handleGenerarReporte = () => {
 /*    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else { */
      const formatDataForPDF = () => {
        const formattedData = filteredData.map((row) => {
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
            'Descripcion': row.descripcion,
            'Numero de identidad': row.numeroIdentidad,
          };
        });
        return formattedData;
      };

      const urlPDF = 'Reporte_Empleados.pdf';
      const subTitulo = "LISTA DE EMPLEADOS"

      const orientation = "landscape";
      generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation);
    //}

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
    { field: 'Rol', headerName: 'Rol', width: 200, headerAlign: 'center' },
    { field: 'Descripcion', headerName: 'Descripción', width: 300, headerAlign: 'center' },
    { field: 'estado', headerName: 'Estado', width: 200, headerAlign: 'center' },
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
        buttons: ['Eliminar', 'Cancelar'],
      }).then(async op => {
        switch (op) {
          case null:

            let data = {
              Id_Rol: id,
            };

            //Funcion de Bitacora 
            let dataB = {
              Id: props.idUsuario
            }

            console.log(data);

            await axios
              .delete(urlDeteleRol, { data })
              .then(response => {
                //axios.post(urlDelBitacora, dataB) //Bitacora de eliminar un empleado
                swal('Rol eliminado correctamente', '', 'success');
                setCambio(cambio + 1);
              })
              .catch(error => {
                console.log(error);
                swal('Error al eliminar el Rol', '', 'error');
              });

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
               /*  if (permisos[0].insertar === "n") {
                  swal("No cuenta con los permisos para realizar esta accion", "", "error")
                } else { */
                  navegate('/config/crearRol');
                //}

              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo
            </Button>

            <Button className="btnInactivo" onClick={() => { setInactivo(inactivo === false ? true : false) }}>
                <AddIcon style={{ marginRight: '5px' }} />
                {inactivo === false ? "Inactivos" : "Activos"}
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
          getRowId={tableData => tableData.Id_Rol}
          rows={inactivo===false?filteredData:filteredDataInactivos}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={5}
          //aqui iba el onrow
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};