import React from 'react';

import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from 'sweetalert';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export const PageThree = ({ onButtonClick, correo }) => {
  const urlId = 'http://localhost:3000/api/token/id';
  const urlEnviarCodigo = 'http://localhost:3000/api/token/enviarCodigo';
  const urlVerificar = 'http://localhost:3000/api/token/verificar';
  
  const [id, setId] = useState(0);
  const [pasar,setPasar]=useState(false)

  const data = {
    "correo": correo,
  };
  
  useEffect(() => {
    console.log(data);
    axios.post(urlId, data).then(response => {setId(response.data)});
  }, [id]);
  
    const data2 = {
      "correo": correo,
      "id": id,
    };

  useEffect(() => {
    console.log(data2);
    axios.post(urlEnviarCodigo, data2);
  }, [id]);

  const handleClick = async () => {
    const codigo = document.getElementById('codigo').value;
    let data = {
      correo: correo,
      codigo: codigo,
      id: id,
    };
    await axios.post(urlVerificar, data).then(response=>setPasar(response.data));
    console.log(pasar)
    return pasar;
  };

  return (
    <main>
      <div className="titleRecuperacion">
        <h2>Envió de codigo</h2>
        <h3>
          Se te acaba de enviar a tu correo electrónico un codigo de
          confirmación para realizar el cambio de contraseña
        </h3>
      </div>
      <form className="measure">
        <div className="contPrincipalRecuperacion">
          <div className="divInfoRecuperacion">
            <TextCustom text="Ingresa el codigo" className="titleInput" />
            <div className="contInput">
              <input type="text" name="" className="inputCustom" id="codigo" />
            </div>
          </div>
        </div>
        <div className="divSubmitRecuperacion">
          <input
            className="btnSubmit"
            type="button"
            value="Siguiente"
            onClick={() => {
              handleClick()
              if (pasar===false) {
                swal(
                  'Por favor ingrese su codigo de verificacion',
                  '',
                  'warning',
                )
              }else{
                onButtonClick('pagefour')

              }
              
            }}
          />
        </div>
      </form>
    </main>
  );
};

export default PageThree;
