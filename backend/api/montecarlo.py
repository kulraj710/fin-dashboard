from flask_restful import Resource
from flask import jsonify, request
from services.MonteCarloModel import MonteCarloModel, get_stock_data
from api.blackscholes import days_difference

class MonteCarloPricing(Resource):
    def post(self):
        try:
            posted_data = request.get_json()
            ticker = posted_data['ticker']
            spot_price = float(posted_data['spot_price'])
            strike_price = float(posted_data['strike_price'])
            iso_date = posted_data['days_to_maturity']
            risk_free_rate = float(posted_data['risk_free_rate'])
            volatility = float(posted_data['volatility'])
            number_of_simulations = int(posted_data['number_of_simulations'])
            seed = int(posted_data['seed'])
            
            days_to_maturity = days_difference(iso_date)
            
            if ticker:
                spot_price, volatility = get_stock_data(ticker)
                # Create the Monte Carlo model
                model = MonteCarloModel(spot_price, strike_price, days_to_maturity,
                                 risk_free_rate, volatility, number_of_simulations, seed)
            else:
                model = MonteCarloModel(spot_price, strike_price, days_to_maturity,
                                 risk_free_rate, volatility, number_of_simulations, seed)
                
            # Simulate the prices
            model.simulate_prices()
            
            call_price = model.calculate_call_option_price()
            put_price = model.calculate_put_option_price()

            plot_img_base64 = model.plot_simulation_results(num_of_movements=number_of_simulations)

            
            res = {
                "call_price" : round(call_price, 3),
                "put_price" : round(put_price, 3),
                "cmp" : round(spot_price, 2),
                "volatility" : round(volatility, 4),
                "plot_img_base64" : plot_img_base64,
                "status" : 200
            }
            
            return jsonify(res)
        
        except ValueError as e:
            print(e)
            # return jsonify({"error": str(e)})
            return jsonify({'error': str(e), 'status' : 404})
            
        except Exception as e:
            print(e)
            return jsonify({'error': "Your request can not be processed. Make sure you are connected to the internet and ticker symbol actually exists", 'status' : 404})
