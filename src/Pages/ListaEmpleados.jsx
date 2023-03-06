import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

export const ListaEmpleados = () => {


    const urlEmployees = "http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=Employees"


    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch(urlEmployees).then(response => response.json()).then(data => setTableData(data))
    },[])

    for (let i = 0; i < tableData.length; i++) {
        tableData[i].boton = <button>asdas</button>
        console.log(tableData[i].departamento);
        
    }

    const columns = [
        { field: 'IdEmpleado', headerName: 'ID', width: 130 },
        { field: 'descripcion', headerName: 'Cargo', width: 130 },
        { field: 'Nombre', headerName: 'Nombre', width: 130 },
        { field: 'apellido', headerName: 'Apellido', width: 130 },
        { field: 'Telefono', headerName: 'Telefono', width: 130 },
        { field: 'departamento', headerName: 'Sucursal', width: 130 },
        { field: 'genero', headerName: 'Genero', width: 130 },
        { field: 'numeroIdentidad', headerName: 'Numero de identidad', width: 200 },
        { field: 'boton', headerName: 'Accion', width: 130 },
        
    ]

    return (
        <div style={{ height: 400, width: '70%' }}>
            <DataGrid getRowId={(tableData)=>tableData.IdEmpleado} 
                rows={tableData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}   
            />
        </div>
    )


}