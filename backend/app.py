from flask import Flask
from flask_restful import Api
from api.rsi import RsiAPI
# from api.user import UserAPI
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for localhost:3000
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

api = Api(app)

# Register API Resources
api.add_resource(RsiAPI, '/api/rsi')
# api.add_resource(UserAPI, '/api/users')

if __name__ == '__main__':
    app.run(debug=True)
