import mysql.connector
from mysql.connector import errorcode

from flask_bcrypt import generate_password_hash  # encripta campos base de datos


import datetime
fecha_hoy = datetime.date.today()




print("Conectando...")
try:
    conn = mysql.connector.connect(
           host='MarcianoQuantico.mysql.pythonanywhere-services.com',
           user='MarcianoQuantico',
           password='mysqlroot'
      )
except mysql.connector.Error as err:
      if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print('Existe un error en el nombre de usuario o en la clave')
      else:
            print(err)

cursor = conn.cursor()
cursor.execute("DROP DATABASE IF EXISTS `MarcianoQuantico$plataformaDT`;")

cursor.execute("CREATE DATABASE `MarcianoQuantico$plataformaDT`;")

cursor.execute("USE `MarcianoQuantico$plataformaDT`;")

# creando las tablas
TABLES = {}
TABLES['Publicidades'] = ('''
      CREATE TABLE `publicidades` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `codigo_pais` varchar(2) NOT NULL,
      `pais` varchar(50) NOT NULL,
      `ciudad` varchar(50) NOT NULL,
      `empresa` varchar(100) NOT NULL,
      `contacto` varchar(80) NOT NULL,
      `cargo` varchar(80) NOT NULL,
      `direccion` varchar(100) NOT NULL,
      `telefono` varchar(20) NOT NULL,
      `correo` varchar(100) NOT NULL,
      `web` varchar(100) NOT NULL,
      `descripcion` text NOT NULL,
      `fecha_registro` date NOT NULL,
      `tipo_propaganda` varchar(1) NOT NULL,
      `cobertura` varchar(1) NOT NULL,
      PRIMARY KEY (`id`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;''')

TABLES['Usuarios'] = ('''
      CREATE TABLE `usuarios` (
      `nombre` varchar(20) NOT NULL,
      `email` varchar(50) NOT NULL,
      `clave` varchar(100) NOT NULL,
      `rol` varchar(10) NOT NULL,
      `pais` varchar(50) NOT NULL,
      `ciudad` varchar(50) NOT NULL,
      `fecha_registro` date NOT NULL,
      `activado` bool NOT NULL,
      PRIMARY KEY (`email`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;''')

for tabla_nombre in TABLES:
      tabla_sql = TABLES[tabla_nombre]
      try:
            print('Creando tabla {}:'.format(tabla_nombre), end=' ')
            cursor.execute(tabla_sql)
      except mysql.connector.Error as err:
            if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                  print('Ya existe la tabla')
            else:
                  print(err.msg)
      else:
            print('OK')


# insertando usuarios
usuario_sql = 'INSERT INTO usuarios (nombre, email, clave, rol, pais, ciudad, fecha_registro, activado) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)'

usuarios = [
      ("Sergio Valenzuela", "serginho61@gmail.com", generate_password_hash("patitofeo").decode('utf-8'), "am","Bolivia","Cochabamba", fecha_hoy, '1'),
      ("Mauricio Molina", "mauricio@gmail.com", generate_password_hash("cochabamba").decode('utf-8'), "am","Bolivia","Cochabamba", fecha_hoy, '1'),
      ("Visita Todas las Opciones", "visita@gmail.com", generate_password_hash("123456789").decode('utf-8'), "am","Bolivia","Cochabamba", fecha_hoy, '1'),
      ("Visita Solo Analizar Imagen", "visita2@gmail.com", generate_password_hash("123456789").decode('utf-8'), "a","Bolivia","Cochabamba", fecha_hoy, '1'),
      ("Visita Solo Mapa Enfermedades", "visita3@gmail.com", generate_password_hash("123456789").decode('utf-8'), "m","Bolivia","Cochabamba", fecha_hoy, '1')
]
cursor.executemany(usuario_sql, usuarios)

cursor.execute('select * from MarcianoQuantico$plataformaDT.usuarios')
print(' -------------  Usuarios:  -------------')
for user in cursor.fetchall():
    print(user[1])

# insertando publicidad general
publicidad_sql = 'INSERT INTO publicidades (codigo_pais, pais, ciudad, empresa, contacto, cargo, direccion, telefono, correo, web, descripcion, fecha_registro, tipo_propaganda, cobertura) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'

publicidad = [
      ('co', 'Colombia', 'Medellín', 'SaBio', 'Andrea Echavarría', 'gerente propietaria','no especifica dirección', '+57 317 3181727','info@sabio.com.co', 'www.sabio.com.co', 'Beneficios de un Suelo Sano - Sustitución y disminución de agroquímicos. Valorización del producto y acceso a nuevos mercados.Cultivos más productivos y sanos. Regeneración: Una Sola Salud.', fecha_hoy, 'M', 'I' ),
      ('bo', 'Bolivia', 'Cochabamba', 'AGRECOL Andes', 'Sin Nombre', 'atención al cliente','Pasaje "F", No. 2858 Urb. El Profesional', '+591 4 4423636', 'info@agrecolandes.org', 'www.agrecolandes.org', 'Asesoramiento en implementación de de parcelas agroforestales, prácticas agroecológicas, sistemas de micro riego y sello ecológico SPG.', fecha_hoy, 'G', 'N'),
      ('cl', 'Chile', 'Rancagua', 'HortiCrece', 'Sin Nombre', 'asistencia técnica', 'Avenida Membrillar 50, 3er piso', '+56 9 6234 9340', 'comunicaciones@horticrece.cl', 'www.horticrece.cl', 'El programa estratégico regional de Corfo O"Higgins, es un esfuerzo público-privado para mejorar la competitividad de la horticultura regional, trabajando de forma conjunta para poner en marcha una serie de acciones que nos permitan cerrar las brechas competitivas y tecnológicas.', fecha_hoy, 'E', 'I'),
      ]
cursor.executemany(publicidad_sql, publicidad)

cursor.execute('select * from MarcianoQuantico$plataformaDT.publicidades')
print(' -------------  Publicidad General:  -------------')
for publicidad in cursor.fetchall():
    print(publicidad[11])

# commitando si no hay nada que tenga efecto
conn.commit()

cursor.close()
conn.close()