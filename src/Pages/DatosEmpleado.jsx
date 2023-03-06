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

const urlIEmpleado = "http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=insertEmployee"
export const DatosEmpleado = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };

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
      "cargo": cargo,
      "nombres": nombres.toUpperCase(),
      "apellidos": apellidos.toUpperCase(),
      "phone": telefono,
      "genero": genero,
      "sucursal": sucursal,
      "identidad": identidad
    }
    if (sendData(urlIEmpleado, data)) {
      swal('Empleado agregado con exito', '', 'success').then((result) => {
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
              <TextCustom text="Numero de Identidad" className="titleInput" />
              <input
                type="text"
                name=""
                className="inputCustom"
                
                placeholder="Identidad"
                id="Nidentidad"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Nombre" className="titleInput" />
              <input
                type="text"
                name=""
                className="inputCustom"
                placeholder="Nombre"
                id="nombre"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Apellido" className="titleInput" />
              <input
                type="text"
                name=""
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
              <TextCustom text="Telefono" className="titleInput" />
              <input
                type="phone"
                name=""
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
