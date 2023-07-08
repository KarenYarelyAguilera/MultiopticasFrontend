import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import InforUsers from '../../IMG/InforUsers.jpg';

//Styles
import '../../Styles/Usuarios.css';

//Components
import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';
import axios from 'axios';

const urlSucursales ='http://localhost:3000/api/empleado/sucursal';

/* const urlUsers =
  'http://localhost/APIS-Multioptica/usuario/controller/usuario.php?op=users'; */
const urlIEmpleado ='http://localhost:3000/api/empleado'; //Api para crear el empleado
const urlUpdEmpleado ='http://localhost:3000/api/empleado/actualizar'



export const DatosEmpleado = (props) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };
  const [sucursales, setSucursales] = useState([]);
  //estas líneas de código establecen y gestionan variables de estado en un componente de React, lo que permite almacenar y modificar valores en la aplicación, y controlar el comportamiento en función de estos estados.
  const [iIdentidad, setiIdentidad] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorIdentidad, setErrorIdentidad] = React.useState(false);


  const urlDelEmployees = 'http://localhost:3000/api/empleado/eliminar';


  const urlDelBitacora = 'http://localhost:3000/api/bitacora/EliminarEmpleado';


  const [Nombre, setNombre] = React.useState(props.data.nombre || '');
  const [errorNombre, setErrorNombre] = React.useState(false);
  const [Msj, setMsj] = React.useState(false);


  const [Apellido, setApellido] = React.useState(props.data.apellido || '');
  const [errorApellido, setErrorApellido] = React.useState(false);
  const [aviso, setAviso] = React.useState(false);

  const [errorTelefono, setErrorTelefono] = React.useState(false);
  const [texto, setTexto] = React.useState(false);

  const [Telefono, setTelefono] = useState(props.data.telefonoEmpleado || '');

  const [Identidad, setIdentidad] = useState(props.data.numeroIdentidad || '');
  const [Telefonoc, setTelefonoc] = useState(0);

  /*   useEffect(() => {
      fetch(urlSucursales).then(response => response.json())
        .then(data => setSucursales(data));
    }, []); */

  useEffect(() => {
    axios
      .get(urlEmployees)
      .then(response => {
        setTableData(response.data);
      })
      .catch(error => console.log(error));
  }, [cambio]);


    const data = {
      nombre:nombres.toUpperCase(),
      apellido:apellidos.toUpperCase(),
      telEmple:telefono,
      idSucursal:sucursal,
      idGenero:genero,
      numId:identidad,
      IdEmpleado:props.data.IdEmpleado,
    }

    axios.put(urlUpdEmpleado,data).then(()=>{
      swal("Empleado Actualizado Correctamente","","success").then(()=>{
        navegate('/empleados/lista')
      })
    })

  }

  const insertEmpleado = async () => {
    let identidad = document.getElementById('Nidentidad').value;
    let nombres = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellido').value;
    let telefono = document.getElementById('phone').value;
    let genero = parseInt(document.getElementById('genero').value);
    let sucursal = parseInt(document.getElementById('sucursal').value);

    //tienen que estar igual a las apis del node
    let data = {
      nombre: nombres.toUpperCase(),
      apellido: apellidos.toUpperCase(),
      telEmple: telefono,
      idGenero: genero,
      idSucursal: sucursal,
      numId: identidad,
    };
    /* if (sendData(urlIEmpleado, data)) {
      swal('Empleado agregado con exito', '', 'success').then(result => {
        swal({
          title: '¿Desea crearle un usuario al empleado agregado?',
          icon: 'question',
          buttons: true,
          dangerMode: true,
          buttons: ['Cancelar', 'Aceptar'],
        }).then(result => {
          if (result) navegate('/usuarios/crearusuario');
          else {
            navegate('/empleados/lista');
          }
        });

        navegate('/empleados/lista');
      });
    } */


        </div>
      ),
      buttons: ['Eliminar', 'Cancelar'],
    }).then(async op => {
      switch (op) {
        case null:
          let data = {
            IdEmpleado: id,
          };

          let dataB = {
            Id: props.idU
          }

          console.log(data);

          await axios.delete(urlDelEmployees,{data}).then(response =>{
             axios.post (urlDelBitacora, dataB)
            swal('Empleado eliminado correctamente', '', 'success');
              setCambio(cambio + 1);
            })
            .catch(error => {
              console.log(error);
              swal('Error al eliminar el empleado', '', 'error');
            });

          break;

        default:
          break;
      }
    });
  }

  //funcion de actualizar
  function handleUpdt(id) {
    swal({
      buttons: {
        update: 'Actualizar',
        cancel: 'Cancelar',
      },
      content: (
        <div className="logoModal">
          ¿Desea actualizar el empleado?:{' '}
          {id.Usuario}
        </div>
      ),
    }).then(
      op => {
      switch (op) {
        case 'update':

          props.data(id)
          props.update(true)
          navegate('/usuarios/crearempleado')

      }
    });
  };

  const handleBack = () => {
    navegate('/usuarios');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Empleados</h2>

      <div
        style={{
          height: 400,
          width: '85%',
          position: 'relative',
          left: '130px',
        }}
      >
        <div className="contFilter">
          {/* <div className="buscador"> */}
          <SearchIcon
            style={{ position: 'absolute', color: 'gray', paddingLeft: '10px' }}
          />
          <input
            type="text"
            className="inputSearch"
            placeholder="Buscar"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {/* </div> */}
          <div className="btnActionsNewReport">
            <Button
              className="btnCreate"
              onClick={() => {
                navegate('/usuarios/crearempleado');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Empleado
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>

        <img src={InforUsers} alt="No se encuentro la imagen" />
      </div>
    </div>
  );
};