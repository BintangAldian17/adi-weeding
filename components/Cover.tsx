"use client";

import Image from "next/image";
import { useState } from "react";

export default function Cover({
  onOpen,
  guestName,
}: {
  onOpen: () => void;
  guestName: string;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    setTimeout(() => onOpen(), 1000);
  };

  return (
    <section className="fixed inset-0 z-[9999] min-h-screen overflow-hidden  text-text-gold ">
      {/* =========================
          GROUP ATAS (50%)
      ========================= */}
      <div
        className={`absolute inset-x-0 top-0 z-40 h-[59%] md:h-[61%]
        transition-transform duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)]
        ${open ? "-translate-y-[130%]" : "translate-y-0"}`}
      >
        {/* MOBILE */}
        <Image
          src="/cover-up.svg"
          alt="envelope top mobile"
          fill
          priority
          className="object-cover object-bottom md:hidden"
        />

        {/* DESKTOP */}
        <Image
          src="/cover-up-2.svg"
          alt="envelope top desktop"
          fill
          priority
          className="hidden object-cover object-bottom md:block"
        />

        {/* CONTENT */}
        <div className="absolute z-40 flex h-full w-full flex-col items-center justify-center gap-5 xl:gap-6">
          <p className="font-eb-garamond text-xs uppercase tracking-widest md:text-xl">
            the wedding of
          </p>

          <h1 className="space-x-5 xl:space-x-[50px] leading-none">
            <span className="font-alex-brush text-[40px] xl:text-[80px]">
              Devi
            </span>
            <span className="font-alegreya text-2xl font-thin xl:text-[64px]">
              &
            </span>
            <span className="font-alex-brush text-[40px] xl:text-[80px]">
              Adi
            </span>
          </h1>

          <div className="flex flex-col items-center gap-2 md:gap-4">
            <Image
              src="/images/mini-frame.webp"
              alt="frame"
              width={195}
              height={16}
              className="w-[135px] md:w-[195px]"
            />

            <time dateTime="2026-05-31" className="md:text-2xl">
              31 Mei 2026
            </time>

            <Image
              src="/images/mini-frame.webp"
              alt="frame"
              width={195}
              height={16}
              className="w-[135px] rotate-180 md:w-[195px]"
            />
          </div>
        </div>

        {/* COIN */}
        <Image
          src="/images/coin.webp"
          alt="coin"
          width={1024}
          height={904}
          className="
            absolute left-1/2 bottom-0 z-50
            -translate-x-1/2 translate-y-1/2
            h-auto w-[200px] md:w-[250px] xl:w-[300px]
          "
        />
      </div>

      {/* =========================
          GROUP BAWAH (50%)
      ========================= */}
      <div
        className={`absolute inset-x-0 bottom-0 z-30 h-[90%]  md:h-full xl:h-[115%] overflow-hidden
        transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)]
        ${open ? "translate-y-full" : "translate-y-0"}`}
      >
        {/* MOBILE */}
        <Image
          src="/cover-bottom.svg"
          alt="envelope bottom mobile"
          fill
          priority
          className="object-cover object-top md:hidden"
        />

        {/* DESKTOP */}
        <Image
          src="/cover-bottom-stable-2.svg"
          alt="envelope bottom desktop"
          fill
          priority
          className="hidden object-cover object-top md:block"
        />

        {/* CONTENT */}
        <div className="absolute inset-0 md:translate-y-1/3 translate-y-[20%] z-40 flex items-center justify-center">
          <div className="flex flex-col items-center xl:gap-6 gap-2">
            <p className="text-[10px] uppercase tracking-wide md:text-lg">
              Dear,
            </p>

            <div className="flex flex-col items-center justify-center">
              <h2 className="mb-4 text-lg md:text-[32px] leading-none text-center">
                {guestName}
              </h2>

              <Image
                src="/images/mini-frame.webp"
                alt="frame"
                width={195}
                height={16}
                className="w-[135px] md:w-[195px] rotate-x-180"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CLICK AREA */}
      <button
        onClick={handleClick}
        className="absolute inset-0 z-[60] w-full h-full "
        aria-label="Open invitation"
      />
    </section>
  );
}
