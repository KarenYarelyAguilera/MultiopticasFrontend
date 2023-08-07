//GENERADOR DE PFD
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { DataGrid,esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';

import logoImg  from "../../IMG/MultiopticaBlanco.png";
import fondoPDF from "../../IMG/fondoPDF.jpg";

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

//GENERADOR DE PDF 
import { generatePDF } from '../../Components/generatePDF';

import axios from 'axios';

export const ListaGenero = ({props,data,update}) => {

  const [cambio, setCambio] = useState(0)
  const [marcah, setMarcah] = useState()

  //API DE GENERO
 const urlGenero = 'http://localhost:3000/api/Genero';
 const urlDeleteGenero = 'http://localhost:3000/api/Genero/borrar';
 
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(urlGenero).then(response=>setTableData(response.data))
  }, [cambio]);

   //IMPRIMIR PDF
 const handleGenerarReporte = () => {
  const formatDataForPDF = () => {
    const formattedData = tableData.map((row) => {
      const fechaCre = new Date(row.fechaNacimiento);
      const fechaNacimiento = String(fechaCre.getDate()).padStart(2,'0')+"/"+
                            String(fechaCre.getMonth()).padStart(2,'0')+"/"+
                            fechaCre.getFullYear();
                            return {
                              'N°':row.IdGenero,
                              'País':row.descripcion, 
                            };
    });
    return formattedData;
  };

  const urlPDF = 'Report_Genero.pdf';
  const subTitulo = "LISTA DE GÉNEROS"

  generatePDF(formatDataForPDF, urlPDF, subTitulo);
};
  
  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [
    { field: 'IdGenero', headerName: 'ID Genero', width: 450 },
    { field: 'descripcion', headerName: 'Genero', width: 450 },

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
            onClick={() => handleDel(params.row.IdGenero)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];


  //FUNCION DE ACTUALIZAR 
 
  function handleUpdt(id) {
    swal({
      buttons: {
        update: 'Actualizar',
        cancel: 'Cancelar',
      },
      content: ( 
        <div  
         className="logoModal">  ¿Desea actualizar este Género: {id.descripcion}?
        </div>
      ),
    }).then((op) => {
      switch (op) {
          case 'update':
          data(id)
          update(true)
      navegate('/config/RegistroGenero')
      break;
      default:
      break;
      }
    });
  };

  //FUNCION DE ELIMINAR 
  function handleDel(id) {
    swal({
      content: (
        <div>
          <div className="logoModal">¿Desea elimiar este Género?</div>
          <div className="contEditModal">
          </div>
        </div>
      ),
        buttons: {
        cancel: 'Eliminar',
        delete: 'Cancelar',
      },
    }).then(async(op) => {

      switch (op) {
        case null:
          
          let data = {
            IdGenero: id
          };
          console.log(data);
    
          await axios .delete(urlDeleteGenero,{data}) .then(response => {
            swal('Género eliminado correctamente', '', 'success');
            setCambio(cambio + 1);
          }).catch(error => {
            console.log(error);
            swal("Error al eliminar el Género , asegúrese que no tenga relación con otros datos.", '', 'error');
          });
          break;
          default:
          break;
      }
    });
  };

  const handleBack = () => {
    navegate('/config');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Género</h2>

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
                navegate('/config/RegistroGenero');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Registro
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
          getRowId={tableData => tableData.IdGenero}
          rows={filteredData}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};
