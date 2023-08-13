import { useEffect, useState } from 'react';
import { TextCustom } from '../../Components/TextCustom';
import { Button, Switch, styled } from '@mui/material';
import { parse } from '@fortawesome/fontawesome-svg-core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

import { sendData } from '../../scripts/sendData';
import swal from '@sweetalert/with-react';
import { useNavigate } from 'react-router';
import axios from 'axios';

export const ConfigRol = props => {
  const urlRoles =
    'http://localhost:3000/api/Rol';

  const urlURol =
    'http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=updRol';
  const urlNRol =
    'http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=nRol';

  const urlupConsulta =
    'http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=permisosconsultar';
  const urlupInsert =
    'http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=permisosinsert';
  const urlupUpdt =
    'http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=permisosupdt';
  const urlupDel =
    'http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=permisosdel';
   

  const [roles, setRoles] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [accion, setAccion] = useState(1);

  //Leer
  const [usuarioLeer, setUsuarioLeer] = useState(true);
  const [inventarioLeer, setInventarioLeer] = useState(false);
  const [clientesLeer, setClientesLeer] = useState(false);
  const [ventasLeer, setVentasLeer] = useState(false);
  const [recordatoriosLeer, setRecordatoriosLeer] = useState(false);
  const [seguridadLeer, setSeguridadLeer] = useState(false);
  const [configuracionLeer, setConfigLeer] = useState(false);

  //Insertar
  const [usuarioInsertar, setUsuarioInsertar] = useState(false);
  const [inventarioInsertar, setInventarioInsertar] = useState(false);
  const [clientesInsertar, setClientesInsertar] = useState(false);
  const [ventasInsertar, setVentasInsertar] = useState(false);
  const [recordatoriosInsertar, setRecordatoriosInsertar] = useState(false);
  const [seguridadInsertar, setSeguridadInsertar] = useState(false);
  const [configuracionInsertar, setConfigInsertar] = useState(false);

  //Editar
  const [usuarioEditar, setUsuarioEditar] = useState(false);
  const [inventarioEditar, setInventarioEditar] = useState(false);
  const [clientesEditar, setClientesEditar] = useState(false);
  const [ventasEditar, setVentasEditar] = useState(false);
  const [recordatoriosEditar, setRecordatoriosEditar] = useState(false);
  const [seguridadEditar, setSeguridadEditar] = useState(false);
  const [configuracionEditar, setConfigEditar] = useState(false);

  //Eliminar
  const [usuarioEliminar, setUsuarioEliminar] = useState(false);
  const [inventarioEliminar, setInventarioEliminar] = useState(false);
  const [clientesEliminar, setClientesEliminar] = useState(false);
  const [ventasEliminar, setVentasEliminar] = useState(false);
  const [recordatoriosEliminar, setRecordatoriosEliminar] = useState(false);
  const [seguridadEliminar, setSeguridadEliminar] = useState(false);
  const [configuracionEliminar, setConfigEliminar] = useState(false);

  //Modulo Configuracion
  const [gRol, setGRol] = useState(1);
  const [cont, setCont] = useState(0);
  const navegate = useNavigate();

  
  const dataLeer = {
    idrol: gRol,
    usuario: usuarioLeer? 's' : 'n',
    ventas: ventasLeer ? 's' : 'n',
    inventario: inventarioLeer ? 's' : 'n',
    clientes: clientesLeer ? 's' : 'n',
    recordatorios: recordatoriosLeer ? 's' : 'n',
    seguridad: seguridadLeer ? 's' : 'n',
    config: configuracionLeer ? 's' : 'n',
  };
  const dataInsertar = {
    idrol: gRol,
    usuario: usuarioInsertar ? 's' : 'n',
    ventas: ventasInsertar ? 's' : 'n',
    inventario: inventarioInsertar ? 's' : 'n',
    clientes: clientesInsertar ? 's' : 'n',
    recordatorios: recordatoriosInsertar ? 's' : 'n',
    seguridad: seguridadInsertar ? 's' : 'n',
    config: configuracionInsertar ? 's' : 'n',
  };
  const dataEditar = {
    idrol: gRol,
    usuario: usuarioEditar ? 's' : 'n',
    ventas: ventasEditar ? 's' : 'n',
    inventario: inventarioEditar ? 's' : 'n',
    clientes: clientesEditar ? 's' : 'n',
    recordatorios: recordatoriosEditar ? 's' : 'n',
    seguridad: seguridadEditar ? 's' : 'n',
    config: configuracionEditar ? 's' : 'n',
  };
  const dataEliminar = {
    idrol: gRol,
    usuario: usuarioEliminar ? 's' : 'n',
    ventas: ventasEliminar ? 's' : 'n',
    inventario: inventarioEliminar ? 's' : 'n',
    clientes: clientesEliminar ? 's' : 'n',
    recordatorios: recordatoriosEliminar ? 's' : 'n',
    seguridad: seguridadEliminar ? 's' : 'n',
    config: configuracionEliminar ? 's' : 'n',
  };

  

  const handleEditar = () => {
    swal(
    <div className="logoModal">¿Desea editar este rol?</div>,
     {
      buttons: {
        defeat: 'ACEPTAR',
        cancel: 'CANCELAR',
      },
    }).then(resp => {
      switch (resp) {
        case 'defeat':
          if (document.getElementById('rol').value === '1') {
            swal('Este Rol no se puede actualizar.', '', 'error');
          } else {
            swal(
              <div>
                <div className='logoModal'>Datos de Rol</div>
                <div className='contEditModal'>
                  <div className="contInput">
                    <TextCustom text="Rol " className="titleInput" />
                    <input type="text" id="Rol" className='inputCustom' />
                  </div>

                  <div className="contInput">
                    <TextCustom text="Descripcion " className="titleInput" />
                    <textarea id="desc" className='textAreaCustom'/>
                  </div>
                </div>
              </div>,
            ).then(() => {
              var today = new Date();
              let autor = document.getElementById('rol').value;

              var fecha =
                today.getFullYear() +
                '-' +
                (today.getMonth() + 1) +
                '-' +
                today.getDate();
              let data = {
                rol: document.getElementById('Rol').value,
                descripcion: document.getElementById('desc').value,
                id: autor,
                autor: props.usuario,
                fecha: fecha,
              };

              if (sendData(urlURol, data)) {
                swal('Rol actualizado exitosamente', '', 'success');
                setCont(cont + 1);
              }
            });
          }
          break;
      }
    });
  };

  const handleNuevoRol = () => {
    swal(
    <div className='logoModal'>Crear un nuevo rol</div>, {
      buttons: {
        defeat: 'ACEPTAR',
        cancel: 'CANCELAR',
      },
    }).then(resp => {
      switch (resp) {
        case 'defeat':
          swal(
            <div>
              <div className='logoModal'>Datos de Rol</div>
              <div className='contEditModal'>
                <div className="contInput">
                  <TextCustom text="Rol" className="titleInput" />
                  <input type="text" id="Rol" className='inputCustom' />
                </div>

                <div className="contInput">
                  <TextCustom text="Descripcion" className="titleInput" />
                  <textarea id="desc" className='textAreaCustom'/>
                </div>
              </div>
            </div>,
          ).then(() => {
            var today = new Date();
            let autor = document.getElementById('rol').value;

            var fecha =
              today.getFullYear() +
              '-' +
              (today.getMonth() + 1) +
              '-' +
              today.getDate();
            let data = {
              rol: document.getElementById('Rol').value,
              descripcion: document.getElementById('desc').value,
              id: autor,
              autor: props.usuario,
              fecha: fecha,
            };

            if (sendData(urlNRol, data)) {
              swal('Rol creado exitosamente', '', 'success');
              setCont(cont + 1);
            }
          });
          break;
      }
    });
  };

  useEffect(() => {
    fetch(urlRoles)
      .then(response => response.json())
      .then(data => setRoles(data));

    axios.post(urlPermisos,{idRol:gRol}).then((response)=>{
      //Leer
    setRecordatoriosLeer(response.data[3].PermConsul==="s"?true:false);
    setClientesLeer(response.data[2].PermConsul==="s"?true:false);
    setConfigLeer(response.data[6].PermConsul==="s"?true:false);
    setUsuarioLeer(response.data[0].PermConsul==="s"?true:false);
    setInventarioLeer(response.data[1].PermConsul==="s"?true:false);
    setVentasLeer(response.data[7].PermConsul==="s"?true:false);
    setSeguridadLeer(response.data[5].PermConsul==="s"?true:false);


    //Editar
    setRecordatoriosEditar(response.data[3].PermUpd==="s"?true:false);
    setClientesEditar(response.data[2].PermUpd==="s"?true:false);
    setConfigEditar(response.data[6].PermUpd==="s"?true:false);
    setUsuarioEditar(response.data[0].PermUpd==="s"?true:false);
    setInventarioEditar(response.data[1].PermUpd==="s"?true:false);
    setVentasEditar(response.data[7].PermUpd==="s"?true:false);
    setSeguridadEditar(response.data[5].PermUpd==="s"?true:false);

    //Insertar
    setRecordatoriosInsertar(response.data[3].PermI==="s"?true:false);
    setClientesInsertar(response.data[2].PermI==="s"?true:false);
    setConfigInsertar(response.data[6].PermI==="s"?true:false);
    setUsuarioInsertar(response.data[0].PermI==="s"?true:false);
    setInventarioInsertar(response.data[1].PermI==="s"?true:false);
    setVentasInsertar(response.data[7].PermI==="s"?true:false);
    setSeguridadInsertar(response.data[5].PermI==="s"?true:false);

    //Eliminar
    setRecordatoriosEliminar(response.data[3].PermDel==="s"?true:false);
    setClientesEliminar(response.data[2].PermDel==="s"?true:false);
    setConfigEliminar(response.data[6].PermDel==="s"?true:false);
    setUsuarioEliminar(response.data[0].PermDel==="s"?true:false);
    setInventarioEliminar(response.data[1].PermDel==="s"?true:false);
    setVentasEliminar(response.data[7].PermDel==="s"?true:false);
    setSeguridadEliminar(response.data[5].PermDel==="s"?true:false);
    })

    
  }, [accion, cont]);

  //Leer
  const handleUsuarioChange = () => {
    setUsuarioLeer(!usuarioLeer);
  };
  const handleInventarioChange = () => {
    setInventarioLeer(!inventarioLeer);
  };
  const handleClientesChange = () => {
    setClientesLeer(!clientesLeer);
  };
  const handleVentasChange = () => {
    setVentasLeer(!ventasLeer);
  };


  const handleRecordatorioChange = () => {
    setRecordatoriosLeer(!recordatoriosLeer);
  };

  const handleSeguridadChange = () => {
    setSeguridadLeer(!seguridadLeer);
  };

  const handleConfigChange = () => {
    setConfigLeer(!configuracionLeer);
  };

  //Insertar
  const handleUsuarioInsertarChange = () => {
    setUsuarioInsertar(!usuarioInsertar);
  };
  const handleInventarioInsertarChange = () => {
    setInventarioInsertar(!inventarioInsertar);
  };
  const handleClientesInsertarChange = () => {
    setClientesInsertar(!clientesInsertar);
  };
  const handleVentasInsertarChange = () => {
    setVentasInsertar(!ventasInsertar);
  };

  const handleRecordatorioInsertarChange = () => {
    setRecordatoriosInsertar(!recordatoriosInsertar);
  };

  const handleSeguridadInsertarChange = () => {
    setSeguridadInsertar(!seguridadInsertar);
  };

  const handleConfigInsertarChange = () => {
    setConfigInsertar(!configuracionInsertar);
  };

  //Editar
  const handleUsuarioEditarChange = () => {
    setUsuarioEditar(!usuarioEditar);
  };
  const handleInventarioEditarChange = () => {
    setInventarioEditar(!inventarioEditar);
  };
  const handleClientesEditarChange = () => {
    setClientesEditar(!clientesEditar);
  };
  const handleVentasEditarChange = () => {
    setVentasEditar(!ventasEditar);
  };


  const handleRecordatorioEditarChange = () => {
    setRecordatoriosEditar(!recordatoriosEditar);
  };

  const handleSeguridadEditarChange = () => {
    setSeguridadEditar(!seguridadEditar);
  };

  const handleConfigEditarChange = () => {
    setConfigEditar(!configuracionEditar);
  };

  //Eliminar
  const handleUsuarioEliminarChange = () => {
    setUsuarioEliminar(!usuarioEliminar);
  };
  const handleInventarioEliminarChange = () => {
    setInventarioEliminar(!inventarioEliminar);
  };
  const handleClientesEliminarChange = () => {
    setClientesEliminar(!clientesEliminar);
  };
  const handleVentasEliminarChange = () => {
    setVentasEliminar(!ventasEliminar);
  };

  const handleRecordatorioEliminarChange = () => {
    setRecordatoriosEliminar(!recordatoriosEliminar);
  };

  const handleSeguridadEliminarChange = () => {
    setSeguridadEliminar(!seguridadEliminar);
  };

  const handleConfigEliminarChange = () => {
    setConfigEliminar(!configuracionEliminar);
  };

  const handleBoton = () => {
    if (gRol === 1) {
      alert('este rol no se puede editar');
    } else {
      // switch (accion) {
      //   case 1:
      //     sendData(urlupConsulta, data).finally(alert('actualizado'));
      //     break;
      //   case 2:
      //     sendData(urlupInsert, data).finally(alert('actualizado'));
      //     break;
      //   case 3:
      //     sendData(urlupUpdt, data).finally(alert('actualizado'));
      //     break;
      //   case 4:
      //     sendData(urlupDel, data).finally(alert('actualizado'));
      //     break;

      //   default:
      //     break;
      // }
      console.log("Leer");
      console.log(dataLeer);
      console.log("Insert");
      console.log(dataInsertar);
      console.log("Upd");
      console.log(dataEditar);
      console.log("Del");
      console.log(dataEliminar);
    }
  };

  const handleBack = () => {
    navegate('/config/roles');
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
    <div className="ContConfigRol">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleRol">
        <h2>Seguridad de Roles</h2>
      </div>
      <div className="infoConfigRol">
        <div className="PanelConfigRol">
          <div className="contSelectRol">
            <div className="sectionRol">
              <TextCustom text="Seleccione el Rol " className="titleInput" />
              <select
                id="rol"
                className="selectCustom"
                onChange={e => {
                  setGRol(parseInt(document.getElementById('rol').value));
                  setCont(cont+1)
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
                className="btnEditRol"
                onClick={() => {
                  setGRol(parseInt(document.getElementById('rol').value));
                  handleEditar();
                }}
              >
                <EditIcon style={{ marginRight: '5px' }} />
                Editar
              </Button>
              <Button className="btnNewRol" onClick={handleNuevoRol}>
                <AddIcon style={{ marginRight: '5px' }} />
                Nuevo
              </Button>

              <Button className="btnSaveRol" onClick={handleBoton}>
                <SaveIcon style={{ marginRight: '5px' }} />
                Guardar
              </Button>
            </div>
          </div>
          <div className="titlePrincipal">
            <TextCustom text="Modulos" />

            <div className="inputCheck">
              <input
                type="checkbox"
                id="accion"
                onClick={(e) =>console.log(e)}
                // disabled={usuarioLeer || !usuarioLeer}
              />

              <TextCustom text="Leer" />
            </div>

            <div className="inputCheck">
              <TextCustom text="Insertar" />
            </div>

            <div className="inputCheck">
              <TextCustom text="Editar" />
            </div>

            <div className="inputCheck">
              <TextCustom text="Eliminar" />
            </div>

            <div className="inputCheck">
              <TextCustom text="Acción" />
            </div>
          </div>
          <div className="InputConfig">
            {/* <div className="contSelect">
              <TextCustom
                text="Seleccione la accion que desea modificar"
                className="titleInput"
              />
            </div> */}
            {/* <div className="contSelect">
              <select
                name=""
                // id="accion"
                // onClick={() =>
                //   setAccion(parseInt(document.getElementById('accion').value))
                // }
              >
                <option value={1}>Consultar</option>
                <option value={2}>Insertar</option>
                <option value={3}>Actualizar</option>
                <option value={4}>Eliminar</option>
              </select>
            </div> */}

            <div className="conTitleRoles">
              <TextCustom text="Usuarios" className="titleInput" />
              <TextCustom text="Ventas " className="titleInput" />
              <TextCustom text="Inventario" className="titleInput" />
              <TextCustom text="Clientes" className="titleInput" />
              <TextCustom text="Recordatorios" className="titleInput" />
              <TextCustom text="Seguridad" className="titleInput" />
              <TextCustom text="Configuracion" className="titleInput" />
            </div>

            <div className="contSelect">
              <div className="contSwitchControl">
                <IOSSwitch
                  id='usuarioLeer'
                  checked={usuarioLeer}
                  onChange={handleUsuarioChange}
                  value={1}
                  
                ></IOSSwitch>
                <IOSSwitch
                  checked={ventasLeer}
                  onChange={handleVentasChange}
                  id="accion"
                  onClick={(e) => console.log(e.target.value)}
                  value={"n"}
                ></IOSSwitch>

                <IOSSwitch
                  checked={inventarioLeer}
                  onChange={handleInventarioChange}
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={1}
                ></IOSSwitch>

                <IOSSwitch
                  checked={clientesLeer}
                  onChange={handleClientesChange}
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={1}
                ></IOSSwitch>

                <IOSSwitch
                  checked={recordatoriosLeer}
                  onChange={handleRecordatorioChange}
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={1}
                ></IOSSwitch>

                <IOSSwitch
                  checked={seguridadLeer}
                  onChange={handleSeguridadChange}
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={1}
                ></IOSSwitch>

                <IOSSwitch
                  checked={configuracionLeer}
                  onChange={handleConfigChange}
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={1}
                ></IOSSwitch>
              </div>

              <div className="contSwitchControl">
                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={2}
                  checked={usuarioInsertar}
                  onChange={handleUsuarioInsertarChange}
                ></IOSSwitch>
                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={2}
                  checked={ventasInsertar}
                  onChange={handleVentasInsertarChange}
                ></IOSSwitch>

                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={2}
                  checked={inventarioInsertar}
                  onChange={handleInventarioInsertarChange}
                ></IOSSwitch>

                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={2}
                  checked={clientesInsertar}
                  onChange={handleClientesInsertarChange}
                ></IOSSwitch>

                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={2}
                  checked={recordatoriosInsertar}
                  onChange={handleRecordatorioInsertarChange}
                ></IOSSwitch>


                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={2}
                  checked={seguridadInsertar}
                  onChange={handleSeguridadInsertarChange}
                ></IOSSwitch>

                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={2}
                  checked={configuracionInsertar}
                  onChange={handleConfigInsertarChange}
                ></IOSSwitch>
              </div>

              <div className="contSwitchControl">
                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={3}
                  checked={usuarioEditar}
                  onChange={handleUsuarioEditarChange}
                ></IOSSwitch>
                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={3}
                  checked={ventasEditar}
                  onChange={handleVentasEditarChange}
                ></IOSSwitch>

                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={3}
                  checked={inventarioEditar}
                  onChange={handleInventarioEditarChange}
                ></IOSSwitch>

                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={3}
                  checked={clientesEditar}
                  onChange={handleClientesEditarChange}
                ></IOSSwitch>

                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={3}
                  checked={recordatoriosEditar}
                  onChange={handleRecordatorioEditarChange}
                ></IOSSwitch>


                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={3}
                  checked={seguridadEditar}
                  onChange={handleSeguridadEditarChange}
                ></IOSSwitch>

                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={3}
                  checked={configuracionEditar}
                  onChange={handleConfigEditarChange}
                ></IOSSwitch>
              </div>

              <div className="contSwitchControl">
                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={4}
                  checked={usuarioEliminar}
                  onChange={handleUsuarioEliminarChange}
                ></IOSSwitch>
                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={4}
                  checked={ventasEliminar}
                  onChange={handleVentasEliminarChange}
                ></IOSSwitch>

                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={4}
                  checked={inventarioEliminar}
                  onChange={handleInventarioEliminarChange}
                ></IOSSwitch>

                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={4}
                  checked={clientesEliminar}
                  onChange={handleClientesEliminarChange}
                ></IOSSwitch>

                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={4}
                  checked={recordatoriosEliminar}
                  onChange={handleRecordatorioEliminarChange}
                ></IOSSwitch>


                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={4}
                  checked={seguridadEliminar}
                  onChange={handleSeguridadEliminarChange}
                ></IOSSwitch>

                <IOSSwitch
                  id="accion"
                  onClick={() =>
                    setAccion(parseInt(document.getElementById('accion').value))
                  }
                  value={4}
                  checked={configuracionEliminar}
                  onChange={handleConfigEliminarChange}
                ></IOSSwitch>
              </div>
              <div className="contSwitchControl">
              <Button className="openModal" onClick={handleNuevoRol}>
                <AddIcon style={{color:"white"}}/>
              </Button>

              <Button className="openModal" onClick={handleNuevoRol}>
                <AddIcon style={{color:"white"}}/>
              </Button>

              <Button className="openModal" onClick={handleNuevoRol}>
                <AddIcon style={{color:"white"}}/>
              </Button>

              <Button className="openModal" onClick={handleNuevoRol}>
                <AddIcon style={{color:"white"}}/>
              </Button>

              <Button className="openModal" onClick={handleNuevoRol}>
                <AddIcon style={{color:"white"}}/>
              </Button>

              <Button className="openModal" onClick={handleNuevoRol}>
                <AddIcon style={{color:"white"}}/>
              </Button>

              <Button className="openModal" onClick={handleNuevoRol}>
                <AddIcon style={{color:"white"}}/>
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};
