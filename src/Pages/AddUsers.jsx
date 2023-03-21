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

  const [Nombreusuario, setNombreusuario] = useState("");
  const [errorNombreusuario, setErrorNombreusuario] = useState(false);
  const [mensaje, setMensaje] = useState(false);

  const [contra, setContra]= useState("");
    const [msj, setMsj]= useState("");
    const [errorContra, setErrorContra]= useState(false);

    const [correo, setCorreo]= useState("");
    const [texto, setTexto]= useState("");
    const [errorCorreo, setErrorCorreo]= useState(false);

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
      usuario: user.toUpperCase(),
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
              <TextCustom text="Nombre de Usuario"
               className="titleInput" />
              <input
              onKeyDown={(e) => {
                setNombreusuario(e.target.value);
                if (Nombreusuario == "") {
                  setErrorNombreusuario(true);
                  setMensaje("Los campos no deben estar vacios");
                }
                else {
                  setErrorNombreusuario(false)
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(Nombreusuario)) {
                    setErrorNombreusuario(true)
                    setMensaje("Solo debe de ingresar letras")
                  } else {
                    setErrorNombreusuario(false);
                    setMensaje("");
                  }
                }
              }}
              error={errorNombreusuario}
              type="text"
              helperText={mensaje}
              name=""
              className="inputCustom"
              maxLength={15}
              placeholder="Nombre"
              variant="standard"
              id="nombre"
              label="Usuario"
              />
              <p className='error'>{mensaje}</p>
            </div>
           

            <div className="contInput">
              <TextCustom text="Contraseña" className="titleInput" />
              <FilledInput

               onKeyDown= {(e) =>{
                setContra(e.target.value);
                if (contra===""){
                  setErrorContra(true);
                  setMsj("Los campos no deben estar vacios");
                }
                else{
                  setErrorContra(false)
                  var regularExpression  = /^[a-zA-Z0-9!@#$%^&*]$/;
                  if (!regularExpression.test(contra)){
                    setErrorContra(true)
                    setMsj("");
                     }
                     else{
                  setMsj("La contraseña debe de tener letras, numeros y caracteres especiales");
                  setErrorContra(false);
                }
              }
              }}

                id="filled-adornment-password"
                placeholder='Contraseña'
                className="inputCustomPass"
                type={showPassword ? 'text' : 'password'}
                inputProps={{maxLength:20}}
                inputRef={refContrasenia}
                endAdornment={
                 
                  <InputAdornment position="end">
                    <IconButton
                    maxLength={30}
              
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
              <p className='error'>{msj}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Correo Electronico" className="titleInput" />
              <input
                onKeyDown={(e) =>{
                var expresion = /^[a-zA-Z0-9_!#$%&'\*+/=?{|}~^.-]+@+(gmail.co||yahoo.co||outlook.co||hotmail.co)+m+$/; 
                if (!expresion.test(correo)){
                  setErrorCorreo(true)
                  setTexto("Formato invalido");
                   }
                   else{
                    setErrorCorreo(false);
                    setTexto("");
                   }
                }}
                type="text"
                name=""
                id="correo"
                className="inputCustom"
                placeholder="Correo Electronico"
                error={errorCorreo}
                helperText={texto}
                maxLength={30}
              
              />
              <p className='error'>{texto}</p>
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
                onClick={()=>{
                  if(document.getElementById("nombre").value=="" ){
                    swal("No deje campos vacios.","","error")
                 }
                 else if(typeof(document.getElementById("nombre").value) !== 'string')       {
                  swal("El campo nombre solo acepta letras","","error")
                }  
                else{
                 insertar()
                }
                }}
                
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
