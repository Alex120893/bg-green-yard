"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import styles from "./WinterMaintenance.module.css";

export function WinterVideo({ locale, poster }: { locale: Locale; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const bg = locale === "bg";

  useEffect(() => {
    const video = videoRef.current;
    if (video && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Browsers may decline autoplay; the play button remains available.
      void video.play().catch(() => {});
    }
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  }

  return (
    <>
      <video
        ref={videoRef}
        id="winter-maintenance-video"
        className={styles.video}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={bg ? "Видео от зимната поддръжка на BG GREEN YARD" : "BG GREEN YARD winter maintenance video"}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src="/video_2026-11-14_17-19-55.mp4" type="video/mp4" />
        {bg ? "Вашият браузър не поддържа видео." : "Your browser does not support video."}
      </video>
      <button type="button" className={styles.videoControl} onClick={togglePlayback} aria-controls="winter-maintenance-video">
        {playing ? (bg ? "Пауза" : "Pause") : (bg ? "Пусни видеото" : "Play video")}
      </button>
    </>
  );
}
