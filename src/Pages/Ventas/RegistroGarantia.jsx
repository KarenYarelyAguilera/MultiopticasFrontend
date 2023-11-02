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
import axios from 'axios'; //Agregarlo siempre porque se necesita para exportar Axios para que se puedan consumir las Apis 

//URL DE INSERTAR Y ACTUALIZAR 
const urlProductos = 'http://localhost:3000/api/productos'; //API DE PRODUCTO
const urlUpdateGarantia = 'http://localhost:3000/api/garantias/actualizar';//API DE ACTUALIZAR
const urlInsertGarantia = 'http://localhost:3000/api/garantias/crear';//CREAR 


export const RegistroGarantia = (props) => {

  const [Productos, setProductos] = useState([])
  
  const [mesesGarantia, setGarantia] = React.useState(props.data.Meses ||'');
  const [mensaje, setmensaje] = React.useState('');
  const [errormesesGarantia, seterrormesesGarantia] = React.useState(false);

  const [descripcion, setDescripcion] = React.useState(props.data.descripcion ||'');
  const [leyenda, setleyenda] = React.useState('');
  const [errorDescripcion, setErrorDescripcion] = React.useState(false);

//GET PRODUCTOS
  useEffect(() => {
    axios.get (urlProductos).then (response=>setProductos(response.data))
  }, []);

  const navegate = useNavigate();

 //INSERTAR GARANTIA
  const handleNext = async () => {
    
    let IdProducto = parseInt(document.getElementById ("IdProducto").value);
    let mesesGarantia = document.getElementById ("mesesGarantia").value;
    let estado = parseInt(document.getElementById ("estado").value);
    let descripcion = document.getElementById ("descripcion").value;

    let data = {
      IdProducto: IdProducto,
      mesesGarantia: mesesGarantia,
      estado: estado,
      descripcion: descripcion,
    };

     //Consumo de API y lanzamiento se alerta
  axios.post(urlInsertGarantia, data).then(response => {
    swal('Garantia creada exitosamente', '', 'success').then(result => {
      navegate('/menuVentas/listaGarantias');
    });
  }).catch(error => {
    console.log(error);
    swal('Error al crear la garantia , porfavor revise los campos.', '', 'error')
 
  }
  )
};

  //ACTUALIZAR
const actualizarGarantia = async () => {

  let IdProducto = parseInt(document.getElementById ("IdProducto").value);
  let mesesGarantia = document.getElementById ("mesesGarantia").value;
  let estado = parseInt(document.getElementById ("estado").value);
  let descripcion = document.getElementById ("descripcion").value;

  // let IdProducto = parseInt(document.getElementById("IdProducto").value)
  // let mesesGarantia = document.getElementById("mesesGarantia").value
  // let estado = parseInt(document.getElementById("estado").value)  
  // let descripcion = document.getElementById("descripcion").value

  //El dato de IdProducto se obtiene de Producto seleccionado.
 const data = {
    IdProducto: IdProducto,
    mesesGarantia: mesesGarantia,
    estado: estado,
    descripcion: descripcion,
    IdGarantia:props.data.IdGarantia,
  };

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
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de garantia ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        props.limpiarData({})
        props.limpiarUpdate(false)
        navegate('/menuVentas/listaGarantias');
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
      {props.actualizar ? <h2>Actualizacion de Garantia</h2> : <h2>Registro de Garantia</h2>}
        <h3>
          Complete todos los puntos para poder registrar la garantia.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <div className="contInput">
              <TextCustom text="ID Producto" className="titleInput" />
              
              <select name="" className="selectCustom" id="IdProducto">
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
                  if (mesesGarantia === "") {
                    seterrormesesGarantia(true);
                    setmensaje("Los campos no deben de quedar vacíos");
                  } else {
                    seterrormesesGarantia(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(mesesGarantia)) {
                      seterrormesesGarantia(true);
                      setmensaje('El campo meses solo acepta numeros.')
                    } else {
                      seterrormesesGarantia(false);
                      setmensaje("");
                    }
                  }
                }
                }
                onChange={e => setGarantia(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar

                error= {errormesesGarantia}
                type="number"
                name=""
                maxLength={2}
                className="inputCustom"
                placeholder="Meses"
                id="mesesGarantia"
                value={mesesGarantia}
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
                onKeyDown={e => { setDescripcion(e.target.value);
                  if (descripcion === "") {
                    setErrorDescripcion(true);
                    setleyenda("Los campos no deben de quedar vacíos");
                  } else {
                    setErrorDescripcion(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(descripcion)) {
                      setErrorDescripcion(true);
                      setleyenda('Solo debe ingresar letras mayúsculas y un espacio entre palabras')
                    } else if (/(.)\1{2,}/.test(descripcion)) {
                      setErrorDescripcion(true);
                      setleyenda("No se permiten letras consecutivas repetidas");
                    } else {
                      setErrorDescripcion(false);
                      setleyenda("");
                    }
                  }
                }
                }
                onChange={e => setDescripcion(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error= {errorDescripcion}
                type="text"
                name=""
                maxLength={100}
                className="inputCustomText"
                placeholder="Descripcion"
                id="descripcion"
                value={descripcion}
              />
              <p class="error">{leyenda}</p>
            </div>


            <div className="contBtnStepper">
              <Button
              variant="contained"
              className="btnStepper"

               onClick={() => {
                 //Validaciones previo a ejecutar el boton
                var descripcion  = document.getElementById ("descripcion").value;
                var mesesGarantia = document.getElementById ("mesesGarantia").value;
                
                if ( descripcion ==="" || mesesGarantia ==="" ){
                  swal ("No deje campos vacios.","","error");
                } else if (/^[A-Z]+(?: [A-Z]+)*$/.test(descripcion)){
                  setErrorDescripcion(true);
                  swal("El campo de descripcion solo acepta letras mayusculas.","","error");
                }else if (isNaN(parseInt(mesesGarantia))){
                  seterrormesesGarantia(true)
                  swal("El campo meses solo acepta numeros.","","error");
                }else{
                }
                  props.actualizar ? actualizarGarantia() : handleNext();
                }
                }
              >
                 {props.actualizar ? <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
              </Button>
            </div>
          </div>
        </div>

        <img
          src={'https://static.vecteezy.com/system/resources/previews/015/655/076/non_2x/health-insurance-icon-isometric-style-vector.jpg'}
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};