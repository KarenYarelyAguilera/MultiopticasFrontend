import { PageOne } from '../../Components/PageOne/PageOne';
import { PageTwo } from '../../Components/PageTwo/PageTwo';
import { PageThree } from '../../Components/PageThree/PageThree';
import { PageFour } from '../../Components/PageFour/PageFour';
// import "./App.css";
import React, { useState } from 'react';
import tachyons from 'tachyons';
import { MultiStepProgressBar } from '../../Components/MultiStepProgressBar/MultiStepProgressBar';
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
        setPage('pagethree');
        break;
      case '4':
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
        <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
        {
          {
            pageone: <PageOne onButtonClick={nextPage} />,
            pagetwo: <PageTwo onButtonClick={nextPage} />,
            pagethree: <PageThree onButtonClick={nextPage} />,
            pagefour: <PageFour />,
          }[page]
        }
      </div>

      <div className="divImgSection">
        <img src={passwordRecovery} alt="Iamgen no encontrada" />
      </div>
    </div>
  );
};
