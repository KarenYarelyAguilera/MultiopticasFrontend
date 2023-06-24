import React from 'react';
import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';

export const PageTwo = ({ onButtonClick }) => {
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
            />
          </div>
          </div>
        </div>
        <div className='divSubmitRecuperacion'>
          <input
            className="btnSubmit"
            type="submit"
            value="Siguiente"
            onClick={() => onButtonClick('pagethree')}
          />
        </div>
      </form>
    </main>
  );
};
