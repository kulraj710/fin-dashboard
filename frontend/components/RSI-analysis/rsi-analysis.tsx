"use client";

import React, { useState } from "react";
import SearchCard from "./SearchCard";
import RSIChart from "./RSIChart";
import ChartSettings from "./ChartSettings";
import { getData } from "../../services/api";

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
