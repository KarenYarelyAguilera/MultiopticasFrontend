
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

export const ListaClientes = () => {
  const [cambio, setCambio] = useState(0);

  const urlClientes =
    'http://localhost/APIS-Multioptica/Cliente/controller/cliente.php?op=Clientes';
  const urlUpdateCliente =
    'http://localhost/APIS-Multioptica/Cliente/controller/cliente.php?op=UpdateCliente';

  const urlDelCliente = "http://localhost/APIS-Multioptica/Cliente/controller/cliente.php?op=DeleteCliente"

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(urlClientes)
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

  const handleNewExpediente = () => {
    navegate('/menuClientes/nuevoExpediente');
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
          <Button
            className="btnEdit"
            onClick={() => handleUpdt(params.row.idCliente)}
          >
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
            onClick={() => handleNewExpediente()}
          >
            <AddIcon></AddIcon>
          </Button>
        </div>
      ),
    },
  ];

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
    }).then((op) => {

      switch (op) {
        case null:
          let data = {
            idCliente: id,
          };

          console.log(data);


          if (sendData(urlDelCliente, data)) {
            swal(<h1>Cliente Eliminado Correctamente</h1>);
            setCambio(cambio + 1)
          }
          break;

        default:
          break;
      }

    });

  }

  function handleUpdt(id) {
    console.log(id);
    swal(
      <div>
        <div className="logoModal">Datos a actualizar</div>
        <div className="contEditModal">
          <div className="contInput">
            <TextCustom text="Usuario" className="titleInput" />
            <input
              type="text"
              id="nombre"
              className='inputCustom'
            />
          </div>

          <div className="contInput">
            <TextCustom
              text="Apellido"
              className="titleInput"
            />
            <input
              type="text"
              id="apellido"
              className='inputCustom'
            />
          </div>
          <div className="contInput">
            <TextCustom text="Genero" className="titleInput" />
            <select name="" id="genero">
              <option value={1}>Masculino</option>
              <option value={2}>Femenino</option>
            </select>
          </div>
          <div className="contInput">
            <TextCustom
              text="fechaNacimiento"
              className="titleInput"
            />
            <input type="date" id="fechaNacimiento" className='inputCustom' />
          </div>
          <div className="contInput">
            <TextCustom text="direccion" className="titleInput" />
            <input type="text" id='direccion' />
          </div>
          <div className="contInput">
            <TextCustom text="telefono" className="titleInput" />
            <input type="text" id='telefono' />
          </div>
          <div className="contInput">
            <TextCustom text="Email" className="titleInput" />
            <input
              type="text"
              id="Email"
              className='inputCustom'
            />
          </div>
        </div>
      </div>,
    ).then(() => {

      let fechaN=document.getElementById('fechaNacimiento').value

      let fecha = new Date(fechaN)

      let anio = fecha.getFullYear().toString();
      let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
      let dia = fecha.getDate().toString().padStart(2, "0");


      let fechaFormateada = anio + "/" + mes + "/" + dia;


      let data = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        IdGenero: document.getElementById('genero').value,
        fechaNacimiento:fechaFormateada,
        direccion: document.getElementById('direccion').value,
        telefonoCliente: document.getElementById('telefono').value,
        correoElectronico: document.getElementById('Email').value,
        idCliente: id,
      };

      if (sendData(urlUpdateCliente, data)) {
        swal(<h1>Cliente Actualizado Correctamente</h1>);
        setCambio(cambio + 1)
      }
    });

  }
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
