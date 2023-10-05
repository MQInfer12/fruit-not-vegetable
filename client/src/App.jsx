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

function App() {
  const { data: res } = useGet('myip');
  const { setPublicidadGeneral, setPublicidadEspecifica } = usePublicidad();

  useEffect(() => {
    if(res) {
      setPublicidadGeneral(res.data?.general);
      setPublicidadEspecifica(res.data?.especifica);
    }
  }, [res]);

  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="" element={<Index />} />
        <Route path="analizar" element={<Analizar />} />
        <Route path="mapa" element={<Mapa />} />
        <Route path="objetivo" element={<Objetivo />} />
        <Route path="credito" element={<Credito />} />
        <Route path="instrucciones" element={<NewInstrucciones />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="crud/publicidad" element={<CrudPublicidad />} />
        <Route path="crud/publicidad/agregar" element={<FormPublicidad />} />
        <Route path="crud/publicidad/editar/:id" element={<FormPublicidad />} />
      </Routes>
      <Love />
      <Footer />
    </HashRouter>
  )
}

export default App