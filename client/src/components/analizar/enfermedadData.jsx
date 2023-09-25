import ManchaBacteriana from './data/manchaBacteriana/foto.jpg'
import PrevencionMancha from './data/manchaBacteriana/prevencion';
import SintomasMancha from './data/manchaBacteriana/sintomas';
import TratamientoMancha from './data/manchaBacteriana/tratamiento';
import TizonTemprano from './data/tizonTemprano/foto.jpg';
import PrevencionTizon from './data/tizonTemprano/prevencion';
import SintomasTizon from './data/tizonTemprano/sintomas';
import TratamientoTizon from './data/tizonTemprano/tratamiento';
import TomateSano from './data/tizonTemprano/foto.jpg';

export const enfermedadData = {
  "Mancha Bacteriana": {
    "foto": ManchaBacteriana,
    "sintomas": <SintomasMancha />,
    "prevencion": <PrevencionMancha />,
    "tratamiento": <TratamientoMancha />
  },
  "Tizon Temprano": {
    "foto": TizonTemprano,
    "sintomas": <SintomasTizon />,
    "prevencion": <PrevencionTizon />,
    "tratamiento": <TratamientoTizon />
  },
  "Tomate Sano": {
    "foto": TomateSano,
  }
}