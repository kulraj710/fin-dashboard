"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface resultProps{
    callPrice : number;
    putPrice : number;
    currency? : string;
    cmp : number;
    calculatedVol : number;
}

const ResultsCard : React.FC<resultProps> = ({callPrice, putPrice, currency, cmp, calculatedVol}) => {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Results</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <p>Call Option Price: {currency} {callPrice}</p>
        <p>Put Option Price: {currency} {putPrice}</p>
        <p>Current Market Price: {currency} {cmp}</p>
        <p>Calculated Volatility: {calculatedVol}</p>
      </div>
    </CardContent>
  </Card>

  )
}

export default ResultsCard