import React from 'react';
import { TextCustom } from '../TextCustom';
// import "./PageOne.css";
import '../../Styles/RecuperacionPassword.css';

export const PageOne = ({ onButtonClick }) => {
  return (

    <main>
      <form className="measure">
        <div className="contPrincipalRecu">
          <div className='divInfoQuestionResp'>
          <TextCustom text="Preguntas:" className="titleInput" />
          <div className="contInput">
            <select className="inputCustom" name="">
              <option value="1">Pregunta Numero 1</option>
              <option value="1">Pregunta Numero 2</option>
              <option value="1">Pregunta Numero 3</option>
              <option value="1">Pregunta Numero 4</option>
            </select>
          </div>

          </div>

          <div className='divInfoQuestionResp'>

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
        <div className='divSubmitQuestion'>
          <input
            className="f6 grow br2 ph3 pv2 mb2 dib white"
            style={{
              borderStyle: 'none',
              borderRadius: '10px',
              width: '100%',
              backgroundColor: '#316ee6',
            }}
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
