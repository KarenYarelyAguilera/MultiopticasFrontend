import { DataGrid,esES } from '@mui/x-data-grid';
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


export const ListUsuarios = ({data,update}) => {
  const [roles, setRoles] = useState([]);
  


  const urlUsers =
    'http://localhost:3000/api/usuarios';
    const urlDelUser =
    'http://localhost:3000/api/usuario/delete';


  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cambio,setCambio]=useState(0)

  useEffect(() => {
    axios.get(urlUsers).then(response=>setTableData(response.data))
  }, [cambio]);

  const navegate = useNavigate();


  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [
    { field: 'id_Usuario', headerName: 'ID', width: 70 },
    { field: 'Usuario', headerName: 'Usuario', width: 130 },
    { field: 'Nombre_Usuario', headerName: 'Nombre de Usuario', width: 150 },
    { field: 'rol', headerName: 'Rol', width: 130 },
    { field: 'Estado_Usuario', headerName: 'Estado', width: 130 },
    { field: 'Correo_Electronico', headerName: 'EMail', width: 200 },
    { field: 'Contrasenia', headerName: 'Contraseña', width: 130 },
    {
      field: 'Fecha_Ultima_Conexion',
      headerName: 'Ultima Conexion',
      width: 195,
    },
    {
      field: 'Fecha_Vencimiento',
      headerName: 'Fecha de vencimiento',
      width: 195,
    },
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit"
            onClick={() => handleUpdt(params.row)}
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

  function handleDel(id) {
    swal({
      buttons: {
        cancel: 'Eliminar',
        delete: 'Cancelar',
      },
      content: (
        <div className="logoModal">
          Desea eliminar este usuario?
        </div>
      ),
    }).then(async (op)=> {

      switch (op) {
        case null:

          let data = {
            id: id,
          };

          console.log(data);

         await axios.delete(urlDelUser,{data}).then(response=>{
            swal("Usuario eliminado correctamente","","success")
            setCambio(cambio+1)
          }).catch(error=>{
            console.log(error);
            swal("Error al eliminar el empleado","","error")
          })

          break;

        default:
          break;
      }

    });
    
  }

  function handleUpdt(id) {
    swal({
      buttons: {
        update: 'Actualizar',
        cancel: 'Cancelar',
      },
      content: (
        <div className="logoModal">
          Que accion desea realizar con el cliente:{' '}
          {id.Usuario}
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
                navegate('/usuarios/crearusuario');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Usuario
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>

        </div>
        <DataGrid
          getRowId={tableData => tableData.id_Usuario}
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