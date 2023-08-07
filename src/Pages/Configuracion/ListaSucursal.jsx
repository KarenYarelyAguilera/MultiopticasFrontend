//GENERADOR DE PFD
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import logoImg  from "../../IMG/MultiopticaBlanco.png";
import fondoPDF from "../../IMG/fondoPDF.jpg";


import swal from '@sweetalert/with-react';
import axios from 'axios';

//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';

//GENERADOR DE PDF
import { generatePDF } from '../../Components/generatePDF';

export const ListaSucursal = (props) => {
  const [roles, setRoles] = useState([]);
  const [Departamento, setDepartamento] = useState([]);
  const [ciudad, setCiudad] = useState([]);
  const [cambio, setCambio] = useState(0)

  const urlDepartamentos = 'http://localhost:3000/api/departamentos';
  const urlCiudades = 'http://localhost:3000/api/ciudades';

  const urlSucursales = 'http://localhost:3000/api/sucursales';
  const urlDelSucursal = 'http://localhost:3000/api/sucursal/eliminar';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [errordepartamento, setErrordepartamento] = useState(false);
  const [aviso, setaviso] = useState(false);

  
  const [mensaje, setmensaje] = useState('');
  const [errorciudad, setErrorciudad] = useState(false);

  const [direccion, setdireccion] = useState('');
  const [advertencia, setadvertencia] = useState('');
  const [errordireccion, setErrordireccion] = useState(false);

  const [descrpcion, setdescripcion] = useState('');
  const [msj, setmsj] = useState('');
  const [errordescripcion, setErrordescripcion] = useState(false);

  const [errorTelefono, setErrorTelefono] = useState(false);
  const [texto, setTexto] = useState(false);

  //COLOCAR APIS DE BITACORA AQUI---  
  
  //-------------------------------------------------------------------

  useEffect(() => {
    fetch(urlSucursales)
      .then(response => response.json())
      .then(data => setTableData(data));
    fetch(urlDepartamentos)
      .then(response => response.json())
      .then(data => setDepartamento(data));
      fetch(urlCiudades)
      .then(response => response.json())
      .then(data => setCiudad(data));
  }, [cambio]);

//IMPRIMIR PDF
const handleGenerarReporte = () => {
  const formatDataForPDF = () => {
    const formattedData = tableData.map((row) => {
      const fechaCre = new Date(row.fechaNacimiento);
      const fechaNacimiento = String(fechaCre.getDate()).padStart(2,'0')+"/"+
                            String(fechaCre.getMonth()).padStart(2,'0')+"/"+
                            fechaCre.getFullYear();
                            return {
                              'N°':row.IdSucursal,
                              'Departamento':row.departamento, 
                              'Ciudad':row.ciudad, 
                              'Dirección':row.direccion, 
                              'Teléfono':row.telefono,                        
                            };
    });
    return formattedData;
  };

  const urlPDF = 'Report_Sucursales.pdf';
  const subTitulo = "LISTA DE SUCURSALES"

  generatePDF(formatDataForPDF, urlPDF, subTitulo);
};

  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [
    { field: 'IdSucursal', headerName: 'ID Sucursal', width: 250 },
    { field: 'departamento', headerName: 'Departamento', width: 250 },
    { field: 'ciudad', headerName: 'Ciudad', width: 250 },
    { field: 'direccion', headerName: 'Dirección', width: 250 },
    { field: 'telefono', headerName: 'Teléfono', width: 250 },

    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190,

      renderCell: params => (
        <div className="contActions1">
          <Button className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleDel(params.row.IdSucursal)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  //FUNCION DE ELIMINAR 
  function handleDel(IdSucursal) {
    swal({
      content: (
        <div>

          <div className="logoModal">¿Desea Eliminar esta Sucursal?</div>
          <div className="contEditModal">

          </div>

        </div>
      ),
      buttons: ['Eliminar', 'Cancelar'],
    }).then(async op => {
      switch (op) {
        case null:

          let data = {
            IdSucursal: IdSucursal,
          };

          //Funcion de Bitacora 
          /*  let dataB = {
             Id:props.idUsuario
           } */

          console.log(data);

          await axios
            .delete(urlDelSucursal, { data })
            .then(response => {
              //axios.post (urlDelBitacora, dataB) //Bitacora de eliminar un empleado
              swal('Sucursal eliminada correctamente', '', 'success');
              setCambio(cambio + 1);
            })
            .catch(error => {
              console.log(error);
              swal('Error al eliminar la sucursal', '', 'error');
            });

          break;

        default:
          break;
      }
    });
  }

  //FUNCION DE ACTUALIZAR
  function handleUpdt(id) {
    swal({
      buttons: {
        update: 'ACTUALIZAR',
        cancel: 'CANCELAR',
      },
      content: (
        <div className="logoModal">
          ¿Desea actualizar la sucursal: {id.ciudad} ?
        </div>
      ),
    }).then(
      op => {
        switch (op) {
          case 'update':
            props.data(id)
            props.update(true)
            navegate('/config/RegistroSucursal')
            break;
          default:
            break;
        }
      });
  };

  //Funcion de Bitacora 
  let dataB = {
    Id: props.idUsuario
  }

  const handleBack = () => {
    navegate('/config');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Sucursal</h2>

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
                navegate('/config/RegistroSucursal');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nueva Sucursal
            </Button>
            <Button className="btnReport" 
            onClick={handleGenerarReporte}>
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdSucursal}
          rows={filteredData}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={5}
          rowsPerPageOptions={[5]}
        // onRowClick={usuario => {
        //   swal({
        //     buttons: {
        //       update: 'Actualizar',
        //       cancel: 'Cancelar',
        //     },
        //     content: (
        //       <div className="logoModal">
        //         Que accion desea realizar con el cliente:{' '}
        //         {usuario.row.Usuario}
        //       </div>
        //     ),
        //   }).then(op => {
        //     switch (op) {
        //       case 'update':
        //         swal(
        //           <div>
        //             <div className="logoModal">Datos a actualizar</div>
        //             <div className="contEditModal">
        //               <div className="contInput">
        //                 <TextCustom text="Usuario" className="titleInput" />
        //                 <input
        //                   type="text"
        //                   id="nombre"
        //                   className='inputCustom'
        //                   value={usuario.row.Usuario}
        //                 />
        //               </div>

        //               <div className="contInput">
        //                 <TextCustom
        //                   text="Nombre de Usuario"
        //                   className="titleInput"
        //                 />
        //                 <input
        //                   type="text"
        //                   id="nombreUsuario"
        //                   className='inputCustom'
        //                   value={usuario.row.Nombre_Usuario}
        //                 />
        //               </div>
        //               <div className="contInput">
        //                 <TextCustom text="Estado" className="titleInput" />
        //                 <input
        //                   type="text"
        //                   className='inputCustom'
        //                   id="EstadoUsuario"
        //                   value={usuario.row.Estado_Usuario}
        //                 />
        //               </div>
        //               <div className="contInput">
        //                 <TextCustom
        //                   text="Contraseña"
        //                   className="titleInput"
        //                 />
        //                 <input type="text" id="contrasenia" className='inputCustom'/>
        //               </div>
        //               <div className="contInput">
        //                 <TextCustom text="Rol" className="titleInput" />
        //                 <select id="rol" className="selectCustom">
        //                   {roles.length ? (
        //                     roles.map(pre => (
        //                       <option key={pre.Id_Rol} value={pre.Id_Rol}>
        //                         {pre.Rol}
        //                       </option>
        //                     ))
        //                   ) : (
        //                     <option value="No existe informacion">
        //                       No existe informacion
        //                     </option>
        //                   )}
        //                 </select>
        //               </div>
        //               <div className="contInput">
        //                 <TextCustom text="Email" className="titleInput" />
        //                 <input
        //                   type="text"
        //                   id="Email"
        //                   className='inputCustom'
        //                   value={usuario.row.Correo_Electronico}
        //                 />
        //               </div>
        //             </div>
        //           </div>,
        //         ).then(() => {
        //           let data = {
        //             Usuario: document.getElementById('nombre').value,
        //             Nombre_Usuario:
        //               document.getElementById('nombreUsuario').value,
        //             Estado_Usuario:
        //               document.getElementById('EstadoUsuario').value,
        //             Contrasenia: document.getElementById('contrasenia').value,
        //             Id_Rol: document.getElementById('rol').value,
        //             Correo_Electronico:
        //               document.getElementById('Email').value,
        //             Id_usuario: usuario.row.id_Usuario,
        //           };

        //           if (sendData(urlUpdateUser, data)) {
        //             swal(<h1>Usuario Actualizado Correctamente</h1>);
        //           }
        //         });
        //         break;
        //       default:
        //         break;
        //     }
        //   });
        // }}
        />
      </div>
    </div>
  );
};
