"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import styles from "./GardenLighting.module.css";

export function IrrigationVideo({ locale }: { locale: Locale }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.1 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video ref={videoRef} className={styles.video} muted loop playsInline preload="none" poster="/images/gallery/trevna-plosht-sofia.jpg" aria-label={locale === "bg" ? "Видео на поливна система в градина" : "Garden irrigation system video"}>
      <source src="/video_2026-11-27_19-38-23.mp4" type="video/mp4" />
      {locale === "bg" ? "Вашият браузър не поддържа видео." : "Your browser does not support video."}
    </video>
  );
}
