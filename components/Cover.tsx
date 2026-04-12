"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Cover({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false);
  const [tipY, setTipY] = useState({ top: 55, bottom: 45 }); // dalam vh

  useEffect(() => {
    const calculate = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const flapH = vh * 0.55;

      let tipTopPx: number;
      let tipBottomPx: number;

      if (vw >= 1280) {
        // xl: SVG width=100%, height=auto → rendered height = vw * (575/1440)
        const svgRenderedH = vw * (575 / 1440);
        // Flap atas: rotate-180, absolute bottom-0 → puncak dari top layar:
        tipTopPx = flapH - svgRenderedH;
        // tapi kalau SVG lebih tinggi dari flapH, puncak terpotong → pakai 0
        tipTopPx = Math.max(0, tipTopPx);

        // Flap bawah: absolute top-0 → puncak dari top layar:
        tipBottomPx = vh - flapH + svgRenderedH;
        // kalau melewati batas bawah, clamp
        tipBottomPx = Math.min(vh, tipBottomPx);
      } else {
        // mobile: object-cover, puncak selalu di batas flap
        tipTopPx = flapH;
        tipBottomPx = vh - flapH;
      }

      setTipY({
        top: (tipTopPx / vh) * 100,
        bottom: (tipBottomPx / vh) * 100,
      });
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  const handleClick = () => {
    setOpen(true);
    setTimeout(() => onOpen(), 1000);
  };

  return (
    <section className="fixed inset-0 z-[999] overflow-hidden bg-transparent h-screen max-h-screen">
      {/* GROUP ATAS */}
      <Image
        src="/images/bg-accent2.png"
        alt="envelope top"
        fill
        priority
        className="w-full h-full object-cover absolute inset-0 mix-blend-lighten"
      />
      <div
        className={`absolute inset-x-0 top-0 z-40 h-[55vh]
        transition-transform duration-2200 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${open ? "-translate-y-[130%]" : "translate-y-0"}`}
      >
        <div className="absolute inset-0 xl:hidden">
          <Image
            src="/emvelop.svg"
            alt="envelope top"
            fill
            priority
            className="rotate-180 object-cover object-bottom drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]"
          />
        </div>
        <div className="absolute inset-0 hidden xl:block">
          <Image
            src="/emvelop.svg"
            alt="envelope top"
            width={1440}
            height={575}
            priority
            className="absolute bottom-0 left-1/2 h-auto w-full max-w-none -translate-x-1/2 rotate-180 drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]"
          />
        </div>
        <div className="absolute w-full h-full z-20 flex flex-col items-center justify-center text-text-gold xl:gap-6 gap-5">
          <p className=" font-eb-garamond text-xs leading-none tracking-widest uppercase md:text-xl">
            the wedding of
          </p>
          <h1 className=" xl:space-x-[50px] space-x-5">
            <span className="font-alex-brush xl:text-[80px] text-[40px] leading-none">
              Devi
            </span>
            <span className="font-alegreya font-thin xl:text-[64px] text-2xl leading-none">
              &
            </span>
            <span className="font-alex-brush xl:text-[80px] text-[40px] leading-none">
              Adi
            </span>
          </h1>
          <div className="flex flex-col items-center justify-center gap-2 md:gap-4 ">
            <Image
              data-hero-anim
              src="/images/mini-frame.png"
              alt="mini-frame"
              width={195}
              height={16}
              className="h-auto w-[135px]   md:w-[195px]"
            />

            <time
              data-hero-anim
              dateTime="2026-05-31"
              className="  md:text-2xl"
            >
              31 Mei 2026
            </time>

            <Image
              data-hero-anim
              src="/images/mini-frame.png"
              alt="mini-frame"
              width={195}
              height={16}
              className="h-auto w-[135px]  rotate-180  md:w-[195px]"
            />
          </div>
        </div>

        <Image
          src="/images/coin.png"
          alt="gift coin"
          width={207}
          height={198}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2"
        />
      </div>

      {/* GROUP BAWAH */}
      <div
        className={`absolute inset-0 z-30
        transition-transform duration-2000 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${open ? "translate-y-full" : "translate-y-0"}`}
      >
        {/* SEGITIGA KIRI */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `polygon(0 0, 0 100%, 50% ${tipY.bottom}%, 50% ${tipY.top}%)`,
            backgroundColor: "#620B1A",
          }}
        />

        {/* SEGITIGA KANAN */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `polygon(100% 0, 100% 100%, 50% ${tipY.bottom}%, 50% ${tipY.top}%)`,
            backgroundColor: "#620B1A",
          }}
        />

        {/* FLAP BAWAH */}
        <div className="absolute inset-x-0 bottom-0 h-[55vh] overflow-hidden">
          <div className="absolute inset-0 xl:hidden">
            <Image
              src="/emvelop.svg"
              alt="envelope bottom"
              fill
              className="object-cover object-top drop-shadow-[0_-8px_12px_rgba(0,0,0,0.25)]"
            />
          </div>
          <div className="absolute inset-0 hidden xl:block">
            <Image
              src="/emvelop.svg"
              alt="envelope bottom"
              width={1440}
              height={575}
              className="absolute top-0 left-1/2 h-auto w-full max-w-none -translate-x-1/2 drop-shadow-[0_-8px_12px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleClick}
        className="absolute inset-0 z-[60]"
        aria-label="Open invitation"
      />
    </section>
  );
}
