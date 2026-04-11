"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "../types/chatRoom.types";

const messages: Message[] = [
  {
    id: 1,
    sender: "Alex P.",
    time: "10:46 AM",
    text: "Hey! Does anyone know when the new sci-fi series drops?",
    isAdmin: false,
    avatar: "",
  },
  {
    id: 2,
    sender: "Marcus T.",
    time: "10:48 AM",
    text: "Hi there! The first two books of the Starlight series will be available next Friday! \u{1F680}",
    isAdmin: true,
    avatar: "",
  },
  {
    id: 3,
    sender: "Xavi",
    time: "10:46 AM",
    text: "Awesome! Will it be included in the premium subscription right away?",
    isAdmin: false,
    avatar: "",
  },
  {
    id: 4,
    sender: "Marcus T.",
    time: "10:48 AM",
    text: "Yes it will! All premium subscribers get day-one access to new releases automatically.",
    isAdmin: true,
    avatar: "",
  },
  {
    id: 5,
    sender: "Alex P.",
    time: "10:46 AM",
    text: "Hey! Does anyone know when the new sci-fi series drops?",
    isAdmin: false,
    avatar: "",
  },
  {
    id: 6,
    sender: "Marcus T.",
    time: "10:48 AM",
    text: "Hi there! The first two books of the Starlight series will be available next Friday! \u{1F680}",
    isAdmin: true,
    avatar: "",
  },
  {
    id: 7,
    sender: "Xavi",
    time: "10:46 AM",
    text: "Awesome! Will it be included in the premium subscription right away?",
    isAdmin: false,
    avatar: "",
  },
  {
    id: 8,
    sender: "Marcus T.",
    time: "10:48 AM",
    text: "Yes it will! All premium subscribers get day-one access to new releases automatically.",
    isAdmin: true,
    avatar: "",
  },
];

function UserMessage({ message }: { message: Message }) {
  return (
    <div className="flex items-end gap-3">
      <Avatar className="size-14 shrink-0">
        <AvatarImage src={message.avatar} alt={message.sender} />
        <AvatarFallback className="bg-[#94a3b8] text-sm font-semibold text-white">
          {message.sender
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex max-w-[50%] flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#94a3b8]">{message.time}</span>
          <span className="text-xs font-medium text-[#94a3b8]">
            {message.sender}
          </span>
        </div>
        <div className="rounded-tl-xl rounded-tr-xl rounded-br-xl border border-[#e2e8f0] bg-[#f1f5f9] px-5 py-4">
          <p className="text-sm text-[#0f172a]">{message.text}</p>
        </div>
      </div>
    </div>
  );
}

function AdminMessage({ message }: { message: Message }) {
  return (
    <div className="flex items-end justify-end gap-3">
      <div className="flex max-w-[50%] flex-col items-end gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-[#94a3b8]">
            {message.sender}
          </span>
          <span className="rounded bg-[#64748b] px-1.5 py-0.5 text-[8px] font-normal uppercase text-[#f8fafc]">
            Admin
          </span>
          <span className="text-[10px] text-[#94a3b8]">{message.time}</span>
        </div>
        <div className="w-full rounded-tl-xl rounded-tr-xl rounded-bl-xl border border-[#e2e8f0] bg-[#fff8f5] px-5 py-4">
          <p className="text-sm text-[#0f172a]">{message.text}</p>
        </div>
      </div>
      <Avatar className="size-14 shrink-0">
        <AvatarImage src={message.avatar} alt={message.sender} />
        <AvatarFallback className="bg-[#4f46e5] text-sm font-semibold text-white">
          {message.sender
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

export default function ChatRoom() {
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col rounded-xl bg-white p-5">
      {/* Messages Area */}
      <div className="flex-1 space-y-8 overflow-y-auto pr-2">
        {messages.map((msg) =>
          msg.isAdmin ? (
            <AdminMessage key={msg.id} message={msg} />
          ) : (
            <UserMessage key={msg.id} message={msg} />
          ),
        )}
      </div>

      {/* Message Input */}
      <div className="mt-4 flex items-center gap-5">
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newMessage.trim()) {
              setNewMessage("");
            }
          }}
          className="flex-1 rounded-full bg-[#f1f5f9] px-5 py-2.5 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/30"
        />
        <button
          onClick={() => {
            if (newMessage.trim()) {
              setNewMessage("");
            }
          }}
          className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-6 py-3 text-base font-medium text-[#fff8f5] transition-colors hover:bg-[#4338ca]"
        >
          <Send className="size-4" />
          Send Message
        </button>
      </div>
    </div>
  );
}
