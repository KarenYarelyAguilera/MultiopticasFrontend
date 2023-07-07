import React, { useRef, useState } from 'react';
import { TextCustom } from '../../TextCustom';
// import "./PageOne.css";
import '../../../Styles/RecuperacionPassword.css';



export const PageOne = ({ onButtonClick, correo }) => {

  const [email, setCorreo] = useState("");
  const [textoCorreo, setTextoCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState(false);

  return (
    <main>
      <form className="measure">
        <div className="contPrincipalRecu">
          <div className="divInfoQuestionResp">

            <TextCustom
              text="Ingrese su correo electronico:"
              className="titleInput"
            />

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
              maxLength={30}
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
        
        
        <div className="divSubmitQuestion">
          <input
            className="btnSubmitPreguntas"
            type="button"
            value="Siguiente"
            onClick={() => {
              correo(document.getElementById('respuesta').value)
              onButtonClick('pagetwo')}}
          />
        </div>


      </form>
    </main>
  );
};

export default PageOne;
