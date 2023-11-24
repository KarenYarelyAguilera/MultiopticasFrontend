import React from 'react';
import Button from '@mui/material/Button';
import { sendData } from '../../scripts/sendData';
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


export const NuevaVenta = (props) => {

  const [tableData, setTableData] = useState([]);
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
  const [Lente, setLente] = useState([]);
  const [Descuento, setDescuento] = useState([]);
  const [DescuentoLente, setDescuentoLente] = useState([]);
  const [Promocion, setPromocion] = useState([]);
  const [Garantia, setGarantia] = useState([]);

  const [selectedAros, setSelectedAros] = useState(null); // Estado para la opción seleccionada
  const [selectedPromocion, setSelectedPromocion] = useState(null);
  const [selectedGarantia, setSelectedGarantia] = useState(null);
  const [selectedDescuento, setSelectedDescuento] = useState(null);
  const [selectedLente, setSelectedLente] = useState(null);

  const [costo, setCosto] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [total, setTotal] = useState(0)


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
  }, [cambio])



  const navegate = useNavigate();

 const AggDataGrid = () => {
   
    const cantidad = parseInt(document.getElementById("Cantidad").value);
  
    const existingIndex = ventas.findIndex(item => item.IdProducto === selectedAros.value);
    console.log(existingIndex);
    if (existingIndex !== -1) {
      const updatedVentas = [...ventas];
      updatedVentas[existingIndex].cantidad += cantidad;
      setVentas(updatedVentas);
    } else {
      const dataGrid = {
        IdEmpleado:props.idUsuario,
        IdProducto: selectedAros.value,
        Aro: selectedAros.label,
        IdLente:selectedLente.value,
        Lente:selectedLente.label,
        PrecioAro:selectedAros.precio,
        fechaEntrega:2023-26-11,
        fechaLimiteEntrega:2023-1-12,
        IdCliente: selectedOption.value,
        RTN: document.getElementById("RTN".value) || " ",
        IdGarantia: selectedGarantia.value,
        IdPromocion: selectedPromocion.value,
        IdDescuento: selectedDescuento.value,
        Descuento:  selectedDescuento.label,
        Promocion: selectedPromocion.label,
        cantidad: cantidad
      };
      console.log(dataGrid);
      setVentas([...ventas, dataGrid]);
      setCambio(cambio + 1);
    }  
  };

  const eliminarVenta = (idProducto) => {
    console.log(idProducto);
    const nuevasVentas = ventas.filter(ventas => ventas.IdProducto !== idProducto);
    console.log(nuevasVentas);
    setVentas(nuevasVentas);
    setCambio(cambio+1)
  };

  const columns = [
    { field: 'Aro', headerName: 'Aro', width: 250},
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
    arrVentas:ventas
  }
    await axios.post(urlTotalAPagar, data).then((response) => {
      swal({
        title: "Confirme la venta",
        content: {
          element: "div",
          attributes: {
            innerHTML: `
              <h1>Confirme la venta</h1>
              <h3>Subtotal ${response.data.subtotal}</h3>
              <h3>Rebajas ${response.data.rebajas}</h3>
              <h3>Total a Pagar ${response.data.total}</h3>
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
            axios.post(urlVenta,data).then(()=>{
              swal("¡Venta confirmada!", "", "success");   
            }).catch(()=>{
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

            <div className="contInput">
              <TextCustom text="Cliente:" className="titleInput" />
              <div className="contInput">
                <Select
                  id="cliente"
                  options={Cliente.map(pre => ({ value: pre.idCliente, label: `${pre.idCliente} - ${pre.nombre} ${pre.apellido}` }))}
                  value={selectedOption}
                  onChange={setSelectedOption}
                  placeholder="Seleccione un cliente"
                />
              </div>
            </div>

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
              <div className="contInput">
                <Select
                  id="producto"
                  options={Producto.map(pre => ({ value: pre.IdProducto, label: `${pre.Modelo} - L${pre.precio}` }))}
                  value={selectedAros}
                  onChange={setSelectedAros}
                  menuPlacement="auto"
                  placeholder="Seleccione un Aro"
                />
              </div>
            </div>


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
                  options={Garantia.map(pre => ({ value: pre.IdGarantia, label: `${pre.descripcion} - ${pre.Meses} Meses` }))}
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
              <TextCustom text="Precio del lente" className="titleInput" />
              <div className="contInput">
                <Select
                  id="lente"
                  options={Lente.map(pre => ({ value: pre.IdLente, label: `${pre.lente} - L.${pre.precio}` }))}
                  value={selectedLente}
                  onChange={setSelectedLente}
                  placeholder="Seleccione un lente"
                />
              </div>
            </div>

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