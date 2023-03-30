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
import { TextCustom } from '../Components/TextCustom';

export const ListaEmpleados = () => {
  const [generos, setGeneros] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navegate = useNavigate();

  const urlEmployees =
    'http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=Employees';
  const urlgeneros =
    'http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=generos';
  const urlsucursales =
    'http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=sucursales';
  const urlUpdateEmployees =
    'http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=UpdateEmployee';

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch(urlEmployees)
      .then(response => response.json())
      .then(data => setTableData(data));
    fetch(urlgeneros)
      .then(response => response.json())
      .then(data => setGeneros(data));
    fetch(urlsucursales)
      .then(response => response.json())
      .then(data => setSucursales(data));
  }, []);

  // const handleChange=e=>{
  //     setBusqueda(e.target.value)
  //     filtrar(e.target.value)
  // }

  // const filtrar = (termino) =>{
  //     let resultados = tableData.filter((elemento)=>{
  //         if (elemento.Nombre.toString().toLowerCase().includes(termino.toLowerCase())
  //         || elemento.apellido.toString().toLowerCase().includes(termino.toLowerCase())
  //         || elemento.Telefono.toString().toLowerCase().includes(termino.toLowerCase())
  //         || elemento.departamento.toString().toLowerCase().includes(termino.toLowerCase())
  //         || elemento.genero.toString().toLowerCase().includes(termino.toLowerCase())
  //         || elemento.numeroIdentidad.toString().toLowerCase().includes(termino.toLowerCase())
  //         ) {
  //             return elemento
  //         }
  //     })
  //     setTableData(resultados)
  // }
  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [
    { field: 'IdEmpleado', headerName: 'ID', width: 130 },
    { field: 'Nombre', headerName: 'Nombre', width: 130 },
    { field: 'apellido', headerName: 'Apellido', width: 130 },
    { field: 'Telefono', headerName: 'Telefono', width: 130 },
    { field: 'departamento', headerName: 'Sucursal', width: 130 },
    { field: 'genero', headerName: 'Genero', width: 130 },
    { field: 'numeroIdentidad', headerName: 'Numero de identidad', width: 200 },
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit"
            onClick={() => handleButtonClick(params.row.id)}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
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
    navegate('/usuarios');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Empleados</h2>

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
          <SearchIcon
            style={{ position: 'absolute', color: 'gray', paddingLeft: '10px' }}
          />
          <input
            type="text"
            className="inputSearch"
            placeholder="Buscar"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {/* </div> */}
          <div className="btnActionsNewReport">
            <Button
              className="btnCreate"
              onClick={() => {
                navegate('/usuarios/crearusuario');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Crear Usuario
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdEmpleado}
          rows={filteredData}
          columns={columns}
          pageSize={5}
          onRowClick={empleado => {
            swal({
              buttons: {
                update: 'ACTUALIZAR',
                cancel: 'CANCELAR',
              },
              content: (
                <div className="logoModal">
                  Que accion desea realizar con el empleado:{' '}
                  {empleado.row.Nombre}{' '}
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
                          <TextCustom text="Nombre" className="titleInput" />
                          <input
                            type="text"
                            id="nombre"
                            className='inputCustom'

                            value={empleado.row.Nombre}
                          />
                        </div>
                        <div className="contInput">
                          <TextCustom text="Apellido" className="titleInput" />
                          <input
                            type="text"
                            id="apellido"
                            className='inputCustom'

                            value={empleado.row.apellido}
                          />
                        </div>
                        <div className="contInput">
                          <TextCustom text="Telefono" className="titleInput" />
                          <input
                            type="text"
                            id="telefono"
                            className='inputCustom'

                            value={empleado.row.Telefono}
                          />
                        </div>
                        <div className="contInput">
                          <TextCustom text="Identidad" className="titleInput" />
                          <input
                            type="text"
                            id="identidad"
                            className='inputCustom'

                            value={empleado.row.numeroIdentidad}
                          />
                        </div>
                        <div className="contInput">
                          <TextCustom text="Sucursal" className="titleInput" />
                          <select id="sucursal" className="selectCustom">
                            {sucursales.length ? (
                              sucursales.map(pre => (
                                <option
                                  key={pre.IdSucursal}
                                  value={pre.IdSucursal}
                                >
                                  {pre.departamento}
                                </option>
                              ))
                            ) : (
                              <option value="No existe informacion">
                                No existe informacion
                              </option>
                            )}
                          </select>
                        </div>

                        <div className="contInput">
                          <TextCustom text="Genero" className="titleInput" />
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
                        </div>
                      </div>
                    </div>,
                  ).then(() => {
                    let data = {
                      nombre: document.getElementById('nombre').value,
                      apellido: document.getElementById('apellido').value,
                      telefonoEmpleado:
                        document.getElementById('telefono').value,
                      IdSucursal: document.getElementById('sucursal').value,
                      IdGenero: document.getElementById('genero').value,
                      numeroIdentidad:
                        document.getElementById('identidad').value,
                      IdEmpleado: empleado.row.IdEmpleado,
                    };

                    if (sendData(urlUpdateEmployees, data)) {
                      swal(<h1>Empleado Editado Correctamente</h1>);
                    }
                  });
                  break;
                default:
                  break;
              }
            });
          }}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};
