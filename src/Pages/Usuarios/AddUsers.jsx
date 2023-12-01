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

import Select from 'react-select'; //select para concatenar el idCiente y el nombre
import { Bitacora } from '../../Components/bitacora.jsx';


export const AddUsers = (props) => {

  const [Nombreusuario, setNombreusuario] = useState(props.data.Nombre || '');
  const [errorNombreusuario, setErrorNombreusuario] = useState(false);
  const [mensaje, setMensaje] = useState(false);

  const [contra1, setContra1] = useState("");
  const [msjs, setMsjs] = useState("");
  const [errorContra1, setErrorContra1] = useState(false);

  const [contra2, setContra2] = useState("");
  const [errorContra2, setErrorContra2] = useState(false);
  const [advertencia, setadvertencia] = useState(false);


  const [correo, setCorreo] = useState(props.data.Correo_Electronico || "");
  const [texto, setTexto] = useState("");
  const [errorCorreo, setErrorCorreo] = useState(false);


  const [textoCorreo, setTextoCorreo] = useState("");



  const refContrasenia = useRef(null);
  const navegate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [optionsEmpleados, setOptionsEmpelados] = useState([]);
  const [selectedOption, setSelectedOption] = useState(props.data.idEmpleado || null); // Estado para la opción seleccionada
  const [rol, setRolSelect] = useState(props.data.Id_Rol || null)


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
    'http://localhost:3000/api/empleados/nousuarios';
  const urlRoles =
    'http://localhost:3000/api/Rol';
  const urlInsert =
    'http://localhost:3000/api/usuario/insert';

  const urlUpdateUser =
    'http://localhost:3000/api/usuario/update';

  //------------URL DE BITACORA-----------------------
  const urlBitacoraInsert = 'http://localhost:3000/api/bitacora/InsertUsuario';

  const urlBitacoraUpdUsuario =
    'http://localhost:3000/api/bitacora/ActualizacionUsuario';

  const urlBitacoraSalirRU =
    'http://localhost:3000/api/bitacora/SalirRegistroUsuario';

  //---------------------------------------------------------



  const [Empleado, setIdEmpleado] = useState([]);
  const [Rol, setRol] = useState([]);

  useEffect(() => {
    //-------------------------------De aqui----------------------------------------------
    console.log(props.data);
    axios.get(urlEmployees).then((response) => {
      const employeeOptions = response.data.map((pre) => ({
        value: pre.IdEmpleado,
        label: `${pre.numeroIdentidad} - ${pre.nombre} ${pre.apellido}`,
      }));
      setOptionsEmpelados(employeeOptions);

      // Ahora, busca la opción correspondiente al props.data.idEmpleado
      const optionToSelect = employeeOptions.find((option) => option.value === props.data.idEmpleado);
      setSelectedOption(optionToSelect);
    })


    //----------------- A aquí es relajo del chatgpt pero funciona :) ------------------
    axios.get(urlRoles).then(response => setRol(response.data))
  }, []);

  useEffect(() => {
    if (props.data.Nombre_Usuario) {
      setNombreusuario(props.data.Nombre_Usuario);
    }
    if (props.data.Correo_Electronico) {
      setCorreo(props.data.Correo_Electronico);
    }
  }, [props.data.Nombre, props.data.Correo_Electronico]);


  const actualizar = async () => {
    let usuario = selectedOption

    let user = String(usuario);
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let rol = parseInt(document.getElementById('cargo').value);

    let data = {
      idUsuario: props.data.id_Usuario,
      usuario: nombre.toUpperCase(),
      clave: refContrasenia.current.value,
      nombreUsuario: nombre.toUpperCase(),
      estadoUsuario: document.getElementById("estado").value,
      correo: correo,
      idRol: rol,
    };

    //Funcion de Update de bitacora Usuario 
    let dataB = {
      Id: props.idU
    }

    if (await axios.put(urlUpdateUser, data)) {
      console.log(data);
      swal(<h1>Usuario Actualizado Correctamente</h1>).then(() => {
        axios.post(urlBitacoraUpdUsuario, dataB) //UPDATE DE BITACORA
        props.limpiarData({});
        props.limpiarUpdate(false)
      });
      navegate('/usuarios/lista')
    }
  };

  const insertar = async () => {


    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let rol = document.getElementById('cargo').value;

    let data = {
      id: selectedOption.value,
      usuario: nombre,
      nombre: nombre,
      clave: refContrasenia.current.value,
      correo: correo,
      rol: rol,
    };

    //Funcion de bitacora 
    let dataB = {
      Id: props.idU
    }
    const bitacora = {
      urlB: urlInsert,
      activo: props.activo,
      dataB: dataB
    }
    console.log(data);

    await axios.post(urlInsert, data).then((res) => {
      Bitacora(bitacora) //Registro de nuevo usuario bitacora   

      if (!res.data) {
        swal('¡No puede crear este usuario, es posible que el correo o usuario ya este en uso!.', '', 'error');
      } else {
        swal('Usuario creado exitosamente.', '', 'success');
        navegate('/usuarios/lista');
      }
    }).catch(() => {
      swal('!Error al crear Usuario! Ingrese sus datos correctamente, puede que alguno de estos ya exista.', '', 'error')
    })



  };

  //Funcion de bitacora 
  let dataB = {
    Id: props.idU
  }

  const handleBack = () => {
    props.limpiarData({})
    props.limpiarUpdate(false)
    axios.post(urlBitacoraSalirRU, dataB) //BOTON DE RETROCESO API BITACORA 
    navegate('/usuarios/lista');
  }

  return (

    <div className="ContUsuarios">
      <Button
        className='btnBack'
        onClick={handleBack}>
        <ArrowBackIcon className='iconBack' />
      </Button>
      <div className="titleAddUser">
        {props.update ? <h2>Actualizar Usuario</h2> : <h2>Registro de Usuario</h2>}


      </div>

      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Empleado" className="titleInput" value={optionsEmpleados} />
              {/*  <select id="empleado" className="selectCustom">
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
              </select> */}
              {props.update ? <>
                <Select isDisabled={true}
                  styles={{
                    control: (base) => ({
                      ...base,
                      width: "300px", // Ajusta el ancho según tus necesidades
                    }),
                  }}
                  id="empleado"
                  options={optionsEmpleados}
                  value={selectedOption}
                  onChange={setSelectedOption}
                  placeholder="Seleccione un empleado"
                /></>
                : <>
                  <Select
                    id="empleado"
                    options={optionsEmpleados}
                    value={selectedOption}
                    onChange={setSelectedOption}
                    placeholder="Seleccione un empleado"
                  />
                </>}



            </div>

            <div className="contInput">
              <TextCustom text="Nombre de usuario"
                className="titleInput" />
              <input
                onKeyDown={(e) => {

                  setNombreusuario(e.target.value);
                  if (Nombreusuario === "") {
                    setErrorNombreusuario(true);
                    setMensaje("Los campos no deben estar vacíos");
                  } else {
                    setErrorNombreusuario(false);
                    var regex = /^[A-Z]+$/;
                    if (!regex.test(Nombreusuario)) {
                      setErrorNombreusuario(true);
                      setMensaje("Solo se deben ingresar letras mayúsculas sin espacios");
                    } else {
                      setErrorNombreusuario(false);
                      setMensaje("");
                    }
                  }
                }}

                onChange={e => setNombreusuario(e.target.value)}
                error={errorNombreusuario}
                type="text"
                helperText={mensaje}
                name="input1"
                className="inputCustom"
                maxLength={15}
                placeholder="Nombre de usuario"
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
                onChange={(e) => {
                  setContra1(e.target.value);
                  if (contra1 === "") {
                    setErrorContra1(true);
                    setMsjs("Los campos no deben estar vacíos");
                  } else {
                    setErrorContra1(false);
                    var regularExpression = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/;
                    if (!regularExpression.test(contra1)) {
                      setErrorContra1(true);
                      setMsjs("La contraseña debe contener al menos una letra, un número y un carácter especial");
                    } else {
                      setErrorContra1(false);
                      setMsjs("");
                    }
                  }
                }}


                id="contra1"
                placeholder='Contraseña'
                className="inputCustomPass"
                type={showPassword ? 'text' : 'password'}
                inputProps={{ maxLength: 20 }}
                inputRef={refContrasenia}
                value={contra1}
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
              <p className='error'>{msjs}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Confirme Contraseña" className="titleInput" />
              <FilledInput
                onChange={(e) => {
                  setContra2(e.target.value);
                  if (contra2 === "") {
                    setErrorContra2(true);
                    setadvertencia("Los campos no deben estar vacíos");
                  }
                  if (contra2 === contra1) {
                  } else {
                  }
                }
                }

                id="contra2"
                placeholder='Contraseña'
                className="inputCustomPass"
                type={showPassword ? 'text' : 'password'}
                inputProps={{ maxLength: 20 }}
                inputRef={refContrasenia}
                value={contra2}
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
              <p className='error'>{advertencia}</p>
            </div>


            <div className="contInput">
              <TextCustom text="Correo Electrónico" className="titleInput" />

              <input
                onKeyDown={(e) => {
                  setCorreo(e.target.value)
                  var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!expresion.test(correo)) {
                    setErrorCorreo(true)
                    setTextoCorreo("Formato invalido");
                  }
                  else {
                    setErrorCorreo(false);
                    setTextoCorreo("");
                  }
                }}
                onClick={e => {
                  setCorreo(e.target.value);
                  if (correo === '') {
                    setErrorCorreo(true);
                    setTextoCorreo('Los campos no deben estar vacios');
                  } else {
                    setErrorCorreo(false);
                    setTextoCorreo('');
                  }
                }}
                onChange={e => setCorreo(e.target.value)}
                type="text"
                name="input2"
                id="correo"
                className="inputCustom"
                placeholder="Correo Electrónico"
                error={errorCorreo}
                helperText={texto}
                value={correo}
                maxLength={150}
              />
              <p className='error'>{texto}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Rol" className="titleInput" />
              <select id="cargo" className="selectCustom" value={rol} onChange={(e) => {
                setRolSelect(e.target.value)
              }} >//El value debe ser el id del valor a obtener
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

            {props.update ? <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select id="estado" className="selectCustom">
                <option value={"Activo"}>Activo</option>
                <option value={"Inactivo"}>Inactivo</option>
                <option value={"Bloqueado"}>Bloqueado</option>
              </select>
            </div> : ''}

            <div className="contBtnStepper">
              {props.update ? <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  var usuario = document.getElementById("nombre").value;
                  var correo = document.getElementById("correo").value;
                  var password = document.getElementById("contra1").value;
                  var password2 = document.getElementById("contra2").value;


                  if (usuario === "" || correo === "" || password === "" || password2 === "") {
                    swal("No deje campos vacíos.", "", "error");
                  } else if (!/^[A-Z]+$/.test(usuario)) {
                    setErrorNombreusuario(true)
                    swal("El campo Nombre de Usuario solo acepta letras mayúsculas sin espacios, entre 5 y 10 caracteres.", "", "error");
                  } else if (usuario.length < 3) {
                    swal('El usuario debe ser mayor a 3 caracteres.', '', 'error');
                  }else if (/([A-Z])\1{2,}/.test(usuario)) {
                    setErrorNombreusuario(true);
                    swal("El campo Nombre de Usuario no puede tener letras repetidas más de 2 veces seguidas.", "", "error");
                  }  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
                    setErrorCorreo(true)
                    swal("El campo correo debe contener un correo válido.", "", "error");
                  } else if (password.length < 8 ) {
                    swal('La longitud de contraseña debe ser mínimo 8 caracteres.', '', 'error');
                  } else if (password2.length < 8 ) {
                    swal('La longitud de contraseña debe ser mínimo 8 caracteres.', '', 'error');
                  } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/.test(password2)) {
                    swal("La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial.", "", "error");
                  } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/.test(password)) {
                    swal("La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial.", "", "error");
                  }else if (password !== password2) {
                    swal("Las contraseñas deben coincidir.", "", "error");
                  } else {
                    actualizar()
                  }
                }}

              >
                <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>
              </Button> : <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  var usuario = document.getElementById("nombre").value;
                  var correo = document.getElementById("correo").value;
                  var password = document.getElementById("contra1").value;
                  var password2 = document.getElementById("contra2").value;



                  if (usuario === "" || correo === "" || password === "" || password2 === "") {
                    swal("No deje campos vacíos.", "", "error");
                  } else if (!/^[A-Z]+$/.test(usuario)) {
                    setErrorNombreusuario(true)
                    swal("El campo Nombre de Usuario solo acepta letras mayúsculas sin espacios, entre 5 y 10 caracteres.", "", "error");
                  } else if (usuario.length < 3) {
                    swal('El usuario debe ser mayor a 3 caracteres.', '', 'error');
                  }else if (/([A-Z])\1{2,}/.test(usuario)) {
                    setErrorNombreusuario(true);
                    swal("El campo Nombre de Usuario no puede tener letras repetidas más de 2 veces seguidas.", "", "error");
                  }  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
                    setErrorCorreo(true)
                    swal("El campo correo debe contener un correo válido.", "", "error");
                  } else if (password.length < 8 ) {
                    swal('La longitud de contraseña debe ser mínimo 8 caracteres.', '', 'error');
                  } else if (password2.length < 8 ) {
                    swal('La longitud de contraseña debe ser mínimo 8 caracteres.', '', 'error');
                  } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/.test(password2)) {
                    swal("La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial.", "", "error");
                  } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/.test(password)) {
                    swal("La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial.", "", "error");
                  }else if (password !== password2) {
                    swal("Las contraseñas deben coincidir.", "", "error");
                  } else {
                    insertar();
                  }
                }}
              >
                <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>
              </Button>}

            </div>
          </div>
        </div>

        <img src={AddUser} alt="" />
      </div>
    </div>
  );
};