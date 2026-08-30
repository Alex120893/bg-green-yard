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
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
    } catch {
      if (isAutoplay) setAutoplayBlocked(true);
      setIsPlaying(false);
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
      setIsPlaying(false);
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
    if (!audio || pausedByUser.current) return;
    audio.volume = volume;
    void play(true);
  }, []);

  return (
    <aside className="fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-brand/20 bg-white/95 p-3 shadow-xl backdrop-blur-md md:bottom-6 md:left-6 md:w-auto md:min-w-[22rem]" aria-label="Radio Energy player">
      <audio ref={audioRef} src={streamUrl} preload="none" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
      <div className="flex items-center gap-3">
        <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-red-600" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold tracking-[0.16em] text-red-700">LIVE</p>
          <p className="truncate text-sm font-semibold text-foreground">Radio Energy</p>
        </div>
        <button type="button" onClick={togglePlayback} className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark" aria-label={isPlaying ? "Пауза на Radio Energy" : "Включи Radio Energy"}>
          {isPlaying ? "Пауза" : "▶ Включи"}
        </button>
      </div>
      <div className="mt-3 flex items-center gap-3 border-t border-black/5 pt-3">
        <button type="button" onClick={toggleMute} className="text-xs font-semibold text-brand-dark" aria-label={muted ? "Включи звука" : "Спри звука"}>
          {muted ? "Без звук" : "Звук"}
        </button>
        <input type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume} onChange={(event) => updateVolume(Number(event.target.value))} className="h-1.5 flex-1 accent-brand" aria-label="Сила на звука" />
      </div>
      {autoplayBlocked && !isPlaying && <p className="mt-2 text-xs text-muted">Браузърът изисква действие, за да включи радиото.</p>}
    </aside>
  );
}
