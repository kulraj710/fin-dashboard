from flask_restful import Resource
from flask import jsonify, request, make_response
from services.backtrack import backtest_result_in_html

class BacktestStatAPI(Resource):
    def post(self):
        try:
            res = backtest_result_in_html()
            # with open(res, 'r') as file:
            #     html_content = file.read()
            #     print(html_content)
        # Return the HTML content to be displayed in the browser
            response = make_response(res)
            response.mimetype = 'text/html'
            return response
        
        except Exception as e:
            print(e)
            return jsonify({'error': "Your request can not be processed. Make sure you are connected to the internet and ticker symbol actually exists"}), 404
       
