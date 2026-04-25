"use client";

import Image from "next/image";
import React from "react";
import { cn } from "@/utils/cn";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "relative flex h-[53px] w-[185px] items-center justify-center text-secondary outline-none text-sm",
        className,
      )}
      {...props}
    >
      <Image
        src="/images/button-frame.png"
        alt=""
        fill
        aria-hidden="true"
        className="object-contain"
      />
      <span className="relative z-10  leading-none -translate-y-0.5">
        {children}
      </span>
    </button>
  );
}
