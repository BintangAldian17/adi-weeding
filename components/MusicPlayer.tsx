"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

interface MusicPlayerProps {
  isPlaying: boolean; // State dari parent (Wrapper)
}

export default function MusicPlayer({
  isPlaying: initialPlayState,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Autoplay dicegah browser, perlu interaksi user:", error);
          setIsPlaying(false);
        });
    }
  };

  useEffect(() => {
    if (initialPlayState) {
      playMusic();
    }
  }, [initialPlayState]);

  // 2. Fungsi Play/Pause manual
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed lg:bottom-6 lg:right-6 md:bottom-4 md:right-4 bottom-2 right-2 z-50 p-safe">
      {/* Element Audio Tersembunyi */}
      <audio ref={audioRef} src="/audio/music1.mp3" loop />

      {/* Tombol Floating */}
      <button
        onClick={toggleMusic}
        className={` cursor-pointer
          lg:size-12 md:size-10 size-8 rounded-full flex items-center justify-center 
          bg-[#D19B22]/80 backdrop-blur-md border border-white/20 shadow-lg text-white
          transition-all duration-300 ease-in-out
          ${isPlaying ? "animate-spin-slow" : ""}
        `}
        aria-label="Toggle Music"
      >
        {isPlaying ? (
          <Icon
            icon="solar:music-note-2-bold"
            className="lg:size-6 md:size-5 size-4"
          />
        ) : (
          <Icon
            icon="solar:music-note-slider-bold-duotone"
            className="lg:size-6 md:size-5 size-4"
          />
        )}
      </button>
    </div>
  );
}
