SECRET_KEY = '990002'

SQLALCHEMY_DATABASE_URI = \
    '{SGBD}://{usuario}:{clave}@{servidor}/{database}'.format(
        SGBD = 'mysql+mysqlconnector',
        usuario = 'MarcianoQuantico',
        clave = 'mysqlroot',
        servidor = 'MarcianoQuantico.mysql.pythonanywhere-services.com',
        database = 'MarcianoQuantico$plataformaDT'
    )