import { BrowserRouter, Routes, Route } from 'react-router-dom'; //Sirven para invocar componentes segun la ruta que se especifique
import { useState } from 'react';
import React from 'react';

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
import { Configuracion } from './Pages/Config.jsx';
import { ConfigRol } from './Pages/ConfRol.jsx';
import { ListaPermisos } from './Pages/ListaPermisos.jsx';
import { Recordatorio } from './Pages/Recordatorio.jsx';
import { Clientes } from './Pages/Clientes.jsx';
import { ListaClientes } from './Pages/ListaClientes.jsx';
import { AddClientes } from './Pages/AddClientes.jsx';
import { RegistroClientes } from './Pages/RegistroClientes.jsx';
import { ListaExpedientes } from './Pages/ListaExpedientes.jsx';

function App() {
  const [obj, setobj] = useState(0);
  const [Rol, setRol] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [idUsuario, setIdUsuario] = useState(0);
  const [activo, setActivo] = useState(''); /**Hook usState:
Mantiene un estado con el que se puede interactuar en distintos componentes,
dependiendo del estado un componente puede reaccionar de formas diferentes */

  const access = acceder => setActivo(acceder); //Prop para cambiar el hook "activo desde un componente"
  const user = usr => setUsuario(usr);
  const mail = ml => setCorreo(ml);
  const rol = rl => setRol(rl);
  const cObjeto = obb => setobj(obb);
  const id = idd => setIdUsuario(idd);

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

          {/* <Route index element={<Login access={access} user={user} />} /> */}

          <Route
            index
            element={
              <Login access={access} user={user} rol={rol} mail={mail} />
            }
          />

          <Route
            path="/empleados/lista"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
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
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <ListUsuarios />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
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
            element={<Metodos1 correo={correo}></Metodos1>}
          ></Route>

          <Route
            path="/preguntasSeguridad"
            element={
              <PreguntasSeguridad
                activo={activo}
                user={usuario}
                mail={correo}
              />
            }
          ></Route>

          <Route
            path="/preguntasSeguridad/confirmarPassword"
            element={<ConfirmarPassword correo={correo} />}
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
              // <ProtectedRoute activo={activo}>
              <div className="flex">
                <BarraLateral
                  user={user}
                  rol={rol}
                  mail={mail}
                  estado={access}
                  Rol={Rol}
                  obj={cObjeto}
                />
                <BarraHorizontal user={usuario} />
                <Inventario></Inventario>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/registroInventario"
            element={
              // <ProtectedRoute activo={activo}>
              <div className="flex">
                <BarraLateral
                  user={user}
                  rol={rol}
                  mail={mail}
                  estado={access}
                  Rol={Rol}
                  obj={cObjeto}
                />
                <BarraHorizontal user={usuario} />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/usuarios"
            element={
              // <ProtectedRoute activo={activo}>
              <div className="flex">
                <BarraLateral
                  user={user}
                  rol={rol}
                  mail={mail}
                  estado={access}
                  Rol={Rol}
                  obj={cObjeto}
                  id={idUsuario}
                />
                <BarraHorizontal user={usuario} />
                <Usuarios rol={Rol} obj={obj}></Usuarios>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/usuarios/crearusuario"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <AddUsers></AddUsers>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuClientes/nuevoCliente"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <AddClientes />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuClientes/registroCliente"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <RegistroClientes />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/usuarios/lista"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <ListUsuarios />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/empleados/lista"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <ListaEmpleados />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuClientes/lista"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <ListaClientes />
                </div>
              </ProtectedRoute>
            }
          ></Route>

<Route
            path="/menuClientes/listaExpedientes"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <ListaExpedientes />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/usuarios/crearempleado"
            element={
              // <ProtectedRoute activo={activo}>
              <div className="flex">
                <BarraLateral
                  user={user}
                  rol={rol}
                  mail={mail}
                  estado={access}
                  Rol={Rol}
                  obj={cObjeto}
                />
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
              <div className="flex">
                <BarraLateral
                  user={user}
                  rol={rol}
                  mail={mail}
                  estado={access}
                  Rol={Rol}
                  obj={cObjeto}
                />
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
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <MenuVentas></MenuVentas>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuClientes"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <Clientes></Clientes>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/ventas/nuevaventa"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <NuevaVenta />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/ventas/reportes"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <DetalleVenta />
                </div>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/config"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <Configuracion></Configuracion>
                </div>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/config/roles"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />

                  <ConfigRol />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/verpermisos"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <div className="content">
                    <ListaPermisos />
                  </div>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/recordatorio"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <div className="content">
                    <Recordatorio></Recordatorio>
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
