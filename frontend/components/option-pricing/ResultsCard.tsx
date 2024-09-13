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
}

const ResultsCard: React.FC<resultProps> = ({
  callPrice,
  putPrice,
  currency,
  cmp,
  calculatedVol,
  showChart,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{showChart ? 'Results' : 'Black-Scholes Option Pricing Formula'}</CardTitle>
      </CardHeader>
      <CardContent>
        {!showChart ? (
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
            <p>
              Scroll Below for Plots
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
