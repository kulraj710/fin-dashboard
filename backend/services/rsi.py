import pandas as pd
import yfinance as yf
import datetime as dt

def get_rsi_data_and_stock_price(ticker='AAPL', start=dt.datetime(2024,1,1), end=dt.datetime.now()):
    try:
        data = yf.download(ticker,start=start, end=end)
        delta = data['Adj Close'].diff(1)
        delta.dropna(inplace=True)
        positive = delta.copy()
        negative = delta.copy()

        # scrap negavite values
        positive[ positive < 0] = 0

        # scrap positive values
        negative[ negative > 0] = 0

        days = 14

        avgerate_gain = positive.rolling(window=days).mean()
        avgerate_loss = abs(negative.rolling(window=days).mean())

        # calc relative strength 
        relative_strength = avgerate_gain / avgerate_loss
        RSI = 100.0 - (100.0 / (1.0 + relative_strength))

        combined = pd.DataFrame()
        combined['AdjClose'] = round(data['Adj Close'], 2)
        combined['rsi'] = round(RSI, 3)
        combined['date'] = data.index.strftime('%d-%m-%y')

    
        clean_combined = combined.dropna(axis=0, how='any')
    
        rsi_data_json = clean_combined.to_dict(orient='records')
        
        return rsi_data_json
    except Exception as e:
        print(e)
        return e