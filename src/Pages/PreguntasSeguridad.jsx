import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import React from 'react';
import { TextCustom } from '../Components/TextCustom';
import { sendData } from '../scripts/sendData';

//MuiMaterial-Icons
//import WarningIcon from '@mui/icons-material/Warning';

//Styles
import '../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';

export const PreguntasSeguridad = (props) => {
  const navegate = useNavigate();
  // const [errorMessage, seterrorMessage] = useState('');
  // const [respuesta, setrespuesta] = useState('');

  var today = new Date()
  var dateFormat = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate()
  const urlIPreguntas = "http://localhost/APIS-Multioptica/preguntas/controller/preguntas.php?op=nuevaPregunta"
  const urlUser = "http://localhost/APIS-Multioptica/login/controller/user.php?op=user"
  const urlIResp = "http://localhost/APIS-Multioptica/preguntas/controller/preguntas.php?op=nuevaRespuesta"

  const datausr = {
    correo: props.mail
  }

  const Avanzar = async () => {
    const respJson = await sendData(urlUser, datausr)
    console.log(respJson[0].Id_Usuario)


    const data = {
      pregunta: document.getElementById("pregunta").value,
      autor: props.user,
      fechaActual: dateFormat
    }

    const dataR = {
      idautor: respJson[0].Id_Usuario,
      respuesta: document.getElementById("resp").value,
      autor: props.user,
      fechaActual: dateFormat
    }

    if (document.getElementById("pregunta").value !== "" && document.getElementById("resp").value !== "") {
      if (await sendData(urlIPreguntas, data) && await sendData(urlIResp, dataR)) {
        alert("Pregunta guardada con exito")
        navegate('/preguntasSeguridad/confirmarPassword');
    }
    

    } else {
      swal("Ocurrio un error", "", "error")
    }




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
              id='pregunta'
            />
          </div>

          <div className="contInput">
            <TextCustom text="Respuesta" className="titleInput" />
            <input
              type="text"
              name=""
              className="inputCustom"
              placeholder="Respuesta"
              id='resp'
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
            onClick={Avanzar}
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
