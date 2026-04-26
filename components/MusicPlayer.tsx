"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";

interface MusicPlayerProps {
  isPlaying: boolean;
}

const TARGET_VOLUME = 0.6;
const START_VOLUME = 0.08;
const FADE_DURATION = 5000;

export default function MusicPlayer({
  isPlaying: initialPlayState,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeFrameRef = useRef<number | null>(null);

  const stopFade = useCallback(() => {
    if (fadeFrameRef.current !== null) {
      cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }
  }, []);

  const fadeInAudio = useCallback(
    (duration = FADE_DURATION) => {
      const audio = audioRef.current;
      if (!audio) return;

      stopFade();
      audio.volume = START_VOLUME;

      audio
        .play()
        .then(() => {
          setIsPlaying(true);

          const start = performance.now();

          const updateVolume = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            audio.volume =
              START_VOLUME + (TARGET_VOLUME - START_VOLUME) * progress;

            if (progress < 1) {
              fadeFrameRef.current = requestAnimationFrame(updateVolume);
            } else {
              audio.volume = TARGET_VOLUME;
              fadeFrameRef.current = null;
            }
          };

          fadeFrameRef.current = requestAnimationFrame(updateVolume);
        })
        .catch((error) => {
          console.log("Play gagal:", error);
          setIsPlaying(false);
        });
    },
    [stopFade],
  );

  const playMusic = useCallback(() => {
    fadeInAudio();
  }, [fadeInAudio]);

  useEffect(() => {
    if (initialPlayState) {
      playMusic();
    }
  }, [initialPlayState, playMusic]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      stopFade();
      audio.pause();
      setIsPlaying(false);
    } else {
      fadeInAudio();
    }
  };

  useEffect(() => {
    return () => {
      stopFade();
    };
  }, [stopFade]);

  return (
    <div className="fixed lg:bottom-6 lg:right-6 md:bottom-4 md:right-4 bottom-2 right-2 z-50 p-safe">
      <audio ref={audioRef} src="/audio/music1.mp3" loop playsInline />

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
