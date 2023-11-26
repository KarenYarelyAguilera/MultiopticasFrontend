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
import { Bitacora } from '../../Components/bitacora.jsx';


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

 //BITACORAS
 const urlBitacoraInsertProveedor='http://localhost:3000/api/bitacora/insertoproveedores';
 const urlBitacoraUpdateProveedor='http://localhost:3000/api/bitacora/actualizoproveedores';

export const RegistroProveedores = (props) => {

  
  const [Ciudad, setCiudad] = useState([]);
  const [Ciudades, setCiudades]= useState(props.data.IdCiudad)


  const [productos, setProductos] = React.useState(props.data.Productos ||'');
  const [aviso, setaviso] = React.useState('');
  const [errorProductos, setErrorProductos] = React.useState(false);

  const [nombre, setnombre] = React.useState(props.data.CiaProveedora ||'');
  const [msj, setmsj] = React.useState('');
  const [errornombre, setErrornombre] = React.useState(false);

  const [encargado, setencargado] = React.useState(props.data.encargado ||'');
  const [mensaje, setmensaje] = React.useState('');
  const [errorencargado, setErrorencargado] = React.useState(false);

  const [Pais, setPais] = useState([]);
  const [Paises, setPaises]= useState(props.data.IdPais || null)
  const [errorpais, setErrorpais] = React.useState(false);


  const [direccion, setdireccion] = React.useState(props.data.direccion ||'');
  const [validacion, setvalidacion] = React.useState('');
  const [errordireccion, setErrordireccion] = React.useState(false);

  const [tel, settel] = React.useState(props.data.telefono ||'');
  const [adv, setadv] = React.useState('');
  const [errortel, setErrortel] = React.useState(false);

  const [correo, setcorreo] = React.useState(props.data.correoElectronico ||'');
  const [parrafo, setparrafo] = React.useState('');
  const [errorcorreo, setErrorcorreo] = React.useState(false);
  const [estado, setEstado] = useState(props.data.estado || null)
  

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
      CiaProveedora: CiaProveedora.toUpperCase(),
      encargado: encargado.toUpperCase(),
      IdPais: pais,
      IdCiudad: ciudad,
      Productos: productos.toUpperCase(),
      direccion: direccion.toUpperCase(),
      telefono: telefono,
      correoElectronico: correoElectronico,
      estado: document.getElementById('estado').value,
      IdProveedor: props.data.IdProveedor, //El dato de IdProducto se obtiene de Producto seleccionado.
    };
    let dataB = {
      Id: props.idUsuario
    };
    const bitacora = {
      urlB: urlBitacoraUpdateProveedor,
      activo: props.activo,
      dataB: dataB
    };

    axios.put(urlUpdProveedor, data).then(response => {
      console.log(response);
      if(response.data == false){
        swal('¡Este Proveedor ya existe!', '', 'error')
      }else{
        swal("Proveedor Actualizado Correctamente", "", "success").then(() => {
          Bitacora(bitacora) 
           navegate('/menuInventario/ListaProveedores');
        });
      }
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
      CiaProveedora: CiaProveedora.toUpperCase(),
      encargado: encargado.toUpperCase(),
      IdPais: pais,
      IdCiudad: ciudad,
      Productos: productos.toUpperCase(),
      direccion: direccion.toUpperCase(),
      telefono: telefono,
      correoElectronico: correoElectronico,
      estado: document.getElementById('estado').value,
    };
    let dataB = {
      Id: props.idUsuario
    };
    const bitacora = {
      urlB: urlBitacoraInsertProveedor,
      activo: props.activo,
      dataB: dataB
    };

    //Consumo de API y lanzamiento se alerta
    axios.post(urlProveedor, data).then(response => {
      console.log(response);
      if(response.data == false){
        swal('¡Este Proveedor ya existe!', '', 'error')
      }else{
        swal('Proveedor agregado con exito', '', 'success').then(result => {
          Bitacora(bitacora)
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
    navegate('/menuInventario/ListaProveedores');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        {props.actualizar ? <h2>Actualizar Proveedor</h2> : <h2>Registro de Proveedor</h2>}
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
                placeholder="Nombre de la empresa"
                id="CiaProveedora"
                value={nombre}
              />
              <p class="error">{msj}</p>
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
                placeholder="Nombre del encargado"
                id="encargado"
                value= {encargado}
              />
              <p class="error">{mensaje}</p>
            </div>

      

            <div className="contInput">
              <TextCustom text="Teléfono" className="titleInput" />

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
                maxLength={20}
                className="inputCustom"
                placeholder="Teléfono"
                id="telefono"
                value={tel}
              />
              <p class="error">{adv}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Correo Electrónico" className="titleInput" />

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
                placeholder="Correo Electrónico"
                id="correoElectronico"
                value={correo}
              />
              <p class="error">{parrafo}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Pais" className="titleInput" />
              <select name="" className="selectCustom" id="pais" value={Paises} onChange={(e)=>{
                setPaises(e.target.value)
              }}>
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
              <TextCustom text="Ciudad" className="titleInput" />
              <select name="" className="selectCustom" id="ciudad" value={Ciudades} onChange={(e)=>{
                setCiudades(e.target.value)
              }}>
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
                placeholder="Productos que ofrecen"
                id="productos"
                value={productos}
              />
              <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Dirección" className="titleInput" />
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
                className="inputCustom"
                placeholder="Dirección"
                id="direccion"
                value= {direccion}
              />
              <p class="error">{validacion}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select id="estado" className="selectCustom" value={estado} onChange={(e)=>{
                setEstado(e.target.value)
              }}>
                <option value={"Activo"}>Activo</option>
                <option value={"Inactivo"}>Inactivo</option>
              </select>
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
                  } else if (!/^[A-Z0-9]{3,}( [A-Z0-9]+)*$/.test(CiaProveedora)) {
                    swal("El campo Empresa solo acepta letras mayúsculas, números y un mínimo de 3 caracteres con un espacio entre palabras.", "", "error");
                  }
                   else if (!/^[A-Z]{3,}( [A-Z]+)*$/.test(encargado)) {
                    swal("El campo encargado solo acepta letras mayúsculas y un mínimo de 3 caracteres con un espacio entre palabras.", "", "error");
                  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico)) {
                    swal("El campo correo debe contener un correo válido.", "", "error");
                  } else if (!/^[A-Z]{3,}( [A-Z]+)*$/.test(productos)) {
                    swal("El campo producto solo acepta letras mayúsculas y un mínimo de 3 caracteres con un espacio entre palabras.", "", "error");
                  } 
                  else if (!/^[A-Z0-9]{3,}( [A-Z0-9]+)*$/.test(direccion)) {
                    swal("El campo dirección solo acepta letras mayúsculas, números y un mínimo de 3 caracteres con un espacio entre palabras.", "", "error");
                  }else if (isNaN(parseInt(telefono))) {
                    swal("El campo teléfono solo acepta números.", "", "error");
                  }
                  
                   else
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