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
import axios from 'axios'; //Agregarlo siempre porque se necesita para exportar Axios para que se puedan consumir las Apis 


export const ListaPermisos = (props) => {

  const [marcah, setMarcah] = useState()
  const [cambio, setCambio] = useState(0)

  const urlPermisosvista = 'http://localhost:3000/api/permisos';//Lista de permisos

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //Llama a toda los datos que estan en permisos 
  useEffect(() => {
    axios.get(urlPermisosvista).then(response => setTableData(response.data))
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
    { field: 'Rol', headerName: 'Rol', width: 130 },
    { field: 'Objeto', headerName: 'Modulo', width: 200 },
    { field: 'Permiso_Insercion', headerName: 'Permiso para Insertar', width: 200, },
    { field: 'Permiso_Eliminacion', headerName: 'Permiso para Eliminar', width: 200, },
    { field: 'Permiso_Actualizacion', headerName: 'Permiso para Actualizar', width: 200, },
    { field: 'Permiso_Consultar', headerName: 'Permiso para Consultar', width: 200, },

    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190,

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
    navegate('/seguridad');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Permisos</h2>
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
           {/*  <Button
              className="btnCreate"
              onClick={() => {
                navegate('/config/roles');
              }}
            > */}
             {/*  <AddIcon style={{ marginRight: '5px' }} />
              Guardar
            </Button>
            <Button className="btnReport">Cancelar</Button> */}
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
              swal('No es posible realizar esta acción ', '', 'error');
              setCambio(cambio + 1);
            }}
          />
        </div>
      </div>
    </div>
  );
};
