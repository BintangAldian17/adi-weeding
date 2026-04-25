import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";

export default function EnvelopeMessage({
  message,
  from,
  size = "md",
  present = false,
}: {
  message?: string;
  from?: string;
  size?: "md" | "xl";
  present?: boolean;
}) {
  const sizeMap = {
    md: {
      envelopSize: "w-[309px] h-[338px]",
      messageSize: " w-[250px] h-[99px] top-7",
    },
    xl: {
      envelopSize: "xl:w-[411px] xl:h-[455px]  w-[309px] h-[338px]",
      messageSize: "xl:h-[150px] xl:w-[340px]  w-[250px] h-[99px] top-10 ",
    },
  };
  return (
    <div className="relative">
      <Image
        src="/images/envelope-message.png"
        alt="Gallery"
        width={411}
        height={455}
        className={cn(sizeMap[size].envelopSize)}
      />
      {message && (
        <p
          className={cn(
            "absolute left-1/2 -translate-x-1/2 overflow-hidden whitespace-pre-wrap break-words text-sm leading-6 text-[#121212] [overflow-wrap:anywhere] leading-4",
            sizeMap[size].messageSize,
          )}
        >
          {message}
        </p>
      )}
      {from && (
        <span className="absolute bottom-6 left-4 text-secondary text-xs">
          From: {from} {present ? "(Hadir)" : "(Tidak Hadir)"}
        </span>
      )}
    </div>
  );
}
