import { DataGrid, esES} from '@mui/x-data-grid';
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


export const ListaModelos = () => {

  const [cambio, setcambio] = useState(0)
  const [marcah, setMarcah] = useState()

  const urlMarcas =
    'http://localhost/APIS-Multioptica/producto/controller/producto.php?op=Marcas';

    const urlModelos =
    'http://localhost/APIS-Multioptica/producto/controller/producto.php?op=modelos';
    

  const urlUpdateModelo = 'http://localhost/APIS-Multioptica/producto/controller/producto.php?op=updModelo'
  
  const urlDelModelo = 'http://localhost/APIS-Multioptica/producto/controller/producto.php?op=delModelo'

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [Marca, setMarca] = useState([])

  useEffect(() => {
    fetch(urlModelos)
      .then(response => response.json())
      .then(data => setTableData(data));
  }, [cambio]);

  useEffect(()=>{
    fetch(urlMarcas).then(response =>response.json()).then(data=>setMarca(data))
  },[])

  const navegate = useNavigate();

  const filteredData = tableData.filter(row =>
    Object.values(row).some(
      value =>
        value &&
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    ),
  );

  const columns = [
    { field: 'IdModelo', headerName: 'ID', width: 400 },
    { field: 'descripcion', headerName: 'Marca', width: 400 },
    { field: 'detalle', headerName: 'Modelo', width: 400 },

    {
      field: 'borrar',
      headerName: 'Acciones',
      width: 200,

      renderCell: params => (
        <div className="contActions">
          <Button
            className="btnEdit"
            onClick={() => handleUpdt(params.row.IdModelo)}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btnDelete"
           onClick={() => handleDel(params.row.IdModelo)}
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
              <TextCustom text="Modelo" className="titleInput" />
              <input
                type="text"
                id="modelo"
                className="inputCustom"
              />
            </div>
            <div className="contInput">
              <TextCustom text="Marca" className="titleInput" />
              <select name="" className="selectCustom" id="marca">
              {Marca.length ? (
                  Marca.map(pre => (
                    <option key={pre.IdMarca} value={pre.IdMarca}>
                      {pre.descripcion}
                    </option>
                  ))
                ) : (
                  <option value="No existe informacion">
                    No existe informacion
                  </option>
                )}
              </select>
            </div>
          </div>
        </div>
      ),
      buttons: ["Cancelar","Actualizar"]
    }).then((op) => {

      switch (op) {
        case true:
          let data = {
            idModelo: id,
            detalle: document.getElementById("modelo").value,
            idMarca:parseInt(document.getElementById("marca").value)
          };
    
          console.log(data);
    
    
          if (sendData(urlUpdateModelo, data)) {
            swal(<h1>Modelo Actualizado Correctamente</h1>);
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
            idModelo: id
          };
    
          console.log(data);
    
    
          if (sendData(urlDelModelo, data)) {
            swal(<h1>Modelo Eliminado Correctamente</h1>);
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
      <h2 style={{ color: 'black', fontSize: '40px' }}>Lista de Modelos</h2>

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
                navegate('/menuInventario/RegistroModelo');
              }}
            >
              <AddIcon style={{ marginRight: '5px' }} />
              Nuevo Modelo
            </Button>
            <Button className="btnReport">
              <PictureAsPdfIcon style={{ marginRight: '5px' }} />
              Generar reporte
            </Button>
          </div>
        </div>
        <DataGrid
          getRowId={tableData => tableData.IdModelo}
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
       
      </div>
    </div>
  );
};
