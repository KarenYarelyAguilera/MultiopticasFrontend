import { Input} from '@mui/material';
import swal from '@sweetalert/with-react';

import { sendData } from './sendData';


export const ForgetPsswrd = (props) => {
  swal({
    buttons: {
      codigo: 'Codigo de recuperacion via email',
      preguntas: 'Preguntas secretas',
      cancel: 'cancel',
    },
    content: (
      <div>
        <h1>¿Has olvidado tu contraseña?</h1>
        <p>Selecciona una opción de recuperación</p>
      </div>
    ),
  }).then(a => {
    switch (a) {
      case 'codigo':
        swal(
          <div>
            <h1>Codigo de recuperacion</h1>
            <p>Ingrese su correo para recibir un codigo de verificacion</p>
            <Input id="correo"></Input>
          </div>,
        )
          .then(correo => {
            correo = document.getElementById('correo').value;
          })
          .then(data => {
            swal(
              <div>
                <h1>Ingrese el codigo que se le proporcionó</h1>
                <Input id="codigoVerificacion"></Input>
              </div>,
            )
              .then(codigo => {
                codigo = document.getElementById('codigoVerificacion').value;
                alert(codigo);
              })
              .then(() => RestablecerContrasenia());
          });
        break;
      case 'preguntas':
        //hacer esto una funcion aparte.
        swal(
          <div>
            <h1>Preguntas de seguridad</h1>
            <p>Ingrese su correo para mostrar sus preguntas de seguridad</p>
            <Input id="correo"></Input>
          </div>,
        )
          .then(correo => {
            correo = document.getElementById('correo').value;
            return correo;
          })
          .then(data => {
            window.location="http://localhost:3001/recuperacion"
          });

        break;
      case 'cancel':
        swal('cancel');
        break;

      default:
        break;
    }
  });
};

const RestablecerContrasenia = dataa => {
  swal(
    <div>
      <h1>Restablezca su contraseña</h1>
      <p>
        Para mayor seguridad su contraseña debe contener numeros y caracteres
        especiales
      </p>
      <p>
        Nueva contraseña: <Input id="newPasswrd"></Input>
      </p>
      <p>
        Confirme su contraseña: <Input id="newPasswrdConfirm"></Input>
      </p>
    </div>,
  ).then(async () => {
    let newPssword, newPsswordConfirm;

    newPssword = document.getElementById('newPasswrd').value;
    newPsswordConfirm = document.getElementById('newPasswrdConfirm').value;

    if (newPssword === '' || newPsswordConfirm === '') {
      swal('Debe llenar ambos campos', '', 'error');
      RestablecerContrasenia(dataa);
    } else {
      if (newPssword === newPsswordConfirm) {
        swal('Contraseña actualizada con exito.', '', 'success');

        const urlChangePsswrd =
          'http://localhost/APIS-Multioptica/login/controller/user.php?op=changepassword';
        let data = {
          password: newPssword,
          id: dataa,
        };
        const respJson = await sendData(urlChangePsswrd, data);
        alert(respJson);
      } else {
        swal('Las contraseñas deben coincidir', '', 'error').then(() =>
          RestablecerContrasenia(dataa),
        );
      }
    }
  });
};
