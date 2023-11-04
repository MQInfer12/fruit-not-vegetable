
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, jsonify, request, render_template, send_file
from flask_cors import CORS
from flask_mail import Mail, Message
import pandas as pd
import ipinfo
from datetime import date
import os
import folium
from sqlalchemy import or_
from flask_bcrypt import Bcrypt

#LIBRERIAS PARA DETECCION
from mrcnn.config import Config
from mrcnn.model import mold_image
from numpy import expand_dims
from matplotlib import pyplot as plt
from matplotlib.patches import Rectangle
from skimage.io import imread
from mrcnn.model import MaskRCNN
#LIBERIAS CLASIFICACION
import cv2
from keras.models import load_model
import numpy as np
from keras.applications.imagenet_utils import preprocess_input

app = Flask(__name__, static_folder="assets")
CORS(app)
bcrypt = Bcrypt(app)

mail = Mail()
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_USERNAME"] = 'serginho61@gmail.com'
app.config["MAIL_PASSWORD"] = 'bfmmvotlxgjmdqzo'
mail.init_app(app)

app.config.from_pyfile('config.py')
from models import db, ma, Publicidades, publicidades_schema, publicidad_schema, Usuarios, usuarios_schema, usuario_schema
db.init_app(app)
ma.init_app(app)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/logo/<string:nombre_foto>')
def logo(nombre_foto):
  img_path = os.path.join(app.root_path, "static", "images", nombre_foto + ".png")
  return send_file(img_path, mimetype="image/png")

@app.route('/output/<string:nombre_foto>')
def foto(nombre_foto):
  img_path = os.path.join(app.root_path, "static", "output", nombre_foto + ".jpg")
  return send_file(img_path, mimetype="image/png")

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

    #publicidades = Publicidades.query.filter(Publicidades.codigo_pais == details.country.lower()).order_by(Publicidades.id).all()
    general = Publicidades.query.filter(Publicidades.tipo_propaganda != "E").filter(or_(Publicidades.codigo_pais == details.country.lower(), Publicidades.cobertura == "I")).order_by(Publicidades.id).all()
    all_general = publicidades_schema.dump(general)
    especifica = Publicidades.query.filter(Publicidades.tipo_propaganda != "G").filter(or_(Publicidades.codigo_pais == details.country.lower(), Publicidades.cobertura == "I")).order_by(Publicidades.id).all()
    all_especifica = publicidades_schema.dump(especifica)

    return jsonify({
      "message": "Se agrego un nuevo registro satisfactoriamente",
      "data": {
        "general": all_general,
        "especifica": all_especifica
      }
    })
  general = Publicidades.query.order_by(Publicidades.id)
  all_general = publicidades_schema.dump(general)
  especifica = Publicidades.query.order_by(Publicidades.id)
  all_especifica = publicidades_schema.dump(especifica)
  return jsonify({
    "error": "No se pudo obtener tus datos de localidad",
    "data": {
        "general": all_general,
        "especifica": all_especifica
    }
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

@app.route('/listar_publicidad_general')
def listar_publicidad_general():
    lista = Publicidades.query.filter(Publicidades.tipo_propaganda != 'E').order_by(Publicidades.id).all()
    return render_template('listar_publicidad_general.html',titulo= 'Publicidad General', publicidades=lista)

@app.route('/usuario')
def litar_usuarios():
    lista = Usuarios.query.all()
    dumped = usuarios_schema.dump(lista)
    return jsonify(dumped)

@app.route('/usuario/<email>')
def litar_usuario(email):
    usuario = Usuarios.query.get(email)
    return usuario_schema.jsonify(usuario)

@app.route('/usuario', methods = ["POST"])
def create_usuario():
    email = request.json['email']
    nombre = request.json['nombre']
    clave = request.json['clave']
    rol = request.json['rol']
    pais = request.json['pais']
    ciudad = request.json['ciudad']

    new_usuario = Usuarios(email, nombre, bcrypt.generate_password_hash(clave), rol, pais, ciudad);
    db.session.add(new_usuario)
    db.session.commit()

    return usuario_schema.jsonify(new_usuario)

@app.route('/usuario/<email>', methods = ["PUT"])
def update_usuario(email):
    usuario = Usuarios.query.get(email)

    usuario.email = request.json['email']
    usuario.nombre = request.json['nombre']
    usuario.rol = request.json['rol']
    usuario.pais = request.json['pais']
    usuario.ciudad = request.json['ciudad']

    db.session.commit()
    return usuario_schema.jsonify(usuario)

@app.route('/usuario/<email>', methods = ["DELETE"])
def delete_usuario(email):
    usuario = Usuarios.query.get(email)
    db.session.delete(usuario)
    db.session.commit()

    return usuario_schema.jsonify(usuario)

@app.route('/publicidad')
def get_publicidades():
    lista = Publicidades.query.order_by(Publicidades.id).all()
    dumped = publicidades_schema.dump(lista)
    return jsonify(dumped)

@app.route('/publicidad/<id>')
def get_publicidad(id):
    publicidad = Publicidades.query.get(id)
    return publicidad_schema.jsonify(publicidad)

@app.route('/publicidad', methods = ["POST"])
def create_publicidad():
    codigo_pais = request.form['codigo_pais']
    pais = request.form['pais']
    ciudad = request.form['ciudad']
    empresa = request.form['empresa']
    contacto = request.form['contacto']
    cargo = request.form['cargo']
    direccion = request.form['direccion']
    telefono = request.form['telefono']
    correo = request.form['correo']
    web = request.form['web']
    fecha_registro = date.today()
    descripcion = request.form['descripcion']
    tipo_propaganda = request.form['tipo_propaganda']
    cobertura = request.form['cobertura']

    new_publicidad = Publicidades(codigo_pais, pais, ciudad, empresa, contacto, cargo, direccion, telefono, correo, web, descripcion, fecha_registro, tipo_propaganda, cobertura);
    db.session.add(new_publicidad)
    db.session.commit()

    foto = request.files.get('foto')
    if foto:
      filename = codigo_pais + str(new_publicidad.id) + ".png"
      foto.save(os.path.join(app.root_path, "static", "images", filename))

    return publicidad_schema.jsonify(new_publicidad)

@app.route('/publicidad/<id>', methods = ["PUT"])
def update_publicidad(id):
    publicidad = Publicidades.query.get(id)

    if (request.form['codigo_pais'] != publicidad.codigo_pais):
        old_path = os.path.join(app.root_path, "static", "images", publicidad.codigo_pais + str(id) + ".png")
        new_path = os.path.join(app.root_path, "static", "images", request.form['codigo_pais'] + str(id) + ".png")
        os.rename(old_path, new_path)

    foto = request.files.get('foto')
    if foto:
      filename = request.form['codigo_pais'] + str(id) + ".png"
      foto.save(os.path.join(app.root_path, "static", "images", filename))

    publicidad.codigo_pais = request.form['codigo_pais']
    publicidad.pais = request.form['pais']
    publicidad.ciudad = request.form['ciudad']
    publicidad.empresa = request.form['empresa']
    publicidad.contacto = request.form['contacto']
    publicidad.cargo = request.form['cargo']
    publicidad.direccion = request.form['direccion']
    publicidad.telefono = request.form['telefono']
    publicidad.correo = request.form['correo']
    publicidad.web = request.form['web']
    publicidad.descripcion = request.form['descripcion']
    publicidad.tipo_propaganda = request.form['tipo_propaganda']
    publicidad.cobertura = request.form['cobertura']

    db.session.commit()
    return publicidad_schema.jsonify(publicidad)

@app.route('/publicidad/<id>', methods = ["DELETE"])
def delete_publicidad(id):
    publicidad = Publicidades.query.get(id)
    db.session.delete(publicidad)
    db.session.commit()

    os.remove(os.path.join(app.root_path, "static", "images", publicidad.codigo_pais + str(publicidad.id) + ".png"))

    return publicidad_schema.jsonify(publicidad)

@app.route('/analizar', methods = ["POST"])
def analizar():
  foto = request.files.get("file")
  if not foto:
    return jsonify({"message": "Error al encontrar el archivo"})

  filename = "foto_hoja.jpg"
  foto.save(os.path.join(app.root_path, "static", "upload", filename))

  global probabilidad
  global etiqueta

  class ConfiguracionesHojas(Config):
    NAME = "configuraciones_hojas"
    NUM_CLASSES = 1 + 2
    GPU_COUNT = 1
    IMAGES_PER_GPU = 1
    DETECTION_MAX_INSTANCES = 1

  def detectar_objeto(imagen, modelo, cfg, nombre_archivo):
    lista_clase_deteccion = ['BG','HojaTomate','NoHojaTomate']
    global datos
    imagen_centrada = mold_image(imagen, cfg)
    muestra = expand_dims(imagen_centrada, 0)
    datos = modelo.detect(muestra, verbose=0)[0]

    plt.imshow(imagen, aspect = 'auto')

    ejes = plt.gca()
    global probabilidad
    global etiqueta
    for caja in datos['rois']:
      y1, x1, y2, x2 = caja
      ancho, altura = x2 - x1, y2 - y1
      rectangulo = Rectangle((x1, y1), ancho, altura, fill=True, alpha=0.3, color='red')
      ejes.add_patch(rectangulo)
      probabilidad =float(datos['scores'])
      indice_clase = int(datos['class_ids'])
      etiqueta = lista_clase_deteccion[indice_clase]
      ejes.text(x1+5, y1+20, lista_clase_deteccion[indice_clase] +': ' + str(round(probabilidad*100,1))+'%')
      plt.axis('off')
      plt.savefig(os.path.join(app.root_path, "static", "output", nombre_archivo), bbox_inches='tight',pad_inches = 0)
    plt.show()
    print('probabilidad de deteccion =',probabilidad,' etiqueta =',etiqueta)

  imagen = imread(os.path.join(app.root_path, "static", "upload", filename))

  cfg = ConfiguracionesHojas()

  modelo = MaskRCNN(mode='inference', model_dir=os.path.join(app.root_path, "modelo_testeando"), config=cfg)
  modelo.load_weights(os.path.join(app.root_path, "modelo", "modelo_deteccion", "modelo_deteccion.h5"), by_name=True)

  detectar_objeto(imagen, modelo, cfg, filename)

  print('probabilidad deteccion =', probabilidad, 'etiqueta =', etiqueta)

  probabilidadPrecision = 0.70
  if probabilidad < probabilidadPrecision or etiqueta != 'HojaTomate':
    return jsonify({
      "error": "La probabilidad es menor a 70%",
      "data": {
        "porcentaje": probabilidad
      }
    })

  probabilidad_clasificacion = -1
  nombre_area_detectada = 'Area' + filename
  img = cv2.imread(os.path.join(app.root_path, "static", "upload", filename),cv2.IMREAD_UNCHANGED)

  x = datos['rois'][0][0]
  y = datos['rois'][0][1]
  w = datos['rois'][0][2]
  h = datos['rois'][0][3]
  crop_img = img[x:w, y:h]
  cv2.imwrite(os.path.join(app.root_path, "static", "output", nombre_area_detectada), crop_img)

  names = ['TOMATE MANCHA BACTERIANA','TOMATE SANO','TOMATE TIZON TEMPRAMO']
  modelt = load_model(os.path.join(app.root_path, "modelo", "modelo_clasificacion", "modelo_clasificacion.h5"))

  img = cv2.imread(os.path.join(app.root_path, "static", "output", nombre_area_detectada))

  width = 224
  height = 224
  dim = (width, height)
  imaget = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
  xt = np.asarray(imaget)
  xt = preprocess_input(xt)
  xt = np.expand_dims(xt,axis=0)
  preds = modelt.predict(xt)

  print('preds[0]:',preds[0])
  print(names[np.argmax(preds)],preds[0][np.argmax(preds)]*100.0,'%')
  plt.imshow(cv2.cvtColor(np.asarray(imaget),cv2.COLOR_BGR2RGB))
  plt.axis('off')
  plt.show()

  probabilidad_clasificacion = preds[0][np.argmax(preds)]
  if probabilidad_clasificacion == -1:
    return jsonify({
      "error": "La probabilidad es menor a -100%",
      "data": {
        "porcentaje": probabilidad_clasificacion
      }
    })

  probabilidad = -1.00
  etiqueta=''
  answer = np.argmax(preds[0])
  enfermedades = ["Mancha Bacteriana", "Tomate Sano", "Tizon Temprano"]

  def grabar_data_enfermedades(datos_nuevo_registro):
    datos =pd.read_csv(os.path.join(app.root_path, "static", "data", "data_enfermedades.csv"), index_col=0)
    df = pd.DataFrame(datos)
    df2 = pd.DataFrame(datos_nuevo_registro, index=[0])
    df = pd.concat([df, df2], ignore_index=True)
    df.to_csv(os.path.join(app.root_path, "static", "data", "data_enfermedades.csv"), index=True)

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
      #"codigo pais": details.country,
      "pais": details.country_name,
      "localidad": details.city,
      "enfermedad": enfermedades[answer],
      "fecha": fecha,
      "latitud": details.latitude,
      "longitud": details.longitude
    }
    grabar_data_enfermedades(datos_nuevo_registro)

  return jsonify({
    "message": "Clasificación correcta",
    "data": {
      "prediccion": enfermedades[answer],
      "porcentaje": "%.2f" % round(probabilidad_clasificacion * 100, 2)
    }
  })

@app.route('/login', methods=["POST"])
def login():
    usuario = Usuarios.query.filter_by(email = request.json["email"]).first()
    if(usuario):
        clave = bcrypt.check_password_hash(usuario.clave, request.json["password"])
        if usuario and clave:
            return usuario_schema.jsonify(usuario)
        else:
            return jsonify({
                "error": "Revisa si los datos son correctos"
            })
    else:
        return jsonify({
            "error": "Revisa si los datos son correctos"
        })