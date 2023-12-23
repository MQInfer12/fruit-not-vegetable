import { HashRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/global/footer";
import Navbar from "./components/global/navbar";
import Index from "./pages";
import Objetivo from "./pages/objetivo";
import Credito from "./pages/credito";
import Contacto from "./pages/contacto";
import Analizar from "./pages/analizar";
import Mapa from "./pages/mapa";
import Love from "./components/global/love";
import NewInstrucciones from "./pages/newInstrucciones";
import { useGet } from "./hooks/useGet";
import Login from "./pages/login";
import Register from "./pages/register";
import { useEffect } from "react";
import { usePublicidad } from "./context/publicidad";
import CrudPublicidad from "./pages/crudPublicidad";
import FormPublicidad from "./pages/formPublicidad";
import CrudUsuario from "./pages/crudUsuario";
import FormUsuario from "./pages/formUsuario";
import ProtectedRoute from "./components/guard/protectedRoute";
import { useUser } from "./context/user";
import CartPage from "./pages/cart";
import styled from "styled-components";
import Blog from "./pages/blog";
import Blog1 from "./pages/blogs/entries/blog1";
import Chat from "./components/global/chat";

function App() {
  const { data: res } = useGet("myip");
  const { setActualCity, setActualCoords, user } = useUser();
  const { setPublicidadGeneral, setPublicidadEspecifica } = usePublicidad();

  useEffect(() => {
    if (res) {
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
          <Route path="/" element={<Index />} />
          <Route
            path="analizar"
            element={
              <ProtectedRoute rol="a">
                <Analizar />
              </ProtectedRoute>
            }
          />
          <Route
            path="mapa"
            element={
              <ProtectedRoute rol="m">
                <Mapa />
              </ProtectedRoute>
            }
          />
          <Route
            path="cart"
            element={
              <ProtectedRoute rol="">
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="objetivo" element={<Objetivo />} />
          <Route path="credito" element={<Credito />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="crud/publicidad"
            element={
              <ProtectedRoute rol="x">
                <CrudPublicidad />
              </ProtectedRoute>
            }
          />
          <Route
            path="crud/publicidad/agregar"
            element={
              <ProtectedRoute rol="x">
                <FormPublicidad />
              </ProtectedRoute>
            }
          />
          <Route
            path="crud/publicidad/editar/:id"
            element={
              <ProtectedRoute rol="x">
                <FormPublicidad />
              </ProtectedRoute>
            }
          />
          <Route
            path="crud/usuario"
            element={
              <ProtectedRoute rol="x">
                <CrudUsuario />
              </ProtectedRoute>
            }
          />
          <Route
            path="crud/usuario/agregar"
            element={
              <ProtectedRoute rol="x">
                <FormUsuario />
              </ProtectedRoute>
            }
          />
          <Route
            path="crud/usuario/editar/:id"
            element={
              <ProtectedRoute rol="x">
                <FormUsuario />
              </ProtectedRoute>
            }
          />
          <Route path="blog/">
            <Route path="" element={<Blog />} />
            <Route path="instrucciones" element={<NewInstrucciones />} />
            <Route path="1" element={<Blog1 />} />
          </Route>
        </Routes>
      </Div>
      <Love />
      {user && <Chat />}
      <Footer />
    </HashRouter>
  );
}

export default App;

const Div = styled.div`
  min-height: 100dvh;
`;
