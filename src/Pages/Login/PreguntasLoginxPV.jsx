import React, { useEffect, useState, useRef } from 'react';
import passwordRecovery from '../../IMG/passwordrecovery.png';
import { Await, useNavigate } from 'react-router';
import { TextCustom } from '../../Components/TextCustom';
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

import '../../Styles/Usuarios.css';

export const PreguntasLoginxPV = props => {

  const navegate = useNavigate();
  const [Preguntas, setPreguntas] = useState([]);
  const urlPreguntas = 'http://localhost:3000/api/preguntas';
  const urlRespuestas = 'http://localhost:3000/api/preguntas/respuestas/agregar';
  const urlParametro = 'http://localhost:3000/api/parametros/AdminPreguntas';


  const [Resp, setResp] = useState(props.data.Respuesta || '');
  const [errorResp, setErrorResp] = useState(false);
  const [Msj, setMsj] = useState('');
  const [NumPreg, setNumPreg] = useState(1);
  const [Contador, setContador] = useState(1);


  const dataId = {
    Id_Usuario: props.idUsuario,
    user: props.user,
  };
  //  console.log(dataId);



//para el parametro
  useEffect(() => {
    axios.get(urlParametro).then(response => {
      setNumPreg(response.data);
      //console.log(NumPreg);
    }).catch(error => console.log(error))
  }, []);

  //para las preguntas
  useEffect(() => {
    axios.get(urlPreguntas).then(response => {
      setPreguntas(response.data);
    }).catch(error => console.log(error))
  }, []);




  const handleClick = async () => {
    try {
      const Id_Pregunta = parseInt(document.getElementById('Id_preguntas').value);
      const respuestap = Resp;

      let data = {
        idPregunta: Id_Pregunta,
        respuesta: respuestap,
        idUser: props.idUsuario,
        creadoPor: props.user,
        fechaCrea: new Date(),
      };
      //console.log(data);

      setContador(Contador + 1); // Incremento


      if (Contador < NumPreg) {
        setResp('');// Limpiar la respuesta

        await axios.post(urlRespuestas, data).then(response => {
            swal("Pregunta registrada correctamente", "", "success");
          }).catch(error => {
            setContador(Contador - 1);// Decrementar el contador en caso de error
            swal("Error al registrar su respuesta, verifique si ya ha agregado esta pregunta", "", "error");
          });

      }else {
        await axios.post(urlRespuestas, data)
        swal("Preguntas configuradas correctamente", "", "success");
        navegate('/cambiocontrasenia');
      }

    } catch (error) {
      console.log('error');
      swal("Error al ingresar la pregunta y respuesta", "", "error");
    }


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
            <label className="titleInput">Ingrese su respuesta:</label>
            <div className="contInput">
              <input
                onChange={e => {
                  const value = e.target.value;
                  setResp(value);

                  if (value === '') {
                    setErrorResp(true);
                    setMsj('Los campos no deben estar vacíos');
                  } else {
                    setErrorResp(false);
                    const regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(value)) {
                      setErrorResp(true);
                      setMsj('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(value)) {
                      setErrorResp(true);
                      setMsj('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrorResp(false);
                      setMsj('');
                    }
                  }
                }}
                error={errorResp}
                type="text"
                helperText={Msj}
                minLength={5}
                maxLength={100}
                name="respuestap"
                className="inputCustom"
                placeholder="Respuesta"
                id='Respuesta'
                value={Resp}

              />
            </div>
            <p className="error">{Msj}</p>
          </div>

          <div className='divSubmitQuestion'>
            <input
              className="btnSubmitPreguntas"
              type="button"
              value="Guardar"
              onClick={() => {
                const respuestap = Resp;

                if (respuestap === '') {
                  swal('No deje campos vacíos.', '', 'error');
                } else if (respuestap.length < 4 || respuestap.length > 50) {
                  swal('La longitud del campo debe estar entre 5 y 50 caracteres.', '', 'error');
                } else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(respuestap)) {
                  swal('El campo solo acepta letras mayúsculas y solo un espacio entre palabras.', '', 'error');
                } else if (/(.)\1{2,}/.test(respuestap)) {
                  setErrorResp(true);
                  swal('El campo nombre no acepta letras mayúsculas consecutivas repetidas.', '', 'error');
                } else {
                  handleClick();

                }
              }}

            />
          </div>
        </form>

      </div>
      <div className="divImgSection">
        <img src={passwordRecovery} alt="Iamgen no encontrada" />
      </div>
    </div>
  );


}