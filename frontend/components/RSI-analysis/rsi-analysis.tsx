"use client";

import React, { useState } from "react";
import SearchCard from "./SearchCard";
import RSIChart from "./RSIChart";
import ChartSettings from "./ChartSettings";
import { getData } from "../../services/api";

let rsiValue = -1;

// [To-Do] : Error displaying and handling in case the ticker
// is not found in the database.
// [To-Do] : Rightside cards need to display more technical data
// [To-Do] : Custom timeframe option, show return
// [To-Do] : Show 50 DMA, 200 DMA in Adj close chart
// [To-Do] : settings are still not functional


export function RsiAnalysis() {
  const [ticker, setTicker] = useState("");
  const [timeframe, setTimeframe] = useState("1m");
  const [rsiPeriod, setRsiPeriod] = useState(14);
  const [showGrid, setShowGrid] = useState(true);
  const [loading, setLoading] = useState(true);
  const [mockData, setMockData] = useState([]);
  const [error, setError] = useState("NO");

  const handleSearch = async () => {
    // [To-Do] fetch data based on the ticker and timeframe
    console.log(`Searching for ${ticker} with timeframe ${timeframe}`);
    try {
      setLoading(true);
      setMockData([])
      const query = `/rsi?ticker=${ticker}&timeframe=${timeframe}`;
      const result = await getData(query);
      
        setMockData(result);
        rsiValue = result[result?.length - 1]["rsi"];

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
