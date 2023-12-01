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

export const ListaPromocionMarcas = () => {

  const [cambio, setcambio] = useState(0)
  const [marcah, setMarcah] = useState()

  const urlMarcas =
    'http://localhost/APIS-Multioptica/producto/controller/producto.php?op=Marcas';

  const urlUpdateMarca = 'http://localhost/APIS-Multioptica/producto/controller/producto.php?op=updMarca'
  
  const urlDelMarca = 'http://localhost/APIS-Multioptica/producto/controller/producto.php?op=delMarca'

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(urlMarcas)
      .then(response => response.json())
      .then(data => setTableData(data));
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
    { field: 'IdPromocion', headerName: 'ID', width: 600 },
    { field: 'Promocion', headerName: 'Promoción', width: 600 },
    { field: 'Marca', headerName: 'Marca', width: 600 },

    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 200,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit"
            onClick={() => handleUpdt(params.row.IdMarca)}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
           onClick={() => handleDel(params.row.IdMarca)}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </div>
      ),
    },
  ];

  function handleUpdt(id) {
    swal({
      content: (
        <div>
          <div className="logoModal">Datos a actualizar</div>
          <div className="contEditModal">
            <div className="contInput">
              <TextCustom text="Marca" className="titleInput" />
              <input
                type="text"
                id="marca"
                className="inputCustom"
              />
            </div>
          </div>
        </div>
      ),
      buttons: ["Cancelar","Actualizar"]
    }).then((op) => {

      switch (op) {
        case true:
          let data = {
            IdMarca: id,
            descripcion: document.getElementById("marca").value,
          };
    
          console.log(data);
    
    
          if (sendData(urlUpdateMarca, data)) {
            swal(<h1>Marca Actualizada Correctamente</h1>);
            setcambio(cambio+1)
          }
          break;
      
        default:
          break;
      }
      
    });

  }

  function handleDel(id) {
    swal({
      content: (
        <div>
          <div className="logoModal">Desea Elimiar esta marca?</div>
          <div className="contEditModal">
            
          </div>
        </div>
      ),
      buttons: ["Eliminar","Cancelar"]
    }).then((op) => {

      switch (op) {
        case null:
          let data = {
            IdMarca: id
          };
    
          console.log(data);
    
    
          if (sendData(urlDelMarca, data)) {
            swal(<h1>Marca Eliminada Correctamente</h1>);
            setcambio(cambio+1)
          }
          break;
      
        default:
          break;
      }
      
    });

  }



  const handleBack = () => {
    navegate('/inventario');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista Promocio de Marcas</h2>

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
                navegate('/menuInventario/RegistroMarcas');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Crear PromMarca
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar PDF
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdMarca}
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
