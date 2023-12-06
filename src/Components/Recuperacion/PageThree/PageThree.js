import React from 'react';

import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import swal from 'sweetalert';
import axios from 'axios';
import { useState } from 'react';

export const PageThree = ({ onButtonClick, correo, id }) => {
  const urlVerificar = 'http://194.163.45.55:4000/api/token/verificar';
  const [pasar, setPasar] = useState(false)



   const handleClick = async () => {
    const codigo = document.getElementById('codigo').value;
    let data = {
      correo: correo,
      codigo: codigo,
      id: id,
    };
    console.log(data);
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
      {/*  <div className="titleRecuperacion">
        <h2>Envió de codigo</h2>
        <h3>
          Se te acaba de enviar a tu correo electrónico un codigo de
          confirmación para realizar el cambio de contraseña
        </h3>
      </div> */}
      <form className="measure">
        <div className="contPrincipalRecuperacion" style={{display: 'flex',  alignItems: 'center', justifyContent: 'center'}}>
          <div className="divInfoRecuperacion"  style={{ fontSize: "15px" }}>
            <TextCustom text="Revisa tu correo elctrónico e ingresa el código." className="titleInput" />
           
              <input type="text" name="" className="inputCustom" id="codigo" />
          
          </div>
        </div>
        <div className="divSubmitRecuperacion" style={{display: 'flex',  alignItems: 'center', justifyContent: 'center'}}>
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
