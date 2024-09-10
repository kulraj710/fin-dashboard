"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
// import { DatePicker } from "@/components/ui/date-picker"
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import { Menu, ChevronRight, ChevronLeft } from "lucide-react";

export default function OptionPricingUI() {
  const [useTicker, setUseTicker] = useState(false);
  const [ticker, setTicker] = useState("AAPL");
  const [spotPrice, setSpotPrice] = useState(100);
  const [strikePrice, setStrikePrice] = useState(100);
  const [maturityDate, setMaturityDate] = useState<Date | undefined>(new Date());
  const [riskFreeRate, setRiskFreeRate] = useState(0.05);
  const [volatility, setVolatility] = useState(20);
  const [model, setModel] = useState("black-scholes");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  // Dummy data for charts
  const dummyData = Array.from({ length: 100 }, (_, i) => ({
    x: i,
    call: Math.random() * 10 + 5,
    put: Math.random() * 8 + 2,
    delta: Math.random() * 0.5,
    gamma: Math.random() * 0.1,
    theta: Math.random() * -0.1,
    vega: Math.random() * 0.2,
  }));

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleCheckboxChange = (name: keyof typeof checkboxes) => {
    setCheckboxes((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-primary text-primary-foreground p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Option Pricing Models
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Select Model</SheetTitle>
                  <SheetDescription>
                    Choose an option pricing model to use.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black-scholes">
                        Black-Scholes
                      </SelectItem>
                      <SelectItem value="binomial">Binomial</SelectItem>
                      <SelectItem value="monte-carlo">Monte Carlo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>

        <div className="flex-grow flex">
          <aside
            className={`bg-gray-100 transition-all duration-300 ease-in-out ${
              sidebarOpen ? "w-64" : "w-0"
            } overflow-hidden`}
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Options</h2>
              <div className="space-y-2">
                {Object.entries(checkboxes).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={() =>
                        handleCheckboxChange(key as keyof typeof checkboxes)
                      }
                    />
                    <label htmlFor={key} className="ml-2 text-sm font-medium">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-grow container mx-auto p-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSidebar}
              className="mb-4"
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>

            <h1 className="text-3xl font-bold mb-6">
              {model === "black-scholes" && "Black-Scholes Model"}
              {model === "binomial" && "Binomial Model"}
              {model === "monte-carlo" && "Monte Carlo Simulation"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Input Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Checkbox
                            id="use-ticker"
                            checked={useTicker}
                            onCheckedChange={(checked) =>
                              setUseTicker(checked as boolean)
                            }
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          Use a stock ticker symbol instead of manually entering
                          the spot price
                        </TooltipContent>
                      </Tooltip>
                      <Label htmlFor="use-ticker">Use Ticker Symbol</Label>
                    </div>

                    {useTicker ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Label htmlFor="ticker">Ticker Symbol</Label>
                            <Input
                              id="ticker"
                              value={ticker}
                              onChange={(e) => setTicker(e.target.value)}
                              placeholder="e.g., AAPL, GOOGL"
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          Enter the stock ticker symbol (e.g., AAPL for Apple
                          Inc.)
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Label htmlFor="spot-price">
                              Underlying Spot Price
                            </Label>
                            <Input
                              id="spot-price"
                              type="number"
                              value={spotPrice}
                              onChange={(e) =>
                                setSpotPrice(Number(e.target.value))
                              }
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          Current price of the underlying asset
                        </TooltipContent>
                      </Tooltip>
                    )}

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Label htmlFor="strike-price">Strike Price</Label>
                          <Input
                            id="strike-price"
                            type="number"
                            value={strikePrice}
                            onChange={(e) =>
                              setStrikePrice(Number(e.target.value))
                            }
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        The price at which the option can be exercised
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Label htmlFor="maturity-date">Maturity Date</Label>
                          <Calendar
                            mode="single"
                            id="maturity-date"
                            selected={maturityDate}
                            onSelect={setMaturityDate}
                            className="rounded-md border"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        The expiration date of the option
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Label htmlFor="risk-free-rate">Risk-Free Rate</Label>
                          <Input
                            id="risk-free-rate"
                            type="number"
                            value={riskFreeRate}
                            onChange={(e) =>
                              setRiskFreeRate(Number(e.target.value))
                            }
                            step="0.01"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        The theoretical rate of return of an investment with
                        zero risk
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Label htmlFor="volatility">
                            Volatility (Sigma): {volatility}%
                          </Label>
                          <Slider
                            id="volatility"
                            min={0}
                            max={100}
                            step={1}
                            value={[volatility]}
                            onValueChange={(value) => setVolatility(value[0])}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        A measure of the amount of uncertainty or risk about the
                        size of changes in an asset's value
                      </TooltipContent>
                    </Tooltip>

                    <Button className="w-full">Calculate</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Call Option Price: $10.50</p>
                    <p>Put Option Price: $5.25</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Option Price vs. Stock Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dummyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="call"
                        stroke="#8884d8"
                        name="Call Option"
                      />
                      <Line
                        type="monotone"
                        dataKey="put"
                        stroke="#82ca9d"
                        name="Put Option"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Option Greeks vs. Stock Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dummyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="delta"
                        stroke="#8884d8"
                        name="Delta"
                      />
                      <Line
                        type="monotone"
                        dataKey="gamma"
                        stroke="#82ca9d"
                        name="Gamma"
                      />
                      <Line
                        type="monotone"
                        dataKey="theta"
                        stroke="#ffc658"
                        name="Theta"
                      />
                      <Line
                        type="monotone"
                        dataKey="vega"
                        stroke="#ff7300"
                        name="Vega"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Option Price vs. Days to Maturity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dummyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="call"
                        stroke="#8884d8"
                        name="Call Option"
                      />
                      <Line
                        type="monotone"
                        dataKey="put"
                        stroke="#82ca9d"
                        name="Put Option"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monte Carlo Simulation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dummyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="call"
                        stroke="#8884d8"
                        name="Stock Price"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
