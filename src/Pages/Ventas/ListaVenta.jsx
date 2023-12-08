import React from 'react';
import Button from '@mui/material/Button';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import ReactModal from 'react-modal';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { generatePDF } from '../../Components/generatePDF';

import fondoPDF from '../../IMG/FondoPDFH.jpg'

import swal from '@sweetalert/with-react';

//Mui-Material-Icons
import logoImg from "../../IMG/MultiopticaBlanco.png";

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Visibility from '@mui/icons-material/Visibility';

//Styles
import '../../Styles/Usuarios.css';

//Components
import { TextCustom } from '../../Components/TextCustom.jsx';
import { DataGrid, esES } from '@mui/x-data-grid';


import * as XLSX from 'xlsx'
import AnalyticsIcon from '@mui/icons-material/Analytics'; //para el boton de excel 

import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';



export const ListaVenta = (props) => {

  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

  const urlVentas = 'http://localhost:3000/api/Ventas';
  const urlVentaDetalle = 'http://localhost:3000/api/VentaDetalle'
  const urlHistPago = "http://localhost:3000/api/pago"
  const [tableData, setTableData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const urlAnularVenta = "http://localhost:3000/api/Ventas/anular"

  const [permisos, setPermisos] = useState([]);
  const [cambio, setCambio] = useState(0)
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso = {
    idRol: props.idRol,
    idObj: 9
  }
  useEffect(() => {
    axios.post(urlPermisos, dataPermiso).then((response) => setPermisos(response.data))
  }, [])

  useEffect(() => {
    console.log(props.id);
    console.log(props.datosventa.id);
    setTableData([]);
    fetch(urlVentas)
      .then(response => response.json())
      .then(data => setTableData(data));
  }, [cambio]);
  //VENTA DETALLE
  useEffect(() => {
    axios.post(urlVentaDetalle, props.id).then(response => {
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, []);



  const objectDate = new Date();
  const day = objectDate.getDate();
  const month = objectDate.getMonth();
  const year = objectDate.getFullYear();
  let format1 = month + "/" + day + "/" + year;



  const navegate = useNavigate();

  //Primer dia del mes
  const todayf = new Date();
  const firstDayOfMonth = new Date(todayf.getFullYear(), todayf.getMonth(), 1);
  const firstDayOfMonthString = firstDayOfMonth.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(firstDayOfMonthString);

  //ultimo dia del mes
  const todayE = new Date();
  const lastDayOfMonth = new Date(todayE.getFullYear(), todayE.getMonth() + 1, 0);
  const lastDayOfMonthString = lastDayOfMonth.toISOString().split('T')[0];
  const [endDate, setEndDate] = useState(lastDayOfMonthString);

  //limpiar filtros de la fecha
  const handleClearFilter = () => {
    setStartDate(''); //firstDayOfMonthString
    setEndDate('');//lastDayOfMonthString
    setSearchTerm(''); // Limpiar el término de búsqueda
    // También puedes agregar lógica adicional para limpiar otros estados si es necesario

    // Recargar los registros
    setCambio(cambio + 1);
  };




  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ) &&
    (!startDate || new Date(row.fecha) >= new Date(startDate + 'T00:00:00')) &&
    (!endDate || new Date(row.fecha) <= new Date(endDate + 'T23:59:59'))

  );

  const handleGenerarExcel = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const workbook = XLSX.utils.book_new();
      const currentDateTime = new Date().toLocaleString();

      // Datos para el archivo Excel
      const dataForExcel = filteredData.map((row, index) => ({
        'IdVenta': row.IdVenta,
        'Fecha': new Date(row.fecha).toLocaleDateString('es-ES'),
        'Cliente': row.Cliente,
        'ValorVenta':row.ValorVenta,
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['IdVenta', 'Cliente', 'ValorVenta'] });



      XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
      XLSX.writeFile(workbook, 'Lista_de_Ventas.xlsx');
    }
  };

    //IMPRIMIR PDF
    const handleGenerarReporte = () => {
      if (permisos[0].consultar==="n") {
        swal("No cuenta con los permisos para realizar esta accion","","error")
      } else {
        const formatDataForPDF = () => {
          const formattedData = filteredData.map((row) => {
            const fechaCre = new Date(row.fechaNacimiento);
            const fechaNacimiento = String(fechaCre.getDate()).padStart(2, '0') + "/" +
              String(fechaCre.getMonth()).padStart(2, '0') + "/" +
              fechaCre.getFullYear();
            return {
              'IdVenta': row.IdVenta,
              'Fecha': new Date(row.fecha).toLocaleDateString('es-ES'),
              'Cliente': row.Cliente,
              'ValorVenta': `L.${parseFloat(row.ValorVenta).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`,
            };
          });
          return formattedData;
        };
    
        const urlPDF = 'Reporte_Ventas.pdf';
        const subTitulo = "LISTA DE VENTAS"
        const orientation = "landscape";
    
        generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF);
      }
   
    };


  

  const columns = [
    { field: 'IdVenta', headerName: 'ID', width: 210 },
    {
      field: 'fecha', headerName: 'Fecha', width: 310,
      valueGetter: (params) => {
        const date = new Date(params.row.fecha);
        return date.toLocaleDateString('es-ES'); // Formato de fecha corto en español
      },
    },
    { field: 'Cliente', headerName: 'Cliente', width: 310 },
    {
      field: 'ValorVenta',
      headerName: 'Valor de la Venta',
      width: 310,
      renderCell: (params) => (
        <div>
          L.{parseFloat(params.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </div>
      ),
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 310,
      valueGetter: (params) => {
        return params.row.estado === 'A' ? 'Activo' : 'Inactivo';
      }
    },


    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 260,

      renderCell: params => (
        <div className="contActions1">
          <Button
            className="btnEdit"
            onClick={() => handleFactVenta(params.row.IdVenta)}
          >
            <Visibility></Visibility>
          </Button>

          <Button
            className="btnImprimirExp"

            onClick={() => handlePrintModal(params.row.IdVenta)}

          >

            <PictureAsPdfIcon></PictureAsPdfIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handlAnular(params.row.IdVenta)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>

        </div>
      ),


    },
  ];

  function handlAnular(id) {
    let data = {
      idUsuario: props.idUsuario,
      ventaId: id
    }
    axios.put(urlAnularVenta, data).then(() => {
      setCambio(cambio + 1)
      swal("Venta Anulada")
    })
  }

  const handlePrintModal = async (id) => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const informacionventa = await axios.post(urlVentaDetalle, { id: id })
      console.log(informacionventa.data);
      const documento = new jsPDF();
      documento.text(`---------------------MULTIOPTICAS, S.DE R.L. DE C.V.---------------------`, 20, 10);

      //documento.text(`Fecha: ${informacionventa.data[0].fecha}`, 20, 20);
      documento.text(`RTN:  08011998014780`, 20, 30);
      documento.text(`Cels: 95304100 // 99237123 `, 20, 40);
      documento.text(`Tegucigalpa, Honduras, C.A`, 20, 50);

      documento.text(`Cliente: ${informacionventa.data[0].cliente}`, 20, 80);
      documento.text(`RTN: ${informacionventa.data[0].RTN}`, 20, 90);
      documento.text(`Empleado: ${informacionventa.data[0].empleado}`, 20, 100);
      documento.text(`Fecha de Entrega: ${informacionventa.data[0].fecha}`, 20, 110);
      documento.text(`Promocion: ${informacionventa.data[0].promocion}`, 20, 120);
      documento.text(`Producto: ${informacionventa.data[0].aro}`, 20, 130);
      documento.text(`Garantia: ${informacionventa.data[0].garantia}`, 20, 140);

      documento.text(`Precio Aro: L.${informacionventa.data[0].precio.toFixed(2)}`, 20, 150);
      documento.text(`Precio Lente: L.${informacionventa.data[0].precLente.toFixed(2)}`, 20, 160);
      documento.text(`Cantidad: ${informacionventa.data[0].cantidad}`, 20, 170);
      documento.text(`Subtotal: L.${informacionventa.data[0].subtotal.toFixed(2)}`, 20, 180);
      documento.text(`Rebajas por promocion: L.${informacionventa.data[0].rebaja.toFixed(2)}`, 20, 190);
      documento.text(`Total a Pagar: L.${informacionventa.data[0].valorVenta.toFixed(2)}`, 20, 200);


      documento.save('ventadetalle_factura.pdf');
      //setinformacionventa.data[0]({})
    }

  };
  
  

  function formatearFecha(fecha) {
    const año = fecha.getUTCFullYear();
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getUTCDate().toString().padStart(2, '0');

    return `${año}-${mes}-${dia}`;
  }

  // ... código previo

//PANTALLA MODAL---------------------------------------------------------------------------
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
// ... código posterior





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
        }}>

        <div className='contDateDHH' >
          {/* <Button className="btnClearFilter" onClick={handleClearFilter}><DeleteForeverIcon></DeleteForeverIcon></Button> */}

          <span style={{ marginRight: '10px', fontFamily: 'inherit', fontWeight: 'bold' }}> DESDE: </span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Fecha de inicio"
            className='inputCustomF'
          ></input>

          <span style={{ marginLeft: '10px', marginRight: '10px', fontFamily: 'inherit', fontWeight: 'bold' }}> HASTA: </span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="Fecha de fin"
            className='inputCustomF'
          ></input>


          <Button className="btnClearFilter" onClick={handleClearFilter}><HighlightOffTwoToneIcon style={{ fontSize: '3rem' }}></HighlightOffTwoToneIcon></Button>

        </div>


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
                  swal("No tiene permisos para realizar esta accion", "", "error")
                } else {
                  navegate('/menuVentas/NuevaVenta');
                }
              }}> <AddIcon style={{ marginRight: '3px' }} />Nuevo
            </Button>

            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '5px' }} />  Generar Excel
            </Button>

            <Button className="btnReport"
              onClick={handleGenerarReporte}  >
              <PictureAsPdfIcon style={{ marginRight: '3px' }} /> Generar PDF
            </Button>

          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdVenta}
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