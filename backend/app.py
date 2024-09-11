from flask import Flask
from flask_restful import Api
from api.rsi import RsiAPI
from api.backtest import BacktestStatAPI, PlotFileAPI
from api.blackscholes import BlackScholesPricing
from flask_cors import CORS


# Initialize Flask app
app = Flask(__name__)

# Enable CORS for localhost:3000
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "https://finance-tools-alpha.vercel.app"]}})

api = Api(app)

# Register API Resources
api.add_resource(RsiAPI, '/api/rsi')
api.add_resource(BacktestStatAPI, '/api/backtest', methods=['POST', 'GET'])
api.add_resource(PlotFileAPI, '/api/plots/<string:filename>')
api.add_resource(BlackScholesPricing, '/api/option-pricing/black_scholes')

if __name__ == '__main__':
    app.run(debug=True)
