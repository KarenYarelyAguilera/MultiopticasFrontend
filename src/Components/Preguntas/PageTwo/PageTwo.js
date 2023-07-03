//import React from 'react';
import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const PageTwo = ({ onButtonClick,correo1 }) => {



  const urlUserExist = 'http://localhost:3000/api/login';

  //const [email,setEmail]=useState('');
  const [pasar, setPasar]=useState(false)






  const handleClick = async () => {

    const respuesta = document.getElementById('respuesta').value;
  
    let data = {
      correo:respuesta,
    };


   /*    await axios.post(urlUserExist, data).then(response=>{
          if(response.data.length<0){
            swal("El correo que ingreso no existe.", "", "error")
            
          }else{
            onButtonClick('pagethree');
          } 
      }); 
  */

/* 
      await axios.post(urlUserExist, data).then(response=>
        setPasar(response.data));
      console.log(pasar)
      return pasar;
 */



     if (correo1 === respuesta) { 
        
     /*  await axios.post(urlUserExist, data).then(response=>{
        if(response.data.length<0){
          swal("El correo que ingreso no existe.", "", "error")
        }else{
          onButtonClick('pagethree');
        }
      })  */

        await axios.post(urlUserExist, data).then(response=>
            setPasar(response.data));
          console.log(pasar)
          return pasar;
          /*  */

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
              type="text"
              name=""
              className="inputCustom"
              placeholder="Respuesta"
              id='respuesta'
            />
          </div>
          </div>
        </div>
        <div className='divSubmitRecuperacion'>
          <input
            className="btnSubmit"
            type="button"
            value="Siguiente"
           // onClick={handleClick}

            
            onClick={() => {

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
              
            }}  
            


          />
        </div>
      </form>
    </main>
  );
};

export default PageTwo;