"use client";

import { useCallback, useEffect, useState } from "react";
import type { WishItem } from "@/lib/actions/getWishes";
import Cover from "@/components/Cover";
import Wrapper from "@/components/Wrapper";
import { OpenContext } from "@/context/OpeningContext";
import { ScrollTrigger } from "gsap/all";
import SplashScreen from "./SplashScreen";
import MusicPlayer from "./MusicPlayer";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function Opening({
  guestName,
  guestId,
  initialWishes,
  initialPage,
  totalPages,
  totalWishes,
}: {
  guestName: string;
  guestId: string;
  initialWishes: WishItem[];
  initialPage: number;
  totalPages: number;
  totalWishes: number;
}) {
  useScrollToTop();

  const [splashDone, setSplashDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  const handleSplashReady = useCallback(() => {
    setSplashDone(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setShouldPlayMusic(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);
  }, []);

  return (
    <>
      {!splashDone && <SplashScreen onReady={handleSplashReady} />}

      {splashDone && !isOpen && (
        <Cover guestName={guestName} onOpen={handleOpen} />
      )}

      <OpenContext.Provider value={isOpen}>
        <div
          className={`transition-opacity duration-700 ${
            splashDone
              ? "opacity-100"
              : "opacity-0 pointer-events-none overflow-hidden h-screen max-h-screen"
          }`}
        >
          <Wrapper
            guestId={guestId}
            initialWishes={initialWishes}
            initialPage={initialPage}
            totalPages={totalPages}
            totalWishes={totalWishes}
          />
        </div>
      </OpenContext.Provider>
      {isOpen && <MusicPlayer isPlaying={shouldPlayMusic} />}
    </>
  );
}
