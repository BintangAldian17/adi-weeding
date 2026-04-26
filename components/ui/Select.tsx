"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  name?: string;
  placeholder?: string;
  options: SelectOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export default function Select({
  name,
  placeholder = "Pilih",
  options,
  defaultValue,
  value: valueProp,
  onValueChange,
  className,
}: SelectProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const value = valueProp ?? internalValue;

  const selectedOption = options.find((option) => option.value === value);
  const displayLabel = selectedOption?.label ?? placeholder;

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("relative w-full px-4 z-20", className)}>
      {name ? <input type="hidden" name={name} value={value} /> : null}

      <Image
        src="/images/ornament-input.webp"
        alt=""
        width={19}
        height={26}
        aria-hidden="true"
        className="pointer-events-none absolute top-[18px] -left-1 z-10 -translate-y-1/2"
      />
      <Image
        src="/images/ornament-input.webp"
        alt=""
        width={19}
        height={26}
        aria-hidden="true"
        className="pointer-events-none absolute top-[18px] -right-1 z-10 -translate-y-1/2 rotate-y-180"
      />

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-[37px] w-full items-center justify-between rounded-[5px] border border-secondary bg-transparent px-3 text-left text-sm text-secondary outline-none"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{displayLabel}</span>
        <svg
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            !isOpen && "rotate-180",
          )}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4 10L8 6L12 10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen ? (
        <div className="absolute inset-x-4 top-[38px] z-20 overflow-hidden rounded-[10px] bg-white p-2 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
          <ul role="listbox" className="flex flex-col gap-1">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      if (valueProp === undefined) {
                        setInternalValue(option.value);
                      }
                      onValueChange?.(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex w-full rounded-[12px] px-4 py-3 text-left text-[15px] transition-colors",
                      isSelected ? "bg-[#AD9A76] text-white" : "text-[#3D2C20]",
                    )}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
