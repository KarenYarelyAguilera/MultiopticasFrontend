import { Button } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import swal from '@sweetalert/with-react';

//Material-Icons
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { TextCustom } from '../../Components/TextCustom';

export const ListaPermisos = () => {
  const urlPermisosvista =
    'http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=verpermisos';
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(urlPermisosvista)
      .then(response => response.json())
      .then(data => setTableData(data));
  }, []);

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const navegate = useNavigate();

  const columns = [
    { field: 'Rol', headerName: 'Rol', width: 130 },
    { field: 'Descripcion', headerName: 'Descripcion del modulo', width: 300 },
    {
      field: 'Permiso_Consultar',
      headerName: 'Permiso para Consultar',
      width: 200,
    },
    {
      field: 'Permiso_Insercion',
      headerName: 'Permiso para Insertar',
      width: 200,
    },
    {
      field: 'Permiso_Actualizacion',
      headerName: 'Permiso para Actualizar',
      width: 200,
    },
    {
      field: 'Permiso_Eliminacion',
      headerName: 'Permiso para Eliminar',
      width: 200,
    },

    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 180,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit"
            // onClick={() => handleButtonClick(params.row.id)}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            // onClick={() => handleButtonClick(params.row.id)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  const getRowId = row => {
    // Use a random number generator to generate a unique ID for each row
    return Math.random().toString(36).substr(2, 9);
  };

  const handleBack = () => {
    navegate('/config');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Lista de Permisos</h2>
      </div>
      <div className="ContPermisos">
        <div className="contFilter">
          <SearchIcon
            style={{
              position: 'absolute',
              color: 'gray',
              paddingLeft: '10px',
            }}
          />
          <input
            type="text"
            className="inputSearch"
            placeholder="Buscar"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="btnActionsNewReport">
            <Button
              className="btnCreate"
              onClick={() => {
                navegate('/config/roles');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Guardar
            </Button>
            <Button className="btnReport">Cancelar</Button>
          </div>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            getRowId={getRowId}
            rows={filteredData}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            columns={columns}
            pageSize={5}
            onRowClick={usuario => {
              swal({
                buttons: {
                  update: 'Actualizar',
                  cancel: 'Cancelar',
                },
                content: (
                  <div className="logoModal">
                    Que accion desea realizar con el cliente:{' '}
                    {usuario.row.Usuario}
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
                            <TextCustom
                              text="Usuario"
                              className="titleInput"
                            />
                            <input
                              type="text"
                              id="nombre"
                              className="inputCustom"
                              value={usuario.row.Usuario}
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
                              className="inputCustom"
                              value={usuario.row.Nombre_Usuario}
                            />
                          </div>
                          <div className="contInput">
                            <TextCustom
                              text="Estado"
                              className="titleInput"
                            />
                            <input
                              type="text"
                              className="inputCustom"
                              id="EstadoUsuario"
                              value={usuario.row.Estado_Usuario}
                            />
                          </div>
                          <div className="contInput">
                            <TextCustom
                              text="Contraseña"
                              className="titleInput"
                            />
                            <input
                              type="text"
                              id="contrasenia"
                              className="inputCustom"
                            />
                          </div>
                          <div className="contInput">
                            <TextCustom text="Rol" className="titleInput" />
                            <select id="rol" className="selectCustom">
                              
                            </select>
                          </div>
                          <div className="contInput">
                            <TextCustom text="Email" className="titleInput" />
                            <input
                              type="text"
                              id="Email"
                              className="inputCustom"
                              value={usuario.row.Correo_Electronico}
                            />
                          </div>
                        </div>
                      </div>
                    ).then(() => {
                      let data = {
                        Usuario: document.getElementById('nombre').value,
                        Nombre_Usuario:
                          document.getElementById('nombreUsuario').value,
                        Estado_Usuario:
                          document.getElementById('EstadoUsuario').value,
                        Contrasenia:
                          document.getElementById('contrasenia').value,
                        Id_Rol: document.getElementById('rol').value,
                        Correo_Electronico:
                          document.getElementById('Email').value,
                        Id_usuario: usuario.row.id_Usuario,
                      };

                      // if (sendData(urlUpdateUser, data)) {
                      //   swal(<h1>Usuario Actualizado Correctamente</h1>);
                      // }
                    });
                    break;
                  default:
                    break;
                }
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};