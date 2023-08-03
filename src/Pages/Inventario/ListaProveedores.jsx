import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';

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

export const ListaProveedores = (props) => {

  const [cambio, setCambio] = useState(0)
  const [Modelo, setModelo] = useState([]);
  const [roles, setRoles] = useState([]);
  const [marcah, setMarcah] = useState()
  //URLS
  const urlProveedores = 'http://localhost:3000/api/proveedor';
  const urlDelProveedor = 'http://localhost:3000/api/proveedor/EliminarProveedor';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [Pais, setPais] = useState([]);
  const [Ciudad, setCiudad] = useState([]);

  //COLOCAR APIS DE BITACORA AQUI---
  //-------------------------------------------------------------------

  const [proveed, setproveed] = useState('');
  const [leyenda, setleyenda] = useState('');
  const [errorproveedor, setErrorproveedor] = useState(false);

  const [codigopostal, setcodigopostal] = useState('');
  const [aviso, setaviso] = useState('');
  const [errorcodigopostal, setErrorcodigopostal] = useState(false);

  const [nombre, setnombre] = useState('');
  const [msj, setmsj] = useState('');
  const [errornombre, setErrornombre] = useState(false);

  const [encargado, setencargado] = useState('');
  const [mensaje, setmensaje] = useState('');
  const [errorencargado, setErrorencargado] = useState(false);


  const [avi, setavi] = useState('');
  const [errorpais, setErrorpais] = useState(false);


  const [advertencia, setadvertencia] = useState('');
  const [errorciudad, setErrorciudad] = useState(false);

  const [direccion, setdireccion] = useState('');
  const [validacion, setvalidacion] = useState('');
  const [errordireccion, setErrordireccion] = useState(false);

  const [tel, settel] = useState('');
  const [adv, setadv] = useState('');
  const [errortel, setErrortel] = useState(false);

  const [correo, setcorreo] = useState('');
  const [parrafo, setparrafo] = useState('');
  const [errorcorreo, setErrorcorreo] = useState(false);

  //Pa' cargar los proveedores
  useEffect(() => {
    fetch(urlProveedores)
      .then(response => response.json())
      .then(data => setTableData(data));
  }, [cambio]);

  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [
    { field: 'IdProveedor', headerName: 'ID Proveedor', width: 150 },
    { field: 'CiaProveedora', headerName: 'Empresa Proveedora', width: 150 },
    { field: 'encargado', headerName: 'Encargado', width: 150 },
    { field: 'Pais', headerName: 'Pais', width: 150 },
    { field: 'Ciudad', headerName: 'Ciudad', width: 150 },
    { field: 'Productos', headerName: 'Producto', width: 150 },
    { field: 'direccion', headerName: 'Direccion', width: 150 },
    { field: 'telefono', headerName: 'Telefono', width: 150 },
    { field: 'correoElectronico', headerName: 'Correo Electronico', width: 150 },


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
            onClick={() => handleDel(params.row.IdProveedor)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  //FUNCION DE ELIMINAR 
  function handleDel(IdProveedor) {
    swal({
      content: (
        <div>

          <div className="logoModal">¿Desea Eliminar este Proveedor?</div>
          <div className="contEditModal">

          </div>

        </div>
      ),
      buttons: ['Eliminar', 'Cancelar'],
    }).then(async op => {
      switch (op) {
        case null:

          let data = {
            IdProveedor: IdProveedor,
          };

          //Funcion de Bitacora 
          /*  let dataB = {
             Id:props.idUsuario
           } */

          console.log(data);

          await axios
            .delete(urlDelProveedor, { data })
            .then(response => {
              //axios.post (urlDelBitacora, dataB) //Bitacora de eliminar un empleado
              swal('Proveedor eliminado correctamente', '', 'success');
              setCambio(cambio + 1);
            })
            .catch(error => {
              console.log(error);
              swal('Error al eliminar el Proveedor', '', 'error');
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
          ¿Desea actualizar el proveedor: {id.CiaProveedora} ?
        </div>
      ),
    }).then(
      op => {
        switch (op) {
          case 'update':
            props.data(id)
            props.update(true)
            navegate('/menuInventario/RegistroProveedores')
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
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Proveedores</h2>

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
                navegate('/menuInventario/RegistroProveedores');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Proveedor
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdProveedor}
          rows={filteredData}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={5}
          rowsPerPageOptions={[5]}


        //----------------ni idea para que es------------
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