import React from 'react';
import passwordRecovery from '../../IMG//registration.png';
import { TextCustom } from '../../Components/TextCustom';
import { useNavigate } from 'react-router';

export const Registration = props => {
  const navegate = useNavigate();

  const handleProgress = () => {
    navegate("/progress")
  }

  const handleLogin = () => {
    navegate("/home")
  }

  return (
    <div className="divRegistration">
      <div className="divImgSection">
        <img src={passwordRecovery} alt="Iamgen no encontrada" />
      </div>

      <div className="divSectionRegis">
        <div className="titleRegistration">
          <h2>Registrate</h2>
          <h3>Gracias por confiar y formar parte de la familia Multioptica</h3>
        </div>

        <div className="divInfoQuestionRegis">
          <div className="sectInput">
            <TextCustom text="Usuario" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Nombre" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Apellido" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Identidad" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Correo electrónico" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Contraseña" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>

          <div className="sectInput">
            <TextCustom text="Confirmar Contraseña" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustomRegis" />
            </div>
          </div>
        </div>
        <div className="divSubmitRegis">
          <button className="buttonCustomRegis" onClick={handleProgress}>Registrar</button>
        </div>

        <span className="refInicioSesion">
          <b>
            ¿Ya tienes una cuenta? <a href="/home">Inicia Sesión</a>
          </b>
        </span>
      </div>
    </div>
  );
};
