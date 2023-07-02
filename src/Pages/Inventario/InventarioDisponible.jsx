import { DataGrid, esES } from '@mui/x-data-grid';
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

export const InventarioDisponible = () => {

  const urlInventario = "http://localhost/APIS-Multioptica/inventario/Controller/inventario.php?op=inventarios"

  const [cambio, setcambio] = useState(0)
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(urlInventario)
      .then(response => response.json())
      .then(data => setTableData(data));
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

  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];


  const columns = [
    { field: 'producto', headerName: 'Producto', width: 210 },
    { field: 'cantidad', headerName: 'Cantidad', width: 210 },
    { field: 'precio', headerName: 'Precio', width: 210 },
    { field: 'mes', headerName: 'Mes', width: 210,valueGetter: (params) => meses[params.value - 1]},
    { field: 'anio', headerName: 'Año', width: 210 },


    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 200,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit"
            onClick={() => swal("No puede realizar esta accion en este momento","","error")}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => swal("No puede realizar esta accion en este momento","","error")}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

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