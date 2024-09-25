"use client";

// [TO-DO] (readibility) : Seperate ResultsCard component for each model instead of
//                       current implementation which is just one file with multiple if-else.

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import monteCarloExampleImage from "../../public/images/monte-carlo-example-reliance.png";
import ResultTable from "./ResultTable";

interface resultProps {
  callPrice: number;
  putPrice: number;
  currency?: string;
  cmp: number;
  calculatedVol: number;
  showChart: boolean;
  model: string;
  monteCarlo64: string;
  showMonteCarloExample: boolean;
}

const ResultsCard: React.FC<resultProps> = ({
  callPrice,
  putPrice,
  currency,
  cmp,
  model,
  calculatedVol,
  showChart,
  monteCarlo64,
  showMonteCarloExample,
}) => {
  return (
    <Card>
      <CardHeader>
        {model === "monte-carlo" && showMonteCarloExample ? (
          <CardTitle>Example Response for Reliance Industries</CardTitle>
        ) : (
          <CardTitle>
            {showChart ? "Results" : `${model} Option Pricing`}
          </CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {!showChart && model === "black-scholes" ? (
          <Image
            src="/images/blackscholes.jpg"
            alt="Blackscholes formula"
            width={650}
            height={300}
          />
        ) : (
          <div className="space-y-2">
            {showMonteCarloExample && model === "monte-carlo" ? (
              <>
                <ResultTable
                  currency={"₹"}
                  callPrice={86.216}
                  putPrice={18.218}
                  cmp={2987.9}
                  volatility={0.1398}
                />
              </>
            ) : (
              <>
                <ResultTable
                  currency={currency}
                  callPrice={callPrice}
                  putPrice={putPrice}
                  cmp={cmp}
                  volatility={calculatedVol}
                />
              </>
            )}

            <div>
              {model === "monte-carlo" ? (
                monteCarlo64 && !showMonteCarloExample ? (
                  <Image
                    src={monteCarlo64}
                    height={500}
                    width={900}
                    alt="Monte Carlo Simulation"
                  />
                ) : (
                  <Image
                    src={monteCarloExampleImage}
                    height={500}
                    width={900}
                    alt="Monte Carlo Simulation Example"
                  />
                )
              ) : (
                <p>Scroll Below for Plots</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
