import { PageOne } from '../../Components/LoginPorPrimeraVez/PageOne/PageOne';
import { PageTwo } from '../../Components/LoginPorPrimeraVez/PageTwo/PageTwo';
import { PageThree } from '../../Components/LoginPorPrimeraVez/PageThree/PageThree';
import { PageFour } from '../../Components/LoginPorPrimeraVez/PageFour/PageFour';
// import "./App.css";
import React, { useState } from 'react';
import { MultiProgressPreguntas } from '../../Components/MultiStepProgressBar/MultiProgressPreguntas';
import passwordRecovery from '../../IMG/passwordrecovery.png';

export const LoginxPrimeraVez = props => {

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
          <h2>Login por primera vez</h2>
          <h3>Contesta cada paso, para poder autenticar tu usuario.</h3>
        </div>
        <MultiProgressPreguntas page={page} onPageNumberClick={nextPageNumber} />
        {
          {
            pageone: <PageOne correo={crr1}  onButtonClick={nextPage} />,
            pagetwo: <PageTwo correo1={correo1} id={id} autor={autr}  onButtonClick={nextPage} />,
            pagethree:<PageThree correo={correo1} id={Id}   onButtonClick={nextPage} />,
            pagefour: <PageFour correo={correo1} id={Id} autor={autor}  />,

          }[page]
        }
      </div>

      <div className="divImgSection">
        <img src={passwordRecovery} alt="Iamgen no encontrada" />
      </div>
    </div>
  );
};
