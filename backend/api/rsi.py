from flask_restful import Resource
from flask import jsonify, request
from services.rsi import get_rsi_data_and_stock_price
from utils.helper import convert_timeframe_to_datetime
class RsiAPI(Resource):
    def get(self):
        try:
            ticker = request.args.get('ticker', '')
            timeframe = request.args.get('timeframe', '3m')
            print(timeframe)
            start_date = convert_timeframe_to_datetime(timeframe)
            
            rsi_data = get_rsi_data_and_stock_price(ticker=ticker, start=start_date)

            return jsonify(rsi_data)
        except Exception as e:
            print(e)
            return jsonify({'error': "Your request can not be processed. Make sure you are connected to the internet and ticker symbol actually exists"}), 404
       

    def post(self):
        # Add logic for handling POST requests to add stock data
        pass
