"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CONTACT } from "@/lib/contact";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  needsContact?: boolean;
  showServicePrompt?: boolean;
}

type ChatResponse = {
  response: string;
  needsContact: boolean;
  showServicePrompt: boolean;
};

type SpeechRecognitionInstance = {
  start: () => void;
  stop: () => void;
  lang: string;
  interimResults: boolean;
  onresult: ((event: { results: { 0: { transcript: string } }[] }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionInstance;
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const locale = pathname.startsWith("/en") ? "en" : "bg";
  const contactHref = `/${locale}/contact`;
  const copy = locale === "en"
    ? {
        greeting: "👋 Hi! I am your plant and lawn care assistant. Ask me anything about your garden! 🌿",
        error: "Sorry, something went wrong. Please try again.",
        prompt: "Professional consultant for plant and lawn care.",
        openChat: "Open the plant care assistant",
        chatTitle: "Plant care assistant",
        consultant: "Landscaping consultant",
        servicePrompt: "Need professional help? The BG Green Yard team can handle the site visit and the work.",
        contact: "Contact us",
        call: "Call us",
        placeholder: "Your question...",
        startListening: "Start voice input",
        stopListening: "Stop voice input",
        voiceInputUnavailable: "Voice input is not supported by this browser.",
      }
    : {
        greeting: "👋 Привет! Аз съм вашата помощница за грижа за растенията и тревата. Задайте ми всеки въпрос относно вашата градина! 🌿",
        error: "Извинете, възникна грешка. Опитайте отново.",
        prompt: "Професионален консултант за грижа за растения и тревни площи.",
        openChat: "Отворете чата с помощника за растенията",
        chatTitle: "Помощник за растенията",
        consultant: "Консултант по озеленяване",
        servicePrompt: "Искате професионална помощ? Екипът на BG Green Yard може да поеме огледа и изпълнението.",
        contact: "Свържете се с нас",
        call: "Обадете ни се",
        placeholder: "Въпрос...",
        startListening: "Гласово търсене на български",
        stopListening: "Спри гласовото търсене",
        voiceInputUnavailable: "Този браузър не поддържа гласово търсене.",
      };
  const voiceCopy = locale === "en"
    ? { read: "Read answer aloud", stop: "Stop reading", unavailable: "Voice playback is not supported by this browser." }
    : { read: "Прочети отговора на глас", stop: "Спри озвучаването", unavailable: "Този браузър не поддържа озвучаване." };
  const [showPrompt, setShowPrompt] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: copy.greeting,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([{ id: "1", role: "assistant", content: copy.greeting, timestamp: new Date() }]);
    setInput("");
  }, [locale, copy.greeting]);

  useEffect(() => {
    setSpeechSupported("speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
    const SpeechRecognition = (window as SpeechRecognitionWindow).SpeechRecognition
      ?? (window as SpeechRecognitionWindow).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "bg-BG";
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (event) => setInput(event.results[0][0].transcript);
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onerror = () => setIsListening(false);
      setRecognitionSupported(true);
    }
    return () => {
      window.speechSynthesis?.cancel();
      recognitionRef.current?.stop();
    };
  }, []);

  const toggleSpeech = (message: Message) => {
    if (!speechSupported) return;
    if (speakingMessageId === message.id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    const language = locale === "en" ? "en-GB" : "bg-BG";
    const text = message.content
      .replace(/[*_#>`]/g, "")
      .replace(/•/g, ". ")
      .replace(/\s+/g, " ")
      .trim();
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((candidate) => candidate.lang.toLowerCase().startsWith(language.toLowerCase().slice(0, 2)));

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.voice = voice ?? null;
    utterance.rate = locale === "en" ? 0.9 : 0.8;
    utterance.pitch = 1;
    utterance.onend = () => setSpeakingMessageId((current) => current === message.id ? null : current);
    utterance.onerror = () => setSpeakingMessageId((current) => current === message.id ? null : current);
    setSpeakingMessageId(message.id);
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoiceInput = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
      return;
    }
    try {
      recognition.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setShowPrompt(true);
    }, 10_000);
    const hideTimer = window.setTimeout(() => {
      setShowPrompt(false);
    }, 20_000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

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

      if (!response.ok) throw new Error("Chat request failed");

      const data: ChatResponse = await response.json();
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        needsContact: data.needsContact,
        showServicePrompt: data.showServicePrompt,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: copy.error,
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
        {!isOpen && showPrompt && (
          <div className="max-w-48 rounded-2xl rounded-br-sm bg-white px-3 py-2 text-xs font-semibold leading-snug text-green-900 shadow-lg ring-1 ring-green-100 sm:text-sm">
            {copy.prompt}
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white shadow-xl ring-4 ring-white transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
          aria-label={copy.openChat}
          title={copy.chatTitle}
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <img
              src="/logo-removebg-preview.png"
              alt="Лого на BG Green Yard"
              width={40}
              height={40}
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
                    alt="Лого на BG Green Yard"
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full bg-white object-contain p-0.5"
                  />
                  <div>
                    <h3 className="font-bold text-sm">BG Green Yard</h3>
                    <p className="text-xs text-green-100">{copy.consultant}</p>
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

          {/* Сообщени�� */}
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
                  {message.role === "assistant" && (
                    <button
                      type="button"
                      onClick={() => toggleSpeech(message)}
                      disabled={!speechSupported}
                      aria-label={speakingMessageId === message.id ? voiceCopy.stop : voiceCopy.read}
                      title={!speechSupported ? voiceCopy.unavailable : speakingMessageId === message.id ? voiceCopy.stop : voiceCopy.read}
                      className="mt-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-green-200 text-green-700 transition-colors hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {speakingMessageId === message.id ? (
                        <span className="h-2.5 w-2.5 rounded-sm bg-current" aria-hidden />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5" aria-hidden>
                          <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                          <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" />
                        </svg>
                      )}
                    </button>
                  )}
                  {message.showServicePrompt && (
                    <p className="mt-2 border-t border-green-100 pt-2 text-xs font-medium text-green-800">
                      {copy.servicePrompt}
                    </p>
                  )}
                  {(message.needsContact || message.showServicePrompt) && (
                    <div className="mt-2 flex flex-col gap-1.5">
                      <a
                        href={contactHref}
                        className="rounded bg-green-600 px-2 py-1 text-center text-xs font-semibold text-white hover:bg-green-700"
                      >
                        {copy.contact}
                      </a>
                      <a
                        href={`tel:${CONTACT.phoneTel}`}
                        className="rounded border border-green-600 px-2 py-1 text-center text-xs font-semibold text-green-700 hover:bg-green-50"
                      >
                        {copy.call}: {CONTACT.phoneDisplay}
                      </a>
                    </div>
                  )}
                  <span className={`text-xs mt-1 block ${
                    message.role === "user" ? "text-green-100" : "text-gray-400"
                  }`}>
                    {message.timestamp.toLocaleTimeString(locale === "en" ? "en-GB" : "bg-BG", {
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
                placeholder={copy.placeholder}
                disabled={isLoading}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-green-600 disabled:bg-gray-100"
              />
              <button
                type="button"
                onClick={toggleVoiceInput}
                disabled={!recognitionSupported}
                aria-label={isListening ? copy.stopListening : copy.startListening}
                title={!recognitionSupported ? copy.voiceInputUnavailable : isListening ? copy.stopListening : copy.startListening}
                className={`rounded px-2 py-1 transition-colors ${isListening ? "bg-red-600 text-white" : "border border-green-600 text-green-700 hover:bg-green-50"} disabled:cursor-not-allowed disabled:opacity-40`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8" />
                </svg>
              </button>
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
