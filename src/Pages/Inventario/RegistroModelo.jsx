import React from 'react';
import Button from '@mui/material/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Styles
import '../../Styles/Usuarios.css';

//Components
import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';


export const RegistroModelo = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {

  const urlMarcas = 'http://localhost/APIS-Multioptica/producto/controller/producto.php?op=Marcas';
  const urlModelo ='http://localhost/APIS-Multioptica/producto/controller/producto.php?op=InsertModelo';

  const [Marca, setMarca] = useState([])

  useEffect(()=>{
    fetch(urlMarcas).then(response =>response.json()).then(data=>setMarca(data))
  },[])


  const navegate = useNavigate();

  const handleNext = () => {
    let data = {
      IdModelo:parseInt(document.getElementById("idModelo").value),
      idMarca:parseInt(document.getElementById("marca").value),
      detalle:document.getElementById("modelo").value
    }
    if (sendData(urlModelo,data)) {
      swal("Modelo Registrado con Exito","","success")
      navegate('/menumodelos/lista')
    }
  };

  const handleBack = () => {
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Registro de Modelos</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos del modelo.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="ID Modelo" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="ID Modelo"
                id="idModelo"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Marca" className="titleInput" />
              <select name="" className="selectCustom" id="marca">
              {Marca.length ? (
                  Marca.map(pre => (
                    <option key={pre.IdMarca} value={pre.IdMarca}>
                      {pre.descripcion}
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
              <TextCustom text="Descripcion de Modelo" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustomText"
                placeholder="Descripcion de Modelo"
                id="modelo"
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
            'https://static.vecteezy.com/system/resources/previews/001/890/486/non_2x/summer-sunglasses-accessory-flat-style-icon-free-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};