import React from 'react';
import { TextCustom } from '../../TextCustom';
// import "./PageOne.css";
import '../../../Styles/RecuperacionPassword.css';

export const PageOne = ({ onButtonClick }) => {
  return (

    <main>
      <div className="titleRecuperacion">
          <h2>Confirme tu correo electrónico</h2>
          <h3>Confirma tu identidad introduciendo el correo que utilizaste a la hora de crear la cuenta</h3>
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
            onClick={() => onButtonClick('pagetwo')}
          />
        </div>
      </form>
    </main>

  );
};

export default PageOne;
