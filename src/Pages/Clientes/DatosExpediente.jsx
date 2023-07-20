import React from 'react';
import Button from '@mui/material/Button';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import swal from '@sweetalert/with-react';

//Mui-Material-Icons
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

//Styles
import '../../Styles/Usuarios.css';

//Components
import { TextCustom } from '../../Components/TextCustom.jsx';
import { DataGrid, esES } from '@mui/x-data-grid';

export const DatosExpediente = ({
  msgError = '',
  success = false,
  warning = false,
  idUsuario,
}) => {
  const [tableData, setTableData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [total, setTotal] = React.useState(0);
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().slice(0, 10));

  React.useEffect(() => {
    setTableData([]);
  }, []);

  const handleBack = () => {};

  const navegate = useNavigate();

  const columns = [
    { field: 'Cliente', headerName: 'Cliente', width: 145 },
    { field: 'Fecha de Consulta', headerName: 'Fecha de Consulta', width: 145 },
    { field: 'Doctor', headerName: 'Optometrista', width: 145 },
    { field: 'Asesor de Ventas', headerName: 'Asesor de Ventas', width: 145 },
  ];

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Datos de Expediente</h2>
        <h3>Complete todos los datos para poder crear el expediente.</h3>
      </div>
      <div className="infoAddCompra">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Cliente" className="titleInput" />
              <input
                 type="text"
                 name="input1"
                 className="inputCustom"
                 maxLength={15}
                 placeholder="Cliente"
                 variant="standard"
                 id="Cliente"
                 label="Usuario"
              />
            </div>
            <div className="contInput">
              <TextCustom text="Fecha de Creacion" className="titleInput" />
              <input
               type="date"
               name=""
               maxLength={8}
               className="inputCustom"
               placeholder="Fecha de Creacion"
               id="fecha"
               value={fechaActual}
               disabled
              />
            </div>
            <div className="contInput">
              <TextCustom text="Creado Por" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Creado Por"
                id="cantidad"
                onKeyDown={(e) => {}}
                onClick={(e) => {}}
              />
              <p class="error"></p>
            </div>
            <div className="contBtnStepper1">
              <Button 
              onClick={() => {
                navegate('/menuClientes/DetalleExpediente');
              }}
              variant="contained" className="btnStepper">
                <h1>{'Finish' ? 'Agregar' : 'Finish'}</h1>
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{
            height: 400,
            position: 'relative',
          }}
        >
          <div className="contFilter1">
            <SearchIcon
              style={{
                position: 'absolute',
                color: 'gray',
                paddingLeft: '10px',
              }}
            />
            <input
              type="text"
              className="inputSearch"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="btnActionsNewReport">
              <Button className="btnCreate1">
                <AddIcon style={{ marginRight: '5px' }} />
                Guardar
              </Button>
              <Button className="btnReport1" onClick={() => {}}>
                Cancelar
              </Button>
            </div>
          </div>
          <DataGrid
            rows={tableData}
            columns={columns}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
          
        </div>
      </div>
    </div>
  );
};