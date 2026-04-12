export interface ChatReaction {
  userId: string;
  emoji: string;
}

export interface ReplyTo {
  messageId: string;
  senderName: string;
  contentPreview: string;
}

export interface ChatMessage {
  _id: string;
  senderId: string;
  senderName: string;
  senderRole: "user" | "admin";
  content: string;
  isPinned: boolean;
  isDeleted: boolean;
  pinnedBy?: string;
  replyTo?: ReplyTo;
  reactions: ChatReaction[];
  createdAt: string;
  updatedAt: string;
}

export interface SendMessagePayload {
  content: string;
  replyTo?: {
    messageId: string;
  };
}

export interface ReactToMessagePayload {
  emoji: string;
}

export interface GetMessagesParams {
  page?: number;
  limit?: number;
}
