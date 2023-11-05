import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sendData } from '../scripts/sendData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Styles
import '../Styles/Usuarios.css';
import '../Styles/login.css';

import ImgLogin from '../IMG/InforUsers.jpg';

//Components
//import VerticalStepper from '../../Components/VerticalStepper.jsx';
import swal from '@sweetalert/with-react';
import { ContentPasteGoOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { TextCustom } from '../Components/TextCustom.jsx';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import { Bitacora } from '../Components/bitacora.jsx';

export const Perfil = (props) => {
  const urlBitacoraPerfil = 'http://localhost:3000/api/bitacora/salirperfil';
  const urlUpUsuario = 'http://localhost:3000/api/actualizarPerfil';
  const urlBPerflUpdt = 'http://localhost:3000/api/bitacora/cambioPerfil';
  const urlDelAllPreguntas = 'http://localhost:3000/api/eliminarPregConfig';



  const [sucursales, setSucursales] = useState([]);

  const navegate = useNavigate();

  const [contra2, setContra2] = useState("");
  const [errorContra2, setErrorContra2] = useState(false);
  const [advertencia, setadvertencia] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [nombre, setName] = React.useState(props.infoPerfil.nombre || '');
  const [apellido, setApellido] = React.useState(props.infoPerfil.apellido || '');
  const [numeroIdentidad, setnumeroIdentidad] = React.useState(props.infoPerfil.numeroIdentidad || '');
  const [Correo_Electronico, setCorreo_Electronico] = React.useState(props.infoPerfil.Correo_Electronico || '');


  const [errorNombre, setErrorNombre] = React.useState();
  const [Msj, setMsj] = React.useState(false);

  const [errorApellido, setErrorApellido] = React.useState(false);
  const [aviso, setAviso] = React.useState(false);


  const [adv, setadv] = React.useState(false);
  const [errorcorreoelec, setErrorcorreoelec] = React.useState(false);


  const handleClickShowPassword = () => setShowPassword(show => !show);
  const refContrasenia = useRef(null);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handlePerfilStepper = () => {
    navegate("/perfilStepper");
  };

  const handlePreguntas = async() => {
    const dataId = {
      Id_Usuario: props.idUsuario,
    };
    console.log(dataId);

   
    await axios.post(urlDelAllPreguntas,dataId).then(response => {
      navegate('/preguntasPerfil')
    }).catch(error => {
      console.log('error');
      swal("¡Error al configurar las preguntas de seguridad!", "", "error");
    });
  };

  const handleBack = () => {
    const dataId = {
      Id: props.idUsuario,
    };

    const bitacora = {
      urlB:urlBitacoraPerfil,
      activo:props.activo,
      dataB:dataId
    };



    navegate('/dashboard');
   // axios.post(urlBitacoraPerfil, dataId)
    Bitacora(bitacora);

  };

  const handleActualizarDatos = async () => {

    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let numeroIdentidad = document.getElementById('identidad').value;
    let Correo_Electronico = document.getElementById('correo').value;

    let data = {
      nombre: nombre,
      apellido: apellido,
      numeroIdentidad: numeroIdentidad,
      Correo_Electronico: Correo_Electronico,
      id: props.idUsuario
    }
    console.log(data);

    const dataId = {
      Id: props.idUsuario,
    };

    await axios.put(urlUpUsuario, data).then(() => {
      axios.post(urlBPerflUpdt, dataId)
      swal("¡Datos Actualizados Correctamente! Vuelve a iniciar sesión", "", "success").then(() => { navegate('/') })
    }).catch(error => {
      console.log(error);
      swal('Error al Actualizar datos! ', '', 'error')
    })
  };



  return (
    <div align="center">
      <div className="ContProfile" >

        <Button className="btnBack" onClick={handleBack}>
          <ArrowBackIcon className="iconBack" />
        </Button>

        <div className="titleAddUser" align="center">
          <h2>Mi Perfil</h2>
        </div>

        <div className="infoAddUser" align="left" >
          <section className='section2'>
            <div className="contInput">
              <TextCustom text="Usuario: " className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Nombre usuario"
                id="nameUser"
                value={props.infoPerfil.Nombre_Usuario}
                disabled
              />
            </div>
            <br />

            <div className="contInput">
              <TextCustom text="Nombre: " className="titleInput" />
              <input
                onKeyDown={e => {
                  setName(e.target.value);
                  if (nombre === '') {
                    setErrorNombre(true);
                    setMsj('Los campos no deben estar vacíos');
                  } else {
                    setErrorNombre(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(nombre)) {
                      setErrorNombre(true);
                      setMsj('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(nombre)) {
                      setErrorNombre(true);
                      setMsj('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrorNombre(false);
                      setMsj('');
                    }
                  }
                }}

                onChange={e => setName(e.target.value)}
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="Nombre"
                id="nombre"
                value={nombre}
                error={errorNombre}
                disabled
              />
              {/* <p className="error">{Msj}</p> */}
            </div>
            <br />
            <div className="contInput">
              <TextCustom text="Apellido: " className="titleInput" />
              <input
                onKeyDown={e => {
                  setApellido(e.target.value);
                  if (apellido === '') {
                    setErrorApellido(true);
                    setAviso('Los campos no deben estar vacíos');
                  } else {
                    setErrorApellido(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(apellido)) {
                      setErrorApellido(true);
                      setAviso('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(apellido)) {
                      setErrorApellido(true);
                      setAviso('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrorApellido(false);
                      setAviso('');
                    }
                  }
                }}

                onChange={e => setApellido(e.target.value)}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Apellido"
                id="apellido"
                value={apellido}
                error={errorApellido}
                disabled
              />
              {/* <p className="error">{aviso}</p> */}
              <br />
            </div>
          </section>

          <section className='section2' >
            <br /> <br /><br /><br /> <br /> <br /> <br />
            <div className="contInput">
              <TextCustom text="Identidad: " className="titleInput" />
              <input
                onChange={e => setnumeroIdentidad(e.target.value)}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Identidad"
                id="identidad"
                value={numeroIdentidad}
                disabled

              />
            </div>
            <br />
            <div className="contInput">
              <TextCustom text="Correo:   " className="titleInput" />
              <input
                onKeyDown={e => {
                  setCorreo_Electronico(e.target.value);
                  if (Correo_Electronico == '') {
                    setErrorcorreoelec(true);
                    setadvertencia('Los campos no deben estar vacios');
                  }
                  else {
                    setErrorcorreoelec(false);
                    var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!expresion.test(Correo_Electronico)) {
                      setErrorcorreoelec(true);
                      setadvertencia('Formato invalido');
                    } else {
                      setErrorcorreoelec(false);
                      setadvertencia('');
                    }
                  }
                }}
                onChange={e => setCorreo_Electronico(e.target.value)}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Correo"
                id="correo"
                value={Correo_Electronico}
                error={errorcorreoelec}
                disabled
              />
              {<p className="error">{advertencia}</p>}
            </div>
            <br />
            {/* <div className="contInput">
              <TextCustom text="Cargo:  " className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Rol"
                id="rol"
                value={props.infoPerfil.Rol}
                disabled
              />
            </div> */}

            {/*  <div className="contInput">
              <TextCustom text="Teléfono:  " className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Rol"
                id="teléfono"
                value={props.infoPerfil.telefonoEmpleado}
                disabled
              />
            </div> */}
          </section>


          <section className='section2'>
            {/*  <div className="contUpdatePassword" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                className="btnUpdatePassword"
                type='submit'
                onClick={() => {
                  var nombre = document.getElementById("nombre").value;
                  var apellido = document.getElementById("apellido").value;
                  var correo = document.getElementById("correo").value;
                  if (nombre === "" || apellido === "" || correo === "") {
                    swal("No deje campos vacíos.", "", "error");
                  }
                  if (!/^[A-Z]+(?: [A-Z]+)*$/.test(nombre)) {
                    swal("El campo nombre solo acepta letras mayúsculas y solo un espacio entre palabras.", "", "error");
                  } else if (/(.)\1{2,}/.test(nombre)) {
                    setErrorNombre(true);
                    swal("El campo nombre no acepta letras mayúsculas consecutivas repetidas.", "", "error");
                  }
                  else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(apellido)) {
                    swal("El campo apellido solo acepta letras mayusculas y un espacio entre palabra.", "", "error");
                  } else if (/(.)\1{2,}/.test(apellido)) {
                    setErrorApellido(true);
                    swal("El campo apellido no acepta letras consecutivas repetidas.", "", "error");
                  }
                  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
                    swal("El campo correo debe contener un correo válido.", "", "error");
                  } else {
                    handleActualizarDatos();
                  }
                }}

              //onClick={handleActualizarDatos}
              // onClick={handleActualizarDatos}
              >Actualizar Datos</button>
            </div> */}
            <div className="contUpdatePassword" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                className="btnUpdatePassword"
                type='submit'
                onClick={handlePreguntas}
              >Modificar Preguntas</button>
            </div>
          </section>

          <section className='section2'>
            <div className="contUpdatePassword" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                className="btnUpdatePassword"
                type='submit'
                onClick={handlePerfilStepper}
              >Cambiar contraseña</button>
            </div>
          </section>

          <section>
            <div>
              <img src={ImgLogin} className="imgLogin" alt="No existe la imagen" />
            </div>
          </section>
        </div>

      </div >
    </div >
  );
};
