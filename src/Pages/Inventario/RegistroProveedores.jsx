import React from 'react';
import Button from '@mui/material/Button';

import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Styles
import '../../Styles/Usuarios.css';

//Components

import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';


const urlProveedores = 'http://localhost/APIS-Multioptica/proveedor/controller/proveedor.php?op=nProveedor';

export const RegistroProveedores = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {
  
  const [proveedores, setProveedores]= useState([]);
 
  const navegate = useNavigate();

  const handleNext = () => {
    let nombreProveedor = document.getElementById("nombreProveedor").value
    let encargado = document.getElementById("encargado").value;
    let pais = document.getElementById("pais").value;
    let ciudad = document.getElementById("ciudad").value;
    let codigoPostal = document.getElementById("codigoPostal").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let correoElectronico = document.getElementById("correoElectronico").value;
 
    let data = {
      nombre:nombreProveedor,
      encargado:encargado,
      pais:pais,
      ciudad:ciudad,
      codigoP:codigoPostal,
      direccion:direccion,
      telefono:telefono,
      correo:correoElectronico
    };
    
 console.log(data) 

    if (sendData(urlProveedores, data)) {
      swal('Proveedor agregado con exito', '', 'success').then(result => {
        navegate('/menuInventario/ListaProveedore');
      });
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
        <h2>Registro de Proveedores</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos de los Proveedores.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Empresa Proveedora" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="nombreProveedor"
                id="nombreProveedor"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Codigo Postal" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="codigoPostal"
                id="codigoPostal"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Persona Encargada" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="encargado"
                id="encargado"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Pais" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="pais"
                id="pais"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Telefono" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="telefono"
                id="telefono"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Ciudad" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="ciudad"
                id="ciudad"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Correo Electronico" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="correoElectronico"
                id="correoElectronico"
              />
            </div>
            
            <div className="contInput">
              <TextCustom text="Direccion" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={50}
                className="inputCustomText"
                placeholder="direccion"
                id="direccion"
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
            'https://static.vecteezy.com/system/resources/previews/014/049/158/non_2x/flat-cloud-data-storage-remote-backup-of-files-data-center-and-database-concept-outline-design-style-minimal-illustration-for-landing-page-web-banner-infographics-hero-images-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};