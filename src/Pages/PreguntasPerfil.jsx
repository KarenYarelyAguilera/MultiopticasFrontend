import React, { useEffect, useState } from 'react';
import passwordRecovery from '../IMG/passwordrecovery.png';
import { useNavigate } from 'react-router';
import { TextCustom } from '../Components/TextCustom';
import axios from 'axios';

export const PreguntasPerfil = props => {

  const [Preguntas, setPreguntas] = useState([]);
  const urlPreguntas = 'http://localhost:3000/api/preguntas';
  const urlRespuestas = 'http://localhost:3000/api/preguntas/compararR';
  const urlBloquearUsu="http://localhost:3000/api/usuario/estado"

const navegate = useNavigate();

  //para las preguntas
  useEffect(() => {
    //console.log(data);
    axios.get(urlPreguntas).then(response =>{
      setPreguntas(response.data);
     }).catch(error => console.log(error))
   },[]);

  return (
    <div className="divSection">
      <div className="divInfoQuestion">
        <div className="titleRecuPassword">
          <h2>Preguntas de seguridad</h2>
          <h3>Responda cada pregunta para poder modificarla</h3>
        </div>

        <form className="measure">
        <div className="contPrincipalRecu">
          <div className='divInfoQuestionResp'>
          <TextCustom text="Preguntas:" className="titleInput" />
          <div className="contInput">
          <select id="Id_preguntas"  className="inputCustomPreguntas">
                {Preguntas.length ? (
                  Preguntas.map(pre => (
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

          </div>

          <div className='divInfoQuestionResp'>

          <TextCustom text="Respuesta:" className="titleInput" />
          <div className="contInput">
            <input
             maxLength="20"
              type="text"
              name=""
              className="inputCustom"
              placeholder="Respuesta"
              id='respuestap'
            />
          </div>
          </div>
        </div>
        <div className='divSubmitQuestion'>
          <input
            className="btnSubmitPreguntas"
            type="button"
            value="Guardar"
            // onClick={handleClick}
          />
        </div>
      </form>
        
      </div>

      <div className="divImgSection">
        <img src={passwordRecovery} alt="Iamgen no encontrada" />
      </div>
    </div>
  );
};
