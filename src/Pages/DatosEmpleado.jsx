import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../scripts/sendData';
import { useNavigate } from 'react-router-dom';


import InforUsers from '../IMG/InforUsers.jpg';

//Styles
import '../Styles/Usuarios.css';

//Components
import VerticalStepper from '../Components/VerticalStepper.jsx';
import { TextCustom } from '../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';

const urlIEmpleado = "http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=insertEmployee"


export const DatosEmpleado = (
  {
  msgError = '',
  success = false,
  warning = false,
  props,



  
}

) => {
  // const [activeStep, setActiveStep] = React.useState(0);
  
  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };
  const [iIdentidad, setiIdentidad]= React.useState("");
    const [leyenda, setleyenda]= React.useState("");
    const [errorIdentidad, setErrorIdentidad]= React.useState(false);

    const [Nombre, setNombre]= React.useState("");
    const [errorNombre, setErrorNombre]= React.useState(false);
    const[Msj, setMsj]= React.useState(false);

    const [Apellido, setApellido]= React.useState("");
    const [errorApellido, setErrorApellido]= React.useState(false);
    const[aviso, setAviso]= React.useState(false);

    const [Telefono, setTelefono]= React.useState("");
    const [errorTelefono, setErrorTelefono]= React.useState(false);
    const [texto, setTexto]= React.useState(false);

  const navegate = useNavigate()
  const handleNext = () => {
    let identidad = document.getElementById("Nidentidad").value
    let nombres = document.getElementById("nombre").value
    let apellidos = document.getElementById("apellido").value
    let telefono = document.getElementById("phone").value
    let genero = parseInt(document.getElementById("genero").value)
    let sucursal = parseInt(document.getElementById("sucursal").value)
      let cargo = parseInt(document.getElementById("cargo").value)
      let data = {
        "cargo":cargo,
        "nombres":nombres.toUpperCase(),
        "apellidos": apellidos.toUpperCase(),
        "phone":telefono,
        "sucursal":sucursal,
        "genero":genero,
        "identidad":identidad
    }

    if (sendData(urlIEmpleado,data)) {
      swal('Empleado agregado con exito','','success').then((result) => {
        navegate("/empleados/lista")
      })
        ;
    }
    
   };

  return (
    <div className="ContUsuarios">
      <div className="titleAddUser">
        <h2>Datos del empleado</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos del empleado
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom 
              onChange= {(e) =>{
                setiIdentidad(e.target.value);
                if (iIdentidad==""){
                  setErrorIdentidad(true);
                  setleyenda("Los campos no deben estar vacios");
                }
                else{
                  setErrorIdentidad(false)
                  var preg_match= '/^[0-9]+$/';
                  if(!preg_match.test(iIdentidad)){
                   setErrorIdentidad(true)
                   setleyenda("Solo deben de ingresar numeros")
                  } else{
                  setErrorIdentidad(false);
                  setleyenda("");
                }
              }
              }}
              text="Numero de Identidad" className="titleInput" 
               />
              <input
                error={errorIdentidad}
                type="text"
                helperText={leyenda}
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Identidad"
                id="Nidentidad"
              />
            </div>

            <div className="contInput">
              <TextCustom 

                onChange= {(e) =>{
                  setNombre(e.target.value);
                  if (Nombre==""){
                    setErrorNombre(true);
                    setMsj("Los campos no deben estar vacios");
                  }
                  else{
                    setErrorNombre(false)
                    var preg_match='/^[a-zA-Z]+$/' ;
                    if(!preg_match.test(Nombre)){
                    setErrorNombre(true)
                    setMsj("Solo debe de ingresar letras")
                    } else{
                    setErrorNombre(false);
                    setMsj("");
                  }
                }
                }}
             
              text="Nombre" />
              <input
                error={errorNombre}
                type="text"
                helperText={Msj}
                name=""
                className="inputCustom"
                maxLength={50}
                placeholder="Nombre"
                variant="standard"
                id="nombre"
                label="Usuario"
               
              />
            </div>

            <div className="contInput">
              <TextCustom 
               onChange= {(e) =>{
                setApellido(e.target.value);
                if (Apellido==""){
                  setErrorApellido(true);
                  setAviso("Los campos no deben estar vacios");
                }
                else{
                  setErrorApellido(false)
                  var preg_match= '/^[a-zA-Z]+$/';
                  if(!preg_match.test(Apellido)){
                   setErrorApellido(true)
                   setAviso("Solo deben de ingresar letras")
                  } else{
                  setErrorApellido(false);
                  setAviso("");
                }
              }
              }}
              text="Apellido" className="titleInput" />
              <input
               error={errorApellido}
                type="text"
                name=""
                helperText={aviso}
                maxLength={50}
                className="inputCustom"
                placeholder="Apellido"
                id="apellido"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Genero" className="titleInput" />
              <select name="" className="selectCustom" id='genero'>
                <option value={1}>Masculino</option>
                <option value={2}>Femenino</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom 
              onChange= {(e) =>{
                setTelefono(e.target.value);
                if (Telefono==""){
                  setErrorTelefono(true);
                  setTexto("Los campos no deben estar vacios");
                }
                else{
                  setErrorTelefono(false)
                  var preg_match= '/^[0-9]+$/';
                  if(!preg_match.test(Telefono)){
                   setErrorTelefono(true)
                   setTexto("Solo deben de ingresar numeros")
                  } else{
                  setErrorTelefono(false);
                  setTexto("");
                }
              }
              }}
              text="Telefono" className="titleInput" />
              <input
                error={errorTelefono}
                type="phone"
                name=""
                helperText={texto}
                maxLength={12}
                className="inputCustom"
                placeholder="Telefono"
                id="phone"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Sucursal" className="titleInput" />
              <select name="" className="selectCustom" id="sucursal">
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Cargo" className="titleInput" />
              <select name="" className="selectCustom" id='cargo'>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={handleNext}
              >
                <h1>{'Finish' ? 'Continue' : 'Finish'}</h1>
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>

        <img src={InforUsers} alt="No se encuentro la imagen" />
        
      </div>
    </div>
  );
};
