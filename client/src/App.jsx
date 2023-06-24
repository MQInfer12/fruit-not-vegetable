import { HashRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/global/footer"
import Navbar from "./components/global/navbar"
import Index from "./pages"
import Objetivo from "./pages/objetivo"
import Credito from "./pages/credito"
import Instrucciones from "./pages/instrucciones"
import Contacto from "./pages/contacto"
import { styled } from "styled-components"
import Analizar from "./pages/analizar"
import Mapa from "./pages/mapa"
import Love from "./components/global/love"

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="" element={<Index />} />
        <Route path="analizar" element={<Analizar />} />
        <Route path="mapa" element={<Mapa />} />
        <Route path="objetivo" element={<Objetivo />} />
        <Route path="credito" element={<Credito />} />
        <Route path="instrucciones" element={<Instrucciones />} />
        <Route path="contacto" element={<Contacto />} />
      </Routes>
      <Love />
      <Footer />
    </HashRouter>
  )
}

export default App