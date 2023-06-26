import React from 'react';
import passwordRecovery from '../../IMG//registration.png';
import { TextCustom } from '../../Components/TextCustom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import { useState, useEffect, useRef } from 'react';
import { sendData } from '../../scripts/sendData';

const urlIEmpleado = 'http://localhost:3000/api/empleado';
const urlUsuario = 'http://localhost:3000/api/usuario/insert';

export const Registration = props => {

  const [Nombreusuario, setNombreusuario] = React.useState("");
  const [errorNombreusuario, setErrorNombreusuario] = React.useState(false);
  const [mensaje, setMensaje] = React.useState(false);

  const [Nombre, setNombre] = React.useState('');
  const [errorNombre, setErrorNombre] = React.useState(false);
  const [Msj, setMsj] = React.useState(false);

  const [Apellido, setApellido] = React.useState('');
  const [errorApellido, setErrorApellido] = React.useState(false);
  const [aviso, setAviso] = React.useState(false);

  const [iIdentidad, setiIdentidad] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorIdentidad, setErrorIdentidad] = React.useState(false);

  const [correo, setCorreo] = useState("");
  const [texto, setTexto] = useState("");
  const [errorCorreo, setErrorCorreo] = useState(false);

  const [contra, setContra] = useState("");
  const [msj, setMsjs] = useState("");
  const [errorContra, setErrorContra] = useState(false);

  const [Identidad, setIdentidad] = useState(0);
  const refContrasenia = useRef(null);

  const navegate = useNavigate();

  const handleProgress = async () => {
    let NombreUsuario = document.getElementById('Nombreusuario').value;
    let Nombre = document.getElementById('Nombre').value;
    let Apellido = document.getElementById('Apellido').value;
    let Identidad = document.getElementById('Identidad').value;
    let correo = document.getElementById('correo').value;


    //tienen que estar igual a las apis del node
    let data = {
      usuario: NombreUsuario.toUpperCase(),
      nombre: Nombre.toUpperCase(),
      apellido: Apellido.toUpperCase(),
      numId: Identidad,
      correo: correo,
      clave: refContrasenia.current.value
    };

    let dataB = {
      Id: props.idU
    }
    /* if (sendData(urlIEmpleado, data)) {
      swal('Empleado agregado con exito', '', 'success').then(result => {
        swal({
          title: '¿Desea crearle un usuario al empleado agregado?',
          icon: 'question',
          buttons: true,
          dangerMode: true,
          buttons: ['Cancelar', 'Aceptar'],
        }).then(result => {
          if (result) navegate('/usuarios/crearusuario');
          else {
            navegate('/empleados/lista');
          }
        });

        navegate('/empleados/lista');
      });
    } */

    await axios.post(urlIEmpleado, data).then(response => {
      swal('Datos personales agregados con exito', '', 'success').then(result => {
      });
    }).catch(error => {
      console.log(error);
      swal('Error al registrar el empleado', '', 'success')
    })

    await axios.post(urlUsuario, data).then(response => {
      swal('Empleado agregado con exito', '', 'success').then(result => {
       ;
      });
    }).catch(error => {
      console.log(error);
      swal('Error al registrar el empleado', '', 'success')
    })
    navegate("/progress")
  }

  const handleLogin = () => {
    navegate("/")
  }

  return (
    <div className="divRegistration">
      <div className="divImgSection">
        <img src={passwordRecovery} alt="Iamgen no encontrada" />
      </div>

      <div className="divSectionRegis">
        <div className="titleRegistration">
          <h2>Registrate</h2>
          <h3>Gracias por confiar y formar parte de la familia Multioptica</h3>
        </div>

        <div className="divInfoQuestionRegis">
          <div className="sectInput">
            <TextCustom text="Usuario" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Nombre" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Apellido" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Identidad" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Correo electrónico" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Contraseña" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Confirmar Contraseña" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>


        </div>
        <div className="divSubmitRegis">
          <button className="buttonCustomRegis"
            onClick={handleProgress}>Siguiente</button>
        </div>

        <span className="refInicioSesion">
          <b>
            ¿Ya tienes una cuenta? <a href="/">Inicia Sesión</a>
          </b>
        </span>
      </div>
    </div>
  );
};
