import React from 'react';
import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';

export const PageTwo = ({ onButtonClick,correo1 }) => {
  const handleClick = () => {
    const respuesta = document.getElementById('respuesta').value;
    if (correo1 === respuesta) {
      onButtonClick('pagethree');
      
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
