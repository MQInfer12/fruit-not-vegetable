
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_mail import Mail, Message
import pandas as pd
import ipinfo
from datetime import date

app = Flask(__name__, static_folder='assets')
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
  csv = pd.read_csv('static/data/data_enfermedades.csv')
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

    file_path = "static/texts/ips.txt"
    with open(file_path, 'a') as file:
      file.write("Ingreso desde: " + ip_address + ", " + datos_nuevo_registro["pais"] + ", " + datos_nuevo_registro["localidad"] + ", " + datos_nuevo_registro["fecha"] + "\n")
    
    return jsonify({
      "message": "Se agrego un nuevo registro satisfactoriamente"
    })
  return jsonify({
    "error": "No se pudo obtener tus datos de localidad"
  })

if __name__ == "__main__":
  app.run(debug=True, port=8000)