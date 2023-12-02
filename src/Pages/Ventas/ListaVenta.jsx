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



import swal from '@sweetalert/with-react';

//Mui-Material-Icons


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
        //'Fecha': row.fecha,
        'Cliente': row.Cliente,
        'ValorVenta': row.ValorVenta,
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['IdVenta', 'Cliente', 'ValorVenta'] });



      XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
      XLSX.writeFile(workbook, 'Lista_de_Ventas.xlsx');
    }
  };


  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const formatDataForPDF = () => {
        const formattedData = filteredData.map((row) => {
          const fechaCre = new Date(row.fechaYHora);
          const fechaYHora = String(fechaCre.getDate()).padStart(2, '0') + "/" +
            String(fechaCre.getMonth()).padStart(2, '0') + "/" +
            fechaCre.getFullYear();
          return {
            'IdVenta': row.IdVenta,
            //'Fecha': row.fecha,
            'Cliente': row.Cliente,
            'ValorVenta': row.ValorVenta,

          };
        });
        return formattedData;
      };

      const urlPDF = 'Reporte_ventas.pdf';
      const subTitulo = "LISTA DE VENTAS"

      generatePDF(formatDataForPDF, urlPDF, subTitulo);
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
    { field: 'ValorVenta', headerName: 'Valor de la Venta', width: 310 },
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
            onClick={() => handleUpdt(params.row.IdVenta)}
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
      const documento = new jsPDF();
      documento.text(`---------------------MULTIOPTICAS, S.DE R.L. DE C.V.---------------------`, 20, 10);

      //documento.text(`Fecha: ${informacionventa.data[0].fecha}`, 20, 20);
      documento.text(`RTN:  08011998014780`, 20, 30);
      documento.text(`NumeroCAI: ${informacionventa.data[0].NumeroCAI}`, 20, 40);
      documento.text(`Direccion: ${informacionventa.data[0].direccion}`, 20, 50);
      documento.text(`Cels: 95304100 // 99237123 `, 20, 60);
      documento.text(`Email: multioptica9@gmail.com`, 20, 70);
      documento.text(`Barrio El Centro, Calle Peatonal, Frente a Lady lee`, 20, 80);
      documento.text(`Tegucigalpa, Honduras, C.A`, 20, 90);

      documento.text(`Cliente: ${informacionventa.data[0].Cliente}`, 20, 110);
      documento.text(`RTN: ${informacionventa.data[0].RTN}`, 20, 120);
      documento.text(`Empleado: ${informacionventa.data[0].Empleado}`, 20, 130);
      documento.text(`Fecha de Entrega: ${informacionventa.data[0].fechaEntrega}`, 20, 140);
      documento.text(`Fecha Limite Entrega: ${informacionventa.data[0].fechaLimiteEntrega}`, 20, 150);
      documento.text(`Tipo de Pago: ${informacionventa.data[0].TipoDePago}`, 20, 170);
      documento.text(`Promocion: ${informacionventa.data[0].Promocion}`, 20, 180);
      documento.text(`Producto: ${informacionventa.data[0].Producto}`, 20, 190);
      documento.text(`Garantia: ${informacionventa.data[0].Garantia}`, 20, 200);
      documento.text(`Meses: ${informacionventa.data[0].Meses}`, 20, 210);


      documento.text(`Precio Aro: ${informacionventa.data[0].precioAro}`, 20, 230);
      documento.text(`Precio Lente: ${informacionventa.data[0].precioLente}`, 20, 260);
      documento.text(`Cantidad: ${informacionventa.data[0].cantidad}`, 20, 270);
      documento.text(`Subtotal: ${informacionventa.data[0].subtotal}`, 20, 280);
      documento.text(`Rebajas por promocion: ${informacionventa.data[0].rebaja}`, 20, 290);
      documento.text(`Total a Pagar: ${informacionventa.data[0].totalVenta}`, 20, 300);


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
  //PANTALLA MODAL---------------------------------------------------------------------------
  async function handleUpdt(id) {

    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      console.log(id);
      axios.post(urlVentaDetalle, { id: id }).then((detalle) => {
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



    }
    //setinformacionventa.data[0](id);


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