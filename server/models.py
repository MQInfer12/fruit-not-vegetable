from flask_sqlalchemy import SQLAlchemy   # ORM para base de datos MySQL
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()

class Publicidades(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    codigo_pais = db.Column(db.String(2), nullable=False)
    pais = db.Column(db.String(50), nullable=False)
    ciudad = db.Column(db.String(50), nullable=False)
    empresa = db.Column(db.String(100), nullable=False)
    contacto = db.Column(db.String(80), nullable=False)
    cargo = db.Column(db.String(80), nullable=False)
    direccion = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(100), nullable=False)
    correo = db.Column(db.String(100), nullable=False)
    web = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    fecha_registro = db.Column(db.Date, nullable=False)
    tipo_propaganda = db.Column(db.String(1), nullable=False)
    cobertura = db.Column(db.String(1), nullable=False)

    def __init__(self, codigo_pais, pais, ciudad, empresa, contacto, cargo, direccion, telefono, correo, web, descripcion, fecha_registro, tipo_propaganda, cobertura):
        self.codigo_pais = codigo_pais
        self.pais = pais
        self.ciudad = ciudad
        self.empresa = empresa
        self.contacto = contacto
        self.cargo = cargo
        self.direccion = direccion
        self.telefono = telefono
        self.correo = correo
        self.web = web
        self.descripcion = descripcion
        self.fecha_registro = fecha_registro
        self.tipo_propaganda = tipo_propaganda
        self.cobertura = cobertura

    def __repr__(self):
        return '<Name %r>' % self.name

class PublicidadesSchema(ma.Schema):
    class Meta:
        fields = ("id", "codigo_pais", "pais", "ciudad", "empresa", "contacto", "cargo", "direccion", "telefono", "correo", "web", "descripcion", "fecha_registro", "tipo_propaganda", "cobertura")

publicidad_schema = PublicidadesSchema()
publicidades_schema = PublicidadesSchema(many=True)

class Usuarios(db.Model):
    email = db.Column(db.String(50), primary_key=True)
    nombre = db.Column(db.String(20), nullable=False)
    clave = db.Column(db.String(100), nullable=False)
    rol = db.Column(db.String(10), nullable=False)
    pais = db.Column(db.String(50), nullable=False)
    ciudad = db.Column(db.String(50), nullable=False)

    def __init__(self, email, nombre, clave, rol, pais, ciudad):
        self.email = email
        self.nombre = nombre
        self.clave = clave
        self.rol = rol
        self.pais = pais
        self.ciudad = ciudad

    def __repr__(self):
        return '<Name %r>' % self.name

class UsuariosSchema(ma.Schema):
    class Meta:
        fields = ("email", "nombre", "clave", "rol", "pais", "ciudad")

usuario_schema = UsuariosSchema()
usuarios_schema = UsuariosSchema(many=True)
