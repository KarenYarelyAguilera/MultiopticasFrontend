import { BrowserRouter, Routes, Route } from 'react-router-dom'; //Sirven para invocar componentes segun la ruta que se especifique
import { useState } from 'react';
import React from 'react';

//Components
import { ProtectedRoute } from './Components/ProtectedRoute.jsx';
import { BarraHorizontal } from './Components/BarraHorizontal.jsx';
import { BarraLateral } from './Components/BarraLateral.jsx';

//Pages
import { Home } from './Pages/Home.jsx';
import { Recordatorio } from './Pages/Recordatorio.jsx';

//Login
import { Login } from './Pages/Login/login.jsx';

//Usuarios
import { Usuarios } from './Pages/Usuarios/Usuarios.jsx';
import { AddUsers } from './Pages/Usuarios/AddUsers.jsx';
import { DatosEmpleado } from './Pages/Usuarios/DatosEmpleado.jsx';
import { ListUsuarios } from './Pages/Usuarios/ListaUsuarios.jsx';
import { ListaEmpleados } from './Pages/Usuarios/ListaEmpleados.jsx';

//Seguridad
import { RecuperacionPassword } from './Pages/Seguridad/RecuperacionPassword.jsx';
import { PreguntasSeguridad } from './Pages/Seguridad/PreguntasSeguridad.jsx';
import { ConfirmarPassword } from './Pages/Seguridad/ConfirmarPassword.jsx';
import { Metodos } from './Pages/Seguridad/Metodos.jsx';
import { Metodos1 } from './Pages/Seguridad/Metodos1.jsx';

//Configuracion
import { Configuracion } from './Pages/Configuracion/Config.jsx';
import { ConfigRol } from './Pages/Configuracion/ConfRol.jsx';
import { ListaPermisos } from './Pages/Configuracion/ListaPermisos.jsx';

//Clientes
import { Clientes } from './Pages/Clientes/Clientes.jsx';
import { ListaClientes } from './Pages/Clientes/ListaClientes.jsx';
import { AddClientes } from './Pages/Clientes/AddClientes.jsx';
import { RegistroClientes } from './Pages/Clientes/RegistroClientes.jsx';
import { ListaExpedientes } from './Pages/Clientes/ListaExpedientes.jsx';
import { DatosExpediente } from './Pages/Clientes/DatosExpediente.jsx';
import { DetalleExpediente } from './Pages/Clientes/DetalleExpediente.jsx';
import { Diagnostico } from './Pages/Clientes/Diagnostico.jsx';


//Inventario
import { Inventario } from './Pages/Inventario/Inventario.jsx';
import { RegistroInventario } from './Pages/Inventario/RegistroInventario.jsx';
import { ListaModelos } from './Pages/Inventario/ListaModelos.jsx';
import { RegistroModelo } from './Pages/Inventario/RegistroModelo.jsx';
import { ListaMarcas } from './Pages/Inventario/ListaMarcas.jsx';
import { RegistroMarcas } from './Pages/Inventario/RegistroMarcas.jsx';
import { RegistroProducto } from './Pages/Inventario/RegistroProducto.jsx';
import { ListaProductos } from './Pages/Inventario/ListaProductos.jsx';

//Ventas
import { MenuVentas } from './Pages/Ventas/MenuVentas.jsx';
import { NuevaVenta } from './Pages/Ventas/NuevaVenta.jsx';
import { DetalleVenta } from './Pages/Ventas/DetalleVenta.jsx';
import { RegistroGarantia } from './Pages/Ventas/RegistroGarantia.jsx';
import { ListaGarantia } from './Pages/Ventas/ListaGarantia.jsx';
import { RegistroSucursal } from './Pages/Ventas/RegistroSucursal.jsx';
import { ListaSucursal } from './Pages/Ventas/ListaSucursal.jsx';
import { ListaDescuento } from './Pages/Ventas/ListaDescuento.jsx';
import { RegistroDescuento } from './Pages/Ventas/RegistroDecuento.jsx';
import { ListaVenta } from './Pages/Ventas/ListaVenta.jsx';
import { NuevaCompra } from './Pages/Ventas/NuevaCompra.jsx';
import { ListaCompra } from './Pages/Ventas/ListaCompra.jsx';
import { DetalleVentaDescuento } from './Pages/Ventas/DetalleVentaDescuento.jsx';
import { DetalleVentaPromocion } from './Pages/Ventas/DetalleVentaPromocion.jsx';
import { DetallePromocionMarca } from './Pages/Ventas/DetallePromocionMarca.jsx';
import { PromocionProducto } from './Pages/Ventas/PromocionProducto.jsx';
import { ListaProductoPromocion } from './Pages/Ventas/ListaProductoPromocion.jsx';
import { AddExpediente } from './Pages/Clientes/AddExpediente.jsx';
import { RegistroProveedores } from './Pages/Inventario/RegistroProveedores.jsx';
import { ListaProveedores } from './Pages/Inventario/ListaProveedores.jsx';
import { ListaPromocion } from './Pages/Ventas/ListaPromocion.jsx';
import { RegistroPromocion } from './Pages/Ventas/RegistroPromocion.jsx';
import { ListaParametros } from './Pages/Configuracion/ListaParametros.jsx';
import { InventarioDisponible } from './Pages/Inventario/InventarioDisponible.jsx';
import { Kardex } from './Pages/Inventario/Kardex.jsx';
import { Bitacora } from './Pages/Configuracion/Bitacora.jsx';
import { ListaPromocionMarcas } from './Pages/Inventario/ListaPromocionMarcas.jsx';
import { RegistroPromMarca } from './Pages/Inventario/RegistroPromMarca.jsx';
import { Progress } from './Pages/Seguridad/Progress.jsx';
import { Registration } from './Pages/Seguridad/Registration.jsx';
import { LoginxPrimeraVez } from './Pages/Login/LoginxPrimeraVez.jsx';

import { RegistroProducto2 } from './Pages/Inventario/RegistroProducto2.jsx';
import { Perfil } from './Pages/Perfil.jsx';
import { PerfilStepper } from './Pages/PerfilStepper.jsx';
import { MetodosDePago } from './Pages/Configuracion/MetodosDePago.jsx';
import { ListaMetodosDePago } from './Pages/Configuracion/ListaMetodosDePago.jsx';


function App() {
  const [obj, setobj] = useState(0);
  const [Rol, setRol] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [idUsuario, setIdUsuario] = useState(0);
  const [data, setData] = useState({});
  const [actualizar, setActualizar] = useState(false);
  const [activo, setActivo] = useState(''); /**Hook usState:
Mantiene un estado con el que se puede interactuar en distintos componentes,
dependiendo del estado un componente puede reaccionar de formas diferentes */

  const access = acceder => setActivo(acceder); //Prop para cambiar el hook "activo desde un componente"
  const user = usr => setUsuario(usr);
  const mail = ml => setCorreo(ml);
  const rol = rl => setRol(rl);
  const cObjeto = obb => setobj(obb);
  const id = idd => setIdUsuario(idd);
  const Data = ddata => setData(ddata);
  const update = upd => setActualizar(upd);

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
            path="/"
            element={
              <Login
                access={access}
                user={user}
                rol={rol}
                mail={mail}
                idUsuario={id}
              />
            }
          />

          <Route
            path="/promocion/listaPromocion"
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
                  <ListaPromocionMarcas></ListaPromocionMarcas>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/marcas/registroPromMarca"
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
                  <RegistroPromMarca></RegistroPromMarca>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
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
                    idUsuario={idUsuario}
                  />
                  <BarraHorizontal user={Rol} correo={mail} />
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
            element={<Metodos1 activo={activo} user={usuario} mail={correo} />}
          ></Route>

          <Route
            path="/progress"
            element={
              <Progress
                estado={activo}
                id={idUsuario}
              // activo={activo}
              // user={usuario}
              // mail={correo}
              />
            }
          ></Route>

          <Route
            path="/loginPrimeraVez"
            element={
              <LoginxPrimeraVez
                estado={activo}
                id={idUsuario}
              // activo={activo}
              // user={usuario}
              // mail={correo}
              />
            }
          ></Route>

<Route
            path="/perfilStepper"
            element={
              <PerfilStepper
              // activo={activo}
              // user={usuario}
              // mail={correo}
              />
            }
          ></Route>

          <Route
            path="/registration"
            element={
              <Registration
              // activo={activo}
              // user={usuario}
              // mail={correo}
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
              // /*  <ProtectedRoute activo={activo}> */
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
              // /*  <ProtectedRoute activo={activo}> */
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
                <Usuarios rol={Rol} obj={obj} id={idUsuario}></Usuarios>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/usuarios/crearusuario"
            element={
              ///*  <ProtectedRoute activo={activo}> */
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
                <AddUsers
                  idU={idUsuario}
                  data={data}
                  update={actualizar}
                  limpiarData={Data}
                  limpiarUpdate={update}
                ></AddUsers>
              </div>
              //</ProtectedRoute>
            }
          ></Route>

          <Route
            path="/usuarios/lista"
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
                <ListUsuarios update={update} data={Data} />
              </div>
              //</ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuClientes/nuevoCliente"
            element={
              //<ProtectedRoute activo={activo}>
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
              //</ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuClientes/nuevoExpediente"
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
                <AddExpediente />
              </div>
              //</ProtectedRoute>
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
            path="/config/RegistroModelo"
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
                <RegistroModelo />
              </div>
              //</ProtectedRoute>
            }
          ></Route>
          <Route
            path="/menuInventario/RegistroProducto"
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
                <RegistroProducto />
              </div>
              //</ProtectedRoute>
            }
          ></Route>
          <Route
            path="/menuInventario/RegistroProducto2"
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
                <RegistroProducto2 />
              </div>
              //</ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuInventario/RegistroProveedores"
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
                  <RegistroProveedores />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/RegistroMarcas"
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
                <RegistroMarcas />
              </div>
              //  </ProtectedRoute>
            }
          ></Route>

<Route
            path="/config/MetodosDePago"
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
                <MetodosDePago />
              </div>
              //  </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/empleados/lista"
            element={
              //<ProtectedRoute activo={activo}>
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
                <ListaEmpleados update={update} data={Data} />
              </div>
              //  </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/lista"
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
                  <ListaModelos />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/ListaParametros"
            element={
              //<ProtectedRoute activo={activo}>
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
                <ListaParametros />
              </div>
              // </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/config/ListaMarcas"
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
                  <ListaMarcas />
                </div>
              </ProtectedRoute>
            }
          ></Route>

<Route
            path="/config/ListaMetodosDePago"
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
                  <ListaMetodosDePago />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuInventario/Kardex"
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
                  <Kardex />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/Bitacora"
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
                  <Bitacora />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Inventario/InventarioDisponible"
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
                  <InventarioDisponible />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/ListaPromociones"
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
                  <ListaPromocion />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuInventario/ListaProveedores"
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
                  <ListaProveedores />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuInventario/ListaProductos"
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
                  <ListaProductos />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuClientes/lista"
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
                <ListaClientes />
              </div>
              // </ProtectedRoute>
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
            path="/menuVentas/listaGarantias"
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
                  <ListaGarantia />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/listaVenta"
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
                  <ListaVenta />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuInventario/listaCompra"
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
                  <ListaCompra />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/listaSucursal"
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
                  <ListaSucursal />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/listaDescuento"
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
                  <ListaDescuento />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/ListaPromocionProducto"
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
                  <ListaProductoPromocion />
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

                <DatosEmpleado
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  Data={Data}
                ></DatosEmpleado>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/recuperacionPassword"
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
                  <RecuperacionPassword></RecuperacionPassword>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/ventas"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex" style={{ width: '99%' }}>
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
            path="/menuVentas/RegistroGarantia"
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
                <RegistroGarantia />
              </div>
              //  </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/RegistroPromociones"
            element={
              //<ProtectedRoute activo={activo}>
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
                <RegistroPromocion />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/NuevaVenta"
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
            path="/menuVentas/DetalleVenta"
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
            path="/menuVentas/DetalleVentaDescuento"
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
                  <DetalleVentaDescuento />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/DetalleVentaPromocion"
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
                  <DetalleVentaPromocion />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/DetallePromocionMarca"
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
                  <DetallePromocionMarca />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/PromocionProducto"
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
                <PromocionProducto />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuInventario/NuevaCompra"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex" style={{ width: '99%' }}>
                  <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                  />
                  <BarraHorizontal user={usuario} />
                  <NuevaCompra idUsuario={idUsuario} />
                </div>
              </ProtectedRoute>
            }
          ></Route>



          <Route
            path="/menuVentas/RegistroDescuento"
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
                  <RegistroDescuento />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuClientes/DatosExpediente"
            element={
              // // <ProtectedRoute activo={activo}>
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
                <DatosExpediente />
              </div>
              // {/* </ProtectedRoute> */}
            }
          ></Route>

          <Route
            path="/menuClientes/DetalleExpediente"
            element={
              // // <ProtectedRoute activo={activo}>
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
                <DetalleExpediente />
              </div>
              // {/* </ProtectedRoute> */}
            }
          ></Route>

<Route
            path="/menuClientes/Diagnostico"
            element={
              // // <ProtectedRoute activo={activo}>
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
                <Diagnostico />
              </div>
              // {/* </ProtectedRoute> */}
            }
          ></Route>

          <Route
            path="/config/RegistroSucursal"
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
                  <RegistroSucursal />
                </div>
              </ProtectedRoute>
            }
          ></Route>

<Route
            path="/config/perfil"
            element={
              // <ProtectedRoute activo={activo}>
                <div className="">
                  <Perfil />
                </div>
              // </ProtectedRoute>
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

                  <ConfigRol usuario={usuario} />
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
                  <ListaPermisos />
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
                  <Recordatorio></Recordatorio>
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
