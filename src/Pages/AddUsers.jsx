import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Styles
import '../Styles/Usuarios.css';

//Components
import VerticalStepper from '../Components/VerticalStepper.jsx';
import { TextCustom } from '../Components/TextCustom.jsx';

export const AddUsers = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div className="ContUsuarios">
      <div className="titleAddUser">
        <h2>Registro de Usuario</h2>
        <h3>Complete todos los puntos para poder registrar el usuario</h3>
      </div>

      <div className="infoAddUser">
        <VerticalStepper activeStep={activeStep}></VerticalStepper>
        <div className="PanelInfo">
          <div className="InputContPrincipal">
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
              <TextCustom text="Contraseña" className="titleInput" />
              <input
                type="password"
                name=""
                className="inputCustom"
                placeholder="Contrasenia"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Rol" className="titleInput" />
              <select name="" className="selectCustom">
                <option value="Administrador">Administrador</option>
                <option value="Administrador">Empleado</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Correo Electronico " className="titleInput" />
              <input
                type="email"
                name=""
                className="inputCustom"
                placeholder="Correo Electronico"
                // sx={{
                //   color:
                //     msgError.length > 0
                //       ? 'ff0000'
                //       : success
                //       ? '316ee6'
                //       : warning
                //       ? '0cb106'
                //       : 'gray',
                // }}
              />
            </div>
            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={handleNext}
              >
                <h1>{'Finish' ? 'Continue' : 'Finish'}</h1>
              </Button>
              <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
