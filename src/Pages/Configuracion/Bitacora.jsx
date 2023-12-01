import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import swal from '@sweetalert/with-react';
import { sendData } from '../../scripts/sendData';

//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import axios from 'axios';

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';

//FondoPDF
import fondoPDF from '../../IMG/FondoPDFH.jpg'
import { generatePDF } from '../../Components/generatePDF';
import * as XLSX from 'xlsx'
import AnalyticsIcon from '@mui/icons-material/Analytics'; //para el boton de excel 




export const Bitacora = (props, idRol) => {
  const [cambio, setCambio] = useState(0)
  const [pageSize, setPageSize] = useState(5); // Puedes establecer un valor predeterminado

  // const bitacora = [
  //   { IdBitacora: '', fecha: '', Id_Usuario: '', Id_Objeto:'', accion:'' , descripcion:'' },
 
  // ];

  // function depurarBitacora(bitacora, nivelMinimo = 'info', fechaLimite = null) {
  //   // Filtrar por nivel y fecha si se proporcionan
  //   const bitacoraFiltrada = bitacora.filter((registro) => {
  //     const nivelValido = registro.nivel === nivelMinimo || (registro.nivel !== 'error' && registro.nivel !== 'advertencia');
  //     const fechaValida = fechaLimite ? new Date(registro.fecha) >= new Date(fechaLimite) : true;
  //     return nivelValido && fechaValida;
  //   });
  
  //   return bitacoraFiltrada;
  // }

  const urlBitacora =
    "http://localhost:3000/api/bitacora";

  const urlOnOffBitacora = "http://localhost:3000/api/parametro/bitacora"

  const urlSalirListaBitacora =
    "http://localhost:3000/api/bitacora/SalirListaBitacora";


  //   const urlProducto =
  // "http://localhost/APIS-Multioptica/bitacora/controller/bitacora.php?op=Bitacora";

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(urlBitacora).then(response => {
      setTableData(response.data);
    })
      .catch(error => console.log(error));
  }, [cambio]);

  // useEffect(() => {
  //   fetch(urlBitacora)
  //     .then(response => response.json())
  //     .then(data => setTableData(data));
  // }, [cambio]);

  const navegate = useNavigate();

  const [permisos, setPermisos] = useState([]);
  const urlPermisos = 'http://localhost:3000/api/permiso/consulta'
  const dataPermiso = {
    idRol: idRol,
    idObj: 2
  }
  useEffect(() => {
    axios.post(urlPermisos, dataPermiso).then((response) => setPermisos(response.data))
  }, [])


  const handleGenerarExcel = () => {
    const workbook = XLSX.utils.book_new();
    const currentDateTime = new Date().toLocaleString();

    // Datos para el archivo Excel
    const dataForExcel = filteredData.map((row, index) => ({
      '#': row.IdBitacora,
      'Usuario': row.Usuario,
      'Objeto': row.Objeto,
      'Accion': row.accion,
      'Descripcion': row.descripcion,
      'Fecha': row.fecha,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { header: ['#', 'Usuario', 'Objeto', 'Accion', 'Descripcion', 'Fecha'] });



    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
    XLSX.writeFile(workbook, 'Registro_Bitacora.xlsx');
  };


  const handleGenerarReporte = () => {

    const formatDataForPDF = () => {
      const formattedData = filteredData.map((row) => {
        const fechaCre = new Date(row.fecha);
        const fecha = String(fechaCre.getDate()).padStart(2, '0') + "/" +
          String(fechaCre.getMonth()).padStart(2, '0') + "/" +
          fechaCre.getFullYear();
        return {
          '#': row.IdBitacora,
          'Usuario': row.Usuario,
          'Objeto': row.Objeto,
          'Accion': row.accion,
          'Descripcion': row.descripcion,
          'Fecha': row.fecha,

        };
      });
      return formattedData;
    };

    const urlPDF = 'Reistro_Bitacora.pdf';
    const subTitulo = "BITACORA"

    const orientation = "landscape";
    generatePDF(formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF);

  }



  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [
    { field: 'IdBitacora', headerName: 'ID', width: 170 },
    { field: 'Usuario', headerName: 'Usuario', width: 170 },
    { field: 'Objeto', headerName: 'Modulo', width: 170 },
    { field: 'accion', headerName: 'Acción', width: 180 },
    { field: 'descripcion', headerName: 'Descripción', width: 470 },

    {
      field: 'fecha',
      headerName: 'Fecha',
      width: 170,
      headerAlign: 'center',
    /*   renderCell: (params) => (
        <span>
          {new Date(params.value).toLocaleDateString('es-ES')}
        </span>
      ),
 */

    },


  ];

  function handleUpdt(param) {

  }

  function handleDel(id) {

  }

  //Funcion de bitacora 
  let dataB = {
    Id: props.idUsuario
  }

  const handleBack = () => {
    //axios.post(urlSalirListaBitacora,dataB) //BOTON DE RETROCESO API BITACORA 
    navegate('/usuarios');
  };

  const handleUpdateBitacora = () => {
    let parametro = {
      Parametro: props.bitacora === "si" ? "no" : "si"
    }

    axios.put(urlOnOffBitacora, parametro).then(() => {
      let cambio = props.bitacora === "si" ? "no" : "si"

      props.bita(cambio)

      if (props.bitacora === "si") {
        swal("La bitacora esta Inactiva", "", "success")
      } else if (props.bitacora === "no") {
        swal("La bitacora esta Activa", "", "success")
      }

    })
  }

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Bitacora</h2>

      <div
        style={{
          height: 400,
          width: '85%',
          position: 'relative',
          left: '130px',
        }}
      >
        <div className="contFilter1">
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
          <div className="btnActionsNewReport1">
            {props.bitacora === "si" ?
              <Button className="btnOff" onClick={handleUpdateBitacora}>
                Desactivar Bitacora
              </Button> :
              <Button className="btnOn" onClick={handleUpdateBitacora}>
                Activar Bitacora
              </Button>}

            <Button className="btnExcel" onClick={handleGenerarExcel}>
              <AnalyticsIcon style={{ marginRight: '3px' }} />
              Generar Excel
            </Button>

            <Button className="btnReport"
              onClick={handleGenerarReporte}>
              <PictureAsPdfIcon style={{ marginRight: '5px' }} /> Generar PDF
            </Button>

          </div>

        </div>
        <DataGrid
          pagination
          getRowId={tableData => tableData.IdBitacora}
          rows={filteredData}
          autoHeight
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>
    </div>
  );
};
