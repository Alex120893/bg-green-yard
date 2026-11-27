"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { lightingImage } from "@/lib/lighting";
import styles from "./GardenLighting.module.css";

export function LightingVideo({ locale }: { locale: Locale }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Keep the poster if browser policy prevents autoplay.
      void videoRef.current?.play().catch(() => {});
    }
  }, []);

  return (
    <video ref={videoRef} className={styles.video} muted loop playsInline preload="metadata" poster={lightingImage} aria-label={locale === "bg" ? "Видео на градинско осветление" : "Garden lighting video"}>
      <source src="/video_2026-11-27_19-04-02.mp4" type="video/mp4" />
      {locale === "bg" ? "Вашият браузър не поддържа видео." : "Your browser does not support video."}
    </video>
  );
}
