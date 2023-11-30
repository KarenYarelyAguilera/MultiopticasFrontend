import React from 'react';
import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from "date-fns/locale/es";
import { TextCustom } from '../Components/TextCustom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import swal from '@sweetalert/with-react';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

import axios from 'axios';

import { Bitacora } from '../Components/bitacora.jsx';

import oftalmologoFondo from '../IMG/oftalmologofondo.png'


import '../Styles/Usuarios.css';

const locales = {
    es: es,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: 'Big Meeting',
        allDay: true,
        start: new Date(2023, 3, 4),
        end: new Date(2023, 3, 4),
    },
    {
        title: 'Vacation',
        start: new Date(2023, 3, 5),
        end: new Date(2023, 3, 5),
    },
    {
        title: 'Conference',
        start: new Date(2023, 3, 5),
        end: new Date(2023, 3, 5),
    },
];

export const RecordatorioCitasEditar = props => {
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
    const [allEvents, setAllEvents] = useState(events);
    const navegate = useNavigate();

    const [Nombre, setNombre] = useState([]);
    const [tableData, setTableData] = useState([]);


    const [Nota, setNota] = React.useState(props.data.Nota || '');
    const [fecha, setFecha] = React.useState(new Date(props.data.fecha).toISOString().split('T')[0] || '');

    const [errorNotas, setErrorNotas] = React.useState();
    const [Msj, setMsj] = React.useState(false);


    const urlUpdateCitas = 'http://localhost:3000/api/actualizarCita'
    const urlBitacoraUpdCita = 'http://localhost:3000/api/bitacora/actualizarcita';

    const data = {
        IdRecordatorio: props.data.IdRecordatorio,
    };

    console.log(data);

    const fechadatos = {
        IdRecordatorio: props.data.IdRecordatorio,
        Nota: props.data.Nota,
        fecha: new Date(props.data.fecha).toISOString().split('T')[0], // Formatear la fecha
    };
    console.log(fechadatos);





    const handleAddEvent = () => {
        setAllEvents([...allEvents, newEvent]);
    };

    const handleBack = () => {
        swal({
            title: 'Advertencia',
            text: 'Hay un proceso de edición de una cita ¿Estás seguro que deseas salir?',
            icon: 'warning',
            buttons: ['Cancelar', 'Salir'],
            dangerMode: true,
        }).then((confirmExit) => {
            if (confirmExit) {
                navegate('/recordatorio');
            } else {
            }
        });
    };

    const objectDate = new Date();
    const day = objectDate.getDate();
    const month = objectDate.getMonth();
    const year = objectDate.getFullYear();
    let format1 = month + "/" + day + "/" + year;




    const handleClick = async () => {
        // let idCliente =document.getElementById('idClientes').value;
        let Nota = document.getElementById('Nota').value;
        let fecha = document.getElementById('fecha').value;


        let data = {
            IdRecordatorio: props.data.IdRecordatorio,
            //IdCliente: idCliente,
            Nota: Nota.toUpperCase(),
            fecha: fecha,

        };


        console.log(data);

        let dataUsuario = {
            Id: props.idUsuario
        }
        const bitacora = {
            urlB: urlBitacoraUpdCita,
            activo: props.activo,
            dataB: dataUsuario,
        };


        await axios.put(urlUpdateCitas, data).then(() => {
            swal("Cita Actualizado Correctamente", "", "success").then(() => {

                Bitacora(bitacora);
                navegate('/recordatorio')
            })
        }).catch(error => {
            console.log(error);
            swal('Error al Actualizar cita! , Sus campos pueden ser erroneos o ya existen en otro empleado.', '', 'error')
        })


    };


    return (
        <div className="divSection">
            <div className='divInfoQuestion1'>
                <Button className="btnBack" onClick={handleBack}>
                    <ArrowBackIcon className="iconBack" />
                </Button>
                <div className="contRecordatorios" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '200px', fontSize: '15px' }}>
                    <div className="contRecordCitas">
                        <div  >
                            <h1>Actualizar Cita</h1>
                            <hr />
                            <div className="contPrincipalNewCita">
                                <div className="contNewCita">
                                    <TextCustom text="Cliente" className="titleInput" />
                                    <div className="contInput">
                                        <input
                                            // onChange={e => (e.target.value)}
                                            type="text"
                                            name=""
                                            className="inputCustom"
                                            placeholder="Cliente"
                                            id='cliente'
                                            value={`${props.data.IdCliente} - ${props.data.nombre}`}
                                            disabled
                                        />
                                    </div>
                                </div>



                                <div className="contNewCita">
                                    <TextCustom text="Fecha" className="titleInput" />
                                    <div className="contInput">
                                        {/* <DatePicker
                                        type="text"
                                        name=""
                                        maxLength={40}
                                        className="inputCustom"
                                        placeholderText="Fecha"
                                        id="fecha"
                                        value={props.data.fecha}
                                    /> */}


                                        <input
                                            onChange={e => setFecha(e.target.value)}
                                            type="date"
                                            id="fecha"
                                            className="inputCustom"
                                            placeholderText="Fecha"
                                            value={fecha}
                                        ></input>
                                    </div>


                                    {/*   <input type="date"  id="fecha" ></input> */}
                                </div>


                                <div className="contNewCita">
                                    <TextCustom text="Nota" className="titleInput" />
                                    <div className="contInput">
                                        <input
                                            onKeyDown={e => {
                                                setNota(e.target.value);
                                                if (Nota === '') {
                                                    setErrorNotas(true);
                                                    setMsj('Los campos no deben estar vacíos');
                                                } else {
                                                    setErrorNotas(false);
                                                    var regex = /^[A-Z]+(?: [A-Z]+)*$/;
                                                    if (!regex.test(Nota)) {
                                                        setErrorNotas(true);
                                                        setMsj('Solo debe ingresar letras mayúsculas y un espacio entre palabras');
                                                    } else if (/(.)\1{2,}/.test(Nota)) {
                                                        setErrorNotas(true);
                                                        setMsj('No se permiten letras consecutivas repetidas');
                                                    } else {
                                                        setErrorNotas(false);
                                                        setMsj('');
                                                    }
                                                }
                                            }}

                                            onChange={e => setNota(e.target.value)} //Tambien ponerlo para llamar los datos a la hora de actualizar
                                            error={errorNotas}
                                            type="text"
                                            helperText={Msj}
                                            name=""
                                            maxLength={40}
                                            className="inputCustomText"
                                            variant="standard"
                                            placeholder="Nota"
                                            id="Nota"
                                            value={Nota}
                                        // disabled="false"
                                        />
                                    </div>
                                </div>

                                {/* <div className='divInfoQuestionResp'>
                                <TextCustom text="Respuesta:" className="titleInput" />
                                <div className="contInput" >
                                
                                    <input
                                        maxLength="20"
                                        type="text"
                                        name=""
                                        className="inputCustom"
                                        placeholder="Respuesta"
                                        id='Nota'
                                        value={props.data.Nota}
                                        label="Usuario"

                                    />
                                </div>
                            </div> */}





                                <div className="contBtnStepperRecord">
                                    <Button
                                        style={{ fontSize: '15px' }}
                                        className='btnStepperCan'
                                        onClick={() => navegate('/recordatorio')}
                                    >Cancelar</Button>

                                    <Button
                                        style={{ fontSize: '15px' }}
                                        className='btnStepperGuardar'
                                        onClick={() => {

                                            var nota = document.getElementById("Nota").value;

                                            if (nota === "") {
                                                swal("No deje campos vacíos.", "", "error");
                                            } else if (!/^[A-ZÑ]+(?: [A-ZÑ]+)*$/.test(nota)) {
                                                swal("El campo solo acepta letras mayúsculas y solo un espacio entre palabras.", "", "error");
                                            } else if (/(.)\1{2,}/.test(nota)) {
                                                setErrorNotas(true);
                                                swal("El campo nombre no acepta letras mayúsculas consecutivas repetidas.", "", "error");
                                            } else {
                                                handleClick();
                                            }
                                        }}
                                    >Guardar</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="divImgSection">
                <img src={oftalmologoFondo} alt="Iamgen no encontrada" />
            </div>
        </div>
    );
};
