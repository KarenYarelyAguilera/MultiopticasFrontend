import { BrowserRouter, Routes, Route } from 'react-router-dom'; //Sirven para invocar componentes segun la ruta que se especifique
import { useState } from 'react';

//Components
import { ProtectedRoute } from './Components/ProtectedRoute.jsx';
import { BarraHorizontal } from './Components/BarraHorizontal.jsx';
import { BarraLateral } from './Components/BarraLateral.jsx';

//Modulos/paginas de ventas. ⬇️⬇️⬇️
import { Login } from './Pages/login';
import { Home } from './Pages/Home.jsx';
import { MenuVentas } from './Pages/MenuVentas.jsx';
import { NuevaVenta } from './Pages/NuevaVenta.jsx';
import { DetalleVenta } from './Pages/DetalleVenta.jsx';
import { Inventario } from './Pages/Inventario.jsx';
import { RegistroInventario } from './Pages/RegistroInventario.jsx';
import { Usuarios } from './Pages/Usuarios.jsx';
import { AddUsers } from './Pages/AddUsers.jsx';
import { RecuperacionPassword } from './Pages/RecuperacionPassword.jsx';
import { DatosEmpleado } from './Pages/DatosEmpleado.jsx';
import { Metodos } from './Pages/Metodos.jsx';

function App() {
  
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [activo, setActivo] = useState('inactivo'); /**Hook usState:
Mantiene un estado con el que se puede interactuar en distintos componentes,
dependiendo del estado un componente puede reaccionar de formas diferentes */

  const access = acceder => setActivo(acceder); //Prop para cambiar el hook "activo desde un componente"
  const user = usr => setUsuario(usr);
  const mail = ml => setCorreo(ml);
  
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

          <Route
            index
            element={<Login access={access} user={user} correo={mail} />}
          />

          <Route
            path="/Home"
            element={
              <ProtectedRoute activo={activo}>
                <BarraHorizontal user={usuario} />
                <div className="flex">
                  <BarraLateral />
                  <div className="content">
                    <Home></Home>
                  </div>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/recuperacion"
            element={<Metodos correo={mail}></Metodos>}
          ></Route>

          <Route
            path="/recuperacion/preguntas"
            element={<RecuperacionPassword correo={correo} ></RecuperacionPassword>}
          ></Route>

          <Route
            path="/inventario"
            element={
              <ProtectedRoute activo={activo}>
                <div>
                  <BarraHorizontal user={usuario} />
                  <Inventario></Inventario>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/registroInventario"
            element={
              // <ProtectedRoute activo={activo}>
              <div className="flex">
                <BarraLateral />
                <BarraHorizontal user={usuario} />
                <RegistroInventario></RegistroInventario>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/usuarios"
            element={
              // <ProtectedRoute activo={activo}>
              <div className="flex">
                <BarraLateral />
                <BarraHorizontal user={usuario} />
                <Usuarios></Usuarios>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/addUsers"
            element={
              // <ProtectedRoute activo={activo}>
              <div className="flex">
                <BarraLateral />
                <BarraHorizontal user={usuario} />
                <AddUsers></AddUsers>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/datosEmpleado"
            element={
              // <ProtectedRoute activo={activo}>
              <div className="flex">
                <BarraLateral />
                <BarraHorizontal user={usuario} />
                <DatosEmpleado></DatosEmpleado>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/recuperacionPassword"
            element={
              // <ProtectedRoute activo={activo}>
              <div className="flex" style={{ width: '99.9%' }}>
                <BarraLateral />
                <BarraHorizontal user={usuario} />
                <RecuperacionPassword></RecuperacionPassword>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/ventas"
            element={
              <ProtectedRoute activo={activo}>
                <BarraHorizontal user={usuario} />
                <div className="flex">
                  <BarraLateral />
                  <div className="content">
                    <div className="flex_content">
                      <MenuVentas></MenuVentas>
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/ventas/nuevaventa"
            element={
              <ProtectedRoute activo={activo}>
                <BarraHorizontal user={usuario} />
                <div className="flex">
                  <BarraLateral />
                  <div className="content">
                    <div className="flex_content">
                      <NuevaVenta />
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/ventas/reportes"
            element={
              <ProtectedRoute>
                <BarraHorizontal user={usuario} />
                <div className="flex">
                  <BarraLateral />
                  <div className="content">
                    <div className="flex_content">
                      <DetalleVenta />
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
