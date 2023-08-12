import { useEffect, useState } from 'react';
import { TextCustom } from '../../Components/TextCustom';
import { Button, Switch, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router';

export const Backup = props => {

    useEffect(() => {
        document.querySelectorAll("[type='file']")
        .forEach(function(control){
        control.addEventListener('change',function(ev){
          console.log(this.id);
          document.querySelector("[for='"+this.id+"']")
                  .innerHTML = ev.target.files[0].name;
        });
      });
    });
    

    const navegate = useNavigate();

    const handleBack = () => {
        navegate("/usuarios");
    }

    return (
    <div className="ContBackup">
      <Button className="btnBack" onClick={handleBack}>
        <ArrowBackIcon className="iconBack" />
      </Button>
      <div className="titleBackup">
        <h2>Gestión de Base de datos</h2>
      </div>
      <div className="infoConfigBackup">
        <div className="panelConfigBackup">
        <h1>Realizar Backup</h1>
        <button type="submit" className='btnCreateBackUp'>
            Crear Backup
        </button>
        </div>

        <div className="panelConfigRestore">
        <h1>Realizar Restore</h1>
        <div className="sectFilesUpl">
        <label for="fileCustom" class="fileCustom">
        <FileUploadIcon className='customFileUpload'/>
        Seleccionar archivo
        </label>
        <input 
        type="file"
        id='fileCustom'
        />

        <button type="submit" className='btnRestore'>Restaurar</button>
        </div>
        </div>
      </div>
    </div>
  );
};
