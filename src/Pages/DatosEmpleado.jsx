import React from 'react';
import Button from '@mui/material/Button';
import { sendData } from '../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import InforUsers from '../IMG/InforUsers.jpg';
import { useState, useEffect } from 'react';
//Styles
import '../Styles/Usuarios.css';

//Components
import { TextCustom } from '../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';

const urlIEmpleado = "http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=InsertEmployee"
const urlSucursales = "http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=sucursales"
const urlRoles = "http://localhost/APIS-Multioptica/Rol/controller/Rol.php?op=roles"

export const DatosEmpleado = (


) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };
  const [sucursales, setSucursales] = useState([])
  const [roles, setRoles] = useState([])

  const [iIdentidad, setiIdentidad] = useState("");
  const [leyenda, setleyenda] = React.useState("");
  const [errorIdentidad, setErrorIdentidad] = useState(false);

  const [Nombre, setNombre] = useState("");
  const [errorNombre, setErrorNombre] = useState(false);
  const [Msj, setMsj] = React.useState(false);

  const [Apellido, setApellido] = React.useState("");
  const [errorApellido, setErrorApellido] = useState(false);
  const [aviso, setAviso] = React.useState(false);

  const [Telefono, setTelefono] = useState("");
  const [errorTelefono, setErrorTelefono] = useState(false);
  const [texto, setTexto] = useState(false);

  const [Identidad, setIdentidad] = useState(0)
  const [Telefonoc, setTelefonoc] = useState(0)

  useEffect(() => {
    fetch(urlSucursales).then(response => response.json()).then(data => setSucursales(data))
    fetch(urlRoles).then(response => response.json()).then(data => setRoles(data))
  }, [])


  const navegate = useNavigate()
  const handleNext = () => {
    let identidad = document.getElementById("Nidentidad").value
    let nombres = document.getElementById("nombre").value
    let apellidos = document.getElementById("apellido").value
    let telefono = document.getElementById("phone").value
    let genero = parseInt(document.getElementById("genero").value)
    let sucursal = parseInt(document.getElementById("sucursal").value)
    let cargo = parseInt(document.getElementById("cargo").value)

    let data = {
      cargo: cargo,
      nombre: nombres.toUpperCase(),
      apellido: apellidos.toUpperCase(),
      phone: telefono,
      genero: genero,
      sucursal: sucursal,
      identidad: identidad
    }
    if (sendData(urlIEmpleado, data)) {
      swal('Empleado agregado con exito', '', 'success').then((result) => {
        navegate("/empleados/lista")
      })
        ;
    }

  };

  return (
    <div className="ContUsuarios">
      <div className="titleAddUser">
        <h2>Datos del empleado</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos del empleado
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">

              <TextCustom

                text="Numero de Identidad" className="titleInput"
              />


              <input
                error={errorIdentidad}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                onKeyDown={(e) => {
                  setiIdentidad(e.target.value);
                   setIdentidad(parseInt(e.target.value))
                  if (iIdentidad === "") {
                    setErrorIdentidad(true);
                    setleyenda("Los campos no deben estar vacios");
                  }
                  else {
                    setErrorIdentidad(false)
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(iIdentidad)) {
                      setErrorIdentidad(true)
                      setleyenda("Solo deben de ingresar numeros")
                    } else {
                      setErrorIdentidad(false);
                      setleyenda("");
                    }
                  }
                }}

                placeholder="Identidad"
                id="Nidentidad"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom
              
                text="Nombre" />
              <input
                onKeyDown={(e) => {
                  setNombre(e.target.value);
                  if (Nombre == "") {
                    setErrorNombre(true);
                    setMsj("Los campos no deben estar vacios");
                  }
                  else {
                    setErrorNombre(false)
                    var preg_match = /^[a-zA-Z]+$/;
                    if (!preg_match.test(Nombre)) {
                      setErrorNombre(true)
                      setMsj("Solo debe de ingresar letras")
                    } else {
                      setErrorNombre(false);
                      setMsj("");
                    }
                  }
                }}
                error={errorNombre}
                type="text"
                helperText={Msj}
                name=""
                className="inputCustom"
                maxLength={50}
                placeholder="Nombre"
                variant="standard"
                id="nombre"
                label="Usuario"

              />
              <p className='error'>{Msj}</p>
            </div>

            <div className="contInput">
              <TextCustom

                text="Apellido" className="titleInput" />
              <input
                onKeyDown={(e) => {
                  setApellido(e.target.value);
                  if (Apellido == "") {
                    setErrorApellido(true);
                    setAviso("Los campos no deben estar vacios");
                  }
                  else {
                    setErrorApellido(false)
                    var preg_match = /^[A-Z]+$/;
                    if (!preg_match.test(Apellido)) {
                      setErrorApellido(true)
                      setAviso("Solo se debe ingresar letras mayusculas")
                    } else {
                      setErrorApellido(false);
                      setAviso("");
                    }
                  }
                }}
                error={errorApellido}
                type="text"
                name=""
                helperText={aviso}
                maxLength={50}
                className="inputCustom"
                placeholder="Apellido"
                id="apellido"
              />
              <p className='error'>{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Genero" className="titleInput" />
              <select name="" className="selectCustom" id='genero'>
                <option value={1}>Masculino</option>
                <option value={2}>Femenino</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom

                text="Telefono" className="titleInput" />
              <input
                onKeyDown={(e) => {
                  setTelefono(e.target.value);
                  setTelefonoc(parseInt(e.target.value))
                  if (Telefono == "") {
                    setTexto("Los campos no deben estar vacios");
                    setErrorTelefono(true);
                  }
                  else {
                    setErrorTelefono(false)
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(Telefono)) {
                      setErrorTelefono(true)
                      setTexto("Solo deben de ingresar numeros")
                    } else {
                      setErrorTelefono(false);
                      setTexto("");
                    }
                  }
                }}
                error={errorTelefono}
                type="phone"
                name=""
                helperText={texto}
                maxLength={12}
                className="inputCustom"
                placeholder="Telefono"
                id="phone"
              />
              <p className='error'>{texto}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Sucursal" className="titleInput" />
              <select name="" className="selectCustom" id="sucursal">
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
              <TextCustom text="Cargo" className="titleInput" />
              <select name="" className="selectCustom" id='cargo'>
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

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={()=>{
                  if(document.getElementById("Nidentidad").value=="" || document.getElementById("nombre").value == ""|| document.getElementById("apellido").value =="" ){
                     swal("No deje campos vacios.","","error")
                  }
                  if(typeof(document.getElementById("nombre").value) !== 'string')       {
                    swal("El campo nombre solo acepta letras","","error")
                  }  
                  if(typeof(document.getElementById("apellido").value) !== 'string')       {
                    swal("El campo apellido solo acepta letras","","error")
                  }  
                  if(isNaN(Telefonoc) || isNaN(Identidad))      {
                    swal("Corrija los campos Erroneos","","error")
                  } else{
                    handleNext()
                  }    
                 
              
                   
                    
                  
                }}
              >
                <h1>{'Finish' ? 'Continue' : 'Finish'}</h1>
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>

        <img src={InforUsers} alt="No se encuentro la imagen" />

      </div>
    </div>
  );
};