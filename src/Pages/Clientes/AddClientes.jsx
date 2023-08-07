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
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';
import axios from 'axios';


const urlGenero = 
    'http://localhost:3000/api/Genero';

const urlInsertCliente =
  'http://localhost:3000/api/clientes/clienteNuevo';
//insertar usuario
const urlClienteActualizar =
  'http://localhost:3000/api/clientes/actualizar';
//actualizar usuario


export const AddClientes = (props) => {
  const [procesoEnCurso, setProcesoEnCurso] = useState(true)
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };

  const [sucursales, setSucursales] = useState([]);

  const [iIdentidad, setiIdentidad] = React.useState(props.data.idCliente ||'');
  const [leyenda, setleyenda] = React.useState('');
  const [errorIdentidad, setErrorIdentidad] = React.useState(false);

  const [Nombre, setNombre] = React.useState(props.data.nombre ||'');
  const [errorNombre, setErrorNombre] = React.useState();
  const [Msj, setMsj] = React.useState(false);

  const [Apellido, setApellido] = React.useState(props.data.apellido ||'');
  const [errorApellido, setErrorApellido] = React.useState(false);
  const [aviso, setAviso] = React.useState(false);

  const [Telefono, setTelefono] = useState(props.data.telefono ||'');
  const [errorTelefono, setErrorTelefono] = React.useState(false);
  const [texto, setTexto] = React.useState(false);

  const [direccion, setdireccion] = React.useState(props.data.direccion ||'');
  const [mensaje, setmensaje] = React.useState(false);
  const [errordireccion, setErrordireccion] = React.useState(false);

  const [correoelec, setcorreoelec] = React.useState(props.data.correo ||'');
  const [advertencia, setadvertencia] = React.useState(false);
  const [errorcorreoelec, setErrorcorreoelec] = React.useState(false);

  const navegate = useNavigate();

  useEffect(() => {
    axios.get (urlGenero).then (response=>setGenero(response.data))
  }, []);
  const [Genero, setGenero] = useState([])

  //ACTUALIZAR
  const actualizarCliente = async () => {

    let nombres = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellido').value;
    let telefono = document.getElementById('phone').value;
    let genero = parseInt(document.getElementById('genero').value);
    let direccion = document.getElementById('direccion').value;
    let correo = document.getElementById('correo').value
    let fechaN = document.getElementById('fechaN').value

    let fecha = new Date(fechaN)

    let anio = fecha.getFullYear().toString();
    let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    let dia = fecha.getDate().toString().padStart(2, "0");

    
    let fechaFormateada = anio + "/" + mes + "/" + dia;

    const data = {
      nombre: nombres,
      apellido: apellidos,
      idGenero: genero,
      fechaNacimiento: fechaFormateada,
      direccion: direccion,
      telefono: telefono,
      correo: correo,
      idCliente: props.data.idCliente, //El dato de IdCliente se obtiene de Cliente seleccionado.
    }

    //Funcion de bitacora 
    /*  let dataB={
       Id: props.idUsuario
     } */

    axios.put(urlClienteActualizar, data).then(() => {
      swal("Cliente Actualizado Correctamente", "", "success").then(() => {
        //axios.post(urlUpdBitacora,dataB) //UPDATE BITACORA 
        navegate('/menuClientes/lista');
      })
    }).catch(error => {
      console.log(error);
      swal('Error al Actualizar Cliente! , por favor revise todos los campos.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  }


  // CREAR
  const handleNext = async () => {
    let identidad = document.getElementById('Nidentidad').value;
    let nombres = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellido').value;
    let telefono = document.getElementById('phone').value;
    let genero = parseInt(document.getElementById('genero').value);
    let direccion = document.getElementById('direccion').value;
    let correo = document.getElementById('correo').value
    let fechaN = document.getElementById('fechaN').value

    let fecha = new Date(fechaN)

    let anio = fecha.getFullYear().toString();
    let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    let dia = fecha.getDate().toString().padStart(2, "0");


    let fechaFormateada = anio + "/" + mes + "/" + dia;

    let data = {
      idCliente: identidad,
      nombre: nombres,
      apellido: apellidos,
      idGenero: genero,
      fechaNacimiento: fechaFormateada,
      direccion: direccion,
      telefono: telefono,
      correo: correo
    };

    axios.post(urlInsertCliente, data).then(response => {
      swal('Cliente agregado con exito', '', 'success').then(result => {
        navegate('/menuClientes/lista');
      });
    }).catch(error => {
      console.log(error);
      swal('Error al crear el cliente, por favor revise los campos.', '', 'error')
   
    })

  };

 /*  const handleBack = () => {
    navegate('/menuClientes');
  };
 */


  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de cliente ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        navegate('/menuClientes');
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
      {props.actualizar ? <h2>Actualizar Cliente</h2> : <h2>Registro de Cliente</h2>}
        <h3>
          Complete todos los puntos para poder registrar los datos del cliente
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Numero de Identidad" className="titleInput" />

              <input
                onKeyDown={e => {
                  setiIdentidad(e.target.value);
                  if (iIdentidad === '') {
                    setErrorIdentidad(true);
                    setleyenda('Los campos no deben estar vacíos');
                  } else {
                    setErrorIdentidad(false);
                    var regex = /^\d{13}$/;
                    if (!regex.test(iIdentidad)) {
                      setErrorIdentidad(true);
                      setleyenda('El número de identidad debe tener el formato correcto');
                    } else {
                      setErrorIdentidad(false);
                      var primeroscuatrodigitos = parseInt(iIdentidad.substring(0, 4));
                      if (primeroscuatrodigitos < 101 || primeroscuatrodigitos > 1811) {
                        setErrorIdentidad(true);
                        setleyenda('El número de identidad es inválido');
                      } else {
                        setErrorIdentidad(false);
                        setleyenda('');
                      }
                    }
                  }
                }}
                onChange={e => setiIdentidad(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errorIdentidad}
                helperText={leyenda}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Identidad"
                id="Nidentidad"
                value={iIdentidad}

              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Nombre" />
              <input
                onKeyDown={e => {
                  setNombre(e.target.value);
                  if (Nombre === '') {
                    setErrorNombre(true);
                    setMsj('Los campos no deben estar vacíos');
                  } else {
                    setErrorNombre(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(Nombre)) {
                      setErrorNombre(true);
                      setMsj('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(Nombre)) {
                      setErrorNombre(true);
                      setMsj('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrorNombre(false);
                      setMsj('');
                    }
                  }
                }}
                onChange={e => setNombre(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errorNombre}
                type="text"
                helperText={Msj}
                name=""
                className="inputCustom"
                maxLength={50}
                placeholder="Nombre"
                id="nombre"
                value={Nombre}
              />
              <p className="error">{Msj}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Apellido" className="titleInput" />
              <input
                onKeyDown={e => {
                  setApellido(e.target.value);
                  if (Apellido === '') {
                    setErrorApellido(true);
                    setAviso('Los campos no deben estar vacíos');
                  } else {
                    setErrorApellido(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(Apellido)) {
                      setErrorApellido(true);
                      setAviso('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(Apellido)) {
                      setErrorApellido(true);
                      setAviso('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrorApellido(false);
                      setAviso('');
                    }
                  }
                }}
                onChange={e => setApellido(e.target.value)} 
                error={errorApellido}
                type="text"
                name=""
                helperText={aviso}
                maxLength={50}
                className="inputCustom"
                placeholder="Apellido"
                id="apellido"
                value={Apellido}
              />
              <p className="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Direccion" className="titleInput" />
              <input
                onKeyDown={e => {
                  setdireccion(e.target.value);
                  if (direccion === '') {
                    setErrordireccion(true);
                    setmensaje('Los campos no deben estar vacíos');
                  } else {
                    setErrordireccion(false);
                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                    if (!regex.test(direccion)) {
                      setErrordireccion(true);
                      setmensaje('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                    } else if (/(.)\1{2,}/.test(direccion)) {
                      setErrordireccion(true);
                      setmensaje('No se permiten letras consecutivas repetidas');
                    } else {
                      setErrordireccion(false);
                      setmensaje('');
                    }
                  }
                }}
                onChange={e => setdireccion(e.target.value)} 
                error={errordireccion}
                type="text"
                name=""
                helperText={mensaje}
                maxLength={100}
                className="inputCustom"
                placeholder="Direccion"
                id="direccion"
                value={direccion}
              />
              {<p className="error">{mensaje}</p>}
            </div>

            <div className="contInput">
              <TextCustom text="Telefono" className="titleInput" />
              <input
               onChange={e => setTelefono(e.target.value)}

                onKeyDown={e => {
                  setTelefono(e.target.value);
                  if (Telefono === '') {
                    setTexto('Los campos no deben estar vacíos');
                    setErrorTelefono(true);
                  } else {
                    setErrorTelefono(false);
                    var regex = /^[0-9]{8}$/; // Se espera un número de teléfono de 8 dígitos
                    if (!regex.test(Telefono)) {
                      setErrorTelefono(true);
                      setTexto('Debe ingresar un número de teléfono válido de 8 dígitos');
                    } else {
                      setErrorTelefono(false);
                      setTexto('');
                    }
                  }
                }}
                
                error={errorTelefono}
                type="phone"
                name=""
                helperText={texto}
                maxLength={8}
                className="inputCustom"
                placeholder="Telefono"
                id="phone"
                value={Telefono}
              />
              {<p className="error">{texto}</p>}
            </div>

            <div className="contInput">
              <TextCustom text="Correo Electronico" className="titleInput" />
              <input
                onKeyDown={e => {
                  setcorreoelec(e.target.value);
                  if (correoelec == '') {
                    setErrorcorreoelec(true);
                    setadvertencia('Los campos no deben estar vacios');
                  }
                  else {
                    setErrorcorreoelec(false);
                    var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!expresion.test(correoelec)) {
                      setErrorcorreoelec(true);
                      setadvertencia('Formato invalido');
                    } else {
                      setErrorcorreoelec(false);
                      setadvertencia('');
                    }
                  }
                }}
                onChange={e => setcorreoelec(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errorcorreoelec}
                type="phone"
                name=""
                helperText={texto}
                maxLength={50}
                className="inputCustom"
                placeholder="Correo Electronico"
                id="correo"
                value={correoelec}
              />
              {<p className="error">{advertencia}</p>}
            </div>

            <div className="contInput">
              <TextCustom text="Fecha de Nacimiento" className="titleInput" />
              <input
                type="date"
                name=""
                helperText={texto}
                maxLength={50}
                className="inputCustom"
                placeholder="Fecha de Nacimiento"
                id="fechaN"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Genero" className="titleInput" />
              <select name="" className="selectCustom" id="genero">
                <option value={1}>Masculino</option>
                <option value={2}>Femenino</option>
              </select>
            </div>

            <div className="contBtnStepper">
              <Button
                type="submit"
                onClick={() => {
                  var Nidentidad = document.getElementById("Nidentidad").value;
                  var nombre = document.getElementById("nombre").value;
                  var apellido = document.getElementById("apellido").value;
                  var direccion = document.getElementById("direccion").value;
                  var phone = document.getElementById("phone").value;
                  var correo = document.getElementById("correo").value;
                  if (Nidentidad === "" || nombre === "" || apellido === "" || direccion === "" || phone === "" || correo === "") {
                    swal("No deje campos vacíos.", "", "error");
                  } else if (isNaN(parseInt(Nidentidad))) {
                    swal("El campo identidad solo acepta números.", "", "error");
                  } else {
                    setErrorIdentidad(false);
                    var primeroscuatrodigitos = parseInt(Nidentidad.substring(0, 4));
                    if (primeroscuatrodigitos < 101 || primeroscuatrodigitos > 1811) {
                      setErrorIdentidad(true);
                      setleyenda('El número de identidad es inválido');
                      swal("El número de identidad es inválido", "", "error");
                    } else {
                      setErrorIdentidad(false);
                      var regex = /^\d{13}$/;
                      if (!regex.test(Nidentidad)) {
                        setErrorIdentidad(true);
                        setleyenda('El número de identidad debe tener el formato correcto');
                        swal("El número de identidad debe tener el formato correcto", "", "error");
                      }
                      if (!/^[A-Z]+(?: [A-Z]+)*$/.test(nombre)) {
                        swal("El campo nombre solo acepta letras mayúsculas y solo un espacio entre palabras.", "", "error");
                      } else if (/(.)\1{2,}/.test(nombre)) {
                        setErrorNombre(true);
                        swal("El campo nombre no acepta letras mayúsculas consecutivas repetidas.", "", "error");
                      }
                      else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(apellido)) {
                        swal("El campo apellido solo acepta letras mayusculas y un espacio entre palabra.", "", "error");
                      } else if (/(.)\1{2,}/.test(apellido)) {
                        setErrorApellido(true);
                        swal("El campo apellido no acepta letras consecutivas repetidas.", "", "error");
                      } else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(direccion)) {
                        swal("El campo dirrecion solo acepta letras mayusculas y un espacio entre palabra.", "", "error");
                      } else if (/(.)\1{2,}/.test(direccion)) {
                        setErrordireccion(true);
                        swal("El campo direccion no acepta letras consecutivas repetidas.", "", "error");
                      } else if (isNaN(parseInt(phone))) {
                        swal("El campo teléfono solo acepta números.", "", "error");
                      }
                      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
                        swal("El campo correo debe contener un correo válido.", "", "error");
                      } else {
                        props.actualizar ? actualizarCliente() : handleNext();
                      }
                    }
                  }
                }}

                variant="contained"
                className="btnStepper">
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
            'https://static.vecteezy.com/system/resources/previews/011/873/935/non_2x/online-voting-concept-flat-style-design-illustration-tiny-people-with-voting-poll-online-survey-working-together-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};