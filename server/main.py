
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_mail import Mail, Message

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
  msg = Message(request.json["subject"], sender='serginho61@gmail.com', recipients=['serginho61@gmail.com'])
  msg.body = """ 
    From: %s &lt;%s&gt; 
    %s 
  """ % (request.json["name"], request.json["mail"], request.json["message"])
  mail.send(msg)
  return jsonify({"message": "Se envió el correo correctamente"})

if __name__ == "__main__":
  app.run(debug=True, port=8000)