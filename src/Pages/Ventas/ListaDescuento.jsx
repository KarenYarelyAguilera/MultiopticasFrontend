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

export const ListaDescuento = () => {
  const [roles, setRoles] = useState([]);

  const urlDescuentos =
    'http://localhost/APIS-Multioptica/Venta/controller/venta.php?op=Descuentos';
    const urlUpdateDescuento ="http://localhost/APIS-Multioptica/Venta/controller/venta.php?op=UpdateDescuento"
  const urlDelDescuento = 
    'http://localhost/APIS-Multioptica/Venta/controller/venta.php?op=DeleteDescuento';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cambio, setcambio] = useState(0)

  useEffect(() => {
    fetch(urlDescuentos)
      .then(response => response.json())
      .then(data => setTableData(data));
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
    { field: 'IdDescuento', headerName: 'ID Descuento', width: 300 },
    { field: 'estado', headerName: 'Estado', width: 300 },
    { field: 'DescuentoCliente', headerName: 'Descuento del Cliente', width: 300 },
    { field: 'DescuentoEmpleado', headerName: 'Descuento del Empleado', width: 300 },
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit"
            onClick={() => handleUpdate(params)}
          >
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

  function handleUpdate(fila) {
    swal(
      <div>
        <div className="logoModal">Datos a actualizar</div>
        <div className="contEditModal">
          <div className="contInput">
            <TextCustom text="Estado" className="titleInput" />
            <select name="" id="estado">
              <option value={1}>Activo</option>
              <option value={2}>Inctivo</option>
            </select>
          </div>

          <div className="contInput">
            <TextCustom
              text="Descuento de cliente"
              className="titleInput"
            />
            <input
              type="text"
              id="descCliente"
              className='inputCustom'
              value={fila.row.DescuentoCliente}
            />
          </div>
          <div className="contInput">
            <TextCustom text="Estado" className="titleInput" />
            <input
              type="text"
              className='inputCustom'
              id="descEmpleado"
              value={fila.row.DescuentoEmpleado}
            />
         </div>
        </div>
      </div>,
    ).then(() => {

    let descCliente = parseFloat(document.getElementById("descCliente").value)
    let descEmpleado = parseFloat(document.getElementById("descEmpleado").value)
    let estado = parseInt(document.getElementById("estado").value)

    let data = {
      estado:estado,
      descPorcent:descCliente,
      descPorcentEmpleado:descEmpleado,
      IdDescuento:fila.row.IdDescuento
    };
      


      if (sendData(urlUpdateDescuento, data)) {
        swal(<h1>Usuario Actualizado Correctamente</h1>);
        setcambio(cambio+1)
      }
    });
  }

  function handleDel(id) {
    swal({
      content: (
        <div>
          <div className="logoModal">Desea Elimiar esta Descuento?</div>
          <div className="contEditModal">

          </div>
        </div>
      ),
      buttons: ["Eliminar", "Cancelar"]
    }).then((op) => {

      switch (op) {
        case null:

          let data = {
            IdDescuento: id
          };

          console.log(data);


          if (sendData(urlDelDescuento, data)) {
            swal(<h1>Descuento Eliminado Correctamente</h1>);
            setcambio(cambio + 1)
          }
          break;

        default:
          break;
      }

    });

  }

  
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
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </div>
  );
};
