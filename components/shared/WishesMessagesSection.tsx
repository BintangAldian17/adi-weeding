"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import type { WishItem } from "@/lib/actions/getWishes";
import EnvelopeMessage from "./EnvelopeMessage";

type PaginationItem =
  | { type: "control"; control: "first" | "prev" | "next" | "last" }
  | { type: "page"; page: number; active: boolean }
  | { type: "ellipsis"; key: string };

const CONTROL_ICONS = {
  first: "mdi:chevron-double-left",
  prev: "mdi:chevron-left",
  next: "mdi:chevron-right",
  last: "mdi:chevron-double-right",
} as const;

type WishesMessagesSectionProps = {
  wishes: WishItem[];
  totalPages: number;
  paginationItems: PaginationItem[];
  currentPage: number;
  onPaginationClick: (item: PaginationItem) => void;
};

export default function WishesMessagesSection({
  wishes,
  totalPages,
  paginationItems,
  currentPage,
  onPaginationClick,
}: WishesMessagesSectionProps) {
  if (wishes.length === 0) {
    return null;
  }

  return (
    <div className="relative h-full w-full bg-secondary">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/bg-accent2.webp')",
          backgroundPosition: "top center",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
          mixBlendMode: "multiply",
        }}
      />
      <Image
        data-wishes-list-anim
        src="/images/ornamet-wishes.webp"
        alt="Gallery"
        width={375}
        height={678}
        className="absolute bottom-0 -left-18 hidden -rotate-20 xl:block xl:h-[443px] xl:w-[246px]"
      />
      <Image
        data-wishes-list-anim
        src="/images/ornamet-wishes.webp"
        alt="Gallery"
        width={375}
        height={678}
        className="absolute bottom-0 -right-36 hidden -rotate-20 xl:block xl:h-[443px] xl:w-[246px] rotate-x-180"
      />
      <div className="flex flex-col items-center justify-center gap-10 py-10 xl:gap-[100px] xl:px-11 xl:py-[100px]">
        <div className="grid h-full w-full grid-cols-1 place-items-center gap-9 md:px-10 px-4 py-10 md:grid-cols-2 xl:grid-cols-4">
          {wishes.map((wish) => (
            <div key={wish.id} data-wishes-card>
              <EnvelopeMessage
                message={wish.message}
                from={wish.name}
                present={wish.present}
              />
            </div>
          ))}
        </div>
        {totalPages > 1 ? (
          <div
            data-wishes-list-anim
            className="relative z-10 flex items-center justify-center gap-2"
          >
            {paginationItems.map((item, index) => {
              const disabled =
                item.type === "ellipsis" ||
                (item.type === "control" &&
                  (((item.control === "first" || item.control === "prev") &&
                    currentPage === 1) ||
                    ((item.control === "next" || item.control === "last") &&
                      currentPage === totalPages)));

              return (
                <button
                  key={
                    item.type === "ellipsis"
                      ? `${item.type}-${item.key}-${index}`
                      : item.type === "page"
                        ? `${item.type}-${item.page}`
                        : `${item.type}-${item.control}`
                  }
                  type="button"
                  disabled={disabled}
                  onClick={() => onPaginationClick(item)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-[10px] text-sm font-semibold transition-opacity",
                    item.type === "page" &&
                      item.active &&
                      "bg-[#6C0F28] text-white shadow-[0_4px_12px_rgba(108,15,40,0.22)]",
                    item.type === "ellipsis" && "bg-white text-[#7B6E5B]",
                    item.type !== "ellipsis" &&
                      !(item.type === "page" && item.active) &&
                      "bg-white text-black shadow-[0_4px_12px_rgba(92,77,59,0.12)]",
                    disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  {item.type === "control" ? (
                    <Icon
                      icon={CONTROL_ICONS[item.control]}
                      className="h-4 w-4"
                    />
                  ) : item.type === "page" ? (
                    item.page
                  ) : (
                    "..."
                  )}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
