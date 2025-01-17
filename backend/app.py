from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
app = Flask(__name__)

CORS(app)
load_dotenv()

# if __name__ == '__main__':
#     app.run(debug=True)

from controller import *