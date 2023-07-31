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

export const ListaMetodosDePago = ({props,data,update}) => {

  const [cambio, setcambio] = useState(0)

  //URLS
  const urlMetodosPago = 'http://localhost:3000/api/tipopago';
  const urlDelMetodosPago = 'http://localhost:3000/api/tipopago/eliminar';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [descripcion, setDescripcion] = useState('');
  const [msj, setmsj] = useState('');
  const [errorDescripcion, setErrorDescripcion] = useState(false);

  useEffect(() => {
    axios.get(urlMetodosPago).then(response=>setTableData(response.data))
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
    { field: 'IdProveedor', headerName: 'IdTipoPago', width: 600 },
    { field: 'CiaProveedora', headerName: 'Metodo', width: 600 },
  
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
            onClick={() => handleDel(params.row.IdTipoPago)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

//FUNCION DE ACTUALIZAR
function handleUpdt(id) {
  swal({
    buttons: {
      update: 'ACTUALIZAR',
      cancel: 'CANCELAR',
    },
    content: (
      <div className="logoModal">
        ¿Desea actualizar el Metodo de Pago: {id.descripcion} ?
      </div>
    ),
  }).then(
    op => {
      switch (op) {
        case 'update':
          props.data(id)
          props.update(true)
          navegate('/config/MetodosDePago')
          break;
        default:
          break;
      }
    });
};

//FUNCION DE ELIMINAR 
function handleDel(IdTipoPago) {
  swal({
    content: (
      <div>

        <div className="logoModal">¿Desea Eliminar este Metodo de Pago?</div>
        <div className="contEditModal">

        </div>

      </div>
    ),
    buttons: ['Eliminar', 'Cancelar'],
  }).then(async op => {
    switch (op) {
      case null:

        let data = {
          IdTipoPago: IdTipoPago,
        };

        //Funcion de Bitacora 
        /*  let dataB = {
           Id:props.idUsuario
         } */

        console.log(data);

        await axios
          .delete(urlDelMetodosPago, { data })
          .then(response => {
            //axios.post (urlDelBitacora, dataB) //Bitacora de eliminar un empleado
            swal('Metodo de Pago eliminado correctamente', '', 'success');
            setcambio(cambio + 1);
          })
          .catch(error => {
            console.log(error);
            swal('Error al eliminar el Metodo de Pago', '', 'error');
          });

        break;

      default:
        break;
    }
  });
}



  const handleBack = () => {
    navegate('/config');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Metodos De Pago</h2>

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
                navegate('/config/MetodosDePago');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Metodo
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdMarca}
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
