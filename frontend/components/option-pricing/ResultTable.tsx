"use client";

import React from "react";

interface ResultTableProps {
  callPrice: number | undefined;
  putPrice: number | undefined;
  volatility: string | number | undefined;
  cmp: number | undefined;
  currency: string | undefined;
}

const ResultTable: React.FC<ResultTableProps> = ({
  callPrice,
  putPrice,
  volatility,
  cmp,
  currency,
}) => {
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Metric</th>
              <th className="px-4 py-2 border border-gray-300">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">
                Call Option Price
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {currency} {callPrice}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">
                Put Option Price
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {currency} {putPrice}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">
                Current Market Price
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {currency} {cmp}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">
                Calculated Volatility
              </td>
              <td className="px-4 py-2 border border-gray-300">{volatility}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;
