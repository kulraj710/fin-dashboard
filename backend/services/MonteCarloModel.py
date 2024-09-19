# Third party imports
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Ensure non-interactive backend for Flask
import matplotlib.pyplot as plt
import io
import yfinance as yf
import base64


class MonteCarloModel:
    """
    Implements European option price calculation using Monte Carlo Simulation.
    Simulates the underlying asset price on the expiry date using a stochastic process (Brownian motion).
    For the simulated prices at maturity, it calculates and averages their payoffs, discounts the final value to the present,
    and returns the option price.
    """

    def __init__(
        self,
        underlying_spot_price: float,
        strike_price: float,
        days_to_maturity: int,
        risk_free_rate: float,
        sigma: float,
        number_of_simulations: int,
        seed: int = None,
    ):
        """
        Initialize the Monte Carlo pricing model.

        Args:
            underlying_spot_price (float): Current spot price of the underlying asset.
            strike_price (float): Strike price of the option contract.
            days_to_maturity (int): Days to maturity (expiry date) of the option contract.
            risk_free_rate (float): Constant risk-free interest rate until maturity.
            sigma (float): Volatility of the underlying asset (standard deviation of log returns).
            number_of_simulations (int): Number of random paths to simulate.
            seed (int, optional): Seed for the random number generator for reproducibility. Defaults to None.
        """
        self.S_0 = underlying_spot_price
        self.K = strike_price
        self.T = days_to_maturity / 365
        self.r = risk_free_rate
        self.sigma = sigma
        self.N = number_of_simulations
        self.num_of_steps = days_to_maturity
        self.dt = float(self.T / self.num_of_steps)
        self.seed = seed
        self.simulation_results_S = None

    def simulate_prices(self):
        """
        Simulates the price movement of the underlying asset using the Brownian motion process.
        Stores the results in `self.simulation_results_S`.
        """
        if self.seed is not None:
            np.random.seed(self.seed)

        # Initialize the price movements: rows for time steps, columns for different simulations.
        S = np.zeros((self.num_of_steps + 1, self.N), dtype=np.float64)
        S[0] = float(self.S_0)  # Ensure starting price is a float

        for t in range(1, self.num_of_steps + 1):
            Z = np.random.standard_normal(
                self.N
            )  # Standard normal distribution for Brownian motion
            # Explicitly cast to float to avoid dtype mismatch
            S[t] = S[t - 1] * np.exp(
                (self.r - 0.5 * float(self.sigma)**2) * self.dt
                + float(self.sigma) * np.sqrt(self.dt) * Z
            )

        self.simulation_results_S = S

    def calculate_call_option_price(self) -> float:
        """
        Calculates the European call option price based on the simulated prices.
        Returns the discounted average payoff for the call option.

        Returns:
            float: Call option price.
        """
        if self.simulation_results_S is None:
            raise ValueError(
                "Price simulations are not yet performed. Call simulate_prices() first."
            )

        payoff = np.maximum(self.simulation_results_S[-1] - self.K, 0)
        return np.exp(-self.r * self.T) * np.mean(payoff)

    def calculate_put_option_price(self) -> float:
        """
        Calculates the European put option price based on the simulated prices.
        Returns the discounted average payoff for the put option.

        Returns:
            float: Put option price.
        """
        if self.simulation_results_S is None:
            raise ValueError(
                "Price simulations are not yet performed. Call simulate_prices() first."
            )

        payoff = np.maximum(self.K - self.simulation_results_S[-1], 0)
        return np.exp(-self.r * self.T) * np.mean(payoff)

    def plot_simulation_results(self, num_of_movements: int = 10):
        """
        Plots a specified number of simulated price paths and returns the plot as a base64-encoded string.

        Args:
            num_of_movements (int, optional): Number of simulated price paths to plot. Defaults to 10.

        Returns:
            str: The plot as a base64-encoded string.
        """
        if self.simulation_results_S is None:
            raise ValueError(
                "Price simulations are not yet performed. Call simulate_prices() first."
            )

        fig, ax = plt.subplots(figsize=(12, 8))
        ax.plot(self.simulation_results_S[:, :num_of_movements])
        ax.axhline(self.K, color="red", linestyle="--", label="Strike Price")
        ax.set_xlim([0, self.num_of_steps])
        ax.set_ylabel("Simulated Price")
        ax.set_xlabel("Days to Maturity")
        ax.set_title(f"Showing {num_of_movements}/{self.N} Simulated Price Movements")
        ax.legend()

        # Save the plot to a BytesIO object
        img = io.BytesIO()
        fig.savefig(img, format="png")
        img.seek(0)
        plt.close(fig)

        # Encode the image as base64
        img_base64 = base64.b64encode(img.getvalue()).decode("utf-8")
        return img_base64


def get_stock_data(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1d")
    if hist.empty:
        raise ValueError(f"No data available for ticker {ticker}")
    current_price = hist["Close"].iloc[-1]
    hist = stock.history(period="1mo")
    returns = np.log(hist["Close"] / hist["Close"].shift(1))
    volatility = returns.std() * np.sqrt(252)
    return float(current_price), float(volatility)
