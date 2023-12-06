import React from 'react';
import Button from '@mui/material/Button';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import ReactModal from 'react-modal';
import jsPDF from 'jspdf';
import fondoPDF from "../../IMG/fondoPDF.jpg";
import logoImg from "../../IMG/MultiopticaBlanco.png";
import 'jspdf-autotable';



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
import { Bitacora } from '../../Components/bitacora';
import { TextCustom } from '../../Components/TextCustom.jsx';
import { DataGrid, esES } from '@mui/x-data-grid';
import { generatePDF } from '../../Components/generatePDF';
//URL
const urlNuevoExpediente = 'http://194.163.45.55:4000/api/Expediente/NuevoExpediente'
const urlEliminarExpediente = 'http://194.163.45.55:4000/api/Expediente/DeleteExpediente'
const urlExpediente = 'http://194.163.45.55:4000/api/Expediente'
const urlNuevoDiagnostico = 'http://194.163.45.55:4000/api/ExpedienteDetalle/NuevoExpedinteDetalle'
const urlDiagnosticos = 'http://194.163.45.55:4000/api/ExpedienteDetalle'

const urlClientes = 'http://194.163.45.55:4000/api/clientes';
//const urlEmployees='http://194.163.45.55:4000/api/empleado'
const urlEmployees =
  'http://194.163.45.55:4000/api/empleados';

const urlBitacoraInsertExpe = 'http://194.163.45.55:4000/api/bitacora/expediente';


export const DatosExpediente = (props) => {

  const [tableData, setTableData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().slice(0, 10));
  const [Empleado, setIdEmpleado] = useState([]);
  const [cambio, setCambio] = useState(0);
  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado
  
  

  useEffect(() => {
    console.log(props.id.idCliente);
    console.log(props.datosclientes.idCliente);
    setTableData([]);
    axios.get(urlEmployees).then(response => {
      setIdEmpleado(response.data)
    }).catch(error => console.log(error))
  }, []);

  // const [modalData, setModalData] = useState({});

  //DIAGNOSTICO
  useEffect(() => {
    axios.post(urlDiagnosticos, props.id).then(response => {
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, []);

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );



  const handleBack = () => {
    props.dataa({})
    props.datosclientess({})
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de expediente ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        navegate('/menuClientes/ListaExpedientes');
      } else {
      }
    });
  };

  const navegate = useNavigate();

  const columns = [
    { 
      field: 'fechaConsulta', 
      headerName: 'Fecha de Consulta', 
      width: 250,
      headerAlign: 'center',
      renderCell: (params) => (
          <span>
              {new Date(params.value).toLocaleDateString('es-ES')}
          </span>
      ),
  },
    { field: 'Optometrista', headerName: 'Optometrista', width: 250,  headerAlign: 'center', },
    { field: 'AsesorVenta', headerName: 'Asesor de Ventas', width: 250,  headerAlign: 'center', },

    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 260,

      renderCell: params => (
        <div className="contActions1">
          <Button
            className="btnEdit"
            onClick={() => handleUpdt(params.row)}
          >
            <Visibility></Visibility>
          </Button>

          <Button
            className="btnImprimirExp"
            onClick={() => handlePrintModal(params.row)}
          >
            <PictureAsPdfIcon></PictureAsPdfIcon>
          </Button>

        </div>
      ),
    },
  ];

  const handlePrintModal = (modalData) => {
    const documento = new jsPDF();
  
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
  
    const fechaSinSlash = dia + "/" + mes + "/" + año;
  
    const pdfWidth = documento.internal.pageSize.getWidth();
    const imgWidth = 40;
    const imgHeight = 15;
    const imgX = pdfWidth - imgWidth - 10;
    const imgY = 20;
  
    documento.addImage(fondoPDF, 'JPG', 0, 0, documento.internal.pageSize.getWidth(), documento.internal.pageSize.getHeight());
  
    documento.setFont('helvetica', 'bold');
    documento.setFontSize(20);
    documento.text('MultiOpticas', 80, 25);
    documento.setFontSize(10);
    documento.setFont('helvetica', 'bold');
    documento.text(`HISTORIAL DE EXPEDIENTES`, 80, 30);
    documento.setFontSize(10);
    documento.setFont('helvetica', 'bold');
    documento.text(`Fecha: ${fechaSinSlash}`, 10, 30);
    documento.addImage(logoImg, 'PNG', imgX, imgY, imgWidth, imgHeight);

    function formatearFecha(fecha) {
      const opciones = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(fecha).toLocaleDateString('es-ES', opciones);
  }
  
    //Datos de la tabla
    documento.text(`FECHA DE CONSULTA: ${formatearFecha(modalData.fechaConsulta)}`, 20, 50);
    documento.text(`OPTOMETRISTA: ${modalData.Optometrista}`, 20, 60);
    documento.text(`ASESOR DE VENTAS: ${modalData.AsesorVenta}`, 20, 70);
    documento.text(`FECHA DE EXPIRACIÓN: ${formatearFecha(modalData.fechaExpiracion)}`, 20, 80);
    documento.text(`ANTECENDENTES CLINICOS: ${modalData.Antecedentes}`, 20, 90);
  
    // Tabla de diagnostico xd
    const tableData = [
      ['DESCRIPCIÓN', 'OJO IZQUIERDO', 'OJO DERECHO'],
      ['Esfera', modalData.OIEsfera, modalData.ODEsfera],
      ['Cilindro', modalData.OICilindro, modalData.ODCilindro],
      ['Eje', modalData.OIEje, modalData.ODEje],
      ['Adición', modalData.OIAdicion, modalData.ODAdicion],
      ['Altura', modalData.OIAltura, modalData.ODAltura],
      ['Dist. Pupilar', modalData.OIDistanciaPupilar, modalData.ODDistanciaPupilar],
    
    ];
  
    const startY = 110;
    const margin = 20;
    const tableStyles = {
      startY,
      margin: { top: margin, right: margin, bottom: margin, left: margin },
    };
   
    //Estilos
  
    const tableColumnStyles = {
      0: { fontStyle: 'bold' }, 
      1: { fontStyle: 'normal' },
      2: { fontStyle: 'normal' }, 
    };
  
    
    documento.autoTable({ head: tableData.slice(0, 1), body: tableData.slice(1), ...tableStyles, columnStyles: tableColumnStyles });
  
  
    documento.save('historial_expediente.pdf');
  };
 
  
  // const handleGenerarReporte = (modalData) => {
  //   const formatDataForPDF = () => {
  //     const documento = new jsPDF();
  //   documento.text(`Fecha de consulta: ${modalData.fechaConsulta}`, 20, 20);
  //   documento.text(`Optometrista: ${modalData.Optometrista}`, 20, 30);
  //   documento.text(`Asesor de ventas: ${modalData.AsesorVenta}`, 20, 40);
  //   documento.text(`Fecha de expiracion: ${modalData.fechaExpiracion}`, 20, 60);
  //   documento.text(`Antecedentes clinicos: ${modalData.Antecedentes}`, 20, 70);
  //   documento.text(`Esfera Ojo Derecho: ${modalData.ODEsfera}`, 20, 80);
  //   documento.text(`Esfera Ojo Izquierdo: ${modalData.OIEsfera}`, 20, 90);
  //   documento.text(`Cilindro Ojo Derecho: ${modalData.ODCilindro}`, 20, 100);
  //   documento.text(`Cilindro Ojo Izquierdo: ${modalData.OICilindro}`, 20, 110);
  //   documento.text(`Eje Ojo Derecho: ${modalData.ODEje}`, 20, 120);
  //   documento.text(`Eje Ojo Izquierdo: ${modalData.OIEje}`, 20, 130);
  //   documento.text(`Adicion Ojo Derecho: ${modalData.ODAdicion}`, 20, 140);
  //   documento.text(`Adicion Ojo Izquierdo: ${modalData.OIAdicion}`, 20, 150);
  //   documento.text(`Altura Ojo Derecho: ${modalData.ODAltura}`, 20, 160);
  //   documento.text(`Altura Ojo Izquierdo: ${modalData.OIAltura}`, 20, 170);
  //   documento.text(`Distancia Pupilar Ojo Derecho: ${modalData.ODDistanciaPupilar}`, 20, 180);
  //   documento.text(`Distancia Pupilar Ojo Izquierdo: ${modalData.OIDistanciaPupilar}`, 20, 190);
  //   documento.text(`Enfermedad presentada: ${modalData.diagnostico}`, 20, 200);
  //   };

  //   const urlPDF = 'Historial_Expedientes.pdf';
  //   const subTitulo = "HISTORIAL DE EXPEDIENTES"
  //   const orientation = "landscape";
  //   generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation);
  // };

  //PANTALLA MODAL---------------------------------------------------------------------------
 // PANTALLA MODAL
function handleUpdt(id) {
  // setModalData(id);
  console.log(id);
  
  swal(
    <div>
      <div className="logoModal">DATOS GENERALES</div>
      <div className="contEditModal">
        <div className="contInput">
          <label style={{ fontFamily: 'Montserrat', lineHeight: 1 }}><b>Fecha de consulta: {new Date(id.fechaConsulta).toLocaleDateString('es-ES')}</b></label>
        </div>

        <div className="contInput">
          <label style={{ fontFamily: 'Montserrat', lineHeight: 1 }}><b>Optometrista: {id.Optometrista}</b></label>
        </div>
        <div className="contInput">
          <label style={{ fontFamily: 'Montserrat', lineHeight: 1 }}><b>Asesor de venta: {id.AsesorVenta}</b></label>
        </div>
        <div className="contInput">
        <label style={{ fontFamily: 'Montserrat', lineHeight: 1 }}><b>Fecha de expiración: {new Date(id.fechaExpiracion).toLocaleDateString('es-ES')}</b></label>
        </div>
        <div className="contInput">
          <label style={{ fontFamily: 'Montserrat', lineHeight: 1 }}><b>Antecedentes clinicos: {id.Antecedentes}</b></label>
        </div>

        <h3>----------------DIAGNOSTICO-----------------</h3>
        <table className="contTable">
          <thead>
            <tr>
              <th></th>
              <th><b>OJO IZQUIERDO</b></th>
              <th><b>OJO DERECHO</b></th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Esfera</td>
              <td>{id.OIEsfera}</td>
              <td>{id.ODEsfera}</td>
            </tr>
            <tr>
              <td>Cilindro</td>
              <td>{id.OICilindro}</td>
              <td>{id.ODCilindro}</td>
            </tr>
            <tr>
              <td>Eje</td>
              <td>{id.OIEje}</td>
              <td>{id.ODEje}</td>
            </tr>
            <tr>
              <td>Adición</td>
              <td>{id.OIAdicion}</td>
              <td>{id.ODAdicion}</td>
            </tr>
            <tr>
              <td>Altura</td>
              <td>{id.OIAltura}</td>
              <td>{id.ODAltura}</td>
            </tr>
            <tr>
              <td>Dist. Pupilar</td>
              <td>{id.OIDistanciaPupilar}</td>
              <td>{id.ODDistanciaPupilar}</td>
            </tr>
          </tbody>
        </table>


        <div className="contInput">
          <label style={{ fontFamily: 'Montserrat', lineHeight: 1 }}><b>Enfermedad Presentada: {id.diagnostico}</b></label>
        </div>
      </div>
    </div>
  ).then(async () => {
    // Puedes agregar lógica adicional aquí si es necesario
  });
}




  //Insertar un nuevo expediente

  const handleNext = async () => {
    let Cliente = document.getElementById('cliente').value;
    let fechaCreacion = document.getElementById('fecha').value;

    let fecha = new Date(fechaCreacion)

    let anio = fecha.getFullYear().toString();
    let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    let dia = fecha.getDate().toString().padStart(2, "0");

    let fechaFormateada = anio + "/" + mes + "/" + dia;

    let data = {
      IdCliente: Cliente,
      fechaCreacion: fechaFormateada,
      IdEmpleado: props.idEmpleado,
    }
    //Bitacora
    let dataB = {
      Id: props.idUsuario
    }
    const bitacora = {
      urlB: urlBitacoraInsertExpe,
      activo: props.activo,
      dataB: dataB
    }

    await axios.post(urlNuevoExpediente, data).then(response => {
      let data = { IdExpediente: response.data.id }
      console.log(response.data.id);
      props.dataa(data)
      //console.log(response.data.id)
      swal('Expediente creado con exito', '', 'success').then(result => {
       Bitacora(bitacora)
        navegate('/menuClientes/DetalleExpediente');
      });

    }).catch(error => {
      console.log(error);
      swal("Error al registrar expediente.", "", "error")
    })

  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Datos de Expediente</h2>
      </div>
      <div className="infoAddCompra1">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Cliente" className="titleInput1" />
              <input
                type="text"
                name="input1"
                className="inputCustom"
                maxLength={15}
                placeholder="Cliente"
                variant="standard"
                id="cliente"
                label="Usuario"
                value={props.id.idCliente || props.datosclientes.idCliente}
                disabled
              />
            </div>
            <div className="contInput">
              <TextCustom text="Fecha de Creacion" className="titleInput1" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha de Creacion"
                id="fecha"
                value={fechaActual}
                onChange={(e) => setFechaActual(e.target.value)}
                disabled
              />
            </div>
            
            {/* <div className="contInput">
              <TextCustom text="Creado Por" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Creado Por"
                id="empleado"
                value={props.datosclientes.IdEmpleado}
                onKeyDown={(e) => {}}
                onClick={(e) => {}}
              />
              <p class="error"></p>
            </div> */}
            <div className="contBtnStepper1" style={{paddingLeft: '115px'}}>
            <Button
                onClick={handleNext} //INSERTA 
                className="btnStepperAgregar"
                >  
                <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{
            width: '135%',
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
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="btnActionsNewReport">
            <Button
                onClick={() => {
                  navegate('/menuClientes/DetalleExpediente');
                }}
                className="btnAgregar1">
                <AddIcon style={{ marginRight: '5px' }} />
                Agregar
              </Button>
              <Button className="btnReport1" onClick={() => { }}>
                Cancelar
              </Button>
            </div>
          </div>
          <DataGrid
           pagination 
            rows={filteredData}
            columns={columns}
            autoHeight
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 50]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            getRowId={(row) => row.IdExpedienteDetalle}
          />
        </div>
      </div>
    </div>
  );
};