import { DataGrid,esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router';

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

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import axios from 'axios';


export const ListUsuarios = () => {
  const [roles, setRoles] = useState([]);


  const urlUsers =
    'http://localhost:3000/api/usuarios';
  const urlUpdateUser =
    'http://localhost:3000/api/usuario/update';
    const urlDelUser =
    'http://localhost:3000/api/usuario/delete';
  const urlRoles =
    'http://localhost:3000/api/Rol';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cambio,setCambio]=useState(0)

  useEffect(() => {
    axios.get(urlUsers).then(response=>setTableData(response.data))
    axios.get(urlRoles).then(response=>setRoles(response.data))
    
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
    }).then(op => {
      switch (op) {
        case 'update':
          swal(
            <div>
              <div className="logoModal">Datos a actualizar</div>
              <div className="contEditModal">
                <div className="contInput">
                  <TextCustom text="Usuario" className="titleInput" />
                  <input
                    type="text"
                    id="nombre"
                    className='inputCustom'
                    value={id.Usuario}
                  />
                </div>

                <div className="contInput">
                  <TextCustom
                    text="Nombre de Usuario"
                    className="titleInput"
                  />
                  <input
                    type="text"
                    id="nombreUsuario"
                    className='inputCustom'
                    value={id.Nombre_Usuario}
                  />
                </div>
                <div className="contInput">
                  <TextCustom text="Estado" className="titleInput" />
                  <input
                    type="text"
                    className='inputCustom'
                    id="EstadoUsuario"
                    value={id.Estado_Usuario}
                  />
                </div>
                <div className="contInput">
                  <TextCustom
                    text="Contraseña"
                    className="titleInput"
                  />
                  <input type="text" id="contrasenia" className='inputCustom'/>
                </div>
                <div className="contInput">
                  <TextCustom text="Rol" className="titleInput" />
                  <select id="rol" className="selectCustom">
                    {roles.length ? (
                      roles.map(pre => (
                        <option key={pre.Id_Rol} value={pre.Id_Rol}>
                          {pre.Rol}
                        </option>
                      ))
                    ) : (
                      <option value="No existe informacion">
                        No existe informacion
                      </option>
                    )}
                  </select>
                </div>
                <div className="contInput">
                  <TextCustom text="Email" className="titleInput" />
                  <input
                    type="text"
                    id="Email"
                    className='inputCustom'
                    value={id.Correo_Electronico}
                  />
                </div>
              </div>
            </div>,
          ).then(async () => {
            let data = {
              usuario: document.getElementById('nombre').value,
              nombreUsuario:
                document.getElementById('nombreUsuario').value,
              estadoUsuario:
                document.getElementById('EstadoUsuario').value,
              clave: document.getElementById('contrasenia').value,
              idRol: parseInt(document.getElementById('rol').value),
              correo:
                document.getElementById('Email').value,
              idUsuario: id.id_Usuario,
            };

            if (await axios.put(urlUpdateUser,data)) {
              swal(<h1>Usuario Actualizado Correctamente</h1>);
              setCambio(cambio+1)
            }
          });
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
