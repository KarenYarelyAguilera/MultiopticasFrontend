import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';
import logoImg  from "../../IMG/MultiopticaBlanco.png";
import fondoPDF from "../../IMG/fondoPDF.jpg";


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
import { generatePDF } from '../../Components/generatePDF';

export const ListaPagos = (props) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso={
    idRol:props.idRol,
    idObj:9
  }
  useEffect(()=>{
    axios.post(urlPermisos,dataPermiso).then((response)=>setPermisos(response.data))
  },[])

  const [cambio, setCambio] = useState(0);
  const urlPagos = 'http://localhost:3000/api/pagos';
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pdfData, setPdfData] = useState([]);
  
  let [formatDataForPDF, setFormatDataForPDF] = useState();
  let [urlPDF, seturlPDF] = useState('');

  useEffect(() => {
    axios.get(urlPagos).then(response =>{
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, [cambio]);
  
  
  //IMPRIMIR PDF
  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      formatDataForPDF = () => {
        const formattedData = filteredData.map((row) => {
          const fechaCre = new Date(row.fechaCreacion);
          const fechaCreacion = String(fechaCre.getDate()).padStart(2,'0')+"/"+
                                String(fechaCre.getMonth()).padStart(2,'0')+"/"+
                                fechaCre.getFullYear();
          return {
            'IdPago': row.IdPago,
            'IdVenta': row.IdVenta,
            'Tipo de Pago': row.MetodoDePago,
            'Fecha': row.fecha,
            'Estado': row.estado,
            'Saldo Abonado': row.saldoAbono,
            'Saldo Restante': row.saldoRestante,
          };
        });
        return formattedData;
      };
  
      urlPDF = 'Reporte_Pagos.pdf';
      const subTitulo = "LISTA DE PAGOS"
      const orientation = "landscape";
  
      generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation);
    }
   
  };
  
  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value && value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
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
    // { field: 'IdPago', headerName: 'ID', width: 100 },
    { field: 'IdVenta', headerName: 'Número de venta', width: 200 },
    { field: 'MetodoDePago', headerName: 'Tipo de pago', width: 200},
    { field: 'fecha', headerName: 'Fecha', width: 200 },
    {field: 'estado', headerName: 'Estado', width: 200 },
    { field: 'saldoAbono', headerName: 'Saldo abonado', width: 200 },
    { field: 'saldoRestante', headerName: 'Saldo restante', width: 200 },

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
            onClick={() => seguimientoPago(params.row)}
          >
            <AddIcon></AddIcon>
          </Button>
        </div>
      ),
    },
  ];


  const seguimientoPago = (pago) => {
    if (permisos[0].insertar === "n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      const filasOriginales = filteredData; // Supongo que 'filteredData' contiene las filas originales
  
    // Verificar si existe alguna fila con estado "Pagado" y mismo idVenta
    const tienePagadoMismoIdVenta = filasOriginales.some(
      (fila) => fila.estado === "Pagado" && fila.IdVenta === pago.IdVenta
    );

    console.log(tienePagadoMismoIdVenta);
  
    if (pago.estado === "Pendiente" && tienePagadoMismoIdVenta) {
      swal("Existe una venta pagada con esta misma ID de Venta", "", "error");
    } else if (pago.saldoRestante > 0 || pago.estado === "Pendiente") {
      let data = {
        id: pago.IdVenta,
        saldoRestante: pago.saldoRestante
      };
  
      props.data(data);
      navegate('/menuVentas/PagoDeVenta');
    } else {
      swal("Venta Pagada No puede seguir", "", "error");
    }
    }
    
  };
  
  
  
  

  const handleBack = () => {
    navegate('/ventas');
  };

  const handleCloseDialog = () => {
    setShowPdfDialog(false);
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Pagos</h2>

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
                swal("No es posible realizar una accion con este boton","","error")
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
          getRowId={tableData => tableData.IdPago}
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
