"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Helper untuk generate Next.js image URL
function nextImageUrl(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

const PRELOAD_ASSETS: string[] = [
  nextImageUrl("/emvelop.svg", 1440),
  nextImageUrl("/images/bg-accent2.png", 1920),
  nextImageUrl("/images/hero2.png", 1920),
  nextImageUrl("/images/side-frame.png", 828),
  nextImageUrl("/images/accent-flower.png", 828),
  nextImageUrl("/images/accent-flower2.png", 828),
  nextImageUrl("/images/accent-flower3.png", 828),
  nextImageUrl("/images/mini-frame.png", 828),
  nextImageUrl("/images/coin.png", 828),
  nextImageUrl("/images/logo.png", 96),
  nextImageUrl("/images/gallery1.jpg", 828),
  nextImageUrl("/images/gallery2.jpg", 828),
  nextImageUrl("/images/gallery3.jpg", 828),
  nextImageUrl("/images/gallery4.jpg", 828),
  nextImageUrl("/images/gallery5.jpg", 828),
  nextImageUrl("/images/gallery6.jpg", 828),
  nextImageUrl("/images/amplop-gift.png", 828),
  nextImageUrl("/images/frame-social.png", 828),
  nextImageUrl("/images/groom-couple.png", 828),
  nextImageUrl("/images/bride-couple.png", 828),
];

async function preloadAsset(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // tetap lanjut walau error
    img.src = src;
  });
}

export default function SplashScreen({ onReady }: { onReady: () => void }) {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const total = PRELOAD_ASSETS.length;

    const run = async () => {
      await Promise.all(
        PRELOAD_ASSETS.map((src) =>
          preloadAsset(src).then(() => {
            loaded++;
            setProgress(Math.round((loaded / total) * 100));
          }),
        ),
      );

      // Tunggu fonts
      try {
        await document.fonts.ready;
      } catch {
        // ignore
      }

      setProgress(100);
      await new Promise((r) => setTimeout(r, 400));
      setHiding(true);
      await new Promise((r) => setTimeout(r, 700));
      onReady();
    };

    run();
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
