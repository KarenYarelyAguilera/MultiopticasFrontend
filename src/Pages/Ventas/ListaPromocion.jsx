//GENERADOR DE PFD
import jsPDF from 'jspdf';
import 'jspdf-autotable';
//GENERADOR DE EXCEL 
import * as XLSX from 'xlsx'

import { DataGrid,esES } from '@mui/x-data-grid';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';

import swal from '@sweetalert/with-react';
import axios from 'axios';
import { Bitacora } from '../../Components/bitacora';

//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AnalyticsIcon from '@mui/icons-material/Analytics';  //para el boton de excel 
import { Button } from '@mui/material';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

//GENERADOR DE PDF 
import { generatePDF } from '../../Components/generatePDF';
import fondoPDF from '../../IMG/FondoPDFH.jpg'

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';

export const ListaPromocion = (props) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso={
    idRol:props.idRol,
    idObj:8
  }
  useEffect(()=>{
    axios.post(urlPermisos,dataPermiso).then((response)=>setPermisos(response.data))
  },[])
  const [cambio, setCambio] = useState(0)
  const [inactivo, setInactivo] = useState(false)
  const [marcah, setMarcah] = useState()

  const urlPromociones ='http://localhost:3000/api/promociones';
  const urlPromocionesInactivas ='http://localhost:3000/api/promocionesInactivas';
  const urlDelPromocion = 'http://localhost:3000/api/promociones/eliminar';

  const [tableData, setTableData] = useState([]);
  const [tableDataInactivos, setTableDataInactivos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //COLOCAR APIS DE BITACORA AQUI---
  const urlDelBitacora ='http://localhost:3000/api/bitacora/EliminarPromocion';
  const urlSalirLista ='http://localhost:3000/api/bitacora/SalirListaPromocion';

  //-------------------------------------------------------------------
  

  const [descrpcion, setdescripcion] = useState('');
  const [msj, setmsj] = useState('');
  const [errordescripcion, setErrordescripcion] = useState(false);
  
  const [porcentaje, setporcentaje] = useState('');
  const [errorporcentaje, setErrorporcentaje] = useState(false);
  const [aviso, setaviso] = useState(false);

  const [fechaInicial, setfechaInicial] = useState('');
  const [mensaje, setmensaje] = useState('');
  const [errorfechaInicial, setErrorfechaInicial] = useState(false);

  const [fechaFinal, setfechaFinal] = useState('');
  const [mensajeF, setmensajeF] = useState('');
  const [errorfechaFinal, setErrorfechaFinal] = useState(false);

  const [cantidadmin, setcantidadmin] = useState('');
  const [advertencia, setadvertencia] = useState('');
  const [errorcantidadmin, setErrorcantidadmin] = useState(false);
  
  //const [endDate, setEndDate] = useState(null);
  //const [startDate, setStartDate] = useState(null);

  //Primer dia del mes
  const todayf = new Date();
  const firstDayOfMonth = new Date(todayf.getFullYear(), todayf.getMonth(), 1);
  const firstDayOfMonthString = firstDayOfMonth.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(firstDayOfMonthString);

    //ultimo dia del mes
    const todayE = new Date();
    const lastDayOfMonth = new Date(todayE.getFullYear(), todayE.getMonth() + 1, 0);
    const lastDayOfMonthString = lastDayOfMonth.toISOString().split('T')[0];
    const [endDate, setEndDate] = useState(lastDayOfMonthString);
  
  //limpiar filtros de la fecha
  const handleClearFilter = () => {
    setStartDate(firstDayOfMonthString);
    setEndDate(lastDayOfMonthString);
    setSearchTerm(''); // Limpiar el término de búsqueda
    // También puedes agregar lógica adicional para limpiar otros estados si es necesario

    // Recargar los registros
    setCambio(cambio + 1);
  };

  //GENERADOR DE EXCEL
const handleGenerarExcel = () => {
  const workbook = XLSX.utils.book_new();
  const currentDateTime = new Date().toLocaleString();

  // Datos para el archivo Excel
  const dataForExcel = (inactivo === false ? filteredData : tableDataInactivos).map((row, index) => ({
    'N°':row.IdPromocion,
    'Descripción':row.descripcion, 
    'Porcentaje':row.descPorcent, 
    'Fecha inicial':row.fechaInicialF, 
    'Fecha final':row.fechaFinalF, 
    'Estado':row.estado,
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['N°', 'Descripción', 'Porcentaje', 'Fecha inicial','Fecha final', ] });

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
  XLSX.writeFile(workbook, 'Lista_de_Promociones.xlsx');
};

 //IMPRIMIR PDF
 const handleGenerarReporte = () => {
  if (permisos[0].consultar === "n") {
    swal("No cuenta con los permisos para realizar esta accion","","error")
  } else {
    const formatDataForPDF = () => {
      const formattedData = (inactivo === false ? filteredData : tableDataInactivos).map((row) => {
        const fechaCre = new Date(row.fechaNacimiento);
        const fechaNacimiento = String(fechaCre.getDate()).padStart(2,'0')+"/"+
                              String(fechaCre.getMonth()).padStart(2,'0')+"/"+
                              fechaCre.getFullYear();
                              return {
                                'N°':row.IdPromocion,
                                'Descripción':row.descripcion, 
                                'Porcentaje':row.descPorcent, 
                                'Fecha inicial':row.fechaInicialF, 
                                'Fecha final':row.fechaFinalF, 
                                'Estado': row.estado,
                              };
      });
      return formattedData;
    };

    const urlPDF = 'Report_Promociones.pdf';
    const subTitulo = "LISTA DE PROMOCIONES"

    const orientation = "landscape";
  generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF);
  }

}
  //Filtracion de fechas
  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

  useEffect(() => {
    fetch(urlPromociones)
      .then(response => response.json())
      .then(data => setTableData(data));
      fetch(urlPromocionesInactivas)
      .then(response => response.json())
      .then(data => setTableDataInactivos(data));
  }, [cambio, inactivo]);

  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const filteredDataInactivos = tableDataInactivos.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [
    { field: 'IdPromocion', headerName: 'ID', width: 80 },
    { field: 'descripcion', headerName: 'Descripción', width: 590 },
    { field: 'descPorcent', headerName: 'Porcentaje', width: 120 },
    { field: 'fechaInicialF', headerName: 'Fecha inicial', width: 120 },
    { field: 'fechaFinalF', headerName: 'Fecha final', width: 120 },
    { field: 'estado', headerName: 'Estado', width: 140 },
   
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190,

      renderCell: params => (
        <div className="contActions1">
          <Button className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
            onClick={() => handleDel(params.row.IdPromocion)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  //FUNCION DE ELIMINAR 
  function handleDel(IdPromocion) {
    if (permisos[0].eliminar ==="n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    } else {
      swal({
        content: (
          <div>
  
            <div className="logoModal">¿Desea Eliminar esta Promocion?</div>
            <div className="contEditModal">
  
            </div>
  
          </div>
        ),
        buttons: {delete:'Eliminar',cancel: 'Cancelar'},
      }).then(async op => {
        switch (op) {
          case 'delete':
  
            let data = {
              IdPromocion: IdPromocion,
            };
            //Funcion de Bitacora 
            let dataB=
            {
              Id:props.idUsuario
            }; 
            const bitacora = {
              urlB: urlDelBitacora,
              activo: props.activo,
              dataB: dataB
            };
            console.log(data);
  
            await axios
              .delete(urlDelPromocion, { data })
              .then(response => {
                swal('Promocion eliminada correctamente', '', 'success');
                Bitacora(bitacora)
                setCambio(cambio + 1);
              })
              .catch(error => {
                console.log(error);
                swal('Error al eliminar la promocion', '', 'error');
              });
  
            break;
  
          default:
            break;
        }
      });
    }
    
  }
  
//FUNCION DE ACTUALIZAR
function handleUpdt(id) {
  if (permisos[0].actualizar ==="n") {
    swal("No cuenta con los permisos para realizar esta accion","","error")
  } else {
    swal({
      buttons: {
        update: 'ACTUALIZAR',
        cancel: 'CANCELAR',
      },
      content: (
        <div className="logoModal">
          ¿Desea actualizar la promocion: {id.descripcion} ?
        </div>
      ),
    }).then(
      op => {
        switch (op) {
          case 'update':
            props.data(id)
            props.update(true)
            navegate('/menuVentas/RegistroPromociones')
            break;
          default:
            break;
        }
      });
  }

};

  //Funcion de Bitacora 
  let dataB=
  {
    Id:props.idUsuario
  }; 
  const bitacora = {
    urlB: urlSalirLista,
    activo: props.activo,
    dataB: dataB
  };

  const handleBack = () => {
    Bitacora(bitacora)
    navegate('/config');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Promociones</h2>

      <div
        style={{
          height: 400,
          width: '85%',
          position: 'relative',
          left: '130px',
        }}
      >
                <div className='contDateDHH' >
          {/* <Button className="btnClearFilter" onClick={handleClearFilter}><DeleteForeverIcon></DeleteForeverIcon></Button> */}

          <span style={{ marginRight: '10px', fontFamily: 'inherit', fontWeight: 'bold' }}> DESDE: </span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Fecha de inicio"
            className='inputCustomF'
          ></input>

          <span style={{ marginLeft: '10px', marginRight: '10px', fontFamily: 'inherit', fontWeight: 'bold' }}> HASTA: </span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="Fecha de fin"
            className='inputCustomF'
          ></input>


          <Button className="btnClearFilter" onClick={handleClearFilter}><HighlightOffTwoToneIcon style={{ fontSize: '3rem' }}></HighlightOffTwoToneIcon></Button>

        </div>
        

        <div className="contFilter2">
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
          <div className="btnActionsNewReport2">
            <Button
              className="btnCreate"
              onClick={() => {
                if (permisos[0].insertar==="n") {
                  swal("No cuenta con los permisos para realizar esta accion","","error")
                } else {
                  navegate('/menuVentas/RegistroPromociones');
                }
                
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nueva
            </Button>

            <Button className="btnInactivo" onClick={() => { setInactivo(inactivo === false ? true : false) }}>
              <AddIcon style={{ marginRight: '5px' }} />
              {inactivo === false ? "Inactivos" : "Activos"}
            </Button>

            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '3px' }} />
              Generar excel
            </Button>

            <Button className="btnReport" onClick={handleGenerarReporte}> 
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar PDF
            </Button>
          </div>
        </div>
        <DataGrid
        pagination
          getRowId={tableData => tableData.IdPromocion}
          rows={inactivo === false ? filteredData : filteredDataInactivos}
          autoHeight
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // onRowClick={usuario => {
          //   swal({
          //     buttons: {
          //       update: 'Actualizar',
          //       cancel: 'Cancelar',
          //     },
          //     content: (
          //       <div className="logoModal">
          //         Que accion desea realizar con el cliente:{' '}
          //         {usuario.row.Usuario}
          //       </div>
          //     ),
          //   }).then(op => {
          //     switch (op) {
          //       case 'update':
          //         swal(
          //           <div>
          //             <div className="logoModal">Datos a actualizar</div>
          //             <div className="contEditModal">
          //               <div className="contInput">
          //                 <TextCustom text="Usuario" className="titleInput" />
          //                 <input
          //                   type="text"
          //                   id="nombre"
          //                   className='inputCustom'
          //                   value={usuario.row.Usuario}
          //                 />
          //               </div>

          //               <div className="contInput">
          //                 <TextCustom
          //                   text="Nombre de Usuario"
          //                   className="titleInput"
          //                 />
          //                 <input
          //                   type="text"
          //                   id="nombreUsuario"
          //                   className='inputCustom'
          //                   value={usuario.row.Nombre_Usuario}
          //                 />
          //               </div>
          //               <div className="contInput">
          //                 <TextCustom text="Estado" className="titleInput" />
          //                 <input
          //                   type="text"
          //                   className='inputCustom'
          //                   id="EstadoUsuario"
          //                   value={usuario.row.Estado_Usuario}
          //                 />
          //               </div>
          //               <div className="contInput">
          //                 <TextCustom
          //                   text="Contraseña"
          //                   className="titleInput"
          //                 />
          //                 <input type="text" id="contrasenia" className='inputCustom'/>
          //               </div>
          //               <div className="contInput">
          //                 <TextCustom text="Rol" className="titleInput" />
          //                 <select id="rol" className="selectCustom">
          //                   {roles.length ? (
          //                     roles.map(pre => (
          //                       <option key={pre.Id_Rol} value={pre.Id_Rol}>
          //                         {pre.Rol}
          //                       </option>
          //                     ))
          //                   ) : (
          //                     <option value="No existe informacion">
          //                       No existe informacion
          //                     </option>
          //                   )}
          //                 </select>
          //               </div>
          //               <div className="contInput">
          //                 <TextCustom text="Email" className="titleInput" />
          //                 <input
          //                   type="text"
          //                   id="Email"
          //                   className='inputCustom'
          //                   value={usuario.row.Correo_Electronico}
          //                 />
          //               </div>
          //             </div>
          //           </div>,
          //         ).then(() => {
          //           let data = {
          //             Usuario: document.getElementById('nombre').value,
          //             Nombre_Usuario:
          //               document.getElementById('nombreUsuario').value,
          //             Estado_Usuario:
          //               document.getElementById('EstadoUsuario').value,
          //             Contrasenia: document.getElementById('contrasenia').value,
          //             Id_Rol: document.getElementById('rol').value,
          //             Correo_Electronico:
          //               document.getElementById('Email').value,
          //             Id_usuario: usuario.row.id_Usuario,
          //           };

          //           if (sendData(urlUpdateUser, data)) {
          //             swal(<h1>Usuario Actualizado Correctamente</h1>);
          //           }
          //         });
          //         break;
          //       default:
          //         break;
          //     }
          //   });
          // }}
        />
      </div>
    </div>
  );
};