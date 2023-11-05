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
import { ConfigRol } from './Pages/Seguridad/ConfRol.jsx';
import { ListaPermisos } from './Pages/Configuracion/ListaPermisos.jsx';
import { ListaRoles } from './Pages/Seguridad/ListaRoles.jsx';
import { RegistroRoles } from './Pages/Seguridad/RegistroRoles.jsx';
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
import { ListaModelos } from './Pages/Configuracion/ListaModelos.jsx';
import { RegistroModelo } from './Pages/Configuracion/RegistroModelo.jsx';
import { ListaMarcas } from './Pages/Configuracion/ListaMarcas.jsx';
import { RegistroMarcas } from './Pages/Configuracion/RegistroMarcas.jsx';
import { RegistroProducto } from './Pages/Inventario/RegistroProducto.jsx';
import { ListaProductos } from './Pages/Inventario/ListaProductos.jsx';

//Ventas
import { MenuVentas } from './Pages/Ventas/MenuVentas.jsx';
import { NuevaVenta } from './Pages/Ventas/NuevaVenta.jsx';
import { DetalleVenta } from './Pages/Ventas/DetalleVenta.jsx';
import { RegistroGarantia } from './Pages/Ventas/RegistroGarantia.jsx';
import { ListaGarantia } from './Pages/Ventas/ListaGarantia.jsx';
import { RegistroSucursal } from './Pages/Configuracion/RegistroSucursal.jsx';
import { ListaSucursal } from './Pages/Configuracion/ListaSucursal.jsx';
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
import { ActualizarParametro } from './Pages/Configuracion/ActualizarParametro.jsx';
import { InventarioDisponible } from './Pages/Inventario/InventarioDisponible.jsx';
import { Kardex } from './Pages/Inventario/Kardex.jsx';
import { Bitacora } from './Pages/Configuracion/Bitacora.jsx';
import { ListaPromocionMarcas } from './Pages/Inventario/ListaPromocionMarcas.jsx';
import { RegistroPromMarca } from './Pages/Inventario/RegistroPromMarca.jsx';
import { Progress } from './Pages/Seguridad/Progress.jsx';
import { Registration } from './Pages/Seguridad/Registration.jsx';
import { LoginxPrimeraVez } from './Pages/Login/LoginxPrimeraVez.jsx';
import { PreguntasLoginxPV } from './Pages/Login/PreguntasLoginxPV.jsx';

import { RegistroProducto2 } from './Pages/Inventario/RegistroProducto2.jsx';
import { Perfil } from './Pages/Perfil.jsx';
import { PerfilStepper } from './Pages/PerfilStepper.jsx';
import { MetodosDePago } from './Pages/Configuracion/MetodosDePago.jsx';
import { ListaMetodosDePago } from './Pages/Configuracion/ListaMetodosDePago.jsx';
import { ListaPreguntas } from './Pages/Usuarios/ListaPreguntas.jsx';
import { RecordatorioCitas } from './Pages/RecordatorioCitas.jsx';
import { RecordatorioCitasEditar } from './Pages/RecordatorioCitasEditar.jsx';
import { MenuCompras } from './Pages/Compras/MenuCompras.jsx';
import { PreguntasPerfil } from './Pages/PreguntasPerfil.jsx';
import { RegistroDepartamento } from './Pages/Configuracion/RegistroDepartamento.jsx';
import { ListaDepartamentos } from './Pages/Configuracion/ListaDepartamentos.jsx';
import { RegistroCiudad } from './Pages/Configuracion/RegistroCiudad.jsx';
import { ListaCiudad } from './Pages/Configuracion/ListaCiudad.jsx';
import { RegistroPais } from './Pages/Configuracion/RegistroPais.jsx';
import { ListaPais } from './Pages/Configuracion/ListaPais.jsx';
import { RegistroGenero } from './Pages/Configuracion/RegistroGenero.jsx';
import { ListaGenero } from './Pages/Configuracion/ListaGenero.jsx';
import { EditarPreguntas } from './Pages/EditarPreguntas.jsx';
import { DetallesDeVenta } from './Pages/Ventas/DetallesDeVenta.jsx';
import { CalculosDeVenta } from './Pages/Ventas/CalculosDeVenta.jsx';
import { PagoDeVenta } from './Pages/Ventas/PagoDeVenta.jsx';
import { ListaInventario } from './Pages/Inventario/ListaInventario.jsx';
import { Backup } from './Pages/Administracion/Backup.jsx';
import { ListaPagos } from './Pages/Ventas/ListaPagos.jsx';
import { RegistroLente } from './Pages/Inventario/RegistroLente.jsx';
import { ListaLentes } from './Pages/Inventario/ListaLentes.jsx';
import { MenuSeguridad } from './Pages/Seguridad/MenuSeguridad.jsx';

//import { PageFour } from './Components/Preguntas/PageFour/PageFour.js';
import { CambioContraseniaPV } from './Pages/Login/CambioContraseniaPV.jsx';

import { ListaPreguntasDeSeguridad } from './Pages/Configuracion/ListaPreguntasDeSeguridad.jsx';
import { RegistroPreguntaDeSeguridad } from './Pages/Configuracion/RegistroPreguntaDeSeguridad.jsx';



function App() {
  const [registros, setregistros] = useState({});
  const [obj, setobj] = useState(0);
  const [loginpvez, setLoginpvez] = useState(0);
  const [Rol, setRol] = useState('');
  const [idRol, setIdRol] = useState(0)
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [idUsuario, setIdUsuario] = useState(0);
  const [data, setData] = useState({});
  const [dataVenta, setDataVenta] = useState({})
  const [bitacora, setBitacora] = useState({})
  const [actualizar, setActualizar] = useState(false);
  const [activo, setActivo] = useState(''); /**Hook usState:
Mantiene un estado con el que se puede interactuar en distintos componentes,
dependiendo del estado un componente puede reaccionar de formas diferentes */

  const access = acceder => setActivo(acceder); //Prop para cambiar el hregistroclook "activo desde un componente"
  const user = usr => setUsuario(usr);
  const mail = ml => setCorreo(ml);
  const rol = rl => setRol(rl);
  const cObjeto = obb => setobj(obb);
  const id = idd => setIdUsuario(idd);
  const Data = ddata => setData(ddata);
  const update = upd => setActualizar(upd);
  const loginPvz = lpv => setLoginpvez(lpv);
  const registroclientes = reg => setregistros(reg);
  const dVenta = venta => setDataVenta(venta)
  const idrol = idr => setIdRol(idr)
  const bita = bit => setBitacora(bit)



  //hook para manipular el perfil y sus variables
  const [infoPerfil, setinfoPefil] = useState({});
  const perfil = prfl => setinfoPefil(prfl);



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
                idRol={idrol}
                mail={mail}
                idUsuario={id}
                vPerfil={perfil}
                bitacora={bita}
              />
            }
          />

          <Route
            path="/promocion/listaPromocion"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListaPromocion update={update} data={Data} idRol={idRol} />
              </div>
              //  </ProtectedRoute>
            }
          />

          <Route
            path="/cambiocontrasenia"
            element={
              // <ProtectedRoute activo={activo}>
              <div className="flex">
                <CambioContraseniaPV
                  loginpvez={loginPvz}
                  correo={correo}
                  idUsuario={idUsuario}
                  autor={usuario}
                  primeraVez={loginpvez}
                />
              </div>
              //  </ProtectedRoute>
            }
          />

          <Route
            path="/marcas/registroPromMarca"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <RegistroPromMarca></RegistroPromMarca>
              </div>
              // </ProtectedRoute>
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
                    idRol={idRol}
                  />

                  <BarraHorizontal user={usuario} correo={mail} idUsuario={idUsuario} />
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
                loginpvez={loginpvez}
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
                user={usuario}
                // mail={correo}
                infoPerfil={infoPerfil}
                loginPvz={loginPvz}
              />
            }
          ></Route>

          <Route
            path="/preguntasLoginxPV"
            element={
              <PreguntasLoginxPV
                update={update}
                data={Data}
                idUsuario={idUsuario}
                infoPerfil={infoPerfil}
                user={usuario}

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
                infoPerfil={infoPerfil}
                idUsuario={idUsuario}

              />
            }
          ></Route>

          <Route
            path="/preguntasPerfil"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <PreguntasPerfil
                    update={update}
                    data={Data}
                    idUsuario={idUsuario}
                    infoPerfil={infoPerfil}
                    user={usuario}
                  />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/editarPreguntas"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <EditarPreguntas
                    update={update}

                    data={data}

                    idUsuario={idUsuario}
                    infoPerfil={infoPerfil}
                    user={usuario}



                  />
                </div>
              </ProtectedRoute>
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
                  idUsuario={idUsuario}
                  idRol={idRol}
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
                  idUsuario={idUsuario}
                  idRol={idRol}
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
                  idUsuario={idUsuario}
                  idRol={idRol}
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <AddUsers
                  idU={idUsuario}
                  data={data}
                  update={actualizar}
                  limpiarData={Data}
                  limpiarUpdate={update}
                  activo={bitacora}
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListUsuarios update={update} data={Data} idRol={idRol} />
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <AddClientes
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  Data={Data}
                />
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
                  idUsuario={idUsuario}
                  idRol={idRol}
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
                    idUsuario={idUsuario}
                    idRol={idRol}
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
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <RegistroModelo
                    actualizar={actualizar}
                    update={update}
                    data={data} garanr
                    Data={Data}
                  />
                </div>
              </ProtectedRoute>
            }
          ></Route>
          {/* <Route
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
          ></Route> */}
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />

                <RegistroProducto2
                  actualizar={actualizar}
                  update={update}
                  data={data} garanr
                  Data={Data}
                  idUsuario={idUsuario}
                ></RegistroProducto2>

              </div>
              //</ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuInventario/RegistroProveedores"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <RegistroProveedores
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  Data={Data}
                ></RegistroProveedores>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Inventario/RegistroLente"
            element={
              //  <ProtectedRoute activo={activo}>
              <div className="flex">
                <BarraLateral
                  user={user}
                  rol={rol}
                  mail={mail}
                  estado={access}
                  Rol={Rol}
                  obj={cObjeto}
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <RegistroLente
                  actualizar={actualizar}
                  update={update}
                  data={data} garanr
                  Data={Data}
                />
              </div>
              //  </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/RegistroMarcas"
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
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <RegistroMarcas
                    actualizar={actualizar}
                    update={update}
                    data={data}
                    Data={Data}
                  />
                </div>
              </ProtectedRoute>
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <MetodosDePago
                  actualizar={actualizar}
                  update={update}
                  data={data} garanr
                  Data={Data}
                />
              </div>
              //  </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/RegistroDepartamento"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <RegistroDepartamento
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  Data={Data}
                />
              </div>
              //  </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/RegistroCiudad"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <RegistroCiudad
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  Data={Data}
                />
              </div>
              //  </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/RegistroPais"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <RegistroPais
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  Data={Data}
                />
              </div>
              //  </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/RegistroGenero"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <RegistroGenero
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  Data={Data}
                />
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListaEmpleados update={update} data={Data} idRol={idRol} />

              </div>
              //  </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Preguntas/lista"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  {/* <BarraLateral
                    user={user}
                    rol={rol}
                    mail={mail}
                    estado={access}
                    Rol={Rol}
                    obj={cObjeto}
                    idUsuario={id}
                  />
                  <BarraHorizontal user={usuario} /> */}
                  <ListaPreguntas update={update} data={Data} idUsuario={idUsuario} />
                </div>
              </ProtectedRoute>
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
                    idUsuario={idUsuario}
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <ListaModelos
                    update={update}
                    data={Data}
                    idRol={idRol}
                  />
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListaParametros
                  update={update}
                  data={Data}

                />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/ActualizarParametros"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ActualizarParametro
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  Data={Data}
                />
              </div>
              //  </ProtectedRoute>
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
                    idUsuario={idUsuario}
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <ListaMarcas
                    update={update}
                    data={Data}
                    idRol={idRol}
                  />
                </div>
            //  </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/MenuInventario/ListaLentes"
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
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <ListaLentes
                    update={update}
                    data={Data}
                    idRol={idRol}
                  />
                </div>
            //  </ProtectedRoute>
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
                    idUsuario={idUsuario}
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <ListaMetodosDePago
                    update={update}
                    data={Data}
                    idRol={idRol}
                  />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/ListaDepartamentos"
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
                    idRol={idRol}
                  />
                  <BarraHorizontal usxer={usuario} />
                  <ListaDepartamentos
                    update={update}
                    data={Data}
                    idRol={idRol}
                  />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/ListaCiudad"
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
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <ListaCiudad
                    update={update}
                    data={Data}
                    idRol={idRol}
                  />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/ListaPais"
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
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <ListaPais
                    update={update}
                    data={Data}
                    idRol={idRol}
                  />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/ListaGenero"
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
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <ListaGenero
                    update={update}
                    data={Data}
                    idRol={idRol}
                  />
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
                    idUsuario={idUsuario}
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <Kardex idRol={idRol} />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/Administracion/Bitacora"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <Bitacora
                  bitacora={bitacora}
                  bita={bita}
                />
              </div>
              // </ProtectedRoute>

            }
          ></Route>

          <Route
            path="/Inventario/InventarioDisponible"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <InventarioDisponible data={Data} idRol={idRol} />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/ListaPromociones"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListaPromocion update={update} data={Data} idRol={idRol} />

              </div>
              //</ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuInventario/ListaProveedores"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListaProveedores update={update} data={Data} idRol={idRol} />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuInventario/ListaProductos"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListaProductos update={update} data={Data} idRol={idRol} />
              </div>
              //</ProtectedRoute>
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListaClientes
                  datosclientes={registroclientes}
                  // update={update} data={Data} 
                  update={update}
                  data={Data}
                  idRol={idRol}
                />

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
                    idUsuario={idUsuario}
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <ListaExpedientes data={Data} idRol={idRol} />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/ListaPagos"
            element={

              <div className="flex">
                <BarraLateral
                  user={user}
                  rol={rol}
                  mail={mail}
                  estado={access}
                  Rol={Rol}
                  obj={cObjeto}
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />

                <ListaPagos data={dVenta} idRol={idRol} />

              </div>

            }
          ></Route>

          <Route
            path="/menuVentas/listaGarantias"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListaGarantia
                  update={update}
                  data={Data}
                  idRol={idRol}
                />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/listaVenta"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListaVenta datosventa={dVenta} idRol={idRol} />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuInventario/listaCompra"
            element={
              //  <ProtectedRoute activo={activo}>
              <div className="flex">
                <BarraLateral
                  user={user}
                  rol={rol}
                  mail={mail}
                  estado={access}
                  Rol={Rol}
                  obj={cObjeto}
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListaCompra idRol={idRol} />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuInventario/listaInventario"
            element={
              //  <ProtectedRoute activo={activo}>
              <div className="flex">
                <BarraLateral
                  user={user}
                  rol={rol}
                  mail={mail}
                  estado={access}
                  Rol={Rol}
                  obj={cObjeto}
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <ListaInventario data={data} Data={Data} idRol={idRol} />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/listaSucursal"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListaSucursal update={update} data={Data} idRol={idRol} />
              </div>
              // </ProtectedRoute>
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
                    idUsuario={idUsuario}
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <ListaDescuento
                    update={update}
                    data={Data}
                    idRol={idRol}
                  />
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/ListaPromocionProducto"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListaProductoPromocion update={update} data={Data} />
              </div>
              // </ProtectedRoute>
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />

                <DatosEmpleado
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  Data={Data}
                  idUsuario={idUsuario}
                  activo={bitacora}
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
                    idUsuario={idUsuario}
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <RecuperacionPassword></RecuperacionPassword>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/seguridad"
            element={
              //<ProtectedRoute activo={activo}>
              <div className="flex" style={{ width: '99%' }}>
                <BarraLateral
                  user={user}
                  rol={rol}
                  mail={mail}
                  estado={access}
                  Rol={Rol}
                  obj={cObjeto}
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <MenuSeguridad></MenuSeguridad>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

         {/*  <Route
            path="/compras"
            element={
              //<ProtectedRoute activo={activo}>
              <div className="flex" style={{ width: '99%' }}>
                <BarraLateral
                  user={user}
                  rol={rol}
                  mail={mail}
                  estado={access}
                  Rol={Rol}
                  obj={cObjeto}
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <MenuCompras></MenuCompras>
              </div>
              // </ProtectedRoute>
            }
          ></Route> */}
          <Route
            path="/ventas"
            element={
              //<ProtectedRoute activo={activo}>
              <div className="flex" style={{ width: '99%' }}>
                <BarraLateral
                  user={user}
                  rol={rol}
                  mail={mail}
                  estado={access}
                  Rol={Rol}
                  obj={cObjeto}
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <MenuVentas></MenuVentas>
              </div>
              // </ProtectedRoute>
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
                    idUsuario={idUsuario}
                    idRol={idRol}
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <RegistroGarantia
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  Data={Data}
                />
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <RegistroPromocion
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  Data={Data}
                ></RegistroPromocion>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/NuevaVenta"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <NuevaVenta venta={dVenta}
                  update={update}
                  data={data} garanr
                  Data={Data} />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/PagoDeVenta"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <PagoDeVenta venta={dataVenta} dataVenta={dVenta} idUsuario={idUsuario} />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/CalculosDeVenta"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <CalculosDeVenta venta={dataVenta} dataVenta={dVenta} />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/DetallesDeVenta"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />

                <DetallesDeVenta venta={dataVenta} dataVenta={dVenta} idUsuario={idUsuario} />

              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/DetalleVenta"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <DetalleVenta />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/DetalleVentaDescuento"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <DetalleVentaDescuento />
              </div>
              //  </ProtectedRoute>
            }
          ></Route>


          <Route
            path="/menuVentas/DetalleVentaPromocion"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <DetalleVentaPromocion />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuVentas/DetallePromocionMarca"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <DetallePromocionMarca />
              </div>
              //  </ProtectedRoute>
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <PromocionProducto
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  Data={Data}
                ></PromocionProducto>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/menuCompras/NuevaCompra"
            element={
              // <ProtectedRoute activo={activo}>
              <div className="flex" style={{ width: '99%' }}>
                <BarraLateral
                  user={user}
                  rol={rol}
                  mail={mail}
                  estado={access}
                  Rol={Rol}
                  obj={cObjeto}
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <NuevaCompra idUsuario={idUsuario} />
              </div>
              //  </ProtectedRoute>
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
                    idUsuario={idUsuario}
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <RegistroDescuento
                    actualizar={actualizar}
                    update={update}
                    data={data}
                    Data={Data}
                  />
                </div>
              //  </ProtectedRoute>
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <DatosExpediente id={data} datosclientes={registros} dataa={Data} datosclientess={registroclientes} />
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <DetalleExpediente data={Data} Data={data} />
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <Diagnostico data={data} id={data} datosclientes={registros} idUsuario={idUsuario} />
              </div>

              // {/* </ProtectedRoute> */}
            }
          ></Route>

          <Route
            path="/config/RegistroSucursal"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <RegistroSucursal
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  Data={Data}
                ></RegistroSucursal>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/perfil"
            element={
              // <ProtectedRoute activo={activo}>
              <div className="">
                <Perfil
                  infoPerfil={infoPerfil}
                  idUsuario={idUsuario}
                  update={update}
                  data={data}



                />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <Configuracion></Configuracion>
              </div>
              // </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/config/roles"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />

                <ConfigRol usuario={usuario} />
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/ListaRoles"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListaRoles update={update} data={Data} idRol={idRol} />

              </div>
              //  </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/crearRol"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />

                <RegistroRoles
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  Data={Data}
                  idUsuario={idUsuario}
                  activo={bitacora}
                ></RegistroRoles>
              </div>
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/usuarios/backup"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />

                <Backup />
              </div>
              // </ProtectedRoute>
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
                    idUsuario={idUsuario}
                    idRol={idRol}
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
                    idUsuario={idUsuario}
                    idRol={idRol}
                  />
                  <BarraHorizontal user={usuario} />
                  <Recordatorio
                    update={update}
                    data={Data}
                    idUsuario={idUsuario}
                    idRol={idRol}

                    // infoPerfil={infoPerfil}
                    user={usuario}
                  ></Recordatorio>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/recordatorioCitas"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">

                  <RecordatorioCitas
                    update={update}
                    data={Data}
                    idUsuario={idUsuario}
                    // infoPerfil={infoPerfil}
                    user={usuario}
                  //data={data}

                  ></RecordatorioCitas>
                </div>
              </ProtectedRoute>
            }
          ></Route>


          <Route
            path="/recordatorioCitasEditar"
            element={
              <ProtectedRoute activo={activo}>
                <div className="flex">
                  <RecordatorioCitasEditar
                    update={update}

                    data={data}

                    idUsuario={idUsuario}
                    //infoPerfil={infoPerfil}
                    user={usuario}
                  ></RecordatorioCitasEditar>
                </div>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/config/PreguntasSeguridad"
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
                  idUsuario={idUsuario}
                  idRol={idRol}
                />
                <BarraHorizontal user={usuario} />
                <ListaPreguntasDeSeguridad update={update} data={Data} idRol={idRol} />
              </div>
              // </ProtectedRoute>
            }
          ></Route>


          <Route
            path="/config/AgregarPreguntas"
            element={
              //<ProtectedRoute activo={activo}>
              <div className="flex">

                <RegistroPreguntaDeSeguridad
                  actualizar={actualizar}
                  update={update}
                  data={data}
                  idUsuario={idUsuario}
                  infoPerfil={infoPerfil}
                  user={usuario}
                  Data={Data}
                //data={data}

                ></RegistroPreguntaDeSeguridad>
              </div>
              //</ProtectedRoute>
            }
          ></Route>



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;