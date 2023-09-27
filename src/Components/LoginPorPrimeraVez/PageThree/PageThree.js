//import React from 'react';
import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';
import { useNavigate } from 'react-router';

import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const PageThree = ({ onButtonClick, correo, id, autor  }) => {

  const [Preguntas, setPreguntas] = useState([]);
  const urlPreguntas = 'http://194.163.45.55:4000/api/preguntas';
  const urlRespuestas = 'http://194.163.45.55:4000/api/preguntas/respuestas/agregar';
  // const urlBloquearUsu="http://194.163.45.55:4000/api/usuario/estado"
  // const urlId = 'http://194.163.45.55:4000/api/token/id';

//
  //const [id, setId] = useState(0);
  const [pasar,setPasar]=useState(false)
//
const navegate = useNavigate();

 
  //para las preguntas
  useEffect(() => {
    //console.log(data);
    axios.get(urlPreguntas).then(response =>{
      setPreguntas(response.data);
     }).catch(error => console.log(error))
   },[]);

   

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


    const Id_Pregunta =parseInt(document.getElementById('Id_preguntas').value);
    const respuestap = document.getElementById('respuestap').value;
    


    let data = {
      idPregunta:Id_Pregunta,
      respuesta: respuestap,
      idUser: id,
      creadoPor:autor
    };


    //console.log(data);

     await axios.post(urlRespuestas, data).then(response=>{
      swal("Pregunta registrada correctamente","","success").then(()=>onButtonClick('pagefour'))
      });
     
  
  };
 




  

  return (
    <main>
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

