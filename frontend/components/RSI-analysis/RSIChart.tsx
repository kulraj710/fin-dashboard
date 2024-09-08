import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface RSIChartProps {
    ticker: string;
    mockData: {
        date: string;
        rsi: number;
    }[];
    rsiValue: number;
    showGrid: boolean;
}

const RSIChart: React.FC<RSIChartProps> = ({ticker, showGrid, mockData, rsiValue}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
    {/* First Card: RSI Chart */}
    <div className="w-full md:w-3/4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>RSI Chart</CardTitle>
          <CardDescription>
            Relative Strength Index analysis for {ticker || 'selected ticker'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  horizontal={showGrid}
                />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="rsi"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  
    {/* Second Card: Overbought/Oversold Indicator */}
    <div className="w-full md:w-1/4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>RSI Status</CardTitle>
          <CardDescription>
            Status of the stock based on RSI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-[400px] text-lg font-semibold">
            {rsiValue >= 70 ? (
              <span className="text-red-600">Overbought</span>
            ) : rsiValue <= 30 ? (
              <span className="text-green-600">Oversold</span>
            ) : (
              <span>Neutral</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>  
  )
}

export default RSIChart