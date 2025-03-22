import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";
import { DayPicker, useNavigation } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Locale } from "date-fns";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

type CustomCaptionProps = {
  displayMonth: Date;
  locale?: Locale;
  onClick?: () => void;
  displayIndex?: number;
  id?: string;
};

function CustomCaption({ displayMonth, locale }: CustomCaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const currentYear = displayMonth.getFullYear();
  const currentMonth = displayMonth.getMonth();
  
  // Generate years for dropdown (100 years back and 20 years forward)
  const currentDate = new Date();
  const currentDateYear = currentDate.getFullYear();
  const startYear = currentDateYear - 100;
  const endYear = currentDateYear + 20;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  
  // Month names
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleYearChange = (year: string) => {
    const newDate = new Date(displayMonth);
    newDate.setFullYear(parseInt(year));
    goToMonth(newDate);
  };

  const handleMonthChange = (month: string) => {
    const newDate = new Date(displayMonth);
    newDate.setMonth(months.indexOf(month));
    goToMonth(newDate);
  };

  return (
    <div className="flex justify-center items-center gap-1">
      <div className="flex-1">
        <Select value={months[currentMonth]} onValueChange={handleMonthChange}>
          <SelectTrigger className="h-7 text-xs">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month} className="text-xs">
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <Select value={currentYear.toString()} onValueChange={handleYearChange}>
          <SelectTrigger className="h-7 text-xs">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()} className="text-xs">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        Caption: CustomCaption
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
