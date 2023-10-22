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
import axios from 'axios';


//APIS DE PROVEEDOR
const urlProveedor = //CREAR
  'http://localhost:3000/api/proveedor/NuevoProveedor';
const urlUpdProveedor = //ACTUALIZAR
  'http://localhost:3000/api/proveedor/ActualizarProveedor';
const urlDelProveedor = //BORRAR
  'http://localhost:3000/api/proveedor/EliminarProveedor';
const urlPaises = //Paises
  'http://localhost:3000/api/paises';
const urlCiudades = //Ciudades
  'http://localhost:3000/api/ciudades';


export const RegistroProveedores = (props) => {

  
  const [Ciudad, setCiudad] = useState([]);

  const [productos, setProductos] = React.useState(props.data.Productos ||'');
  const [aviso, setaviso] = React.useState('');
  const [errorProductos, setErrorProductos] = React.useState(false);

  const [nombre, setnombre] = React.useState(props.data.CiaProveedora ||'');
  const [msj, setmsj] = React.useState('');
  const [errornombre, setErrornombre] = React.useState(false);

  const [encargado, setencargado] = React.useState(props.data.encargado ||'');
  const [mensaje, setmensaje] = React.useState('');
  const [errorencargado, setErrorencargado] = React.useState(false);

  const [Pais, setPais] = useState([],props.data.Pais ||'');
  const [errorpais, setErrorpais] = React.useState(false);

  const [advertencia, setadvertencia] = React.useState('');
  const [errorciudad, setErrorciudad] = React.useState(false);

  const [direccion, setdireccion] = React.useState(props.data.direccion ||'');
  const [validacion, setvalidacion] = React.useState('');
  const [errordireccion, setErrordireccion] = React.useState(false);

  const [tel, settel] = React.useState(props.data.telefono ||'');
  const [adv, setadv] = React.useState('');
  const [errortel, setErrortel] = React.useState(false);

  const [correo, setcorreo] = React.useState(props.data.correoElectronico ||'');
  const [parrafo, setparrafo] = React.useState('');
  const [errorcorreo, setErrorcorreo] = React.useState(false);

  useEffect(() => {
    fetch(urlPaises)
      .then(response => response.json())
      .then(data => setPais(data));
    fetch(urlCiudades)
      .then(response => response.json())
      .then(data => setCiudad(data));
  }, []);

  const navegate = useNavigate();

  //ACTUALIZAR
  const actualizarProveedor = async () => {

    let CiaProveedora = document.getElementById("CiaProveedora").value
    let encargado = document.getElementById("encargado").value;
    let pais = parseInt(document.getElementById("pais").value);
    let ciudad = parseInt(document.getElementById("ciudad").value);
    let productos = document.getElementById("productos").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let correoElectronico = document.getElementById("correoElectronico").value;

    const data = {
      CiaProveedora: CiaProveedora,
      encargado: encargado,
      IdPais: pais,
      IdCiudad: ciudad,
      Productos: productos,
      direccion: direccion,
      telefono: telefono,
      correoElectronico: correoElectronico,
      IdProveedor: props.data.IdProveedor, //El dato de IdProducto se obtiene de Producto seleccionado.
    }


    //Funcion de bitacora 
    /*  let dataB={
       Id: props.idUsuario
     } */

    axios.put(urlUpdProveedor, data).then(() => {
      swal("Proveedor Actualizado Correctamente", "", "success").then(() => {
        //axios.post(urlUpdBitacora,dataB) //UPDATE BITACORA 
        navegate('/menuInventario/ListaProveedores');
      })
    }).catch(error => {
      console.log(error);
      swal('Error al Actualizar Proveedor! , porfavor revise todos los campos.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  }

  //CREAR
  const handleNext = () => {
    let CiaProveedora = document.getElementById("CiaProveedora").value
    let encargado = document.getElementById("encargado").value;
    let pais = parseInt(document.getElementById("pais").value);
    let ciudad = parseInt(document.getElementById("ciudad").value);
    let productos = document.getElementById("productos").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let correoElectronico = document.getElementById("correoElectronico").value;

    let data = {
      CiaProveedora: CiaProveedora,
      encargado: encargado,
      IdPais: pais,
      IdCiudad: ciudad,
      Productos: productos,
      direccion: direccion,
      telefono: telefono,
      correoElectronico: correoElectronico,
    };

    //Consumo de API y lanzamiento se alerta
    axios.post(urlProveedor, data).then(response => {
      console.log(response);
      if(response.data == false){
        swal('¡Este Proveedor ya existe!', '', 'error')
      }else{
        swal('Proveedor agregado con exito', '', 'success').then(result => {
          //axios.post(urlInsertBitacora, dataB)
          navegate('/menuInventario/ListaProveedores');
        });
      }
    }).catch(error => {
      console.log(error);
      swal('Error al crear Proveedor, porfavor revise los campos.', '', 'error')
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
        {props.actualizar ? <h2>Actualizar Proveedor</h2> : <h2>Registro de Proveedor</h2>}
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
                onKeyDown={e => {
                  setnombre(e.target.value);
                  if (nombre == '') {
                    setErrornombre(true);
                    setmsj('Los campos no deben estar vacios');
                  } else {
                    setErrornombre(false);
                    var preg_match = /^[a-zA-Z]+$/;
                    if (!preg_match.test(nombre)) {
                      setErrornombre(true);
                      setmsj('Solo deben de ingresar letras');
                    } else {
                      setErrornombre(false);
                      setmsj('');
                    }
                  }
                }}
                onChange={e => setnombre(e.target.value)}
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="nombreProveedor"
                id="CiaProveedora"
                value={nombre}
              />
              <p class="error">{msj}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Productos" className="titleInput" />

              <input
                onKeyDown={e => {
                  setProductos(e.target.value);
                  if (nombre == '') {
                    setErrorProductos(true);
                    setmsj('Los campos no deben estar vacios');
                  } else {
                    setErrorProductos(false);
                    var preg_match = /^[a-zA-Z]+$/;
                    if (!preg_match.test(productos)) {
                      setErrorProductos(true);
                      setmsj('Solo deben de ingresar letras');
                    } else {
                      setErrorProductos(false);
                      setmsj('');
                    }
                  }
                }}
                onChange={e => setProductos(e.target.value)}
                type="text"
                name=""
                maxLength={200}
                className="inputCustom"
                placeholder="Producto que le ofrece..."
                id="productos"
                value={productos}
              />
              <p class="error">{aviso}</p>
            </div>
            <div className="contInput">
              <TextCustom text="Persona Encargada" className="titleInput" />

              <input
                onKeyDown={e => {
                  setencargado(e.target.value);
                  if (encargado == '') {
                    setErrorencargado(true);
                    setmensaje('Los campos no deben estar vacios');
                  } else {
                    setErrorencargado(false);
                    var preg_match = /^[a-zA-Z]+$/;
                    if (!preg_match.test(encargado)) {
                      setErrorencargado(true);
                      setmensaje('Solo deben de ingresar letras');
                    } else {
                      setErrorencargado(false);
                      setmensaje('');
                    }
                  }
                }}
                onChange={e => setencargado(e.target.value)}
                type="text"
                name=""
                maxLength={50}
                className="inputCustom"
                placeholder="encargado"
                id="encargado"
                value= {encargado}
              />
              <p class="error">{mensaje}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Pais" className="titleInput" />
              <select name="" className="selectCustom" id="pais">
                {Pais.length ? (
                  Pais.map(pre => (
                    <option key={pre.IdPais} value={pre.IdPais}>
                      {pre.Pais}
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
              <TextCustom text="Telefono" className="titleInput" />

              <input

                onKeyDown={e => {
                  settel(e.target.value);
                  if (tel === '') {
                    setErrortel(true);
                    setadv('Los campos no deben estar vacios');
                  } else {
                    setErrortel(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(tel)) {
                      setErrortel(true);
                      setadv('Solo deben de ingresar numeros');
                    } else {
                      setErrortel(false);
                      setadv('');
                    }
                  }
                }}
                onChange={e => settel(e.target.value)}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="telefono"
                id="telefono"
                value={tel}
              />
              <p class="error">{adv}</p>
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
             {/*  onChange={e => setencargado(e.target.value)}
              value={Ciudad} */}
            </div>

            <div className="contInput">
              <TextCustom text="Correo Electronico" className="titleInput" />

              <input
                onKeyDown={e => {
                  setcorreo(e.target.value);
                  if (correo == '') {
                    setErrorcorreo(true);
                    setparrafo('Los campos no deben estar vacios');
                  }
                  else {
                    setErrorcorreo(false);
                    var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!expresion.test(correo)) {
                      setErrorcorreo(true);
                      setparrafo('Formato invalido');
                    } else {
                      setErrorcorreo(false);
                      setparrafo('');
                    }
                  }
                }}
                onChange={e => setcorreo(e.target.value)}
                type="text"
                name=""
                maxLength={100}
                className="inputCustom"
                placeholder="correoElectronico"
                id="correoElectronico"
                value={correo}
              />
              <p class="error">{parrafo}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Direccion" className="titleInput" />
              <input
                onKeyDown={e => {
                  setdireccion(e.target.value);
                  if (direccion == '') {
                    setErrordireccion(true);
                    setvalidacion('Los campos no deben estar vacios');
                  } else {
                    setErrordireccion(false);
                    setvalidacion('');
                  }
                }
                }
                onChange={e => setdireccion(e.target.value)}
                type="text"
                name=""
                maxLength={100}
                className="inputCustomText"
                placeholder="direccion"
                id="direccion"
                value= {direccion}
              />
              <p class="error">{validacion}</p>
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  //Validaciones previo a ejecutar el boton
                  var CiaProveedora = document.getElementById("CiaProveedora").value
                  var encargado = document.getElementById("encargado").value;
                  var productos = document.getElementById("productos").value;
                  var direccion = document.getElementById("direccion").value;
                  var telefono = document.getElementById("telefono").value;
                  var correoElectronico = document.getElementById("correoElectronico").value;

                  if (CiaProveedora === "" || encargado === "" || productos === "" || direccion === "" || telefono === "" || correoElectronico === "") {
                    swal("No deje campos vacíos.", "", "error");
                  } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(encargado)) {
                    swal("El campo encargado solo acepta letras y solo un espacio entre palabras.", "", "error");
                  } else if (isNaN(parseInt(telefono))) {
                    swal("El campo teléfono solo acepta números.", "", "error");
                  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico)) {
                    swal("El campo correo debe contener un correo válido.", "", "error");
                  } else
                    props.actualizar ? actualizarProveedor() : handleNext();
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
            'https://static.vecteezy.com/system/resources/previews/014/049/158/non_2x/flat-cloud-data-storage-remote-backup-of-files-data-center-and-database-concept-outline-design-style-minimal-illustration-for-landing-page-web-banner-infographics-hero-images-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};