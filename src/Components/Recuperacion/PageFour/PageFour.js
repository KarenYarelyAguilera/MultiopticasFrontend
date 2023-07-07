import React from "react";
import { TextCustom } from "../../TextCustom";
import '../../../Styles/RecuperacionPassword.css';
import swal from "sweetalert";
import { useNavigate } from "react-router";
import axios from "axios";


export const PageFour = ({correo,id,autor}) => {
  const navegate = useNavigate()
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
          <h2>Ingrese una nueva contraseña</h2>
          <h3>Asegurate que la nueva contraseña tenga x caracteres los cuales debe de incluir letras mayusculas y minusculas.</h3>
        </div>
      <form className="measure">
        <div className="contPrincipalRecuperacion">
          <div className='divInfoRecuperacion'>

          <TextCustom text="Nueva contraseña" className="titleInput" />
          <div className="contInput">
            <input
              type="password"
              name=""
              className="inputCustom"
              id="contra1"
            />
          </div>
          </div>

          <div className='divInfoRecuperacion'>

          <TextCustom text="Confirme la nueva contraseña" className="titleInput" />
          <div className="contInput">
            <input
              type="password"
              name=""
              className="inputCustom"
              id="contra2"
            />
          </div>
          </div>
        </div>
        <div className='divSubmitRecuperacion'>
          <input
            className="btnSubmit"
            type="button"
            value="Cambiar contraseña"
            onClick={handleClick}
          />
        </div>
      </form>
    </main>
      
    );
};
