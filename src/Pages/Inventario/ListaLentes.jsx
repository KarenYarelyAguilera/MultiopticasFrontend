import { DataGrid,esES } from '@mui/x-data-grid';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router';

import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';
import axios from 'axios';
import { generatePDF } from '../../Components/generatePDF';
//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';

export const ListaLentes = ({idRol,data,update}) => {
  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso={
    idRol:idRol,
    idObj:3
  }
  useEffect(()=>{
    axios.post(urlPermisos,dataPermiso).then((response)=>setPermisos(response.data))
  },[])

  const urlLentes ='http://localhost:3000/api/Lentes';
  const urlLentesInactivos ='http://localhost:3000/api/LentesInactivos';

  const urlLentesEliminar ='http://localhost:3000/api/Lentes/BorrarLente';


  const [cambio, setCambio] = useState(0)
  const [inactivo, setInactivo] = useState(false)
  const [tableData, setTableData] = useState([]);
  const [tableDataInactivos, setTableDataInactivos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [Lente, setLente] = useState([]);

  useEffect(() => {
    fetch(urlLentes)
    .then(response => response.json())
    .then(data => setTableData(data));
  fetch(urlLentesInactivos)
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


  const handleGenerarReporte = () => {
    if (permisos[0].consultar==="n") {
      swal("No cuenta con los permisos para realizar esta accion","","error")
    }else{
    const formatDataForPDF = () => {
      const formattedData = filteredData.map((row) => {
        const fechaCre = new Date(row.fechaCompra);
        const fechaCompra = String(fechaCre.getDate()).padStart(2, '0') + "/" +
          String(fechaCre.getMonth()).padStart(2, '0') + "/" +
          fechaCre.getFullYear();
        return {
          'ID':row.IdLente,
          'Lente':row.lente,
          'Precio': row.precio,
        };
      });
      return formattedData;
    };

    const urlPDF = 'Reporte_Lentes.pdf';
    const subTitulo = "LISTA DE LENTES "

    const orientation = "landscape";
  generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation);
        
}
  };


  const columns = [
    { field: 'IdLente', headerName: 'ID', width: 380 },
    { field: 'lente', headerName: 'Tipo de lente', width: 380 },
    { field: 'precio', headerName: 'Precio', width: 380 },
    { field: 'estado', headerName: 'Estado', width: 100, headerAlign: 'center' },
   
    
    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 380,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
           onClick={() => handleDel(params.row.IdLente)}>
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  

//FUNCION DE ELIMINAR 
function handleDel(id) {
  if (permisos[0].eliminar ==="n") {
    swal("No cuenta con los permisos para realizar esta accion","","error")
  }else{
    swal({
      content: (
        <div>
          <div className="logoModal">¿Desea eliminar este Lente?</div>
          <div className="contEditModal"> 
          </div>
        </div>
      ),
  
      buttons: {
        cancel: 'Eliminar',
        delete: 'Cancelar',
      },
    }).then(async (op) => {
  
      switch (op) {
        case null:
          let data = {
            IdLente:id
          }; 
          console.log(data);
  
          await axios .delete(urlLentesEliminar,{data}) .then(response => {
              swal('Modelo eliminado correctamente', '', 'success');
              setCambio(cambio + 1);
            }).catch(error => {
              console.log(error);
              swal('Error al eliminar el lente, asegúrese que no tenga relación con otros datos', '', 'error');
            });
  
          break;
          default:
          break;
      }
    });
  }
  
};

    //FUNCION DE ACTUALIZAR DATOS 
    function handleUpdt(id) {
      if (permisos[0].actualizar==="n") {
        swal("No cuenta con los permisos para realizar esta accion","","error")
      }else{
        swal({
          buttons: {
            update: 'Actualizar',
            cancel: 'Cancelar',
          },
          content: (
            <div className="logoModal">
              ¿Desea actualizar este Lente: {id.lente}?
            </div>
          ),
        }).then((op)  => {
            switch (op) {
              case 'update':
                data(id)
                update(true)
                navegate('/Inventario/RegistroLente')
                break;
                default:
                break;
            }
          });
      }
     
    };

  const handleBack = () => {
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Lentes</h2>

      <div
        style={{
          height: 400,
          width: '85%',
          position: 'relative',
          left: '130px',
        }}
      >
        <div className="contFilter">
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
          <div className="btnActionsNewReport">
            <Button
              className="btnCreate"
              onClick={() => {
                if (permisos[0].insertar==="n") {
                  swal("No cuenta con los permisos para realizar esta accion","","error")
                }else{
                  navegate('/Inventario/RegistroLente');
                }
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo
            </Button>

            
            <Button className="btnInactivo" onClick={() => { setInactivo(inactivo === false ? true : false) }}>
              <AddIcon style={{ marginRight: '5px' }} />
              {inactivo === false ? "Inactivos" : "Activos"}
            </Button>

            <Button className="btnReport"
             onClick={handleGenerarReporte}
            >
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdLente}
          rows={inactivo === false ? filteredData : filteredDataInactivos}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};