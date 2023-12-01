import React from 'react';
import Button from '@mui/material/Button';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import swal from '@sweetalert/with-react';
import ReactModal from 'react-modal';
//Mui-Material-Icons
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';//icono para el boton de bucasr cliente

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


ReactModal.setAppElement('#root');

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
  const [pageSize, setPageSize] = useState(5);
  const [cantidadc, setcantidadc] = useState(0);
  const [costoc, setcostoc] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Estado para la opción seleccionada
  const [isProductoModalOpen, setIsProductoModalOpen] = useState(false);
  const [filtroProducto, setFiltroProducto] = useState('');

  const openProductoModal = () => {
    setIsProductoModalOpen(true);
  };
  
  const closeProductoModal = () => {
    setIsProductoModalOpen(false);
  };
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    // Cargar la lista de productos al inicio
    fetch(urlProducto)
      .then((response) => response.json())
      .then((data) => setProductos(data));
  }, []);
 // Nueva función para seleccionar un producto
 const handleSelectProductos = (selectedProducto) => {
  if (selectedProducto) {
    setSelectedOption({
      value: selectedProducto.idProducto,
      label: `${selectedProducto.idProducto} - ${selectedProducto.Modelo} ${selectedProducto.PrecioAro}`,
    });
    closeProductoModal();
  }
};
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
    const productoId = productos.IdProducto;
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
        producto: `${productos.Marca} - ${productos.Modelo}`,
        cantidad: cantidad,
        fechaYHora: fechaActual,
        costo: costo,
      };

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
    { field: 'costo', headerName: 'Costo de la Compra', width: 145,renderCell:params=>{
      
   return parseFloat(params.value).toFixed(2)}},
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
    const total = compras.reduce((acumulador, compra) => {
      const subtotalPorProducto = compra.cantidad * compra.costo;
      return acumulador + subtotalPorProducto;
    }, 0);

    swal({
      title: "Confirme la Compra",
      content: {
        element: "div",
        attributes: {
          innerHTML: `
            
            <h3>Total a Pagar ${total}</h3>
          `,
        },
      },
      buttons: {
        cancel: {
          text: "Cancelar",
          value: false,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "Confirmar",
          value: true,
          visible: true,
          closeModal: true,
        },
      },
    }).then((value) => {
        if (value) {
         
            swal("¡Compra confirmada!", "", "success").then(()=>{
              console.log(data);
              axios.post(urlCompra, data).then(() => {
                navegate('/menuInventario/ListaCompra');
              })
            });   
        
        } else {
          // Lógica en caso de cancelación
          swal("Compra cancelada", "", "error");
        }
      });

   

  }
  const handleSelectChange = (event) => {
    const textoSeleccionado = event.target.options[event.target.selectedIndex].text;
    console.log('Texto seleccionado:', textoSeleccionado);
    // Aquí puedes hacer lo que desees con el texto seleccionado
  };


   // MAGIA DE SELECCIONAR PRODUCTO
   const handleCellClic = (params) => {
    const rowData = params.row;
    setProductos(rowData)
    closeProductoModal()
  };
  const customStyles = {
    content: {
      width: '50%', // Ancho de la modal
      height: '60%', // Alto de la modal
      margin: 'auto', // Centrar la modal horizontalmente
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      borderRadius: '4px',
      outline: 'none',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscurecido de la modal
    },
  };


  const handleSearchChange = (event) => {
    setFiltroProducto(event.target.value);
  };

  const productosFiltrados = producto.filter((prod) =>
    prod.Modelo.toLowerCase().includes(filtroProducto.toLowerCase())
  );

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
              <div className='inputContainer' style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  //onClick={openModal}
                  className="inputCustom"
                  placeholder="Seleccione el aro"
                  disabled
                  onChange={handleCellClic}
                  value={productos.Modelo}
                  style={{ width: '300px' }}
                />
                <Button className="btnClearFilter" onClick={openProductoModal}><PersonSearchIcon style={{ fontSize: '3rem'}}></PersonSearchIcon></Button>
              </div>
            </div>
            <ReactModal
              style={customStyles}
              isOpen={isProductoModalOpen}
              onRequestClose={closeProductoModal}
              contentLabel="Lista de Aros"
              ariaHideApp={false} >
              <div>
          
              <h2 style={{ fontSize: '2.5rem',marginBottom: '10px' }}>Seleccione el producto</h2>
              
                <input
            type="text"
            placeholder="Buscar producto"
            className="inputSearch"
            value={filtroProducto}
            onChange={handleSearchChange}
            style={{ width: '300px', marginBottom: '15px' }}
          />
                {/* Tabla o cualquier otro componente para mostrar la lista de clientes */}
                <DataGrid
          getRowId={Productos => Productos.IdProducto}
          rows={productosFiltrados}
          columnas={columns}
          onCellClick={handleCellClic}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          pagination
          autoHeight
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          columns={[
            { field: 'IdProducto', headerName: 'ID', width: 80 },
            { field: 'Modelo', headerName: 'Modelo', width: 200 },
            { field: 'Marca', headerName: 'Marca', width: 200 },
            { field: 'descripcion', headerName: 'Descripción', width: 280 },
            { field: 'precio', headerName: 'Precio', width: 200 },
          ]}
        style={{ fontSize: '14px' }} // Ajusta el tamaño de la letra aquí
                  onSelectionModelChange={(selection) => {
                    // Ensure that selection.selectionModel is defined and not empty
                    if (selection.selectionModel && selection.selectionModel.length > 0) {
                      const selectedProductoId = selection.selectionModel[0];
                      const selectedProduct = productos.find(
                        (Product) => Product.IdProducto === selectedProductoId
                      );
                      // Check if selectedClient is not undefined before calling handleSelectCliente
                      if (selectedProduct) {
                        handleSelectProductos(selectedProduct);
                      }
                    }
                  }}
        />
                {/* Botón para cerrar el modal */}
                <Button className="btnCloseModal" onClick={closeProductoModal} style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  Cerrar
                </Button>
              </div>
            </ReactModal>






























            

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
          <label htmlFor="">Total de la compra: {compras.reduce((total,compra)=>(total+compra.costo).toFixed(2),0)}</label>
        </div>
      </div>
    </div>
  );
};