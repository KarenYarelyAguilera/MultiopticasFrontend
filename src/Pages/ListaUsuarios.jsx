import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const ListUsuarios = () => {


    const urlUsers = "http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=users"


    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch(urlUsers).then(response => response.json()).then(data => setTableData(data))
    },[])
    const navegate = useNavigate()

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
        
    ]

    return (
        <div style={{ height: 400, width: '70%' }}>
            <h2>Lista de Usuarios</h2>
            <br>
            </br>
            <Button
                variant="contained"
                color="success"
                
                onClick={()=>
                    {
                    navegate("/usuarios/crearusuario")
                    }
                }
                >
                    Crear Usuario
              </Button>
              <Button variant="contained" color="secondary">
                Generar reporte
            </Button>

            <br>
            </br>
            <br></br>
            <br></br>
            <DataGrid getRowId={(tableData)=>tableData.id_Usuario} 
                rows={tableData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}   
            />
        </div>
    )


}