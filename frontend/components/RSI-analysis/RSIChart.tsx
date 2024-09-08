import React, {useMemo} from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea  } from 'recharts'

interface RSIChartProps {
    ticker: string;
    mockData: {
        date: string;
        AdjClose: number;
        rsi: number;
    }[];
    rsiValue: number;
    showGrid: boolean;
}

interface CustomXAxisTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
    index: number;
  };
  visibleTicksIndex: number[];
}

const CustomXAxisTick: React.FC<CustomXAxisTickProps> = ({ x, y, payload, visibleTicksIndex }) => {
  if (payload && visibleTicksIndex.includes(payload.index)) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="right" fill="#666">
          {payload.value}
        </text>
      </g>
    );
  }
  return null;
};

const RSIChart: React.FC<RSIChartProps> = ({ticker, showGrid, mockData, rsiValue}) => {

  const visibleTicksIndex = useMemo(() => {
    const lastIndex = mockData.length - 1;
    const middleIndex = Math.floor(lastIndex / 2);
    return [0, middleIndex, lastIndex - 10];
  }, [mockData.length]);

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
                  <XAxis 
                    dataKey="date" 
                    tick={<CustomXAxisTick visibleTicksIndex={visibleTicksIndex} />} 
                    interval={0}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />

                  <ReferenceArea y1={70} y2={80} strokeOpacity={0.3} fill="red" fillOpacity={0.1}/>
                  <ReferenceArea y1={80} y2={90} strokeOpacity={0.3} fill="red" fillOpacity={0.2} />
                  <ReferenceArea y1={90} y2={100} strokeOpacity={0.3} fill="red" fillOpacity={0.4}/>

                  <ReferenceArea y1={0} y2={30} strokeOpacity={0.3} fill="green" fillOpacity={0.1}/>
                  


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