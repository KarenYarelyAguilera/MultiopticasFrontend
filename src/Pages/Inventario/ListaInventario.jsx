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

export const ListaInventario = (props) => {
  const [cambio, setCambio] = useState(0)
  const [Modelo, setModelo] = useState([]);
  const [roles, setRoles] = useState([]);

  const urlProducto = 'http://localhost:3000/api/productos'; //MUESTA LOS PRODUCTOS EN LA TABLA
  const urlDelProducto = 'http://localhost:3000/api/producto/eliminar'; //ELIMINA PRODUCTO

  const urlModelos = 'http://localhost:3000/api/modelos'; //MUESTRA LOA MODELOS

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
         //COLOCAR APIS DE BITACORA AQUI---
  //-------------------------------------------------------------------

  const [precio, setprecio] = useState('');
  const [errorprecio, setErrorprecio] = useState(false);
  const [aviso, setaviso] = useState(false);

  const [cantidadmax, setcantidadmax] = useState('');
  const [mensaje, setmensaje] = useState('');
  const [errorcantidadmax, setErrorcantidadmax] = useState(false);

  const [cantidadmin, setcantidadmin] = useState('');
  const [advertencia, setadvertencia] = useState('');
  const [errorcantidadmin, setErrorcantidadmin] = useState(false);

  const [descrpcion, setdescripcion] = useState('');
  const [msj, setmsj] = useState('');
  const [errordescripcion, setErrordescripcion] = useState(false);

  useEffect(() => {
    fetch(urlProducto)
      .then(response => response.json())
      .then(data => setTableData(data));
    fetch(urlModelos)
      .then(response => response.json())
      .then(data => setModelo(data));
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
    // Field: nombre en que se esta llamando en la consulta SELECT
    { field: 'Movimiento Del Producto', headerName: 'Movimiento del Producto', width: 1300 },
    

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
            onClick={() => handleDel(params.row.IdProducto)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];




  //FUNCION DE ELIMINAR 
  function handleDel(IdProducto) {
    swal({
      content: (
        <div>

          <div className="logoModal">¿Desea Eliminar este Producto?</div>
          <div className="contEditModal">

          </div>

        </div>
      ),
      buttons: ['Eliminar', 'Cancelar'],
    }).then(async op => {
      switch (op) {
        case null:

          let data = {
            IdProducto: IdProducto,
          };

          //Funcion de Bitacora 
          /*  let dataB = {
             Id:props.idUsuario
           } */

          console.log(data);

          await axios
            .delete(urlDelProducto, { data })
            .then(response => {
              //axios.post (urlDelBitacora, dataB) //Bitacora de eliminar un empleado
              swal('Producto eliminado correctamente', '', 'success');
              setCambio(cambio + 1);
            })
            .catch(error => {
              console.log(error);
              swal('Error al eliminar el Producto', '', 'error');
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
          ¿Desea actualizar el producto: {id.descripcion} ?
        </div>
      ),
    }).then(
      op => {
        switch (op) {
          case 'update':
            props.data(id)
            props.update(true)
            navegate('/menuInventario/RegistroProducto2')
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
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Inventario</h2>

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
                navegate('/menuInventario/RegistroProducto2');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo 
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdProducto}
          rows={filteredData}
          columns={columns}
          pageSize={5}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};