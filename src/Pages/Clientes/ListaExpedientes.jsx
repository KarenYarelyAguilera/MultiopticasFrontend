import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
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

export const ListaExpedientes = (props) => {

  const [cambio, setCambio] = useState(0);

  const urlExpedientes = 'http://localhost:3000/api/Expediente';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pdfData, setPdfData] = useState([]);

  useEffect(() => {
    axios.get(urlExpedientes).then(response =>{
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, [cambio]);


  //IMPRIMIR PDF
  const handleGenerarReporte = () => {
    const formatDataForPDF = () => {
      const formattedData = tableData.map((row) => {
        return {
          'Número de expediente': row.IdExpediente,
          'Cliente': row.Cliente,
          'Fecha de creación': row.fechaCreacion,
          'Creado por': row.CreadoPor,
        };
      });
      return formattedData;
    };

    const dataForPDF = formatDataForPDF();
    const documento = new jsPDF();
    const columns = Object.keys(dataForPDF[0]);
    const rows = dataForPDF.map((row) => Object.values(row));

    documento.autoTable({
      head: [columns],
      body: rows,
    });

    documento.save('reporte_expedientes.pdf');
  };
  
  ///////// 
  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  function traducirEstado(estado) {
    if (estado === 1) {
      return "activo";
    } else if (estado === 2) {
      return "inactivo";
    } else {
      return "";
    }
  }

  const columns = [
    { field: 'IdExpediente', headerName: 'Numero de expediente', width: 300 },
    { field: 'Cliente', headerName: 'Cliente', width: 300 },
    { field: 'fechaCreacion', headerName: 'Fecha de creacion', width: 300},
    { field: 'CreadoPor', headerName: 'Creado por', width: 300 },
    {field: 'TotalRegistros', headerName: 'Total Historial Clinico', width: 300 },
    {

      field: 'borrar',
      headerName: 'Acciones',
      width: 400,

      renderCell: params => (
        <div className="contActions1">
          <Button
            className="btnEdit"

          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>

          <Button
            className="btnAddExpe"
            onClick={() => handleNewExpediente(params.row)}
          >
            <AddIcon></AddIcon>
          </Button>
        </div>
      ),
    },
  ];


  const handleNewExpediente = (expediente)=>{
    let data={
      id:expediente.IdExpediente,
      idCliente:expediente.Cliente
    }
  
    console.log(expediente);
     props.data(data)
     navegate('/menuClientes/DatosExpediente');
  }

  const handleBack = () => {
    navegate('/menuClientes');
  };

  const handleCloseDialog = () => {
    setShowPdfDialog(false);
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Expedientes</h2>

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
                navegate('/menuClientes/DatosExpediente');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              NUEVO
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
          getRowId={tableData => tableData.IdExpediente}
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </div>
  );
};
