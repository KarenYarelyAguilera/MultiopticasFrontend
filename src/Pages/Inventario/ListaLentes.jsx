import { DataGrid,esES } from '@mui/x-data-grid';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';

import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';
import axios from 'axios';
import { generatePDF } from '../../Components/generatePDF';
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

export const ListaLentes = (props) => {

  const urlCompras ='http://localhost:3000/api/compra';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(urlCompras)
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
  const handleGenerarReporte = () => {
    const formatDataForPDF = () => {
      const formattedData = filteredData.map((row) => {
        const fechaCre = new Date(row.fechaCompra);
        const fechaCompra = String(fechaCre.getDate()).padStart(2, '0') + "/" +
          String(fechaCre.getMonth()).padStart(2, '0') + "/" +
          fechaCre.getFullYear();
        return {
          'ID':row.IdCompra,
          'Fecha':fechaCompra,
          'Total compra': row.totalCompra,
        };
      });
      return formattedData;
    };

    const urlPDF = 'Reporte_Compras.pdf';
    const subTitulo = "LISTA DE COMPRAS"

    const orientation = "landscape";
  generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation);
  };


  const columns = [
    { field: 'ID Lente', headerName: 'ID Lente', width: 380 },
    { field: 'Lente', headerName: 'Lente', width: 380 },
    { field: 'Precio', headerName: 'Precio', width: 380 },
   
    
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 380,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit"
            onClick={() => handleButtonClick(params.row.id)}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleButtonClick(params.row.id)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  function handleButtonClick(id) {
    swal("No es posible realizar esta accion","","error")
  }
  const handleBack = () => {
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Lentes</h2>

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
                navegate('/Inventario/RegistroLente');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo
            </Button>
            <Button className="btnReport"
             onClick={handleGenerarReporte}
            >
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdCompra}
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