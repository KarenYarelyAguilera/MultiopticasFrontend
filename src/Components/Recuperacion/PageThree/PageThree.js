import React from 'react';

import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from 'sweetalert';
import axios from 'axios';
import { useState } from 'react';

export const PageThree = ({ onButtonClick, correo, id }) => {
  const urlVerificar = 'http://localhost:3000/api/token/verificar';
  const [pasar,setPasar]=useState(false)

   

  const handleClick = async () => {
    const codigo = document.getElementById('codigo').value;
    let data = {
      correo: correo,
      codigo: codigo,
      id: id,
    };
    await axios.post(urlVerificar, data).then(response=>{
      
      if (response.data==false) {
        swal(
          'Por favor ingrese su codigo de verificacion',
          '',
          'warning',
        )
      }else{
        onButtonClick('pagefour')

      }
    });
   
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
            onClick={handleClick}
          />
        </div>
      </form>
    </main>
  );
};

export default PageThree;
