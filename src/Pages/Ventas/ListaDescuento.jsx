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
import axios from 'axios'; //Agregarlo siempre porque se necesita para exportar Axios para que se puedan consumir las Apis 

export const ListaDescuento = ({props,data,update}) => {
  const [marcah, setMarcah] = useState()
  const [cambio, setCambio] = useState(0)

//URL DE DESCUENTO
const urlListaDescuentos = 'http://localhost:3000/api/Descuento';
const urlDelDescuento = 'http://localhost:3000/api/Descuento/BorrarDescuento';

const [tableData, setTableData] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
 
  useEffect(() => {
    axios.get (urlListaDescuentos).then(response=> setTableData(response.data))
  }, [cambio]);

  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );
  
  //ESTRUCTURA DE LA TABLA 
  const columns = [
    { field: 'IdDescuento', headerName: 'ID Descuento', width: 210 },
    { field: 'estado', headerName: 'Estado', width: 210 },
    { field: 'descPorcent', headerName: 'Descuento del Cliente', width: 210 },
    { field: 'descPorcentEmpleado', headerName: 'Descuento del Empleado', width: 210 },
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190,

      renderCell: params => (
        <div className="contActions1">
          <Button className="btnEdit" onClick={() => handleUpdate(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleDel(params.row.IdDescuento)}
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
          <div className="logoModal">
          ¿Desea Elimiar este Descuento?</div>
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
            IdDescuento: id
          };

          console.log(data);

          await axios.delete(urlDelDescuento,{data}).then(response=>{
            swal("Descuento eliminado correctamente","","success")
            setCambio(cambio+1)
          }).catch(error=>{
            console.log(error);
            swal("Error al eliminar el descuento","","error")
          })
          break;
          default:
          break;
      }
    });
  };

  //FUNCION DE ACTUALIZAR 
  function handleUpdate (id) {
    swal({
      buttons: {
        update: 'Actualizar',
        cancel: 'Cancelar',
      },
      content: (
        <div className="logoModal">
          ¿Desea actualizar el descuento ?: {id.descuento}?
        </div>
      ),
    }).then((op) => {
      switch (op) {
          case 'update':
          data(id)
         update(true)
      navegate('/menuVentas/RegistroDescuento')
      break;
      default:
      break;
      }
    });
  };

  //   let descCliente = parseFloat(document.getElementById("descCliente").value)
  //   let descEmpleado = parseFloat(document.getElementById("descEmpleado").value)
  //   let estado = parseInt(document.getElementById("estado").value)

  //   let data = {
  //     estado:estado,
  //     descPorcent:descCliente,
  //     descPorcentEmpleado:descEmpleado,
  //     IdDescuento:fila.row.IdDescuento
  //   };
      

  //     if (sendData(urlUpdateDescuento, data)) {
  //       swal(<h1>Usuario Actualizado Correctamente</h1>);
  //       setcambio(cambio+1)
  //     }
  //   });
  // };

    //BOTON DE RETROCEDER 
  const handleBack = () => {
    navegate('/ventas');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Descuentos</h2>

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
                navegate('/menuVentas/RegistroDescuento');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Descuento
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>

        <DataGrid
          getRowId={tableData => tableData.IdDescuento}
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