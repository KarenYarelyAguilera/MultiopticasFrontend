import { DataGrid } from '@mui/x-data-grid';
import swal from '@sweetalert/with-react';
import { useState, useEffect } from 'react';
import { sendData } from '../scripts/sendData';


export const ListUsuarios = () => {

    const[roles,setRoles] = useState([])

    const urlUsers = "http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=users"
    const urlUpdateUser = "http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=UpdateUsuario";
    const urlRoles = "http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=roles";
 
    const [tableData, setTableData] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch(urlUsers).then(response => response.json()).then(data => setTableData(data))
        fetch(urlRoles).then(response => response.json()).then(data => setRoles(data))
    },[])

    const filteredData = tableData.filter((row) =>
    Object.values(row).some(
      (value) => value && value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    )
  );

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
        <>
         <div className='buscador'>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
        <div style={{ height: 400, width: '70%' }}>
            <DataGrid getRowId={(tableData)=>tableData.id_Usuario} 
                rows={filteredData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]} 
                onRowClick={(usuario) => {

                    swal({
                        buttons: {
                            update: 'Actualizar',
                            cancel: 'Cancel',
                        },
                        content: (
                            <>
                                <h1>Que accion desea realizar con el usuario: {usuario.row.Usuario} </h1>
                            </>
                        )

                    }).then(op => {
                        switch (op) {
                            case 'update':
                                swal(<forn>
                                    <label htmlFor="">Usuario: <input type="text" id='nombre' value={usuario.row.Usuario} /></label><br />
                                    <label htmlFor="">Nombre de Usuario: <input type="text" id='nombreUsuario' value={usuario.row.Nombre_Usuario} /></label><br />
                                    <label htmlFor="">Estado: <input type="text" id='EstadoUsuario' value={usuario.row.Estado_Usuario} /></label><br />
                                    <label htmlFor="">Contraseña: <input type="text" id='contrasenia' /></label><br />
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
                                    <label htmlFor="">Email: <input type="text" id='Email' value={usuario.row.Correo_Electronico} /></label><br />
                                </forn>).then(()=>{
                                    let data = {
                                        Usuario:document.getElementById("nombre").value,
                                        Nombre_Usuario: document.getElementById("nombreUsuario").value,
                                        Estado_Usuario: document.getElementById("EstadoUsuario").value,
                                        Contrasenia: document.getElementById("contrasenia").value,
                                        Id_Rol:document.getElementById("rol").value,
                                        Correo_Electronico:document.getElementById("Email").value,
                                        Id_usuario:usuario.row.id_Usuario
                                    }

                                    if (sendData(urlUpdateUser,data)) {
                                        swal(<h1>Usuario Actualizado Correctamente</h1>)
                                    }
                                    
                                })
                                break;
                            default:
                                break;
                        }
                    })
                }}  
            />
        </div>
        </>
    )


}