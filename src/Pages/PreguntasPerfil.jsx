import React, { useEffect, useState } from 'react';
import passwordRecovery from '../IMG/passwordrecovery.png';
import { useNavigate } from 'react-router';
import { TextCustom } from '../Components/TextCustom';
import swal from '@sweetalert/with-react';
import axios from 'axios';

export const PreguntasPerfil = props => {

  const [Preguntas, setPreguntas] = useState([]);
  const urlPreguntas = 'http://localhost:3000/api/preguntas';
  const urlRespuestas = 'http://localhost:3000/api/preguntas/respuestas/agregar';

    //parametros
  const [Parametro, setParametro] = useState([]);
/*   const urlParametro = 'http://localhost:3000/api/parametros/AdminPreguntas';
  useEffect(() => {
    axios.get(urlParametro).then(response => {
      setParametro(response.data)
      console.log(response.data);
    })
      .catch(error => console.log(error));
  }, []);
 */



  const dataId = {
    Id_Usuario: props.idUsuario,
    user: props.user,
  };
  //  console.log(dataId);

  const navegate = useNavigate();

  //para las preguntas
  useEffect(() => {
    //console.log(data);
    axios.get(urlPreguntas).then(response => {
      setPreguntas(response.data);
    }).catch(error => console.log(error))
  }, []);



  const handleClick = async () => {



    const Id_Pregunta = parseInt(document.getElementById('Id_preguntas').value);
    const respuestap = document.getElementById('respuestap').value;



    let data = {
      idPregunta: Id_Pregunta,
      respuesta: respuestap,
      idUser: props.idUsuario,
      creadoPor: props.infoPerfil.nombre,
    };


    console.log(data);

    await axios.post(urlRespuestas, data).then(response => {
      swal("Pregunta registrada correctamente", "", "success").then(() => navegate('/Preguntas/lista'))
    });


  };

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
                <select id="Id_preguntas" className="inputCustomPreguntas">
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
              onClick={handleClick}
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
