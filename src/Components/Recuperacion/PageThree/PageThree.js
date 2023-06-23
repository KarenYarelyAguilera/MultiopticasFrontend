import React from "react";

import { TextCustom } from "../../TextCustom";
import '../../../Styles/RecuperacionPassword.css';


export const PageThree = ({onButtonClick}) => {

    return (
      <main>
      <div className="titleRecuperacion">
          <h2>Envió de codigo</h2>
          <h3>Se te acaba de enviar a tu correo electrónico un codigo de confirmación para realizar el cambio de contraseña</h3>
        </div>
      <form className="measure">
        <div className="contPrincipalRecuperacion">
          <div className='divInfoRecuperacion'>

          <TextCustom text="Ingresa el codigo" className="titleInput" />
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
            value="Siguiente"
            onClick={() => onButtonClick('pagefour')}
          />
        </div>
      </form>
    </main>
    );
}

export default PageThree;