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
import { TextField } from '@mui/material';
import axios from 'axios';

const handleChange = (event) => {
  const { name, value } = event.target;
  console.log(`Nuevo valor de ${name}: ${value}`);
};

//URL DE INSERTAR Y ACTUALIZAR 
const urlProductos = 'http://localhost:3000/api/productos';
const urlUpdateGarantia = 'http://localhost:3000/garantias/actualizar';
const urlInsertGarantia = 'http://localhost:3000/garantias/crear';


export const RegistroGarantia = (props) => {

  const [Productos, setProductos] = useState([])
  
  const [mesesGarantia, setGarantia] = React.useState('');
  const [mensaje, setmensaje] = React.useState('');
  const [errormesesGarantia, seterrormesesGarantia] = React.useState(false);

  const [descripcion, setDescripcion] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorDescripcion, setErrorDescripcion] = React.useState(false);

//GET PRODUCTOS
  useEffect(() => {
    axios.get (urlProductos).then (response=>setProductos(response.data))
  }, []);

  const navegate = useNavigate();

 //INSERTAR GARANTIA
  const handleNext = async () => {
    
    let descripcion = document.getElementById ("descripcion").value;
    let mesesGarantia = document.getElementById ("mesesGarantia").value;
    let IdProducto = parseInt(document.getElementById ("IdProducto").value);
    let estado = parseInt(document.getElementById ("estado").value);
    
    // let IdProducto = parseInt(document.getElementById("IdProducto").value)
    // let mesesGarantia = document.getElementById("mesesGarantia").value
    // let estado = parseInt(document.getElementById("estado").value)  
    // let descripcion = document.getElementById("descripcion").value

    let data = {
      descripcion: descripcion,
      mesesGarantia: mesesGarantia,
      IdProducto: IdProducto,
      estado: estado,
    };

    //URL DE INSERTAR LA GARANTIA 
    if (await axios.post(urlInsertGarantia, data)) {
      swal('Garantia creada exitosamente.','', 'success');
      navegate('/menuVentas/listaGarantias');
    }
  };

  //ACTUALIZAR
const actualizarGarantia = async () => {

  let descripcion = document.getElementById ("descripcion").value;
  let mesesGarantia = document.getElementById ("mesesGarantia").value;
  let IdProducto = parseInt(document.getElementById ("IdProducto").value);
  let estado = parseInt(document.getElementById ("estado").value);

  // let IdProducto = parseInt(document.getElementById("IdProducto").value)
  // let mesesGarantia = document.getElementById("mesesGarantia").value
  // let estado = parseInt(document.getElementById("estado").value)  
  // let descripcion = document.getElementById("descripcion").value

  //El dato de IdProducto se obtiene de Producto seleccionado.
  let data = { 
      descripcion: descripcion,
      mesesGarantia: mesesGarantia,
      IdProducto: IdProducto,
      estado: estado,
    IdGarantia:props.data.IdGarantia,
  }

  axios.put(urlUpdateGarantia,data).then(() => {
    swal("Garantia Actualizada Correctamente", "", "success").then(() => {
      navegate('/menuVentas/listaGarantias');
    })
  }).catch(error => {
    console.log(error);
    swal('Error al Actualizar Garantia! , porfavor revise todos los campos.', '', 'error')
  })
};

  //BOTON DE RETROCESO 
  const handleBack = () => {
    navegate('/ventas');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
      {props.update ? <h2>Actualizacion de Garantia</h2> : <h2>Registro de Garantia</h2>}
        <h3>
          Complete todos los puntos para poder registrar la garantia.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <div className="contInput">
              <TextCustom text="ID Producto" className="titleInput" />
              
              <select name="" className="selectCustom" id="producto">
                {Productos.length ? (
                  Productos.map(pre => (
                    <option key={pre.IdProducto} value={pre.IdProducto}>
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
              <TextCustom text="Meses" className="titleInput" />
              <input
                onKeyDown={e => {
                  setGarantia(e.target.value);

                  if (mesesGarantia === '') {
                    seterrormesesGarantia(true);
                    setmensaje('Los campos no deben estar vacios');
                  }
                  else {
                   /*  seterrormesesGarantia(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(mesesGarantia)) {
                      seterrormesesGarantia(true);
                       //setTexto('Solo deben de ingresar numeros');
                    } else {
                      seterrormesesGarantia(false);
                       //setTexto('');
                    } */
                  }
                }}
                type="text"
                name=""
                maxLength={2}
                className="inputCustom"
                placeholder="Meses"
                id="meses"
              />
              <p class="error">{mensaje}</p>
            </div>


            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select name="" className="selectCustom" id="estado">
                <option value={1}>Activo</option>
                <option value={2}>Inactivo</option>
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Descripcion" className="titleInput" />
              <input

                onKeyDown={(e) => {
                  setDescripcion(e.target.value);

                  if (descripcion.length > 100) {
                    setErrorDescripcion(true);
                    setleyenda('A excedido al numero de caracteres');
                  }
                  if (descripcion === '') {
                    setErrorDescripcion(true);
                    setleyenda('Los campos no deben estar vacios');
                  }
                  else {
                    setErrorDescripcion(false);
                    var expresion = /^[a-zA-Z0-9]+$/;
                    if (!expresion.test(descripcion)) {
                      setErrorDescripcion(true);
                      setleyenda('Formato invalido');
                    }
                    else {
                      setErrorDescripcion(false);
                      setleyenda('');
                    }
                  }
                }}

                   

                type="text"
                name=""
                maxLength={100}
                className="inputCustomText"
                placeholder="Descripcion"
                id="descripcion"
              />
              <p class="error">{leyenda}</p>
            </div>


            <div className="contBtnStepper">
              <Button
              variant="contained"
              className="btnStepper"

               onClick={() => {
                let descripcion  = document.getElementById ("descripcion").value;
                let mesesGarantia = document.getElementById ("mesesGarantia").value;
                let IdProducto = parseInt(document.getElementById ("IdProducto").value);
                let estado = parseInt(document.getElementById ("estado").value);


                props.actualizar ? actualizarGarantia() : handleNext();
                
                //   swal('Garantia agregada con exito', '', 'success')
                // navegate('/menuVentas/listaGarantias')
                // handleNext();
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
            'https://static.vecteezy.com/system/resources/previews/015/655/076/non_2x/health-insurance-icon-isometric-style-vector.jpg'}
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};