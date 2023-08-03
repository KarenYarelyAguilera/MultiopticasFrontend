import React, { useEffect, useState } from 'react';
import passwordRecovery from '../IMG/passwordrecovery.png';
import { useNavigate } from 'react-router';
import { TextCustom } from '../Components/TextCustom';
import swal from '@sweetalert/with-react';
import axios from 'axios';

export const EditarPreguntas = props => {

  const [Preguntas, setPreguntas] = useState([]);
  const urlPreguntas = 'http://localhost:3000/api/preguntas';
  const urlRespuestas = 'http://localhost:3000/api/preguntas/respuestas/agregar';

  const urlPyR= 'http://localhost:3000/api/pregYresp';
  const urlRespuesta='http://localhost:3000/api/respuesta';
  const urlPregunta = 'http://localhost:3000/api/pregunta';
  const urlPyREditar= 'http://localhost:3000/api/pyr/editar';
  
  const navegate = useNavigate();
  const [dato, setDato] = useState([]);




  const dataId = {
    Id_Usuario: props.idUsuario,
    //user: props.user,
  };
 // console.log(dataId);

 
  //para las preguntas
  useEffect(() => {
    axios.get(urlRespuesta).then(response => {
      setDato(response.data);
      console.log(response.data);
    }).catch(error => console.log(error))
  }, []);


  const data= {
    Id_Pregunta: props.data.Id_Pregunta,
    Pregunta:props.data.Pregunta,
  };
  console.log(data)


  useEffect(() => {
    axios.get(urlPregunta,data).then(response => {
      setPreguntas(response.data);
      console.log(response.data);
    }).catch(error => console.log(error))
  }, []);





const handleClick = async () => {




   // const Id_Pregunta = parseInt(document.getElementById('Id_preguntas').value);
    const respuestap = document.getElementById('respuestap').value;



    let data = {
      Respuesta: respuestap,
      idUser: props.idUsuario,
      modificado_por: props.infoPerfil.nombre,
      Id_Pregunta: props.data.Id_Pregunta,
    };


    console.log(data);

    await axios.put(urlPyREditar, data).then(response => {
      
      swal("Pregunta actualizada correctamente", "", "success").then(() => navegate('/Preguntas/lista'))
    });


  };



  return (
    <div className="divSection">
      <div className="divInfoQuestion">
        <div className="titleRecuPassword">
          <h2>Editar preguntas de seguridad</h2>
          <h3>Responda cada pregunta para poder modificarla</h3>
{/*           <p>El dato desde la base de datos es: {dato}</p> */}
        </div>

        <form className="measure">
          <div className="contPrincipalRecu">

            <div className='divInfoQuestionResp'>
              <TextCustom text="Preguntas:" className="titleInput" />
              <div className="contInput">
              <input
                  maxLength="20"
                  type="text"
                  name=""
                  className="inputCustom"
                  placeholder="Respuesta"
                  id='Pregunta'
                  value={props.data.Pregunta}
                />
              </div>

                {/* <select id="Id_preguntas" className="inputCustomPreguntas">
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

                </select> */}

              {/* </div> */}
            </div>

            <div className='divInfoQuestionResp'>
              <TextCustom text="Respuesta:" className="titleInput" />
              <div className="contInput" >
           {/*    <p>El dato desde la base de datos es: {dato}</p> */}
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
