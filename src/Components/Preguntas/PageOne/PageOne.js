
import { TextCustom } from '../../TextCustom';
// import "./PageOne.css";
import '../../../Styles/RecuperacionPassword.css';
import React, { useRef, useState } from 'react';
export const PageOne = ({ onButtonClick }) => {


  const [correo, setCorreo] = useState("");
  const [textoCorreo, setTextoCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState(false);

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
              <input
              onKeyDown={(e) => {
                setCorreo(e.target.value)
                var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!expresion.test(correo)) {
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
                if (correo === '') {
                  setErrorCorreo(true);
                  setTextoCorreo('Los campos no deben estar vacios');
                } else {
                  setErrorCorreo(false);
                  setTextoCorreo('');
                }
              }}
              maxLength={30}
              error={errorCorreo}
              helperText={textoCorreo}

              type="text" name="" className="inputCustom" />
            </div>
            <p className='error'>{textoCorreo}</p>
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
