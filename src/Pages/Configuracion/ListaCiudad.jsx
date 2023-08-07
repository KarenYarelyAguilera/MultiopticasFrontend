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
import axios from 'axios';

export const ListaCiudad = () => {

  const [cambio, setcambio] = useState(0)
  const [marcah, setMarcah] = useState()

  const urlCuidad = 'http://localhost:3000/api/Cuidades';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(urlCuidad).then(response=>setTableData(response.data))
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
    { field: ' IdCiudad', headerName: 'ID Ciudad', width: 600 },
    { field: 'ciudad', headerName: 'Ciudad', width: 600 },

    // {
    //   field: 'borrar',
    //   headerName: 'Acciones',
    //   width: 200,

    //   renderCell: params => (
    //     <div className="contActions">
    //       <Button
    //         className="btnEdit"
    //         onClick={() => handleUpdt(params.row.IdMarca)}
    //       >
    //         <EditIcon></EditIcon>
    //       </Button>
    //       <Button
    //         className="btnDelete"
    //        onClick={() => handleDel(params.row.IdMarca)}
    //       >
    //         <DeleteForeverIcon></DeleteForeverIcon>
    //       </Button>
    //     </div>
    //   ),
    // },
  ];

  // zxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxaa



  const handleBack = () => {
    navegate('/config');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Ciudades</h2>

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
            {/* <Button
              className="btnCreate"
              onClick={() => {
                navegate('/config/RegistroCiudad');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Registro
            </Button> */}
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData. IdCiudad}
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
