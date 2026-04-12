"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

interface MusicPlayerProps {
  isPlaying: boolean;
}

const songs = ["/audio/gunslinger.mp3", "/audio/little-piece-of-heaven.mp3"];

export default function MusicPlayer({
  isPlaying: initialPlayState,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [selectedSong] = useState(() => {
    return songs[Math.floor(Math.random() * songs.length)];
  });

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    if (initialPlayState) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [initialPlayState]);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Gagal memutar audio:", error);
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="fixed lg:bottom-6 lg:right-6 md:bottom-4 md:right-4 bottom-2 right-2 z-50 p-safe">
      {/* Audio */}
      <audio ref={audioRef} src={selectedSong} loop />

      {/* Button */}
      <button
        onClick={toggleMusic}
        className={`cursor-pointer
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
