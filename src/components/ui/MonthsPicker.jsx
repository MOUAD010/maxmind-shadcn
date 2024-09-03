"use client";

import React, { useState } from "react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function MonthsPicker({ selectedDate, onDateChange }) {
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleMonthSelect = (month) => {
    onDateChange(new Date(currentYear, month));
  };

  const handleYearChange = (change) => {
    setCurrentYear((prev) => prev + change);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[215px] justify-start text-left font-normal",
            "border-input bg-background hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleYearChange(-1)}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div className="font-semibold">{currentYear}</div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleYearChange(1)}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => (
              <Button
                key={month}
                variant="outline"
                className={cn(
                  "h-9",
                  selectedDate.getMonth() === index &&
                    selectedDate.getFullYear() === currentYear
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => handleMonthSelect(index)}
              >
                {month}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
