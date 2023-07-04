import React, { useRef, useState } from 'react';

import { TextCustom } from '../../TextCustom';
import '../../../Styles/RecuperacionPassword.css';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';


import swal from "sweetalert";
import { useNavigate } from "react-router";
import axios from "axios";



export const PageFour = ({correo,id, estado, autor }) => {


  const [clave1, setContra1] = useState("");
  const [msj, setMsjs] = useState("");
  const [errorContra1, setErrorContra1] = useState(false);

  const [clave2, setContra2] = useState("");
  const [errorContra2, setErrorContra2] = useState(false);
  const [advertencia, setadvertencia] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfi, setShowPasswordConfi] = useState(false);



  const navegate = useNavigate()

  const handleClickPrimerLogin = ()=>{

    const urlUpdPassword = "http://localhost:3000/api/usuario/UpdContra"
    const urlUpdEstado = "http://localhost:3000/api/estado/activo"
 
    
    const contra1 = document.getElementById("contra1").value
    const contra2 = document.getElementById("contra2").value

    const data ={
      correo:correo,
      clave:contra1,
      id:id,
      autor:autor
    }
    if (contra1!==contra2) {
      swal("Las contraseñas no coinciden","","warning")
    }else{
      
      axios.put(urlUpdEstado,data)
      axios.put(urlUpdPassword,data).then(response=>{
        console.log(response.data);
        if (response.data===false) {
          swal("La contraseña no puede ser igual que la anterior","","error")
        }else{
          swal("Contraseña actualizada","","success").then(()=>navegate("/"))
        } 
      })
    }
  }
 
  const handleClick = ()=>{

    const urlUpdPassword = "http://localhost:3000/api/usuario/UpdContra"
 
    
    const contra1 = document.getElementById("contra1").value
    const contra2 = document.getElementById("contra2").value

    const data ={
      correo:correo,
      clave:contra1,
      id:id,
      autor:autor
    }
    if (contra1!==contra2) {
      swal("Las contraseñas no coinciden","","warning")
    }else{

      axios.put(urlUpdPassword,data).then(response=>{
        console.log(response.data);
        if (response.data===false) {
          swal("La contraseña no puede ser igual que la anterior","","error")
        }else{
          swal("Contraseña actualizada","","success").then(()=>navegate("/"))
        } 
      })
    }
  }
    return (
      <main>
      <div className="titleRecuperacion">
          <TextCustom text="Ingrese una nueva contraseña" className="titleInput" />
          <TextCustom text="Asegurate que la nueva contraseña tenga x caracteres los cuales debe de incluir letras mayusculas y minusculas." className="titleInput" />
         
        </div>
      <form className="measure">
        <div className="contPrincipalRecuperacion">
          <div className='divInfoRecuperacion'>

          <TextCustom text="Nueva contraseña" className="titleInput" />
          <div className="contInput">
            <input

                  onKeyDown={(e) => {
                    setContra1(e.target.value);
                    if (clave1 === "") {
                      setErrorContra1(true);
                      setMsjs("Los campos no deben estar vacios");
                    }
                    else {
                      setErrorContra1(false)
                      var regularExpression = /^[a-zA-Z0-9!@#$%^&*]+$/;
                      if (!regularExpression.test(clave1)) {
                        setErrorContra1(true)
                        setMsjs("");
                      }
                      else {
                        setMsjs("La contraseña debe de tener letras, numeros y caracteres especiales");
                        setErrorContra1(false);
                      }
                    }
                  }}
                  type={showPassword ? 'text' : 'password'}
                  inputProps={{ maxLength: 20 }}
                  minLength= "8"
                  //inputRef={refContrasenia}





              //type="password"
              name=""
              className="inputCustom"
              id="contra1"
            />
          </div>
              <p className='error'>{msj}</p>
          </div>

          <div className='divInfoRecuperacion'>

          <TextCustom text="Confirme la nueva contraseña" className="titleInput" />
          <div className="contInput">
            <input

                  onKeyDown={(e) => {
                    setContra2(e.target.value);
                    if (clave2 === "") {
                      setErrorContra2(true);
                      setadvertencia("Los campos no deben estar vacios");
                    }
                    else {
                      setErrorContra2(false)
                      var regularExpression = /^[a-zA-Z0-9!@#$%^&*]+$/;
                      if (!regularExpression.test(clave2)) {
                        setErrorContra2(true)
                        setadvertencia("");
                      }
                      else {
                        setadvertencia("La contraseña debe de tener letras, numeros y caracteres especiales");
                        setErrorContra2(false);
                      }
                    }

                  }}
                  type={showPassword ? 'text' : 'password'}
                  inputProps={{ maxLength: 20 }}
                  minLength= "8"
                  //inputRef={refContrasenia}



             //type="password"
              name=""
              className="inputCustom"
              id="contra2"
            />
          </div>
            <p className='error'>{advertencia}</p>
          </div>
        </div>
        <div className='divSubmitRecuperacion'>
          {estado==="Nuevo" ? <input
            className="btnSubmit"
            type="button"
            value="Finalizar"
            onClick={handleClickPrimerLogin}
          /> : <input
          className="btnSubmit"
          type="button"
          value="Cambiar contraseña"
          onClick={handleClick}
        />
       }
      </div>    
      </form>
    </main>
      
    );
};

export default PageFour;

