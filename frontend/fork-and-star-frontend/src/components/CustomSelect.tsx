"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[]; // "All" should be included at the top only ONCE
  placeholder: string;
};

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: CustomSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className="relative inline-flex items-center justify-between rounded-xl border border-yellow-500 bg-black/30 px-4 py-2 text-sm font-semibold text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)] backdrop-blur-md transition-all duration-500 hover:bg-gradient-to-r hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <span className="relative z-10">
          <Select.Value placeholder={placeholder} />
        </span>
        <Select.Icon className="relative z-10">
          <ChevronDown className="ml-2 h-4 w-4" />
        </Select.Icon>
        <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 opacity-0 rounded-xl transition-opacity duration-500 hover:opacity-20 blur-md"></span>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="z-50 mt-2 overflow-hidden rounded-xl bg-black/80 backdrop-blur-xl border border-yellow-500 shadow-2xl"
          position="popper"
        >
          <Select.Viewport className="p-1">
            {options.map((opt) => (
              <Select.Item
                key={opt}
                value={opt}
                className="relative flex cursor-pointer select-none items-center rounded px-4 py-2 text-sm text-yellow-400 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 hover:text-black transition-all duration-300"
              >
                <Select.ItemText>{opt}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2">
                  <Check className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}