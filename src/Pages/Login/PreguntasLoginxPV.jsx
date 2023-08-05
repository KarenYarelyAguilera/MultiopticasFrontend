import React, { useEffect, useState } from 'react';
import passwordRecovery from '../../IMG/passwordrecovery.png';
import { useNavigate } from 'react-router';
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
  
  
    const handleClick = async () => {
  
      const Id_Pregunta = parseInt(document.getElementById('Id_preguntas').value);
      const respuestap = document.getElementById('respuestap').value;
  
      let data = {
        idPregunta: Id_Pregunta,
        respuesta: respuestap,
        idUser: props.idUsuario,
       creadoPor: props.user,
      };
      console.log(data);
  
      await axios.post(urlRespuestas, data).then(response => {
        swal("Pregunta registrada correctamente", "", "success").then(() => navegate('/loginPrimeraVez'))
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
                  maxLength="20"
                  type="text"
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
                type="button"
                value="Guardar"
                onClick={handleClick}
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