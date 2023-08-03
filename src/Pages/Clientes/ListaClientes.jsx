import { DataGrid, esES } from '@mui/x-data-grid';

import { useState, useEffect, React } from 'react';
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
import axios from 'axios';

export const ListaClientes = (props) => {
  const [cambio, setCambio] = useState(0);

  const urlClientes =
    'http://localhost:3000/api/clientes';
  const urlUpdateCliente =
    'http://localhost:3000/api/clientes/actualizar';

  const urlDelCliente = "http://localhost:3000/api/clientes/eliminar"

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  


  useEffect(() => {
   axios.get(urlClientes).then(response => {
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, [cambio]);

  const navegate = useNavigate();

  
  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const handleNewExpediente = (id) => {
    props.datosclientes({idCliente:id.idCliente})
    navegate('/menuClientes/DatosExpediente');
  }
  

  const columns = [
    { field: 'idCliente', headerName: 'ID', width: 165 },
    { field: 'nombre', headerName: 'Nombre', width: 165 },
    { field: 'apellido', headerName: 'Apellido', width: 165 },
    { field: 'genero', headerName: 'Genero', width: 165 },
    { field: 'fechaNacimiento', headerName: 'Fecha de Nacimiento', width: 165 },
    { field: 'direccion', headerName: 'Direccion', width: 165 },
    { field: 'Telefono', headerName: 'Telefono', width: 165 },
    { field: 'Email', headerName: 'Correo Electronico', width: 165 },

    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 260,

      renderCell: params => (
        <div className="contActions1">
           <Button className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleDel(params.row.idCliente)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>

          <Button
            className="btnAddExpe"
            onClick={() => handleNewExpediente(params.row)}
          >
            <AddIcon></AddIcon>
          </Button>
        </div>
      ),
    },
  ];

  //ELIMINAR
  function handleDel(id) {
    swal({
      content: (
        <div>
          <div className="logoModal">Desea Elimiar este Cliente?</div>
          <div className="contEditModal">

          </div>
        </div>
      ),
      buttons: ["Eliminar", "Cancelar"]
    }).then(async (op)=> {

      switch (op) {
        case null:

          let data = {
            idCliente: id,
          };

          console.log(data);

         await axios.delete(urlDelCliente,{data}).then(response=>{
            swal("Cliente Eliminado correctamente","","success")
            setCambio(cambio+1)
          }).catch(error=>{
            console.log(error);
            swal("Error al eliminar el cliente","","error")
          })

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
          ¿Desea actualizar el Cliente: {id.nombre} ?
        </div>
      ),
    }).then(
      op => {
        switch (op) {
          case 'update':
            props.data(id)
            props.update(true)
            navegate('/menuClientes/nuevoCliente')
            break;
          default:
            break;
        }
      });
  };
  
  const handleBack = () => {
    navegate('/menuClientes');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Clientes</h2>

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
                navegate('/menuClientes/nuevoCliente');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Cliente
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.idCliente}
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