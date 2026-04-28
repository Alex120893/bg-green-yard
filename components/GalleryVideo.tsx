"use client";

import { useEffect, useRef } from "react";

export function GalleryVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const showFirstFrame = () => {
      try {
        if (v.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          v.currentTime = 0.01;
        }
      } catch {
        /* ignore seek errors */
      }
    };

    v.addEventListener("loadeddata", showFirstFrame, { once: true });
    return () => v.removeEventListener("loadeddata", showFirstFrame);
  }, [src]);

  return (
    <video
      ref={ref}
      className="aspect-video h-full w-full object-cover"
      controls
      playsInline
      preload="auto"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
