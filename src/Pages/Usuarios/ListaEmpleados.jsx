import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';
import swal from '@sweetalert/with-react';

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

export const ListaEmpleados = ({data,update}) => {
  const [cambio, setCambio] = useState(0);
  const [generos, setGeneros] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const urlEmployees = 'http://localhost:3000/api/empleado';
  const urlUpdateEmployees = 'http://localhost:3000/api/empleado/actualizar';
  const urlDelEmployees = 'http://localhost:3000/api/empleado/eliminar';
  const urlgeneros = 'http://localhost:3000/api/empleado/genero';
  const urlsucursales = 'http://localhost:3000/api/empleado/sucursal';


  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [Nombre, setNombre] = useState('');
  const [errorNombre, setErrorNombre] = useState(false);
  const [Msj, setMsj] = useState(false);

  const [Apellido, setApellido] = useState('');
  const [errorApellido, setErrorApellido] = useState(false);
  const [aviso, setAviso] = useState(false);

  const [errorTelefono, setErrorTelefono] = useState(false);
  const [texto, setTexto] = useState(false);

  useEffect(() => {
    axios
      .get(urlEmployees)
      .then(response => {
        setTableData(response.data);
      })
      .catch(error => console.log(error));

    axios
      .get(urlgeneros)
      .then(response => {
        setGeneros(response.data);
      })
      .catch(error => console.log(error));

    axios
      .get(urlsucursales)
      .then(response => {
        setSucursales(response.data);
      })
      .catch(error => console.log(error));
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
    //son los de la base no los de node
    { field: 'IdEmpleado', headerName: 'ID', width: 190 },
    { field: 'nombre', headerName: 'Nombre', width: 190 },
    { field: 'apellido', headerName: 'Apellido', width: 190 },
    { field: 'telefonoEmpleado', headerName: 'Telefono', width: 190 },
    { field: 'departamento', headerName: 'Sucursal', width: 190 },
    { field: 'descripcion', headerName: 'Genero', width: 190 },
    { field: 'numeroIdentidad', headerName: 'Numero de identidad', width: 190 },
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
            onClick={() => handleDel(params.row.IdEmpleado)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  //funcion de eliminar
  function handleDel(id) {
    swal({
      content: (
        <div>

          <div className="logoModal">¿Desea Eliminar este empleado?</div>
          <div className="contEditModal">

          </div>

        </div>
      ),
      buttons: ['Eliminar', 'Cancelar'],
    }).then(async op => {
      switch (op) {
        case null:
          let data = {
            IdEmpleado: id,
          };

          console.log(data);

          await axios
            .delete(urlDelEmployees, { data })
            .then(response => {
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
        data(id)
        update(true)
        navegate('/usuarios/crearempleado')
          break;
        default:
          break;
      }
    });
  };

  const handleBack = () => {
    navegate('/empleados/lista');
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
        <DataGrid
          getRowId={tableData => tableData.IdEmpleado}
          rows={filteredData}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={5}
          //aqui iba el onrow
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};
