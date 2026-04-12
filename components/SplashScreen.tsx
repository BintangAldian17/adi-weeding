"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const PRELOAD_IMAGES = [
  "/emvelop.svg",
  "/images/bg-accent2.png",
  "/images/hero2.png",
  "/images/side-frame.png",
  "/images/accent-flower.png",
  "/images/accent-flower2.png",
  "/images/accent-flower3.png",
  "/images/mini-frame.png",
  "/images/coin.png",
];

export default function SplashScreen({ onReady }: { onReady: () => void }) {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const total = PRELOAD_IMAGES.length;

    const onEach = () => {
      loaded++;
      setProgress(Math.round((loaded / total) * 100));
      if (loaded >= total) {
        // Tunggu sebentar di 100% agar user sempat lihat
        setTimeout(() => {
          setHiding(true);
          setTimeout(onReady, 800); // sesuai durasi fade out
        }, 400);
      }
    };

    PRELOAD_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.onload = onEach;
      img.onerror = onEach; // tetap lanjut walau error
      img.src = src;
    });
  }, [onReady]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#620B1A]
      transition-opacity duration-700 ease-in-out
      ${hiding ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center gap-8">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={43}
          height={41}
          className="w-[43px] h-auto animate-pulse"
          priority
        />

        <div className="flex flex-col items-center gap-3">
          <p className="font-eb-garamond text-xs tracking-widest uppercase text-text-gold opacity-70">
            Loading
          </p>

          {/* Progress bar */}
          <div className="w-[160px] h-[1px] bg-text-gold/20 overflow-hidden rounded-full">
            <div
              className="h-full bg-text-gold transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="font-alegreya text-text-gold/50 text-sm tabular-nums">
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
