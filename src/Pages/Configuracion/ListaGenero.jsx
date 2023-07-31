import { DataGrid,esES } from '@mui/x-data-grid';
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

import '../../Styles/Usuarios.css';
import { TextCustom } from '../../Components/TextCustom';
import axios from 'axios';

export const ListaGenero = (props) => {

  const [marcah, setMarcah] = useState()
  const [cambio, setCambio] = useState(0)

  //API DE GENERO
 const urlGenero = 'http://localhost:3000/api/Genero';

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(urlGenero).then(response=>setTableData(response.data))
  }, [cambio]);
  
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

    // {
    //   field: 'borrar',
    //   headerName: 'Acciones',
    //   width: 200,

    //   renderCell: params => (
    //     // <div className="contActions">
    //     //   <Button
    //     //     className="btnEdit"
    //     //     onClick={() => handleUpdt(params.row.IdGenero)}
    //     //   >
    //        // <EditIcon></EditIcon>
    //       // </Button> */
    //       // <Button
    //       //   className="btnDelete"
    //       //  onClick={() => handleDel(params.row.IdGenero)}
    //       // >
    //       //   <DeleteForeverIcon></DeleteForeverIcon>
    //       // </Button>
    //     //</div>
    //   ),
    // },
  ];

  // function handleUpdt(id) {
  //   swal({
  //     content: (
  //       <div>
  //         <div className="logoModal">Datos a actualizar</div>
  //         <div className="contEditModal">
  //           <div className="contInput">
  //             <TextCustom text="Genero" className="titleInput" />
  //             <input
  //               type="text"
  //               id="IdGenero"
  //               className="inputCustom"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //     buttons: ["Cancelar","Actualizar"]
  //   }).then((op) => {

  //     switch (op) {
  //       case true:
  //         let data = {
  //           IdMarca: id,
  //           descripcion: document.getElementById("marca").value,
  //         };
    
  //         console.log(data);
    
    
  //         if (sendData(urlUpdateMarca, data)) {
  //           swal(<h1>Marca Actualizada Correctamente</h1>);
  //           setcambio(cambio+1)
  //         }
  //         break;
      
  //       default:
  //         break;
  //     }
      
  //   });

  // }

  // function handleDel(id) {
  //   swal({
  //     content: (
  //       <div>
  //         <div className="logoModal">Desea Elimiar este Metodo de Pago?</div>
  //         <div className="contEditModal">
            
  //         </div>
  //       </div>
  //     ),
  //     buttons: ["Eliminar","Cancelar"]
  //   }).then((op) => {

  //     switch (op) {
  //       case null:
  //         let data = {
  //           IdMarca: id
  //         };
    
  //         console.log(data);
    
    
  //         if (sendData(urlDelMarca, data)) {
  //           swal(<h1>Marca Eliminada Correctamente</h1>);
  //           setcambio(cambio+1)
  //         }
  //         break;
      
  //       default:
  //         break;
  //     }
      
  //   });

  // }



  const handleBack = () => {
    navegate('/config');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Genero</h2>

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
            {/* <Button
              className="btnCreate"
              onClick={() => {
                navegate('/config/RegistroGenero');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Registro
            </Button> */}
            <Button className="btnReport">
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
