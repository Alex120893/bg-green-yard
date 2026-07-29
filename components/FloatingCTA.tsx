"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function FloatingCTA({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds if not already shown
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShown(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasShown]);

  return (
    <>
      {/* Mobile CTA is disabled so it cannot cover the chat assistant. */}
      <div className="hidden md:hidden fixed bottom-0 right-0 z-50 p-4">
        {isOpen && (
          <div className="animate-in slide-in-from-bottom duration-700">
            {/* Message Bubble */}
            <div className="relative bg-white rounded-2xl rounded-br-none shadow-2xl max-w-xs animate-in fade-in slide-in-from-bottom duration-700">
              {/* Arrow pointer */}
              <div className="absolute bottom-0 right-0 w-0 h-0 border-l-8 border-t-8 border-l-transparent border-t-white"></div>

              <div className="p-4">
                <p className="text-sm text-gray-800 font-semibold mb-3 leading-relaxed animate-in fade-in duration-1000" style={{ animationDelay: "200ms" }}>
                  Заявете своя безплатен оглед още днес!
                </p>

                {/* CTA Button */}
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex h-8 items-center justify-center rounded-full bg-green-500 hover:bg-green-600 px-5 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 whitespace-nowrap animate-in fade-in duration-1000"
                  style={{ animationDelay: "400ms" }}
                  onClick={() => setIsOpen(false)}
                >
                  Свържи се с нас
                </Link>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-3 -right-3 z-20 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-all duration-300 shadow-lg animate-in fade-in duration-1000"
                style={{ animationDelay: "600ms" }}
                aria-label="Close"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  className="h-3.5 w-3.5 text-gray-600"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Version - Bottom Right */}
      <div className="hidden md:block">
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-700 animate-in fade-in duration-700"
              onClick={() => setIsOpen(false)}
              aria-hidden
            />

            {/* Message Bubble */}
            <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-8 fade-in duration-700">
              <div className="relative bg-white rounded-2xl rounded-br-none shadow-2xl max-w-sm animate-in fade-in slide-in-from-bottom duration-700">
                {/* Arrow pointer */}
                <div className="absolute bottom-0 right-0 w-0 h-0 border-l-12 border-t-12 border-l-transparent border-t-white"></div>

                <div className="p-6">
                  <p className="text-base text-gray-800 font-semibold mb-4 leading-relaxed animate-in fade-in duration-1000" style={{ animationDelay: "200ms" }}>
                    Заявете своя безплатен оглед още днес!
                  </p>

                  {/* CTA Button */}
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex h-10 items-center justify-center rounded-full bg-green-500 hover:bg-green-600 px-6 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 whitespace-nowrap animate-in fade-in duration-1000"
                    style={{ animationDelay: "400ms" }}
                    onClick={() => setIsOpen(false)}
                  >
                    Свържи се с нас
                  </Link>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-4 -right-4 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-all duration-300 shadow-lg animate-in fade-in duration-1000"
                  style={{ animationDelay: "600ms" }}
                  aria-label="Close"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    className="h-4 w-4 text-gray-600"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
