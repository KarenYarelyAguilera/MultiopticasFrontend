import React from "react";
import { TextCustom } from "../../TextCustom";
import '../../../Styles/RecuperacionPassword.css';

export const PageFour = () => {
    return (
      <main>
      <div className="titleRecuperacion">
          <h2>Ingrese una nueva contraseña</h2>
          <h3>Asegurate que la nueva contraseña tenga x caracteres los cuales debe de incluir letras mayusculas y minusculas.</h3>
        </div>
      <form className="measure">
        <div className="contPrincipalRecuperacion">
          <div className='divInfoRecuperacion'>

          <TextCustom text="Nueva contraseña" className="titleInput" />
          <div className="contInput">
            <input
              type="text"
              name=""
              className="inputCustom"
            />
          </div>
          </div>

          <div className='divInfoRecuperacion'>

          <TextCustom text="Confirme la nueva contraseña" className="titleInput" />
          <div className="contInput">
            <input
              type="text"
              name=""
              className="inputCustom"
            />
          </div>
          </div>
        </div>
        <div className='divSubmitRecuperacion'>
          <input
            className="btnSubmit"
            type="submit"
            value="Cambiar contraseña"
          />
        </div>
      </form>
    </main>
      
    );
};
