"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DatePicker } from "../ui/datePicker";

interface inputParmsProps {
  useTicker: boolean;
  setUseTicker: (value: boolean) => void;
  ticker: string;
  setTicker: (value: string) => void;
  spotPrice: number;
  setSpotPrice: (value: number) => void;
  strikePrice: number;
  setStrikePrice: (value: number) => void;
  selectMaturityDate: Date | undefined;
  setSelectMaturityDate: (value: Date | undefined | string) => void;
  riskFreeRate: number;
  setRiskFreeRate: (value: number) => void;
  volatility: number;
  setVolatility: (value: number) => void;
  calculateOptionPrice: () => void;
  loading : boolean;
}

const InputParams: React.FC<inputParmsProps> = ({
  useTicker,
  calculateOptionPrice,
  volatility,
  setVolatility,
  setUseTicker,
  loading,
  riskFreeRate,
  setRiskFreeRate,
  ticker,
  setTicker,
  spotPrice,
  setSpotPrice,
  strikePrice,
  setStrikePrice,
  selectMaturityDate,
  setSelectMaturityDate,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Checkbox
              id="use-ticker"
              checked={useTicker}
              onCheckedChange={(checked) => setUseTicker(checked as boolean)}
            />
          </TooltipTrigger>
          <TooltipContent>
            Use a stock ticker symbol instead of manually entering the spot
            price
          </TooltipContent>
        </Tooltip>
        <Label htmlFor="use-ticker">Use Ticker Symbol</Label>
      </div>

      {useTicker ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Label htmlFor="ticker">Ticker Symbol</Label>
              <Input
                id="ticker"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="e.g., AAPL, GOOGL"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            Enter the stock ticker symbol (e.g., AAPL for Apple Inc.)
          </TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Label htmlFor="spot-price">Underlying Spot Price</Label>
              <Input
                id="spot-price"
                type="number"
                value={spotPrice}
                onChange={(e) => setSpotPrice(Number(e.target.value))}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>Current price of the underlying asset</TooltipContent>
        </Tooltip>
      )}

      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Label htmlFor="strike-price">Strike Price</Label>
            <Input
              id="strike-price"
              type="number"
              value={strikePrice}
              onChange={(e) => setStrikePrice(Number(e.target.value))}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          The price at which the option can be exercised
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Label htmlFor="maturity-date">Maturity Date</Label>
            <br />
            <DatePicker
              id="maturity-date"
              date={selectMaturityDate}
              setDate={setSelectMaturityDate}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>The expiration date of the option</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Label htmlFor="risk-free-rate">Risk-Free Rate</Label>
            <Input
              id="risk-free-rate"
              type="number"
              value={riskFreeRate}
              onChange={(e) => setRiskFreeRate(Number(e.target.value))}
              step="0.01"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          The theoretical rate of return of an investment with zero risk
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Label htmlFor="volatility">
              Volatility (Sigma): {volatility}%
            </Label>
            <Slider
              id="volatility"
              min={0}
              max={100}
              step={1}
              value={[volatility]}
              onValueChange={(value) => setVolatility(value[0])}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          A measure of the amount of uncertainty or risk about the size of
          changes in an asset's value
        </TooltipContent>
      </Tooltip>

      <Button onClick={calculateOptionPrice} disabled={loading}>{loading ? "Calculating.." : "Calculate"}</Button>
    </div>
  );
};

export default InputParams;
