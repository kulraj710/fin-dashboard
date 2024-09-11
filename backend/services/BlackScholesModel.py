import numpy as np
from scipy.stats import norm
import yfinance as yf

class BlackScholesModel:
    def __init__(self, underlying_spot_price, strike_price, days_to_maturity, risk_free_rate, sigma):
        self.S = underlying_spot_price
        self.K = strike_price
        self.T = days_to_maturity / 365
        self.r = risk_free_rate
        self.sigma = sigma

    def _calculate_d1(self):
        return (np.log(self.S / self.K) + (self.r + 0.5 * self.sigma ** 2) * self.T) / (self.sigma * np.sqrt(self.T))

    def _calculate_d2(self):
        return self._calculate_d1() - self.sigma * np.sqrt(self.T)

    def calculate_call_price(self):
        d1 = self._calculate_d1()
        d2 = self._calculate_d2()
        return self.S * norm.cdf(d1) - self.K * np.exp(-self.r * self.T) * norm.cdf(d2)

    def calculate_put_price(self):
        d1 = self._calculate_d1()
        d2 = self._calculate_d2()
        return self.K * np.exp(-self.r * self.T) * norm.cdf(-d2) - self.S * norm.cdf(-d1)

    def calculate_delta(self, option_type='call'):
        d1 = self._calculate_d1()
        if option_type == 'call':
            return norm.cdf(d1)
        else:
            return norm.cdf(d1) - 1

    def calculate_gamma(self):
        d1 = self._calculate_d1()
        return norm.pdf(d1) / (self.S * self.sigma * np.sqrt(self.T))

    def calculate_theta(self, option_type='call'):
        d1 = self._calculate_d1()
        d2 = self._calculate_d2()
        theta_call = (-self.S * norm.pdf(d1) * self.sigma / (2 * np.sqrt(self.T)) 
                      - self.r * self.K * np.exp(-self.r * self.T) * norm.cdf(d2))
        if option_type == 'call':
            return theta_call
        else:
            return theta_call + self.r * self.K * np.exp(-self.r * self.T)

    def calculate_vega(self):
        d1 = self._calculate_d1()
        return self.S * norm.pdf(d1) * np.sqrt(self.T)

    def monte_carlo_simulation(self, num_simulations=10000, num_steps=252):
        dt = self.T / num_steps
        paths = np.zeros((num_simulations, num_steps + 1))
        paths[:, 0] = self.S
        
        for t in range(1, num_steps + 1):
            z = np.random.standard_normal(num_simulations)
            paths[:, t] = paths[:, t-1] * np.exp((self.r - 0.5 * self.sigma**2) * dt + self.sigma * np.sqrt(dt) * z)
        
        option_payoffs = np.maximum(paths[:, -1] - self.K, 0)  # For call option
        option_price = np.exp(-self.r * self.T) * np.mean(option_payoffs)
        
        return paths, option_price

def get_stock_data(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1d")
    if hist.empty:
        raise ValueError(f"No data available for ticker {ticker}")
    current_price = hist['Close'].iloc[-1]
    hist = stock.history(period="1mo")
    returns = np.log(hist['Close'] / hist['Close'].shift(1))
    volatility = returns.std() * np.sqrt(252)
    return current_price, volatility

def plot_option_price_vs_stock_price(model):
    stock_prices = np.linspace(model.S * 0.5, model.S * 1.5, 100)
    call_prices = []
    put_prices = []
    for price in stock_prices:
        model.S = price
        call_prices.append(model.calculate_call_price())
        put_prices.append(model.calculate_put_price())
    
    result = [
        {"stockPrice": round(stock_price, 2), "callPrice": round(call_price, 2), "putPrice": round(put_price, 2)}
        for stock_price, call_price, put_price in zip(stock_prices, call_prices, put_prices)
    ]
    
    return result
    

def plot_greeks(model):
    stock_prices = np.linspace(model.S * 0.5, model.S * 1.5, 100)

    result = []
    for price in stock_prices:
        model.S = price
        result.append({
            "price": round(price, 2),
            "delta": model.calculate_delta(),
            "gamma": model.calculate_gamma(),
            "theta": model.calculate_theta(),
            "vega": model.calculate_vega()
        })
    
    return result
    

def plot_option_price_vs_maturity(model):
    days_to_maturity = np.linspace(1, 365, 100)
    result = []
    
    for days in days_to_maturity:
        model.T = days / 365  # Convert days to years (as model.T is in years)
        result.append({
            "days_to_maturity": round(days),
            "call_price": round(model.calculate_call_price(), 2),
            "put_price": round(model.calculate_put_price(), 2)
        })
    
    return result


# def plot_monte_carlo_simulation(model, ax):
#     num_simulations = 1000
#     num_paths_to_plot = 100
#     paths, mc_option_price = model.monte_carlo_simulation(num_simulations)
    
#     time_points = np.linspace(0, model.T, paths.shape[1])
#     for i in range(num_paths_to_plot):
#         ax.plot(time_points, paths[i], alpha=0.1, color='blue')
    
#     ax.plot(time_points, np.mean(paths, axis=0), color='red', linewidth=2, label='Mean Path')
#     ax.axhline(y=model.K, color='green', linestyle='--', label='Strike Price')
#     ax.set_xlabel('Time (years)')
#     ax.set_ylabel('Stock Price')
#     ax.set_title(f'Monte Carlo Simulation\nEstimated Option Price: ${mc_option_price:.2f}')
#     ax.legend()
