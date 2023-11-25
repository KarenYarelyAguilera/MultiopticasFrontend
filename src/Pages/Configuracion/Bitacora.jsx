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
import axios from 'axios';

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';


export const Bitacora = (props) => {
  const [cambio,setCambio] = useState(0)
  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

const urlBitacora=
"http://localhost:3000/api/bitacora";

const urlOnOffBitacora ="http://localhost:3000/api/parametro/bitacora"

const urlSalirListaBitacora=
"http://localhost:3000/api/bitacora/SalirListaBitacora";


//   const urlProducto =
// "http://localhost/APIS-Multioptica/bitacora/controller/bitacora.php?op=Bitacora";

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(urlBitacora).then(response => {
        setTableData(response.data);
      })
      .catch(error => console.log(error));
  }, [cambio]);

  // useEffect(() => {
  //   fetch(urlBitacora)
  //     .then(response => response.json())
  //     .then(data => setTableData(data));
  // }, [cambio]);

  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [
    { field: 'IdBitacora', headerName: 'ID', width: 170 },
    { field: 'Usuario', headerName: 'Usuario', width: 170 },
    { field: 'Objeto', headerName: 'Modulo', width: 170 },
    { field: 'accion', headerName: 'Acción', width: 180 },
    { field: 'descripcion', headerName: 'Descripción', width: 470 },
    
    { field: 'fecha',
     headerName: 'Fecha', 
     width: 170, 
     headerAlign: 'center',
     renderCell: (params) => (
      <span>
          {new Date(params.value).toLocaleDateString('es-ES')}
      </span>
  ),
    
    
    },


  ];

  function handleUpdt(param) {
   
  }

  function handleDel(id) {

  }

 //Funcion de bitacora 
 let dataB = { 
  Id:props.idUsuario
}

  const handleBack = () => { 
    axios.post(urlSalirListaBitacora,dataB) //BOTON DE RETROCESO API BITACORA 
    navegate('/usuarios');
  };

  const handleUpdateBitacora = ()=>{
    let parametro = {
      Parametro: props.bitacora ==="si"?"no":"si"
    }

    axios.put(urlOnOffBitacora,parametro).then(()=>{
      let cambio = props.bitacora ==="si"?"no":"si"

      props.bita(cambio)
      
      if (props.bitacora==="si") {
        swal("La bitacora esta Inactiva","","success")
      }else if (props.bitacora==="no") {
        swal("La bitacora esta Activa","","success")
      }
    
    })
  }

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Bitacora</h2>

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
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
            {props.bitacora==="si"?
             <Button className="btnOff" onClick={handleUpdateBitacora}>
              Desactivar Bitacora
             </Button>:
              <Button className="btnOn"onClick={handleUpdateBitacora}>
              Activar Bitacora
              </Button> }
           
          </div>
          
        </div>
        <DataGrid
        pagination
          getRowId={tableData => tableData.IdBitacora}
          rows={filteredData}
          autoHeight
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>
    </div>
  );
};
