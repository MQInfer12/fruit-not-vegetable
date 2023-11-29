import { HashRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/global/footer"
import Navbar from "./components/global/navbar"
import Index from "./pages"
import Objetivo from "./pages/objetivo"
import Credito from "./pages/credito"
import Contacto from "./pages/contacto"
import Analizar from "./pages/analizar"
import Mapa from "./pages/mapa"
import Love from "./components/global/love"
import NewInstrucciones from "./pages/newInstrucciones"
import { useGet } from "./hooks/useGet"
import Login from "./pages/login"
import Register from "./pages/register"
import { useEffect } from "react"
import { usePublicidad } from "./context/publicidad"
import CrudPublicidad from "./pages/crudPublicidad"
import FormPublicidad from "./pages/formPublicidad"
import CrudUsuario from "./pages/crudUsuario"
import FormUsuario from "./pages/formUsuario"
import ProtectedRoute from "./components/guard/protectedRoute"
import { useUser } from "./context/user"
import CartPage from "./pages/cart"
import styled from "styled-components"

function App() {
  const { data: res } = useGet('myip');
  const { setActualCity, setActualCoords } = useUser();
  const { setPublicidadGeneral, setPublicidadEspecifica } = usePublicidad();

  useEffect(() => {
    if(res) {
      setPublicidadGeneral(res.data?.general);
      setPublicidadEspecifica(res.data?.especifica);
      setActualCity(res.data?.ciudad);
      setActualCoords(res.data?.coords);
    }
  }, [res]);

  return (
    <HashRouter>
      <Navbar />
      <Div>
      <Routes>
        <Route path="" element={<Index />} />
        <Route path="analizar" 
          element={
            <ProtectedRoute rol="a">
              <Analizar />
            </ProtectedRoute>
          } 
        />
        <Route path="mapa" 
          element={
            <ProtectedRoute rol="m">
              <Mapa />
            </ProtectedRoute>
          } 
        />
        <Route path="cart" 
          element={
            <ProtectedRoute rol="">
              <CartPage />
            </ProtectedRoute>
          } 
        />
        <Route path="objetivo" element={<Objetivo />} />
        <Route path="credito" element={<Credito />} />
        <Route path="instrucciones" element={<NewInstrucciones />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="crud/publicidad" element={<CrudPublicidad />} />
        <Route path="crud/publicidad/agregar" element={<FormPublicidad />} />
        <Route path="crud/publicidad/editar/:id" element={<FormPublicidad />} />
        <Route path="crud/usuario" element={<CrudUsuario />} />
        <Route path="crud/usuario/agregar" element={<FormUsuario />} />
        <Route path="crud/usuario/editar/:id" element={<FormUsuario />} />
      </Routes>
      </Div>
      <Love />
      <Footer />
    </HashRouter>
  )
}

export default App

const Div = styled.div`
  min-height: 100dvh;
`;