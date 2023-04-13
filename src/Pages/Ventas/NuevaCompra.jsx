import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import swal from '@sweetalert/with-react';

//Mui-Material-Icons
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

//Styles
import '../../Styles/Usuarios.css';

//Components
import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import { TextField } from '@mui/material';
import { DataGrid,esES } from '@mui/x-data-grid';

const urlCliente =
  'http://localhost/APIS-Multioptica/Cliente/controller/cliente.php?op=InsertCliente';

export const NuevaCompra = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };
  const [sucursales, setSucursales] = useState([]);

  const [iIdentidad, setiIdentidad] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorIdentidad, setErrorIdentidad] = React.useState(false);

  const [Nombre, setNombre] = React.useState('');
  const [errorNombre, setErrorNombre] = React.useState(false);
  const [Msj, setMsj] = React.useState(false);

  const [Apellido, setApellido] = React.useState('');
  const [errorApellido, setErrorApellido] = React.useState(false);
  const [aviso, setAviso] = React.useState(false);

  const [errorTelefono, setErrorTelefono] = React.useState(false);
  const [texto, setTexto] = React.useState(false);

  const [Telefono, setTelefono] = useState('');

  const [Identidad, setIdentidad] = useState(0);
  const [Telefonoc, setTelefonoc] = useState(0);

  const [roles, setRoles] = useState([]);

  const urlUsers =
    'http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=users';
  const urlUpdateUser =
    'http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=UpdateUsuario';
  const urlRoles =
    'http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=roles';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(urlUsers)
      .then(response => response.json())
      .then(data => setTableData(data));
    fetch(urlRoles)
      .then(response => response.json())
      .then(data => setRoles(data));
  }, []);

  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const handleNext = () => {
    let identidad = document.getElementById('Nidentidad').value;
    let nombres = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellido').value;
    let telefono = document.getElementById('phone').value;
    let genero = parseInt(document.getElementById('genero').value);
    let direccion = parseInt(document.getElementById('direccion').value);
    let correo = document.getElementById('correo').value;
    let fechaN = document.getElementById('Fnacimiento').value;

    let data = {
      idCliente: identidad,
      nombre: nombres,
      apellido: apellidos,
      idGenero: genero,
      fechaNacimiento: fechaN,
      direccion: direccion,
      telefonoCliente: telefono,
      correoElectronico: correo,
    };
    if (sendData(urlCliente, data)) {
      swal('Cliente agregado con exito', '', 'success').then(result => {
        navegate('/menuClientes/listaClientes');
      });
    }
  };

  const handleBack = () => {
    navegate('/inventario');
  };

  const columns = [
    { field: 'IDCompra', headerName: 'No. de Compra', width: 145 },
    { field: 'Producto', headerName: 'Producto', width: 145 },
    { field: 'Cantidad', headerName: 'Cantidad', width: 145 },
    { field: 'Fecha', headerName: 'Fecha', width: 145 },
    { field: 'Costo de la Compra', headerName: 'Costo de la Compra', width: 145 },
    { field: 'Total', headerName: 'Total', width: 145 },
    
    
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 180,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit"
            // onClick={() => handleButtonClick(params.row.id)}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            // onClick={() => handleButtonClick(params.row.id)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Nueva Compra</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos de Nueva
          Compra.
        </h3>
      </div>
      <div className="infoAddCompra">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="No. de Compra" className="titleInput" />

              <input
                error={errorIdentidad}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                onKeyDown={e => {
                  setiIdentidad(e.target.value);
                  setIdentidad(parseInt(e.target.value));
                  if (iIdentidad === '') {
                    setErrorIdentidad(true);
                    setleyenda('Los campos no deben estar vacios');
                  } else {
                    setErrorIdentidad(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(iIdentidad)) {
                      setErrorIdentidad(true);
                      setleyenda('Solo deben de ingresar numeros');
                    } else {
                      setErrorIdentidad(false);
                      setleyenda('');
                    }
                  }
                }}
                placeholder="No. de Compra"
                id="Nidentidad"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Proveedor" className="titleInput" />
              <select name="" className="selectCustom" id="genero">
                <option value={1}>No se sabe</option>
                <option value={2}>No se sabe</option>
              </select>
            </div>
            <div className="contInput">
              <TextCustom text="Producto" className="titleInput" />
              <select name="" className="selectCustom" id="genero">
                <option value={1}>No se sabe</option>
                <option value={2}>No se sabe</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Cantidad" className="titleInput" />

              <input
                error={errorIdentidad}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                onKeyDown={e => {
                  setiIdentidad(e.target.value);
                  setIdentidad(parseInt(e.target.value));
                  if (iIdentidad === '') {
                    setErrorIdentidad(true);
                    setleyenda('Los campos no deben estar vacios');
                  } else {
                    setErrorIdentidad(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(iIdentidad)) {
                      setErrorIdentidad(true);
                      setleyenda('Solo deben de ingresar numeros');
                    } else {
                      setErrorIdentidad(false);
                      setleyenda('');
                    }
                  }
                }}
                placeholder="Cantidad"
                id="Nidentidad"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Fecha" className="titleInput" />
              <input
                onKeyDown={e => {
                  setTelefono(e.target.value);
                  if (Telefono === '') {
                    setTexto('Los campos no deben estar vacios');
                    setErrorTelefono(true);
                  } else {
                    setErrorTelefono(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(Telefono)) {
                      setErrorTelefono(true);
                      setTexto('Solo deben de ingresar numeros');
                    } else {
                      setErrorTelefono(false);
                      setTexto('');
                    }
                  }
                }}
                error={errorTelefono}
                type="date"
                name=""
                helperText={texto}
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha"
                id="fechaN"
              />
              {<p className="error">{texto}</p>}
            </div>

            <div className="contInput">
              <TextCustom text="Costo de la Compra" className="titleInput" />

              <input
                error={errorIdentidad}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                onKeyDown={e => {
                  setiIdentidad(e.target.value);
                  setIdentidad(parseInt(e.target.value));
                  if (iIdentidad === '') {
                    setErrorIdentidad(true);
                    setleyenda('Los campos no deben estar vacios');
                  } else {
                    setErrorIdentidad(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(iIdentidad)) {
                      setErrorIdentidad(true);
                      setleyenda('Solo deben de ingresar numeros');
                    } else {
                      setErrorIdentidad(false);
                      setleyenda('');
                    }
                  }
                }}
                placeholder="Costo de la Compra"
                id="Nidentidad"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Total" className="titleInput" />

              <input
                error={errorIdentidad}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                onKeyDown={e => {
                  setiIdentidad(e.target.value);
                  setIdentidad(parseInt(e.target.value));
                  if (iIdentidad === '') {
                    setErrorIdentidad(true);
                    setleyenda('Los campos no deben estar vacios');
                  } else {
                    setErrorIdentidad(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(iIdentidad)) {
                      setErrorIdentidad(true);
                      setleyenda('Solo deben de ingresar numeros');
                    } else {
                      setErrorIdentidad(false);
                      setleyenda('');
                    }
                  }
                }}
                placeholder="Total"
                id="Nidentidad"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contBtnStepper1">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  if (
                    document.getElementById('Nidentidad').value === '' ||
                    document.getElementById('nombre').value === '' ||
                    document.getElementById('apellido').value === ''
                  ) {
                    swal('No deje campos vacios.', '', 'error');
                  } else if (
                    typeof (
                      parseInt(document.getElementById('Nidentidad').value) !==
                      'number'
                    )
                  ) {
                    swal('El campo identidad solo acepta numeros', '', 'error');
                  } else if (
                    typeof document.getElementById('nombre').value !== 'string'
                  ) {
                    swal('El campo nombre solo acepta letras', '', 'error');
                  }
                  if (
                    typeof document.getElementById('apellido').value !==
                    'string'
                  ) {
                    swal('El campo apellido solo acepta letras', '', 'error');
                  }
                  if (isNaN(Telefonoc) || isNaN(Identidad)) {
                    swal('Corrija los campos Erroneos', '', 'error');
                  } else {
                    handleNext();
                  }
                }}
              >
                <h1>{'Finish' ? 'Agregar' : 'Finish'}</h1>
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>

          <div
            style={{
              height: 400,
              position: 'relative',
            }}
          >
            <div className="contFilter1">
              <SearchIcon
                style={{
                  position: 'absolute',
                  color: 'gray',
                  paddingLeft: '10px',
                }}
              />
              <input
                type="text"
                className="inputSearch"
                placeholder="Buscar"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <div className="btnActionsNewReport">
                <Button
                  className="btnCreate1"
                  onClick={() => {
                    navegate('/menuVentas/NuevaCompra');
                  }}
                >
                  <AddIcon style={{ marginRight: '5px' }} />
                  Guardar
                </Button>
                <Button className="btnReport1">
                  Cancelar
                </Button>
              </div>
            </div>
            <DataGrid
              getRowId={tableData => tableData.id_Usuario}
              rows={filteredData}
              columns={columns}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onRowClick={usuario => {
                swal({
                  buttons: {
                    update: 'Actualizar',
                    cancel: 'Cancelar',
                  },
                  content: (
                    <div className="logoModal">
                      Que accion desea realizar con el cliente:{' '}
                      {usuario.row.Usuario}
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
                              <TextCustom
                                text="Usuario"
                                className="titleInput"
                              />
                              <input
                                type="text"
                                id="nombre"
                                className="inputCustom"
                                value={usuario.row.Usuario}
                              />
                            </div>

                            <div className="contInput">
                              <TextCustom
                                text="Nombre de Usuario"
                                className="titleInput"
                              />
                              <input
                                type="text"
                                id="nombreUsuario"
                                className="inputCustom"
                                value={usuario.row.Nombre_Usuario}
                              />
                            </div>
                            <div className="contInput">
                              <TextCustom
                                text="Estado"
                                className="titleInput"
                              />
                              <input
                                type="text"
                                className="inputCustom"
                                id="EstadoUsuario"
                                value={usuario.row.Estado_Usuario}
                              />
                            </div>
                            <div className="contInput">
                              <TextCustom
                                text="Contraseña"
                                className="titleInput"
                              />
                              <input
                                type="text"
                                id="contrasenia"
                                className="inputCustom"
                              />
                            </div>
                            <div className="contInput">
                              <TextCustom text="Rol" className="titleInput" />
                              <select id="rol" className="selectCustom">
                                
                              </select>
                            </div>
                            <div className="contInput">
                              <TextCustom text="Email" className="titleInput" />
                              <input
                                type="text"
                                id="Email"
                                className="inputCustom"
                                value={usuario.row.Correo_Electronico}
                              />
                            </div>
                          </div>
                        </div>
                      ).then(() => {
                        let data = {
                          Usuario: document.getElementById('nombre').value,
                          Nombre_Usuario:
                            document.getElementById('nombreUsuario').value,
                          Estado_Usuario:
                            document.getElementById('EstadoUsuario').value,
                          Contrasenia:
                            document.getElementById('contrasenia').value,
                          Id_Rol: document.getElementById('rol').value,
                          Correo_Electronico:
                            document.getElementById('Email').value,
                          Id_usuario: usuario.row.id_Usuario,
                        };

                        if (sendData(urlUpdateUser, data)) {
                          swal(<h1>Usuario Actualizado Correctamente</h1>);
                        }
                      });
                      break;
                    default:
                      break;
                  }
                });
              }}
            />
          </div>
        </div>
      </div>
  );
};
