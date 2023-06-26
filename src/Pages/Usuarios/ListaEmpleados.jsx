import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';
import swal from '@sweetalert/with-react';

//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import axios from 'axios';

export const ListaEmpleados = () => {
  const [cambio, setCambio] = useState(0);
  const [generos, setGeneros] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const urlEmployees = 'http://localhost:3000/api/empleado';
  const urlUpdateEmployees = 'http://localhost:3000/api/empleado/actualizar';
  const urlDelEmployees = 'http://localhost:3000/api/empleado/eliminar';
  const urlgeneros = 'http://localhost:3000/api/empleado/genero';
  const urlsucursales = 'http://localhost:3000/api/empleado/sucursal';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [Nombre, setNombre] = useState('');
  const [errorNombre, setErrorNombre] = useState(false);
  const [Msj, setMsj] = useState(false);

  useEffect(() => {
    axios
      .get(urlEmployees)
      .then(response => {
        setTableData(response.data);
      })
      .catch(error => console.log(error));

    axios
      .get(urlgeneros)
      .then(response => {
        setGeneros(response.data);
      })
      .catch(error => console.log(error));

    axios
      .get(urlsucursales)
      .then(response => {
        setSucursales(response.data);
      })
      .catch(error => console.log(error));
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
    //son los de la base no los de node
    { field: 'IdEmpleado', headerName: 'ID', width: 190 },
    { field: 'nombre', headerName: 'Nombre', width: 190 },
    { field: 'apellido', headerName: 'Apellido', width: 190 },
    { field: 'telefonoEmpleado', headerName: 'Telefono', width: 190 },
    { field: 'departamento', headerName: 'Sucursal', width: 190 },
    { field: 'descripcion', headerName: 'Genero', width: 190 },
    { field: 'numeroIdentidad', headerName: 'Numero de identidad', width: 190 },
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 260,

      renderCell: params => (
        <div className="contActions1">
          <Button className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleDel(params.row.IdEmpleado)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  //funcion de eliminar
  function handleDel(id) {
    swal({
      content: (
        <div>
          <div className="logoModal">¿Desea Elimiar este empleado?</div>
          <div className="contEditModal"></div>
        </div>
      ),
      buttons: ['Eliminar', 'Cancelar'],
    }).then(async op => {
      switch (op) {
        case null:
          let data = {
            IdEmpleado: id,
          };

          console.log(data);

          await axios
            .delete(urlDelEmployees, { data })
            .then(response => {
              swal('Empleado eliminado correctamente', '', 'success');
              setCambio(cambio + 1);
            })
            .catch(error => {
              console.log(error);
              swal('Error al eliminar el empleado', '', 'error');
            });

          break;

        default:
          break;
      }
    });
  }

  //funcion de actualizar
  function handleUpdt(id) {
    // onRowClick={empleado => {
    swal({
      buttons: {
        update: 'ACTUALIZAR',
        cancel: 'CANCELAR',
      },
      content: (
        <div className="logoModal">
          ¿Desea actualizar el empleado: {id.nombre} ?
        </div>
      ),
    }).then(op => {
      switch (op) {
        case null:
          break;
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
                    className="inputCustom"
                    value={id.Nombre}
                    maxLength={20}
                    onKeyDown={e => {
                      setNombre(e.target.value);
                      if (Nombre == '') {
                        setErrorNombre(true);
                        setMsj('Los campos no deben estar vacios');
                      } else {
                        setErrorNombre(false);
                        var preg_match = /^[a-zA-Z]+$/;
                        if (!preg_match.test(Nombre)) {
                          setErrorNombre(true);
                          setMsj('Solo debe de ingresar letras');
                        } else {
                          setErrorNombre(false);
                          setMsj('');
                        }
                      }
                    }}
                    error={errorNombre}
                  />
                  <p className="error">{Msj}</p>
                </div>
                <div className="contInput">
                  <TextCustom text="Apellido" className="titleInput" />
                  <input
                    type="text"
                    id="apellido"
                    className="inputCustom"
                    value={id.apellido}
                  />
                </div>
                <div className="contInput">
                  <TextCustom text="Telefono" className="titleInput" />
                  <input
                    type="text"
                    id="telefono"
                    className="inputCustom"
                    value={id.telefonoEmpleado}
                  />
                </div>
                <div className="contInput">
                  <TextCustom text="Identidad" className="titleInput" />
                  <input
                    type="text"
                    id="identidad"
                    className="inputCustom"
                    value={id.numeroIdentidad}
                  />
                </div>
                <div className="contInput">
                  <TextCustom text="Sucursal" className="titleInput" />
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
          ).then(async () => {
            let data = {
              nombre: document.getElementById('nombre').value,
              apellido: document.getElementById('apellido').value,
              telEmple: document.getElementById('telefono').value,
              idSucursal: document.getElementById('sucursal').value,
              idGenero: document.getElementById('genero').value,
              numId: document.getElementById('identidad').value,
              IdEmpleado: id.IdEmpleado,
            };

            // if (sendData(urlUpdateEmployees, data)) {
            //   swal(<h1>Empleado Editado Correctamente</h1>);
            // }

            await axios
              .put(urlUpdateEmployees, data)
              .then(response => {
                swal(<h1>Empleado Actualizado Correctamente</h1>);
                setCambio(cambio + 1);
              })
              .catch(error => {
                // Manejar cualquier error que pueda ocurrir durante la actualización
              });
          });
          break;

        default:
          break;
      }
    });
    //}//}//
  }

  const handleBack = () => {
    navegate('/empleados/lista');
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
                navegate('/usuarios/crearempleado');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Empleado
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
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={5}
          //aqui iba el onrow
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};
