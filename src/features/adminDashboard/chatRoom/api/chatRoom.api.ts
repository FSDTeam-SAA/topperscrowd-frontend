import { api } from "@/lib/api";
import { ApiResponse } from "@/types/shared";
import {
  ChatMessage,
  GetMessagesParams,
  SendMessagePayload,
  ReactToMessagePayload,
} from "../types/chatRoom.types";

export const getMessages = async (
  params?: GetMessagesParams,
): Promise<ApiResponse<ChatMessage[]>> => {
  const response = await api.get("/chatroom/messages", { params });
  return response.data;
};

export const getPinnedMessages = async (): Promise<
  ApiResponse<ChatMessage[]>
> => {
  const response = await api.get("/chatroom/messages/pinned");
  return response.data;
};

export const getMyReplies = async (): Promise<ApiResponse<ChatMessage[]>> => {
  const response = await api.get("/chatroom/messages/my-replies");
  return response.data;
};

export const sendMessageRest = async (
  payload: SendMessagePayload,
): Promise<ApiResponse<ChatMessage>> => {
  const response = await api.post("/chatroom/messages", payload);
  return response.data;
};

export const reactToMessage = async (
  messageId: string,
  payload: ReactToMessagePayload,
): Promise<ApiResponse<ChatMessage>> => {
  const response = await api.post(
    `/chatroom/messages/${messageId}/react`,
    payload,
  );
  return response.data;
};

export const pinMessage = async (
  messageId: string,
): Promise<ApiResponse<ChatMessage>> => {
  const response = await api.patch(`/chatroom/messages/${messageId}/pin`);
  return response.data;
};

export const deleteMessage = async (
  messageId: string,
): Promise<ApiResponse<void>> => {
  const response = await api.delete(`/chatroom/messages/${messageId}`);
  return response.data;
};
