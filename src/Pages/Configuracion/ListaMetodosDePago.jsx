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

import axios from 'axios'; //Agregarlo siempre porque se necesita para exportar Axios para que se puedan consumir las Apis 

export const ListaMetodosDePago = ({props,data,update}) => {

  const [cambio, setCambio] = useState(0)
  const [marcah, setMarcah] = useState()

  const [Modelo, setModelo] = useState([]);
  const [roles, setRoles] = useState([]);
  

  //URL DE LAS APIS DE METODOS DE PAGO
    const urlMetodosPago = 'http://localhost:3000/api/tipopago';
    const urlDelMetodosPago = 'http://localhost:3000/api/tipopago/eliminar';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

 useEffect(() => {
  axios.get(urlMetodosPago).then(response=>setTableData(response.data))
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
                                'N°':row.IdTipoPago,
                                'Método':row.descripcion, 
                              };
      });
      return formattedData;
    };
  
    const urlPDF = 'Report_MetodosPago.pdf';
    const subTitulo = "LISTA DE MÉTODOS DE PAGO"
  
    const orientation = "landscape";
  generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation);
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
    { field: 'IdTipoPago', headerName: 'ID Método de Pago', width: 400 },
    { field: 'descripcion', headerName: 'Método', width: 400 },

    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 190,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit" onClick={() => handleUpdt(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
           onClick={() => handleDel(params.row.IdTipoPago)}>
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];
 
  
//FUNCION DE ELIMINAR 
function handleDel(id) {
  swal({
    content: (
      <div>
        <div className="logoModal">¿Desea Eliminar este Método de Pago?</div>
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
          IdTipoPago:id
        }; 
        console.log(data);

        await axios .delete(urlDelMetodosPago,{data}) .then(response => {
            swal('Método de Pago eliminado correctamente', '', 'success');
            setCambio(cambio + 1);
          }).catch(error => {
            console.log(error);
            swal('Error al eliminar', '', 'error');
          });

        break;
        default:
        break;
    }
  });
};
  
  //FUNCION DE ACTUALIZAR DATOS 
  function handleUpdt(id) {
    swal({
      buttons: {
        update: 'Actualizar',
        cancel: 'Cancelar',
      },
      content: (
        <div className="logoModal">
          ¿Desea actualizar el método de pago: {id.descripcion}?
        </div>
      ),
    }).then((op)  => {
        switch (op) {
          case 'update':
            data(id)
            update(true)
            navegate('/config/MetodosDePago')
            break;
            default:
            break;
        }
      });
  };

//Boton de atras 
  const handleBack = () => {
    navegate('/config');
  };

  //ESTRUCTURA 
  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Método de Pago</h2>

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
                navegate('/config/MetodosDePago');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo
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
          getRowId={tableData => tableData.IdTipoPago}
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