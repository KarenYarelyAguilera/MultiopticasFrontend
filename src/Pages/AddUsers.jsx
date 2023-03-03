import { useState, useEffect } from 'react';
import { FilledInput } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRef } from 'react';
import { TextCustom } from '../Components/TextCustom.jsx';
import Button from '@mui/material/Button';
import { sendData } from '../scripts/sendData';
import swal from '@sweetalert/with-react';

import AddUser from '../IMG/AddUser.jpg';

export const AddUsers = () => {
  const refContrasenia = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const urlEmployees =
    'http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=Employees';
  const urlCargos =
    'http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=cargos';
  const urlInsert =
    'http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=insertUsuario';

  const [Empleado, setIdEmpleado] = useState([]);
  const [Cargo, setCargo] = useState([]);

  useEffect(() => {
    fetch(urlEmployees)
      .then(response => response.json())
      .then(data => setIdEmpleado(data));
    fetch(urlCargos)
      .then(response => response.json())
      .then(data => setCargo(data));
  }, []);

  const insertar = async () => {
    let id = document.getElementById('empleado').value;
    let usuario =
      document.getElementById('empleado').options[
        document.getElementById('empleado').selectedIndex
      ].text;
    let user = String(usuario);
    let nombre = document.getElementById('usuario').value;
    let correo = document.getElementById('correo').value;
    let rol = document.getElementById('cargo').value;

    let data = {
      id: id,
      usuario: user,
      nombre: nombre,
      clave: refContrasenia.current.value,
      correo: correo,
      rol: rol,
    };
    if (await sendData(urlInsert, data)) {
      swal('Usuario creado exitosamente.', '', 'success');
    }
  };

  return (
    <div className="ContUsuarios">
      <div className="titleAddUser">
        <h2>Registro de Usuario</h2>
        <h3>Complete todos los puntos para poder registrar el usuario</h3>
      </div>

      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Empleado" className="titleInput" />
              <select id="empleado" className="selectCustom">
                {Empleado.length ? (
                  Empleado.map(pre => (
                    <option key={pre.IdEmpleado} value={pre.IdEmpleado}>
                      {pre.Nombre}
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
              <TextCustom text="Nombre de Usuario" className="titleInput" />
              <input
                type="text"
                id="usuario"
                name=""
                className="inputCustom"
                placeholder="Usuario"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Contraseña" className="titleInput" />
              <FilledInput
                id="filled-adornment-password"
                placeholder='Contraseña'
                className="inputCustomPass"
                type={showPassword ? 'text' : 'password'}
                inputRef={refContrasenia}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              ></FilledInput>
            </div>

            <div className="contInput">
              <TextCustom text="Correo Electronico" className="titleInput" />
              <input
                type="text"
                name=""
                id="correo"
                className="inputCustom"
                placeholder="Correo Electronico"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Rol" className="titleInput" />
              <select id="cargo" className="selectCustom">
                {Cargo.length ? (
                  Cargo.map(pre => (
                    <option key={pre.IdCargo} value={pre.IdCargo}>
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

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={insertar}
              >
                <h1>{'Finish' ? 'Crear Usuario' : 'Finish'}</h1>
              </Button>
            </div>
          </div>
        </div>
        
        <img src={AddUser} alt="" />
      </div>
    </div>
  );
};
