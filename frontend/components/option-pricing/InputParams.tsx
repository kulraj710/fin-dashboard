"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  loading: boolean;
  errorMessage?: string;
  showDelayMessage?: boolean;
  showChart: boolean;
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
  showChart,
  selectMaturityDate,
  setSelectMaturityDate,
  errorMessage = "",
  showDelayMessage,
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
                placeholder="e.g., AAPL, GOOG, ITC.NS, MRF.NS, ZOMATO.NS"
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
              onlyFutureDates
              error="You can not select date in the past!"
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
            {useTicker ? (
              <Label>
                Volatility (Sigma) will be automatically calculated.
              </Label>
            ) : (
              <>
                <Label htmlFor="volatility">
                  Volatility (Sigma): {volatility}%
                </Label>
                <Input
                  id="volatility"
                  type="number"
                  value={volatility}
                  onChange={(e) => setVolatility(Number(e.target.value))}
                  step="0.01"
                />
              </>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          A measure of the amount of uncertainty or risk about the size of
          changes in an asset's value
        </TooltipContent>
      </Tooltip>

      <Button onClick={calculateOptionPrice} disabled={loading}>
        {loading ? "Calculating.." : "Calculate"}
      </Button>
      {showDelayMessage && !errorMessage ? (
        <Alert className="bg-yellow-100">
          {/* <AlertTitle>Notice</AlertTitle> */}
          <AlertDescription>
            As the server is hosted on the shared instance, it might take up to
            20 seconds for the response. Thank you for your patience.
          </AlertDescription>
        </Alert>
      ) : null}

      {showChart ? (
        <Alert className="bg-green-100">
          <AlertDescription>
            Option price calculated successfully!
          </AlertDescription>
        </Alert>
      ) : null}

      {errorMessage ? (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
};

export default InputParams;
