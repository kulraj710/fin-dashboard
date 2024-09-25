# Option Pricing

A collection of finance tools built using Python. This project includes functionality for options pricing using Black-Scholes, Monte Carlo, and Binomial methods, as well as Greek calculations (Delta, Gamma, Theta, Vega, Rho). Additionally, it offers a simple interface to plot the Relative Strength Index (RSI) of a given stock ticker along with its stock price, using data fetched from the Yahoo Finance API (`yfinance`).

## Features

- **Option Pricing**:
  - Black-Scholes Model
  - Monte Carlo Simulation
  - Binomial Model
  - Greek Calculations (Delta, Gamma, Theta, Vega, Rho)
  
- **RSI Plotting**:
  - Input a stock ticker to fetch stock data from Yahoo Finance.
  - Display the RSI indicator plotted against the stock price.
  
## Tech Stack

- **Backend**: Flask (Python)
  - Handles option pricing logic and API requests for finance data.
  
- **Frontend**: Next.js with ShadCN
  - Presents a modern and responsive user interface for input and visualizations.

- **APIs**: 
  - `yfinance`: Fetches stock market data
  
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/finance-tools.git
   cd finance-tools
2. Set up the backend (Flask):
   - Create a virtual environment:
     ```bash
     python3 -m venv venv
     source venv/bin/activate  # For Linux/Mac
     .\venv\Scripts\activate  # For Windows
     ```
   - Install dependencies:
     ```bash
     pip install -r backend/requirements.txt
     ```
   - Start the Flask backend:
     ```bash
     cd backend
     flask run
     ```

3. Set up the frontend (Next.js):
   - Navigate to the `frontend` directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the Next.js frontend:
     ```bash
     npm run dev
     ```

4. Open the app in your browser:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:5000](http://localhost:5000) (for API requests)

## Usage

- Access the option pricing tools to calculate option prices and Greeks based on various models.
- Plot the RSI indicator for any stock ticker by entering the symbol on the RSI page.

## To-Do

- [ ] Add more advanced options pricing models (e.g., American options, Cox-Ross-Rubinstein).
- [ ] Implement additional stock technical indicators (e.g., MACD, Bollinger Bands).
- [ ] Implement automated testing for both the backend and frontend.
- [ ] Add user authentication and personalized dashboards.

## Contributing

Feel free to fork this repository and submit pull requests. If you'd like to contribute, check out the issues for any open tasks or suggest new features by opening an issue.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
