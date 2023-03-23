import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import React from 'react';
import { TextCustom } from '../Components/TextCustom';
import { sendData } from '../scripts/sendData';
import { useState,useEffect } from 'react';

//MuiMaterial-Icons
//import WarningIcon from '@mui/icons-material/Warning';

//Styles
import '../Styles/RecuperacionPassword.css';
import swal from '@sweetalert/with-react';

export const PreguntasSeguridad = (props) => {
  const navegate = useNavigate();
  const [Parametro, setParametro] = useState(1)
  // const [errorMessage, seterrorMessage] = useState('');
  // const [respuesta, setrespuesta] = useState('');

  useEffect(() => {
    fetch(urlPreguntas).then(resp=>resp.json()).then(data=>setParametro(parseInt(data.valor)))
  }, [])
  

  var today = new Date()
  var dateFormat = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate()
  const urlIPreguntas = "http://localhost/APIS-Multioptica/preguntas/controller/preguntas.php?op=nuevaPregunta"
  const urlUser = "http://localhost/APIS-Multioptica/login/controller/user.php?op=user"
  const urlIResp = "http://localhost/APIS-Multioptica/preguntas/controller/preguntas.php?op=nuevaRespuesta"
  const urlPreguntas = "http://localhost/APIS-Multioptica/parametros/controller/parametro.php?op=preguntas"
  const urlUpduser = "http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=fLogin"

  const datausr = {
    correo: props.mail
  }
  const datausrPL={
    nPreguntas:Parametro,
    correo:props.mail
  }

  async function handleAvanzar (parametro)   {
    const respJson = await sendData(urlUser, datausr)
    console.log(respJson[0].Id_Usuario)


   for (let i = 0; i < parametro; i++) {
    const x = i+1
     const data = {
       pregunta: document.getElementById(`pregunta-${x}`).value,
       autor: props.user,
       fechaActual: dateFormat
     }
  
     const dataR = {
       idautor: respJson[0].Id_Usuario,
       respuesta: document.getElementById(`resp-${x}`).value,
       autor: props.user,
       fechaActual: dateFormat
     }
     if (validacionVacio(Parametro)) {
         if (await sendData(urlIPreguntas, data) && await sendData(urlIResp, dataR)) {
          await sendData(urlUpduser,datausrPL)
           
       }else{
         swal("Ocurrio un error", "", "error")
       }
     }else{
      swal("No deje campos vacios")
     }

   }
   alert("Pregunta guardada con exito")
           navegate('/preguntasSeguridad/confirmarPassword');
  }

  const validacionVacio = parametro=>{
    const validacion = []

    for (let i = 0; i < parametro; i++) {
      const x = i+1
       if (document.getElementById(`pregunta-${x}`).value !== "" && document.getElementById(`resp-${x}`).value !== "") {
        validacion.push(1)
      }else{
        validacion.push("vacio")
      }

    }
    return todosIguales(validacion)
  }

  function todosIguales(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "vacio") {
        return false;
      }
    }
    return true;
  }

  const renderPreguntas = parametro =>{
    const inputs = Array.from({length:parametro},(_,i)=>i+1)

    return(
      <div className="contPrincipalRecu">
        {inputs.map((i)=>(
          <div key={i}>
              <TextCustom text='Pregunta de seguridad' className="titleInput"/>
            <div className="contInput">
            <input
              type="text"
              name=""
              className="inputCustom"
              placeholder="Pregunta"
              id={`pregunta-${i}`}
            />
          </div>

          <TextCustom text='Respuesta' className="titleInput"/>
          <div className="contInput">
            <input
              type="text"
              name=""
              className="inputCustom"
              placeholder="Respuesta"
              id={`resp-${i}`}
            // onChange={handleChange}
            // value={respuesta}
            />
          </div>
          </div>
        ))}
      </div>
    )
  }

  //   const handleChange = event => {
  //     setrespuesta(event.target.value);

  //     console.log('value is:', event.target.value);
  //   };

  return (
  <div className="contRecuperaPassword">
  <div className="titleRecuPassword">
  <h2>Preguntas de Seguridad</h2>
  <h3>
  Estas preguntas nos ayudarán a tener una mejor seguridad al iniciar
  sesion.
  </h3>
   </div>

      <div className="sectionRecuPassword">
        <br />
        <br />
        {/* <div className="contPrincipalRecu">
          <div className="contInput">
          <TextCustom text="Pregunta de seguridad" className="titleInput" />
          <input
          type="text"
          name=""
              className="inputCustom"
              placeholder="Pregunta"
              id='pregunta'
              />
              </div>
              
              <div className="contInput">
              <TextCustom text="Respuesta" className="titleInput" />
              <input
              type="text"
              name=""
              className="inputCustom"
              placeholder="Respuesta"
              id='resp'
              // onChange={handleChange}
              // value={respuesta}
              />
              </div>
            </div> */}
          {renderPreguntas(Parametro)}

        <div className="contBtnPre">
          <Button
            className="btnSubmitpre"
            variant="container"
            // onClick={e => validate(e.target.value)}
            onClick={()=>handleAvanzar(Parametro)}
          >
            Comprobar
          </Button>
        </div>
        {/* {errorMessage === '' ? null : (
          <div className="ErrorMessage">
            <WarningIcon
              style={{ paddingRight: 15, fontSize: 35, color: 'white' }}
            />
            {errorMessage}
          </div>
        )} */}
      </div>
    </div>
  );
};
