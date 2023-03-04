import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

export const ListUsuarios = () => {


    const urlUsers = "http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=users"


    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch(urlUsers).then(response => response.json()).then(data => setTableData(data))
    },[])


    const columns = [
        { field: 'idEmpleado', headerName: 'ID', width: 130 },
        { field: 'Usuario', headerName: 'Usuario', width: 130 },
        { field: 'Nombre_Usuario', headerName: 'Nombre de Usuario', width: 130 },
        { field: 'descripcion', headerName: 'Cargo', width: 130 },
        { field: 'Estado_Usuario', headerName: 'Estado', width: 130 },
        { field: 'Correo_Electronico', headerName: 'EMail', width: 200 },
        { field: 'Contrasenia', headerName: 'Contraseña', width: 130 },
        { field: 'Fecha_Ultima_Conexion', headerName: 'Ultima Conexion', width: 200 },
        { field: 'Fecha_Vencimiento', headerName: 'Fecha de vencimiento', width: 130 },
        
    ]

    return (
        <div style={{ height: 400, width: '70%' }}>
            <DataGrid getRowId={(tableData)=>tableData.idEmpleado} 
                rows={tableData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}   
            />
        </div>
    )


}