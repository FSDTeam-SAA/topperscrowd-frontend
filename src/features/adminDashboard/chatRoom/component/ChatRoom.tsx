"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Send, Pin, Trash2, Reply, X, SmilePlus, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  useChatMessages,
  useChatSocket,
  useSendMessage,
  useReactToMessage,
  usePinMessage,
  useDeleteMessage,
} from "../hooks/useChatRoom";
import { ChatMessage } from "../types/chatRoom.types";

const EMOJI_OPTIONS = ["👍", "❤️", "😂", "😮", "😢", "😡"];

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getInitials(name: string) {
  return name
    .split(/[@.\s]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

function MessageReactions({
  message,
  onReact,
  currentUserId,
}: {
  message: ChatMessage;
  onReact: (messageId: string, emoji: string) => void;
  currentUserId: string;
}) {
  const [showPicker, setShowPicker] = useState(false);

  if (message.reactions.length === 0 && !showPicker) {
    return (
      <button
        onClick={() => setShowPicker(true)}
        className="opacity-0 transition-opacity group-hover:opacity-100"
        title="React"
      >
        <SmilePlus className="size-4 text-[#94a3b8] hover:text-[#4f46e5]" />
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1">
      {message.reactions.map((r, i) => (
        <button
          key={i}
          onClick={() => onReact(message._id, r.emoji)}
          className={`rounded-full border px-1.5 py-0.5 text-xs transition-colors ${
            r.userId === currentUserId
              ? "border-[#4f46e5]/30 bg-[#4f46e5]/10"
              : "border-[#e2e8f0] bg-white hover:bg-[#f1f5f9]"
          }`}
        >
          {r.emoji}
        </button>
      ))}
      {showPicker ? (
        <div className="flex items-center gap-1 rounded-full border border-[#e2e8f0] bg-white px-2 py-1 shadow-sm">
          {EMOJI_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                onReact(message._id, emoji);
                setShowPicker(false);
              }}
              className="text-sm transition-transform hover:scale-125"
            >
              {emoji}
            </button>
          ))}
          <button
            onClick={() => setShowPicker(false)}
            className="ml-1 text-[#94a3b8] hover:text-[#64748b]"
          >
            <X className="size-3" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowPicker(true)}
          className="opacity-0 transition-opacity group-hover:opacity-100"
          title="React"
        >
          <SmilePlus className="size-3.5 text-[#94a3b8] hover:text-[#4f46e5]" />
        </button>
      )}
    </div>
  );
}

function ReplyPreview({ replyTo }: { replyTo: ChatMessage["replyTo"] }) {
  if (!replyTo) return null;

  return (
    <div className="mb-1 flex items-center gap-2 rounded-lg border-l-2 border-[#4f46e5] bg-[#f1f5f9] px-3 py-1.5">
      <Reply className="size-3 text-[#94a3b8]" />
      <div className="min-w-0 flex-1">
        <span className="text-[10px] font-medium text-[#4f46e5]">
          {replyTo.senderName}
        </span>
        <p className="truncate text-xs text-[#64748b]">
          {replyTo.contentPreview}
        </p>
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  isOwn,
  isAdmin,
  currentUserId,
  onReply,
  onReact,
  onPin,
  onDelete,
}: {
  message: ChatMessage;
  isOwn: boolean;
  isAdmin: boolean;
  currentUserId: string;
  onReply: (msg: ChatMessage) => void;
  onReact: (messageId: string, emoji: string) => void;
  onPin: (messageId: string) => void;
  onDelete: (messageId: string) => void;
}) {
  const isSenderAdmin = message.senderRole === "admin";

  if (isOwn) {
    return (
      <div className="group flex items-end justify-end gap-3">
        <div className="flex max-w-[60%] flex-col items-end gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-[#94a3b8]">
              {message.senderName}
            </span>
            {isSenderAdmin && (
              <span className="rounded bg-[#64748b] px-1.5 py-0.5 text-[8px] font-normal uppercase text-[#f8fafc]">
                Admin
              </span>
            )}
            <span className="text-[10px] text-[#94a3b8]">
              {formatTime(message.createdAt)}
            </span>
            {message.isPinned && <Pin className="size-3 text-[#f59e0b]" />}
          </div>
          <ReplyPreview replyTo={message.replyTo} />
          <div className="w-full rounded-tl-xl rounded-tr-xl rounded-bl-xl border border-[#e2e8f0] bg-[#fff8f5] px-5 py-4">
            <p className="text-sm text-[#0f172a]">{message.content}</p>
          </div>
          <div className="flex items-center gap-2">
            <MessageReactions
              message={message}
              onReact={onReact}
              currentUserId={currentUserId}
            />
            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => onReply(message)}
                title="Reply"
                className="rounded p-1 hover:bg-[#f1f5f9]"
              >
                <Reply className="size-3.5 text-[#94a3b8] hover:text-[#4f46e5]" />
              </button>
              {isAdmin && (
                <>
                  <button
                    onClick={() => onPin(message._id)}
                    title={message.isPinned ? "Unpin" : "Pin"}
                    className="rounded p-1 hover:bg-[#f1f5f9]"
                  >
                    <Pin
                      className={`size-3.5 ${message.isPinned ? "text-[#f59e0b]" : "text-[#94a3b8] hover:text-[#4f46e5]"}`}
                    />
                  </button>
                  <button
                    onClick={() => onDelete(message._id)}
                    title="Delete"
                    className="rounded p-1 hover:bg-[#f1f5f9]"
                  >
                    <Trash2 className="size-3.5 text-[#94a3b8] hover:text-red-500" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <Avatar className="size-10 shrink-0">
          <AvatarImage src="" alt={message.senderName} />
          <AvatarFallback className="bg-[#4f46e5] text-xs font-semibold text-white">
            {getInitials(message.senderName)}
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <div className="group flex items-end gap-3">
      <Avatar className="size-10 shrink-0">
        <AvatarImage src="" alt={message.senderName} />
        <AvatarFallback className="bg-[#94a3b8] text-xs font-semibold text-white">
          {getInitials(message.senderName)}
        </AvatarFallback>
      </Avatar>
      <div className="flex max-w-[60%] flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#94a3b8]">
            {formatTime(message.createdAt)}
          </span>
          <span className="text-xs font-medium text-[#94a3b8]">
            {message.senderName}
          </span>
          {isSenderAdmin && (
            <span className="rounded bg-[#64748b] px-1.5 py-0.5 text-[8px] font-normal uppercase text-[#f8fafc]">
              Admin
            </span>
          )}
          {message.isPinned && <Pin className="size-3 text-[#f59e0b]" />}
        </div>
        <ReplyPreview replyTo={message.replyTo} />
        <div className="rounded-tl-xl rounded-tr-xl rounded-br-xl border border-[#e2e8f0] bg-[#f1f5f9] px-5 py-4">
          <p className="text-sm text-[#0f172a]">{message.content}</p>
        </div>
        <div className="flex items-center gap-2">
          <MessageReactions
            message={message}
            onReact={onReact}
            currentUserId={currentUserId}
          />
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => onReply(message)}
              title="Reply"
              className="rounded p-1 hover:bg-[#f1f5f9]"
            >
              <Reply className="size-3.5 text-[#94a3b8] hover:text-[#4f46e5]" />
            </button>
            {isAdmin && (
              <>
                <button
                  onClick={() => onPin(message._id)}
                  title={message.isPinned ? "Unpin" : "Pin"}
                  className="rounded p-1 hover:bg-[#f1f5f9]"
                >
                  <Pin
                    className={`size-3.5 ${message.isPinned ? "text-[#f59e0b]" : "text-[#94a3b8] hover:text-[#4f46e5]"}`}
                  />
                </button>
                <button
                  onClick={() => onDelete(message._id)}
                  title="Delete"
                  className="rounded p-1 hover:bg-[#f1f5f9]"
                >
                  <Trash2 className="size-3.5 text-[#94a3b8] hover:text-red-500" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatRoom() {
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();
  const currentUserId = user?.id ?? "";
  const isAdmin = user?.role === "admin";

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChatMessages();
  const { sendMessage: socketSend } = useChatSocket();
  const sendMessageMutation = useSendMessage();
  const reactMutation = useReactToMessage();
  const pinMutation = usePinMessage();
  const deleteMutation = useDeleteMessage();

  const allMessages = useMemo(() => {
    if (!data?.pages) return [];
    const msgs = data.pages.flatMap((page) => page.data ?? []);
    return msgs.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }, [data]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages.length]);

  // Load more on scroll to top
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (container.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleSend = () => {
    const content = newMessage.trim();
    if (!content) return;

    // Try socket first, fallback to REST
    socketSend(content, replyingTo?._id);
    sendMessageMutation.mutate({
      content,
      replyTo: replyingTo ? { messageId: replyingTo._id } : undefined,
    });

    setNewMessage("");
    setReplyingTo(null);
  };

  const handleReact = (messageId: string, emoji: string) => {
    reactMutation.mutate({ messageId, emoji });
  };

  const handlePin = (messageId: string) => {
    pinMutation.mutate(messageId);
  };

  const handleDelete = (messageId: string) => {
    deleteMutation.mutate(messageId);
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-120px)] items-center justify-center rounded-xl bg-white">
        <Loader2 className="size-8 animate-spin text-[#4f46e5]" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col rounded-xl bg-white p-5">
      {/* Messages Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 space-y-6 overflow-y-auto pr-2"
      >
        {isFetchingNextPage && (
          <div className="flex justify-center py-2">
            <Loader2 className="size-5 animate-spin text-[#94a3b8]" />
          </div>
        )}

        {allMessages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-[#94a3b8]">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          allMessages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              isOwn={msg.senderId === currentUserId}
              isAdmin={isAdmin}
              currentUserId={currentUserId}
              onReply={setReplyingTo}
              onReact={handleReact}
              onPin={handlePin}
              onDelete={handleDelete}
            />
          ))
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Reply Preview */}
      {replyingTo && (
        <div className="mt-2 flex items-center gap-3 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2">
          <Reply className="size-4 text-[#4f46e5]" />
          <div className="min-w-0 flex-1">
            <span className="text-xs font-medium text-[#4f46e5]">
              Replying to {replyingTo.senderName}
            </span>
            <p className="truncate text-xs text-[#64748b]">
              {replyingTo.content}
            </p>
          </div>
          <button
            onClick={() => setReplyingTo(null)}
            className="text-[#94a3b8] hover:text-[#64748b]"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Message Input */}
      <div className="mt-4 flex items-center gap-5">
        <input
          type="text"
          placeholder={replyingTo ? "Type your reply..." : "Type a message"}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 rounded-full bg-[#f1f5f9] px-5 py-2.5 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/30"
        />
        <button
          onClick={handleSend}
          disabled={!newMessage.trim() || sendMessageMutation.isPending}
          className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-6 py-3 text-base font-medium text-[#fff8f5] transition-colors hover:bg-[#4338ca] disabled:opacity-50"
        >
          {sendMessageMutation.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          Send Message
        </button>
      </div>
    </div>
  );
}
