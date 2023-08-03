import React from 'react';

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
import axios from 'axios'; //Agregarlo siempre porque se necesita para exportar Axios para que se puedan consumir las Apis 

export const ListaModelos = ({props,data,update}) => {

  const [cambio, setCambio] = useState(0)
  const [marcah, setMarcah] = useState()

  const [Modelo, setModelo] = useState([]);
  const [roles, setRoles] = useState([]);
  

  //URL DE LAS APIS DE MODELO
  const urlModelos ='http://localhost:3000/api/modelos'; //LLama todos los datos de la tabla de modelo.
  const urlDelModelo = 'http://localhost:3000/api/modelo/eliminar'; //Elimina datos de modelo.

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

 //Pa' cargar los proveedores
 useEffect(() => {
  axios.get(urlModelos).then(response=>setTableData(response.data))
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
    { field: 'IdModelo', headerName: 'ID Modelo', width: 190 },
    { field: 'IdMarca', headerName: 'Marca', width: 200 },
    { field: 'detalle', headerName: 'Modelo', width: 190},
    { field: 'anio', headerName: 'Año', width: 190 },

    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
           onClick={() => handleDel(params.row.IdModelo)}>
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];
 
  
//FUNCION DE ELIMINAR 
function handleDel(id) {
  swal({
    content: (
      <div>
        <div className="logoModal">¿Desea Eliminar este Proveedor?</div>
        <div className="contEditModal"> 
        </div>
      </div>
    ),

    buttons: {
      cancel: 'Eliminar',
      delete: 'Cancelar',
    },
  }).then(async (op) => {

    switch (op) {
      case null:
        let data = {
          IdModelo:id
        }; 
        console.log(data);

        await axios .delete(urlDelModelo,{data}) .then(response => {
            swal('Modelo eliminado correctamente', '', 'success');
            setCambio(cambio + 1);
          }).catch(error => {
            console.log(error);
            swal('Error al eliminar el modelo', '', 'error');
          });

        break;
        default:
        break;
    }
  });
};
  
  //FUNCION DE ACTUALIZAR DATOS 
  function handleUpdt(id) {
    swal({
      buttons: {
        update: 'Actualizar',
        cancel: 'Cancelar',
      },
      content: (
        <div className="logoModal">
          ¿Desea actualizar el modelo?: {id.IdMarca} ?
        </div>
      ),
    }).then((op)  => {
        switch (op) {
          case 'update':
            data(id)
            update(true)
            navegate('/config/RegistroModelo')
            break;
            default:
            break;
        }
      });
  };

//Boton de atras 
  const handleBack = () => {
    navegate('/config');
  };

  //ESTRUCTURA 
  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Modelos</h2>

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
                navegate('/config/RegistroModelo');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Modelo
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdModelo}
          rows={filteredData}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};
