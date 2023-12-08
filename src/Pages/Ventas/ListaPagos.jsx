import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';
import logoImg from "../../IMG/MultiopticaBlanco.png";
import fondoPDF from '../../IMG/FondoPDFH.jpg'

import React from 'react'
import Visibility from '@mui/icons-material/Visibility';


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

import * as XLSX from 'xlsx'
import AnalyticsIcon from '@mui/icons-material/Analytics'; //para el boton de excel 

import { WorkWeek } from 'react-big-calendar';
import { generatePDF } from '../../Components/generatePDF';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



export const ListaPagos = (props) => {
  const urlVentaDetalle = 'http://localhost:3000/api/VentaDetalle'
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const urlHistPago = "http://localhost:3000/api/pago"
  const dataPermiso = {
    idRol: props.idRol,
    idObj: 9
  }
  useEffect(() => {
    axios.post(urlPermisos, dataPermiso).then((response) => setPermisos(response.data))
  }, [])

  const [cambio, setCambio] = useState(0);
  const urlPagos = 'http://localhost:3000/api/pagos';
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pdfData, setPdfData] = useState([]);

  let [formatDataForPDF, setFormatDataForPDF] = useState();
  let [urlPDF, seturlPDF] = useState('');

  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado



  useEffect(() => {
    axios.get(urlPagos).then(response => {
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, [cambio]);


  const handleGenerarExcel = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const workbook = XLSX.utils.book_new();
      const currentDateTime = new Date().toLocaleString();

      // Datos para el archivo Excel
      const dataForExcel = filteredData.map((row, index) => ({
        'IdPago': row.IdPago,
        'IdVenta': row.IdVenta,
        'Tipo de Pago': row.MetodoDePago,
        'Fecha': new Date(row.fecha).toLocaleDateString('es-ES'), // Formatea la fecha
        'Estado': row.estado,
        'Saldo Abonado': row.saldoAbono,
        'Saldo Restante': row.saldoRestante,
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['IdPago', 'IdVenta', 'Tipo de Pago', 'Fecha', 'Estado', 'Saldo Abonado', 'Saldo Restante'] });



      XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
      XLSX.writeFile(workbook, 'Lista_de_Pagos.xlsx');
    }
  };


  //IMPRIMIR PDF
  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      formatDataForPDF = () => {
        const formattedData = filteredData.map((row) => {
          const fechaCre = new Date(row.fechaCreacion);
          const fechaCreacion = String(fechaCre.getDate()).padStart(2, '0') + "/" +
            String(fechaCre.getMonth()).padStart(2, '0') + "/" +
            fechaCre.getFullYear();
          return {
            'IdPago': row.IdPago,
            'IdVenta': row.IdVenta,
            'Tipo de Pago': row.MetodoDePago,
            'Fecha': new Date(row.fecha).toLocaleDateString('es-ES'), // Formatea la fecha
            'Estado': row.estado,
            'Saldo Abonado': `L.${parseFloat(row.saldoAbono).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`,
            'Saldo Restante': `L.${parseFloat(row.saldoRestante).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`,
            //'Saldo Restante': row.saldoRestante,
          };
        });
        return formattedData;
      };

      urlPDF = 'Reporte_Pagos.pdf';
      const subTitulo = "LISTA DE PAGOS"
      const orientation = "landscape";

      generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF);
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
    { field: 'IdVenta', headerName: 'Número de venta', width: 110 },
    { field: 'MetodoDePago', headerName: 'Tipo de pago', width: 200 },
    {
      field: 'fecha', headerName: 'Fecha', width: 120,
      valueGetter: (params) => {
        const date = new Date(params.row.fecha);
        return date.toLocaleDateString('es-ES'); // Formato de fecha corto en español
      },

    },

    { field: 'estado', headerName: 'Estado', width: 200 },
    //{ field: 'saldoAbono', headerName: 'Saldo abonado', width: 110 },
    {
      field: 'saldoAbono',
      headerName: 'Saldo abonado',
      width: 310,
      renderCell: (params) => (
        <div>
          L.{parseFloat(params.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </div>
      ),
    },
    {
      field: 'saldoRestante',
      headerName: 'Saldo restante',
      width: 310,
      renderCell: (params) => (
        <div>
          L.{parseFloat(params.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </div>
      ),
    },
   // { field: 'saldoRestante', headerName: 'Saldo restante', width: 110 },

    {

      field: 'borrar',
      headerName: 'Acciones',
      width: 400,

      renderCell: params => (
        <div className="contActions1">
          <Button
            className="btnEdit"
            onClick={() => handleFactVenta(params.row.IdVenta)}
          >
            <Visibility></Visibility>
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

  async function handleFactVenta(id) {
    let data = {
      idVenta: id
    }
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      axios.post(urlVentaDetalle, { id: id }).then((detalle) => {
        axios.post(urlHistPago, data).then((histPago) => {
          const totalSubtotal = detalle.data.reduce((total, item) => total + item.subtotal, 0);
          const totalRebajas = detalle.data.reduce((rebaja, item) => rebaja + item.rebaja, 0);
  
          swal(
            <div>
              <div className="logoModal">DATOS DE LA VENTA</div>
              <div className="contEditModal">
                <div className="contInput">
                  <label><b>---------------- MULTIOPTICAS ---------------- </b></label>
                  <label><b>Venta#{detalle.data[0].IdVenta}</b></label>
                  <label><b>Fecha:{new Date(detalle.data[0].fecha).toLocaleDateString()}</b></label>
                  <label><b>Cliente: {detalle.data[0].cliente}</b></label>
                  <label><b>RTN: {detalle.data[0].RTN}</b></label>
                  <label><b>Empleado: {detalle.data[0].empleado}</b></label><br /><br />
  
                  <label>Historial de pago: {histPago.data.estado === "Pagado" ? <><br /><label htmlFor="">Estado: Pagado</label></> :
                    histPago.data.map((pago, index) => (
                      <div key={index}>
                        <label htmlFor="">
                      Fecha: {new Date(pago.fecha).toLocaleDateString('es-ES')}
                      </label><br />
                       <label htmlFor="">tipo pago: {pago.descripcion}</label><br />
                        <label htmlFor="">Saldo abonado: {pago.saldoAbono}</label>
                        <label> Saldo Restante: {pago.saldoRestante}</label>
                        <br />
                      </div>
                    ))
                  }</label>
  
  
                  {detalle.data.map((detallito) => (
                    <React.Fragment key={detallito.id}>
                      <hr />
                      <label><b>Aro:  {detallito.aro} </b></label>
                      <label><b>Lente: {detallito.lente}</b></label>
                      <label><b>Promocion: {detallito.promocion}</b></label>
                      <label><b>Garantia: {detallito.garantia}</b></label>
                      <label><b>Precio del lente: <div style={{ textAlign: 'right', marginRight: '20px' }}>L.{detallito.precLente.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div></b></label>
                      <label><b>Precio del aro: <div style={{ textAlign: 'right', marginRight: '20px' }}>L.{detallito.precio.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div></b></label>
                      <label><b>Cantidad: <div style={{ textAlign: 'right', marginRight: '20px' }}>{detallito.cantidad}</div></b></label>
                      <label><b>Total de los lentes y aros: <div style={{ textAlign: 'right', marginRight: '20px' }}>L.{detallito.subtotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div></b></label>
                      <label><b>Rebaja de los lentes y aros: <div style={{ textAlign: 'right', marginRight: '20px' }}>L.{detallito.rebaja.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div></b></label>
                    </React.Fragment>
                  ))}
                  <br />
                  <hr style={{ width: '50%', marginLeft: 'auto' }} />
                  <label><b>Subtotal: <div style={{ textAlign: 'right', marginRight: '20px' }}>L.{totalSubtotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div></b></label>
                  <label><b>Rebajas: <div style={{ textAlign: 'right', marginRight: '20px' }}>L.{totalRebajas.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div></b></label>
                  <label><b>Total a pagar: <div style={{ textAlign: 'right', marginRight: '20px' }}>L.{detalle.data[0].valorVenta.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div></b></label>
                </div>
              </div>
            </div>,
          )
        })
      })
    }
    //setinformacionventa.data[0](id);
  }

  const seguimientoPago = (pago) => {
    if (permisos[0].insertar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
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
            {/* <Button
              className="btnCreate"
              onClick={() => {
                swal("No es posible realizar una accion con este boton", "", "error")
              }}
            > <AddIcon style={{ marginRight: '3px' }} />  NUEVO
            </Button>
            */}
            
            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '5px' }} />  Generar Excel
            </Button>

            <Button className="btnReport"
              onClick={handleGenerarReporte}
            >  <PictureAsPdfIcon style={{ marginRight: '3px' }} />  Generar PDF
            </Button>

          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdPago}
          rows={filteredData}
          columns={columns}
          pageSize={pageSize}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pagination
          autoHeight
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>
    </div>
  );
};