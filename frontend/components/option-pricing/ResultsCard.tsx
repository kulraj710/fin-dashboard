"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface resultProps {
  callPrice: number;
  putPrice: number;
  currency?: string;
  cmp: number;
  calculatedVol: number;
  showChart: boolean;
  model: string;
  monteCarlo64 : string;
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
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{showChart ? 'Results' : `${model} Option Pricing`}</CardTitle>
      </CardHeader>
      <CardContent>
        {!showChart && model === 'black-scholes' ? (
          <Image
            src="/images/blackscholes.jpg"
            alt="Blackscholes formula"
            width={650}
            height={300}
          />
        ) : (
          <div className="space-y-2">
            <p>
              Call Option Price: {currency} {callPrice}
            </p>
            <p>
              Put Option Price: {currency} {putPrice}
            </p>
            <p>
              Current Market Price: {currency} {cmp}
            </p>
            <p>Calculated Volatility: {calculatedVol}</p>

            <div>
              {model === "monte-carlo" && monteCarlo64 ? 

              <Image src={monteCarlo64} height={500} width={900} alt="Monte Carlo Simulation"/> 
              
              : null}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
