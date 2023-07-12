
import { TextCustom } from '../../TextCustom';
// import "./PageTwo.css";
import '../../../Styles/RecuperacionPassword.css';

export const PageTwo = ({ onButtonClick, correo }) => {
  return (

    <main>
      <div className="titleRecuperacion">
          <h2>Confirme tu correo electrónico</h2>
          <h3>Confirma tu identidad introduciendo el correo que utilizaste a la hora de crear la cuenta</h3>
        </div>
      <form className="measure">
        <div className="contPrincipalRecuperacion">
          <div className='divInfoRecuperacion'>

          <TextCustom text="Correo electronico:" className="titleInput" />
          <div className="contInput">
            <input
              type="text"
              name=""
              className="inputCustom"
              id='respuesta'
            />
          </div>
          </div>
        </div>
        <div className='divSubmitRecuperacion'>
          <input
            className="btnSubmit"
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

export default PageTwo;