import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Select from 'react-select';
import ReactModal from 'react-modal';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';//icono para el boton de bucasr cliente


//Styles
import '../../Styles/Usuarios.css';

//Components

import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';
import axios from 'axios';
import { Bitacora } from '../../Components/bitacora.jsx';
import { DataGrid, esES } from '@mui/x-data-grid';


const urlProducto = "http://194.163.45.55:4000/api/productos";
const urlMovimientos = "http://194.163.45.55:4000/api/Tmovimientos";
const urlMovimientosInsert = "http://194.163.45.55:4000/api/Extraordinario";
//Bitacora
const urlBitacoraMovimiento = "http://194.163.45.55:4000/api/bitacora/movimientoKardex";

ReactModal.setAppElement('#root');

export const Kardex2 = (
  props
) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };




  const navegate = useNavigate();
  const [selectedOptionP, setSelectedOptionP] = useState(null); // Estado para la opción seleccionada
  const [selectedOptionM, setSelectedOptionM] = useState(null);
  const [marca, setmarca] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorMarca, setErrorMarca] = React.useState(false);
  const [tableDataP, setTableDataP] = useState([]);
  const [tableDataM, setTableDataM] = useState([]);
  const [nombremarca, setnombremarca] = React.useState('');
  const [producto, setProducto] = useState([]);
  const [aviso, setaviso] = React.useState('');
  const [errornombremarca, setErrornombremarca] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Estado para la opción seleccionada
  const [isProductoModalOpen, setIsProductoModalOpen] = useState(false);
  const [filtroProducto, setFiltroProducto] = useState('');
  const [pageSize, setPageSize] = useState(5);

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


//    useEffect(() => {
//     axios.get(urlProducto).then(response => {
//       setTableDataP(response.data)
//     }).catch(error => console.log(error))
//  }, []);

  useEffect(() => {
    axios.get(urlMovimientos).then(response => {
      setTableDataM(response.data)
    }).catch(error => console.log(error))
  }, []);
  useEffect(() => {
    fetch(urlProducto)
      .then(response => response.json())
      .then(data => setProducto(data));
  }, []);
  const handleNext = () => {
    let idTM = parseInt(document.getElementById("idTM").value)
    const fechaActual = new Date();
    let cantidad = parseInt(document.getElementById("cant").value)
    const fechaYHora = fechaActual.toISOString();
    let data = {
      idProducto: productos.IdProducto,
      idUsuario: props.idUsuario,
      fechaYHora:fechaYHora,
      cantidad:cantidad,
      IdTipoMovimiento: selectedOptionM.value,
      descripcion:document.getElementById("descripcion").value
    };
    console.log(data);
     //Funcion de Bitacora 
     let dataB = {
      Id: props.idUsuario
    };
    const bitacora = {
      urlB: urlBitacoraMovimiento,
      activo: props.activo,
      dataB: dataB
    };
    console.log(data);

    if (sendData(urlMovimientosInsert, data)) {
      swal('Movimiento registrado con exito', '', 'success').then(result => {
        Bitacora(bitacora)
        navegate('/menuInventario/Kardex');
      });
    }
  };

  const handleBack = () => {
    navegate('/menuInventario/Kardex');
  };

   // MAGIA DE SELECCIONAR PRODUCTO
  const handleCellClic = (params) => {
    const rowData = params.row;
    setProductos(rowData)
    console.log(productos.Modelo);
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


  const columns = [
    { field: 'IdProducto', headerName: 'ID', width: 80 },
    { field: 'Modelo', headerName: 'Modelo', width: 200 },
    { field: 'Marca', headerName: 'Marca', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 280 },
    { field: 'precio', headerName: 'Precio', width: 200 },
  ];
  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Kardex</h2>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <div className="contNewCita">
              <TextCustom text="Tipo de Movimiento" className="titleInput" />
              <div className="contInput">
                {/* <select id="idClientes" className="inputCustomPreguntas">
                    {tableData.length ? (
                      tableData.map(pre => (
                        <option key={pre.idCliente} value={pre.idCliente}>
                             {`${pre.idCliente} - ${pre.nombre}`}
                        </option>
                      ))
                    ) : (
                      <option value="No existe informacion">
                        No existe informacion
                      </option>
                    )}
                  </select> */}
                <Select
                  id="idTM"
                  // className="inputCustomPreguntas"
                  options={tableDataM.map(pre => ({ value: pre.IdTipoMovimiento, label: `${pre.descripcion}` }))}
                  value={selectedOptionM}
                  onChange={setSelectedOptionM}
                  placeholder="Seleccione el tipo de movimiento"
                />
              </div>
            </div>

            <div className="contNewCita">
              <TextCustom text="Producto" className="titleInput" />
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
              <TextCustom text="Cantidad" className="titleInput" />
              <input
                onKeyDown={e => {
                  setmarca(e.target.value);
                  if (marca === '') {
                    setErrorMarca(true);
                    setleyenda('Los campos no deben estar vacios');
                  } else {
                    setErrorMarca(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(marca)) {
                      setErrorMarca(true);
                      setleyenda('Solo deben de ingresar numeros');
                    } else {
                      setErrorMarca(false);
                      setleyenda('');
                    }
                  }
                }}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Cantidad"
                id="cant"
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Descripcion" className="titleInput" />
              <input
                onKeyDown={e => {
                }}
                type="text"
                name=""
                maxLength={50}
                className="inputCustomText"
                placeholder="Descripcion"
                id="descripcion"
              />
            </div>


            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={handleNext}
              >
                <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>

        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/010/351/676/non_2x/rewriting-text-color-icon-illustration-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};