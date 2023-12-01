import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { TextCustom } from '../../TextCustom';
// import "./PageOne.css";
import '../../../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';
import { useNavigate } from 'react-router-dom';

export const PageOne = ({ onButtonClick, correo }) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [prueba, setprueba] = useState('');
  const [errorUsuario, setErrorUsuario] = useState(false);
  const [contra, setContra] = useState('');
  const [msj, setMsj] = useState('');
  const [errorContra, setErrorContra] = useState(false);

  const [intentos, setIntentos] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const refUsuario = useRef(null);

  const handleBack = () => {
    /*  swal({
       title: 'Advertencia',
       text: 'Hay un proceso de creación de una nueva pregunta de seguridad ¿Estás seguro que deseas salir?',
       icon: 'warning',
       buttons: ['Cancelar', 'Salir'],
       dangerMode: true,
     }).then((confirmExit) => {
       if (confirmExit) {
         navigate('/Preguntas/lista');
       }
     }); */
    navigate('/');
  };

  return (

    <main>
      {/* <div className="titleRecuperacion">
        <h2>Confirme tu correo electrónico</h2>
        <h3>Confirma tu identidad introduciendo el correo que utilizaste a la hora de crear la cuenta</h3>
      </div> */}
      <form className="measure">
        <div className="contPrincipalRecuperacion">

          <div className='divInfoRecuperacion'>
            <TextCustom text="Ingrese su correo electrónico:" className="titleInput" />
            <div className="contInput">
              {/* <div className="contInput">
              <input
                type="text"
                name=""
                className="inputCustom"
                placeholder="Respuesta"
                id='respuesta'
              />
             </div> */}


              <input
                type="text"
                onKeyDown={e => {
                  setUsuario(e.target.value);
                  if (usuario.length > 47) {
                    setErrorUsuario(true);
                    setprueba('Ha excedido al numero de caracteres');
                  } else {
                    setErrorUsuario(false);
                    var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!expresion.test(usuario)) {
                      setErrorUsuario(true);
                      setprueba('Formato inválido');
                    } else {
                      setErrorUsuario(false);
                      setprueba("");
                    }
                  }
                }}
                onClick={e => {
                  setUsuario(e.target.value);
                  if (usuario === "") {
                    setErrorUsuario(true);
                    setprueba('Los campos no deben estar vacíos');
                  } else {
                    setErrorUsuario(false);
                    setprueba("");
                  }
                }}
                error={errorUsuario}
                placeholder="Correo"
                id='respuesta'
                className="inputCustom"
                maxLength={50}
                ref={refUsuario}
              />
              <p className="errorMessage">{prueba}</p>
            </div>
          </div>

        </div>
        <div className='divSubmitRecuperacion'>
           <input
              className="btnSubmitPreguntas"
              type="button"
              value="Cancelar"
              onClick={handleBack}
            />


          <input
            className="btnSubmit"
            type="button"
            value="Siguiente"
            onClick={() => {
              correo(document.getElementById('respuesta').value)
              onButtonClick('pagetwo')
            }}

            // onClick={() => {
            //   const correo=(document.getElementById('respuesta').value)
            //   console.log(correo);

            //   if (correo === "") {
            //     swal('No deje campos vacíos.', '', 'error');
            //   } else if (correo.length < 13 || correo.length > 50) {
            //     swal('La longitud del campo debe estar entre 5 y 50 caracteres.', '', 'error');
            //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            //     swal('Formato incorrecto', '', 'error');
            //   } else if (/(.)\1{2,}/.test(correo)) {
            //     setErrorUsuario(true);
            //     swal('El campo nombre no acepta letras mayúsculas consecutivas repetidas.', '', 'error');
            //   } else {
            //     onButtonClick('pagetwo')
            //   }

            // }}


          />

        </div>
      </form>
    </main>

  );
};

export default PageOne;