"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartComponentProps {
  data: Array<any>;
}

export default function ChartComponent({ data }: ChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <RechartsTooltip />
        <Legend />
        <Line type="monotone" dataKey="call" stroke="#8884d8" />
        <Line type="monotone" dataKey="put" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
