import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { generatePDF } from '../../Components/generatePDF';
import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';
import axios from 'axios';
import fondoPDF from '../../IMG/FondoPDFH.jpg'
import { Bitacora } from '../../Components/bitacora';

import React from 'react';

//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import * as XLSX from 'xlsx'
import AnalyticsIcon from '@mui/icons-material/Analytics'; //para el boton de excel 
import Visibility from '@mui/icons-material/Visibility';



import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';

export const Kardex = (props) => {
  const urlVentaDetalle = 'http://localhost:3000/api/VentaDetalle'
  const urlFacturaCompra = 'http://localhost:3000/api/facturaCompra'
  const urlHistPago = "http://localhost:3000/api/pago"
  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso = {
    idRol: props.idRol,
    idObj: 3
  }
  useEffect(() => {
    axios.post(urlPermisos, dataPermiso).then((response) => setPermisos(response.data))
  }, [])
  const urlKardex = 'http://localhost:3000/api/kardex';

  //Bitacora
  const urlBitacoraSalirListaKardex = 'http://localhost:3000/api/bitacora/salirListaKardex';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(urlKardex)
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

  const handleGenerarExcel = () => {

    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const workbook = XLSX.utils.book_new();
      const currentDateTime = new Date().toLocaleString();

      // Datos para el archivo Excel
      const dataForExcel = filteredData.map((row, index) => ({

        'ID': row.IdKardex,
        'Tipo Movimiento': row.TipoMovimiento,
        'Producto': row.Producto,
        'Cantidad': row.cantidad,
        'Fecha': new Date(row.fechaYHora).toLocaleDateString('es-ES'), // Formatea la fecha
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['ID', 'Tipo Movimiento', 'Producto', 'Cantidad', 'Fecha'] });



      XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
      XLSX.writeFile(workbook, 'Reporte_Kardex.xlsx');


    }

  };

  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const formatDataForPDF = () => {
        const formattedData = filteredData.map((row) => {
          const date = new Date(row.fechaYHora);
          const formattedDate = date.toLocaleDateString('es-ES'); // Formato de fecha corto en español

          return {
            'ID': row.IdKardex,
            'Tipo Movimiento': row.TipoMovimiento,
            'Producto': row.Producto,
            'Cantidad': row.cantidad,
            'Fecha': formattedDate,
          };
        });
        return formattedData;
      };

      const urlPDF = 'Reporte_Kardex.pdf';
      const subTitulo = "LISTA DE KARDEX"

      const orientation = "landscape";
      generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF);
    }

  };

  const columns = [
    { field: 'idKardex', headerName: 'ID', width: 50 },
    { field: 'Usuario', headerName: 'Usuario', width: 50 },
    { field: 'movimiento', headerName: 'Tipo de Movimiento', width: 300 },
    { field: 'producto', headerName: 'Producto', width: 200 },
    { field: 'total_compra', headerName: 'Cantidad (compra)', width: 150 },
    { field: 'total_venta', headerName: 'Cantidad (venta)', width: 150 },
    {
      field: 'fechaYHora', headerName: 'Fecha', width: 200,
      valueGetter: (params) => {
        const date = new Date(params.row.fechaYHora);
        return date.toLocaleDateString('es-ES'); // Formato de fecha corto en español
      },
    },
    { field: 'descripcion', headerName: 'Descripcion', width: 200 },
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 260,

      renderCell: params => (
        <div className="contActions1">
          <Button
            className="btnEdit"
            onClick={() => handlefactura(params.row)}
          >
            <Visibility></Visibility>
          </Button>
        </div>
      ),


    },

  ];

  function handlefactura(fila) {
    if (fila.IdTipoMovimiento == 1) {
      handleFactCompra(fila.idCompra)
    } else if (fila.IdTipoMovimiento == 2) {
      handleFactVenta(fila.idVenta)
    } else {
      swal("No hay factura para este movimiento", "", "error")
    }
  }

  async function historialPagos(idVenta) {
    let data = {
      idVenta: idVenta
    }
    axios.post(urlHistPago, data).then((res) => {
      console.log(res);
      if (res.data.estado !== "Pagado") {
        res.data.map(pago => {
          <div>
            <label htmlFor="">fecha: {pago.fecha}</label><br />
            <label htmlFor="">tipo pago: {pago.descripcion}</label><br />
            <label htmlFor="">Saldo abonado: {pago.saldoAbonado}</label>
            <label> Saldo Restante: {pago.saldoRestante}</label>
          </div>
        })
      }
    })
  }

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
                        <label htmlFor="">fecha: {pago.fecha}</label><br />
                        <label htmlFor="">tipo pago: {pago.descripcion}</label><br />
                        <label htmlFor="">Saldo abonado: {pago.saldoAbono}</label>
                        <label> Saldo Restante: {pago.saldoRestante}</label>
                        <br />
                      </div>
                    ))
                  }</label>


                  {detalle.data.map((detallito) => (
                    <React.Fragment key={detallito.id}> {/* Agrega un key único para cada elemento del mapeo */}
                      <hr />
                      <label><b>Aro:  {detallito.aro} </b></label>
                      <label><b>Lente: {detallito.lente}</b></label>
                      <label><b>Promocion: {detallito.promocion}</b></label>
                      <label><b>Garantia: {detallito.garantia}</b></label>
                      <label><b>Precio del lente: <div style={{ textAlign: 'right', marginRight: '20px' }}>{detallito.precLente.toFixed(2)}</div></b></label>
                      <label><b>Precio del aro: <div style={{ textAlign: 'right', marginRight: '20px' }}>{detallito.precio.toFixed(2)}</div></b></label>
                      <label><b>cantidad: <div style={{ textAlign: 'right', marginRight: '20px' }}>{detallito.cantidad}</div></b></label>
                      <label><b>Total de los lentes y aros: <div style={{ textAlign: 'right', marginRight: '20px' }}>{detallito.subtotal.toFixed(2)}</div></b></label>
                      <label><b>Rebaja de los lentes y aros: <div style={{ textAlign: 'right', marginRight: '20px' }}>{detallito.rebaja.toFixed(2)}</div></b></label>
                    </React.Fragment>
                  ))}
                  <br />
                  <hr style={{ width: '50%', marginLeft: 'auto' }} />
                  <label><b>subtotal: <div style={{ textAlign: 'right', marginRight: '20px' }}> {totalSubtotal.toFixed(2)}</div></b></label>
                  <label><b>Rebajas: <div style={{ textAlign: 'right', marginRight: '20px' }}>{totalRebajas.toFixed(2)}</div></b></label>
                  <label><b>Total a pagar: <div style={{ textAlign: 'right', marginRight: '20px' }}>{detalle.data[0].valorVenta.toFixed(2)}</div></b></label>
                </div>

              </div>
            </div>,
          )
        })
      })




    }
    //setinformacionventa.data[0](id);
  }

  function handleFactCompra(id) {
    // setModalData(id);

    axios.post(urlFacturaCompra, { id: id }).then((detalle) => {
      console.log(detalle);
      swal(
        <div>
          <div className="logoModal">DATOS DE LA COMPRA</div>
          <div className="contEditModal">
            <div className="contInput">
              <label><b>---------------- MULTIOPTICAS ---------------- </b></label>
              <label><b>compra#{id}</b></label>
              <label><b>Fecha:{new Date(detalle.data[0].fechaCompra).toLocaleDateString()}</b></label>

              {detalle.data.map((detallito) => (
                <React.Fragment key={detallito.id}> {/* Agrega un key único para cada elemento del mapeo */}
                  <hr />
                  <label><b>CIA Proveedora:  {detallito.CiaProveedora} </b></label>
                  <label><b>Aro:  {detallito.Aros} </b></label>
                  <label><b>Cantidad: <div style={{ textAlign: 'right', marginRight: '20px' }}>{detallito.cantidad}</div></b></label>
                  <label><b>Total de los lentes y aros: <div style={{ textAlign: 'right', marginRight: '20px' }}>{detallito.costoCompra.toFixed(2)}</div></b></label>
                </React.Fragment>
              ))}
              <hr style={{ width: '50%', marginLeft: 'auto' }} />
              <label><b>Total de la compra: <div style={{ textAlign: 'right', marginRight: '20px' }}>{detalle.data[0].totalCompra.toFixed(2)}</div></b></label>
            </div>

          </div>
        </div>,
      )
    })


  }


  function handleUpdt(param) {

  }

  function handleDel(id) {

  }
  //Funcion de Bitacora 
  let dataB = {
    Id: props.idUsuario
  };
  const bitacora = {
    urlB: urlBitacoraSalirListaKardex,
    activo: props.activo,
    dataB: dataB
  };
  const handleBack = () => {
    Bitacora(bitacora)
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Kardex</h2>

      <div
        style={{
          height: 400,
          width: '85%',
          position: 'relative',
          left: '130px',
        }}
      >
        <div className="contFilter1">
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
          <div className="btnActionsNewReport1">
            <Button
              className="btnCreate"
              onClick={() => {
                if (permisos[0].insertar === "n") {
                  swal("No cuenta con los permisos para realizar esta accion", "", "error")
                } else {
                  navegate('/menuInventario/Kardex2');
                }

              }} > <AddIcon style={{ marginRight: '3px' }} />Nuevo
            </Button>

            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '3px' }} /> Generar Excel
            </Button>

            <Button className="btnReport"
              onClick={handleGenerarReporte}>
              <PictureAsPdfIcon style={{ marginRight: '3px' }} />Generar reporte
            </Button>

          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.idKardex}
          rows={filteredData}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pagination
          autoHeight
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>
    </div>
  );
};