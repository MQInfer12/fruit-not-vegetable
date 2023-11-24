import AnalizarImg from '../assets/cart/analizar.png'
import MapaImg from '../assets/cart/mapa.png'
import ComboImg from '../assets/cart/combo.png'

const CartData = [
  {
    id: "a",
    name: "Analizar imagen",
    description: "Analice fotos de su hoja de tomate según su enfermedad o plaga y reciba información acerca de sus síntomas, prevenciones y tratamiento adecuados.",
    precio: 2,
    img: AnalizarImg
  },
  {
    id: "m",
    name: "Mapa enfermedades",
    description: "Reciba información geoespacial, gráficos detallados y reportes de enfermedades cercanas a su área de cultivo.",
    precio: 4,
    img: MapaImg
  },
  {
    id: "am",
    name: "Analizar imagen + Mapa enfermedades",
    description: "Analice fotos de su hoja de tomate, reciba recomendaciones, información geoespacial, gráficos detallados y reportes de enfermedades cercanas a su área de cultivo.",
    precio: 5,
    img: ComboImg
  },
]

export default CartData;