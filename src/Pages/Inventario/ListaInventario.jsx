import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';
import { generatePDF } from '../../Components/generatePDF';
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

import fondoPDF from '../../IMG/FondoPDFH.jpg'


import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';

export const ListaInventario = (props) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://194.163.45.55:4000/api/permiso/consulta'
  const dataPermiso = {
    idRol: props.idRol,
    idObj: 3
  }
  useEffect(() => {
    axios.post(urlPermisos, dataPermiso).then((response) => setPermisos(response.data))
  }, [])
  const [cambio, setCambio] = useState(0)
  const [Modelo, setModelo] = useState([]);
  const [roles, setRoles] = useState([]);

  const urlProducto = 'http://194.163.45.55:4000/api/ProductoKardex'; //MUESTA LOS PRODUCTOS EN LA TABLA


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
    console.log(props.data);
    axios.post(urlProducto, props.data).then((response) => setTableData(response.data))
  }, [cambio]);

  const navegate = useNavigate();

  const rowsWithIds = tableData.map((row, index) => ({
    ...row,
    id: `${row.name}-${index}`
  }));

  const filteredData = rowsWithIds.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );
  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const formatDataForPDF = () => {
        const formattedData = filteredData.map((row) => {
          const fechaCre = new Date(row.fechaYHora);
          const fechaYHora = String(fechaCre.getDate()).padStart(2, '0') + "/" +
            String(fechaCre.getMonth()).padStart(2, '0') + "/" +
            fechaCre.getFullYear();
          return {
            'ID': row.Producto,
            'Cantidad': row.Cantidad,
            'Movimiento': row.Movimiento,
          };
        });
        return formattedData;
      };

      const urlPDF = 'Reporte_Kardex.pdf';
      const subTitulo = "LISTA DE KARDEX"

      const orientation = "landscape";
      generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF);
    }

  };
  const columns = [
    // Field: nombre en que se esta llamando en la consulta SELECT
    { field: 'Producto', headerName: 'Producto', width: 300 },
    { field: 'Cantidad', headerName: 'Cantidad', width: 300 },
    { field: 'Movimiento', headerName: 'Movimiento Realizado', width: 300 },

    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190,

      renderCell: params => (
        <div className="contActions1">
          <Button
            className="btnEdit"
            title='Editar inventario'
            onClick={() => swal("No es posible realizar esta accion", "", "error")}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => swal("No es posible realizar esta accion", "", "error")}
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
          ¿Desea actualizar el producto: {id.Producto} ?
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
    navegate('/Inventario/InventarioDisponible');
  };


  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Movimientos del producto: {props.data.detalle}</h2>

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
                if (permisos[0].insertar === "n") {
                  swal("No cuenta con los permisos para realizar esta accion","","error")
                } else {
                  navegate('/menuInventario/RegistroProducto2');
                }
                
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo
            </Button>
            <Button className="btnReport"
              onClick={handleGenerarReporte}
            >
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar PDF
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={(tableData) => {
            // Generar un ID único utilizando Math.random()
            const uniqueId = Math.random().toString(36).substr(2, 9);
            return `${tableData.idProducto}-${uniqueId}`;
          }}
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