import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import '../Styles/Botones.css';



export const ListUsuarios = () => {


  const urlUsers = "http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=users"


  const [tableData, setTableData] = useState([])



  useEffect(() => {
    fetch(urlUsers).then(response => response.json()).then(data => setTableData(data))
  }, [])


  const columns = [

    { field: 'id_Usuario', headerName: 'ID', width: 130 },
    { field: 'Usuario', headerName: 'Usuario', width: 130 },
    { field: 'Nombre_Usuario', headerName: 'Nombre de Usuario', width: 130 },
    { field: 'rol', headerName: 'Rol', width: 130 },
    { field: 'Estado_Usuario', headerName: 'Estado', width: 130 },
    { field: 'Correo_Electronico', headerName: 'EMail', width: 200 },
    { field: 'Contrasenia', headerName: 'Contraseña', width: 130 },
    { field: 'Fecha_Ultima_Conexion', headerName: 'Ultima Conexion', width: 200 },
    { field: 'Fecha_Vencimiento', headerName: 'Fecha de vencimiento', width: 130 },
    {
      field: 'borrar',
      headerName: '',
      width: 190,

      renderCell: (params) => (

        <div>

          <Button variant="contained" color="primary" onClick={() => handleButtonClick(params.row.id)}>Editar</Button>
          <Button variant="contained" color="primary" onClick={() => handleButtonClick(params.row.id)}>Borrar</Button>

        </div>

      ),
    },
  ]




  function handleButtonClick(id) {
    fetch(`/api/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ /* los nuevos datos que se van a actualizar */ })
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


  return (

    <div style={{ height: 400, width: '66%' }}>
      <DataGrid getRowId={(tableData) => tableData.id_Usuario}
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  )



}