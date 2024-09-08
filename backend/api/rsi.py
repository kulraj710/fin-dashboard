from flask_restful import Resource
from flask import jsonify
from services.rsi import get_rsi_data_and_stock_price

class RsiAPI(Resource):
    def get(self):
        rsi_data = get_rsi_data_and_stock_price()
    
        stock_data = [
            {"date": "23-01-01", "rsi": 70},
            {"date": "23-01-02", "rsi": 65},
            {"date": "23-01-03", "rsi": 60},
            {"date": "23-01-04", "rsi": 67},
            {"date": "23-01-05", "rsi": 80},
            {"date": "23-01-06", "rsi": 33},
            {"date": "23-01-07", "rsi": 55},
            {"date": "23-01-08", "rsi": 35},
            {"date": "23-01-09", "rsi": 66},
            {"date": "23-01-10", "rsi": 29},
        ]
        print(type(rsi_data))
        print(rsi_data)
        
        return jsonify(rsi_data)

    def post(self):
        # Add logic for handling POST requests to add stock data
        pass
