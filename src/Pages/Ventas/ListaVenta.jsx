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
import Visibility from '@mui/icons-material/Visibility';

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';

export const ListaVenta = () => {
  const [roles, setRoles] = useState([]);

  const urlVentas = 'http://localhost:3000/api/Ventas';
 
 
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(urlVentas)
      .then(response => response.json())
      .then(data => setTableData(data));
  }, []);

  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [
    { field: 'IdVenta', headerName: 'IdVenta', width: 210 },
    { field: 'fecha', headerName: 'Fecha', width: 310 },
    { field: 'Cliente', headerName: 'Cliente', width: 310 },
    { field: 'ValorVenta', headerName: 'Valor de la Venta', width: 310 },
   
    
     {
      field: 'borrar',
      headerName: 'Acciones',
      width: 260,

      renderCell: params => (
        <div className="contActions1">
          <Button
            className="btnEdit"
            onClick={() => handleUpdt(params.row)}
          >
            <Visibility></Visibility>
          </Button>

          <Button
            className="btnImprimirExp"
           // onClick={()=> handlePrintModal(params.row)}
          >
            
            <PictureAsPdfIcon></PictureAsPdfIcon>
          </Button>
          
        </div>
      ),
    },
  ];

     //PANTALLA MODAL---------------------------------------------------------------------------
     function handleUpdt(id) {
      //setModalData(id);
      console.log(id);
      swal(
        <div>
          <div className="logoModal">DATOS DE LA VENTA</div>
          <div className="contEditModal">
          <div className="contInput">
          <label><b>Fecha:{id.fecha}</b></label>
         </div>
          
           <div className="contInput">
           <label><b>Asesor de Venta:{id.IdEmpleado}</b></label>
              </div> 
              <div className="contInput">
              <label><b>Cliente:{id.IdCliente}</b></label>
              </div>
             
              <h3>
              ----------------DIAGNOSTICO-----------------
              </h3>
              <div className="contInput">
                <label><b>Esfera Ojo Derecho:{id.ODEsfera}</b></label>
              </div>
              <div className="contInput">
              <label><b>Esfera Ojo Izquierdo:{id.OIEsfera}</b></label>
              </div>
  
              <div className="contInput">
                <label><b>Cilindro Ojo Derecho:{id.ODCilindro}</b></label>
              </div>
              <div className="contInput">
                <label><b>Cilindro Ojo Izquierdo:{id.OICilindro}</b></label>
              </div>
              <div className="contInput">
              <label><b>Eje Ojo Derecho:{id.ODEje}</b></label>
              </div>
              <div className="contInput">
              <label><b>Eje Ojo Izquierdo:{id.OIEje}</b></label>
              </div>
              <div className="contInput">
              <label><b>Adicion Ojo Derecho:{id.ODAdicion}</b></label>
              </div>
  
              <div className="contInput">
              <label><b>Adicion Ojo Izquierdo:{id.OIAdicion}</b></label>
              </div>
  
              <div className="contInput">
              <label><b>Altura Ojo Derecho:{id.ODAltura}</b></label>
              </div>
  
              <div className="contInput">
              <label><b>Altura Ojo Izquierdo:{id.OIAltura}</b></label>
              </div>
  
              <div className="contInput">
              <label><b>Distancia Pupilar Ojo Derecho:{id.ODDistanciaPupilar}</b></label>
              </div>
  
              <div className="contInput">
              <label><b>Distancia Pupilar Ojo Izquierdo:{id.OIDistanciaPupilar}</b></label>
              </div>
  
              <div className="contInput">
              <label><b>Enfermedad Presentada:{id.diagnostico}</b></label>
              </div>
              
          </div>
        </div>,
      ).then( async() => {
      });
  
    }

  function handleButtonClick(id) {
    fetch(`/api/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        /* los nuevos datos que se van a actualizar */
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Aquí puedes actualizar los datos en el estado de tu aplicación
        // para reflejar los cambios en la interfaz de usuario.
      })
      .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la actualización
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
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Ventas</h2>

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
                navegate('/menuVentas/NuevaVenta');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nueva Venta
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdVenta}
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