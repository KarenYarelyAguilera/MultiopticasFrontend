import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendData } from '../../scripts/sendData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


//Styles
import '../../Styles/Usuarios.css';

//Components

import VerticalStepper from '../../Components/VerticalStepper.jsx';
import { TextCustom } from '../../Components/TextCustom.jsx';
import swal from '@sweetalert/with-react';
import { TextField } from '@mui/material';


const urlMarca =
  'http://localhost/APIS-Multioptica/producto/controller/producto.php?op=InsertMarca';

export const DetalleExpediente = ({
  msgError = '',
  success = false,
  warning = false,
  props,
}) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };
  



  const navegate = useNavigate();

  const [marca, setmarca] = React.useState('');
  const [leyenda, setleyenda] = React.useState('');
  const [errorMarca, setErrorMarca] = React.useState(false);
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().slice(0, 10));
  const [nombremarca, setnombremarca] = React.useState('');
  const [aviso, setaviso] = React.useState('');
  const [errornombremarca, setErrornombremarca] = React.useState(false);

  const handleNext = () => {
    let id = parseInt(document.getElementById("idMarca").value)
    let marca = document.getElementById("Marca").value
    let data = {
      IdMarca: id ,
      descripcion:marca 
    }
    
    if (sendData(urlMarca, data)) {
      swal('Marca agregada con exito', '', 'success').then(result => {
        navegate('/menuInventario/ListaMarcas');
      });
    }
  };

  const handleBack = () => {
    navegate('/menuClientes');
  };

  return (
    <div className="ContUsuarios">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleAddUser">
        <h2>Detalle De Expediente</h2>
        <h3>
          Complete todos los puntos para completar el Detalle de Expediente.
        </h3>
      </div>
      <div className="infoAddUser">
        <div className="PanelInfo">
          <div className="InputContPrincipal1">
            <div className="contInput">
              <TextCustom text="Promocion" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Promocion"
                id="Marca"
              />
               <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Optometrista" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Optometrista"
                id="Marca"
              />
               <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Asesor de Venta" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Asesor de Venta"
                id="Marca"
              />
               <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Fecha de Expriracion" className="titleInput" />
              <input
                type="date"
                name=""
                maxLength={8}
                className="inputCustom"
                placeholder="Fecha de Expiracion"
                id="fecha"
                value={fechaActual}
                disabled
              />
            </div>

            <div className="contInput">
              <TextCustom text="Antecedentes Clinicos" className="titleInput" />
              <input
             
                type="text"
                name=""
                maxLength={100}
                className="inputCustomText"
                placeholder="Antecedentes Clinicos"
                id="direccion"
              />
               
            </div> 

            <div className="contInput">
              {/* <TextCustom text="Esfera" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Esfera"
                id="Marca"
              />
               <p class="error">{aviso}</p> */}
            </div>

            <div className="titleAddUser">
       
        <h3>
          
        </h3>
      </div>

            <div className="contInput">
            
            </div>
            
            <h3>
            Diagnostico
        </h3>

            <div className="contInput">
              {/* <TextCustom text="Esfera" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Esfera"
                id="Marca"
              />
               <p class="error">{aviso}</p> */}
            </div>

            <div className="contInput">
              <TextCustom text="Esfera OD" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Esfera OD"
                id="Marca"
              />
               <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Esfera OI" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Esfera OI"
                id="Marca"
              />
               <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Cilindro OD" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Cilindro OD"
                id="Marca"
              />
               <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Eje OD" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Eje OI"
                id="Marca"
              />
               <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Adicion OD" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Adicion OD"
                id="Marca"
              />
               <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Adicion OI" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Adicion OI"
                id="Marca"
              />
               <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Altura OD" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Altura OD"
                id="Marca"
              />
               <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Altura OI" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="Altura OI"
                id="Marca"
              />
               <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="DP OD" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="DP OD"
                id="Marca"
              />
               <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="DP OI" className="titleInput" />

              <input
               onKeyDown={e => {
                setnombremarca(e.target.value);
                if (nombremarca == '') {
                  setErrornombremarca(true);
                  setaviso('Los campos no deben estar vacios');
                } else {
                  setErrornombremarca(false);
                  var preg_match = /^[a-zA-Z]+$/;
                  if (!preg_match.test(nombremarca)) {
                    setErrornombremarca(true);
                    setaviso('Solo deben de ingresar letras');
                  } else {
                    setErrornombremarca(false);
                    setaviso('');
                  }
                }
              }}
                type="text"
                name=""
                maxLength={40}
                className="inputCustom"
                placeholder="DP OI"
                id="Marca"
              />
               <p class="error">{aviso}</p>
            </div>

            <div className="contInput">
              <TextCustom text="Enfermedad Presentada" className="titleInput" />
              <input
             
                type="text"
                name=""
                maxLength={100}
                className="inputCustomText"
                placeholder="Enfermedad Presentada"
                id="direccion"
              />
               
            </div> 

            
            <div className="contBtnStepper">
              <Button
                variant="contained"
                className="btnStepper"
                onClick={handleNext}
              >
                <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>
              </Button>
              {/* <Button onClick={handleBack} className="btnStepper">
                <h1>Back</h1>
              </Button> */}
            </div>
          </div>
        </div>

        <img
          src={
            'https://static.vecteezy.com/system/resources/previews/010/351/676/non_2x/rewriting-text-color-icon-illustration-vector.jpg'
          }
          className='imgCont'
          alt="No se encuentro la imagen"
        />
      </div>
    </div>
  );
};