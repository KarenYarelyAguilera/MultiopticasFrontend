import React from 'react';
import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';
import axios from 'axios';

export const PageTwo = ({ onButtonClick,correo1,id, autor }) => {
  const urlUserExist = "http://localhost:3000/api/login"
  const urlEnviarCodigo = 'http://localhost:3000/api/token/enviarCodigo';

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
  
           axios.post(urlEnviarCodigo, data2).then(()=> onButtonClick('pagethree'))
        }else{
          swal("El correo que ingreso es erroneo o no esta registrado")
        }

       
      
      })
      
    } else {
      swal("El correo que ingreso no coincide con el correo que proporcionó anteriormente.", "", "error")
    }
  };
  return (
    <main>
      <div className="titleRecuperacion">
          <h2>Codigo de confirmación</h2>
          <h3>Asegurese que la dirección del correo que ingresaste sea la correcta para enviar el codigo de confirmación.</h3>
        </div>
      <form className="measure">
        <div className="contPrincipalRecuperacion">
          <div className='divInfoRecuperacion'>

          <TextCustom text="Respuesta:" className="titleInput" />
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
            onClick={handleClick}
          />
        </div>
      </form>
    </main>
  );
};
