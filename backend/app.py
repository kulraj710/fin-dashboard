from flask import Flask
from flask_restful import Api
from api.rsi import RsiAPI
from api.backtest import BacktestStatAPI, PlotFileAPI
from api.blackscholes import BlackScholesPricing
from api.montecarlo import MonteCarloPricing
from flask_cors import CORS
from config.config import get_config
# from  utils.CustomException import NoTickerFoundException, handle_507
# import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Load config based on environment
app.config.from_object(get_config())

# app.register_error_handler(NoTickerFoundException, handle_507)


allowed_origins = app.config['CORS_ALLOWED_ORIGINS']

print(allowed_origins)

CORS(app, resources={r"/api/*": {"origins": allowed_origins}})
# CORS(app, resources={r"/api/*": {"origins": ['https://finance-tools-alpha.vercel.app', 'http://localhost:3000']}})

api = Api(app)

# Register API Resources
api.add_resource(RsiAPI, '/api/rsi')
api.add_resource(BacktestStatAPI, '/api/backtest', methods=['POST', 'GET'])
api.add_resource(PlotFileAPI, '/api/plots/<string:filename>')
api.add_resource(BlackScholesPricing, '/api/option-pricing/black_scholes')
api.add_resource(MonteCarloPricing, '/api/option-pricing/monte_carlo')

if __name__ == '__main__':
    app.run()
