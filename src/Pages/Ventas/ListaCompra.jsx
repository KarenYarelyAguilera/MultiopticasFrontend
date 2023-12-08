import { DataGrid, esES } from '@mui/x-data-grid';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import React from 'react';

import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';
import axios from 'axios';
import fondoPDF from '../../IMG/FondoPDFH.jpg'

import { generatePDF } from '../../Components/generatePDF';
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
import * as XLSX from 'xlsx'
import AnalyticsIcon from '@mui/icons-material/Analytics'; //para el boton de excel 

import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

export const ListaCompra = (props) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const urlAnularCompra = "http://localhost:3000/api/compra/anular"
  const urlFacturaCompra = 'http://localhost:3000/api/facturaCompra'
  const dataPermiso = {
    idRol: props.idRol,
    idObj: 3
  }
  useEffect(() => {
    axios.post(urlPermisos, dataPermiso).then((response) => setPermisos(response.data))
  }, [])
  const urlCompras = 'http://localhost:3000/api/compra';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cambio, setCambio] = useState(0)
  const [proveedor, setProveedor] = useState(props.id.CiaProveedora || null)

  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

  /*   useEffect(() => {
      axios.post(urlFacturaCompra, props.id).then(response => {
        setTableData(response.data)
      }).catch(error => console.log(error))
    }, []); */

  useEffect(() => {
    fetch(urlCompras)
      .then(response => response.json())
      .then(data => setTableData(data));
  }, [cambio]);
  useEffect(() => {
    fetch(urlFacturaCompra)
      .then(response => response.json())
      .then(data => setTableData(data));
  }, [cambio]);

  /* useEffect(() => {
    axios.post(urlFacturaCompra, props.id).then(response => {
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, []); */

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
    (!startDate || new Date(row.fechaCompra) >= new Date(startDate + 'T00:00:00')) &&
    (!endDate || new Date(row.fechaCompra) <= new Date(endDate + 'T23:59:59'))
  );
  

  console.log('startDate:', startDate);
  console.log('endDate:', endDate);
  console.log('filteredData:', filteredData);

  // PANTALLA MODAL
  function handleModal(id) {
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

  const handleGenerarExcel = () => {
    const workbook = XLSX.utils.book_new();
    const currentDateTime = new Date().toLocaleString();

    // Datos para el archivo Excel
    const dataForExcel = filteredData.map((row, index) => ({
      'ID': row.IdCompra,
      'Fecha': new Date(row.fechaCompra).toLocaleDateString('es-ES'),
      //'Fecha':fechaCompra,
      'Total compra': row.totalCompra,

    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['ID', 'Fecha', 'Total compra',] });



    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
    XLSX.writeFile(workbook, 'Lista_de_Compras.xlsx');
  };


  const handleGenerarReporte = () => {
    if (permisos[0].consultar === "n") {
      swal("No cuenta con los permisos para realizar esta accion", "", "error")
    } else {
      const formatDataForPDF = () => {
        const formattedData = filteredData.map((row) => {
          const fechaCre = new Date(row.fechaCompra);
          const fechaCompra = String(fechaCre.getDate()).padStart(2, '0') + "/" +
            String(fechaCre.getMonth()).padStart(2, '0') + "/" +
            fechaCre.getFullYear();
          return {
            'ID': row.IdCompra,
            'Fecha': fechaCompra,
            'Total compra': row.totalCompra,
          };
        });
        return formattedData;
      };

      const urlPDF = 'Reporte_Compras.pdf';
      const subTitulo = "LISTA DE COMPRAS"



      //generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation);

      const orientation = "landscape";


    }

  };


  const columns = [
    { field: 'IdCompra', headerName: 'ID Compra', width: 100 },
    {
      field: 'fechaCompra',
      headerName: 'Fecha de Compra',
      width: 200,
      headerAlign: 'center',
      renderCell: (params) => (
        <span>
          {new Date(params.value).toLocaleDateString('es-ES')}
        </span>
      ),
    },
    //{ field: 'fechaCompra', headerName: 'Fecha', width: 380 },
    { field: 'totalCompra', headerName: 'Total', width: 200, renderCell: (params) => (
      <div>
        L.{parseFloat(params.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
      </div>
    ), },
    {
      field: 'Estado',
      headerName: 'Estado',
      width: 310,
      valueGetter: (params) => {
        return params.row.estado === 'A' ? 'Activo' : 'Inactivo';
      }
    },
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 380,

      renderCell: params => (
        <div className="contActions1">
          <Button
            className="btnEdit"
            onClick={() => handleButtonClick(params.row.id)}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handlAnular(params.row.IdCompra)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>

          <Button
            className="btnAddExpe"
            onClick={() => handleModal(params.row.IdCompra)}
          >
            <Visibility></Visibility>
          </Button>


        </div>
      ),
    },
  ];

  function handleButtonClick(id) {
    swal("No es posible realizar esta accion", "", "error")
  }



  function handlAnular(id) {
    alert(props.idUsuario)


    let data = {
      idUsuario: props.idUsuario,
      compraId: id
    }
    axios.put(urlAnularCompra, data).then(() => {
      setCambio(cambio + 1)
      swal("Compra Anulada")
    })
  }
  const handleBack = () => {
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Compras</h2>

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


        <div className="contFilter2">
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
          <div className="btnActionsNewReport2">
            <Button
              className="btnCreate"
              onClick={() => {
                if (permisos[0].insertar === "n") {
                  swal("No cuenta con los permisos para realizar esta accion", "", "error")
                } else {
                  navegate('/menuCompras/NuevaCompra');
                }

              }}
            >
              <AddIcon style={{ marginRight: '3px' }} />
              Nuevo
            </Button>

            < Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '5px' }} />
              Generar Excel
            </Button>

            <Button className="btnReport"
              onClick={handleGenerarReporte}
            >
              <PictureAsPdfIcon style={{ marginRight: '3px' }} />
              Generar PDF
            </Button>
          </div>
        </div>
        <DataGrid
          pagination
          getRowId={tableData => tableData.IdCompra}
          rows={filteredData}
          autoHeight
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>
    </div>
  );
};