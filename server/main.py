
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

app = Flask(__name__, static_folder='assets')
CORS(app)

@app.route('/')
def index():
  return render_template('index.html')