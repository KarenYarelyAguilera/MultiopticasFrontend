import React, { useEffect, useState } from 'react';
import passwordRecovery from '../../IMG/passwordrecovery.png';
import { useNavigate } from 'react-router-dom';
import { TextCustom } from '../../Components/TextCustom';
import swal from '@sweetalert/with-react';
import axios from 'axios';

//Mui-Material-Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import '../../Styles/Usuarios.css';

export const RegistroPreguntaDeSeguridad = props => {

    const navigate = useNavigate();
    const [Preguntas, setPreguntas] = useState([]);
    const urlPreguntas = 'http://localhost:3000/api/preguntas';
    const urlPostPreguntas = 'http://localhost:3000/api/preguntas/agregar';
    const urlPutPreguntas = 'http://localhost:3000/api/preguntas/editar';

    const [cambio, setCambio] = useState(0);
    const [Resp, setResp] = useState(props.data.Respuesta || '');
    const [errorResp, setErrorResp] = useState(false);
    const [Msj, setMsj] = useState('');


    const dataId = {
        Id_Usuario: props.idUsuario,
        user: props.user,
    };

/*     const dataPreg={

        Pregunta:props.data
    }
     console.log(dataPreg);
 */
/*     //para las preguntas
    useEffect(() => {
        axios.get(urlPreguntas).then(response => {
            setPreguntas(response.data);
        }).catch(error => console.log(error))
    }, [cambio]); */

    const handleBack = () => {
        swal({
            title: 'Advertencia',
            text: 'Hay un proceso de agregar pregunta de seguridad ¿Estás seguro que deseas salir?',
            icon: 'warning',
            buttons: ['Cancelar', 'Salir'],
            dangerMode: true,
        }).then((confirmExit) => {
            if (confirmExit) {
                props.update(false)
                props.Data({})
                navigate('/config/PreguntasSeguridad');
            }
        });
    };

    const handleClick = async () => {
        const respuestap = Resp;

        const data = {
            pregunta: respuestap.toUpperCase(),
            creadoPor: props.infoPerfil.nombre.toUpperCase(),
            FechaCrea: new Date()
        };

        await axios.post(urlPostPreguntas, data).then(response => {
            swal("Pregunta registrada correctamente", "", "success").then(() => navigate('/config/PreguntasSeguridad'))
        }).catch(error => {
            console.log(error);
            swal("¡Error al registrar su pregunta! verifique si ya ha agregado esta pregunta.", "", "error")
        })
    };

    //ACTUALIZAR
    const actualizar = async () => {
        try {
            const respuestap = Resp;
    
            const data = {
                pregunta: respuestap,
                modificado_por: props.infoPerfil.nombre,
                fecha_modificacion: new Date(),
                Id_Pregunta: props.data.Id_Pregunta,
            };
    
            console.log(data);
    
            await axios.put(urlPutPreguntas, data);
    
            swal("Pregunta Actualizada Correctamente", "", "success").then(() => {
                navigate('/config/PreguntasSeguridad');
            });
        } catch (error) {
            console.error(error);
            swal('¡Error al Actualizar! Verifique si la pregunta ya existe.', '', 'error');
        }
    };
    

    return (
        <div className="divSection">
            <div className="divInfoQuestion">
                {/*     <div className="titleRecuPassword">
                    <h2>Preguntas de seguridad</h2>
                </div> */}

                <div className="titleRecuPassword">
                    {props.actualizar ? <h2>Actualización de Pregunta</h2> : <h2>Registro de Pregunta</h2>}
                </div>
                <form className="measure">
                    <br />
                    <br />
                    <div className='divInfoQuestionResp'>
                        <h3>Ingrese una nueva pregunta:</h3>
                        <div className="contInput">
                            <input
                                onChange={e => {
                                    const value = e.target.value;
                                    setResp(value);

                                    if (value === '') {
                                        setErrorResp(true);
                                        setMsj('Los campos no deben estar vacíos, ingrese mas de 5 caracteres');
                                    } else {
                                        setErrorResp(false);
                                        const regex = /^[¿A-Z? ]+/;
                                        if (!regex.test(value)) {
                                            setErrorResp(true);
                                            setMsj('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                                        } else if (/(.)\1{2,}/.test(value)) {
                                            setErrorResp(true);
                                            setMsj('No se permiten letras consecutivas repetidas');
                                        } else {
                                            setErrorResp(false);
                                            setMsj('');
                                        }
                                    }
                                }}
                                error={errorResp}
                                type="text"
                                helperText={Msj}
                                minLength={5}
                                maxLength={50}
                                name="respuestap"
                                className="inputCustom"
                                placeholder=""
                                value={Resp}
                            />
                        </div>
                        <p className="error">{Msj}</p>
                    </div>

                    {/* <div className="contBtnStepper">


                        <Button
                            variant="contained"
                            className="btnStepper"
                            onClick={() => {
                                const respuestap = Resp;

                                if (respuestap === "") {
                                    swal("No deje campos vacíos.", "", "error");
                                }
                                else if (!/^[A-Z]+(?: [A-Z]+)*$/.test(respuestap)) {
                                    swal("El campo pais solo acepta letras mayúsculas y solo un espacio entre palabras.", "", "error");
                                } else if (/(.)\1{2,}/.test(respuestap)) {
                                    swal("El campo pais no acepta letras mayúsculas consecutivas repetidas.", "", "error");
                                } else {
                                    props.actualizar ? actualizar() : handleClick();
                                }
                            }
                            }
                        >
                            {props.actualizar ? <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1> : <h1>{'Finish' ? 'Guardar' : 'Finish'}</h1>}
                        </Button>


                    </div> */}

                    <div className='divSubmitQuestion'>
                        <input
                            className="btnSubmitPreguntas"
                            type="button"
                            value="Guardar"
                            //onClick={handleClick}
                            onClick={() => {
                                const respuestap = Resp;
                                if (respuestap === '') {
                                    swal('No deje campos vacíos.', '', 'error');
                                } else if (respuestap.length < 5 || respuestap.length > 50) {
                                    swal('La longitud del campo debe estar entre 5 y 50 caracteres.', '', 'error');
                                } else if (!/^[¿A-Z]+( [A-Z?]+)*$/.test(respuestap)) {
                                    swal('El campo solo acepta letras mayúsculas y solo un espacio entre palabras.', '', 'error');
                                } else if (/(.)\1{2,}/.test(respuestap)) {
                                    setErrorResp(true);
                                    swal('El campo no acepta letras mayúsculas consecutivas repetidas.', '', 'error');
                                } else {
                                    props.actualizar ? actualizar() : handleClick();
                                }
                            }}
                        />
                        <br />



                        <input
                            className="btnSubmitPreguntas"
                            type="button"
                            value="Cancelar"
                            onClick={handleBack}
                        />
                    </div>

                </form>
            </div>
            <div className="divImgSection">
                <img src={passwordRecovery} alt="Imagen no encontrada" />
            </div>
        </div>
    );
};