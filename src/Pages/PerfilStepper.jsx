import { PageOne } from '../Components/Perfil/PageOne/PageOne';
import { PageTwo } from '../Components/Perfil/PageTwo/PageTwo';
import { PageThree } from '../Components/Perfil/PageThree/PageThree';
// import "./App.css";
import React, { useState } from 'react';
import { MultiProgressPerfil } from '../Components/MultiStepProgressBar/MultiProgressPerfil';
import passwordRecovery from '../IMG/passwordrecovery.png';

export const PerfilStepper = props => {

  const [correo1, setCorreo1] = useState('');
  const [Id,setId] = useState(0);
  
  const [autor,setAutor]=useState("");

  const crr1 = correo=>setCorreo1(correo);
  const id = idd=>setId(idd);
  const autr= aut=>setAutor(aut);


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
      case '3':
        alert('Ooops! Seems like you did not fill the form.');
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
            pageone: <PageOne correo={crr1}  onButtonClick={nextPage} />,
            pagetwo: <PageTwo correo1={correo1} id={id} autor={autr}  onButtonClick={nextPage} />,
            pagethree:<PageThree correo={correo1} id={Id} autor={autor}   onButtonClick={nextPage} />,

          }[page]
        }
      </div>

      <div className="divImgSection">
        <img src={passwordRecovery} alt="Iamgen no encontrada" />
      </div>
    </div>
  );
};
