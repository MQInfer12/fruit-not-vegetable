
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_mail import Mail, Message
import pandas as pd
import ipinfo
from datetime import date
import os
import folium

#LIBRERIAS PARA DETECCION
""" from skimage.io import imread
from keras.models import load_model
import numpy as np
from mrcnn.config import Config """

app = Flask(__name__, static_folder="assets")
CORS(app)

mail = Mail()
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_USERNAME"] = 'serginho61@gmail.com'
app.config["MAIL_PASSWORD"] = 'bfmmvotlxgjmdqzo'
mail.init_app(app)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/correo', methods=["POST"])
def correo():
  msg = Message("Mensaje desde Doctor Tomatto", sender='serginho61@gmail.com', recipients=['serginho61@gmail.com'])
  content = """ 
  <html>
    <b>Nombre:</b> {0} <br> 
    <b>Email:</b> {1} <br>
    <b>Whatsapp/Telegram:</b> {2} <br>
    <b>Mensaje:</b> {3}
  </html>
  """
  msg.html =  content.format(request.json["name"], request.json["mail"], request.json["telefono"], request.json["message"])
  mail.send(msg)
  return jsonify({"message": "Se envió el correo correctamente"})

@app.route('/mapa')
def mapa():
  csv = pd.read_csv(os.path.join(app.root_path, "static", "data", "data_enfermedades.csv"))
  data = []
  for index, row in csv.iterrows():
    if index == 0:
      continue
    print(row)
    pais = [value for value in data if value["pais"] == row[1]]
    if len(pais) == 0:
      data.append({ 
        "pais": row[1],
        "localidades": [{
          "nombre": row[2],
          "pines": [{
            "enfermedad": row[3],
            "fecha": row[4],
            "coordenadas": [row[5], row[6]]
          }]
        }]
      })
    else:
      localidades = pais[0]["localidades"]
      localidad = [value for value in localidades if value["nombre"] == row[2]]
      if len(localidad) == 0:
        localidades.append({
          "nombre": row[2],
          "pines": [{
            "enfermedad": row[3],
            "fecha": row[4],
            "coordenadas": [row[5], row[6]]
          }]
        })
      else:
        pines = localidad[0]["pines"]
        pines.append({
          "enfermedad": row[3],
          "fecha": row[4],
          "coordenadas": [row[5], row[6]]
        })
  return jsonify(data)

@app.route('/myip')
def myip():
  ipinfo_access_token = '001c2d1b9002e8'
  handler = ipinfo.getHandler(ipinfo_access_token)
  ip_address = request.headers.get('X-Forwarded-For', request.remote_addr)
  details = handler.getDetails(ip_address)
  try:
    print(f'Your city is: {details.city}')
  except AttributeError:
    print('Error: IP Privada, no se puede extraer datos GPS')
  else:
    fecha = date.today().strftime('%Y-%m-%d')
    datos_nuevo_registro = {
      "codigo_pais": details.country,
      "pais": details.country_name,
      "localidad": details.city,
      "latitud": details.latitude,
      "longitud": details.longitude,
      "fecha": fecha
    }

    file_path = os.path.join(app.root_path, "static", "texts", "ips.txt")
    with open(file_path, 'a') as file:
      file.write("Ingreso desde: " + ip_address + ", " + datos_nuevo_registro["pais"] + ", " + datos_nuevo_registro["localidad"] + ", " + datos_nuevo_registro["fecha"] + "\n")
    
    return jsonify({
      "message": "Se agrego un nuevo registro satisfactoriamente"
    })
  return jsonify({
    "error": "No se pudo obtener tus datos de localidad"
  })

@app.route('/analizar', methods = ["POST"])
def analizar():
  foto = request.files.get("file")
  if not foto:
    return jsonify({"message": "Error al encontrar el archivo"})
  
  filename = "foto_hoja.jpg"
  foto.save(os.path.join(app.root_path, "static", "upload", filename))

  """ imagen = imread(os.path.join(app.root_path, "static", "upload", filename))

  model = load_model(os.path.join(app.root_path, "modelo", "modelo_deteccion", "modelo_deteccion.h5"))

  result = model.predict(np.expand_dims(imagen, axis=0))

  print(result) """

  return jsonify({
    "prediccion": "Mancha bacteriana",
    "porcentaje": "58.0%"
  })

@app.route('/descargarmapa', methods=['POST'])
def descargarmapa():
  nombre_pais = request.json["nombre_pais"]
  nombre_localidad = request.json["nombre_localidad"]

  datos =pd.read_csv(os.path.join(app.root_path, "static", "data", "data_enfermedades.csv"), index_col=0)
  datos_ubicacion = datos.query('pais == @nombre_pais and localidad == @nombre_localidad')
  datos_ubicacion = datos_ubicacion.sort_values(by=["pais", "localidad"], ascending=[True, True])
  lista_gps = datos_ubicacion.values.tolist()

  mapObj = folium.Map(location=[datos_ubicacion.latitud.mean(), datos_ubicacion.longitud.mean()], zoom_start=12)

  for registro in lista_gps:
    enfermedad = registro[2]
    fecha = registro[3]
    latitud = registro[4]
    longitud = registro[5]

    styles = """
    <style>table { table-layout: fixed; border-collapse: collapse; } th, td { border: 1px solid #234A45 !important; padding: 2px 5px !important; } th { background-color: #A6B0A5 !important; color: #FFFFFF !important; } td { background-color: #DDE2D7 !important; }</style>
    """

    htmlcode = f"""{styles}<table>
    <tr><th>País</th><td>{ nombre_pais }</td></tr>
    <tr><th>Localidad</th><td>{ nombre_localidad }</td></tr>
    <tr><th>Enfermedad</th><td>{ enfermedad }</td></tr>
    <tr><th>Fecha</th><td>{ fecha }</td></tr>
    </table>"""

    if (enfermedad == 'Mancha Bacteriana'):
      folium.Marker([ latitud , longitud ], popup=htmlcode, icon=folium.Icon(color="red", icon="cloud"), tooltip="Haga click").add_to(mapObj)
    else:
      folium.Marker([ latitud , longitud ], popup=htmlcode, icon=folium.Icon(color="orange", icon="cloud"), tooltip="Haga click").add_to(mapObj)

  maphtml = mapObj._repr_html_()
  return maphtml

if __name__ == "__main__":
  app.run(debug=True, port=8000)