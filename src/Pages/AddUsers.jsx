import { useState, useEffect, useRef } from 'react';

//MuiMaterial
import { FilledInput } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Components
import { TextCustom } from '../Components/TextCustom.jsx';

//Scripts
import { sendData } from '../scripts/sendData';
import swal from '@sweetalert/with-react';

//Images
import AddUser from '../IMG/AddUser.jpg';
import { useNavigate } from 'react-router';

export const AddUsers = () => {
  const refContrasenia = useRef(null);
  const navegate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const urlEmployees =
    'http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=Employees';
  const urlRoles =
    'http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=roles';
  const urlInsert =
    'http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=insertUsuario';

  const [Empleado, setIdEmpleado] = useState([]);
  const [Rol, setRol] = useState([]);

  useEffect(() => {
    fetch(urlEmployees)
      .then(response => response.json())
      .then(data => setIdEmpleado(data));
    fetch(urlRoles)
      .then(response => response.json())
      .then(data => setRol(data));
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

  const handleBack = () => {
    navegate('/usuarios');
  }

  return (
    <div className="ContUsuarios">
                  <Button
      className='btnBack'
      onClick={handleBack}>
    	  <ArrowBackIcon className='iconBack'/>
      </Button>
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
                {Rol.length ? (
                  Rol.map(pre => (
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
