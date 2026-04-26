import React from "react";
import { cn } from "@/utils/cn";

export type InputProps = React.ComponentProps<"input">;

export default function Input({
  className,
  style,
  type = "text",
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "h-[37px] w-full border-x-[18px] border-y-[2px] border-transparent bg-transparent px-3 text-sm text-secondary outline-none placeholder:text-secondary/75",
        className,
      )}
      style={{
        borderStyle: "solid",
        borderImageSource: "url('/images/input-frame-2.webp')",
        borderImageSlice: "2 18 fill",
        borderImageWidth: "2 18",
        borderImageRepeat: "stretch",
        ...style,
      }}
      {...props}
    />
  );
}
