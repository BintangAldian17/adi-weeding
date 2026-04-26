"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Helper untuk generate Next.js image URL
function nextImageUrl(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

const PRELOAD_ASSETS: string[] = [
  nextImageUrl("/cover-up.svg", 1440),
  nextImageUrl("/cover-up-2.svg", 1920),
  nextImageUrl("/cover-bottom.svg", 1440),
  nextImageUrl("/cover-bottom-stable.svg", 1440),
  nextImageUrl("/cover-bottom-stable-2.svg", 1920),
  nextImageUrl("/images/mini-frame.webp", 828),
  nextImageUrl("/images/coin.webp", 828),
  nextImageUrl("/images/logo.webp", 96),
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
    let mounted = true;
    let rafId = 0;
    let visualProgress = 0;
    let targetProgress = 8;

    const animateProgress = () => {
      if (!mounted) return;

      visualProgress += (targetProgress - visualProgress) * 0.12;

      if (Math.abs(targetProgress - visualProgress) < 0.4) {
        visualProgress = targetProgress;
      }

      setProgress(Math.round(visualProgress));
      rafId = window.requestAnimationFrame(animateProgress);
    };

    const run = async () => {
      animateProgress();

      await Promise.all(
        PRELOAD_ASSETS.map((src) =>
          preloadAsset(src).then(() => {
            loaded++;
            targetProgress = Math.min(
              92,
              Math.round((loaded / total) * 100),
            );
          }),
        ),
      );

      try {
        await document.fonts.ready;
      } catch {
        // ignore font loading failure
      }

      targetProgress = 100;
      await new Promise((r) => setTimeout(r, 400));
      setHiding(true);
      await new Promise((r) => setTimeout(r, 700));
      onReady();
    };

    run();

    return () => {
      mounted = false;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [onReady]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#620B1A]
      transition-opacity duration-700 ease-in-out
      ${hiding ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center gap-8">
        <Image
          src="/images/logo.webp"
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
