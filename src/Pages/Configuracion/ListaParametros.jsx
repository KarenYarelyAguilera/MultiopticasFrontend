//GENERADOR DE PFD
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { DataGrid,esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';

import logoImg  from "../../IMG/MultiopticaBlanco.png";
import fondoPDF from "../../IMG/fondoPDF.jpg";

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
import axios from 'axios';

//GENERADOR DE PDF
import { generatePDF } from '../../Components/generatePDF';


export const ListaParametros = ({props,data,update}) => {

  const [cambio, setCambio] = useState(0)
  const [marcah, setMarcah] = useState()
  
  const urlParametros ='http://localhost:3000/api/parametros';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //Filtracion de fechas
const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

  useEffect(() => {
    axios.get(urlParametros).then(response=>setTableData(response.data))
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
    { field: 'Id_Parametro', headerName: 'ID', width: 100 },
    { field: 'Parametro', headerName: 'Parametro', width: 200 },
    { field: 'Valor', headerName: 'Valor', width: 600 },
   /*  { field: 'creado_por', headerName: 'Creado Por', width: 200 },
    { field: 'fecha_creacion', headerName: 'Fecha de Creacion', width: 200 },
    { field: 'modificado_por', headerName: 'Modificado por', width: 200 },
    { field: 'fecha_modificacion', headerName: 'Fecha de Modificacion', width: 200 }, */
    {
      field: 'borrar',
      headerName: 'Accion',
      width: 200,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit"
            onClick={() => handleUpdt(params.row)}
          >
            <EditIcon></EditIcon>
          </Button>
         
        </div>
      ),
    },
  ];

   //FUNCION DE ACTUALIZAR 
   function handleUpdt(id) {
    /* if (permisos[0].actualizar === "n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else { */
      swal({
        buttons: {
          update: 'Actualizar',
          cancel: 'Cancelar',
        },
        content: (
          <div className="logoModal">
            ¿Desea actualizar el parametro: {id.Parametro}?
          </div>
        ),
      }).then((op) => {
        switch (op) {
            case 'update':
            data(id)
            update(true)
        navegate('/config/ActualizarParametros')
        break;
        default:
        break;
        }
      });   
  };


  function handleButtonClick(param) {
    alert(param.row.Id_Parametro+"\n"+param.row.Parametro)
  }
  const handleBack = () => {
    navegate('/seguridad');
  };


  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Parametros</h2>

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
          {/* <div className="btnActionsNewReport">
            <Button
              className="btnCreate"
              onClick={() => {
                navegate('/usuarios/crearusuario');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Cliente
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div> */}

        </div>
        <DataGrid
        pagination
          getRowId={tableData => tableData.Id_Parametro}
          rows={filteredData}
          autoHeight
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
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
