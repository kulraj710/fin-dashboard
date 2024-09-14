"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Line } from "recharts";
import { ChevronLeft, SidebarOpen } from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import InputParams from "./InputParams";
import ResultsCard from "./ResultsCard";
import LineChartComp from "../ui/lineChartComp";
import { postData } from "@/services/api";

export default function OptionPricingUI() {
  const [useTicker, setUseTicker] = useState(false);
  const [ticker, setTicker] = useState("");
  const [spotPrice, setSpotPrice] = useState(100);
  const [strikePrice, setStrikePrice] = useState(100);
  const [selectMaturityDate, setSelectMaturityDate] = useState<any>();
  const [riskFreeRate, setRiskFreeRate] = useState(0.05);
  const [volatility, setVolatility] = useState(0.5);
  const [model, setModel] = useState("black-scholes");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [optionStockData, setOptionStockData] = useState();
  const [greeksData, setGreeksData] = useState();
  const [maturityData, setMaturityData] = useState();
  const [callPrice, setCallPrice] = useState(-1);
  const [putPrice, setPutPrice] = useState(-1);
  const [currency, setCurrency] = useState("$");
  const [error, setError] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [cmp, setCmp] = useState(0);
  const [calculatedVol, setCalculatedVol] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDelayMessage, setShowDelayMessage] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const calculateOptionPrice = async () => {

    const timeout = setTimeout(() => {
      setShowDelayMessage(true); 
    }, 3000);

    try {
      setLoading(true);
      setError("");
      setShowChart(false);

      let data = {
        ticker: ticker,
        spot_price: spotPrice,
        strike_price: strikePrice,
        days_to_maturity: new Date(selectMaturityDate).toISOString(),
        risk_free_rate: riskFreeRate,
        volatility: volatility,
      };
      console.table(data);

      const response = await postData("/option-pricing/black_scholes", data);
      console.table(response);

      clearTimeout(timeout);

      if (ticker.toUpperCase().endsWith(".NS")) {
        setCurrency("₹");
      }

      setOptionStockData(response.option_price_vs_stock_price);
      setCallPrice(response.call_price);
      setPutPrice(response.put_price);
      setCmp(response.cmp);
      setCalculatedVol(response.volatility);
      setGreeksData(response.greeks);
      setMaturityData(response.maturity_vs_price);

      setShowChart(true);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setShowDelayMessage(false)
      }, 3000);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar model={model} setModel={setModel} />

        <div className="flex-grow flex">
          <aside
            className={`bg-gray-100  ${
              sidebarOpen ? "w-64" : "w-0"
            } overflow-hidden`}
          >
            <Sidebar
              model={model}
              setModel={setModel}
              sidebarOpen={SidebarOpen}
            />
          </aside>

          <main className="flex-grow container mx-auto p-4">
            <Button
              variant="outline"
              size={sidebarOpen ? "icon" : "default"}
              onClick={toggleSidebar}
              className="mb-4"
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <>Change Model</>
              )}
            </Button>

            <h1 className="text-3xl font-bold mb-6">
              {model === "black-scholes" && "Black-Scholes Model"}
              {model === "binomial" && "Binomial Model"}
              {model === "monte-carlo" && "Monte Carlo Simulation"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Input Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  <InputParams
                    loading={loading}
                    useTicker={useTicker}
                    riskFreeRate={riskFreeRate}
                    setRiskFreeRate={setRiskFreeRate}
                    selectMaturityDate={selectMaturityDate}
                    setSelectMaturityDate={setSelectMaturityDate}
                    setSpotPrice={setSpotPrice}
                    setStrikePrice={setStrikePrice}
                    setTicker={setTicker}
                    setUseTicker={setUseTicker}
                    ticker={ticker}
                    spotPrice={spotPrice}
                    strikePrice={strikePrice}
                    volatility={volatility}
                    setVolatility={setVolatility}
                    calculateOptionPrice={calculateOptionPrice}
                    errorMessage={error}
                    showDelayMessage={showDelayMessage}
                  />
                </CardContent>
              </Card>

              <ResultsCard
                showChart={showChart}
                callPrice={callPrice}
                putPrice={putPrice}
                currency={currency}
                cmp={cmp}
                calculatedVol={calculatedVol}
              />
            </div>

            {showChart ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Option Price vs. Stock Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChartComp
                      data={optionStockData}
                      strokeDasharray="3 3"
                      height={400}
                      xdatakey="stockPrice"
                      xlabel={{
                        value: "Stock Price",
                        position: "insideBottomRight",
                        offset: -6,
                      }}
                      ylabel={{
                        value: "Option Price",
                        angle: -90,
                        position: "insideLeft",
                      }}
                      ydomain={["dataMin - 5"]}
                      yallowDataOverflow={true}
                    >
                      <Line
                        type="monotone"
                        dataKey="callPrice"
                        stroke="#8884d8"
                        strokeWidth={3}
                        dot={false}
                        name="Call Option"
                      />
                      <Line
                        type="monotone"
                        dataKey="putPrice"
                        stroke="#EA4335"
                        strokeWidth={3}
                        dot={false}
                        name="Put Option"
                      />
                    </LineChartComp>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Option Greeks vs. Stock Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChartComp
                      strokeDasharray="3 3"
                      data={greeksData}
                      xdatakey="price"
                      height={400}
                    >
                      <Line
                        type="monotone"
                        dataKey="delta"
                        dot={false}
                        stroke="#8884d8"
                        strokeWidth={2}
                        name="Delta"
                      />
                      <Line
                        type="monotone"
                        dataKey="gamma"
                        strokeWidth={2}
                        dot={false}
                        stroke="#82ca9d"
                        name="Gamma"
                      />
                      <Line
                        type="monotone"
                        dataKey="theta"
                        strokeWidth={2}
                        dot={false}
                        stroke="#ffc658"
                        name="Theta"
                      />
                      <Line
                        type="monotone"
                        dataKey="vega"
                        strokeWidth={2}
                        dot={false}
                        stroke="#ff7300"
                        name="Vega"
                      />
                    </LineChartComp>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Option Price vs. Days to Maturity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChartComp
                      strokeDasharray="3 3"
                      xdatakey="days_to_maturity"
                      height={400}
                      data={maturityData}
                    >
                      <Line
                        type="monotone"
                        dataKey="call_price"
                        dot={false}
                        stroke="#8884d8"
                        strokeWidth={3}
                        name="Call Option"
                      />
                      <Line
                        type="monotone"
                        dataKey="put_price"
                        strokeWidth={3}
                        dot={false}
                        stroke="#82ca9d"
                        name="Put Option"
                      />
                    </LineChartComp>
                  </CardContent>
                </Card>

                {/* <Card>
                <CardHeader>
                  <CardTitle>Monte Carlo Simulation</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChartComp
                    strokeDasharray="3 3"
                    xdatakey="x"
                    height={400}
                    data={dummyData}
                  >
                    <Line
                      type="monotone"
                      dataKey="call"
                      stroke="#8884d8"
                      name="Stock Price"
                    />
                  </LineChartComp>
                </CardContent>
              </Card> */}
              </div>
            ) : (
              "Plots will appear here"
            )}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
