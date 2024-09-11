from backtesting import Backtest, Strategy
from backtesting.lib import crossover
from backtesting.test import SMA, GOOG
from bokeh.plotting import output_file
from bokeh.embed import components

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


# def backtest_result_in_html(file_name, ticker=GOOG, cash=1000, commission=.002, exclusive_orders=True):
#     backtest = Backtest(ticker, SMAStategy,cash=cash, commission=commission, exclusive_orders=exclusive_orders)
#     stats = backtest.run()
    
#     output_file(file_name)
#     backtest.plot()
    
#     # stats_dict = {k: str(v) if isinstance(v, (float, int)) else v for k, v in stats.items()}
#     return stats

def backtest_result_in_html(file_name, ticker=GOOG, cash=1000, commission=.002, exclusive_orders=True):
    backtest = Backtest(ticker, SMAStategy, cash=cash, commission=commission, exclusive_orders=exclusive_orders)
    stats = backtest.run()

    # Capture the Bokeh components from the backtest plot
    plot_script, plot_div = components(backtest.plot())

    # Write the HTML file manually with the components
    with open(file_name, 'w') as f:
        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Backtest Plot</title>
            <script src="https://cdn.bokeh.org/bokeh/release/bokeh-2.3.0.min.js"></script>
            {plot_script}
        </head>
        <body>
            {plot_div}
        </body>
        </html>
        """
        f.write(html_content)

    return stats