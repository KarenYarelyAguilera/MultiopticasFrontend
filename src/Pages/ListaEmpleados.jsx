import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import swal from '@sweetalert/with-react';
import { sendData } from '../scripts/sendData';


export const ListaEmpleados = () => {

    const[generos,setGeneros] = useState([])
    const[sucursales,setSucursales] = useState([])
    

    const urlEmployees = "http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=Employees"
    const urlgeneros = "http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=generos"
    const urlsucursales = "http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=sucursales"
    const urlUpdateEmployees = "http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=UpdateEmployee";

    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch(urlEmployees).then(response => response.json()).then(data => setTableData(data))
        fetch(urlgeneros).then(response => response.json()).then(data => setGeneros(data))
        fetch(urlsucursales).then(response => response.json()).then(data => setSucursales(data))
    },[])


    const columns = [
        { field: 'IdEmpleado', headerName: 'ID', width: 130 },
        { field: 'Nombre', headerName: 'Nombre', width: 130 },
        { field: 'apellido', headerName: 'Apellido', width: 130 },
        { field: 'Telefono', headerName: 'Telefono', width: 130 },
        { field: 'departamento', headerName: 'Sucursal', width: 130 },
        { field: 'genero', headerName: 'Genero', width: 130 },
        { field: 'numeroIdentidad', headerName: 'Numero de identidad', width: 200 }

    ]

    return (
        <div style={{ height: 400, width: '70%' }}>
            <h2>Lista de Empleados</h2>
            <DataGrid getRowId={(tableData) => tableData.IdEmpleado}
                rows={tableData}
                columns={columns}
                pageSize={5}
                onRowClick={(empleado) => {

                    swal({
                        buttons: {
                            update: 'Actualizar',
                            delete: 'Eliminar',
                            cancel: 'cancel',
                        },
                        content: (
                            <>
                                <h1>Que accion desea realizar con el empleado: {empleado.row.Nombre} </h1>
                            </>
                        )

                    }).then(op => {
                        switch (op) {
                            case 'update':
                                swal(<form>
                                    <label htmlFor="">Nombre: <input type="text" id='nombre' value={empleado.row.Nombre} /></label><br />
                                    <label htmlFor="">Apellido: <input type="text" id='apellido' value={empleado.row.apellido}  /></label><br />
                                    <label htmlFor="">Telefono: <input type="text" id='telefono' value={empleado.row.Telefono} /></label><br />
                                    <label htmlFor="">Numero de identidad: <input type="text" id='identidad' value={empleado.row.numeroIdentidad} /></label><br />
                                  
                                    <select id="sucursal" className="selectCustom">
                                        {sucursales.length ? (
                                            sucursales.map(pre => (
                                                <option key={pre.IdSucursal} value={pre.IdSucursal}>
                                                    {pre.departamento}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="No existe informacion">
                                                No existe informacion
                                            </option>
                                        )}
                                    </select> <br />
                                    <select id="genero" className="selectCustom">
                                        {generos.length ? (
                                            generos.map(pre => (
                                                <option key={pre.IdGenero} value={pre.IdGenero}>
                                                    {pre.descripcion}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="No existe informacion">
                                                No existe informacion
                                            </option>
                                        )}
                                    </select>
                                </form>).then(()=>{
                                    let data = {
                                        IdCargo:document.getElementById("cargo").value,
                                        nombre: document.getElementById("nombre").value,
                                        apellido: document.getElementById("apellido").value,
                                        telefonoEmpleado: document.getElementById("telefono").value,
                                        IdSucursal:document.getElementById("sucursal").value,
                                        IdGenero:document.getElementById("genero").value,
                                        numeroIdentidad:document.getElementById("identidad").value,
                                        IdEmpleado:empleado.row.IdEmpleado
                                    }

                                    if (sendData(urlUpdateEmployees,data)) {
                                        swal(<h1>Empleado Actualizado Correctamente</h1>)
                                    }
                                    
                                })
                                break;
                            case "delete":
                                swal("elimina")
                                break
                            default:
                                break;
                        }
                    })
                }}
                rowsPerPageOptions={[5]}
            />
        </div>
    )


}