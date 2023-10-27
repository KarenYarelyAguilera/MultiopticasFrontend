//import React from 'react';
import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';
import { useNavigate } from 'react-router';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toBePartiallyChecked } from '@testing-library/jest-dom/matchers';


export const PageThree = ({ onButtonClick, correo, id }) => {

  const [Preguntas, setPreguntas] = useState([]);
  const urlPreguntas = 'http://localhost:3000/api/preguntas';
  const urlRespuestas = 'http://localhost:3000/api/preguntas/compararR';
  const urlBloquearUsu = "http://localhost:3000/api/usuario/estado"
  // const urlId = 'http://localhost:3000/api/token/id';
  const urlIntentos = 'http://localhost:3000/api/parametros/AdminIntentos';
  const [ParamInt, setParamInt] = useState('');

  //
  //const [id, setId] = useState(0);
  const [pasar, setPasar] = useState(false)
  //
  const navegate = useNavigate();


  //para las preguntas
  useEffect(() => {
    //console.log(data);
    axios.get(urlPreguntas).then(response => {
      setPreguntas(response.data);
    }).catch(error => console.log(error))
  }, []);



  /*   const data = {
      "correo": correo,
    };  */

  //correo y id_usuario
  /*     useEffect(() => {
      console.log(data);
      axios.post(urlId, data).then(response => {
        setId(response.data);
      }).catch(error => console.log(error));
      }, [id]); 
   */

  /*    const data2 = {
      "Id_Pregunta":Id_Pregunta,
      "id": id,
      "Respuesta":Respuesta,
    };  */

  /*
   useEffect(() => {
    console.log(data2);
    axios.post(urlRespuestas, data2);
  }, [id]);*/



  //

  //


  const handleClick = async () => {

    try {
      const Id_Pregunta = parseInt(document.getElementById('Id_preguntas').value);
      const respuestap = document.getElementById('respuestap').value;
  
      const response = await axios.get(urlIntentos).then((response) => {
       // console.log(response.data[0]);
        let intentos = parseInt(response.data[0]);
        console.log("Los intentos permitidos son "+intentos)
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API:', error);
      });
      

      let data = {
        correo: correo,
        Id_Pregunta: Id_Pregunta,
        Respuesta: respuestap,
        Id_Usuario: id,
  
      };
  
  
      //console.log(data);
  
      await axios.post(urlRespuestas, data).then(response => {
  
        let dataId = {
          correo: correo,
        }
  
        if (response.data == false) {
  
          axios.put(urlBloquearUsu, dataId).then(response => {
            console.log(response.dataId);
          });
          navegate('/')
  
          swal(
            '¡Usuario Bloqueado! comuniquese con el administrador.',
            '',
            'warning',
          )
        } else {
          onButtonClick('pagefour')
  
        }
      });
  
      return pasar;
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }

  
  };







  return (
    <main>
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
            value="Siguiente"
            onClick={handleClick}

          /*  onClick={() => {

           handleClick()

             if (pasar===false) {
               swal(
                 'Por favor ingrese la respuesta correcta',
                 '',
                 'warning',
               )
             }else{
               onButtonClick('pagefour')
             } 
           
         }}   */

          />
        </div>
      </form>
    </main>
  );
};


export default PageThree;

