import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import swal from '@sweetalert/with-react';
import { sendData } from '../scripts/sendData';

//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';


import '../Styles/Usuarios.css';

export const ListaClientes = () => {

  const urlClientes = "http://localhost/APIS-Multioptica/Cliente/controller/cliente.php?op=Clientes"

  const [tableData, setTableData] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
      fetch(urlClientes).then(response => response.json()).then(data => setTableData(data))
},[])


  const navegate = useNavigate()


  const filteredData = tableData.filter((row) =>
  Object.values(row).some(
    (value) => value && value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
  )
);

const columns = [
  { field: 'idCliente', headerName: 'ID', width: 130 },
  { field: 'nombre', headerName: 'Nombre', width: 130 },
  { field: 'apellido', headerName: 'Apellido', width: 130 },
  { field: 'genero', headerName: 'Genero', width: 130 },
  { field: 'fechaNacimiento', headerName: 'Fecha de nacimiento', width: 130 },
  { field: 'direccion', headerName: 'direccion', width: 130 },
  { field: 'Telefono', headerName: 'Telefono', width: 200 },
  { field: 'Email', headerName: 'Correo electronico', width: 130 },
  {
    field: 'borrar',
    headerName: 'Acciones',
    width: 190,

    renderCell: params => (
      <div className='contActions'>
        <Button
          className='btnEdit'
          onClick={() => handleButtonClick(params.row.id)}
        >
          <EditIcon></EditIcon>
        </Button>
        <Button
          className='btnDelete'
          onClick={() => handleButtonClick(params.row.id)}
        >
          <DeleteForeverIcon></DeleteForeverIcon>
        </Button>
      </div>
    ),
  },
];

function handleButtonClick(id) {
  fetch(`/api/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      /* los nuevos datos que se van a actualizar */
    }),
  })
    .then(response => response.json())
    .then(data => {
      // Aquí puedes actualizar los datos en el estado de tu aplicación
      // para reflejar los cambios en la interfaz de usuario.
    })
    .catch(error => {
      // Manejar cualquier error que pueda ocurrir durante la actualización
    });
}
const handleBack = () => {
  navegate('/menuClientes');
};

return (
  <div className="ContUsuarios">
    <Button className="btnBack" onClick={handleBack}>
      <ArrowBackIcon className="iconBack" />
    </Button>
    <h2 style={{color:'black', fontSize:'40px'}}>Lista de Clientes</h2>

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
        <SearchIcon style={{position:'absolute', color:'gray', paddingLeft:'10px'}}/>
          <input
            type="text"
            className='inputSearch'
            placeholder='Buscar'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        {/* </div> */}
        <div className='btnActionsNewReport'>
        <Button
          className='btnCreate'
          onClick={() => {
              navegate('/usuarios/crearusuario');
          }}
          >
            <AddIcon style={{marginRight:'5px'}}/>
          Crear Cliente
        </Button>
        <Button className='btnReport'>
        <PictureAsPdfIcon style={{marginRight:'5px'}}/>
          Generar reporte
        </Button>
        </div>
      </div>
      <DataGrid getRowId={(tableData)=>tableData.idCliente} 
              rows={filteredData}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]} 
              
          />
    </div>
  </div>
);
};
