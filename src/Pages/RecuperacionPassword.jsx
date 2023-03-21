import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import React, { useState } from 'react';
import { TextCustom } from '../Components/TextCustom';
import { useEffect } from 'react';


//MuiMaterial-Icons
import WarningIcon from '@mui/icons-material/Warning';

//Styles
import '../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';

export const RecuperacionPassword = props => {
  const navegate = useNavigate();

  const [preguntas,setPreguntas]=useState([])
  const [cont,setCont]=useState(0)
  
  const urlPreguntas = "http://localhost/APIS-Multioptica/login/controller/user.php?op=preguntas"
   const  data = {
    correo:props.correo
   }

useEffect(() => {
  fetch(urlPreguntas,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)})
    .then(response => response.json())
    .then(data => setPreguntas(data));
  
}, [] );


  const validate = () => {
    const respuesta = document.getElementById("respuesta").value

    if (cont==2) {
      navegate('/')
    }

    if (respuesta === preguntas[0].Respuesta) {
      newPassword()
    } else {
      swal('Respuesta incorrecta', '', 'error');
      setCont(cont+1)
    }
  };

  const newPassword = () => {
    navegate('/recuperacion/preguntas/newPassword');
  };

  return (
    <div className="contRecuperaPassword">
      <div className="titleRecuPassword">
        <h2>Preguntas de Seguridad</h2>
        <h3>
          Seleccione de {preguntas.length} preguntas de seguridad. <br />
          Estas preguntas nos ayudarán a verificar tu identidad si olvidaste tu
          contraseña.
        </h3>
      </div><br />

      <div className="sectionRecuPassword">
        {preguntas.length ? (
          preguntas.map(preguntass => (
            <div key={preguntass.Id_Pregunta}>
              <div className="contPrincipalRecu">
                <div className="contInput">
                  <TextCustom
                    text="Pregunta de seguridad"
                    className="titleInput"
                  />
                  <select name="" className="selectCustom">
                    {preguntas.length ? (
                      preguntas.map(pre => (
                        <option key={pre.Id_Pregunta} value={pre.Id_Pregunta}>
                          {pre.Pregunta}
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
                  <TextCustom text="Respuesta" className="titleInput" />
                  <input
                    type="text"
                    name=""
                    id="respuesta"
                    className="inputCustom"
                    placeholder="Respuesta"
                    // onChange={handleChange}
                    // value={respuesta}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="NoInformatio">No existe información</div>
        )}
        <div className="contBtnPre">
          <Button
            className="btnSubmitpre"
            variant="container"
            // onClick={e => validate(e.target.value)}
            onClick={validate}
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
