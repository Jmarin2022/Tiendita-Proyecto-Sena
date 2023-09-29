import 'bootstrap/dist/css/bootstrap.min.css';
/*import { UserProvider } from './UserContext';*/
import React from 'react';
import { Route, Routes, BrowserRouter} from "react-router-dom";

/* Metodo de Dasboard*/
import { Inicio } from "./componentes/principales/login";
import { NavBar } from "./componentes/principales/navbar";
import { Dashboard } from './componentes/principales/Dasboard'
import { Resgistrarse } from './componentes/principales/resgistrarse'
import { Recuperar } from './componentes/principales/Recuperar'
import { Nuevacontraseña } from './componentes/principales/Nuevacontraseña'
import { DigitarNumero } from './componentes/principales/Validar'
import { CambiarContraseña } from './componentes/principales/CambiarContraseña'
import { Cambiar } from './componentes/principales/Cambiar'
import { CistaCliente } from './componentes/principales/vistaCliente'

import { DescargarExcel } from "./componentes/entradas/DescargarExcel"




/* Metodo de listar*/
import { LandingPage } from "./componentes/principales/LandingPage"
import { ListadoCliente } from "./componentes/cliente/cliente";
import { Listadoventa } from "./componentes/venta/venta"
import { Listadocategoria } from "./componentes/categoria/categoria"
import { Listadodetalleventa } from "./componentes/detalleventa/detalleventa"
import { Listadoentradum } from "./componentes/entradas/entradum"

import { Listadoimagen } from "./componentes/imagen/imagen"
import { Listadopermiso } from "./componentes/permiso/permiso"
import { ListadoRol } from "./componentes/rol/rol"
import { Listadorolespermiso } from "./componentes/rolpermiso/rolpermiso"
import { Listadousuario } from "./componentes/usuario/usuario"

/* Metodo de post*/
import { GuardarCategoria } from "./componentes/categoria/categoriaguardar"
import { GuardarCliente } from "./componentes/cliente/clienteguardar"
import { GuardarImagen } from "./componentes/imagen/imagenguardar"
import { GuardarEntradas } from "./componentes/entradas/entradumguardar"
import { GuardarPermiso } from "./componentes/permiso/permisoguardar"
import { GuardarRol } from "./componentes/rol/rolguardar"
import { GuardarRolPermiso } from "./componentes/rolpermiso/rolpermisoguardar"
import  GuardarUsuario  from "./componentes/usuario/usuarioguardar"
import { GuardarVenta } from "./componentes/venta/ventaguardar"
import { ProductosFormulario } from "./componentes/detalleventa/detalleventaguardar"
import { ImageUploaderHola } from "./componentes/imagen/imagen - Copia"

/*Metodo get para detalle*/
import { CategoriaDetalles } from "./componentes/categoria/categoriaDetalles"
import { ClienteDetalles } from "./componentes/cliente/clienteDetalles";
import { EntradumsDetalles } from "./componentes/entradas/entradumDetalles"
import { ImagenDetalles } from "./componentes/imagen/imagenDetalles"
import { PermisosDetalles } from "./componentes/permiso/permisoDetalles"
import { RolDetalles } from "./componentes/rol/rolDetalles"
import { UsuarioDetalles } from "./componentes/usuario/usuarioDetalles"
import { ListadoDetalleventa } from "./componentes/detalleventa/detalleventadetalles"

/* Metodo put*/
import CategoriaEditar from "./componentes/categoria/categoriaeditar";
import ClienteEditar from "./componentes/cliente/clienteeditar";
import { EntradumsEditar } from "./componentes/entradas/entradumeditar"
import { ImagenEditar } from "./componentes/imagen/imageneditar"
import { PermisosEditar } from "./componentes/permiso/permisoeditar"
import { RolEditar } from "./componentes/rol/roleditar"
import { UsuarioEditar } from "./componentes/usuario/usuarioeditar"

import {UserProvider} from './../src/componentes/principales/UserContext'

/* Metodo de delete*/


const App = () => {
    return (
        
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    {/*Metedo de listar*/}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/vistacliente" element={<CistaCliente />} />
                    <Route path="/login" element={<Inicio />} />
                    <Route path="/Dasboard" element={<Dashboard />} />
                    <Route path="/cliente" element={<ListadoCliente />} />
                    <Route path="/venta" element={<Listadoventa />} />
                    <Route path="/categoria" element={<Listadocategoria />} />
                    <Route path="/detalleventa" element={<Listadodetalleventa />} />
                    <Route path="/entradas" element={<Listadoentradum />} />
                    <Route path="/imagen" element={<Listadoimagen />} />
                    <Route path="/permiso" element={<Listadopermiso />} />
                    <Route path="/rol" element={<ListadoRol />} />
                    <Route path="/rolespermisos" element={<Listadorolespermiso />} />
                    <Route path="/usuario" element={<Listadousuario />} />
                    <Route path="/navbar" element={<NavBar />} />
                    <Route path="/registarse" element={<Resgistrarse />} />
                    <Route path="/recuperar" element={<Recuperar />} />
                    <Route path="/nuevacontrasena" element={<Nuevacontraseña />} />
                    <Route path="/digitarNumero" element={<DigitarNumero />} />
                    <Route path="/validarcodigo" element={<CambiarContraseña />} />
                    <Route path="/cambiar" element={<Cambiar />} />
                    <Route path="/descargar-excel" element={<DescargarExcel />} />

                   
                    

                    {/*Metodo de post*/}
                    <Route path="/categoria/guardar" element={<GuardarCategoria />} />
                    <Route path="/cliente/guardar" element={<GuardarCliente />} />
                    <Route path="/imagen/guardar" element={<GuardarImagen />} />
                    <Route path="/entradas/guardar" element={<GuardarEntradas />} />
                    <Route path="/permiso/guardar" element={<GuardarPermiso />} />
                    <Route path="/rol/guardar" element={<GuardarRol />} />
                    <Route path="/rolpermiso/guardar" element={<GuardarRolPermiso />} />
                    <Route path="/usuario/guardar" element={<GuardarUsuario />} />
                    {/*<Route path="/ventas/guardar" element={<GuardarVenta />} />*/}
                    <Route path="/venta/guardar" element={<ProductosFormulario />} />
                    <Route path="/imagen1" element={<ImageUploaderHola />} />
                    

                    {/*Metodo get para detalle*/}
                    <Route path="/categoria/detalles/:idCategoria" element={<CategoriaDetalles />} />
                    <Route path="/cliente/detalles/:idCliente" element={<ClienteDetalles />} />
                    <Route path="/entradas/detalles/:idEntrada" element={<EntradumsDetalles />} />
                    <Route path="/imagen/detalle/:idImagen" element={<ImagenDetalles />} />
                    <Route path="/permiso/detalles/:idPermisos" element={<PermisosDetalles />} />
                    <Route path="/rol/detalles/:idRol" element={<RolDetalles />} />
                    <Route path="/usuario/detalles/:id" element={<UsuarioDetalles />} />
                    <Route path="/detalleventa/detalle/:id" element={<ListadoDetalleventa />} />



                    {/*Metodo put*/}
                    <Route path="/categoria/editar/:idCategoria" element={<CategoriaEditar />} />
                    <Route path="/cliente/editar/:idCliente" element={<ClienteEditar />} />
                    <Route path="/entradas/editar/:idEntrada" element={<EntradumsEditar />} />
                    <Route path="/imagen/editar/:idImagen" element={<ImagenEditar />} />
                    <Route path="/permiso/editar/:idPermisos" element={<PermisosEditar />} />
                    <Route path="/rol/editar/:idRol" element={<RolEditar />} />
                    <Route path="/usuario/editar/:id" element={<UsuarioEditar />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
  
    ); 
}

export default App;