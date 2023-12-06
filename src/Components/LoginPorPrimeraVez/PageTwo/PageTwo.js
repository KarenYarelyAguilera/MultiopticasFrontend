import { TextCustom } from '../../TextCustom';
// import "./PageTwo.css";
import '../../../Styles/RecuperacionPassword.css';
import axios from 'axios';
import swal from '@sweetalert/with-react';

export const PageTwo = ({ onButtonClick, correo1, id,autor }) => {
  const data = {
    correo: correo1,
  };
  const urlUserExist = 'http://194.163.45.55:4000/api/login';
  const handleClick = async () => {
    const respuesta = document.getElementById('respuesta').value;
    if (correo1 === respuesta) {
      await axios.post(urlUserExist, data).then(response => {
        if (response.data) {
          id(response.data[0].Id_Usuario)
          autor(response.data[0].Nombre_Usuario)
          onButtonClick('pagethree');
        } else {
          swal('El correo que ingreso es erroneo o no esta registrado');
        }
      });
    }
  };
  return (
    <main>
      <div className="titleRecuperacion">
        <h2>Confirme tu correo electrónico</h2>
        <h3>
          Confirma tu identidad introduciendo el correo que utilizaste a la hora
          de crear la cuenta
        </h3>
      </div>
      <form className="measure">
        <div className="contPrincipalRecuperacion">
          <div className="divInfoRecuperacion">
            <TextCustom text="Correo electronico:" className="titleInput" />
            <div className="contInput">
              <input
                type="text"
                name=""
                className="inputCustom"
                id="respuesta"
              />
            </div>
          </div>
        </div>
        <div className="divSubmitRecuperacion">
          <input
            className="btnSubmit"
            type="button"
            value="Siguiente"
            onClick={handleClick}
          />
        </div>
      </form>
    </main>
  );
};

export default PageTwo;
