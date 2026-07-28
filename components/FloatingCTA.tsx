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

  return (
    <>
      {/* Mobile Version - Bottom Right */}
      <div className="md:hidden fixed bottom-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-700">
        {isOpen && (
          <div className="relative w-72 animate-in fade-in slide-in-from-bottom duration-700">
            {/* Flower Shape Container */}
            <div className="relative mx-auto w-64 h-64">
              {/* SVG Flower Shape */}
              <svg
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="petalGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="centerGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>

                {/* Petals */}
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <ellipse
                    key={`petal-mobile-${angle}`}
                    cx="200"
                    cy="80"
                    rx="60"
                    ry="90"
                    fill="url(#petalGradientMobile)"
                    opacity="0.9"
                    transform={`rotate(${angle} 200 200)`}
                    style={{
                      filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                    }}
                  />
                ))}

                {/* Center circle */}
                <circle
                  cx="200"
                  cy="200"
                  r="75"
                  fill="url(#centerGradientMobile)"
                  style={{
                    filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.15))",
                  }}
                />
              </svg>

              {/* Content - Centered over flower */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="text-center px-6">
                  <p className="text-sm text-white/95 font-semibold mb-4 animate-in fade-in duration-1000 leading-relaxed" style={{ animationDelay: "200ms" }}>
                    Заявете своя безплатен оглед още днес!
                  </p>

                  {/* CTA Button */}
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex h-9 items-center justify-center rounded-full bg-white px-6 text-xs font-bold text-brand shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 whitespace-nowrap animate-in fade-in duration-1000"
                    style={{ animationDelay: "400ms" }}
                    onClick={() => setIsOpen(false)}
                  >
                    Свържи се с нас
                  </Link>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm animate-in fade-in duration-1000"
                  style={{ animationDelay: "600ms" }}
                  aria-label="Close"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    className="h-4 w-4 text-white"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Version - Bottom Right with Backdrop */}
      <div className="hidden md:block">
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-700 animate-in fade-in duration-700"
              onClick={() => setIsOpen(false)}
              aria-hidden
            />

            {/* Flower Modal */}
            <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-8 fade-in duration-700">
              <div className="relative w-96">
                {/* Flower Shape Container */}
                <div className="relative mx-auto w-80 h-80">
                  {/* SVG Flower Shape */}
                  <svg
                    viewBox="0 0 400 400"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <linearGradient id="petalGradientDesktop" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                      <linearGradient id="centerGradientDesktop" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>

                    {/* Petals */}
                    {[0, 60, 120, 180, 240, 300].map((angle) => (
                      <ellipse
                        key={`petal-desktop-${angle}`}
                        cx="200"
                        cy="80"
                        rx="60"
                        ry="90"
                        fill="url(#petalGradientDesktop)"
                        opacity="0.9"
                        transform={`rotate(${angle} 200 200)`}
                        style={{
                          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                        }}
                      />
                    ))}

                    {/* Center circle */}
                    <circle
                      cx="200"
                      cy="200"
                      r="75"
                      fill="url(#centerGradientDesktop)"
                      style={{
                        filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.15))",
                      }}
                    />
                  </svg>

                  {/* Content - Centered over flower */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="text-center px-8">
                      <p className="text-lg text-white/95 font-semibold mb-6 animate-in fade-in duration-1000 leading-relaxed" style={{ animationDelay: "200ms" }}>
                        Заявете своя безплатен оглед още днес!
                      </p>

                      {/* CTA Button */}
                      <Link
                        href={`/${locale}/contact`}
                        className="inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-brand shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 whitespace-nowrap animate-in fade-in duration-1000"
                        style={{ animationDelay: "400ms" }}
                        onClick={() => setIsOpen(false)}
                      >
                        Свържи се с нас
                      </Link>
                    </div>

                    {/* Close button */}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-8 right-8 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm animate-in fade-in duration-1000"
                      style={{ animationDelay: "600ms" }}
                      aria-label="Close"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        className="h-5 w-5 text-white"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Dismiss option */}
                <div className="text-center mt-4 animate-in fade-in duration-1000" style={{ animationDelay: "700ms" }}>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-white/60 hover:text-white transition-colors font-medium"
                  >
                    Затвори
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
