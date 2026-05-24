"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  MessageCircle,
  X,
  Send,
  LogIn,
  Minimize2,
  Loader2,
  Bot,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
}

const now = () =>
  new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  text: "👋 Hi there! How can we help you today? Ask us anything about books, orders, or your account.",
  time: now(),
};

/* ─── Login Modal ─────────────────────────────────────────────────────────── */
function LoginModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(15,23,42,0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center gap-5 px-8 py-8 text-center">
          {/* icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-indigo-100 bg-indigo-50">
            <MessageCircle size={28} className="text-indigo-600" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Login to Start Chatting
            </h2>
            <p className="text-sm leading-relaxed text-slate-500">
              Please log in to your account to access our live chat support and
              get instant help from our team.
            </p>
          </div>

          <div className="w-full border-t border-slate-100" />

          <div className="flex w-full flex-col gap-3">
            <Link
              href="/auth/login"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700"
            >
              <LogIn size={16} />
              Login to Your Account
            </Link>
            <Link
              href="/auth/signup"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-indigo-200 py-2.5 text-sm font-semibold text-indigo-600 transition-all hover:bg-indigo-50"
            >
              Create New Account
            </Link>
            <button
              onClick={onClose}
              className="text-sm text-slate-400 transition-colors hover:text-slate-600"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Chat Message Bubble ────────────────────────────────────────────────── */
function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* avatar */}
      {!isUser && (
        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100">
          <Bot size={14} className="text-indigo-600" />
        </div>
      )}
      <div
        className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`max-w-[200px] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
            isUser
              ? "rounded-tr-sm bg-indigo-600 text-white"
              : "rounded-tl-sm bg-slate-100 text-slate-800"
          }`}
        >
          {msg.text}
        </div>
        <span className="text-[10px] text-slate-400">{msg.time}</span>
      </div>
    </div>
  );
}

/* ─── Chat Panel ─────────────────────────────────────────────────────────── */
function ChatPanel({
  onClose,
  userName,
}: {
  onClose: () => void;
  userName: string;
}) {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text,
      time: now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulated auto-reply — replace with real API call
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "Thanks for your message! Our support team will get back to you shortly. For urgent queries, please email us at stevegroff@kathorianpublishingllc.com",
        time: now(),
      };
      setMessages((prev) => [...prev, reply]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex h-[480px] w-[320px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-indigo-600 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Support Chat</p>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-xs text-indigo-200">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Greeting bar */}
      <div className="border-b border-slate-100 bg-indigo-50 px-4 py-2">
        <p className="text-xs text-indigo-700">
          Hello, <span className="font-semibold">{userName}</span>! 👋
          We&apos;re here to help.
        </p>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.map((msg) => (
          <Bubble key={msg.id} msg={msg} />
        ))}
        {loading && (
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100">
              <Bot size={14} className="text-indigo-600" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-2">
              <Loader2 size={14} className="animate-spin text-slate-400" />
              <span className="text-xs text-slate-400">Typing...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-100 p-3">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white transition-all hover:bg-indigo-700 disabled:opacity-40"
          >
            <Send size={13} />
          </button>
        </div>
        <p className="mt-1.5 text-center text-[10px] text-slate-400">
          Powered by Ka Thorian Support
        </p>
      </div>
    </div>
  );
}

/* ─── Main Floating Chat Component ───────────────────────────────────────── */
export default function FloatingChat() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Don't render on server or while loading
  if (status === "loading") return null;

  const isLoggedIn = !!session?.user;
  const userName = session?.user?.name || session?.user?.email || "there";

  const handleToggle = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setOpen((prev) => !prev);
    }
  };

  return (
    <>
      {/* Login modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      {/* Chat panel */}
      <div className="fixed bottom-20 right-5 z-[150] md:bottom-8 md:right-8">
        {open && isLoggedIn && (
          <div className="mb-4 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <ChatPanel onClose={() => setOpen(false)} userName={userName} />
          </div>
        )}

        {/* FAB Button */}
        <div className="flex justify-end">
          <button
            onClick={handleToggle}
            aria-label="Open chat"
            className={`group relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
              open
                ? "bg-slate-700 hover:bg-slate-800"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {/* pulse ring */}
            {!open && (
              <span className="absolute inset-0 animate-ping rounded-full bg-indigo-500 opacity-30" />
            )}

            {open ? (
              <X size={22} className="text-white" />
            ) : (
              <MessageCircle size={24} className="text-white" />
            )}

            {/* tooltip */}
            <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {isLoggedIn ? "Chat with us" : "Login to chat"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
