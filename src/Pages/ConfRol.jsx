import { useEffect, useState } from 'react';
import { TextCustom } from '../Components/TextCustom';
import { Button, Switch, styled } from '@mui/material';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { sendData } from '../scripts/sendData';

export const ConfigRol = () => {
  const urlRoles =
    'http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=roles';

  const urlupConsulta =
    'http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=permisosconsultar';
  const urlupInsert =
    'http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=permisosinsert';
  const urlupUpdt =
    'http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=permisosupdt';
  const urlupDel =
    'http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=permisosdel';

  const [roles, setRoles] = useState([]);
  const [accion, setAccion] = useState(1);
  const [usuario, setUsuario] = useState(false);
  const [inventario, setInventario] = useState(false);
  const [clientes, setClientes] = useState(false);
  const [ventas, setVentas] = useState(false);
  const [reportes, setReportes] = useState(false);
  const [recordatorios, setRecordatorios] = useState(false);
  const [seguridad, setSeguridad] = useState(false);
  const [configuracion, setConfig] = useState(false);
  const [gRol, setGRol] = useState(1);

  const data = {
    idrol: gRol,
    usuario: usuario ? 's' : 'n',
    ventas: ventas ? 's' : 'n',
    inventario: inventario ? 's' : 'n',
    clientes: clientes ? 's' : 'n',
    reportes: reportes ? 's' : 'n',
    recordatorios: recordatorios ? 's' : 'n',
    seguridad: seguridad ? 's' : 'n',
    config: configuracion ? 's' : 'n',
  };

  useEffect(() => {
    fetch(urlRoles)
      .then(response => response.json())
      .then(data => setRoles(data));
    setRecordatorios(false);
    setClientes(false);
    setConfig(false);
    setUsuario(false);
    setInventario(false);
    setReportes(false);
    setVentas(false);
    setSeguridad(false);
  }, [accion]);
  const handleUsuarioChange = () => {
    setUsuario(!usuario);
  };
  const handleInventarioChange = () => {
    setInventario(!inventario);
  };
  const handleClientesChange = () => {
    setClientes(!clientes);
  };
  const handleVentasChange = () => {
    setVentas(!ventas);
  };

  const handleReportesChange = () => {
    setReportes(!reportes);
  };

  const handleRecordatorioChange = () => {
    setRecordatorios(!recordatorios);
  };

  const handleSeguridadChange = () => {
    setSeguridad(!seguridad);
  };

  const handleConfigChange = () => {
    setConfig(!configuracion);
  };

  const handleBoton = () => {
    if (gRol === 1) {
      alert('este rol no se puede editar');
    } else {
      switch (accion) {
        case 1:
          sendData(urlupConsulta, data).finally(alert('actualizado'));
          break;
        case 2:
          sendData(urlupInsert, data).finally(alert('actualizado'));
          break;
        case 3:
          sendData(urlupUpdt, data).finally(alert('actualizado'));
          break;
        case 4:
          sendData(urlupDel, data).finally(alert('actualizado'));
          break;

        default:
          break;
      }
    }
  };

  const IOSSwitch = styled(props => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor:
            theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  return (
    <div className="ContUsuarios">
      <div className="titleAddUser">
        <h2>Configuracion de Roles</h2>
        {/* <h3>
          Complete todos los puntos para poder registrar los datos del empleado
        </h3> */}
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contSelect">
              <TextCustom
                text="Seleccione la accion que desea modificar"
                className="titleInput"
              />
            </div>
            <div className="contSelect">
              <select
                name=""
                id="accion"
                onClick={() =>
                  setAccion(parseInt(document.getElementById('accion').value))
                }
              >
                <option value={1}>Consultar</option>
                <option value={2}>Insertar</option>
                <option value={3}>Actualizar</option>
                <option value={4}>Eliminar</option>
              </select>
            </div>
            <div className="contSelect">
              <TextCustom
                text="Seleccione el Rol que desea editar: "
                className="titleInput"
              />
              <select
                id="rol"
                className="selectCustom"
                onChange={e => {
                  setGRol(parseInt(document.getElementById('rol').value));
                }}
              >
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
            </div>

            <div className="contButton">
              <Button
                onClick={() =>
                  setGRol(parseInt(document.getElementById('rol').value))
                }
              >
                Editar
              </Button>
            </div>

            <div className="contSelect">
              <TextCustom text="Modulo de Usuarios" className="titleInput" />
            </div>

            <div className="contSwitch">
              <IOSSwitch
                id="usuario"
                checked={usuario}
                onChange={handleUsuarioChange}
              ></IOSSwitch>
              <label htmlFor=""></label>
            </div>

            <div className="contSelect">
              <TextCustom text="Modulo de Ventas: " className="titleInput" />
            </div>

            <div className="contSwitch">
              <IOSSwitch
                id="ventas"
                checked={ventas}
                onChange={handleVentasChange}
              ></IOSSwitch>
              <label htmlFor=""></label>
            </div>

            <div className="contSelect">
              <TextCustom text="Modulo de Inventario" className="titleInput" />
            </div>

            <div className="contSwitch">
              <IOSSwitch
                id="inventario"
                checked={inventario}
                onChange={handleInventarioChange}
              ></IOSSwitch>
              <label htmlFor=""></label>
            </div>

            <div className="contSelect">
              <TextCustom text="Modulo de Clientes" className="titleInput" />
            </div>

            <div className="contSwitch">
              <IOSSwitch
                id="clientes"
                checked={clientes}
                onChange={handleClientesChange}
              ></IOSSwitch>
              <label htmlFor=""></label>
            </div>

            <div className="contSelect">
              <TextCustom
                text="Modulo de Recordatorios"
                className="titleInput"
              />
            </div>

            <div className="contSwitch">
              <IOSSwitch
                id="recordatorio"
                checked={recordatorios}
                onChange={handleRecordatorioChange}
              ></IOSSwitch>
              <label htmlFor=""></label>
            </div>

            <div className="contSelect">
              <TextCustom text="Modulo de Reportes" className="titleInput" />
            </div>

            <div className="contSwitch">
              <IOSSwitch
                id="reportes"
                checked={reportes}
                onChange={handleReportesChange}
              ></IOSSwitch>
              <label htmlFor=""></label>
            </div>

            <div className="contSelect">
              <TextCustom text="Modulo de Seguridad" className="titleInput" />
            </div>

            <div className="contSwitch">
              <IOSSwitch
                id="seguridad"
                checked={seguridad}
                onChange={handleSeguridadChange}
              ></IOSSwitch>
              <label htmlFor=""></label>
            </div>

            <div className="contSelect">
              <TextCustom
                text="Modulo de Configuracion"
                className="titleInput"
              />
            </div>

            <div className="contSwitch">
              <IOSSwitch
                id="configuracion"
                checked={configuracion}
                onChange={handleConfigChange}
              ></IOSSwitch>
              <label htmlFor=""></label>
            </div>
          </div>
        </div>
      </div>
      <div className="contBtnStepper">
        <Button
          variant="contained"
          className="btnStepper"
          onClick={handleBoton}
        >
          <h1>{'Finish' ? 'Continue' : 'Finish'}</h1>
        </Button>
      </div>
      <br />
      <br />
    </div>
  );
};
