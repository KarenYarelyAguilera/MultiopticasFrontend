import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Styles
import '../Styles/Usuarios.css';

//Components
import VerticalStepper from '../Components/VerticalStepper.jsx';
import { TextCustom } from '../Components/TextCustom.jsx';

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

  // const handleBack = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep - 1);
  // };

  return (
    <div className="ContUsuarios">
      <div className="titleAddUser">
        <h2>Datos del empleado</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos del empleado
        </h3>
      </div>

      <div className="infoAddUser">
        {/* <VerticalStepper activeStep={activeStep}></VerticalStepper> */}
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Numero de Identidad" className="titleInput" />
              <input
                type="text"
                name=""
                className="inputCustom"
                placeholder="Identidad"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Nombre" className="titleInput" />
              <input
                type="text"
                name=""
                className="inputCustom"
                placeholder="Nombre"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Apellido" className="titleInput" />
              <input
                type="text"
                name=""
                className="inputCustom"
                placeholder="Apellido"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Genero" className="titleInput" />
              <select name="" className="selectCustom">
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Telefono" className="titleInput" />
              <input
                type="phone"
                name=""
                className="inputCustom"
                placeholder="Telefono"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Sucursal" className="titleInput" />
              <select name="" className="selectCustom">
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Cargo" className="titleInput" />
              <select name="" className="selectCustom">
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                // onClick={handleNext}
              >
                <h1>{'Finish' ? 'Continue' : 'Finish'}</h1>
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
