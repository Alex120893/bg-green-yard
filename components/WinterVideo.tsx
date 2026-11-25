"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import styles from "./WinterMaintenance.module.css";

export function WinterVideo({ locale, poster }: { locale: Locale; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bg = locale === "bg";

  useEffect(() => {
    const video = videoRef.current;
    if (video && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // If autoplay is blocked, keep the poster visible.
      void video.play().catch(() => {});
    }
  }, []);

  return (
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
    >
      <source src="/video_2026-11-14_17-19-55.mp4" type="video/mp4" />
      {bg ? "Вашият браузър не поддържа видео." : "Your browser does not support video."}
    </video>
  );
}
