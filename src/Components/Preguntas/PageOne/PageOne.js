import React from 'react';
import { TextCustom } from '../../TextCustom';
// import "./PageOne.css";
import '../../../Styles/RecuperacionPassword.css';

export const PageOne = ({ onButtonClick }) => {
  return (
    <main>
      <form className="measure">
        <div className="contPrincipalRecu">
          <div className="divInfoQuestionResp">
            <TextCustom
              text="Ingrese correo electronico o usuario:"
              className="titleInput"
            />
            <div className="contInput">
              <input type="text" name="" className="inputCustom" />
            </div>
          </div>
        </div>
        <div className="divSubmitQuestion">
          <input
            className="btnSubmitPreguntas"
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
