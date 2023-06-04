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

export const ListaProductos = () => {
  const [Modelo, setModelo] = useState([])
  const [roles, setRoles] = useState([]);
  const [cambio,setCambio] = useState(0)

  const [cantidadmax, setcantidadmax] =useState('');
  const [mensaje, setmensaje] =useState('');
  const [errorcantidadmax, setErrorcantidadmax] =useState(false);


  const urlProducto ="http://localhost/APIS-Multioptica/producto/controller/producto.php?op=Productos";
  const urlUpdProducto ="http://localhost/APIS-Multioptica/producto/controller/producto.php?op=UpdateProducto";

  const urlModelos = "http://localhost/APIS-Multioptica/producto/controller/producto.php?op=Modelos"

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
//--------------------------------------------------------------------
  const [precio, setprecio] = useState('');
  const [errorprecio, setErrorprecio] = useState(false);
  const [aviso, setaviso] = useState(false);

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
    { field: 'IdProducto', headerName: 'ID Producto', width: 190 },
    { field: 'producto', headerName: 'producto', width: 190 },
    { field: 'modelo', headerName: 'Modelo', width: 190 },
    { field: 'precio', headerName: 'Precio', width: 190 },
    { field: 'cantidadMin', headerName: 'Cantidad Minima', width: 190 },
    { field: 'cantidadMax', headerName: 'Cantidad Maxima', width: 190 },

    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit"
            onClick={() => handleUpdt(params)}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleDel(params)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  function handleUpdt(param) {
    swal(
      <div>
        <div className="logoModal">Datos a actualizar</div>
        <div className="contEditModal">
          <div className="contInput">
            <TextCustom text="producto" className="titleInput" />
            <input
              type="text"
              id="producto"
              className='inputCustom'
              value={param.row.producto}
            />
          </div>

          <div className="contInput">
            <TextCustom
              text="Modelo"
              className="titleInput"
            />
            <select name="" id="modelo">
            {Modelo.length ? (
                  Modelo.map(pre => (
                    <option key={pre.IdModelo} value={pre.IdModelo}>
                      {pre.detalle}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>
                )}
            </select>
          </div>
          <div className="contInput">
            <TextCustom text="Precio" className="titleInput" />
            <input
             onKeyDown={e => {
              setprecio(e.target.value);
              if (precio === '') {
                setErrorprecio(true);
                setaviso('Los campos no deben estar vacios');
              } else {
                setErrorprecio(false);
                var preg_match = /^[0-9]+$/;
                if (!preg_match.test(precio)) {
                  setErrorprecio(true);
                  setaviso('Solo deben de ingresar numeros');
                } else {
                  setErrorprecio(false);
                  setaviso('');
                }
              }
            }}
              type="text"
              className='inputCustom'
              id="precio"
              error={errorprecio}
              maxLength={13}
              value={param.row.precio}
            />
             <p class="error">{aviso}</p>
          </div>
          <div className="contInput">
            <TextCustom
              text="Cantidad minima"
              className="titleInput"
            />
            <input type="text" id="cantMin" className='inputCustom' value={param.row.cantidadMin} />
          </div>
          <div className="contInput">
            <TextCustom text="cantMax" className="titleInput" />
            <input 
             onKeyDown={e => {
              setcantidadmax(e.target.value);
              if (cantidadmax === '') {
                setErrorcantidadmax(true);
                setmensaje('Los campos no deben estar vacios');
              } else {
                setErrorcantidadmax(false);
                var preg_match = /^[0-9]+$/;
                if (!preg_match.test(cantidadmax)) {
                  setErrorcantidadmax(true);
                  setmensaje('Solo deben de ingresar numeros');
                } else {
                  setErrorcantidadmax(false);
                  setmensaje('');
                }
              }
            }}
            type="text"
             id="cantMax" 
             className='inputCustom'
             value={param.row.cantidadMax} />
             <p class="error">{mensaje}</p>
          </div>
        </div>
      </div>,
    ).then(() => {

      let data = {
        descripcion:document.getElementById('producto').value,
        IdModelo:document.getElementById('modelo').value,
        precio: document.getElementById('precio').value,
        cantidadMin: document.getElementById('cantMin').value,
        cantidadMax:document.getElementById('cantMax').value,
        IdProducto: param.row.IdProducto,
      };

      if (sendData(urlUpdProducto, data)) {
        swal(<h1>Producto Actualizado Correctamente</h1>);
        setCambio(cambio+1)
      }
    });
  }

  function handleDel(id) {

  }
  const handleBack = () => {
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Productos</h2>

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
                navegate('/menuInventario/RegistroProducto');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Producto
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
