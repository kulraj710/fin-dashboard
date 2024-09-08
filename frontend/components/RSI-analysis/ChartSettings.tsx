import React from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";

interface ChartSettingsProps {
    rsiPeriod : number;
    setRsiPeriod : (value: number) => void;
    showGrid : boolean;
    setShowGrid : (value: boolean) => void;
}


const ChartSettings: React.FC<ChartSettingsProps> = ({rsiPeriod, setRsiPeriod, showGrid, setShowGrid}) => {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Chart Settings</CardTitle>
      <CardDescription>Customize the RSI chart display</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="rsi-period">RSI Period</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="rsi-period"
              min={2}
              max={30}
              step={1}
              value={[rsiPeriod]}
              onValueChange={(value) => setRsiPeriod(value[0])}
              className="flex-grow"
            />
            <span className="font-medium">{rsiPeriod}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="show-grid"
            checked={showGrid}
            onCheckedChange={setShowGrid}
          />
          <Label htmlFor="show-grid">Show Grid</Label>
        </div>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset to Defaults
        </Button>
      </div>
    </CardContent>
  </Card>
  )
}

export default ChartSettings