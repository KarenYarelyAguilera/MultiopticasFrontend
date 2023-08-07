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
import Visibility from '@mui/icons-material/Visibility';

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import axios from 'axios';

export const InventarioDisponible = (props) => {

  const urlInventario = 'http://localhost:3000/api/inventarios';

  const [cambio, setcambio] = useState(0)
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(urlInventario).then((response)=>setTableData(response.data))
    console.log(tableData);
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

  
  const columns = [
    { field: 'IdInventario', headerName: 'IdInventario', width: 100 },
    { field: 'idProducto', headerName: 'IdProducto', width: 100 },
    { field: 'descripcion', headerName: 'Marca', width: 400 },
    { field: 'detalle', headerName: 'Producto', width: 400 },
    { field: 'cantidad', headerName: 'Cantidad', width: 400 },
    
  
    
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 300,

      renderCell: params => (
        <div className="contActions1">
          <Button
            className="btnEdit"
            title='Editar inventario'
            onClick={() => swal("No es posible realizar esta accion","","error")}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => swal("No es posible realizar esta accion","","error")}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
          <Button
            className="btnImprimirExp"
            onClick={() => ListaMovimiento(params.row) }
          >
            <Visibility></Visibility>
          </Button>
        </div>
      ),
    },
  ];

  const ListaMovimiento = (param)=>{
    props.data(param)
    navegate('/menuInventario/listaInventario')
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
                navegate('');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Inventario
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.id}
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