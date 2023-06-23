import { PageOne } from '../../Components/Recuperacion/PageOne/PageOne';
import { PageTwo } from '../../Components/Recuperacion/PageTwo/PageTwo';
import { PageThree } from '../../Components/Recuperacion/PageThree/PageThree';
import { PageFour } from '../../Components/Recuperacion/PageFour/PageFour';
// import "./App.css";
import React, { useState } from 'react';
import { MultiStepProgressBar } from '../../Components/MultiStepProgressBar/MultiStepProgressBar';
import passwordRecovery from '../../IMG/passwordrecovery.png';

export const Metodos = props => {
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
      <div className="divInfoRecuperacion">
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
