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
    const [fecha, setFecha] = React.useState(props.data.fecha || '');


    const urlUpdateCitas = 'http://localhost:3000/api/actualizarCita'

    const data = {
        IdRecordatorio: props.data.IdRecordatorio,
    };

    console.log(data);





    const handleAddEvent = () => {
        setAllEvents([...allEvents, newEvent]);
    };

    const handleBack = () => {
        navegate('/recordatorio');
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
            IdRecordatorio:props.data.IdRecordatorio,
            //IdCliente: idCliente,
            Nota:Nota.toUpperCase(),
            fecha:fecha,
         
        };


        console.log(data);

        await axios.put(urlUpdateCitas, data).then(() => {
            swal("Cita Actualizado Correctamente", "", "success").then(() => {
                navegate('/recordatorio')
            })
        }).catch(error => {
            console.log(error);
            swal('Error al Actualizar cita! , Sus campos pueden ser erroneos o ya existen en otro empleado.', '', 'error')
        })


    };


    return (
        <div className='ContUsuarios'>
            {/*  <Button className="btnBack" style={{ top: "-50px" }} onClick={handleBack}>
                <ArrowBackIcon className="iconBack" />
            </Button> */}
            <div className="contRecordatorios">
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
                                        value={props.data.nombre}
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
                                        type="text"
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
                                        onChange={e => setNota(e.target.value)}
                                        type="text"
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





                            <div className="contNewCitaButtons">
                                <button className='btnAgregarCita' onClick={handleClick}>Actualizar</button>
                                <button className='btnCancelar' onClick={handleBack} >Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};