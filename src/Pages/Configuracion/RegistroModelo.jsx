import React from 'react';
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
import axios from 'axios'; //Agregarlo siempre porque se necesita para exportar Axios para que se puedan consumir las Apis 
import { Bitacora } from '../../Components/bitacora.jsx';
//modal
import { DataGrid, esES } from '@mui/x-data-grid';

//APIS DE MODELO 
const urlMarcas = 'http://194.163.45.55:4000/api/marcas'; 
const urlInsertModelo ='http://194.163.45.55:4000/api/modelos/crear';
const urlUpdateModelo ='http://194.163.45.55:4000/api/modelo/actualizar';
const urlInsertBitacora ='http://194.163.45.55:4000/api/bitacora/insertmodelo';
const urlUpdateBitacora ='http://194.163.45.55:4000/api/bitacora/actualizarmodelo';

//para la modal 
ReactModal.setAppElement('#root');

export const RegistroModelo = (props) => {

  const [Marca, setMarca] = useState([])

  const [modelo, setmodelo] = React.useState(props.data.Modelo ||'');
  const [leyenda, setleyenda] = React.useState(false);
  const [errormodelo, setErrorModelo] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState(props.data.IdModelo || null);
  const [year, setyear] = React.useState(props.data.anio ||'');
  const [aviso, setaviso] = React.useState(false);
  const [erroranio, setErroranio] = React.useState(false);

  const [estado, setEstado] = useState(props.data.estado || null)

  const navegate = useNavigate();

    //hooks para la modal
    const [isMarcaModalOpen, setIsMarcaModalOpen] = useState(false);
    const [filtroMarca, setFiltroMarca] = useState('');
    const [pageSize, setPageSize] = useState(5);
  
    const openMarcaModal = () => {
      setIsMarcaModalOpen(true);
    };
    
    const closeMarcaModal = () => {
      setIsMarcaModalOpen(false);
    };
  
    const [Marcas, setMarcas] = useState([]);
    useEffect(() => {
      // Cargar la lista de marcas al inicio
      fetch(urlMarcas)
        .then((response) => response.json())
        .then((data) => setMarcas(data));
    }, []);
  
     // Nueva función para seleccionar una marca
   const handleSelectMarcas = (selectedMarcas) => {
    if (selectedMarcas) {
      setSelectedOption({
        value: selectedMarcas.IdMarca,
        label: `${selectedMarcas.IdMarca} - ${selectedMarcas.descripcion}`,
      });
      closeMarcaModal();
    }
  };

  //Se usa para mostrar informacion en un listbox en este caso es el de marca.
  useEffect(() => {
    axios.get (urlMarcas).then (response=>setMarca(response.data))
  }, []);

 //INSERTAR MODELO
 const handleNext = () => {
  let IdMarca = parseInt(document.getElementById("IdMarca").value);
  let detalle = document.getElementById("detalle").value;
  let anio = document.getElementById("anio").value;
  let estado = document.getElementById('estado').value;

 
  let data = {
    IdMarca: IdMarca,
    detalle: detalle,
    anio: anio,
    estado: estado,
  };
   let dataB =
   {
     Id: props.idUsuario
   };
   const bitacora = {
     urlB: urlInsertBitacora,
     activo: props.activo,
     dataB: dataB
   }; 
   console.log(data);

  //Consumo de API y lanzamiento se alerta
  axios.post(urlInsertModelo, data).then(response => {
    console.log(response);
    if (response.data==false)
    {
      swal('¡Este modelo ya existe!', '', 'error')
    } else{
      swal('Modelo agregado con exito', '', 'success').then(result => {
      Bitacora(bitacora)
      navegate('/config/lista');
    });
    }
  }).catch(error => {
    console.log(error);
    swal('Error al crear el modelo, ingrese los datos correctamente, puede que alguno de estos ya exista.', '', 'error')
  })
};

//ACTUALIZAR
const actualizarModelo = async () => {
  let IdMarca = parseInt(document.getElementById("IdMarca").value);
  let detalle = document.getElementById("detalle").value;
  let anio = document.getElementById("anio").value;
  let estado = document.getElementById('estado').value;


  const data = {
    IdMarca: IdMarca,
    detalle: detalle,
    anio: anio,
    estado: estado,
    IdModelo: props.data. IdModelo, 
  };
  let dataB =
   {
     Id: props.idUsuario
   };
   const bitacora = {
     urlB: urlUpdateBitacora,
     activo: props.activo,
     dataB: dataB
   }; 
   console.log(data);

   axios.put(urlUpdateModelo, data).then(response => {
    console.log(response);
    if (response.data==false)
    {
      swal('¡Este modelo ya existe!', '', 'error')
    } else{
      swal("Modelo actualizado correctamente", "", "success").then(() => {
        Bitacora(bitacora)
        props.limpiarData({});
        props.limpiarUpdate(false)
        navegate('/config/lista');
    });
    }
  }).catch(error => {
    console.log(error);
    swal('Error al actualizar este modelo, por favor revise todos los campos.', '', 'error')
    // axios.post(urlErrorInsertBitacora, dataB)
  })
};


  //BOTON DE RETROCESO
  const handleBack = () => {
    swal({
      title: 'Advertencia',
      text: 'Hay un proceso de creación de modelo ¿Estás seguro que deseas salir?',
      icon: 'warning',
      buttons: ['Cancelar', 'Salir'],
      dangerMode: true,
    }).then((confirmExit) => {
      if (confirmExit) {
        props.limpiarData({});
        props.limpiarUpdate(false)
        props.update(false)
        props.Data({})
        navegate('/config/lista');
      } else {
      }
    });
  };
   // MAGIA DE SELECCIONAR MARCA
   const handleCellClic = (params) => {
    const rowData = params.row;
    setMarcas(rowData)
    console.log(Marcas.descripcion);
    closeMarcaModal()
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
  
 
  const columns = [
  
  ];

  
  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
      {props.actualizar ? <h2>Actualizar Modelo</h2> : <h2>Registro de Modelo</h2>}
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
          <div className="contNewCita">
              <TextCustom text="Marca" className="titleInput" />
              <div className='inputContainer' style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  //onClick={openModal}
                  className="inputCustom"
                  placeholder="Seleccione la marca"
                  disabled
                  onChange={handleCellClic}
                  value={Marcas.descripcion}
                  style={{ width: '300px' }}
                />
                <Button className="btnClearFilter" onClick={openMarcaModal}><PersonSearchIcon style={{ fontSize: '3rem'}}></PersonSearchIcon></Button>
              </div>
            </div>
            <ReactModal
              style={customStyles}
              isOpen={isMarcaModalOpen}
              onRequestClose={closeMarcaModal}
              contentLabel="Lista de Marcas"
              ariaHideApp={false} >
              <div>
          
              <h2 style={{ fontSize: '2.5rem',marginBottom: '10px' }}>Seleccione la marca</h2>
              
          
                {/* Tabla o cualquier otro componente para mostrar la lista de clientes */}
                <DataGrid
          getRowId={Marquitas => Marquitas.IdMarca}
          rows={Marca}
          columnas={columns}
          onCellClick={handleCellClic}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          pagination
          autoHeight
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}

          columns={[
            { field: 'IdMarca', headerName: 'ID', width: 400 },
            { field: 'descripcion', headerName: 'Marca', width: 500 },
          ]}
        style={{ fontSize: '14px' }} // Ajusta el tamaño de la letra aquí
                  onSelectionModelChange={(selection) => {
                    // Ensure that selection.selectionModel is defined and not empty
                    if (selection.selectionModel && selection.selectionModel.length > 0) {
                      const selectedMarcaId = selection.selectionModel[0];
                      const selectedMarc = Marcas.find(
                        (Marc) => Marc.IdMarca === selectedMarcaId
                      );
                      // Check if selectedClient is not undefined before calling handleSelectCliente
                      if (selectedMarc) {
                        handleSelectMarcas(selectedMarc);
                      }
                    }
                  }}
        />
                {/* Botón para cerrar el modal */}
                <Button className="btnCloseModal" onClick={closeMarcaModal} style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  Cerrar
                </Button>
              </div>
            </ReactModal>
            
          
            <div className="contInput">
              <TextCustom text="Modelo" className="titleInput" />

              <input
              onKeyDown={e => {
                setmodelo(e.target.value);
                if (modelo === '') {
                  setErrorModelo(true);
                  setleyenda('Los campos no deben estar vacíos');
                } else {
                  var regex = /^[A-Z0-9-]+(?: [A-Z0-9-]+)*$/;
                  if (!regex.test(modelo)) {
                    setErrorModelo(true);
                    setleyenda('Solo debe ingresar letras mayúsculas, números, y guiones, con un espacio entre palabras si es necesario');
                  } else if (/(.)\1{2,}/.test(modelo)) {
                    setErrorModelo(true);
                    setleyenda('No se permiten letras consecutivas repetidas');
                  } else {
                    setErrorModelo(false);
                    setleyenda("");
                  }
                }
              }}
                onChange={e => setmodelo(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                error={errormodelo}

                helperText={leyenda}
                type="text"
                name=""
                maxLength={13}
                className="inputCustom"
                placeholder="Modelo"
                id="detalle"
                value={modelo}
              />
              <p class="error">{leyenda}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Año" className="titleInput" />
                <input
                type="text"
                //value={detalle}
                onChange={(e) => setyear(e.target.value)}
                onKeyDown={(e) => {
                  const year = parseInt(e.target.value + e.key);
                  if (isNaN(year) || year < 2000 || year > 2050) {
                    setErroranio(true);
                    setaviso("El año ingresado es invalido");
                  } else {
                    setErroranio(false);
                    setaviso("");
                  }
                }}
             
                error={erroranio}
                name=""
                maxLength={4}
                className="inputCustom"
                placeholder="Año"
                id="anio"
                value={year}
              />
               <p class="error">{aviso}</p> 
            </div>

            <div className="contInput">
              <TextCustom text="Estado" className="titleInput" />
              <select id="estado" className="selectCustom" value={estado} onChange={(e) => {
                setEstado(e.target.value)
              }}>
                <option value={'Activo'}>Activo</option>
                <option value={'Inactivo'}>Inactivo</option>
              </select>
            </div>
          
            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={()=>
                {
                  var modelo = document.getElementById("detalle").value;
                  var año = document.getElementById("anio").value;
                  var estado = document.getElementById('estado').value;
                   if (modelo === "" || año === "") {
                    swal("No deje campos vacíos.", "", "error");
                  }  else if (!/^[A-Z0-9-]+(?: [A-Z0-9-]+)*$/.test(modelo)) {
                    swal("El campo modelo solo acepta letras mayusculas guiones y numeros.", "", "error");
                  }else if (isNaN(año) || año < 2000 || año > 2050) {
                    swal("El campo año es invalido.", "", "error");
                  }
                  else{
                    props.actualizar ? actualizarModelo() : handleNext();
                  }
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
            'https://static.vecteezy.com/system/resources/previews/001/890/486/non_2x/summer-sunglasses-accessory-flat-style-icon-free-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};
