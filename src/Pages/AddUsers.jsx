import { useState, useEffect } from "react"
import { FilledInput } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRef } from "react";
import { sendData } from "../scripts/sendData";
import swal from '@sweetalert/with-react';

export const AddUsers = () => {

  const refContrasenia = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const urlEmployees = "http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=Employees"
  const urlCargos = "http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=cargos"
  const urlInsert = "http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=insertUsuario"

  const [Empleado, setIdEmpleado] = useState([])
  const [Cargo,setCargo] = useState([])

  useEffect(() => {
    fetch(urlEmployees).then(response => response.json()).then(data => setIdEmpleado(data))
    fetch(urlCargos).then(response => response.json()).then(data => setCargo(data))
  }, [])

 


  const insertar = async () =>{

    let id = document.getElementById("empleado").value
    let usuario = document.getElementById("empleado").options[document.getElementById("empleado").selectedIndex].text
    let user = String(usuario)
    let nombre = document.getElementById("usuario").value
    let correo = document.getElementById("correo").value
    let rol = document.getElementById("cargo").value



    let data ={
      id:id,
     usuario:user,
     nombre:nombre,
    clave:refContrasenia.current.value,
    correo:correo,
    rol:rol
    }
    if (await  sendData(urlInsert,data)) {
      swal('Usuario creado exitosamente.','','success')
    }
    
  }

  return (
    <>
      <label>Empleado:  <select id="empleado">
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
      </select></label>
      <label htmlFor="">Nombre de usuario <input type="text" id="usuario" /> </label>
      <label htmlFor="">Contraseña : <FilledInput
        id="filled-adornment-password"
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
      /></label>
      <label>Correo Electronico: <input type="email" id="correo" /></label>
      <label>Rol: <select id="cargo">
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
      </select></label>


      <button onClick={insertar} >Crear usuario</button>
    </>
  )
}