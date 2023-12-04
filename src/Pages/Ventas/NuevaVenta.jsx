import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, esES } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import ReactModal from 'react-modal';
import jsPDF from 'jspdf';
import Select from 'react-select'; //select para concatenar el idCiente y el nombre
import PersonSearchIcon from '@mui/icons-material/PersonSearch';//icono para el boton de bucasr cliente
import swal from '@sweetalert/with-react';

//Styles
import '../../Styles/Usuarios.css';

//Components
import { TextCustom } from '../../Components/TextCustom.jsx';
//import swal from '@sweetalert/with-react';

//URLS
const urlCliente = 'http://localhost:3000/api/clientes';
const urlProducto = 'http://localhost:3000/api/productos';
const urlLente = 'http://localhost:3000/api/Lentes';
const urlDescuento = 'http://localhost:3000/api/Descuento';
const urlPromocion = 'http://localhost:3000/api/promociones';
const urlGarantia = 'http://localhost:3000/api/garantias';
const urlBitacoraInsertVenta = 'http://localhost:3000/api/bitacora/insertventa';
const urlTotalAPagar = "http://localhost:3000/api/Ventas/totalAPagar"
const urlVenta = 'http://localhost:3000/api/Ventas/nuevaVenta';

ReactModal.setAppElement('#root');



export const NuevaVenta = (props) => {
  
  const urltotal = 'http://localhost:3000/api/Ventas/totalAPagar';
  const [tableData, setTableData] = useState([]);
  const [totales,setTotales]=useState({subtotal:0,rebajas:0,total:0})
  const [searchTerm, setSearchTerm] = useState('');
  const [ventas, setVentas] = useState([])
  const [Cliente, setCliente] = useState([]);
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().slice(0, 10));
  const [fechaEntrega, setfechaEntrega] = React.useState('');
  const [fechaLimiteEntrega, setfechaLimiteEntrega] = React.useState('');
  //const [Rtn, setRtn] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');

  const [RTN, setRTN] = useState(props.data.Rtn || '');
  const [errorRTN, setErrorRTN] = React.useState(false);
  const [texto, setTexto] = React.useState(false);

  const [cambio, setCambio] = useState(0)

  const [selectedOption, setSelectedOption] = useState(null); // Estado para la opción seleccionada
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [Producto, setProducto] = useState([]);
  const [Lente, setLente] = useState([]);//hook para los lentes
  const [Descuento, setDescuento] = useState([]);
  const [DescuentoLente, setDescuentoLente] = useState([]);
  const [Promocion, setPromocion] = useState([]);
  const [Garantia, setGarantia] = useState([]);
  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado
  const [selectedAros, setSelectedAros] = useState(null); // Estado para la opción seleccionada
  const [selectedPromocion, setSelectedPromocion] = useState(null);
  const [selectedGarantia, setSelectedGarantia] = useState(null);
  const [selectedDescuento, setSelectedDescuento] = useState(null);
 const [selectedLente, setSelectedLente] = useState(null);

  const [costo, setCosto] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [total, setTotal] = useState(0)


 // const [isModalOpen, setIsModalOpen] = useState(false);
 const [filtroLente, setFiltroLentes] = useState('');
  const [isClienteModalOpen, setIsClienteModalOpen] = useState(false);
  const [isProductoModalOpen, setIsProductoModalOpen] = useState(false);
  const [isLenteModalOpen, setIsLenteModalOpen] = useState(false);
  
  const openClienteModal = () => {
    setIsClienteModalOpen(true);
  };
  
  const closeClienteModal = () => {
    setIsClienteModalOpen(false);
  };
  
  const openProductoModal = () => {
    setIsProductoModalOpen(true);
  };
  
  const closeProductoModal = () => {
    setIsProductoModalOpen(false);
  };
  
  const openLenteModal = () => {
    setIsLenteModalOpen(true);
  };
  
  const closeLenteModal = () => {
    setIsLenteModalOpen(false);
  };
  
 // Nuevo estado para almacenar los clientes
 const [clientes, setClientes] = useState([]);
  useEffect(() => {
    // Cargar la lista de clientes al inicio
    fetch(urlCliente)
      .then((response) => response.json())
      .then((data) => setClientes(data));
  }, []);
  
//Lentes

const [Rlentes, setRlentes] = useState([]);
  useEffect(() => {
    // Cargar la lista de lentes al inicio
    fetch(urlLente)
      .then((response) => response.json())
      .then((data) => setRlentes(data));
  }, []);

   // Nueva función para seleccionar un lente
   const handleSelectlentes = (selectedLentes) => {
    if (selectedLentes) {
      setSelectedOption({
        value: selectedLentes.IdLente,
        label: `${selectedLentes.IdLente} - ${selectedLentes.lente} ${selectedLentes.precio}`,
      });
      closeLenteModal();
    }
  };

//producto
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    // Cargar la lista de productos al inicio
    fetch(urlProducto)
      .then((response) => response.json())
      .then((data) => setProductos(data));
  }, []);

///////

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

  // Nueva función para seleccionar un cliente
  const handleSelectCliente = (selectedCliente) => {
    if (selectedCliente) {
      setSelectedOption({
        value: selectedCliente.idCliente,
        label: `${selectedCliente.idCliente} - ${selectedCliente.nombre} ${selectedCliente.apellido}`,
      });
      closeClienteModal(); // Cambia aquí
    }
  };


    // Nueva función para seleccionar un lente
    const handleSelectLentes = (selectedLente) => {
      if (selectedLente) {
        setSelectedOption({
          value: selectedLente.IdLente,
          label: `${selectedLente.IdLente} - ${selectedLente.lente} ${selectedLente.precio}`,
        });
        closeLenteModal();
      }
    };
  


  useEffect(() => {
    fetch(urlCliente).then(response => response.json()).then(data => setCliente(data))
    fetch(urlProducto).then(response => response.json()).then(data => setProducto(data))
    fetch(urlDescuento).then(response => response.json()).then(data => setDescuento(data))
    fetch(urlPromocion).then(response => response.json()).then(data => setPromocion(data))
    fetch(urlGarantia).then(response => response.json()).then(data => setGarantia(data))
    fetch(urlLente).then(response => response.json()).then(data => setLente(data))
  }, [])

  useEffect(() => {
    setTableData(ventas)
  }, [ventas,cambio])

  useEffect(() => {
    axios.post(urlTotalAPagar,{arrVentas:ventas}).then(res=>setTotales(res.data))
  }, [ventas])

  const navegate = useNavigate();

  const AggDataGrid = () => {

    const cantidad = parseInt(document.getElementById("Cantidad").value);

    const existingIndex = ventas.findIndex(item => item.IdProducto === productos.IdProducto);
    console.log(clientes);
    if (existingIndex !== -1) {
      const updatedVentas = [...ventas];
      updatedVentas[existingIndex].cantidad += cantidad;
      setVentas(updatedVentas);
     
    } else {
      const dataGrid = {
        IdEmpleado: props.idEmpleado,
        idUsuario:props.idUsuario,
        IdProducto: productos.IdProducto,
        Aro: `${productos.Marca} - ${productos.Modelo}`,
        IdLente: Rlentes.IdLente,
        Lente: Rlentes.lente,
        PrecioAro: productos.precio,
        fechaEntrega: 2023 - 26 - 11,
        fechaLimiteEntrega: 2023 - 1 - 12,
        IdCliente: Cliente.idCliente,
        RTN: document.getElementById("RTN".value) || " ",
        IdGarantia: selectedGarantia.value,
        IdPromocion: selectedPromocion.value,
        IdDescuento: selectedDescuento.value,
        Descuento: selectedDescuento.label,
        Promocion: selectedPromocion.label,
        cantidad: cantidad
      };
      setVentas([...ventas, dataGrid]);      
      setCambio(cambio + 1);
    }
  };

  const eliminarVenta = (idProducto) => {
    console.log(idProducto);
    const nuevasVentas = ventas.filter(ventas => ventas.IdProducto !== idProducto);
    console.log(nuevasVentas);
    setVentas(nuevasVentas);
    setCambio(cambio + 1)
  };

  const columns = [
    { field: 'Aro', headerName: 'Aro', width: 250 },
    { field: 'Lente', headerName: 'Lente', width: 250 },
    { field: 'cantidad', headerName: 'Cantidad', width: 145 },
    { field: 'Descuento', headerName: 'Descuento', width: 145 },
    { field: 'Promocion', headerName: 'Promocion', width: 145 },
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 150,

      renderCell: params => (
        <div className="contActions1">
          <Button
            className="btnDelete"
            onClick={() => eliminarVenta(params.row.IdProducto)}
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

  const GuardarVenta = async () => {
    let data = {
      arrVentas: ventas
    }
    await axios.post(urlTotalAPagar, data).then((response) => {
      swal({
        content: (
          <div className="contMod">
            <div className="logoModal1">
              Confirmar la Venta
            </div>
            <div className="infoMod">
              <h3>SubTotal: <h4>${response.data.subtotal}</h4></h3>
              <h3>Rebajas: <h4>${response.data.rebajas}</h4></h3>
              <h3>Total a Pagar: <h4>${response.data.total}</h4></h3>
            </div>
        </div>
        ),
// content: {
//   element: 'div',
//           attributes: {
//             innerHTML: `
//             <div className=`${logoModal}`>
//             ¿Desea actualizar la Promocion de Producto?
//           </div>
//               <h3>Subtotal ${response.data.subtotal}</h3>
//               <h3>Rebajas ${response.data.rebajas}</h3>
//               <h3>Total a Pagar ${response.data.total}</h3>
//             `,
//           },
//         },
        
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
          axios.post(urlVenta, data).then((res) => {
            let dataVenta = {
              id: res.data.id,
              total: response.data.total,
              saldoRestante: response.data.total
            }
            swal("¡Venta confirmada!", "", "success").then(() => {
              props.venta(dataVenta)
              navegate('/menuVentas/PagoDeVenta')
            })
          }).catch(() => {
            swal("Venta cancelada", "", "error");
          })
        } else {
          // Lógica en caso de cancelación
          swal("Venta cancelada", "", "error");
        }
      });
    })
  };



  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de una Venta ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        props.update(false)
        props.Data({})
        navegate('/menuVentas/ListaVenta');
      } else {
      }
    });
  };

  //

  // MAGIA DE SELECCIONAR MALDITASEA
  const handleCellClick = (params) => {
    const rowData = params.row;
    setCliente(rowData)
    console.log(Cliente);
    closeClienteModal()
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



    // MAGIA DE SELECCIONAR PRODUCTO
    const handleCellClic = (params) => {
      const rowData = params.row;
      setProductos(rowData)
      console.log(productos);
      closeProductoModal()
    };
   
  // MAGIA DE SELECCIONAR lentes
  const handleCellClickLentes = (params) => {
    const rowData = params.row;
    setRlentes(rowData)
    console.log(Rlentes);
    closeLenteModal()
  };

     

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>

      <div className="titleAddUser">
        <h2>Nueva Venta</h2>
      </div>
      <div className="infoAddUser1">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            {/* <label htmlFor="" onChange={handleCellClick}> CLIENTE: {Cliente.nombre}</label>
            <div className="contInput">
              <TextCustom text="Cliente:" className="titleInput" />
              <div className="contInput">
                <button onClick={openModal}>Seleccionar Cliente</button>
              </div>
            </div> */}

            <div className="contInput"  >
              <TextCustom text="Cliente" className="titleInput" />
              <div className='inputContainer' style={{ display: 'flex', alignItems: 'center' }}>

                <input
                  type="text"
                  //onClick={openModal}
                  className="inputCustom"
                  placeholder="Seleccione un cliente"
                  disabled
                  onChange={handleCellClick}
                  value={Cliente.nombre}
                  style={{ width: '300px' }}
                />
                <Button className="btnClearFilter" onClick={openClienteModal}>
                  <PersonSearchIcon className='iconSearchP'/>
                </Button>
              </div>



            </div>

            <ReactModal
              style={customStyles}
              isOpen={isClienteModalOpen}
              onRequestClose={closeClienteModal}
              contentLabel="Lista de Clientes"
              ariaHideApp={false} >
              <div>
                <h2>Seleccione un Cliente</h2>
                {/* Tabla o cualquier otro componente para mostrar la lista de clientes */}
                <DataGrid
                  rows={clientes}
                  getRowId={clientes => clientes.idCliente}
                  pagination
                  autoHeight
                  onCellClick={handleCellClick}
                  localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                  pageSize={pageSize}
                  rowsPerPageOptions={[5, 10, 50]}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  columns={[
                    { field: 'COD_CLIENTE', headerName: 'ID', width: 80,headerAlign: 'center' },
                    { field: 'idCliente', headerName: 'Identidad', width: 165, headerAlign: 'center' },
                    { field: 'nombre', headerName: 'Nombre', width: 190, headerAlign: 'center' },
                    { field: 'apellido', headerName: 'Apellido', width: 190, headerAlign: 'center' },



                    //{ field: 'genero', headerName: 'Género', width: 165, headerAlign: 'center' },
                   /*  {
                      field: 'fechaNacimiento',
                      headerName: 'Fecha de Nacimiento',
                      width: 170,
                      headerAlign: 'center',
                      renderCell: (params) => (
                        <span>
                          {new Date(params.value).toLocaleDateString('es-ES')}
                        </span>
                      ),
                    }, */
                  ]}
                  style={{ fontSize: '14px' }} // Ajusta el tamaño de la letra aquí
                  onSelectionModelChange={(selection) => {
                    // Ensure that selection.selectionModel is defined and not empty
                    if (selection.selectionModel && selection.selectionModel.length > 0) {
                      const selectedClientId = selection.selectionModel[0];
                      const selectedClient = clientes.find(
                        (client) => client.idCliente === selectedClientId
                      );
                      // Check if selectedClient is not undefined before calling handleSelectCliente
                      if (selectedClient) {
                        handleSelectCliente(selectedClient);
                      }
                    }
                  }}

                />

                {/* Botón para cerrar el modal */}
                <Button className="btnCloseModal" onClick={closeClienteModal} style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  Cerrar
                </Button>
              </div>
            </ReactModal>


<div  className="contInput"  ></div>
            <div className="contInput"  >
              <TextCustom text="RTN" className="titleInput" />
              <input
                error={errorRTN}
                type="number"
                min="1"
                max="99999999999999"
                name=""
                maxLength={14}
                className="inputCustom"
                placeholder="(Opcional)"
                id="RTN"
                helperText={texto}
              />

            </div>

            <div className="contInput">
              <TextCustom text="Fecha actual" className="titleInput" />
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
              <TextCustom text="Fecha de entrega" className="titleInput" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha de entrega"
                id="fechaEntrega"
              />
            </div>

            <div className="contInput">
              <TextCustom text="Fecha limite de entrega" className="titleInput" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha limite de entrega"
                id="fechaLimiteEntrega"
              />
            </div>


            <div className="contInput">
              <TextCustom text="Aros:" className="titleInput" />
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
                <Button className="btnClearFilter" onClick={openProductoModal}>
                <PersonSearchIcon className='iconSearchP'/>
                </Button>
              </div>
            </div>
            <ReactModal
              style={customStyles}
              isOpen={isProductoModalOpen}
              onRequestClose={closeProductoModal}
              contentLabel="Lista de Aros"
              ariaHideApp={false} >
              <div>
                <h2>Seleccione el producto</h2>
                {/* Tabla o cualquier otro componente para mostrar la lista de clientes */}
                <DataGrid
          getRowId={Productos => Productos.IdProducto}
          rows={Producto}
          columnas={columns}
          onCellClick={handleCellClic}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          pagination
          autoHeight
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          columns={[
            { field: 'IdProducto', headerName: 'ID', width: 100 },
            { field: 'Modelo', headerName: 'Modelo', width: 190 },
            { field: 'Marca', headerName: 'Marca', width: 190 },
            { field: 'descripcion', headerName: 'Descripción', width: 190 },
            { field: 'precio', headerName: 'Precio', width: 120 },
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
              <TextCustom text="Descuento Aro:" className="titleInput" />
              <div className="contInput">
                <Select
                  id="promocion"

                  options={Descuento.map(pre => ({ value: pre.IdDescuento, label: `${(pre.descPorcent) * 100}%` }))}
                  value={selectedDescuento}
                  onChange={setSelectedDescuento}
                  placeholder="Seleccione un Descuento"
                />
              </div>
            </div>




            <div className="contInput">
              <TextCustom text="Promocion de venta:" className="titleInput" />
              <div className="contInput">
                <Select
                  id="promocion"

                  options={Promocion.map(pre => ({ value: pre.IdPromocion, label: `${(pre.descPorcent) * 100}%` }))}
                  value={selectedPromocion}
                  onChange={setSelectedPromocion}
                  placeholder="Seleccione una Promocion"
                />
              </div>
            </div>

            <div className="contInput">
              <TextCustom text="Garantia de venta:" className="titleInput" />
              <div className="contInput">
                <Select
                  id="garantia"
                  options={Garantia.map(pre => ({ value: pre.IdGarantia, label: `${pre.descripcion} - ${pre.mesesGarantia} Meses` }))}
                  value={selectedGarantia}
                  onChange={setSelectedGarantia}
                  placeholder="Seleccione una Garantia"
                />
              </div>
            </div>

            <div className="contInput">
              <TextCustom text="Cantidad" className="titleInput" />

              <input
                type="number"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Cantidad"
                id="Cantidad"
              />
            </div>

            {/* <div className="contInput">
              <TextCustom text="Precio del lente" className="titleInput" />
              <div className="contInput">
                <Select
                  id="lente"
                  options={Lente.map(pre => ({label: `${pre.lente} L.${pre.precio}` }))}
                  value={selectedOption}
                  onChange={setSelectedOption}
                  placeholder="Seleccione un Lente"
                />
              </div>
            </div> */}

          <div className="contInput">
              <TextCustom text="Lentes" className="titleInput" />
              <div className='inputContainer' style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  //onClick={openModal}
                  className="inputCustom"
                  placeholder="Seleccione el lente"
                  disabled
                  onChange={handleCellClickLentes}
                  value={Rlentes.lente}
                  style={{ width: '300px' }}
                />
                <Button className="btnClearFilter" onClick={openLenteModal}>
                  <PersonSearchIcon className='iconSearchP'/>
                </Button>
              </div>
            </div>
            <ReactModal
              style={customStyles}
              isOpen={isLenteModalOpen}
              onRequestClose={closeLenteModal}
              contentLabel="Lista de Lentes"
              ariaHideApp={false} >
              <div>
          
              <h2 style={{ fontSize: '2.5rem',marginBottom: '10px' }}>Seleccione el lente</h2>
              
                {/* Tabla o cualquier otro componente para mostrar la lista de clientes */}
                <DataGrid
          getRowId={Lentecitos => Lentecitos.IdLente}
          rows={Lente}
          columnas={columns}
          onCellClick={handleCellClickLentes}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          pagination
          autoHeight
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}

          columns={[
            { field: 'IdLente', headerName: 'ID', width: 100, headerAlign: 'center' },
            { field: 'lente', headerName: 'Tipo de lente', width: 450,headerAlign: 'center' },
            { field: 'precio', headerName: 'Precio', width: 420,headerAlign: 'center' },
          ]}
        style={{ fontSize: '14px' }} // Ajusta el tamaño de la letra aquí
                  onSelectionModelChange={(selection) => {
                    // Ensure that selection.selectionModel is defined and not empty
                    if (selection.selectionModel && selection.selectionModel.length > 0) {
                      const selectedLentesId = selection.selectionModel[0];
                      const selectedLent = Rlentes.find(
                        (Lent) => Lent.IdLente === selectedLentesId
                      );
                      // Check if selectedClient is not undefined before calling handleSelectCliente
                      if (selectedLent) {
                        handleSelectLentes(selectedLente);
                      }
                    }
                  }}
        />
                {/* Botón para cerrar el modal */}
                <Button className="btnCloseModal" onClick={closeLenteModal} style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  Cerrar
                </Button>
              </div>
            </ReactModal>





            <div className="contBtnStepper2">
              <Button
                className="btnStepper"

                onClick={() => {
                  let fechaEntrega = document.getElementById("fechaEntrega").value;
                  let fechaLimiteEntrega = document.getElementById("fechaLimiteEntrega").value;
                  let Cliente = selectedOption ? selectedOption.value : null;
                  let Empleado = selectedEmpleado ? selectedEmpleado.value : null;
                  var producto = selectedAros ? selectedAros.value : null;
                  var Descuento = selectedDescuento ? selectedDescuento.value : null;
                  var Promocion = selectedPromocion ? selectedPromocion.value : null;
                  var Garantia = selectedGarantia ? selectedGarantia.value : null;
                  var cantidad = parseInt(document.getElementById("Cantidad").value)
                  var lente = selectedLente ? selectedLente.value : null;

                  if (fechaLimiteEntrega < fechaEntrega) {
                    swal("Porfavor ingrese correctamente las fechas", "", "error")
                  } else if ((fechaEntrega === "" || fechaLimiteEntrega === "" || Cliente === "" || Empleado === "" || cantidad === "" || lente === "" || producto === "" || Descuento === "" || Promocion === "" || Garantia === "")) {
                    swal("No deje campos vacíos.", "", "error");
                  } else {
                    AggDataGrid();
                    //document.getElementById(selectedAros).value = "";
                    //document.getElementById(selectedLente).value = ""
                    //document.getElementById("producto").value = "";
                    document.getElementById("Cantidad").value = "";
                    //document.getElementById("costo").value = ""
                    //handleNext();
                  }

                }
                }
              >
                {/*      <h1>{'Finish' ? 'Siguiente' : 'Finish'}</h1> */}
                <h1>{'Finish' ? 'Agregar' : 'Finish'}</h1>
              </Button>
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
                onClick={GuardarVenta}

              >
                <AddIcon style={{ marginRight: '5px' }} />
                Guardar
              </Button>
              <Button className="btnReport1" onClick={() => { setVentas([]); setCambio(cambio + 1) }}>
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
          <div className="resultados">
            <div className="contResultados">
              <TextCustom text="SubTotal" className="titlePResult" />
              <label htmlFor="" className='titleSResult'>{totales.subtotal.toFixed(2)}</label>
            </div>

            <div className="contResultados">
              <TextCustom text="Rebajas" className="titlePResult" />
              <label htmlFor="" className='titleSResult'>{totales.rebajas.toFixed(2)}</label>
            </div>

            <div className="contResultados">
              <TextCustom text="Total" className="titlePResult" />
              <label htmlFor="" className='titleSResultT'>{totales.total.toFixed(2)}</label>
            </div>
          </div>

          {/* <img
          src={
            'https://static.vecteezy.com/system/resources/previews/018/942/487/non_2x/business-strategic-planning-illustration-concept-on-white-background-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        /> */}
        </div>
      </div>
    </div>
  );
};