import React from 'react';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sendData } from '../../scripts/sendData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


//Styles
import '../../Styles/Usuarios.css';

//Components
//import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import { ContentPasteGoOutlined } from '@mui/icons-material';

//APIS DE SUCURSAL
const urlSucursal = //CREAR
  'http://localhost:3000/api/sucursal/crear';
const urlUpdSucursal = //ACTUALIZAR
  'http://localhost:3000/api/sucursal/actualizar';
const urlDelSucursal = //BORRAR
  'http://localhost:3000/apisucursal/eliminar';
  const urlDepartamentos = //MUESTRA LOS DEPTOS
  'http://localhost:3000/api/departamentos';
  const urlCiudades = //MUESTRA CIUDADES
  'http://localhost:3000/api/ciudades';


export const RegistroSucursal = (props) => {

  const [Departamento, setDepartamento] = useState([]);
  const [Ciudad, setCiudad] = useState([]);

  const [departamento, setdepartamento] = React.useState('');
  const [errordepartamento, setErrordepartamento] = React.useState(false);
  const [aviso, setaviso] = React.useState(false);

  const [ciudad, setciudad] = React.useState('');
  const [mensaje, setmensaje] = React.useState('');
  const [errorciudad, setErrorciudad] = React.useState(false);

  const [direccion, setdireccion] = React.useState('');
  const [advertencia, setadvertencia] = React.useState('');
  const [errordireccion, setErrordireccion] = React.useState(false);

  const [descrpcion, setdescripcion] = useState('');
  const [msj, setmsj] = useState('');
  const [errordescripcion, setErrordescripcion] = useState(false);

  const [errorTelefono, setErrorTelefono] = useState(false);
  const [texto, setTexto] = useState(false);

  useEffect(() => {
    fetch(urlDepartamentos)
      .then(response => response.json())
      .then(data => setDepartamento(data));
      fetch(urlCiudades)
      .then(response => response.json())
      .then(data => setCiudad(data));
  }, []);

  const navegate = useNavigate();

  //ACTUALIZAR
  const actualizarSucursal = async () => {

    let departamento = parseInt(document.getElementById('departamento').value);
    let ciudad = parseInt(document.getElementById('ciudad').value);
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;

    const data = {
      IdDepartamento: departamento,
      IdCiudad: ciudad,
      direccion: direccion,
      telefono: telefono,
      IdSucursal: props.data.IdSucursal, //El dato de IdProducto se obtiene de Producto seleccionado.
    }


    //Funcion de bitacora 
    /*  let dataB={
       Id: props.idUsuario
     } */

    axios.put(urlUpdSucursal, data).then(() => {
      swal("Sucursal Actualizada Correctamente", "", "success").then(() => {
        //axios.post(urlUpdBitacora,dataB) //UPDATE BITACORA 
        navegate('/config/listaSucursal');
      })
    }).catch(error => {
      console.log(error);
      swal('Error al Actualizar Sucursal! , porfavor revise todos los campos.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  }

  //INSERTAR  
  const handleNext = () => {
    let departamento = parseInt(document.getElementById('departamento').value);
    let ciudad = parseInt(document.getElementById('ciudad').value);
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;

    let data = {
      IdDepartamento: departamento,
      IdCiudad: ciudad,
      direccion: direccion,
      telefono: telefono
    };

    console.log(data)

    axios.post(urlSucursal, data).then(response => {
      swal('Sucursal agregada con exito', '', 'success').then(result => {
        //axios.post(urlInsertBitacora, dataB)
        navegate('/config/listaSucursal');
      });
    }).catch(error => {
      console.log(error);
      swal('Error al crear Sucursal, los lugar deben ser unico como tu.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  };

  const handleBack = () => {
    navegate('/config/listaSucursal');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        {props.actualizar ? <h2>Actualizar Sucursal</h2> : <h2>Registro de Sucursal</h2>}
        <h3>
          Complete todos los puntos para poder registrar los datos del modelo.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Departamento" className="titleInput" />
              <select name="" className="selectCustom" id="departamento">
                {Departamento.length ? (
                  Departamento.map(pre => (
                    <option key={pre.IdDepartamento} value={pre.IdDepartamento}>
                      {pre.departamento}
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
              <TextCustom text="Ciudad" className="titleInput" />
              <select name="" className="selectCustom" id="ciudad">
                {Ciudad.length ? (
                  Ciudad.map(pre => (
                    <option key={pre.IdCiudad} value={pre.IdCiudad}>
                      {pre.ciudad}
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
              <TextCustom text="Direccion" className="titleInput" />

              <input

                type="text"
                name=""
                maxLength={50}
                className="inputCustom"

                placeholder="direccion"
                id="direccion"
              />

            </div>

            <div className="contInput">
              <TextCustom text="Telefono" className="titleInput" />

              <input

                type="text"
                name=""
                maxLength={13}
                className="inputCustom"

                placeholder="telefono"
                id="telefono"
              />
            </div>


            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"

                onClick={() => {
                  //Validaciones previo a ejecutar el boton
                  var departamento = document.getElementById('departamento').value;
                  var ciudad = document.getElementById('ciudad').value;
                  var direccion = document.getElementById('direccion').value;
                  var telefono = document.getElementById('telefono').value;

                  if (direccion === "" || telefono === "") {
                    swal("No deje campos vacíos.", "", "error");
                  } else if (isNaN(parseInt(telefono))) {
                    swal("El campo telefono solo acepta números.", "", "error");
                  } else
                    props.actualizar ? actualizarSucursal() : handleNext();
                }
                }
              >
                 {props.actualizar ? <h1>{'Finish' ? 'Actualizar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>

        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/005/005/494/non_2x/the-central-cloud-server-has-many-branch-offices-free-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};