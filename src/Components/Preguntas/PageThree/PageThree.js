import React from 'react';

import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';

export const PageThree = ({ onButtonClick }) => {
  return (
    <main>
      <form className="measure">
        <div className="contPrincipalRecu">
          <div className="divInfoQuestionResp">
            <TextCustom text="Preguntas:" className="titleInput" />
            <div className="contInput">
              <select className="inputCustomPreguntas" name="">
                <option value="1">Pregunta Numero 1</option>
                <option value="1">Pregunta Numero 2</option>
                <option value="1">Pregunta Numero 3</option>
                <option value="1">Pregunta Numero 4</option>
              </select>
            </div>
          </div>

          <div className="divInfoQuestionResp">
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
        <div className="divSubmitQuestion">
          <input
            className="btnSubmitPreguntas"
            type="submit"
            value="Enviar"
            // onClick={() => onButtonClick('pagetwo')}
          />
        </div>
      </form>
    </main>
  );
};

export default PageThree;
