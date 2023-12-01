import { PageOne } from '../../Components/Recuperacion/PageOne/PageOne';
import { PageTwo } from '../../Components/Recuperacion/PageTwo/PageTwo';
import { PageThree } from '../../Components/Recuperacion/PageThree/PageThree';
import { PageFour } from '../../Components/Recuperacion/PageFour/PageFour';
// import "./App.css";
import React, { useState } from 'react';
import { MultiStepProgressBar } from '../../Components/MultiStepProgressBar/MultiStepProgressBar';
import passwordRecovery from '../../IMG/passwordrecovery.png';

export const Metodos = props => {

  const [correo1, setCorreo1] = useState('');
  const [Id, setId] = useState(0)
  const [autor, setAutor] = useState("")

  const crr1 = correo => setCorreo1(correo)
  const id = idd => setId(idd)
  const autr = aut => setAutor(aut)

  const [page, setPage] = useState('pagetwo');

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
    <div className="divSection" >
      <div className="divInfoQuestion"  >
        <div className="titleRecuPassword">
          <h2 style={{ marginLeft: '10px' }}>Código de verificación</h2>
          {/*  <h3>Contesta cada paso, para poder autenticar tu usuario.</h3> */}

        </div>

        <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
        {
          {
            pagetwo: <PageTwo correo1={crr1} id={id} autor={autr} onButtonClick={nextPage} />,
            pagethree: <PageThree correo={correo1} id={Id} onButtonClick={nextPage} />,
            pagefour: <PageFour correo={correo1} id={Id} autor={autor} />,
          }[page]
        }
      </div>

      <div className="divImgSection" >
        <img src={passwordRecovery} alt="Iamgen no encontrada" style={{ height: 'auto', maxWidth: '100%' }} />
      </div>
    </div>
  );
};
