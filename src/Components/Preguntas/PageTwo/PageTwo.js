//import React from 'react';
import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const PageTwo = ({ onButtonClick, correo1, id, autor }) => {

  const [email, setCorreo] = useState("");
  const [textoCorreo, setTextoCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState(false);

  const urlUserExist = 'http://localhost:3000/api/login';
  const urlPreguntas = 'http://localhost:3000/api/preguntas';

  //const [email,setEmail]=useState('');
  const [pasar, setPasar]=useState(false)

  const data={
    correo:correo1
  }
  
    const handleClick = async () => {
      const respuesta = document.getElementById('respuesta').value;
      if (correo1 === respuesta) {
        
        await axios.post(urlUserExist,data).then(response=>{
          
          id(response.data[0].Id_Usuario)
          autor(response.data[0].Nombre_Usuario)
          
          if (response.data) {
  
            const data2 = {
              "correo": correo1,
              "id": response.data[0].Id_Usuario,
            };
    
            axios.post(urlUserExist, data2).then(()=> onButtonClick('pagethree')).catch(() => {
              swal("Ocurrió un error al realizar la segunda petición POST");
            });

          }else{
            swal("El correo que ingreso es erroneo o no esta registrado", "", "error")
          }
  
         
        
        }).catch(() => {
          swal("Verifique si el correo que ingreso es correcto", "", "error");
        });
        
      } else {
        swal("El correo que ingreso no coincide con el correo que proporcionó anteriormente.", "", "error")
      }
    };





  return (
    <main>
      
    
      <form className="measure">
        <div className="contPrincipalRecuperacion">
          <div className='divInfoRecuperacion'>
            
          <TextCustom text="Confirme su correo electrónico:" className="titleInput" />
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
              placeholder="Respuesta"
              id='respuesta'
            />
          </div>
          <p className='error'>{textoCorreo}</p>
          </div>
        </div>
        <div className='divSubmitRecuperacion'>
          <input
            className="btnSubmit"
            type="button"
            value="Siguiente"
            onClick={handleClick}

            
           /*  onClick={() => {

              handleClick()

                if (pasar===false) {
                  swal(
                    'Revise su dirección de correo electrónico',
                    '',
                    'warning',
                  )
                }else{
                  onButtonClick('pagethree')
                } 
              
            }}  */ 
            


          />
        </div>
      </form>
    </main>
  );
};

export default PageTwo;
