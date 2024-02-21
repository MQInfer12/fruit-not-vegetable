import mysql.connector
from mysql.connector import errorcode

import datetime
fecha_hoy = datetime.date.today()

print("Conectando...")
try:
    conn = mysql.connector.connect(
           host='doctortomatto.mysql.pythonanywhere-services.com',
           user='doctortomatto',
           password='mysqlroot'
      )
except mysql.connector.Error as err:
      if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print('Existe un error en el nombre de usuario o en la clave')
      else:
            print(err)

cursor = conn.cursor()

##cursor.execute("DROP DATABASE IF EXISTS `doctortomatto$plataformaDT`;")

##cursor.execute("CREATE DATABASE `doctortomatto$plataformaDT`;")

cursor.execute("USE `doctortomatto$plataformaDT`;")

# creando las tablas
TABLES = {}
TABLES['Ordenes'] = ('''
      CREATE TABLE `ordenes` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `orden_id` varchar(30) NOT NULL,
      `orden_fecha` date NOT NULL,
      `importe` float(10,2) NOT NULL,
      `nombre` VARCHAR(80) NOT NULL,
      `email` VARCHAR(100) NOT NULL,
      `descripcion` VARCHAR(80) NOT NULL,
      `pais` varchar(50) NOT NULL,
      `ciudad` varchar(50) NOT NULL,
      `estado` varchar(50) NOT NULL,
      `telefono` varchar(20) NOT NULL,
      PRIMARY KEY (`id`)
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


# commitando si no hay nada que tenga efecto
conn.commit()

cursor.close()
conn.close()