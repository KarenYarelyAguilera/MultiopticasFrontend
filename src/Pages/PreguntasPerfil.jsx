import React, { useEffect, useState } from 'react';
import passwordRecovery from '../IMG/passwordrecovery.png';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();
  const [Preguntas, setPreguntas] = useState([]);
  const urlPreguntas = 'http://localhost:3000/api/preguntas';
  const urlRespuestas = 'http://localhost:3000/api/preguntas/respuestas/agregar';
  const urlBPreguntaslAgg = 'http://localhost:3000/api/bitacora/nuevaPregunta';
  const urlParametro = 'http://localhost:3000/api/parametros/AdminPreguntas';


  const [Resp, setResp] = useState(props.data.Respuesta || '');
  const [errorResp, setErrorResp] = useState(false);
  const [Msj, setMsj] = useState('');
  const [NumPreg, setNumPreg] = useState(0);
  const [Contador, setContador] = useState(0);


  //para el parametro
  useEffect(() => {
    axios.get(urlParametro).then(response => {
      setNumPreg(response.data);
      //console.log(NumPreg);
      if (response.data===Contador) {
        swal("Preguntas configuradas", "", "success");
        navigate('/config/perfil')
      }
    }).catch(error => console.log(error))
  }, []);


  //para las preguntas
  useEffect(() => {
    axios.get(urlPreguntas).then(response => {
      setPreguntas(response.data);
    }).catch(error => console.log(error))
  }, []);

  const handleBack = () => {
    /*  swal({
       title: 'Advertencia',
       text: 'Hay un proceso de creación de una nueva pregunta de seguridad ¿Estás seguro que deseas salir?',
       icon: 'warning',
       buttons: ['Cancelar', 'Salir'],
       dangerMode: true,
     }).then((confirmExit) => {
       if (confirmExit) {
         navigate('/Preguntas/lista');
       }
     }); */
    navigate('/config/perfil');
  };

  const handleClick = async () => {
    try {
      const Id_Pregunta = parseInt(document.getElementById('Id_preguntas').value);
      const respuestap = Resp;


      const data = {
        idPregunta: Id_Pregunta,
        respuesta: respuestap.toUpperCase(),
        idUser: props.idUsuario,
        creadoPor: props.infoPerfil.nombre.toUpperCase(),
        fechaCrea: new Date(),
      };

      const dataId = {
        Id: props.idUsuario,
      };
      console.log(dataId);

      setContador(Contador + 1); // Incremento

      if (Contador < NumPreg) {
        setResp('');// Limpiar la respuesta

      await axios.post(urlRespuestas, data).then(response => {
        axios.post(urlBPreguntaslAgg, dataId)
        swal("Pregunta registrada correctamente", "", "success")
      }).catch(error => {
        setContador(Contador - 1);// Decrementar el contador en caso de error
        swal("Error al registrar su respuesta, verifique si ya ha agregado esta pregunta", "", "error")
      });
    }else {
      swal("Finalizado", "", "success");
      navigate('/config/perfil');
    }
    } catch (error) {

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
            <label className="titleInput">Preguntas de configuración:</label>
            <div className="contInput">
              <select id="Id_preguntas" className="inputCustomPreguntas">
                {Preguntas.length ? (
                  Preguntas.map(pre => (
                    <option key={pre.Id_Pregunta} value={pre.Id_Pregunta}>
                      {pre.Pregunta}
                    </option>
                  ))
                ) : (
                  <option value="No existe información">
                    No existe información
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
                    setMsj('Los campos no deben estar vacíos, ingrese mas de 5 caracteres');
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
              //onClick={handleClick}
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
                  handleClick()
                }

              }}

            />
            <br />
           {/*  <input
              className="btnSubmitPreguntas"
              type="button"
              value="Cancelar"
              onClick={handleBack}
            /> */}
          </div>
        </form>
      </div>
      <div className="divImgSection">
        <img src={passwordRecovery} alt="Imagen no encontrada" />
      </div>
    </div>
  );
};