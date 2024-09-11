from flask_restful import Resource
from flask import jsonify, send_from_directory
from services.backtrack import backtest_result_in_html
from threading import Timer

import os
import uuid

HTML_DIR = os.path.join(os.getcwd(), "services")


if not os.path.exists(HTML_DIR):
    os.makedirs(HTML_DIR)

def delete_file_after_delay(file_path, delay=180):
    """
    Deletes the file after a given delay (default is 180 seconds = 3 minutes)
    """
    def delete_file():
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"Deleted file: {file_path}")
    
    # Schedule the deletion after the delay
    Timer(delay, delete_file).start()


class BacktestStatAPI(Resource):
    def get(self):
        try:
            unique_id = str(uuid.uuid4())
            file_name = f"plot_{unique_id}.html"
            file_path = os.path.join(HTML_DIR, file_name)
            
            backtest_result_in_html(file_name)
            delete_file_after_delay(file_path, delay=180)
            
            return jsonify({'url' : f"http://localhost:5000/api/backtest/{file_name}"})
        
        except Exception as e:
            print(e)
            return jsonify({'error': "Your request can not be processed. Make sure you are connected to the internet and ticker symbol actually exists"}), 404

class PlotFileAPI(Resource):
    def get(self, filename):
        # Serve the HTML file
        return send_from_directory(HTML_DIR, filename)
