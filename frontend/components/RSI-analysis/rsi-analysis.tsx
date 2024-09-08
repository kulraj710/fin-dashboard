"use client";

import React, { useState } from "react";
import SearchCard from "./SearchCard";
import RSIChart from "./RSIChart";
import ChartSettings from "./ChartSettings";
import { getData } from "../../services/api";

// Mock data for the chart
// const mockData = [
//   { date: "2023-01-01", rsi: 70 },
//   { date: "2023-01-02", rsi: 65 },
//   { date: "2023-01-03", rsi: 60 },
//   { date: "2023-01-04", rsi: 67 },
//   { date: "2023-01-05", rsi: 80 },
//   { date: "2023-01-06", rsi: 33 },
//   { date: "2023-01-07", rsi: 40 },
//   { date: "2023-01-08", rsi: 35 },
//   { date: "2023-01-09", rsi: 66 },
//   { date: "2023-01-10", rsi: 29 },
// ];
let rsiValue = 70;

export function RsiAnalysis() {
  const [ticker, setTicker] = useState("");
  const [timeframe, setTimeframe] = useState("1d");
  const [rsiPeriod, setRsiPeriod] = useState(14);
  const [showGrid, setShowGrid] = useState(true);
  const [loading, setLoading] = useState(true);
  const [mockData, setMockData] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    // [To-Do] fetch data based on the ticker and timeframe
    console.log(`Searching for ${ticker} with timeframe ${timeframe}`);
    try {
      setLoading(true);
      const result = await getData('/rsi');
      console.log(result);
      setMockData(result);
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">RSI Analysis</h1>

      <SearchCard
        ticker={ticker}
        setTicker={setTicker}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        handleSearch={handleSearch}
      />

      {!loading ? (
        <>
          <RSIChart
            ticker={ticker}
            mockData={mockData}
            rsiValue={rsiValue}
            showGrid={showGrid}
          />

          <ChartSettings
            rsiPeriod={rsiPeriod}
            setRsiPeriod={setRsiPeriod}
            showGrid={showGrid}
            setShowGrid={setShowGrid}
          />
        </>
      ) : null}
    </div>
  );
}
