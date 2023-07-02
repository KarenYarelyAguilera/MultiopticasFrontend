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
import { TextCustom } from '../../Components/TextCustom.jsx';

//Scripts
import { sendData } from '../../scripts/sendData';
import swal from '@sweetalert/with-react';

//Images
import AddUser from '../../IMG/AddUser.jpg';
import { useNavigate } from 'react-router';
import axios from 'axios';

export const AddUsers = (props) => {

  const [Nombreusuario, setNombreusuario] = useState(props.data.Nombre || '');
  const [errorNombreusuario, setErrorNombreusuario] = useState(false);
  const [mensaje, setMensaje] = useState(false);

  const [contra, setContra] = useState("");
  const [msj, setMsj] = useState("");
  const [errorContra, setErrorContra] = useState(false);

  const [correo, setCorreo] = useState("");
  const [texto, setTexto] = useState("");
  const [errorCorreo, setErrorCorreo] = useState(false);

  const refContrasenia = useRef(null);
  const navegate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`Nuevo valor de ${name}: ${value}`);
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  // const urlBitacoraUsuario =
  //   'http://localhost/APIS-Multioptica/bitacora/controller/bitacora.php?op=UsuarioInsert';
  const urlEmployees =
    'http://localhost:3000/api/empleado';
  const urlRoles =
    'http://localhost:3000/api/Rol';
  const urlInsert =
    'http://localhost:3000/api/usuario/insert';
  const urlUpdateUser =
    'http://localhost:3000/api/usuario/update';

  const [Empleado, setIdEmpleado] = useState([]);
  const [Rol, setRol] = useState([]);

  useEffect(() => {
    axios.get(urlEmployees).then(response => setIdEmpleado(response.data))
    axios.get(urlRoles).then(response => setRol(response.data))
  }, []);

  useEffect(() => {
    if (props.data.Nombre_Usuario) {
      setNombreusuario(props.data.Nombre_Usuario);
    }
    if (props.data.Correo_Electronico) {
      setCorreo(props.data.Correo_Electronico);
    }
  }, [props.data.Nombre,props.data.Correo_Electronico]);


  const actualizar = async () => {
    let usuario =
      document.getElementById('empleado').options[
        document.getElementById('empleado').selectedIndex
      ].text;

    let user = String(usuario);
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let rol = parseInt(document.getElementById('cargo').value);

    let data = {
      idUsuario: props.data.id_Usuario,
      usuario: user.toLocaleUpperCase(),
      nombreUsuario: nombre,
      clave: refContrasenia.current.value,
      estadoUsuario: document.getElementById("estado").value,
      correo: correo,
      idRol: rol,
    };
  
    let dataB = {
      Id: props.idU
    }
    if (await axios.put(urlUpdateUser, data)) {
      console.log(data);
      swal(<h1>Usuario Actualizado Correctamente</h1>).then(()=>{props.limpiarData({});props.limpiarUpdate(false)});
      navegate('/usuarios/lista')
    }
  };

  const insertar = async () => {
    let id = document.getElementById('empleado').value;
    let usuario =
      document.getElementById('empleado').options[
        document.getElementById('empleado').selectedIndex
      ].text;

    let user = String(usuario);
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let rol = document.getElementById('cargo').value;

    let data = {
      id: id,
      usuario: user.toLocaleUpperCase(),
      nombre: nombre,
      clave: refContrasenia.current.value,
      correo: correo,
      rol: rol,
    };
    let dataB = {
      Id: props.idU
    }

    if (await axios.post(urlInsert, data)) {
      swal('Usuario creado exitosamente.', '', 'success');
      //sendData(urlBitacoraUsuario,dataB)
    }
  };

  const handleBack = () => {
    props.limpiarData({})
    props.limpiarUpdate(false)
    navegate('/usuarios');
  }

  return (
    <div className="ContUsuarios">
      <Button
        className='btnBack'
        onClick={handleBack}>
        <ArrowBackIcon className='iconBack' />
      </Button>
      <div className="titleAddUser">
        {props.update ? <h2>Actualizacion de Usuario</h2> : <h2>Registro de Usuario</h2>}
        
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
                    <option key={pre.numeroIdentidad} value={pre.numeroIdentidad}>
                      {pre.numeroIdentidad}
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
                onChange={e=>setNombreusuario(e.target.value)}
                error={errorNombreusuario}
                type="text"
                helperText={mensaje}
                name="input1"
                className="inputCustom"
                maxLength={15}
                placeholder="Nombre"
                variant="standard"
                id="nombre"
                value={Nombreusuario}
                label="Usuario"
              />
              <p className='error'>{mensaje}</p>
            </div>


            <div className="contInput">
              <TextCustom text="Contraseña" className="titleInput" />
              <FilledInput

                onKeyDown={(e) => {
                  setContra(e.target.value);
                  if (contra === "") {
                    setErrorContra(true);
                    setMsj("Los campos no deben estar vacios");
                  }
                  else {
                    setErrorContra(false)
                    var regularExpression = /^[a-zA-Z0-9!@#$%^&*]$/;
                    if (!regularExpression.test(contra)) {
                      setErrorContra(true)
                      setMsj("");
                    }
                    else {
                      setMsj("La contraseña debe de tener letras, numeros y caracteres especiales");
                      setErrorContra(false);
                    }
                  }
                }}

                id="filled-adornment-password"
                placeholder='Contraseña'
                className="inputCustomPass"
                type={showPassword ? 'text' : 'password'}
                inputProps={{ maxLength: 20 }}
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
              <TextCustom text="Confirme Contraseña" className="titleInput" />
              <FilledInput

                onKeyDown={(e) => {
                  setContra(e.target.value);
                  if (contra === "") {
                    setErrorContra(true);
                    setMsj("Los campos no deben estar vacios");
                  }
                  else {
                    setErrorContra(false)
                    var regularExpression = /^[a-zA-Z0-9!@#$%^&*]$/;
                    if (!regularExpression.test(contra)) {
                      setErrorContra(true)
                      setMsj("");
                    }
                    else {
                      setMsj("La contraseña debe de tener letras, numeros y caracteres especiales");
                      setErrorContra(false);
                    }
                  }
                }}

                id="filled-adornment-password"
                placeholder='Contraseña'
                className="inputCustomPass"
                type={showPassword ? 'text' : 'password'}
                inputProps={{ maxLength: 20 }}
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
              
              {props.update ? <input
                onChange={(e) => {
                  setCorreo(e.target.value)
                  var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!expresion.test(correo)) {
                    setErrorCorreo(true)
                    setTexto("Formato invalido");
                  }
                  else {
                    setErrorCorreo(false);
                    setTexto("");
                  }
                }}
                type="text"
                name="input2"
                id="correo"
                className="inputCustom"
                placeholder="Correo Electronico"
                error={errorCorreo}
                helperText={texto}
                value={correo}
                maxLength={30}
                disabled

              /> : <input
              onChange={(e) => {
                setCorreo(e.target.value)
                var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!expresion.test(correo)) {
                  setErrorCorreo(true)
                  setTexto("Formato invalido");
                }
                else {
                  setErrorCorreo(false);
                  setTexto("");
                }
              }}
              type="text"
              name="input2"
              id="correo"
              className="inputCustom"
              placeholder="Correo Electronico"
              error={errorCorreo}
              helperText={texto}
              value={correo}
              maxLength={30}
              

            /> }
              
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

            {props.update ?  <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select id="estado" className="selectCustom">
                <option value={"Activo"}>Activo</option>
                <option value={"Inactivo"}>Inactivo</option>
              </select>
            </div> : '' }

            <div className="contBtnStepper">
              {props.update ? <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {

                  if (document.getElementById("nombre").value == "" || document.getElementById("filled-adornment-password").value == "" || document.getElementById("correo").value == "") {
                    swal("No deje campos vacios.", "", "error")
                  }
                  else if (typeof (document.getElementById("nombre").value) !== 'string') {
                    swal("El campo nombre solo acepta letras", "", "error")
                  }
                  else if (typeof (document.getElementById("filled-adornment-password").value) !== 'string') {
                    swal("El campo contraseña debe de incluir letras, numeros y caracteres especiales", "", "error")
                  }
                  else if (typeof (document.getElementById("correo").value) !== 'string') {
                    swal("El campo correo debe de incluir un correo", "", "error")
                  }
                  else {
                    actualizar()
                  }
                }}

              >
                <h1>{'Finish' ? 'Actualizar' : 'Finish'}</h1>
              </Button> : <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {

                  if (document.getElementById("nombre").value == "" || document.getElementById("filled-adornment-password").value == "" || document.getElementById("correo").value == "") {
                    swal("No deje campos vacios.", "", "error")
                  }
                  else if (typeof (document.getElementById("nombre").value) !== 'string') {
                    swal("El campo nombre solo acepta letras", "", "error")
                  }
                  else if (typeof (document.getElementById("filled-adornment-password").value) !== 'string') {
                    swal("El campo contraseña debe de incluir letras, numeros y caracteres especiales", "", "error")
                  }
                  else if (typeof (document.getElementById("correo").value) !== 'string') {
                    swal("El campo correo debe de incluir un correo", "", "error")
                  }
                  else {
                    insertar()
                  }
                }}

              >
                <h1>{'Finish' ? 'Crear Usuario' : 'Finish'}</h1>
              </Button>}

            </div>
          </div>
        </div>

        <img src={AddUser} alt="" />
      </div>
    </div>
  );
};