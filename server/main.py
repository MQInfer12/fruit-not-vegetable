
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_mail import Mail, Message
import pandas as pd

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

if __name__ == "__main__":
  app.run(debug=True, port=8000)