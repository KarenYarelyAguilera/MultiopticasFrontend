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
import { PreguntasSeguridad } from './Pages/PreguntasSeguridad.jsx';
import { ConfirmarPassword } from './Pages/ConfirmarPassword.jsx';
import { DatosEmpleado } from './Pages/DatosEmpleado.jsx';
import { Metodos } from './Pages/Metodos.jsx';
import { ListaEmpleados } from './Pages/ListaEmpleados.jsx';
import { ListUsuarios } from './Pages/ListaUsuarios.jsx';
import { Metodos1 } from './Pages/Metodos1.jsx';

function App() {
  const [Rol, setRol] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [activo, setActivo] = useState('inactivo'); /**Hook usState:
Mantiene un estado con el que se puede interactuar en distintos componentes,
dependiendo del estado un componente puede reaccionar de formas diferentes */

  const access = acceder => setActivo(acceder); //Prop para cambiar el hook "activo desde un componente"
  const user = usr => setUsuario(usr);
  const mail = ml => setCorreo(ml);
  const rol = rl => setRol(rl);

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
            element={
              <Login access={access} user={user} correo={mail} rol={rol} />
            }
          />

          <Route
            path="/empleados/lista"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral />
                  <BarraHorizontal user={usuario} />
                  <ListaEmpleados></ListaEmpleados>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/usuarios/lista"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral />
                  <BarraHorizontal user={usuario} />
                  <ListUsuarios />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/Home"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral />
                  <BarraHorizontal user={usuario} />
                  <Home></Home>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/recuperacion"
            element={<Metodos correo={mail}></Metodos>}
          ></Route>

          <Route
            path="/recuperacion/preguntas/newPassword"
            element={<Metodos1></Metodos1>}
          ></Route>

          <Route
            path="/preguntasSeguridad"
            element={<PreguntasSeguridad/>}
          ></Route>

          <Route
            path="/preguntasSeguridad/confirmarPassword"
            element={<ConfirmarPassword/>}
          ></Route>

          <Route
            path="/recuperacion/preguntas"
            element={
              <RecuperacionPassword correo={correo}></RecuperacionPassword>
            }
          ></Route>

          <Route
            path="/inventario"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral />
                  <BarraHorizontal user={usuario} />
                  <Inventario></Inventario>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/registroInventario"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral />
                  <BarraHorizontal user={usuario} />
                  <RegistroInventario></RegistroInventario>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/usuarios"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral />
                  <BarraHorizontal user={usuario} />
                  <Usuarios rol={Rol}></Usuarios>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/usuarios/crearusuario"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral />
                  <BarraHorizontal user={usuario} />
                  <AddUsers></AddUsers>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/usuarios/crearempleado"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral />
                  <BarraHorizontal user={usuario} />
                  <DatosEmpleado></DatosEmpleado>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/recuperacionPassword"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral />
                  <BarraHorizontal user={usuario} />
                  <RecuperacionPassword></RecuperacionPassword>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/ventas"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral />
                  <BarraHorizontal user={usuario} />
                  <MenuVentas></MenuVentas>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/ventas/nuevaventa"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral />
                  <BarraHorizontal user={usuario} />
                  <NuevaVenta />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/ventas/reportes"
            element={
              <ProtectedRoute>
                <div className="flex">
                  <BarraLateral />
                  <BarraHorizontal user={usuario} />
                  <DetalleVenta />
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
