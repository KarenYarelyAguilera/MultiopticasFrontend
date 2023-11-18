import React from 'react';
import Button from '@mui/material/Button';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import ReactModal from 'react-modal';
import jsPDF from 'jspdf';
import Select from 'react-select'; //select para concatenar el idCiente y el nombre

import swal from '@sweetalert/with-react';

//Styles
import '../../Styles/Usuarios.css';

//Components
import { TextCustom } from '../../Components/TextCustom.jsx';
//import swal from '@sweetalert/with-react';

//URLS
const urlCliente = 'http://localhost:3000/api/clientes';
const urlEmployees = 'http://localhost:3000/api/empleados';


export const NuevaVenta = (props) => {

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ventas, setVentas] = useState([])
  const [Cliente, setCliente] = useState([]);
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().slice(0, 10));
  const [Empleado, setIdEmpleado] = useState([]);
  const [fechaEntrega, setfechaEntrega] = React.useState('');
  const [fechaLimiteEntrega, setfechaLimiteEntrega] = React.useState('');
  //const [Rtn, setRtn] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');

  const [RTN, setRTN] = useState(props.data.Rtn || '');
  const [errorRTN, setErrorRTN] = React.useState(false);
  const [texto, setTexto] = React.useState(false);

  const [cambio, setCambio] = useState(0)

  const [selectedOption, setSelectedOption] = useState(null); // Estado para la opción seleccionada
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);



  useEffect(() => {
    fetch(urlCliente).then(response => response.json()).then(data => setCliente(data))
    fetch(urlEmployees).then(response => response.json()).then(data => setIdEmpleado(data))
  }, [])

  useEffect(() => {
    setTableData(ventas)
  }, [cambio])

  const navegate = useNavigate();



  const handleNext = async () => {

    let fechaEntrega = document.getElementById('fechaEntrega').value;
    let fechaLimiteEntrega = document.getElementById('fechaLimiteEntrega').value;
    let Cliente = selectedOption ? selectedOption.value : null;
    let Empleado = selectedEmpleado ? selectedEmpleado.value : null;
    let RTN = document.getElementById('RTN').value;



    let data = {
      fechaEntrega: fechaEntrega,
      fechaLimiteEntrega: fechaLimiteEntrega,
      IdCliente: Cliente,
      idEmpleado: Empleado,
      RTN: RTN
    }

    props.venta(data)
    navegate('/menuVentas/DetallesDeVenta');

  };

  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de una Venta ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        props.update(false)
        props.Data({})
        navegate('/menuVentas/ListaVenta');
      } else {
      }
    });
  };


  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Nueva Venta</h2>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <div className="contInput">
              <TextCustom text="Cliente:" className="titleInput" />
              <div className="contInput">
                <Select
                  id="cliente"
                  options={Cliente.map(pre => ({ value: pre.idCliente, label: `${pre.idCliente} - ${pre.nombre} ${pre.apellido}` }))}
                  value={selectedOption}
                  onChange={setSelectedOption}
                  placeholder="Seleccione un cliente"
                />
              </div>
            </div>

            <div className="contInput">
              <TextCustom text="Fecha actual" className="titleInput" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha"
                id="fecha"
                value={fechaActual}
                disabled
              />
            </div>

            <div className="contInput">
              <TextCustom text="Empleado" className="titleInput" />
              <div className="contInput">
                <Select
                  id="empleado"
                  options={Empleado.map(pre => ({ value: pre.idEmpleado, label: `${pre.nombre} ${pre.apellido}` }))}
                  value={selectedEmpleado}
                  onChange={setSelectedEmpleado}
                  placeholder="Seleccione un Empleado"
                />
              </div>
            </div>


            <div className="contInput">
              <TextCustom text="Fecha de entrega" className="titleInput" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha de entrega"
                id="fechaEntrega"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Fecha limite de entrega" className="titleInput" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha limite de entrega"
                id="fechaLimiteEntrega"
              />
            </div>

            <div className="contInput"  >
              <TextCustom text="RTN" className="titleInput" />
              <input
                error={errorRTN}
                type="number"
                min="1"
                max="99999999999999"
                name=""
                maxLength={14}
                className="inputCustom"
                placeholder="(Opcional)"
                id="RTN"
                helperText={texto}
              />

            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"

                onClick={() => {
                  let fechaEntrega = document.getElementById("fechaEntrega").value;
                  let fechaLimiteEntrega = document.getElementById("fechaLimiteEntrega").value;
                  let Cliente = selectedOption ? selectedOption.value : null;
                  let Empleado = selectedEmpleado ? selectedEmpleado.value : null;
                
                  if (fechaLimiteEntrega < fechaEntrega) {
                    swal("Porfavor ingrese correctamente las fechas", "", "error")
                  } else {
                    if ((fechaEntrega === "" || fechaLimiteEntrega === "" || Cliente === "" || Empleado === "")) {
                      swal("No deje campos vacíos.", "", "error");
                    }else {
                      handleNext();
                    }
                  }
                }
                }
              >
                <h1>{'Finish' ? 'Siguiente' : 'Finish'}</h1>
              </Button>
            </div>
          </div>
        </div>

        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/018/942/487/non_2x/business-strategic-planning-illustration-concept-on-white-background-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};