"use client";

import { useEffect, useRef, useState } from "react";

const streamUrl =
  "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO_ENERGYAAC_H.aac";

export function RadioEnergyPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const pausedByUser = useRef(false);

  const play = async (isAutoplay = false) => {
    const audio = audioRef.current;
    if (!audio || pausedByUser.current) return;

    try {
      await audio.play();
      setAutoplayBlocked(false);
    } catch {
      if (isAutoplay) setAutoplayBlocked(true);
    }
  };

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      pausedByUser.current = false;
      void play();
    } else {
      pausedByUser.current = true;
      audio.pause();
    }
  };

  const updateVolume = (nextVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = nextVolume;
    audio.muted = false;
    setVolume(nextVolume);
    setMuted(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    void play(true);
  }, []);

  return (
    <div className="flex items-center gap-2 text-white" aria-label="Radio Energy player">
      <audio
        ref={audioRef}
        src={streamUrl}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" aria-hidden />
      <span className="text-[10px] font-bold tracking-[0.12em] text-white/90">LIVE</span>
      <span className="hidden text-xs font-semibold sm:inline">Radio Energy</span>
      <button
        type="button"
        onClick={togglePlayback}
        className="inline-flex h-7 items-center justify-center rounded-full bg-white px-2.5 text-xs font-bold text-brand-dark transition-colors hover:bg-brand-soft"
        aria-label={isPlaying ? "Пауза на Radio Energy" : "Включи Radio Energy"}
      >
        {isPlaying ? "Пауза" : "▶ Включи"}
      </button>
      <button
        type="button"
        onClick={toggleMute}
        className="hidden text-[11px] font-semibold text-white/85 hover:text-white sm:inline"
        aria-label={muted ? "Включи звука" : "Спри звука"}
      >
        {muted ? "Без звук" : "Звук"}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={muted ? 0 : volume}
        onChange={(event) => updateVolume(Number(event.target.value))}
        className="hidden h-1 w-16 accent-white sm:block"
        aria-label="Сила на звука"
      />
      {autoplayBlocked && !isPlaying && <span className="hidden text-[10px] text-white/70 lg:inline">Натиснете Включи</span>}
    </div>
  );
}
