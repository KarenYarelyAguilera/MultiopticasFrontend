import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//Imports para modal
import ReactModal from 'react-modal';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';//icono para el boton de bucasr cliente

//Styles
import '../../Styles/Usuarios.css';

//Components
import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';
import axios from 'axios'; //Se necesita exportar Axios para consumiar las APIs
import Select from 'react-select';
//modal
import { DataGrid, esES } from '@mui/x-data-grid';

import { Bitacora } from '../../Components/bitacora.jsx';

//APIS DE PRODUCTO
const urlProducto = //CREAR
  'http://194.163.45.55:4000/api/productos/crear';
const urlUpdProducto = //ACTUALIZAR
  'http://194.163.45.55:4000/api/productos/actualizar';
const urlDelProducto = //BORRAR
  'http://194.163.45.55:4000/api/productos/eliminar';
const urlModelos = //MOSTRAR MODELOS
  'http://194.163.45.55:4000/api/modelos';
  //BITACORAS
  const urlBitacoraInsertProducto='http://194.163.45.55:4000/api/bitacora/insertoproducto';
  const urlBitacoraActualizoProducto='http://194.163.45.55:4000/api/bitacora/actualizoproducto';
//para la modal 
ReactModal.setAppElement('#root');

export const RegistroProducto2 = (props) => { 

  const [Modelo, setModelo] = useState([]);  
  //const [modelos, setModelos] = useState(props.data.IdModelo || null);
  const [selectedOption, setSelectedOption] = useState(props.data.IdModelo || null);
  const [optionsModelos, setOptionsModelos] = useState([]);
  

  const [leyenda, setleyenda] = React.useState('');
  const [errorproducto, setErrorproducto] = React.useState(false);
  const [producto, setproducto] = React.useState(false);

  const [precio, setprecio] = React.useState(props.data.precio ||'');
  const [errorprecio, setErrorprecio] = React.useState(false);
  const [aviso, setaviso] = React.useState(false);

  const [cantidadmax, setcantidadmax] = React.useState(props.data.cantidadMax ||'');
  const [mensaje, setmensaje] = React.useState('');
  const [errorcantidadmax, setErrorcantidadmax] = React.useState(false);

  const [cantidadmin, setcantidadmin] = React.useState(props.data.cantidadMin ||'');
  const [advertencia, setadvertencia] = React.useState('');
  const [errorcantidadmin, setErrorcantidadmin] = React.useState(false);

  const [descrpcion, setdescripcion] = React.useState(props.data.descripcion ||'');
  const [msj, setmsj] = React.useState('');
  const [errordescripcion, setErrordescripcion] = React.useState(false);

  //hooks para la modal
  const [isModeloModalOpen, setIsModeloModalOpen] = useState(false);
  const [filtroModelo, setFiltroModelo] = useState('');
  const [pageSize, setPageSize] = useState(5);

  const openModeloModal = () => {
    setIsModeloModalOpen(true);
  };
  
  const closeModeloModal = () => {
    setIsModeloModalOpen(false);
  };

  const [Modeloss, setModeloss] = useState([]);
  useEffect(() => {
    // Cargar la lista de modelos al inicio
    fetch(urlModelos)
      .then((response) => response.json())
      .then((data) => setModeloss(data));
  }, []);

   // Nueva función para seleccionar un modelo
 const handleSelectModelos = (selectedModelos) => {
  if (selectedModelos) {
    setSelectedOption({
      value: selectedModelos.IdModelo,
      label: `${selectedModelos.IdModelo} - ${selectedModelos.Marca} ${selectedModelos.Modelo}`,
    });
    closeModeloModal();
  }
};



  const [estado, setEstado] = useState(props.data.estado || null)
//Se usa para mostrar informacion en un listbox
  useEffect(() => {
    fetch(urlModelos)
      .then(response => response.json())
      .then(data => setModelo(data));
  }, []);

  useEffect(() => {
    //-------------------------------De aqui----------------------------------------------
    console.log(props.urlModelos);
    axios.get(urlModelos).then((response) => {
      const modelsOptions = response.data.map((pre) => ({
        value: pre.IdModelo,
        label: `${pre.Marca} - ${pre.Modelo}`,
      }));
      setOptionsModelos(modelsOptions);

      // Ahora, busca la opción correspondiente al props.data.idEmpleado
      const optionToSelect = modelsOptions.find((option) => option.value === props.data.IdModelo);
      setSelectedOption(optionToSelect);
    })  
    
  }, []);

  const navegate = useNavigate();

    //ACTUALIZAR
    const actualizarProducto = async () => {

      let precio = parseFloat(document.getElementById('precio').value);
      let cantidadMin = parseInt(document.getElementById('cantidadMin').value);
      let cantidadMax = parseInt(document.getElementById('cantidadMax').value);
      let descripcion = document.getElementById('descripcion').value;
  
      const data = {
        precio: precio,
        cantidadMin: cantidadMin,
        cantidadMax: cantidadMax,
        descripcion: descripcion.toUpperCase(),
        estado: document.getElementById('estado').value,
        IdProducto: props.data.IdProducto, //El dato de IdProducto se obtiene de Producto seleccionado.
      };
      let dataB = {
        Id: props.idUsuario
      };
      const bitacora = {
        urlB: urlBitacoraActualizoProducto,
        activo: props.activo,
        dataB: dataB
      };
  
      axios.put(urlUpdProducto, data).then(() => {
        swal("Aro Actualizado Correctamente", "", "success").then(() => {
          Bitacora(bitacora)
          props.limpiarData({});
          props.limpiarUpdate(false)
          navegate('/menuInventario/ListaProductos');
        })
      }).catch(error => {
        console.log(error);
        swal('Error al Actualizar Aro! , porfavor revise todos los campos.', '', 'error')
        // axios.post(urlErrorInsertBitacora, dataB)
      })
  
    }

  //INSERTAR
  const handleNext = () => {
    //Variables que almacenaran lo que entre en los input
    //let modelo = parseInt(document.getElementById('modelo').value);
    let precio = parseFloat(document.getElementById('precio').value);
    let cantidadMin = parseInt(document.getElementById('cantidadMin').value);
    let cantidadMax = parseInt(document.getElementById('cantidadMax').value);
    let descripcion = document.getElementById('descripcion').value;


    let data = {
      //IdProducto: parseInt(document.getElementById('idProducto').value),
      IdModelo: selectedOption.value,
      precio: precio,
      cantidadMin: cantidadMin,
      cantidadMax: cantidadMax,
      descripcion: descripcion.toUpperCase(),
      estado: document.getElementById('estado').value,
    };
    let dataB = {
      Id: props.idUsuario
    };
    const bitacora = {
      urlB: urlBitacoraInsertProducto,
      activo: props.activo,
      dataB: dataB
    };

    //Consumo de API y lanzamiento se alerta
    axios.post(urlProducto, data).then(response => {
      swal('Aro agregado con exito', '', 'success').then(result => {
        Bitacora(bitacora)
        navegate('/menuInventario/ListaProductos');
      });
      
    }).catch(error => {
      console.log(error);
      swal('¡Este Aro ya existe! .', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  };



  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de Aro ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        props.limpiarData({});
        props.limpiarUpdate(false)
        props.update(false)
        props.Data({})
        navegate('/menuInventario/ListaProductos');
      } else {
      }
    });
  };
     // MAGIA DE SELECCIONAR MODELO
     const handleCellClic = (params) => {
      const rowData = params.row;
      setModeloss(rowData)
      console.log(Modeloss.Modelo);
      closeModeloModal()
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
      setFiltroModelo(event.target.value);
    };
  
    const modelosFiltrados = Modelo.filter((prod) =>
      prod.Modelo.toLowerCase().includes(filtroModelo.toLowerCase())
    );
    const columns = [
    
    ];

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        {props.actualizar ? <h2>Actualizar Aro</h2> : <h2>Registro de Aro</h2>}
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
          <div className="contNewCita">
              <TextCustom text="Modelo" className="titleInput" />
              <div className='inputContainer' style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  //onClick={openModal}
                  className="inputCustom"
                  placeholder="Seleccione el modelo"
                  disabled
                  onChange={handleCellClic}
                  value={Modeloss.Modelo}
                  style={{ width: '300px' }}
                />
                <Button className="btnClearFilter" onClick={openModeloModal}><PersonSearchIcon style={{ fontSize: '3rem'}}></PersonSearchIcon></Button>
              </div>
            </div>
            <ReactModal
              style={customStyles}
              isOpen={isModeloModalOpen}
              onRequestClose={closeModeloModal}
              contentLabel="Lista de Modelos"
              ariaHideApp={false} >
              <div>
          
              <h2 style={{ fontSize: '2.5rem',marginBottom: '10px' }}>Seleccione el modelo</h2>
              
                <input
            type="text"
            placeholder="Buscar modelo"
            className="inputSearch"
            value={filtroModelo}
            onChange={handleSearchChange}
            style={{ width: '300px', marginBottom: '15px' }}
          />
                {/* Tabla o cualquier otro componente para mostrar la lista de clientes */}
                <DataGrid
          getRowId={Modelitos => Modelitos.IdModelo}
          rows={modelosFiltrados}
          columnas={columns}
          onCellClick={handleCellClic}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          pagination
          autoHeight
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}

          columns={[
            { field: 'IdModelo', headerName: 'ID ', width: 150 },
            { field: 'Marca', headerName: 'Marca', width: 200 },
            { field: 'Modelo', headerName: 'Modelo', width: 200},
            { field: 'anio', headerName: 'Año', width: 200 },
          ]}
        style={{ fontSize: '14px' }} // Ajusta el tamaño de la letra aquí
                  onSelectionModelChange={(selection) => {
                    // Ensure that selection.selectionModel is defined and not empty
                    if (selection.selectionModel && selection.selectionModel.length > 0) {
                      const selectedModeloId = selection.selectionModel[0];
                      const selectedModels = Modeloss.find(
                        (Models) => Models.IdModelo === selectedModeloId
                      );
                      // Check if selectedClient is not undefined before calling handleSelectCliente
                      if (selectedModels) {
                        handleSelectModelos(selectedModels);
                      }
                    }
                  }}
        />
                {/* Botón para cerrar el modal */}
                <Button className="btnCloseModal" onClick={closeModeloModal} style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  Cerrar
                </Button>
              </div>
            </ReactModal>
            





















          

         
            <div className="contInput">
              <TextCustom text="Precio" className="titleInput" />

              <input
                onKeyDown={e => {
                  setprecio(e.target.value);
                  if (precio === '') {
                    setErrorprecio(true);
                    setaviso('Los campos no deben estar vacios');
                  } else {
                    setErrorprecio(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(precio)) {
                      setErrorprecio(true);
                      setaviso('Solo deben de ingresar numeros');
                    } else {
                      setErrorprecio(false);
                      setaviso('');
                    }
                  }
                }}
                onChange={e => setprecio(e.target.value)}
                error={errorprecio}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Precio"
                id="precio"
                value={precio}
              />
              <p class="error">{aviso}</p>
            </div>


            <div className="contInput">
              <TextCustom text="Cantidad Minima" className="titleInput" />

              <input
                onKeyDown={e => {
                  setcantidadmin(e.target.value);
                  if (cantidadmin === '') {
                    setErrorcantidadmin(true);
                    setadvertencia('Los campos no deben estar vacios');
                  } else {
                    setErrorcantidadmin(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(cantidadmin)) {
                      setErrorcantidadmin(true);
                      setadvertencia('Solo deben de ingresar numeros');
                    } else {
                      setErrorcantidadmin(false);
                      setadvertencia('');
                    }
                  }
                }}
                onChange={e => setcantidadmin(e.target.value)}
                error={errorcantidadmin}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Cantidad Minima"
                id="cantidadMin"
                value={cantidadmin}
              />
              <p class="error">{advertencia}</p>
            </div>
            
            <div className="contInput">
              <TextCustom text="Cantidad Maxima" className="titleInput" />

              <input
                onKeyDown={e => {
                  setcantidadmax(e.target.value);
                  if (cantidadmax === '') {
                    setErrorcantidadmax(true);
                    setmensaje('Los campos no deben estar vacios');
                  } else {
                    setErrorcantidadmax(false);
                    var preg_match = /^[0-9]+$/;
                    if (!preg_match.test(cantidadmax)) {
                      setErrorcantidadmax(true);
                      setmensaje('Solo deben de ingresar numeros');
                    } else {
                      setErrorcantidadmax(false);
                      setmensaje('');
                    }
                  }
                }}
                onChange={e => setcantidadmax(e.target.value)}
                error={errorcantidadmax}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Cantidad Maxima"
                id="cantidadMax"
                value={cantidadmax}
              />
              <p class="error">{mensaje}</p>
            </div>

           

            <div className="contInput">

              <TextCustom text="Descripcion del Producto" className="titleInput" />
              <textarea

                onKeyDown={e => {
                  setdescripcion(e.target.value);
                  if (descrpcion == '') {
                    setErrordescripcion(true);
                    setmsj('Los campos no deben estar vacios');
                  } else {
                    setErrordescripcion(false);
                    setmsj('');
                  }
                }}
                onChange={e => setdescripcion(e.target.value)}
                error={errordescripcion}
                name=""
                maxLength={100}
                className="inputCustomText"
                placeholder="Descripcion del Producto"
                id="descripcion"
                value={descrpcion}
              />
              <p class="error">{msj}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select id="estado" className="selectCustom" value={estado} onChange={(e)=>{
                setEstado(e.target.value)
              }}>
                <option value={"Activo"}>Activo</option>
                <option value={"Inactivo"}>Inactivo</option>
              </select>
            </div>

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  //Validaciones previo a ejecutar el boton
                  var precio = parseFloat(document.getElementById('precio').value);
                  var cantidadMin = parseInt(document.getElementById('cantidadMin').value);
                  var cantidadMax = parseInt(document.getElementById('cantidadMax').value);
                  var descripcion = document.getElementById('descripcion').value;

                  if (precio === "" || cantidadMin === "" || cantidadMax === "" || descripcion === "") {
                    swal("No deje campos vacíos.", "", "error");
                  } else if (isNaN(parseInt(cantidadMin))) {
                    swal("El campo cantidad mínima solo acepta números.", "", "error");
                  } else if (isNaN(parseInt(cantidadMax))) {
                    swal("El campo cantiad máxima solo acepta números.", "", "error");
                  } else if (isNaN(parseFloat(precio))) {
                    swal("El campo precio solo acepta números.", "", "error");  
                  } else if (cantidadMin <= 0) {
                    swal("El campo cantidad mínima no acepta valores negativos.", "", "error");
                  }else if (cantidadMax <= cantidadMin) {
                    swal("El campo cantidad máxima no acepta valores menores.", "", "error");
                  }else if (precio <= 0) {
                    swal("El campo precio no acepta valores negativos.", "", "error");
                  }
                  else
                    props.actualizar ? actualizarProducto() : handleNext();
                }
                }
              >
                {props.actualizar ? <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
              </Button>
            </div>
          </div>
        </div>



        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/007/059/184/non_2x/abstract-button-icon-folder-with-documents-on-a-white-background-vector.jpg'
          }
          className="imgCont"
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};