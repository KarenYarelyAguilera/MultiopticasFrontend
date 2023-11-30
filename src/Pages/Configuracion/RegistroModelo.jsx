import React from 'react';
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
import axios from 'axios'; //Agregarlo siempre porque se necesita para exportar Axios para que se puedan consumir las Apis 
import { Bitacora } from '../../Components/bitacora.jsx';
import { ColorLens } from '@mui/icons-material';

//APIS DE MODELO 
const urlMarcas = 'http://localhost:3000/api/marcas'; 
const urlInsertModelo ='http://localhost:3000/api/modelos/crear';
const urlUpdateModelo ='http://localhost:3000/api/modelo/actualizar';
const urlInsertBitacora ='http://localhost:3000/api/bitacora/insertmodelo';
const urlUpdateBitacora ='http://localhost:3000/api/bitacora/actualizarmodelo';

export const RegistroModelo = (props) => {

  const [Marca, setMarca] = useState([])

  const [detalle, setmodelo] = React.useState(props.data.detalle ||'');
  const [leyenda, setleyenda] = React.useState(false);
  const [errormodelo, setErrorModelo] = React.useState(false);

  const [color, setcolor] = React.useState(props.data.color ||'');
  const [mensaje, setmensaje] = React.useState(false);
  const [errorcolor, setErrorcolor] = React.useState(false);

  const [year, setyear] = React.useState(props.data.anio ||'');
  const [aviso, setaviso] = React.useState(false);
  const [erroranio, setErroranio] = React.useState(false);

  const [estado, setEstado] = useState(props.data.estado || null)

  const navegate = useNavigate();

  //Se usa para mostrar informacion en un listbox en este caso es el de marca.
  useEffect(() => {
    axios.get (urlMarcas).then (response=>setMarca(response.data))
  }, []);

 //INSERTAR MODELO
 const handleNext = () => {
  let IdMarca = parseInt(document.getElementById("IdMarca").value);
  let detalle = document.getElementById("detalle").value;
  let color = document.getElementById("color").value;
  let anio = document.getElementById("anio").value;
  let estado = document.getElementById('estado').value;

 
  let data = {
    IdMarca: IdMarca,
    detalle: detalle,
    color:color,
    anio: anio,
    estado: estado,
  };
   let dataB =
   {
     Id: props.idUsuario
   };
   const bitacora = {
     urlB: urlInsertBitacora,
     activo: props.activo,
     dataB: dataB
   }; 
   console.log(data);

  //Consumo de API y lanzamiento se alerta
  axios.post(urlInsertModelo, data).then(response => {
    console.log(response);
    if (response.data==false)
    {
      swal('¡Este modelo ya existe!', '', 'error')
    } else{
      swal('Modelo agregado con exito', '', 'success').then(result => {
      Bitacora(bitacora)
      navegate('/config/lista');
    });
    }
  }).catch(error => {
    console.log(error);
    swal('Error al crear el modelo, ingrese los datos correctamente, puede que alguno de estos ya exista.', '', 'error')
  })
};

//ACTUALIZAR
const actualizarModelo = async () => {
  let IdMarca = parseInt(document.getElementById("IdMarca").value);
  let detalle = document.getElementById("detalle").value;
  let color = document.getElementById("color").value;
  let anio = document.getElementById("anio").value;
  let estado = document.getElementById('estado').value;


  const data = {
    IdMarca: IdMarca,
    detalle: detalle,
    color:color,
    anio: anio,
    estado: estado,
    IdModelo: props.data. IdModelo, 
  };
  let dataB =
   {
     Id: props.idUsuario
   };
   const bitacora = {
     urlB: urlUpdateBitacora,
     activo: props.activo,
     dataB: dataB
   }; 
   console.log(data);

   axios.put(urlUpdateModelo, data).then(response => {
    console.log(response);
    if (response.data==false)
    {
      swal('¡Este modelo ya existe!', '', 'error')
    } else{
      swal("Modelo actualizado correctamente", "", "success").then(() => {
        Bitacora(bitacora)
        props.limpiarData({});
        props.limpiarUpdate(false)
        navegate('/config/lista');
    });
    }
  }).catch(error => {
    console.log(error);
    swal('Error al actualizar este modelo, por favor revise todos los campos.', '', 'error')
    // axios.post(urlErrorInsertBitacora, dataB)
  })
};


  //BOTON DE RETROCESO
  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de modelo ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        props.limpiarData({});
        props.limpiarUpdate(false)
        props.update(false)
        props.Data({})
        navegate('/config/lista');
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
      {props.actualizar ? <h2>Actualizar Modelo</h2> : <h2>Registro de Modelo</h2>}
        <h3>
          Complete todos los puntos para poder registrar los datos del modelo.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Marca" className="titleInput" />
              <select name="" className="selectCustom" id="IdMarca">
              {Marca.length ? (
                  Marca.map(pre => (
                    <option key={pre.IdMarca} value={pre.IdMarca}>
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
              <TextCustom text="Modelo" className="titleInput" />

              <input
              onKeyDown={e => {
                setmodelo(e.target.value);
                if (detalle === '') {
                  setErrorModelo(true);
                  setleyenda('Los campos no deben estar vacíos');
                } else {
                  var regex = /^[A-Z0-9-]+(?: [A-Z0-9-]+)*$/;
                  if (!regex.test(detalle)) {
                    setErrorModelo(true);
                    setleyenda('Solo debe ingresar letras mayúsculas, números, y guiones, con un espacio entre palabras si es necesario');
                  } else if (/(.)\1{2,}/.test(detalle)) {
                    setErrorModelo(true);
                    setleyenda('No se permiten letras consecutivas repetidas');
                  } else {
                    setErrorModelo(false);
                    setleyenda("");
                  }
                }
              }}
                onChange={e => setmodelo(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errormodelo}

                helperText={leyenda}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Modelo"
                id="detalle"
                value={detalle}
              />
              <p class="error">{leyenda}</p>
            </div>


            <div className="contInput">
              <TextCustom text="Color" className="titleInput" />

              <input
              onKeyDown={e => {
                setcolor(e.target.value);
                if (color === '') {
                  setErrorcolor(true);
                  setmensaje('Los campos no deben estar vacíos');
                } else {
                  var regex = /^[A-Z0-9-]+(?: [A-Z0-9-]+)*$/;
                  if (!regex.test(color)) {
                    setErrorcolor(true);
                    setmensaje('Solo debe ingresar letras mayúsculas, números, y guiones, con un espacio entre palabras si es necesario');
                  } else if (/(.)\1{2,}/.test(color)) {
                    setErrorcolor(true);
                    setmensaje('No se permiten letras consecutivas repetidas');
                  } else {
                    setErrorcolor(false);
                    setmensaje("");
                  }
                }
              }}
                onChange={e => setcolor(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errorcolor}

                helperText={mensaje}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Color"
                id="color"
                value={color}
              />
              <p class="error">{mensaje}</p>
            </div>


            <div className="contInput">
              <TextCustom text="Año" className="titleInput" />
                <input
                type="text"
                //value={detalle}
                onChange={(e) => setyear(e.target.value)}
                onKeyDown={(e) => {
                  const year = parseInt(e.target.value + e.key);
                  if (isNaN(year) || year < 2000 || year > 2050) {
                    setErroranio(true);
                    setaviso("El año ingresado es invalido");
                  } else {
                    setErroranio(false);
                    setaviso("");
                  }
                }}
             
                error={erroranio}
                name=""
                maxLength={4}
                className="inputCustom"
                placeholder="Año"
                id="anio"
                value={year}
              />
               <p class="error">{aviso}</p> 
            </div>

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select id="estado" className="selectCustom" value={estado} onChange={(e) => {
                setEstado(e.target.value)
              }}>
                <option value={'Activo'}>Activo</option>
                <option value={'Inactivo'}>Inactivo</option>
              </select>
            </div>
          
            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={()=>
                {
                  var modelo = document.getElementById("detalle").value;
                  var color = document.getElementById("color").value;
                  var año = document.getElementById("anio").value;
                  var estado = document.getElementById('estado').value;
                   if (modelo === "" || color ==="" || año === "") 
                   {
                    swal("No deje campos vacíos.", "", "error");
                  }  else if (!/^[A-Z0-9-]+(?: [A-Z0-9-]+)*$/.test(modelo)) {
                    swal("El campo modelo solo acepta letras mayusculas guiones y numeros.", "", "error");
                  }else if (!/^[A-Z0-9-]+(?: [A-Z0-9-]+)*$/.test(color)) 
                  {
                    swal("El campo color solo acepta letras mayusculas guiones y numeros.", "", "error");
                  } else if (isNaN(año) || año < 2000 || año > 2050) {
                    swal("El campo año es invalido.", "", "error");
                  }
                  else{
                    props.actualizar ? actualizarModelo() : handleNext();
                  }
                }
              }
              >
                 {props.actualizar ? <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
              </Button>
            </div>
          </div>
        </div>

        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/001/890/486/non_2x/summer-sunglasses-accessory-flat-style-icon-free-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};