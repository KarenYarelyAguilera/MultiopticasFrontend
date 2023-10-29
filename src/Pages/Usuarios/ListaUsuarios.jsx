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
import { generatePDF } from '../../Components/generatePDF';

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
  const urlUserStateUpdate="http://localhost:3000/api/usuario/estado/seleccionado"

    const urlUserBlock="http://localhost:3000/api/usuarios/inactivos"

  //  const urlBitacoraDelUsuario=
  //    'http://localhost:3000/api/bitacora/EliminarUsuario';


  const [tableData, setTableData] = useState([]);
  const [tableDataBlock, setTableDataBlock] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cambio, setCambio] = useState(0)
  const [inactivo, setInactivo]=useState(false)

  useEffect(() => {
    axios.get(urlUsers).then(response => setTableData(response.data))
    axios.get(urlUserBlock).then(response => setTableDataBlock(response.data))
  }, [cambio,inactivo]);


  //IMPRIMIR PDF
  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const formatDataForPDF = () => {
        const formattedData = filteredData.map((row) => {
          const fechaCre = new Date(row.fechaNacimiento);
          const fechaNacimiento = String(fechaCre.getDate()).padStart(2, '0') + "/" +
            String(fechaCre.getMonth()).padStart(2, '0') + "/" +
            fechaCre.getFullYear();
          return {
            'ID': row.id_Usuario,
            'Usuario': row.Usuario,
            'Nombre Usuario': row.Nombre_Usuario,
            'Rol': row.rol,
            'Estado': row.Estado_Usuario,
            'Correo electronico': row.Correo_Electronico,

          };
        });
        return formattedData;
      };

      const urlPDF = 'Reporte_Usuarios.pdf';
      const subTitulo = "LISTA DE USUARIOS"

      const orientation = "landscape";
      generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation);
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

  const filteredDataBlock=
  tableDataBlock.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  ) 

  const columns = [
    { field: 'id_Usuario', headerName: 'ID', width: 70, headerAlign: 'center' },
    { field: 'Usuario', headerName: 'Usuario', width: 130, headerAlign: 'center' },
    { field: 'rol', headerName: 'Rol', width: 130, headerAlign: 'center' },
    { field: 'Correo_Electronico', headerName: 'EMail', width: 200, headerAlign: 'center' },
    { field: 'Estado_Usuario', headerName: 'Estado', width: 130, headerAlign: 'center' },
    {
      field: 'Contrasenia', headerName: 'Contraseña', width: 130, headerAlign: 'center',
      valueGetter: (params) => {
        // Obtener la respuesta original
        const originalRespuesta = params.row.Contrasenia;
        // Crear un string de asteriscos con la misma longitud que la respuesta original
        const asterisks = '*'.repeat(originalRespuesta.length);
        return asterisks;
      },
    },
    {
      field: 'Fecha_Ultima_Conexion',
      headerName: 'Ultima Conexion',
      width: 150, headerAlign: 'center'
    },
    {
      field: 'Fecha_Vencimiento', headerName: 'Fecha de vencimiento', width: 150, headerAlign: 'center',
      valueGetter: (params) => {
        const date = new Date(params.row.Fecha_Vencimiento);
        return date.toLocaleDateString('es-ES'); // Formato de fecha corto en español
      },
    },
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190, headerAlign: 'center',

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit"
            onClick={() =>{
              inactivo==false?  handleUpdt(params.row):actualizarEstado(params.row)
            
            }}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleDel(params.row.id_Usuario)}

          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];
  const handleBack = () => {
    navegate('/usuarios');
  };

  function actualizarEstado(id) {
    swal({
      buttons:{
        ok: 'Editar Estado',
        cancel:'Cancelar',
      },
      content:(
        <div>
    <h2>Cambio de Estado al usuario {id.Usuario}</h2>
     
        <h4>Estado</h4>
        <select id='Estado'>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
          <option value="Bloqueado">Bloqueado</option>
        </select>
     
    </div>
      )
    }).then(async (op)=>{

      let estado = document.getElementById("Estado").value
      let data={
        id:id.id_Usuario,
        estado:estado
      }
      console.log(data);
      op=="ok"? await axios.put(urlUserStateUpdate,data).then(()=>{
        
          
      
        swal("Estado Cambiado Exitosamente","","success").then(()=>{
          setCambio(cambio+1)
        })
      }).catch((e)=>console.log(e))
      :console.log("qweqew");
    })
  }


  function handleDel(id) {
    if (permisos[0].eliminar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      swal({
        buttons: {
          cancel: 'Eliminar',
          delete: 'Cancelar',
        },
        content: (
          <div className="logoModal">
            ¿Desea eliminar este usuario?
          </div>
        ),

      }).then(async (op) => {

        switch (op) {
          case null:

            let data = {
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
            })

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
          update: 'Actualizar',
          cancel: 'Cancelar',
        },
        content: (
          <div className="logoModal">
            ¿Desea actualizar el usuario:{' '}
            {id.Usuario} ?
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
                  swal("No tiene permisos para realizar esta acción","","error")
                } else {
                  navegate('/usuarios/crearusuario');
                }
               
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo
            </Button>



            <Button
              className="btnCreate"
              onClick={() => {
                setInactivo(inactivo===false?true:false)
                
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              {inactivo===false?"Inactivos":"Activos"}
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
          getRowId={tableData => tableData.id_Usuario}
          rows={inactivo===false?filteredData:filteredDataBlock}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};