import { Button } from '@mui/material';
import React, {useState } from 'react';
import { TextCustom } from '../Components/TextCustom';
import { sendData } from '../scripts/sendData';

//MuiMaterial-Icons
import WarningIcon from '@mui/icons-material/Warning';

//Styles
import '../Styles/RecuperacionPassword.css';

export const RecuperacionPassword =  (props) => {

 
  const [errorMessage, seterrorMessage] = useState('');
  const [respuesta, setrespuesta] = useState('');
  const [dataPreguntas, setdataPreguntas] = useState([]);

  
  const urlPreguntas = "http://localhost/APIS-Multioptica/login/controller/user.php?op=preguntas"
  const  data = {
    correo:props.correo
  }

  // const cargarDatos = sendData(urlPreguntas,data)

 useEffect(() => {
  const fetchDatos = async () => {

    const postPreguntas = await sendData(urlPreguntas,data);

    if (postPreguntas) {
      setdataPreguntas([{
        Id_Pregunta : postPreguntas[0].Id_Pregunta,
        Pregunta : postPreguntas[0].Pregunta,
      }])
    }

    }
    
    fetchDatos();
    // cargarDatos();
    
  },[])
  

  // const cargarDatos = () => {
  //   setdataPreguntas([{
  //     Id_Pregunta : idPregunta,
  //     Pregunta : pregunta,
  //   }])
  //   console.log(dataPreguntas)
  // }
  


  // const dataPreguntas = [
  //   {
  //     idUsuario: '1',
  //     pregunta: '¿Como se llamaba su amigo de la infancia?',
  //     respuesta: 'Michael',
  //     idPregunta: '1',
  //   },
  //   {
  //     idUsuario: '1',
  //     pregunta: '¿Como se llama tu padre?',
  //     respuesta: 'Manuel',
  //     idPregunta: '2',
  //   },
  //   {
  //     idUsuario: '1',
  //     pregunta: '¿Cual fue el ultimo celula que obtuvister?',
  //     respuesta: 'Iphone 13',
  //     idPregunta: '3',
  //   },
  // ];
  // console.log(dataPreguntas[0].Pregunta);


  const validate = () => {
    console.log(respuesta);
    if (respuesta === dataPreguntas.pregunta) {
      seterrorMessage('Respuesta correcta');
    } else {
      seterrorMessage('Respuesta incorrecta');
    }
  };

  const handleChange = event => {
    setrespuesta(event.target.value);

    console.log('value is:', event.target.value);
  };

  return (
    <div className="contRecuperaPassword">
      <div className="titleRecuPassword">
        <h2>Preguntas de Seguridad</h2>
        <h3>
          Seleccione de {dataPreguntas.length} preguntas de seguridad. <br />
          Estas preguntas nos ayudarán a verificar tu identidad si olvidaste tu
          contraseña.
        </h3>
      </div>

      <div className="sectionRecuPassword">
        {dataPreguntas.length ? (
          dataPreguntas.map((dataPreguntas, index) => (
            <div key={index}>
              <div className="contPrincipalRecu">
                <div className="contInput">
                  <TextCustom
                    text="Pregunta de seguridad"
                    className="titleInput"
                  />
                  <select name="" className="selectCustom">
                    {dataPreguntas.length ? (
                      dataPreguntas.map((dataPreguntas, index) => (
                        <option key={index} value={dataPreguntas[0].Pregunta}>
                          {dataPreguntas[0].Pregunta}
                        </option>
                      ))
                    ) : (
                      <option value="No existe informacion">
                        No existe informacion
                      </option>
                    )}
                  </select>
                </div>

                <div className="contInput">
                  <TextCustom text="Respuesta" className="titleInput" />
                  <input
                    type="text"
                    name=""
                    className="inputCustom"
                    placeholder="Respuesta"
                    // onChange={handleChange}
                    // value={respuesta}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="NoInformatio">No existe información</div>
        )}
        <div className="contBtn">
          <Button
            className="btnSubmit"
            variant="container"
            onClick={e => validate(e.target.value)}
          >
            Comprobar
          </Button>
        </div>
        {errorMessage === '' ? null : (
          <div className="ErrorMessage">
            <WarningIcon
              style={{ paddingRight: 15, fontSize: 35, color: 'white' }}
            />
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};
