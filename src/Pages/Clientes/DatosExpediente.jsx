import React from 'react';
import Button from '@mui/material/Button';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';


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
//URL
 const urlNuevoExpediente='http://localhost:3000/api/Expediente/NuevoExpediente'
const urlEliminarExpediente='http://localhost:3000/api/Expediente/DeleteExpediente'
const urlExpediente='http://localhost:3000/api/Expediente'
const urlNuevoDiagnostico='http://localhost:3000/api/ExpedienteDetalle/NuevoExpedinteDetalle'
const urlDiagnosticos='http://localhost:3000/api/ExpedienteDetalle'

const urlClientes = 'http://localhost:3000/api/clientes';
//const urlEmployees='http://localhost:3000/api/empleado'
const urlEmployees =
'http://localhost:3000/api/empleado';

export const DatosExpediente = ( props) => {

  const [tableData, setTableData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().slice(0, 10));
  const [Empleado, setIdEmpleado] = useState([]);
  const [cambio, setCambio] = useState(0);


  
  useEffect(() => {
    setTableData([]);
    axios.get(urlEmployees).then(response => {
      setIdEmpleado(response.data)
    }).catch(error => console.log(error))
  }, []);

//DIAGNOSTICO
  useEffect(() => {
    axios.post(urlDiagnosticos,props.id).then(response =>{
      setTableData(response.data)
    }).catch(error => console.log(error))
  }, [cambio]);

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );



  const handleBack = () => {
    navegate('/menuClientes/ListaExpedientes');
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
            <EditIcon></EditIcon>
          </Button>

          <Button
            className="btnImprimirExp"
//onClick={() => handleNewExpediente(params.row)}
          >
            <AddIcon></AddIcon>
          </Button>
          
        </div>
      ),
    },
  ];
   //PANTALLA MODAL---------------------------------------------------------------------------
  function handleUpdt(id) {
    console.log(id);
    swal(
      <div>
        <div className="logoModal">DATOS GENERALES</div>
        <div className="contEditModal">
        <div className="contInput">
              <TextCustom text="Fecha de Consulta" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha de Consulta"
                id="fechaconsulta"
                value={id.fechaConsulta}
                disabled
              />
            </div>
            
            <div className="contInput">
              <TextCustom text="Optometrista" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Optometrista"
                id="Optometrista"
                value={id.Optometrista}
                disabled
              />
            </div>
            <div className="contInput">
              <TextCustom text="Asesor de Venta" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Asesor de Venta"
                id="Asesor"
                value={id.AsesorVenta}
                disabled
              />
            </div>
            <div className="contInput">
              <TextCustom text="Fecha de Expiracion" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha de Expiracion"
                id="fechaexpiracion"
                value={id.fechaExpiracion}
                disabled
              />
            </div>
            <div className="contInput">
              <TextCustom text="Antecedentes Clinicos" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={100}
                className="inputCustom"
                placeholder="Antecedentes Clinicos"
                id="antecendentes"
                value={id.Antecedentes}
                disabled
              />
            </div> 
            <h3>
            ----------------DIAGNOSTICO-----------------
            </h3>
            <div className="contInput">
              <TextCustom text="Esfera OD" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Esfera OD"
                id="ODEsfera"
                value={id.ODEsfera}
                disabled
              />
            </div>
            <div className="contInput">
              <TextCustom text="Esfera OI" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Esfera OI"
                id="OIEsfera"
                value={id.OIEsfera}
                disabled
              />
            </div>

            <div className="contInput">
              <TextCustom text="Cilindro OD" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Cilindro OD"
                id="ODCilindro"
                value={id.ODCilindro}
                disabled
              />
            </div>

            <div className="contInput">
              <TextCustom text="Eje OD" className="titleInput" />
              <input
            
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Eje OD"
                id="ODEje"
                value={id.ODEje}
                disabled
              />
            </div>

            <div className="contInput">
              <TextCustom text="Adicion OD" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Adicion OD"
                id="AdicionOD"
                value={id.ODAdicion}
                disabled
              />
            
            </div>

            <div className="contInput">
              <TextCustom text="Adicion OI" className="titleInput" />

              <input
             
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Adicion OI"
                id="AdicionOI"
                value={id.OIAdicion}
                disabled
              />
            </div>

            <div className="contInput">
              <TextCustom text="Altura OD" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Altura OD"
                id="AlturaOD"
                value={id.ODAltura}
                disabled
              />
            </div>

            <div className="contInput">
              <TextCustom text="Altura OI" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Altura OI"
                id="AlturaOI"
                value={id.OIAltura}
                disabled
              />
        
            </div>

            <div className="contInput">
              <TextCustom text="DP OD" className="titleInput" />

              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="DP OD"
                id="DistanciapupilarOD"
                value={id.ODDistanciaPupilar}
                disabled
              />
            </div>

            <div className="contInput">
              <TextCustom text="DP OI" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="DP OI"
                id="DistanciapupilarOI"
                value={id.OIDistanciaPupilar}
                disabled
              />
            </div>

            <div className="contInput">
              <TextCustom text="Enfermedad presentada" className="titleInput" />
              <input
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Enfermedad presentada"
                id="enfermedadpresentada"
                value={id.diagnostico}
                disabled
              />
            </div>
        </div>
      </div>,
    ).then( async() => {
    });

  }

  //Insertar un nuevo expediente
  
  const handleNext = async () => {
   let Cliente = document.getElementById('cliente').value;
   let Empleado = document.getElementById('empleado').value;
   let fechaCreacion= document.getElementById('fecha').value;

    let fecha = new Date(fechaCreacion)

    let anio = fecha.getFullYear().toString();
    let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    let dia = fecha.getDate().toString().padStart(2, "0");

    let fechaFormateada = anio + "/" + mes + "/" + dia;

    let data = {
      IdCliente:Cliente,
      fechaCreacion:fechaFormateada,
      IdEmpleado:Empleado,
   }

   await axios.post(urlNuevoExpediente,data).then(response=>{
     swal('Expediente creado con exito', '', 'success').then(result => {
       navegate('/menuClientes/ListaExpedientes');
     });

   }).catch(error=>{
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
      <div className="infoAddCompra">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Cliente" className="titleInput" />
              <input
                 type="text"
                 name="input1"
                 className="inputCustom"
                 maxLength={15}
                 placeholder="Cliente"
                 variant="standard"
                 id="cliente"
                 label="Usuario"
                 value={props.datosclientes.idCliente || props.idCliente}
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
               onChange={(e) => setFechaActual(e.target.value)}
               disabled
              />
            </div>
            <div className="contInput">
              <TextCustom text="Empleado" className="titleInput" />
            
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
            <div className="contBtnStepper1">
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
              onClick= {handleNext} //INSERTA 
              className="btnCreate1">
                <AddIcon style={{ marginRight: '5px' }} />
                Guardar
              </Button>
              <Button className="btnReport1" onClick={() => {}}>
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