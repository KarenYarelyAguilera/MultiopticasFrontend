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
import { Bitacora } from '../../Components/bitacora.jsx';

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

  const urlInsertBitacora  = 'http://localhost:3000/api/bitacora/insertsucursal';
  const urlUpdateBitacora  = 'http://localhost:3000/api/bitacora/actualizarsucursal';

export const RegistroSucursal = (props) => {

  const [Departamento, setDepartamento] = useState([], props.data.departamento || '');
  const [Ciudad, setCiudad] = useState([], props.data.ciudad || '');

  const [departamento, setdepartamento] = React.useState(props.data.IdDepartamento ||null);
  const [errordepartamento, setErrordepartamento] = React.useState(false);
  const [aviso, setaviso] = React.useState(false);

  const [ciudad, setciudad] = React.useState(props.data.IdCiudad || null);
 // const [mensaje, setmensaje] = React.useState('');
  const [errorciudad, setErrorciudad] = React.useState(false);

  const [direccion, setdireccion] = React.useState(props.data.direccion ||'');
  const [mensaje, setmensaje] = React.useState('');
  const [errordireccion, setErrordireccion] = React.useState(false);

  const [errorTelefono, setErrorTelefono] = React.useState(false);
  const [texto, setTexto] = React.useState(false);
  const [Telefono, setTelefono] = useState(props.data.telefono || '');
  const [selectedOption, setSelectedOption] = useState(null); 

  const[estado, setEstado] = React.useState(props.data.estado || null)

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
    //et estado = document.getElementById('estado').value;

    const data = {
      IdDepartamento: departamento,
      IdCiudad: ciudad,
      direccion: direccion.toUpperCase(),
      telefono: telefono,
      estado: document.getElementById('estado').value,
      IdSucursal: props.data.IdSucursal, //El dato de IdProducto se obtiene de Producto seleccionado.
    }


    //Funcion de bitacora 
    let dataB =
    {
      Id: props.idUsuario
    };
    const bitacora = {
      urlB: urlUpdateBitacora,
      activo: props.activo,
      dataB: dataB
    };

    axios.put(urlUpdSucursal, data).then(response => {
      console.log(response);
      if (response.data == false) {
        swal('¡Esta Sucursal ya existe!', '', 'error')
        Bitacora(bitacora)
      } else {
        swal("Sucursal Actualizada Correctamente", "", "success").then(() => {
          Bitacora(bitacora)
          props.limpiarData({});
          props.limpiarUpdate(false)
           navegate('/config/listaSucursal');
        });
      }
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
    let estado = document.getElementById('estado').value;

    let data = {
      IdDepartamento: departamento,
      IdCiudad: ciudad,
      direccion: direccion.toUpperCase(),
      telefono: telefono,
      estado: estado
    };
    //Funcion de bitacora 
    let dataB =
    {
      Id: props.idUsuario
    };
    const bitacora = {
      urlB: urlInsertBitacora,
      activo: props.activo,
      dataB: dataB
    };

    console.log(data)

    axios.post(urlSucursal, data).then(() => {
      swal("Sucursal Creada Correctamente", "", "success").then(() => {
        //axios.post(urlUpdBitacora,dataB) //UPDATE BITACORA 
        navegate('/config/listaSucursal');
      })
    }).catch(error => {
      console.log(error);
      swal('Error al Crear Sucursal! , porfavor revise todos los campos.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  };

  //BOTON DE RETROCESO
  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de sucursales ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        props.limpiarData({});
        props.limpiarUpdate(false)
        props.update(false)
        props.Data({})
        navegate('/config/listaSucursal');
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
        {props.actualizar ? <h2>Actualizar Sucursal</h2> : <h2>Registro de Sucursal</h2>}
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">

              <TextCustom text="Departamento" className="titleInput" />
              <select name="" className="selectCustom" id="departamento" value={departamento} onChange={(e)=>{
                setdepartamento(e.target.value)
              }}>
                
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
                onChange={e => setdepartamento(e.target.value)} 
              </select>

            </div>

            <div className="contInput">

              <TextCustom text="Ciudad" className="titleInput" />

              <select name="" id="ciudad" className="selectCustom" value={ciudad} onChange={(e)=>{
                setciudad(e.target.value)
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
                onChange={e => setciudad(e.target.value)}
              </select>

            </div>
            {/* <div className="contInput">

              <TextCustom text="Ciudad" className="titleInput" />
              <select name="" className="selectCustom" id="ciudad" value={ciudad} onChange={(e)=>{
                setCiudad(e.target.value)
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
                  onChange={e => setCiudad(e.target.value)} 

              </select>

            </div> */}

            <div className="contInput">
              <TextCustom text="Direccion" className="titleInput" />
              <input
                onKeyDown={e=>
                  {
                    setdireccion(e.target.value);
                    if(direccion ==="")
                    {
                      setErrordireccion(true);
                      setmensaje("Los campos no deben de quedar vacíos");
                    } else{
                      setErrordireccion(false);
                      var regex =  /^[A-Z]+(?: [A-Z]+)*$/;
                      if(!regex.test(direccion))
                      {
                        setErrordireccion(true);
                        setmensaje('Solo debe ingresar letras mayúsculas y un espacio entre palabras')
                      } else if (/(.)\1{2,}/.test(direccion))
                      {
                        setErrordireccion(true);
                        setmensaje("No se permiten letras consecutivas repetidas");
                      } else{
                        setErrordireccion(false);
                        setmensaje("");
                      }
                    }
                  }
                }
                onChange={e => setdireccion(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar

                error= {errordireccion}
                type="text"
                name=""
                helperText={mensaje}
                maxLength={100}
                className="inputCustom"
                placeholder="direccion"
                id="direccion"
                value={direccion}
              />
              {<p className="error">{mensaje}</p>}
            </div>

            <div className="contInput">
              <TextCustom text="Telefono" className="titleInput" />
              <input
                onChange={e=> setTelefono (e.target.value)}
                onKeyDown={(e)=>
                {
                  setTelefono(e.target.value);
                  if (Telefono === '')
                  {
                    setTexto('Los campos no deben estar vacíos');
                    setErrorTelefono(true);
                  }else{
                    setErrorTelefono(false);
                    var preg_match = /^[0-9]+$/;
                    if(!preg_match.test(Telefono))
                    {
                      setErrorTelefono(true);
                      setTexto('Solo deben ingresar números');
                    }else if (/(.)\1{2,}/.test(Telefono))
                    {
                      setErrorTelefono(true);
                      setTexto("No se permiten numeros repetodos de manera consecutivas");
                    } else 
                    {
                      setErrorTelefono(false);
                      setTexto('');
                    }
                  }
                }}
            
                error= {errorTelefono}
                type="phone"
                name=""
                helperText={texto}
                maxLength={8}
                className="inputCustom"
                placeholder="telefono"
                id="telefono"
                value={Telefono}
              />
               {<p className="error">{texto}</p>}
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
                  var departamento = document.getElementById('departamento').value;
                  var ciudad = document.getElementById('ciudad').value;
                  var direccion = document.getElementById('direccion').value;
                  var telefono = document.getElementById('telefono').value;

                  if (direccion === "" || telefono === "") {
                    swal("No deje campos vacíos.", "", "error");
                  } else if (isNaN(parseInt(telefono))) {
                    swal("El campo telefono solo acepta números.", "", "error");
                  } else if (/(.)\1{2,}/.test(Telefono)) {
                    setErrorTelefono(true);
                    swal("El campo numero no acepta numeros consecutivos repetidos.", "", "error");
                  }
                    else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(direccion)) {
                      swal("El campo direccion solo acepta letras mayúsculas y solo un espacio entre palabras.", "", "error");
                  } else if (/(.)\1{2,}/.test(direccion)) {
                    setErrordireccion(true);
                    swal("El campo direccion no acepta letras mayúsculas consecutivas repetidas.", "", "error");
                  }
                  else{
                    props.actualizar ? actualizarSucursal() : handleNext();}
                }
                }
              >
                 {props.actualizar ? <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
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