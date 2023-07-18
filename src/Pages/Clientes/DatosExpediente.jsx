import React from 'react';
import Button from '@mui/material/Button';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import swal from '@sweetalert/with-react';

//Mui-Material-Icons
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

//Styles
import '../../Styles/Usuarios.css';

//Components
import { TextCustom } from '../../Components/TextCustom.jsx';
import { DataGrid, esES } from '@mui/x-data-grid';

const urlCompra = 'http://localhost/APIS-Multioptica/compra/controller/compra.php?op=InsertCompra';
const urlCompraDetalle = 'http://localhost/APIS-Multioptica/compra/controller/compra.php?op=InsertCompraDetalle';
const urlProducto = "http://localhost/APIS-Multioptica/producto/controller/producto.php?op=Productos";
const urlProveedor = "http://localhost/APIS-Multioptica/proveedor/controller/proveedor.php?op=proveedores";
const urlUpdInventario = "http://localhost/APIS-Multioptica/inventario/controller/inventario.php?op=uInventario"
const urlKardex ="http://localhost/APIS-Multioptica/Kardex/Controller/kardex.php?op=InsertKardex"

export const DatosExpediente = ({
  msgError = '',
  success = false,
  warning = false,
  idUsuario,
}) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [total, setTotal] = useState(0)
  const [producto, setProducto] = useState([]);
  const [proveedor, setProveedor] = useState([]);
  const [cantidad, setCantidad] = useState(0);
  const [costo, setCosto] = useState(0);
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().slice(0, 10));
  const [compras,setCompras] = useState([])
  const [cambio,setCambio]=useState(0)


  const [leyenda, setleyenda] = React.useState('');
  const [errorcantidad, setErrorcantidad] = React.useState(false);
  const [cantid, setcantid] = React.useState(false);

  const [aviso, setaviso] = React.useState('');
  const [errorcocompra, setErrorcoscompra] = React.useState(false);
  const [cosCompra, setcosCompra] = React.useState(false);

  const [cantidadc, setcantidadc] = useState(0);
  const [costoc, setcostoc] = useState(0);



  useEffect(() => {
    // fetch()
    //   .then(response => response.json())
    //   .then(data => setTableData(data));
    fetch(urlProducto)
      .then(response => response.json())
      .then(data => setProducto(data));
    fetch(urlProveedor)
      .then(response => response.json())
      .then(data => setProveedor(data));
  }, []);

  useEffect(()=>{
    console.log(compras);
    setTableData(compras)
  },[cambio])

  useEffect(() => {
    setTotal(cantidad * costo);
  }, [cantidad, costo]);

  const navegate = useNavigate();

  const AggDataGrid = () => {
    let dataGrid = {
      Producto:parseInt(document.getElementById("producto").value),
      Proveedor:parseInt(document.getElementById("proveedor").value),
      Cantidad:cantidad,
      Fecha:fechaActual,
      Costo:costo,
      Total:total
    }

    setCambio(cambio+1)
    setCompras([...compras,dataGrid])

    
  }

  const handleBack = () => {
    navegate('/menuClientes');
  };

  const columns = [
    { field: 'Cliente', headerName: 'Cliente', width: 145},
    { field: 'Fecha de Consulta', headerName: 'Fecha de Consulta', width: 145 },
    { field: 'Doctor', headerName: 'Doctor', width: 145 },
    { field: 'Asesor de Ventas', headerName: 'Asesor de Ventas', width: 145 },
    
  ];

  var idCounter=0

  const generateRowId = () => {
    idCounter += 1;
    return idCounter;
  };

  const GuardarCompra = ()=>{

    const totalCompras = compras.reduce((accumulator, current) => {
      return accumulator + current.Total;
    }, 0);

    let dataCompra ={
      IdProveedor:compras[0].Proveedor,
      fechaCompra:compras[0].Fecha,
      totalCompra:totalCompras
    }
    
    if (sendData(urlCompra,dataCompra)) {
      for (let i = 0; i < compras.length; i++) {

       const dataInventario={
          cantidad:parseInt(compras[i].Cantidad),
          idProducto:compras[i].Producto,
          mes:new Date(compras[i].Fecha).getMonth()+1,
          anio:new Date(compras[i].Fecha).getFullYear()
        }

       const dataDetalle = {
        Cantidad:parseInt(compras[i].Cantidad),
        IdProducto:compras[i].Producto,
        CostoCompra: parseInt(compras[i].Costo)
       } 
       const dataKardex ={
        IdTipoMovimiento:1,
        IdProducto:compras[i].Producto,
        fechaYHora:compras[0].Fecha,
        cantidad:parseInt(compras[i].Cantidad),
        Id_Usuario:idUsuario
       }

       sendData(urlCompraDetalle,dataDetalle)
       sendData(urlUpdInventario,dataInventario)
       sendData(urlKardex,dataKardex)
      }
      swal("Compra registrada con exito","","success")
    }

  }

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Datos de Expediente</h2>
        <h3>
          Complete todos los puntos para poder registrar los datos Expediente.
        </h3>
      </div>
      <div className="infoAddCompra">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

          <div className="contInput">
              <TextCustom text="Cliente" className="titleInput" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Cliente"
                id="fecha"
                value={fechaActual}
                disabled
              />
            </div>

            <div className="contInput">
              <TextCustom text="Fecha de Creacion" className="titleInput" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha de Creacion"
                id="fecha"
                value={fechaActual}
                disabled
              />
            </div>
            <div className="contInput">
              <TextCustom text="Creado Por" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Creado Por"
                id="cantidad"
                onKeyDown={e => {
                  setcantid(e.target.value);
                  if (cantid === '' ) {
                    setErrorcantidad(true);
                    setleyenda('Los campos no deben estar vacios');
                  } else {
                    setErrorcantidad(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(cantid)) {
                      setErrorcantidad(true);
                      setleyenda('Solo deben de ingresar numeros');
                    } else {
                      setErrorcantidad(false);
                      setleyenda('');
                    }
                  }
                }}
                onClick={e => {
                  setcantid(e.target.value);
                  if (cantid === '') {
                    setErrorcantidad(true);
                    setleyenda('Los campos no deben estar vacios');
                  } else {
                    setErrorcantidad(false);
                    setleyenda('');
                  }
                }}
                 
              />
               <p class="error">{leyenda}</p>
            </div>


            <div className="contBtnStepper1">
              <Button
              onClick={AggDataGrid}
              
                variant="contained"
                className="btnStepper"
              >
                <h1>{'Finish' ? 'Agregar' : 'Finish'}</h1>
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>

        <div
          style={{
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
                className="btnCreate1"
                onClick={GuardarCompra}
              >
                <AddIcon style={{ marginRight: '5px' }} />
                Guardar
              </Button>
              <Button className="btnReport1" onClick={()=>{setCompras([]);setCambio(cambio+1)}}>
                Cancelar
              </Button>
            </div>
          </div>
          <DataGrid
            getRowId={generateRowId}
            rows={tableData}
            columns={columns}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </div>
  );
};