import { PageOne } from '../Components/Perfil/PageOne/PageOne';
import { PageTwo } from '../Components/Perfil/PageTwo/PageTwo';

// import "./App.css";
import React, { useState } from 'react';
import { MultiProgressPerfil } from '../Components/MultiStepProgressBar/MultiProgressPerfil';
import passwordRecovery from '../IMG/passwordrecovery.png';
import { Bitacora } from '../Components/bitacora.jsx';

export const PerfilStepper = props => {
  

  /* const correo = {
    correo:props.correo
  }
  console.log(correo) */
  const [clave, setClave] = useState('');

  const [correo1, setCorreo1] = useState('');
  const [Id,setId] = useState(0);
  const [autor,setAutor]=useState("");
  const [bitacora,setBitacora]=useState("");

  const crr1 = correo=>setCorreo1(correo);
  const id = idd=>setId(idd);
  const autr= aut=>setAutor(aut);
  const btc= bita=>setBitacora(bita);

  const clv = clav=>setClave(clav);



  const [page, setPage] = useState('pageone');

  const nextPage = page => {
    setPage(page);
  };

  const nextPageNumber = pageNumber => {
    switch (pageNumber) {
      case '1':
        setPage('pageone');
        break;
      case '2':
        setPage('pagetwo');
        break;
      default:
        setPage('1');
    }
  };

  return (
    <div className="divSection">
      <div className="divInfoQuestion">
        <div className="titleRecuPassword">
          <h2>Cambiar contraseña</h2>
          <h3>Contesta cada paso, para poder autenticar tu usuario.</h3>
        </div>
        <MultiProgressPerfil page={page} onPageNumberClick={nextPageNumber} />
        {
          {
            pageone: <PageOne correo={props.infoPerfil.Correo_Electronico}  onButtonClick={nextPage} />,
            pagetwo: <PageTwo correo={props.infoPerfil.Correo_Electronico}  id={props.infoPerfil.Id_Usuario} autor={props.infoPerfil.Nombre_Usuario} bitacora={props.activo.bitacora} onButtonClick={nextPage} />,
          

          }[page]
        }
      </div>

      <div className="divImgSection">
        <img src={passwordRecovery} alt="Iamgen no encontrada" />
      </div>
    </div>
  );
};
