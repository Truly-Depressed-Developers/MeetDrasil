import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
}

export function CustomDatePicker({ selected, onChange, placeholderText }: DatePickerProps) {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      placeholderText={placeholderText || "Wybierz datę"}
      className="w-full rounded-md border border-gray-300 bg-black p-2"
      showTimeSelect
      timeIntervals={15}
    />
  );
}
