"use client"

import React from 'react'
import {
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";


  interface lineChartProps{
    data: any
    xdatakey?: string | undefined;
    ydatakey?: string | undefined;
    height? : number;
    strokeDasharray: string;
    children: React.ReactNode;
    xlabel?: object | undefined;
    ylabel?: object | undefined;
    yallowDataOverflow?: boolean;
    ydomain?: any;
  }


const LineChartComp : React.FC<lineChartProps> = ({data, children, yallowDataOverflow=false, ydomain=null, strokeDasharray, xdatakey, ydatakey, height =300, xlabel, ylabel}) => {
  return (
         <ResponsiveContainer width="100%" height={height}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray={strokeDasharray} />
                      <XAxis dataKey={xdatakey} label={xlabel}/>
                      <YAxis label={ylabel} domain={ydomain} allowDataOverflow={yallowDataOverflow}/>
                      <RechartsTooltip />
                      <Legend />
                      
                      {children}
                    </LineChart>
                  </ResponsiveContainer>
  )
}

export default LineChartComp