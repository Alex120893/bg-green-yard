"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function FloatingCTA({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds if not already shown
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShown(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasShown]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
        aria-hidden
      />

      {/* Flower-shaped Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-500">
          {/* Flower petals background */}
          <div className="relative">
            {/* Center circle - Main content */}
            <div className="relative z-20 mx-auto w-64 h-64 bg-gradient-to-br from-brand via-brand to-brand-dark rounded-full shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-white/5 blur-xl" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center px-6 flex flex-col items-center justify-center h-full">
                {/* Illustration - Lawn mower person */}
                <svg
                  viewBox="0 0 200 200"
                  className="h-24 w-24 mb-3"
                  fill="none"
                >
                  {/* Body */}
                  <circle cx="100" cy="60" r="15" fill="#ffffff" opacity="0.9" />
                  {/* Head */}
                  <circle cx="100" cy="40" r="12" fill="#fdbf6e" />
                  {/* Arms */}
                  <line x1="85" y1="55" x2="70" y2="70" stroke="#fdbf6e" strokeWidth="3" strokeLinecap="round" />
                  <line x1="115" y1="55" x2="130" y2="70" stroke="#fdbf6e" strokeWidth="3" strokeLinecap="round" />
                  {/* Legs */}
                  <line x1="95" y1="75" x2="90" y2="95" stroke="#333333" strokeWidth="3" strokeLinecap="round" />
                  <line x1="105" y1="75" x2="110" y2="95" stroke="#333333" strokeWidth="3" strokeLinecap="round" />
                  {/* Lawn mower */}
                  <rect x="125" y="80" width="50" height="30" rx="4" fill="#ef4444" />
                  <circle cx="130" cy="105" r="8" fill="#333333" />
                  <circle cx="170" cy="105" r="8" fill="#333333" />
                  <line x1="115" y1="90" x2="125" y2="85" stroke="#666666" strokeWidth="2" strokeLinecap="round" />
                </svg>

                <h3 className="text-xl font-bold text-white mb-1">
                  Закажи сейчас
                </h3>
                <p className="text-sm text-white/90 font-semibold mb-4">
                  Безплатен преглед
                </p>

                {/* CTA Button */}
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-brand shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 whitespace-nowrap"
                  onClick={() => setIsOpen(false)}
                >
                  Контактирай нас
                </Link>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-30 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Close"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5 text-white"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Flower petals - Decorative circles around main circle */}
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * 120;
              const y = Math.sin(rad) * 120;
              return (
                <div
                  key={angle}
                  className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-green-300 to-emerald-400 shadow-lg opacity-80 animate-pulse"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    animation: `pulse ${2 + angle / 100}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                  }}
                />
              );
            })}
          </div>

          {/* Dismiss option */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm text-white/70 hover:text-white transition-colors font-medium"
            >
              Затвори
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px))) scale(1); }
          50% { opacity: 0.8; transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px))) scale(1.1); }
        }
      `}</style>
    </>
  );
}
