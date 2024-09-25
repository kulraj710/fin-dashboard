"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart3,
  LineChart,
  TrendingUp,
  Briefcase,
  Activity,
  GitBranch,
  Search,
  BellIcon,
  UserCircle,
  Github,
} from "lucide-react";
import Link from "next/link";

export function HomepageFooter() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Finance Dashboard
            </h1>
            <div className="flex items-center">
              <div className="relative mr-4">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-full"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <Button variant="ghost" size="icon" className="mr-2">
                <BellIcon className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/option-pricing">
            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Option analysis
                </CardTitle>
                <GitBranch className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Options Pricing</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  It could take upto 6 seconds to open
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Dashboard</CardTitle>
              <Briefcase className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Asset Allocation</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Track your investments and performance</p>
            </CardContent>
          </Card> */}
          <Link href="/rsi">
            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  RSI Analysis
                </CardTitle>
                <Activity className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Momentum Indicator</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Identify overbought and oversold conditions
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="https://github.com/kulraj710/stock-market-prediction" target="_blank">
            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Price Prediction
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Stock Price Prediction</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Uses recurrent neural network
                </p>
              </CardContent>
            </Card>
          </Link>
          {/* <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Overview</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Global Markets</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Stay updated with market indices and sectors</p>
            </CardContent>
          </Card> */}
          {/* <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Financial News</CardTitle>
              <LineChart className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Latest Updates</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Real-time news and market analysis</p>
            </CardContent>
          </Card> */}
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-md mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Financial Hub
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Visualize, analyze, and optimize financial data
              </p>
            </div>
            <div className="flex items-center">
              <Link href="https://github.com/kulraj710/fin-dashboard" className="border border-2 rounded p-2 dark:text-gray-200">
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
