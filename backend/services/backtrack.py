from backtesting import Backtest, Strategy
from backtesting.lib import crossover
from backtesting.test import SMA, GOOG
from bokeh.plotting import output_file

class SMAStategy(Strategy):
    
    def init(self):
        price = self.data.Close
        self.ma1 = self.I(SMA, price, 10)    
        self.ma2 = self.I(SMA, price, 20)
    
    def next(self):
        if crossover(self.ma1, self.ma2):
            self.buy()
        
        elif crossover(self.ma2, self.ma1):
            self.sell()


def backtest_result_in_html(ticker=GOOG, cash=1000, commission=.002, exclusive_orders=True):
    backtest = Backtest(ticker, SMAStategy,cash=cash, commission=commission, exclusive_orders=exclusive_orders)
    stats = backtest.run()
    output_file_path = 'SMAstat.html'
    
    output_file(output_file_path)
    backtest.plot()
    
    with open(output_file_path, 'r') as file:
        html_content = file.read()
    
    # stats_dict = {k: str(v) if isinstance(v, (float, int)) else v for k, v in stats.items()}
    return html_content
