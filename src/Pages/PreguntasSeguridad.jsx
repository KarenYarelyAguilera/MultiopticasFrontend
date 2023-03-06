import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import React, { useState } from 'react';
import { TextCustom } from '../Components/TextCustom';
import { sendData } from '../scripts/sendData';

//MuiMaterial-Icons
import WarningIcon from '@mui/icons-material/Warning';

//Styles
import '../Styles/RecuperacionPassword.css';

export const PreguntasSeguridad = (props) => {
  const navegate = useNavigate();
//   const [errorMessage, seterrorMessage] = useState('');
//   const [respuesta, setrespuesta] = useState('');

  // const urlPreguntas = "http://localhost/APIS-Multioptica/login/controller/user.php?op=preguntas"
  // const  data = {
  //   correo:props.correo
  // }

  // const dataPreguntas = sendData(urlPreguntas,data)

//   const validate = () => {
//     console.log(respuesta);
//     if (respuesta === dataPreguntas.pregunta) {
//       seterrorMessage('Respuesta correcta');
//     } else {
//       seterrorMessage('Respuesta incorrecta');
//     }
//   };

  const confirmarPassword = () => {
    // let correo = document.getElementById('correo').value;
    // props.correo(correo);

    navegate('/preguntasSeguridad/confirmarPassword');
  };

//   const handleChange = event => {
//     setrespuesta(event.target.value);

//     console.log('value is:', event.target.value);
//   };

  return (
    <div className="contRecuperaPassword">
      <div className="titleRecuPassword">
        <h2>Preguntas de Seguridad</h2>
        <h3>
          Estas preguntas nos ayudarán a tener una mejor seguridad al iniciar
          sesion.
        </h3>
      </div>

      <div className="sectionRecuPassword">
        <br />
        <br />
        <div className="contPrincipalRecu">
          <div className="contInput">
            <TextCustom text="Pregunta de seguridad" className="titleInput" />
            <input
              type="text"
              name=""
              className="inputCustom"
              placeholder="Pregunta"
              // onChange={handleChange}
              // value={respuesta}
            />
          </div>

          <div className="contInput">
            <TextCustom text="Respuesta" className="titleInput" />
            <input
              type="text"
              name=""
              className="inputCustom"
              placeholder="Respuesta"
              // onChange={handleChange}
              // value={respuesta}
            />
          </div>
        </div>
        <div className="contBtnPre">
          <Button
            className="btnSubmitpre"
            variant="container"
            // onClick={e => validate(e.target.value)}
            onClick={confirmarPassword}
          >
            Comprobar
          </Button>
        </div>
        {/* {errorMessage === '' ? null : (
          <div className="ErrorMessage">
            <WarningIcon
              style={{ paddingRight: 15, fontSize: 35, color: 'white' }}
            />
            {errorMessage}
          </div>
        )} */}
      </div>
    </div>
  );
};
