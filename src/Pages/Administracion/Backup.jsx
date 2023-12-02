import { useEffect, useState } from 'react';
import { TextCustom } from '../../Components/TextCustom';
import { Button, Switch, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
import React from 'react';
import swal from '@sweetalert/with-react';

export const Backup = props => {
  const urlBackup = 'http://localhost:3000/api/backup';
  const urlArchivos = 'http://localhost:3000/api/archivos';
  const urlRestore = 'http://localhost:3000/api/restore'

  const [Archivos, setArchivos] = useState([]);

  const [selectedRestoreFile, setSelectedRestoreFile] = useState('');


  useEffect(() => {
    document.querySelectorAll("[type='file']")
      .forEach(function (control) {
        control.addEventListener('change', function (ev) {
          console.log(this.id);
          document.querySelector("[for='" + this.id + "']")
            .innerHTML = ev.target.files[0].name;
        });
      });
  });

  useEffect(() => {
    axios.get(urlArchivos)
      .then(response => {
        const archivos = response.data;

        // Ordena las fechas en orden descendente en el cliente
        const sortedArchivos = archivos.sort((a, b) => {
          const dateA = new Date(a);
          const dateB = new Date(b);
          return dateB - dateA;
        });

        setArchivos(sortedArchivos);
      })
      .catch(error => console.log(error));
  }, []);


  //Par ver que archivo esta mostrando y si es el ultimo agregado
  useEffect(() => {
    axios.get(urlArchivos)
      .then(files => {
        console.log("Archivos ordenados por la fecha de último acceso:", files);
      }).catch(err => {
        console.error("Error:", err);
      })
  });










  const navegate = useNavigate();

  const handleBack = () => {
    navegate("/seguridad");
  }





  //para recargar la pantalla
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    if (forceUpdate) {
      // Realiza las operaciones necesarias después de la actualización
      // Por ejemplo, cargar nuevamente los archivos después de realizar una acción
      axios.get(urlArchivos)
        .then(response => {
          const archivos = response.data;
          const sortedArchivos = archivos.sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateB - dateA;
          });
          setArchivos(sortedArchivos);
          // Después de actualizar, establece forceUpdate en falso
          setForceUpdate(false);
        })
        .catch(error => console.log(error));
    }
  }, [forceUpdate]);


  const handleClick = async () => {
    try {
      const response = await axios.get(urlBackup);
      console.log(response.data); // Accede a los datos de la respuesta si es necesario
      swal("Backup creado correctamente", "", "success");
      // Después de realizar la acción, establece forceUpdate en true
      setForceUpdate(true);
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        swal("Error al crear backup", "Error en el servidor", "error");
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.log(error.request);
        swal("Error al crear backup", "No se recibió respuesta del servidor", "error");
      } else {
        // Ocurrió un error antes de realizar la solicitud
        console.log(error.message);
        swal("Error al crear backup", "Error desconocido", "error");
      }
    }
  };


  //en evaluzación me debe cerrar sesión xd
  const handleArchivos = async () => {
    try {
      const archivo = document.getElementById('Restore').value;
      console.log('entrando');

      // Realiza la solicitud POST usando axios
      const response = await axios.post(urlRestore, { restore: archivo });

      // Espera a que el mensaje de éxito de Swal se muestre antes de navegar
      await swal("¡Restauración creada con éxito!", "", "success");

      // Después de realizar la acción, establece forceUpdate en true
      setForceUpdate(true);

      // Navega a la página '/' después de que el usuario haya confirmado el éxito
      //navegate('/usuarios');
      
    } catch (error) {
      console.error(error);
      swal("¡Error al crear la restauración", "", "error");
    }
  };






  return (
    <div className="ContBackup">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleBackup">
        <h2>Backup y Restore</h2>
      </div>

      <div className="infoConfigBackup">

        <div className="panelConfigBackup">
          <h1>Realizar Backup</h1>
          <button type="submit" className='btnCreateBackUp' onClick={handleClick}>
            Crear Backup
          </button>
        </div>

        <div className="panelConfigRestore">
          <h1>Realizar Restore</h1>
          <div className="sectFilesUpl">

            <select
              id="Restore"
              className="inputCustomPreguntas"
              name="restore"
              onChange={(e) => setSelectedRestoreFile(e.target.value)}
              value={selectedRestoreFile}
            >
              {Archivos.length ? (
                Archivos.map((pre) => (
                  <option key={pre} value={pre}>
                    {pre}
                  </option>
                ))
              ) : (
                <option value="No existe información">No existe información</option>
              )}
            </select>


            <button type="submit" className='btnRestore' onClick={handleArchivos}>Restaurar</button>

          </div>
        </div>
      </div>
    </div>
  );
};
