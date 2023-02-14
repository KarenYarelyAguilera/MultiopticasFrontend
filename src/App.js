import { Home } from './Pages/Home.jsx';
import { ProtectedRoute } from './Components/ProtectedRoute.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //Sirven para invocar componentes segun la ruta que se especifique
import { Login } from './Pages/login';
import { useState } from 'react';
import { BarraHorizontal } from './Components/BarraHorizontal.jsx';
import { BarraLateral } from './Components/BarraLateral.jsx';
import { Inventario } from './Pages/Inventario.jsx';

function App() {
  const [usuario, setUsuario] = useState('');
  const [activo, setActivo] = useState('inactivo'); /**Hook usState:
Mantiene un estado con el que se puede interactuar en distintos componentes,
dependiendo del estado un componente puede reaccionar de formas diferentes */

  const access = acceder => setActivo(acceder); //Prop para cambiar el hook "activo desde un componente"
  const user = usr => setUsuario(usr);

  return (
    <div>
      <BrowserRouter>
        {/**este componente es el que almacena las rutas segun
         * el historial del navegador.
         */}
        <Routes>
          {/**Es un conjunto de rutas */}
          {/* <Route index element={<Login access={access} user={user} />} /> */}
          {/**Son las rutas
           * a las que podemos acceder segun el "path" de navegacion
           */}

          {/* <Route path="/Home" element={<ProtectedRoute activo={activo}>
          <BarraHorizontal user={usuario} />
            <div className="flex">
              <BarraLateral />
              <div className="content">
                <Home></Home>
                
              </div>
            </div></ProtectedRoute>}>
          </Route> */}

          <Route
            index
            element={
              <div className="flex">
                <Home />
              </div>
            }
          ></Route>

          <Route
            path="/Inventario"
            element={
              <ProtectedRoute activo={activo}>
                <BarraHorizontal user={usuario} />
                <div className="flex">
                  <BarraLateral />
                  <div className="content">
                    <div className="flex_content">
                      <Inventario></Inventario>
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
