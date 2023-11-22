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
import { generatePDF } from '../../Components/generatePDF';
//URL
const urlNuevoExpediente = 'http://localhost:3000/api/Expediente/NuevoExpediente'
const urlEliminarExpediente = 'http://localhost:3000/api/Expediente/DeleteExpediente'
const urlExpediente = 'http://localhost:3000/api/Expediente'
const urlNuevoDiagnostico = 'http://localhost:3000/api/ExpedienteDetalle/NuevoExpedinteDetalle'
const urlDiagnosticos = 'http://localhost:3000/api/ExpedienteDetalle'

const urlClientes = 'http://localhost:3000/api/clientes';
//const urlEmployees='http://localhost:3000/api/empleado'
const urlEmployees =
  'http://localhost:3000/api/empleado';

export const DatosExpediente = (props) => {

  const [tableData, setTableData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().slice(0, 10));
  const [Empleado, setIdEmpleado] = useState([]);
  const [cambio, setCambio] = useState(0);

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
    { field: 'fechaConsulta', headerName: 'Fecha de Consulta', width: 250 },
    { field: 'Optometrista', headerName: 'Optometrista', width: 250 },
    { field: 'AsesorVenta', headerName: 'Asesor de Ventas', width: 250 },

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

    const pdfWidth = documento.internal.pageSize.getWidth(); // Obtener el ancho del PDF
    const imgWidth = 40; // Ancho deseado de la imagen
    const imgHeight = 15; // Alto deseado de la imagen
    const imgX = pdfWidth - imgWidth - 10; // Calcular la posición x de la imagen para que esté en el lado derecho
    const imgY = 20; // Posición y deseada de la imagen

    // Agregar la imagen de fondo primero
    documento.addImage(fondoPDF, 'JPG', 0, 0, documento.internal.pageSize.getWidth(), documento.internal.pageSize.getHeight());

    documento.setFont('helvetica', "bold");
    documento.setFontSize(20);
    documento.text("MultiOpticas", 80, 25);
    documento.setFontSize(10);
    documento.setFont('helvetica', "bold");
    documento.text(`HISTORIAL DE EXPEDIENTES`, 80, 30);
    documento.setFontSize(10);
    documento.setFont('helvetica', "bold");
    documento.text(`Fecha: ${fechaSinSlash}`, 10, 30);
    documento.addImage(logoImg, 'PNG', imgX, imgY, imgWidth, imgHeight); // Ajusta las coordenadas y el tamaño según tus necesidades

    documento.text(`Fecha de consulta: ${modalData.fechaConsulta}`, 20, 60);
    documento.text(`Optometrista: ${modalData.Optometrista}`, 20, 70);
    documento.text(`Asesor de ventas: ${modalData.AsesorVenta}`, 20, 80);
    documento.text(`Fecha de expiracion: ${modalData.fechaExpiracion}`, 20, 90);
    documento.text(`Antecedentes clinicos: ${modalData.Antecedentes}`, 20, 100);
    documento.text(`Esfera Ojo Derecho: ${modalData.ODEsfera}`, 20, 110);
    documento.text(`Esfera Ojo Izquierdo: ${modalData.OIEsfera}`, 20, 120);
    documento.text(`Cilindro Ojo Derecho: ${modalData.ODCilindro}`, 20, 130);
    documento.text(`Cilindro Ojo Izquierdo: ${modalData.OICilindro}`, 20, 140);
    documento.text(`Eje Ojo Derecho: ${modalData.ODEje}`, 20, 150);
    documento.text(`Eje Ojo Izquierdo: ${modalData.OIEje}`, 20, 160);
    documento.text(`Adicion Ojo Derecho: ${modalData.ODAdicion}`, 20, 170);
    documento.text(`Adicion Ojo Izquierdo: ${modalData.OIAdicion}`, 20, 180);
    documento.text(`Altura Ojo Derecho: ${modalData.ODAltura}`, 20, 190);
    documento.text(`Altura Ojo Izquierdo: ${modalData.OIAltura}`, 20, 200);
    documento.text(`Distancia Pupilar Ojo Derecho: ${modalData.ODDistanciaPupilar}`, 20, 210);
    documento.text(`Distancia Pupilar Ojo Izquierdo: ${modalData.OIDistanciaPupilar}`, 20, 220);
    documento.text(`Enfermedad presentada: ${modalData.diagnostico}`, 20, 230);

    documento.save('historial_expediente.pdf');
    //setModalData({})
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
  function handleUpdt(id) {
    //setModalData(id);
    console.log(id);
    swal(
      <div>
        <div className="logoModal">DATOS GENERALES</div>
        <div className="contEditModal">
          <div className="contInput">
            <label><b>Fecha de consulta:{id.fechaConsulta}</b></label>
          </div>

          <div className="contInput">
            <label><b>Optometrista:{id.Optometrista}</b></label>
          </div>
          <div className="contInput">
            <label><b>Asesor de venta:{id.AsesorVenta}</b></label>
          </div>
          <div className="contInput">
            <label><b>Fecha de expiracion:{id.fechaExpiracion}</b></label>
          </div>
          <div className="contInput">
            <label><b>Antecedentes clinicos:{id.Antecedentes}</b></label>
          </div>
          <h3>
            ----------------DIAGNOSTICO-----------------
          </h3>
          <div className="contInput">
            <label><b>Esfera Ojo Derecho:{id.ODEsfera}</b></label>
          </div>
          <div className="contInput">
            <label><b>Esfera Ojo Izquierdo:{id.OIEsfera}</b></label>
          </div>

          <div className="contInput">
            <label><b>Cilindro Ojo Derecho:{id.ODCilindro}</b></label>
          </div>
          <div className="contInput">
            <label><b>Cilindro Ojo Izquierdo:{id.OICilindro}</b></label>
          </div>
          <div className="contInput">
            <label><b>Eje Ojo Derecho:{id.ODEje}</b></label>
          </div>
          <div className="contInput">
            <label><b>Eje Ojo Izquierdo:{id.OIEje}</b></label>
          </div>
          <div className="contInput">
            <label><b>Adicion Ojo Derecho:{id.ODAdicion}</b></label>
          </div>

          <div className="contInput">
            <label><b>Adicion Ojo Izquierdo:{id.OIAdicion}</b></label>
          </div>

          <div className="contInput">
            <label><b>Altura Ojo Derecho:{id.ODAltura}</b></label>
          </div>

          <div className="contInput">
            <label><b>Altura Ojo Izquierdo:{id.OIAltura}</b></label>
          </div>

          <div className="contInput">
            <label><b>Distancia Pupilar Ojo Derecho:{id.ODDistanciaPupilar}</b></label>
          </div>

          <div className="contInput">
            <label><b>Distancia Pupilar Ojo Izquierdo:{id.OIDistanciaPupilar}</b></label>
          </div>

          <div className="contInput">
            <label><b>Enfermedad Presentada:{id.diagnostico}</b></label>
          </div>

        </div>
      </div>,
    ).then(async () => {
    });

  }



  //Insertar un nuevo expediente

  const handleNext = async () => {
    let Cliente = document.getElementById('cliente').value;
    let Empleado = document.getElementById('empleado').value;
    let fechaCreacion = document.getElementById('fecha').value;

    let fecha = new Date(fechaCreacion)

    let anio = fecha.getFullYear().toString();
    let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    let dia = fecha.getDate().toString().padStart(2, "0");

    let fechaFormateada = anio + "/" + mes + "/" + dia;

    let data = {
      IdCliente: Cliente,
      fechaCreacion: fechaFormateada,
      IdEmpleado: Empleado,
    }

    await axios.post(urlNuevoExpediente, data).then(response => {
      let data = { IdExpediente: response.data.id }
      props.dataa(data)
      //console.log(response.data.id)
      swal('Expediente creado con exito', '', 'success').then(result => {
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
        <h3>Complete todos los datos para poder crear el expediente.</h3>
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
            <div className="contInput">
              <TextCustom text="Empleado" className="titleInput1" />

              <select id="empleado"
                value={props.datosclientes.IdEmpleado}
                className="selectCustom">

                {Empleado.length ? (
                  Empleado.map(pre => (
                    <option key={pre.IdEmpleado} value={pre.IdEmpleado}>
                      {pre.nombre}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>

                )}
              </select>

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
                onClick={() => {
                  navegate('/menuClientes/DetalleExpediente');
                }}
                variant="contained" className="btnStepper">
                <h1>{'Finish' ? 'Agregar' : 'Finish'}</h1>
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
                onClick={handleNext} //INSERTA 
                className="btnCreate1">
                <AddIcon style={{ marginRight: '5px' }} />
                Guardar
              </Button>
              <Button className="btnReport1" onClick={() => { }}>
                Cancelar
              </Button>
            </div>
          </div>
          <DataGrid
            rows={tableData}
            columns={columns}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.IdExpedienteDetalle}
          />
        </div>
      </div>
    </div>
  );
};