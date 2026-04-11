import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { UsersManagementResponse } from "../types/usersManagement.types";

function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

export async function fetchUsers(
  page: number = 1,
  limit: number = 10,
): Promise<UsersManagementResponse> {
  try {
    const { data } = await api.get<UsersManagementResponse>(
      `/admin-dashboard/users-management?page=${page}&limit=${limit}`,
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
