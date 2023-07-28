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
import axios from 'axios'; //Se necesita exportar Axios para consumiar las APIs

//APIS DE PRODUCTO
const urlProducto = //CREAR
  'http://localhost:3000/api/productos/crear';
const urlUpdProducto = //ACTUALIZAR
  'http://localhost:3000/api/productos/actualizar';
const urlDelProducto = //BORRAR
  'http://localhost:3000/api/productos/eliminar';
const urlModelos = //MOSTRAR MODELOS
  'http://localhost:3000/api/modelos';



export const RegistroProducto2 = (props) => {
  
  const [Modelo, setModelo] = useState([]);

  const [leyenda, setleyenda] = React.useState('');
  const [errorproducto, setErrorproducto] = React.useState(false);
  const [producto, setproducto] = React.useState(false);

  const [precio, setprecio] = React.useState('');
  const [errorprecio, setErrorprecio] = React.useState(false);
  const [aviso, setaviso] = React.useState(false);

  const [cantidadmax, setcantidadmax] = React.useState('');
  const [mensaje, setmensaje] = React.useState('');
  const [errorcantidadmax, setErrorcantidadmax] = React.useState(false);

  const [cantidadmin, setcantidadmin] = React.useState('');
  const [advertencia, setadvertencia] = React.useState('');
  const [errorcantidadmin, setErrorcantidadmin] = React.useState(false);

  const [descrpcion, setdescripcion] = React.useState('');
  const [msj, setmsj] = React.useState('');
  const [errordescripcion, setErrordescripcion] = React.useState(false);
//Se usa para mostrar informacion en un listbox
  useEffect(() => {
    fetch(urlModelos)
      .then(response => response.json())
      .then(data => setModelo(data));
  }, []);

  const navegate = useNavigate();

    //ACTUALIZAR
    const actualizarProducto = async () => {

      let precio = parseFloat(document.getElementById('precio').value);
      let cantidadMin = parseInt(document.getElementById('cantidadMin').value);
      let cantidadMax = parseInt(document.getElementById('cantidadMax').value);
      let descripcion = document.getElementById('descripcion').value;
  
      const data = {
        precio: precio,
        cantidadMin: cantidadMin,
        cantidadMax: cantidadMax,
        descripcion: descripcion,
        IdProducto: props.data.IdProducto, //El dato de IdProducto se obtiene de Producto seleccionado.
      }
  
  
      //Funcion de bitacora 
      /*  let dataB={
         Id: props.idUsuario
       } */
  
      axios.put(urlUpdProducto, data).then(() => {
        swal("Producto Actualizado Correctamente", "", "success").then(() => {
          //axios.post(urlUpdBitacora,dataB) //UPDATE BITACORA 
          navegate('/menuInventario/ListaProductos');
        })
      }).catch(error => {
        console.log(error);
        swal('Error al Actualizar Producto! , porfavor revise todos los campos.', '', 'error')
        // axios.post(urlErrorInsertBitacora, dataB)
      })
  
    }

  //INSERTAR
  const handleNext = () => {
    //Variables que almacenaran lo que entre en los input
    let modelo = parseInt(document.getElementById('modelo').value);
    let precio = parseFloat(document.getElementById('precio').value);
    let cantidadMin = parseInt(document.getElementById('cantidadMin').value);
    let cantidadMax = parseInt(document.getElementById('cantidadMax').value);
    let descripcion = document.getElementById('descripcion').value;


    let data = {
      //IdProducto: parseInt(document.getElementById('idProducto').value),
      IdModelo: modelo,
      precio: precio,
      cantidadMin: cantidadMin,
      cantidadMax: cantidadMax,
      descripcion: descripcion,
    };

    //Consumo de API y lanzamiento se alerta
    axios.post(urlProducto, data).then(response => {
      swal('Producto agregado con exito', '', 'success').then(result => {
        //axios.post(urlInsertBitacora, dataB)
        navegate('/menuInventario/ListaProductos');
      });
    }).catch(error => {
      console.log(error);
      swal('Error al crear Producto, los modelos deben ser unicos como tu.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

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
        {props.actualizar ? <h2>Actualizar Producto</h2> : <h2>Registro de Producto</h2>}
        <h3>Complete todos los puntos para poder registrar el producto.</h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <div className="contInput">
              <TextCustom text="Modelo" className="titleInput" />
              <select name="" className="selectCustom" id="modelo">
                {Modelo.length ? (
                  Modelo.map(pre => (
                    <option key={pre.IdModelo} value={pre.IdModelo}>
                      {pre.Modelo}
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
                onKeyDown={e => {
                  setprecio(e.target.value);
                  if (precio === '') {
                    setErrorprecio(true);
                    setaviso('Los campos no deben estar vacios');
                  } else {
                    setErrorprecio(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(precio)) {
                      setErrorprecio(true);
                      setaviso('Solo deben de ingresar numeros');
                    } else {
                      setErrorprecio(false);
                      setaviso('');
                    }
                  }
                }}
                error={errorprecio}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Precio"
                id="precio"
              />
              <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Cantidad Maxima" className="titleInput" />

              <input
                onKeyDown={e => {
                  setcantidadmax(e.target.value);
                  if (cantidadmax === '') {
                    setErrorcantidadmax(true);
                    setmensaje('Los campos no deben estar vacios');
                  } else {
                    setErrorcantidadmax(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(cantidadmax)) {
                      setErrorcantidadmax(true);
                      setmensaje('Solo deben de ingresar numeros');
                    } else {
                      setErrorcantidadmax(false);
                      setmensaje('');
                    }
                  }
                }}
                error={errorcantidadmax}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Cantidad Maxima"
                id="cantidadMax"
              />
              <p class="error">{mensaje}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Cantidad Minima" className="titleInput" />

              <input
                onKeyDown={e => {
                  setcantidadmin(e.target.value);
                  if (cantidadmin === '') {
                    setErrorcantidadmin(true);
                    setadvertencia('Los campos no deben estar vacios');
                  } else {
                    setErrorcantidadmin(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(cantidadmin)) {
                      setErrorcantidadmin(true);
                      setadvertencia('Solo deben de ingresar numeros');
                    } else {
                      setErrorcantidadmin(false);
                      setadvertencia('');
                    }
                  }
                }}
                error={errorcantidadmin}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Cantidad Minima"
                id="cantidadMin"
              />
              <p class="error">{advertencia}</p>
            </div>

            <div className="contInput">
              <TextCustom
                text="Descripcion del Producto"
                className="titleInput"
              />
              <input
                onKeyDown={e => {
                  setdescripcion(e.target.value);
                  if (descrpcion == '') {
                    setErrordescripcion(true);
                    setmsj('Los campos no deben estar vacios');
                  } else {
                    setErrordescripcion(false);
                    setmsj('');
                  }
                }}
                error={errordescripcion}
                type="text"
                name=""
                maxLength={60}
                className="inputCustomText"
                placeholder="Descripcion del Producto"
                id="descripcion"
              />
              <p class="error">{msj}</p>
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  //Validaciones previo a ejecutar el boton
                  var precio = parseFloat(document.getElementById('precio').value);
                  var cantidadMin = parseInt(document.getElementById('cantidadMin').value);
                  var cantidadMax = parseInt(document.getElementById('cantidadMax').value);
                  var descripcion = document.getElementById('descripcion').value;

                  if (precio === "" || cantidadMin === "" || cantidadMax === "" || descripcion === "") {
                    swal("No deje campos vacíos.", "", "error");
                 /*  } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(descripcion)) {
                    swal("El campo descripcion solo acepta letras y solo un espacio entre palabras.", "", "error"); */
                  } else if (isNaN(parseInt(cantidadMin))) {
                    swal("El campo cantidadMin solo acepta números.", "", "error");
                  } else if (isNaN(parseInt(cantidadMax))) {
                    swal("El campo cantiadMax solo acepta números.", "", "error");
                  } else if (isNaN(parseFloat(precio))) {
                    swal("El campo precio solo acepta números.", "", "error");
                  } else
                    props.actualizar ? actualizarProducto() : handleNext();
                }
                }
              >
                {props.actualizar ? <h1>{'Finish' ? 'Actualizar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
              </Button>
            </div>
          </div>
        </div>



        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/007/059/184/non_2x/abstract-button-icon-folder-with-documents-on-a-white-background-vector.jpg'
          }
          className="imgCont"
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};