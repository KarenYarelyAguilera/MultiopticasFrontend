import { DataGrid,esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';

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

export const ListaProductoPromocion = () => {
  const [roles, setRoles] = useState([]);

  const urlPromocionProducto ='http://localhost/APIS-Multioptica/Venta/controller/venta.php?op=ProductoPromociones';


  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(urlPromocionProducto)
      .then(response => response.json())
      .then(data => setTableData(data));
   
  }, []);

  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [ 
    { field: 'IdProductoPromocion', headerName: 'ID Producto Promocion', width: 380 },
    { field: 'IdPromocion', headerName: 'Promocion', width: 380 },
    { field: 'IdProducto', headerName: 'Producto', width: 380 },
    
    
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 380,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit"
            onClick={() => handleButtonClick(params.row.id)}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleButtonClick(params.row.id)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  function handleButtonClick(id) {
    fetch(`/api/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        /* los nuevos datos que se van a actualizar */
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Aquí puedes actualizar los datos en el estado de tu aplicación
        // para reflejar los cambios en la interfaz de usuario.
      })
      .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la actualización
      });
  }
  const handleBack = () => {
    navegate('/ventas');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista Promociones De Productos</h2>

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
                navegate('/menuVentas/PromocionProducto');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Producto Promocion
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdProductoPromocion}
          rows={filteredData}
          columns={columns}
          pageSize={5}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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
