"use client"

import React, {useState} from "react"
import { format, isBefore } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface dateProps{
    date : Date | undefined;
    setDate : (value: any) => void;
    id? : string | undefined;
    error? : string | undefined;
    onlyFutureDates? : boolean;
}

export function DatePicker({date, setDate, id, error = '', onlyFutureDates = false}:dateProps) {
  
  const [errorMessage, setErrorMessage] = useState(''); 
  
  const isPastDate = (date : Date) => {
    const today = new Date();
    return isBefore(date, today);
  };

  const handleOnSelect = (date : Date | undefined) => {
    if (date === undefined){
      return;
    }
    if (!isPastDate(date)){
      setDate(date);
      setErrorMessage('')
    }
    else {
      setDate(undefined)
      setErrorMessage(error);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          id={id}
          selected={date}
          onSelect={(date) => {
            onlyFutureDates ? handleOnSelect(date) : setDate(date)
          }}
          initialFocus
        />
      </PopoverContent>
      {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}

    </Popover>
  )
}
