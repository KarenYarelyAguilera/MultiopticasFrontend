import { PageOne } from '../../Components/Preguntas/PageOne/PageOne';
import { PageTwo } from '../../Components/Preguntas/PageTwo/PageTwo';
import { PageThree } from '../../Components/Preguntas/PageThree/PageThree';
// import "./App.css";
import React, { useState } from 'react';
import { MultiProgressPreguntas } from '../../Components/MultiStepProgressBar/MultiProgressPreguntas';
import passwordRecovery from '../../IMG/passwordrecovery.png';

export const Progress = props => {
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
          <h2>Preguntas de Seguridad</h2>
          <h3>Contesta cada paso, para poder autenticar tu usuario.</h3>
        </div>
        <MultiProgressPreguntas page={page} onPageNumberClick={nextPageNumber} />
        {
          {
            pageone: <PageOne onButtonClick={nextPage} />,
            pagetwo: <PageTwo onButtonClick={nextPage} />,
            pagethree: <PageThree />,
          }[page]
        }
      </div>

      <div className="divImgSection">
        <img src={passwordRecovery} alt="Iamgen no encontrada" />
      </div>
    </div>
  );
};
