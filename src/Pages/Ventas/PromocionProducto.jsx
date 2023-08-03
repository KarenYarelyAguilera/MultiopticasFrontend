import React from 'react';
import Button from '@mui/material/Button';

import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Styles
import '../../Styles/Usuarios.css';

//Components
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import axios from 'axios';


//APIS DE PRODUCTOSPROMO
const urlProductoProm = //CREAR
  'http://localhost:3000/api/productopromociones/crear';
const urlUpdProductoProm = //ACTUALIZAR
  'http://localhost:3000/api/productopromociones/actualizar';
const urlDelProductoProm = //BORRAR
  'http://localhost:3000/api/productopromociones/eliminar';
const urlProducto = //Productos
  'http://localhost:3000/api/productos';
const urlPromocion = //Promos
  'http://localhost:3000/api/promociones';


export const PromocionProducto = (props) => {

  const [Producto, setProducto] = useState([]);
  const [Promocion, setPromocion] = useState([]);

  useEffect(() => {
    fetch(urlProducto).then(response => response.json()).then(data => setProducto(data))
    fetch(urlPromocion).then(response => response.json()).then(data => setPromocion(data))
  }, [])

  const navegate = useNavigate();

  //ACTUALIZAR
  const actualizarProductoProm = async () => {

    let IdPromocion = parseInt(document.getElementById('Promocion').value);
    let IdProducto = parseInt(document.getElementById('Producto').value);

    let data = {
      IdPromocion: IdPromocion,
      IdProducto: IdProducto,
      IdProductoPromocion: props.data.IdProductoPromocion,

    };



    //Funcion de bitacora 
    /*  let dataB={
       Id: props.idUsuario
     } */

    axios.put(urlUpdProductoProm, data).then(() => {
      swal("Promocion de Producto Actualizada Correctamente", "", "success").then(() => {
        //axios.post(urlUpdBitacora,dataB) //UPDATE BITACORA 
        navegate('/menuVentas/ListaPromocionProducto');
      })
    }).catch(error => {
      console.log(error);
      swal('Error al Actualizar Pronocion de Producto! , porfavor revise todos los campos.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })

  }

  //CREAR
  const handleNext = () => {
    let IdPromocion = parseInt(document.getElementById('Promocion').value);
    let IdProducto = parseInt(document.getElementById('Producto').value);

    let data = {
      IdPromocion: IdPromocion,
      IdProducto: IdProducto

    };

    console.log(data)

    //Consumo de API y lanzamiento se alerta
    axios.post(urlProductoProm, data).then(response => {
      swal('Promocion de Producto agregada con exito', '', 'success').then(result => {
        //axios.post(urlInsertBitacora, dataB)
        navegate('/menuVentas/ListaPromocionProducto');
      });
    }).catch(error => {
      console.log(error);
      swal('Error al crear Promocion de Producto, porfavor revise los campos.', '', 'error')
      // axios.post(urlErrorInsertBitacora, dataB)
    })
  };

  const handleBack = () => {
    navegate('/ventas');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
      {props.actualizar ? <h2>Actualizar Promocion de Producto</h2> : <h2>Registro de Promocion de Producto</h2>}
        <h3>
          Complete todos los puntos para poder registrar los datos Promocion de Producto.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">

            <div className="contInput">
              <TextCustom text="Promocion" className="titleInput" />
              <select name="" className="selectCustom" id="Promocion">
                {Promocion.length ? (
                  Promocion.map(pre => (
                    <option key={pre.IdPromocion} value={pre.IdPromocion}>
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

            <div className="contInput">
              <TextCustom text="Producto" className="titleInput" />
              <select name="" className="selectCustom" id="Producto">
                {Producto.length ? (
                  Producto.map(pre => (
                    <option key={pre.IdProducto} value={pre.IdProducto}>
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

            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={() => {
                  props.actualizar ? actualizarProductoProm() : handleNext();
                }
                }
              >
                {props.actualizar ? <h1>{'Finish' ? 'Actualizar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>

        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/013/590/422/non_2x/businessman-analyzing-data-illustration-concept-on-white-background-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};