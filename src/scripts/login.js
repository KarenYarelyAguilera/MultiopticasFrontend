import { Input } from "@mui/material";
import swal from "@sweetalert/with-react";

export const ForgetPsswrd = () => {
  swal({
    buttons: {
      codigo: "Codigo de recuperacion via email",
      preguntas: "Preguntas secretas",
      cancel: "cancel",
    },
    content: (
      <div>
        <h1>¿Has olvidado tu contraseña?</h1>
        <p>Selecciona una opción de recuperación</p>
      </div>
    ),
  }).then((a) => {
    switch (a) {
      case "codigo":
        swal(
          <div>
            <h1>Codigo de recuperacion</h1>
            <p>Ingrese su correo para recibir un codigo de verificacion</p>
            <Input id="correo"></Input>
          </div>
        )
          .then((correo) => {
            correo = document.getElementById("correo").value;
            alert(correo);
          })
          .then(() => {
            swal(
              <div>
                <h1>Ingrese el codigo que se le proporcionó</h1>
                <Input id="codigoVerificacion"></Input>
              </div>
            )
              .then((codigo) => {
                codigo = document.getElementById("codigoVerificacion").value;
                alert(codigo);
              })
              .then(() => RestablecerContrasenia());
          });
        break;
      case "preguntas":
        //hacer esto una funcion aparte.
        swal(
          <div>
            <h1>Preguntas de seguridad</h1>
            <p>Ingrese su correo para mostrar sus preguntas de seguridad</p>
            <Input id="correo"></Input>
          </div>
        )
          .then((correo) => {
            correo = document.getElementById("correo").value;
            alert(correo);
          })
          .then(()=>{
            swal(
              <div>
                <h1>Responda sus preguntas de seguridad: </h1>
                <p>Pregunta 1: {console.log("Aqui se hace fetch de la pregunta para colocar el texto :v")}</p>
                <p>Respuesta: <Input id="resp1"/></p>
                <p>Pregunta 2: {console.log("Aqui se hace fetch de la pregunta para colocar el texto :v")}</p>
                <p>Respuesta: <Input id="resp2"/></p>
              </div>
            ).then(()=>{
              let resp1,resp2
              resp1=document.getElementById('resp1').value
              resp2=document.getElementById('resp2').value
              alert("resp1: "+resp1+"\nresp2: "+resp2)
              //desues de validar con la base
              RestablecerContrasenia()
            })
          })
        
        break;
      case "cancel":
        swal("cancel");
        break;

      default:
        break;
    }
  });
};

const RestablecerContrasenia = () => {
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
    </div>
  ).then(() => {
    let newPssword, newPsswordConfirm;

    newPssword = document.getElementById("newPasswrd").value;
    newPsswordConfirm = document.getElementById("newPasswrdConfirm").value;

    if (newPssword === "" || newPsswordConfirm === "") {
      swal("Debe llenar ambos campos", "", "error").then(() =>
        RestablecerContrasenia()
      );
    } else {
      if (newPssword === newPsswordConfirm) {
        swal("Contraseña actualizada con exito.", "", "success");
      } else {
        swal("Las contraseñas deben coincidir", "", "error").then(() =>
          RestablecerContrasenia()
        );
      }
    }
  });
};
