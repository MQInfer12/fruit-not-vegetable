from main import db

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

    def __repr__(self):
        return '<Name %r>' % self.name


class Usuarios(db.Model):
    nickname = db.Column(db.String(8), primary_key=True)
    nombre = db.Column(db.String(20), nullable=False)
    clave = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return '<Name %r>' % self.name