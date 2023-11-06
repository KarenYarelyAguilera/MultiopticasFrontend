//import React from 'react';
import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';
import { useNavigate } from 'react-router';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toBePartiallyChecked } from '@testing-library/jest-dom/matchers';


export const PageThree = ({ onButtonClick, correo, id, props }) => {

  const [Preguntas, setPreguntas] = useState([]);
  const urlPreguntas = 'http://localhost:3000/api/preguntas';
  const urlRespuestas = 'http://localhost:3000/api/preguntas/compararR';
  const urlBloquearUsu = "http://localhost:3000/api/usuario/estado"
  // const urlId = 'http://localhost:3000/api/token/id';
  const urlIntentos = 'http://localhost:3000/api/parametros/AdminIntentos'; //URL para obtener el valor del parametro

  const [NumInt, setNumInt] = useState(0); 
  const [Contador, setContador] = useState(1);
  const [Resp, setResp] = useState('');
  const [errorResp, setErrorResp] = useState(false);
  

  //
  //const [id, setId] = useState(0);
  const [pasar, setPasar] = useState(false)
  //
  const navegate = useNavigate();


//para el parametro
useEffect(() => {
  axios.get(urlIntentos).then(response => {
    setNumInt(response.data);
    //console.log(NumInt);
  }).catch(error => console.log(error))
}, []);

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

      let data = {
        correo: correo,
        Id_Pregunta: Id_Pregunta,
        Respuesta: respuestap,
        Id_Usuario: id,

      };


      console.log(data);

      await axios.post(urlRespuestas, data).then(response => {

         let dataId = {
          correo: correo,
        }
        console.log(dataId);
        
        //setContador(Contador +1);

        if (response.data == true) {
          onButtonClick('pagefour')
        } else if (Contador < NumInt){ 
          setContador(Contador +1);
          //console.log("INTENTO NUMERO: "+Contador);
          swal(
            'Respuesta incorrecta.',
            '',
            'error',
          )
          setResp('');
         } else {
          swal(
            '¡Usuario Bloqueado! Comuniquese con el Administrador.',
            '',
            'warning',
          )
          axios.put(urlBloquearUsu, dataId).then(response => {
            console.log(response.data);
          });
          navegate('/')
         
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
         
            <div className="contInput" style={{ fontSize: "17px" }}>
              <TextCustom text="Preguntas:" className="titleInput" />
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

            <div className="contInput" style={{ fontSize: "17px" }}>
              <TextCustom text="Respuesta:" className="titleInput" />
              <input
                onChange={e => {
                  const value = e.target.value;
                  setResp(value);

                  if (value === '') {
                    setErrorResp(true);
                    //setMsj('Los campos no deben estar vacíos');
                    swal("No deje el campo vacio", "","error")
                  }
                }}
                maxLength="20"
                type="text"
                name=""
                className="inputCustom"
                placeholder="Respuesta"
                id='respuestap'
                value={Resp}
              />
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

