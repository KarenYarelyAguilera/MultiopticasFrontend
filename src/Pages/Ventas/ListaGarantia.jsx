
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

export const ListaGarantia = ({props,data,update}) => {

  const [marcah, setMarcah] = useState()
  const [cambio, setCambio] = useState(0)

  //URL DE GARANTIA GET Y DELETE 
  const urlGarantias ='http://localhost:3000/api/garantias';
  const urlDelGarantias ='http://localhost:3000/api/garantias/eliminar';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(urlGarantias).then(response => { 
      setTableData(response.data);
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
    { field: 'IdGarantia', headerName: 'ID Garantia', width: 210 },
    { field: 'descripcion', headerName: 'Descripcion', width: 210 },
    { field: 'Meses', headerName: 'Meses de Garantia', width: 210 },
    { field: 'producto', headerName: 'Producto', width: 210 },
    { field: 'estado', headerName: 'Estado', width: 210 },
    
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
            onClick={() => handleDel(params.row.IdGarantia)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  //FUNCION DE ELIMINAR 
  function handleDel(id) {
    swal({
      content: (
        <div>
          <div className="logoModal">¿Desea Elimiar esta garantia?</div>
          <div className="contEditModal">
          </div>
        </div>
      ),
      buttons: {
        cancel: 'Eliminar',
        delete: 'Cancelar',
      },
    }).then(async(op) => {

      switch (op) {
        case null:

          let data = {
            IdGarantia: id,
          };
    
          console.log(data);
    
          await axios.delete(urlDelGarantias,{data}).then(response=>{
            swal("Garantia eliminada correctamente","","success")
            setCambio(cambio+1)
          }).catch(error=>{
            console.log(error);
            swal("Error al eliminar la garantia","","error")
          })
        break;
        default:
        break;
      }
    });
  };

  //BOTON DE RETROCEDER 
  const handleBack = () => {
    navegate('/ventas');
  };

   //FUNCION DE ACTUALIZAR 
  function handleUpdt(id) {
    swal({
      buttons: {
        update: 'Actualizar',
        cancel: 'Cancelar',
      },
      content: (
        <div className="logoModal">
          ¿Desea actualizar la Garantia: {id.descripcion}?
        </div>
      ),
    }).then((op) => {
      switch (op) {
          case 'update':
          data(id)
          update(true)
      navegate('/menuVentas/RegistroGarantia')
      break;
      default:
      break;
      }
    });
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Garantias</h2>

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
                navegate('/menuVentas/RegistroGarantia');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nueva Garantia
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdGarantia}
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
