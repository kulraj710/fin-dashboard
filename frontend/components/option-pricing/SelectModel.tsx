"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectModelProps {
  model: string;
  setModel: (value: string) => void;
}

const SelectModel: React.FC<SelectModelProps> = ({ model, setModel }) => {
  return (
    <Select value={model} onValueChange={setModel}>
      <SelectTrigger>
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="black-scholes">Black-Scholes</SelectItem>
        <SelectItem value="monte-carlo">Monte Carlo</SelectItem>
        <SelectItem value="binomial" disabled>Binomial</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectModel;
