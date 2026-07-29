"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "👋 Привет! Аз съм вашата помощница за грижа на растенията и тревата. Задайте ми всеки вопрос относно вашата градина! 🌿",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages.slice(-5),
        }),
      });

      if (!response.ok) throw new Error("Неуспешен отговор");

      const data = await response.json();
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Грешка в чата:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Извините, възникна грешка. Опитайте отново.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      {/* Prominent mobile-friendly chat entry point. */}
      <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3">
        {!isOpen && (
          <div className="max-w-48 rounded-2xl rounded-br-sm bg-white px-3 py-2 text-xs font-semibold leading-snug text-green-900 shadow-lg ring-1 ring-green-100 sm:text-sm">
            Професионален консултант за грижа за растения и тревни площи.
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white shadow-xl ring-4 ring-white transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
          aria-label="Отворете чата с помощника за растенията"
          title="Помощник за растенията"
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <img
              src="/logo-removebg-preview.png"
              alt="BG Green Yard"
              className="h-10 w-10 rounded-full bg-white object-contain p-0.5"
            />
          )}
        </button>
      </div>

      {/* Прозорец на чата */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-[60] w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-2">
          {/* Заглавие */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src="/logo-removebg-preview.png"
                    alt="BG Green Yard"
                    className="h-7 w-7 rounded-full bg-white object-contain p-0.5"
                  />
                  <div>
                    <h3 className="font-bold text-sm">BG Green Yard</h3>
                    <p className="text-xs text-green-100">Консултант по озеленяване</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-green-100 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.role === "user"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  <p className="text-xs leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <span className={`text-xs mt-1 block ${
                    message.role === "user" ? "text-green-100" : "text-gray-400"
                  }`}>
                    {message.timestamp.toLocaleTimeString("bg-BG", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 px-3 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Вход */}
          <form onSubmit={handleSendMessage} className="border-t p-2 bg-white">
            <div className="flex gap-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Вопрос..."
                disabled={isLoading}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-green-600 disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-2 py-1 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
