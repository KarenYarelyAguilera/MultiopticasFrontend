import React, { useEffect, useState } from 'react';
import passwordRecovery from '../IMG/passwordrecovery.png';
import { useNavigate } from 'react-router';
import { TextCustom } from '../Components/TextCustom';
import swal from '@sweetalert/with-react';
import axios from 'axios';

//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import '../Styles/Usuarios.css';

export const PreguntasPerfil = props => {

  const navegate = useNavigate();
  const [Preguntas, setPreguntas] = useState([]);
  const urlPreguntas = 'http://localhost:3000/api/preguntas';
  const urlRespuestas = 'http://localhost:3000/api/preguntas/respuestas/agregar';

  
  const [Resp, setResp] = React.useState(props.data.Respuesta || '');
  const [errorResp, setErrorResp] = React.useState();
  const [Msj, setMsj] = React.useState(false);


  const dataId = {
    Id_Usuario: props.idUsuario,
    user: props.user,
  };
  //  console.log(dataId);

  //para las preguntas
  useEffect(() => {
    axios.get(urlPreguntas).then(response => {
      setPreguntas(response.data);
    }).catch(error => console.log(error))
  }, []);

  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de una nueva pregunta de seguridad ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        navegate('/Preguntas/lista');
      } else {
      }
    });
  };


  const handleClick = async () => {

    const Id_Pregunta = parseInt(document.getElementById('Id_preguntas').value);
    const respuestap = document.getElementById('respuestap').value;

    let data = {
      idPregunta: Id_Pregunta,
      respuesta: respuestap.toUpperCase(),
      idUser: props.idUsuario,
      creadoPor: props.infoPerfil.nombre.toUpperCase(),
    };
    console.log(data);

    await axios.post(urlRespuestas, data).then(response => {
      swal("Pregunta registrada correctamente", "", "success").then(() => navegate('/Preguntas/lista'))
    });

  };

  return (
    <div className="divSection">
      <div className="divInfoQuestion">

        <div className="titleRecuPassword">
          <h2>Preguntas de seguridad</h2>
          <h3>Responda una de las preguntas para poder configurar su perfil</h3>
        </div>

        <form className="measure">
          <br />
          <br />
          <div className='divInfoQuestionResp'>
            <TextCustom text="Preguntas de configuración:" className="titleInput" />
            <div className="contInput">
              <select id="Id_preguntas" className="inputCustomPreguntas">
                {Preguntas.length ? (
                  Preguntas.map(pre => (
                    <option key={pre.Id_Pregunta} value={pre.Id_Pregunta}>
                      {pre.Pregunta}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>
                )}
              </select>
            </div>
          </div>
          <br />
          <br />
          <div className='divInfoQuestionResp'>
            <TextCustom text="Ingrese su respuesta:" className="titleInput" />
            <div className="contInput">
              <input
              onKeyDown={e => {
                setResp(e.target.value);
                if (Resp === '') {
                  setErrorResp(true);
                  setMsj('Los campos no deben estar vacíos');
                } else {
                  setErrorResp(false);
                  var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                  if (!regex.test(Resp)) {
                    setErrorResp(true);
                    setMsj('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                  } else if (/(.)\1{2,}/.test(Resp)) {
                    setErrorResp(true);
                    setMsj('No se permiten letras consecutivas repetidas');
                  } else {
                    setErrorResp(false);
                    setMsj('');
                  }
                }
              }}

                onChange={e => setResp(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errorResp}
                type="text"
                helperText={Msj}
                maxLength={100}
                name=""
                className="inputCustom"
                placeholder="Respuesta"
                id='respuestap'
              />
            </div>
          </div>
          <div className='divSubmitQuestion'>
            <input
              className="btnSubmitPreguntas"
              type="submit"
              value="Guardar"
             // onClick={handleClick}
             onClick={() => {

              var respuesta = document.getElementById("respuestap").value;

              if (respuesta === "") {
                swal("No deje campos vacíos.", "", "error");
              } else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(respuesta)) {
                swal("El campo nombre solo acepta letras mayúsculas y solo un espacio entre palabras.", "", "error");
              } else if (/(.)\1{2,}/.test(respuesta)) {
                setErrorResp(true);
                swal("El campo nombre no acepta letras mayúsculas consecutivas repetidas.", "", "error");
              } else {
                handleClick();
              }
            }}

            />
            <br />
            <input
              className="btnSubmitPreguntas"
              type="button"
              value="Cancelar"
              onClick={handleBack}
            />
          </div>
        </form>

      </div>
      <div className="divImgSection">
        <img src={passwordRecovery} alt="Iamgen no encontrada" />
      </div>
    </div>
  );
};
