import { DataGrid, esES } from '@mui/x-data-grid';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';

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

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  // PANTALLA MODAL
  function handleModal(id) {
    // setModalData(id);
    console.log(id);

    swal(
      <div>
        <div className="logoModal">DATOS GENERALES</div>
        <div className="contEditModal">
          <div className="contInput">
            <label style={{ fontFamily: 'Montserrat', lineHeight: 1 }}><b>Fecha de Compra: {new Date(id.fechaCompra).toLocaleDateString('es-ES')}</b></label>
          </div>

          <div className="contInput">
            <label style={{ fontFamily: 'Montserrat', lineHeight: 1 }}><b>Proveedor: {id.precio}</b></label>
          </div>


          <h3>________________________________</h3>
          <table className="contTable">
            <thead>
              <tr>
                <th></th>
                <th><b>ARO</b></th>
                <th><b>CANTIDAD</b></th>
                <th><b>PRECIO</b></th>
                <th><b>COSTO</b></th>
              </tr>
            </thead>
        
          </table>


          <div className="contInput">
            <label style={{ fontFamily: 'Montserrat', lineHeight: 1 }}><b>Total compra: {id.totalCompra}</b></label>
          </div>
        </div>
      </div>
    ).then(async () => {
      // Puedes agregar lógica adicional aquí si es necesario
    });
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
    { field: 'totalCompra', headerName: 'Total', width: 200 },
    { field: 'Estado', headerName: 'Estado', width: 100 },
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
            onClick={() => handleModal(params.row)}
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


 // function handlAnular(id) {
   // alert(props.idUsuario)

  function handlAnular(id){

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
                if (permisos[0].insertar === "n") {
                  swal("No cuenta con los permisos para realizar esta accion", "", "error")
                } else {
                  navegate('/menuCompras/NuevaCompra');
                }

              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo
            </Button>
            <Button className="btnReport"
              onClick={handleGenerarReporte}
            >

              <Button className="btnExcel" onClick={handleGenerarExcel}>
                <AnalyticsIcon style={{ marginRight: '3px' }} />
                Generar Excel
              </Button>


              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
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