"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { getSocket, disconnectSocket } from "@/lib/socket";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  getMessages,
  getPinnedMessages,
  getMyReplies,
  sendMessageRest,
  reactToMessage,
  pinMessage,
  deleteMessage,
} from "../api/chatRoom.api";
import { ChatMessage, SendMessagePayload } from "../types/chatRoom.types";

const MESSAGES_KEY = ["chatroom", "messages"];
const PINNED_KEY = ["chatroom", "pinned"];
const REPLIES_KEY = ["chatroom", "my-replies"];
const MESSAGES_LIMIT = 30;

export function useChatMessages() {
  return useInfiniteQuery({
    queryKey: MESSAGES_KEY,
    queryFn: ({ pageParam = 1 }) =>
      getMessages({ page: pageParam, limit: MESSAGES_LIMIT }),
    getNextPageParam: (lastPage) => {
      const meta = lastPage.meta;
      if (!meta) return undefined;
      return meta.page < meta.totalPage ? meta.page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

export function usePinnedMessages() {
  return useQuery({
    queryKey: PINNED_KEY,
    queryFn: getPinnedMessages,
  });
}

export function useMyReplies() {
  return useQuery({
    queryKey: REPLIES_KEY,
    queryFn: getMyReplies,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendMessagePayload) => sendMessageRest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MESSAGES_KEY });
    },
  });
}

export function useReactToMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId, emoji }: { messageId: string; emoji: string }) =>
      reactToMessage(messageId, { emoji }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MESSAGES_KEY });
    },
  });
}

export function usePinMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string) => pinMessage(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MESSAGES_KEY });
      queryClient.invalidateQueries({ queryKey: PINNED_KEY });
    },
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string) => deleteMessage(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MESSAGES_KEY });
    },
  });
}

export function useChatSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const addMessageToCache = useCallback(
    (message: ChatMessage) => {
      queryClient.setQueryData(MESSAGES_KEY, (old: unknown) => {
        if (!old || typeof old !== "object") return old;
        const data = old as {
          pages: Array<{
            success: boolean;
            message: string;
            statusCode: number;
            data?: ChatMessage[];
            meta?: {
              page: number;
              limit: number;
              total: number;
              totalPage: number;
            };
          }>;
          pageParams: number[];
        };
        const pages = [...data.pages];
        if (pages.length > 0) {
          const firstPage = { ...pages[0] };
          const existingMessages = firstPage.data || [];
          const alreadyExists = existingMessages.some(
            (m) => m._id === message._id,
          );
          if (!alreadyExists) {
            firstPage.data = [...existingMessages, message];
          }
          pages[0] = firstPage;
        }
        return { ...data, pages };
      });
    },
    [queryClient],
  );

  const updateMessageInCache = useCallback(
    (updated: ChatMessage) => {
      queryClient.setQueryData(MESSAGES_KEY, (old: unknown) => {
        if (!old || typeof old !== "object") return old;
        const data = old as {
          pages: Array<{
            success: boolean;
            message: string;
            statusCode: number;
            data?: ChatMessage[];
            meta?: {
              page: number;
              limit: number;
              total: number;
              totalPage: number;
            };
          }>;
          pageParams: number[];
        };
        const pages = data.pages.map((page) => ({
          ...page,
          data: page.data?.map((m) => (m._id === updated._id ? updated : m)),
        }));
        return { ...data, pages };
      });
    },
    [queryClient],
  );

  const removeMessageFromCache = useCallback(
    (messageId: string) => {
      queryClient.setQueryData(MESSAGES_KEY, (old: unknown) => {
        if (!old || typeof old !== "object") return old;
        const data = old as {
          pages: Array<{
            success: boolean;
            message: string;
            statusCode: number;
            data?: ChatMessage[];
            meta?: {
              page: number;
              limit: number;
              total: number;
              totalPage: number;
            };
          }>;
          pageParams: number[];
        };
        const pages = data.pages.map((page) => ({
          ...page,
          data: page.data?.filter((m) => m._id !== messageId),
        }));
        return { ...data, pages };
      });
    },
    [queryClient],
  );

  useEffect(() => {
    if (!isAuthenticated) return;

    let mounted = true;

    const connectSocket = async () => {
      const sock = await getSocket();
      if (!mounted) return;
      socketRef.current = sock;
      setIsConnected(sock.connected);

      sock.on("connect", () => setIsConnected(true));
      sock.on("disconnect", () => setIsConnected(false));

      sock.on("chatroom:message", (message: ChatMessage) => {
        addMessageToCache(message);
      });

      sock.on("chatroom:reaction", (updated: ChatMessage) => {
        updateMessageInCache(updated);
      });

      sock.on("chatroom:pin", (updated: ChatMessage) => {
        updateMessageInCache(updated);
        queryClient.invalidateQueries({ queryKey: PINNED_KEY });
      });

      sock.on("chatroom:delete", ({ messageId }: { messageId: string }) => {
        removeMessageFromCache(messageId);
      });

      sock.on("connect_error", (err: Error) => {
        console.error("Socket connection error:", err.message);
      });
    };

    connectSocket();

    return () => {
      mounted = false;
      setIsConnected(false);
      disconnectSocket();
    };
  }, [
    isAuthenticated,
    addMessageToCache,
    updateMessageInCache,
    removeMessageFromCache,
    queryClient,
  ]);

  const sendMessage = useCallback((content: string, replyToId?: string) => {
    const sock = socketRef.current;
    if (sock?.connected) {
      const payload: { content: string; replyTo?: { messageId: string } } = {
        content,
      };
      if (replyToId) {
        payload.replyTo = { messageId: replyToId };
      }
      sock.emit("chatroom:send", payload);
    }
  }, []);

  const sendReaction = useCallback((messageId: string, emoji: string) => {
    const sock = socketRef.current;
    if (sock?.connected) {
      sock.emit("chatroom:react", { messageId, emoji });
    }
  }, []);

  return {
    sendMessage,
    sendReaction,
    isConnected,
  };
}
