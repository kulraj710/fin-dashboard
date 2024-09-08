import React from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchCardProps {
  ticker: string;
  setTicker: (value: string) => void;
  timeframe: string;
  setTimeframe: (value: string) => void;
  handleSearch: () => void;
}

const SearchCard: React.FC<SearchCardProps> = ({ ticker, setTicker, timeframe, setTimeframe, handleSearch }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Ticker Search</CardTitle>
        <CardDescription>Enter a ticker symbol and select timeframe</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <div className="flex-grow">
            <Input
              type="text"
              placeholder="Enter ticker symbol (e.g., AAPL)"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
            />
          </div>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="1d">1 Day</SelectItem>
              <SelectItem value="1w">1 Week</SelectItem> */}
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
              <SelectItem value="3y">3 Years</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default SearchCard
