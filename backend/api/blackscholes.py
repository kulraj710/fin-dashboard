from flask_restful import Resource
from flask import jsonify, request
from services.BlackScholesModel import BlackScholesModel, get_stock_data, plot_option_price_vs_stock_price, plot_greeks, plot_option_price_vs_maturity
from datetime import datetime

def days_difference(js_date_str):
    # Convert the JavaScript-style ISO 8601 date string to a datetime object
    provided_date = datetime.fromisoformat(js_date_str.rstrip("Z"))
    today = datetime.now()
    difference = today - provided_date
    
    return abs(int(difference.days))

class BlackScholesPricing(Resource):
    def post(self):
        try:
            posted_data = request.get_json()
            ticker = posted_data['ticker']
            spot_price = float(posted_data['spot_price'])
            strike_price = float(posted_data['strike_price'])
            iso_date = posted_data['days_to_maturity']
            risk_free_rate = float(posted_data['risk_free_rate'])
            volatility = float(posted_data['volatility'])
            
            days_to_maturity = days_difference(iso_date)
            
            if ticker:
                spot_price, volatility = get_stock_data(ticker)
                model = BlackScholesModel(spot_price, strike_price, days_to_maturity, risk_free_rate, volatility)
            else:
                model = BlackScholesModel(spot_price, strike_price, days_to_maturity, risk_free_rate, volatility)
                
            call_price = model.calculate_call_price()
            put_price = model.calculate_put_price()
            
            option_stock_prices = plot_option_price_vs_stock_price(model)
            greeks_data = plot_greeks(model)
            marutity_vs_price = plot_option_price_vs_maturity(model)
            
            res = {
                "call_price" : round(call_price, 3),
                "put_price" : round(put_price, 3),
                "option_price_vs_stock_price" : option_stock_prices,
                "maturity_vs_price" : marutity_vs_price,
                "greeks" : greeks_data,
                "cmp" : round(spot_price, 2),
                "volatility" : round(volatility, 4)
            }
            
            return jsonify(res)
        
        except Exception as e:
            print(e)
            return jsonify({'error': "Your request can not be processed. Make sure you are connected to the internet and ticker symbol actually exists"}), 404
