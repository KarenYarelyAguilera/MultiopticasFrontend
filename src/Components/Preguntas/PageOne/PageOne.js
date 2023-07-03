
import { TextCustom } from '../../TextCustom';
// import "./PageOne.css";
import '../../../Styles/RecuperacionPassword.css';



export const PageOne = ({ onButtonClick, correo }) => {

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
                type="text"
                name=""
                className="inputCustom"
                placeholder="Respuesta"
                id='respuesta'
              />
            </div>

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
