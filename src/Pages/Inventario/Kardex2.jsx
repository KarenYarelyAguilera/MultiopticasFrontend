import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Select from 'react-select';

//Styles
import '../../Styles/Usuarios.css';

//Components

import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';
import axios from 'axios';
import { Bitacora } from '../../Components/bitacora.jsx';

const urlProducto = "http://localhost:3000/api/productos";
const urlMovimientos = "http://localhost:3000/api/Tmovimientos";
const urlMovimientosInsert = "http://localhost:3000/api/Extraordinario";
//Bitacora
const urlBitacoraMovimiento = "http://localhost:3000/api/bitacora/movimientoKardex";


export const Kardex2 = (
  props
) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };




  const navegate = useNavigate();
  const [selectedOptionP, setSelectedOptionP] = useState(null); // Estado para la opción seleccionada
  const [selectedOptionM, setSelectedOptionM] = useState(null);
  const [marca, setmarca] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorMarca, setErrorMarca] = React.useState(false);
  const [tableDataP, setTableDataP] = useState([]);
  const [tableDataM, setTableDataM] = useState([]);
  const [nombremarca, setnombremarca] = React.useState('');
  const [aviso, setaviso] = React.useState('');
  const [errornombremarca, setErrornombremarca] = React.useState(false);
  useEffect(() => {
    axios.get(urlProducto).then(response => {
      setTableDataP(response.data)
    }).catch(error => console.log(error))
  }, []);
  useEffect(() => {
    axios.get(urlMovimientos).then(response => {
      setTableDataM(response.data)
    }).catch(error => console.log(error))
  }, []);

  const handleNext = () => {
    let idTM = parseInt(document.getElementById("idTM").value)
    let idProducto = parseInt(document.getElementById("idP").value)
    const fechaActual = new Date();
    let cantidad = parseInt(document.getElementById("cant").value)
    const fechaYHora = fechaActual.toISOString();
    let data = {
      idProducto: selectedOptionP.value,
      idUsuario: props.idUsuario,
      fechaYHora:fechaYHora,
      cantidad:cantidad,
      IdTipoMovimiento: selectedOptionM.value,
      descripcion:document.getElementById("descripcion").value
    };
     //Funcion de Bitacora 
     let dataB = {
      Id: props.idUsuario
    };
    const bitacora = {
      urlB: urlBitacoraMovimiento,
      activo: props.activo,
      dataB: dataB
    };
    console.log(data);

    if (sendData(urlMovimientosInsert, data)) {
      swal('Movimiento registrado con exito', '', 'success').then(result => {
        Bitacora(bitacora)
        navegate('/menuInventario/Kardex');
      });
    }
  };

  const handleBack = () => {
    navegate('/menuInventario/Kardex');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Kardex</h2>
        <h3>
          Complete todos los puntos para poder registrar el Kardex
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <div className="contNewCita">
              <TextCustom text="Tipo de Movimiento" className="titleInput" />
              <div className="contInput">
                {/* <select id="idClientes" className="inputCustomPreguntas">
                    {tableData.length ? (
                      tableData.map(pre => (
                        <option key={pre.idCliente} value={pre.idCliente}>
                             {`${pre.idCliente} - ${pre.nombre}`}
                        </option>
                      ))
                    ) : (
                      <option value="No existe informacion">
                        No existe informacion
                      </option>
                    )}
                  </select> */}
                <Select
                  id="idTM"
                  // className="inputCustomPreguntas"
                  options={tableDataM.map(pre => ({ value: pre.IdTipoMovimiento, label: `${pre.descripcion}` }))}
                  value={selectedOptionM}
                  onChange={setSelectedOptionM}
                  placeholder="Seleccione un Producto"
                />
              </div>
            </div>

            <div className="contNewCita">
              <TextCustom text="Producto" className="titleInput" />
              <div className="contInput">
                {/* <select id="idClientes" className="inputCustomPreguntas">
                    {tableData.length ? (
                      tableData.map(pre => (
                        <option key={pre.idCliente} value={pre.idCliente}>
                             {`${pre.idCliente} - ${pre.nombre}`}
                        </option>
                      ))
                    ) : (
                      <option value="No existe informacion">
                        No existe informacion
                      </option>
                    )}
                  </select> */}

                <Select
                  id="idP"
                  // className="inputCustomPreguntas"
                  options={tableDataP.map(pre => ({ value: pre.IdProducto, label: `${pre.Marca} - ${pre.Modelo}` }))}
                  value={selectedOptionP}
                  onChange={setSelectedOptionP}
                  placeholder="Seleccione un producto"
                />
              </div>
            </div>


            <div className="contInput">
              <TextCustom text="Cantidad" className="titleInput" />
              <input
                onKeyDown={e => {
                  setmarca(e.target.value);
                  if (marca === '') {
                    setErrorMarca(true);
                    setleyenda('Los campos no deben estar vacios');
                  } else {
                    setErrorMarca(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(marca)) {
                      setErrorMarca(true);
                      setleyenda('Solo deben de ingresar numeros');
                    } else {
                      setErrorMarca(false);
                      setleyenda('');
                    }
                  }
                }}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Cantidad"
                id="cant"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Descripcion" className="titleInput" />
              <input
                onKeyDown={e => {
                }}
                type="text"
                name=""
                maxLength={50}
                className="inputCustomText"
                placeholder="Descripcion"
                id="descripcion"
              />
            </div>


            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={handleNext}
              >
                <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>

        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/010/351/676/non_2x/rewriting-text-color-icon-illustration-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};