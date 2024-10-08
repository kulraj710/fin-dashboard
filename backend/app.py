from flask import Flask, redirect
from flask_restful import Api
from api.rsi import RsiAPI
from api.backtest import BacktestStatAPI, PlotFileAPI
from api.blackscholes import BlackScholesPricing
from api.montecarlo import MonteCarloPricing

# Initialize Flask app
app = Flask(__name__)

api = Api(app)

@app.route('/')
def index():
    return redirect("https://finance-tools-alpha.vercel.app")

# Register API Resources
api.add_resource(RsiAPI, '/api/rsi')
api.add_resource(BacktestStatAPI, '/api/backtest', methods=['POST', 'GET'])
api.add_resource(PlotFileAPI, '/api/plots/<string:filename>')
api.add_resource(BlackScholesPricing, '/api/option-pricing/black_scholes')
api.add_resource(MonteCarloPricing, '/api/option-pricing/monte_carlo')

if __name__ == '__main__':
    app.run()
