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
import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';


const urlProducto="http://localhost/APIS-Multioptica/producto/controller/producto.php?op=InsertProducto"
const urlModelos="http://localhost/APIS-Multioptica/producto/controller/producto.php?op=Modelos"

export const RegistroProducto = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {

  const [Modelo, setModelo] = useState([])

  useEffect(()=>{
    fetch(urlModelos).then(response =>response.json()).then(data =>setModelo(data))
  },[])

  const [leyenda, setleyenda] = React.useState('');
  const [errorIdentidad, setErrorIdentidad] = React.useState(false);
  const [errorApellido, setErrorApellido] = React.useState(false);

  const navegate = useNavigate();

  const handleNext = () => {
   
    let data = {
      IdProducto:parseInt(document.getElementById("idProducto").value),
      IdModelo:parseInt(document.getElementById("modelo").value),
      precio:document.getElementById("precio").value,
      cantidadMin:parseInt(document.getElementById("cantMin").value),
      cantidadMax:parseInt(document.getElementById("cantMax").value),
      descripcion:document.getElementById("producto").value
    };

    if (sendData(urlProducto, data)) {
      swal('Producto agregado con exito', '', 'success').then(result => {
        navegate('/menuInventario/ListaProductos');
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
        <h2>Registro de Producto</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos del modelo.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="ID Producto" className="titleInput" />

              <input
                error={errorIdentidad}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="ID Producto"
                id="idProducto"
              />
              <p class="error">{leyenda}</p>
            </div>
            

            <div className="contInput">
              <TextCustom text="ID Modelo" className="titleInput" />
              <select name="" className="selectCustom" id="modelo">
              {Modelo.length ? (
                  Modelo.map(pre => (
                    <option key={pre.IdModelo} value={pre.IdModelo}>
                      {pre.detalle}
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
              <TextCustom text="Precio" className="titleInput" />

              <input
                error={errorIdentidad}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Precio"
                id="precio"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Cantidad Maxima" className="titleInput" />

              <input
                error={errorIdentidad}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Cantidad Maxima"
                id="cantMax"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Cantidad Minima" className="titleInput" />

              <input
                error={errorIdentidad}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Cantidad Minima"
                id="cantMin"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Descripcion del Producto" className="titleInput" />
              <input
                error={errorApellido}
                type="text"
                name=""
                maxLength={50}
                className="inputCustomText"
                placeholder="Descripcion del Producto"
                id="producto"
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
            </div>
          </div>
        </div>

        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/007/059/184/non_2x/abstract-button-icon-folder-with-documents-on-a-white-background-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};