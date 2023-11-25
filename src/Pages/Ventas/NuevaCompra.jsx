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
import EditIcon from '@mui/icons-material/Edit';

//Styles
import '../../Styles/Usuarios.css';

//Components
import { TextCustom } from '../../Components/TextCustom.jsx';
import { DataGrid, esES } from '@mui/x-data-grid';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const urlCompra = 'http://localhost:3000/api/compra/NuevaCompra';
const urlProducto = "http://localhost:3000/api/productos";
const urlProveedor = "http://localhost:3000/api/proveedor";
const urlInsertCompraB = 'http://localhost:3000/api/bitacora/insertcompra';

export const NuevaCompra = ({
  msgError = '',
  success = false,
  warning = false,
  props,
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
  const [compras, setCompras] = useState([])
  const [cambio, setCambio] = useState(0)


  const [leyenda, setleyenda] = React.useState('');
  const [errorcantidad, setErrorcantidad] = React.useState(false);
  const [cantid, setcantid] = React.useState(false);

  const [aviso, setaviso] = React.useState('');
  const [errorcocompra, setErrorcoscompra] = React.useState(false);
  const [cosCompra, setcosCompra] = React.useState(false);

  const [cantidadc, setcantidadc] = useState(0);
  const [costoc, setcostoc] = useState(0);



  useEffect(() => {
    fetch(urlProducto)
      .then(response => response.json())
      .then(data => setProducto(data));
    fetch(urlProveedor)
      .then(response => response.json())
      .then(data => setProveedor(data));
  }, []);

  useEffect(() => {
    setTableData(compras)
  }, [cambio])

  useEffect(() => {
    setTotal(cantidad * costo);
  }, [cantidad, costo]);
  const navegate = useNavigate();
  const AggDataGrid = () => {
    const productoId = parseInt(document.getElementById("producto").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const costo = parseFloat(document.getElementById("costo").value);
  
    const existingIndex = compras.findIndex(item => item.idProducto === productoId);
    if (existingIndex !== -1) {
      const updatedCompras = [...compras];
      updatedCompras[existingIndex].cantidad += cantidad;
      updatedCompras[existingIndex].costo += costo;
      setCompras(updatedCompras);
    } else {
      const dataGrid = {
        idUsuario: idUsuario,
        idProducto: productoId,
        proveedor: document.getElementById("proveedor").options[document.getElementById("proveedor").selectedIndex].text,
        idProveedor:parseInt(document.getElementById("proveedor").value),
        producto:document.getElementById("producto").options[document.getElementById("producto").selectedIndex].text,
        cantidad: cantidad,
        fechaYHora: fechaActual,
        costo: costo,
      };
      console.log(dataGrid);
      setCompras([...compras, dataGrid]);
      setCambio(cambio + 1);
    }
  
  };

  const handleBack = () => {
    navegate('/menuInventario/listaCompra');
  };
  const eliminarCompra = (idProducto) => {
    const nuevasCompras = compras.filter(compra => compra.idProducto !== idProducto);
    setCompras(nuevasCompras);
    setCambio(cambio+1)
  };

  const columns = [
    { field: 'proveedor', headerName: 'Proveedor', width: 145 },
    { field: 'producto', headerName: 'Producto', width: 145 },
    { field: 'cantidad', headerName: 'Cantidad', width: 145 },
    { field: 'fechaYHora', headerName: 'Fecha', width: 145 },
    { field: 'costo', headerName: 'Costo de la Compra', width: 145 },
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 260,

      renderCell: params => (
        <div className="contActions1">
          <Button
            className="btnDelete"
            onClick={() => eliminarCompra(params.row.idProducto)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
          </div>)
    }
  ];

  var idCounter = 0

  const generateRowId = () => {
    idCounter += 1;
    return idCounter;
  };

  const GuardarCompra = async () => {
    let data = {
      "arrCompras": compras
    }

    //Funcion de bitacora 
    // let data2={
    //   Id:props.idUsuario
    // }

    console.log(data);
    await axios.post(urlCompra, data).then(() => {
      swal("Compra registrada con exito", "", "success")
      //axios.post(urlInsertCompraB,data2)
      navegate('/menuInventario/ListaCompra');
    })

  }
  const handleSelectChange = (event) => {
    const textoSeleccionado = event.target.options[event.target.selectedIndex].text;
    console.log('Texto seleccionado:', textoSeleccionado);
    // Aquí puedes hacer lo que desees con el texto seleccionado
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Nueva Compra</h2>
      </div>
      <div className="infoAddCompra1">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
          <div className="contInput">
              <TextCustom text="Fecha" className="titleInput1" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha"
                id="fecha"
                value={fechaActual}
                disabled
              />
            </div>
            <div className="contInput">
              <TextCustom text="Proveedor" className="titleInput1" />
              <select name="" className="selectCustom" id="proveedor" onChange={handleSelectChange}>
                {proveedor.length ? (
                  proveedor.map(pre => (
                    <option key={pre.IdProveedor} value={pre.IdProveedor}>
                      {pre.CiaProveedora}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>
                )}
              </select>
            </div>
            <div className="contInput">
              <TextCustom text="Producto" className="titleInput1" />
              <select name="" className="selectCustom" id="producto">
                {producto.length ? (
                  producto.map(pre => (
                    <option key={pre.IdProducto} value={pre.IdProducto}>
                      {pre.Marca+ "-"+pre.Modelo}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>
                )}
              </select>
            </div>

            <div className="contInput">
              <TextCustom text="Cantidad" className="titleInput1" />

              <input
                type="number"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Cantidad"
                id="cantidad"
                onKeyDown={e => {
                  setcantid(e.target.value);
                  if (cantid === '') {
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

            <div className="contInput">
              <TextCustom text="Costo de la Compra" className="titleInput1" />

              <input
                type="number"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Costo de la Compra"
                id="costo"
                onKeyDown={e => {
                  setcosCompra(e.target.value);
                  if (cosCompra === '') {
                    setErrorcoscompra(true);
                    setaviso('Los campos no deben estar vacios');
                  } else {
                    setErrorcoscompra(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(cosCompra)) {
                      setErrorcoscompra(true);
                      setaviso('Solo deben de ingresar numeros');
                    } else {
                      setErrorcoscompra(false);
                      setaviso('');
                    }
                  }
                }}
                onClick={e => {
                  setcosCompra(e.target.value);
                  if (cosCompra === '') {
                    setErrorcoscompra(true);
                    setaviso('Los campos no deben estar vacios');
                  } else {
                    setErrorcoscompra(false);
                    setaviso('');
                  }
                }}
              />
              <p class="error">{aviso}</p>
            </div>


            <div className="contBtnStepper1" style={{paddingLeft: '115px'}}>
              <Button
                onClick={() => {
                  var costo = document.getElementById("costo").value;
                  var cantidad = document.getElementById("cantidad").value;
                  if (costo === "" || cantidad === "") {
                    swal("No deje campos vacíos.", "", "error");                 
                  }else if (cantidad <= 0) {
                    swal("El campo cantidad no acepta valores negativos.", "", "error");
                  }else if (costo <= 0) {
                    swal("El campo costo no acepta valores negativos.", "", "error");
                  }else {
                    AggDataGrid();
                    document.getElementById("cantidad").value = "";
                    document.getElementById("costo").value = ""
                  }
                }
                }

                //onClick={AggDataGrid}

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
                className="btnCreate1"
                onClick={GuardarCompra}



              >
                <AddIcon style={{ marginRight: '5px' }} />
                Guardar
              </Button>
              <Button className="btnReport1" onClick={() => { setCompras([]); setCambio(cambio + 1) }}>
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