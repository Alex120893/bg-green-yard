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

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5 text-gray-600"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Green header background */}
          <div className="bg-gradient-to-br from-brand to-brand-dark pt-8 pb-4 px-6 relative">
            {/* Illustration - Lawn mower person */}
            <div className="flex justify-center mb-4">
              <svg
                viewBox="0 0 200 200"
                className="h-32 w-32"
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
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {locale === "bg"
                ? "Закажи сейчас"
                : "Order Now"}
            </h3>
            <p className="text-lg text-brand font-semibold mb-2">
              {locale === "bg"
                ? "Безплатен преглед"
                : "Free Consultation"}
            </p>
            <p className="text-sm text-gray-600 mb-6">
              {locale === "bg"
                ? "Получи безплатна консултация за твоя проект днес"
                : "Get a free consultation for your project today"}
            </p>

            {/* CTA Button */}
            <Link
              href={`/${locale}/contact`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-brand to-brand-dark px-8 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              {locale === "bg" ? "Контактирай нас" : "Contact Us"}
            </Link>

            {/* Dismiss option */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {locale === "bg" ? "Затвори" : "Close"}
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-brand/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 h-40 w-40 rounded-full bg-brand/5 blur-3xl" />
        </div>
      </div>
    </>
  );
}
