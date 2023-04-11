import { useNavigate } from 'react-router';

import '../../Styles/RecuperacionPassword.css';
import { TextCustom } from '../../Components/TextCustom.jsx';
import Button from '@mui/material/Button';

export const Metodos = props => {
  const navegate = useNavigate();

  const PreguntasCorreo = () => {
    let correo = document.getElementById('correo').value;
    props.correo(correo);

    navegate('/recuperacion/preguntas');
  };

  return (
    <div className="contRecuperaPassword">
      <div className="titleRecuPassword">
        <h2>Recuperacion de contraseña</h2>
        <h3>
          Complete los campos requeridos para poder recuperar su contraseña.
        </h3>
      </div>

      <div className="sectionRecuPassword">
        <div className="panelInfo">
        <div className="contInput">
        <TextCustom text="Correo Electronico" className="titleInput" />
              <input
                type="text"
                name=""
                id="correo"
                className="inputCustom"
                placeholder="Correo Electronico"
              />
        </div>
        <div className="contBtn">
          <Button
            className="btnSubmit"
            variant="container"
            onClick={PreguntasCorreo}
          >
            Preguntas de Seguridad
          </Button>
          <Button
            className="btnSubmit"
            variant="container"
            onClick={PreguntasCorreo}
          >
            Correo de Verificación
          </Button>
        </div>
        </div>
      </div>
    </div>
      
  );
};
