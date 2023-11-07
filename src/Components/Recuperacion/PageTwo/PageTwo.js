import React from 'react';
import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';
import axios from 'axios';

export const PageTwo = ({ onButtonClick, correo1, id, autor }) => {
  const urlUserExist = 'http://localhost:3000/api/login';
  const urlEnviarCodigo = 'http://localhost:3000/api/token/enviarCodigo';

  const handleClick = async () => {
    const respuesta = document.getElementById('respuesta').value;
    if (respuesta) {
      const data = {
        correo: respuesta,
      };
      await axios.post(urlUserExist, data).then(response => {
        console.log(response.data);
        if (response.data !== false) {
          console.log(response.data === false)
          id(response.data[0].Id_Usuario);
          autor(response.data[0].Nombre_Usuario);
          correo1(respuesta)

          const data2 = {
            correo: respuesta,
            id: response.data[0].Id_Usuario,
          };

          axios
            .post(urlEnviarCodigo, data2)
            .then(() => onButtonClick('pagethree'));
        } else{
          swal(
            'El correo que ingreso no coincide con el correo que proporcionó anteriormente.',
            '',
            'error',
          );
        }
      });
    } else {
      swal(
        'El correo que ingreso no coincide con el correo que proporcionó anteriormente.',
        '',
        'error',
      );
    }
  };
  return (
    <main>
      {/*  <div className="titleRecuperacion">
          <h2>Codigo de confirmación</h2>
          <h3>Asegurese que la dirección del correo que ingresaste sea la correcta para enviar el codigo de confirmación.</h3>
        </div> */}
      <form className="measure">
        <div className="contPrincipalRecuperacion">
          <div className="divInfoRecuperacion">
            <TextCustom
              text="Asegurese que la dirección del correo que ingresaste sea la correcta para enviar el codigo de confirmación."
              className="titleInput"
            />
            <div className="contInput">
              <input
                type="text"
                name=""
                className="inputCustom"
                placeholder="Respuesta"
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
