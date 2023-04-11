import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';


export const ListaPermisos = () => {

    const urlPermisosvista = "http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=verpermisos"
    const [tableData, setTableData] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch(urlPermisosvista).then(response => response.json()).then(data => setTableData(data))
    }, [])

    const filteredData = tableData.filter((row) =>
    Object.values(row).some(
      (value) => value && value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    )
  );


    const columns = [
        { field: 'Rol', headerName: 'Rol', width: 130 },
        { field: 'Descripcion', headerName: 'Descripcion del modulo', width: 300 },
        { field: 'Permiso_Consultar', headerName: 'Permiso para Consultar', width: 200 },
        { field: 'Permiso_Insercion', headerName: 'Permiso para Insertar', width: 200 },
        { field: 'Permiso_Actualizacion', headerName: 'Permiso para Actualizar', width: 200 },
        { field: 'Permiso_Eliminacion', headerName: 'Permiso para Eliminar', width: 200 },

    ]

    const getRowId = (row) => {
        // Use a random number generator to generate a unique ID for each row
        return Math.random().toString(36).substr(2, 9);
    };

    return (
        <>
            <div className='buscador'>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div style={{ height: 400, width: '70%' }}>
                <DataGrid
                    getRowId={getRowId}
                    rows={filteredData}
                    columns={columns}
                    pageSize={5} />
            </div>
        </>
    )


}