import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Styles
import '../../Styles/Usuarios.css';

//Components
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';


const urlExpediente ='http://localhost/APIS-Multioptica/Expediente/controller/expediente.php?op=InsertExpediente';
const urlEmployees ='http://localhost/APIS-Multioptica/empleado/controller/empleado.php?op=Employees';

export const AddExpediente = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {

  const [Empleado, setEmpleado] = useState([])

  useEffect(() => {
    fetch(urlEmployees)
      .then(response => response.json())
      .then(data => setEmpleado(data));
  }, []);



  const navegate = useNavigate();

  const handleNext = () => {

    let identidad = document.getElementById("identidad").value
    let empleado = parseInt(document.getElementById("empleado").value)
    let fechaN = document.getElementById("fecha").value

    let fecha = new Date(fechaN)

    let anio = fecha.getFullYear().toString();
    let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    let dia = fecha.getDate().toString().padStart(2, "0");

    let fechaFormateada = anio + "/" + mes + "/" + dia;

    let data = {
      fechaCreacion:fechaFormateada,
      IdCliente:identidad,
      IdEmpleado:empleado
    }
    if (sendData(urlExpediente,data)) {
      navegate('/menuClientes/registroCliente');
    }



  };

  const handleBack = () => {
    navegate('/menuClientes');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Creacion de Expediente</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos del expediente
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Identidad del Cliente" className='titleInput' />
              <input
                type="text"
                name=""
                className="inputCustom"
                maxLength={50}
                placeholder="Cliente"
                variant="standard"
                id="identidad"
                label="identidad"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Creado por" className="titleInput" />
              <select name="" id="empleado">
              {Empleado.length ? (
                  Empleado.map(pre => (
                    <option key={pre.IdEmpleado} value={pre.IdEmpleado}>
                      {pre.Nombre}
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
              <TextCustom text="Fecha de creacion" className="titleInput" />
              <input
                type="date"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="Fecha"
                id="fecha"
              />
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                onClick={handleNext}
                className="btnStepper">
                <h1>{'Finish' ? 'Siguiente' : 'Finish'}</h1>
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>

        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/011/873/935/non_2x/online-voting-concept-flat-style-design-illustration-tiny-people-with-voting-poll-online-survey-working-together-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};
