//import React from 'react';
import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PageTwo = ({ onButtonClick, correo, id, autor }) => {
  const navigate = useNavigate();
  const [email, setCorreo] = useState("");
  const [textoCorreo, setTextoCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState(false);

  const urlUserExist = 'http://194.163.45.55:4000/api/login';
  const urlPreguntas = 'http://194.163.45.55:4000/api/preguntas';

  //const [email,setEmail]=useState('');
  const [pasar, setPasar] = useState(false)

  /* const data={
    correo:correo1
  }
  console.log(data);
   */
  const handleClick = async () => {
    const respuesta = document.getElementById('respuesta').value;
    /*  if (correo1 === respuesta) { */
    const crr = {
      correo: respuesta,
    }
    console.log(crr);

    await axios.post(urlUserExist, crr).then(response => {

      id(response.data[0].Id_Usuario)
      autor(response.data[0].Nombre_Usuario)
      correo(respuesta)

      if (response.data) {

        const data2 = {
          "correo": respuesta,
          "id": response.data[0].Id_Usuario,
        };
        console.log(data2);

        axios.post(urlUserExist, data2).then(() => onButtonClick('pagethree')).catch(() => {
          console.log(response.data);
          swal("Ocurrió un error al realizar la segunda petición POST");
        });

      } else {
        swal("El correo que ingreso es erroneo o no esta registrado", "", "error")
      }



    }).catch(() => {
      swal("Verifique si el correo que ingreso es correcto", "", "error");
    });

    /* } else {
      swal("El correo que ingreso no coincide con el correo que proporcionó anteriormente.", "", "error")
    } */
  };


  const handleBack = () => {
    /*  swal({
       title: 'Advertencia',
       text: 'Hay un proceso de recuperación de contraseña ¿Estás seguro que deseas salir?',
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


      <form className="measure">
        <div className="contPrincipalRecuperacion" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className='divInfoRecuperacion' style={{ fontSize: "15px" }}>

            <TextCustom text="Ingrese su correo electrónico:" className="titleInput" />
            <div className="contInput">
              <input

                onKeyDown={(e) => {
                  setCorreo(e.target.value)
                  var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!expresion.test(email)) {
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
                  if (email === '') {
                    setErrorCorreo(true);
                    setTextoCorreo('Los campos no deben estar vacios');
                  } else {
                    setErrorCorreo(false);
                    setTextoCorreo('');
                  }
                }}
                maxLength={50}
                error={errorCorreo}
                helperText={textoCorreo}




                type="text"
                name=""
                className="inputCustom"
                placeholder="Correo"
                id='respuesta'
              />
            </div>
            <p className='error'>{textoCorreo}</p>
          </div>
        </div>
        <div className='divSubmitRecuperacion' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <input
            className="btnSubmit"
            type="button"
            value="Cancelar"
            onClick={handleBack}
          />


          <input
            className="btnSubmit"
            type="button"
            value="Siguiente"
            //onClick={handleClick}

            onClick={() => {
              const correo = document.getElementById('respuesta').value;

              if (correo === "") {
                swal('No deje campos vacíos.', '', 'error');
              } else if (correo.length < 13 || correo.length > 50) {
                swal('La longitud del campo debe estar entre 5 y 50 caracteres.', '', 'error');
              } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
                swal('Formato incorrecto', '', 'error');
              } else if (/(.)\1{2,}/.test(correo)) {
                setErrorCorreo(true);
                swal('El campo nombre no acepta letras mayúsculas consecutivas repetidas.', '', 'error');
              } else {
                handleClick()
              }


            }}



          />
        </div>
      </form>
    </main>
  );
};

export default PageTwo;
