import React from 'react';
import Button from '@mui/material/Button';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import ReactModal from 'react-modal';
import jsPDF from 'jspdf';



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

export const ListaVenta = (props) => {
  const [permisos, setPermisos] = useState([]);

  const urlVentas = 'http://localhost:3000/api/Ventas';
  const urlVentaDetalle = 'http://localhost:3000/api/VentaDetalle'
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const [tableData, setTableData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(()=>{
    axios.post(urlPermisos,dataPermiso).then((response)=>setPermisos(response.data))
  },[])

  useEffect(() => {
    console.log(props.id);
    console.log(props.datosventa.id);
    setTableData([]);
    fetch(urlVentas)
      .then(response => response.json())
      .then(data => setTableData(data));
  }, []);
  //VENTA DETALLE
  useEffect(() => {
    axios.post(urlVentaDetalle, props.id).then(response => {
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, []);

  const dataPermiso={
    idRol:props.idRol,
    idObj:9
  }


  

  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [
    { field: 'IdVenta', headerName: 'IdVenta', width: 210 },
    { field: 'fecha', headerName: 'Fecha', width: 310 },
    { field: 'Cliente', headerName: 'Cliente', width: 310 },
    { field: 'ValorVenta', headerName: 'Valor de la Venta', width: 310 },


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

            onClick={()=> handlePrintModal(params.row)}

          >

            <PictureAsPdfIcon></PictureAsPdfIcon>
          </Button>

        </div>
      ),


    },
  ];

  const handlePrintModal = async (id) => {
    const informacionventa = await axios.post(urlVentaDetalle,{id:id})
    const documento = new jsPDF();
    documento.text(`                       MULTIOPTICAS, S.DE R.L. DE C.V.`, 20, 10);
   
    documento.text(`Fecha: ${informacionventa.data[0].fecha}`, 20, 20);
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

    documento.text(`Producto: ${informacionventa.data[0].Producto}`, 20, 200);
    documento.text(`Garantia: ${informacionventa.data[0].Garantia}`, 20, 210);
    documento.text(`Meses: ${informacionventa.data[0].Meses}`, 20, 220);
    documento.text(`Cantidad: ${informacionventa.data[0].cantidad}`, 20, 230);

    documento.text(`Precio Aro: ${informacionventa.data[0].precioAro}`, 20, 250);
    documento.text(`Precio Lente: ${informacionventa.data[0].precioLente}`, 20, 260);
    documento.text(`Subtotal: ${informacionventa.data[0].subtotal}`, 20, 270);
    documento.text(`Rebajas: ${informacionventa.data[0].rebaja}`, 20, 280);
    documento.text(`Total a Pagar: ${informacionventa.data[0].totalVenta}`, 20, 290); 
   

    documento.save('ventadetalle_factura.pdf');
    //setinformacionventa.data[0]({})
  };

  //PANTALLA MODAL---------------------------------------------------------------------------
  async function  handleUpdt (id) {
    //setinformacionventa.data[0](id);
    console.log(id);

    const informacionventa = await axios.post(urlVentaDetalle,{id:id})

    swal(
      <div>
        <div className="logoModal">DATOS DE LA VENTA</div>
        <div className="contEditModal">
          <div className="contInput">
            <label><b>Venta#{informacionventa.data[0].IdVenta}</b></label>
            <label><b>Fecha:{informacionventa.data[0].fecha}</b></label>
            <label><b>RTN: 08019020229809 </b></label>
            <label><b>NumeroCAI:{informacionventa.data[0].NumeroCAI}</b></label>
            <label><b>Direccion:{informacionventa.data[0].direccion}</b></label>
            <label><b>Cels: 95304100 // 99237123 </b></label>
            <label><b>Email: multioptica9@gmail.com </b></label>
            <label><b>Barrio El Centro, Calle Peatonal, Frente a Lady lee </b></label>
            <label><b>Tegucigalpa, Honduras, C.A </b></label>
          </div>
          <div className="contInput">
            <label><b>Cliente:{informacionventa.data[0].Cliente}</b></label>
            <label><b>RTN:{informacionventa.data[0].RTN}</b></label>
            <label><b>Empleado: {informacionventa.data[0].Empleado}  </b></label>
            <label><b>Fecha de Entrega:{informacionventa.data[0].fechaEntrega}</b></label>
            <label><b>Fecha Limite Entrega:{informacionventa.data[0].fechaLimiteEntrega}</b></label>
          </div>
          <div className="contInput">
            <label><b>Tipo de Pago:{informacionventa.data[0].TipoDePago}</b></label>
            <label><b>Promocion:{informacionventa.data[0].Promocion}</b></label>
          </div>
          <div className="contInput">
            <label><b>Producto:{informacionventa.data[0].Producto}</b></label>
            <label><b>Garantia:{informacionventa.data[0].Garantia}</b></label>
            <label><b>Meses:{informacionventa.data[0].Meses}</b></label>
            <label><b>Cantidad:{informacionventa.data[0].cantidad}</b></label>
          </div>
          <div className="contInput">
            <label><b>Precio Aro:{informacionventa.data[0].precioAro}</b></label>
            <label><b>Precio Lente:{informacionventa.data[0].precioLente}</b></label>
            <label><b>Subtotal: {informacionventa.data[0].subtotal}  </b></label>
            <label><b>Rebajas:{informacionventa.data[0].rebaja}</b></label>
            <label><b>Total a pagar:{informacionventa.data[0].totalVenta}</b></label>
          </div>      

        </div>
      </div>,
    ).then(async () => {
    });

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
                if (permisos[0].insertar==="n") {
                  swal("No tiene permisos para realizar esta accion","","error")
                } else {
                  navegate('/menuVentas/NuevaVenta');
                  
                }
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nueva Venta
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdVenta}
          rows={filteredData}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};