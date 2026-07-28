"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function Curtain({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-700 animate-in fade-in duration-700"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />

          {/* Message Bubble - Center */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full animate-in zoom-in fade-in duration-700">
              <div className="p-8 md:p-10">
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-4 -right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-all duration-300 shadow-lg"
                  aria-label="Close"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    className="h-5 w-5 text-gray-600"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Добро пожаловать! 🌿
                  </h2>
                  <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                    Получите безплатен оглед на вашата градина и консултация от нашите специалисти.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href={`/${locale}/contact`}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-brand hover:bg-brand-dark px-8 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                      onClick={() => setIsOpen(false)}
                    >
                      Заяви оглед
                    </Link>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="inline-flex h-12 items-center justify-center rounded-full border-2 border-gray-300 hover:border-gray-400 px-8 text-base font-semibold text-gray-700 transition-all duration-300"
                    >
                      Затвори
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
