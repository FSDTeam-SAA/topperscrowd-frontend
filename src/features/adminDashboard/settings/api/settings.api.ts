import { api } from "@/lib/api";
import { AxiosError } from "axios";
import {
  UpdateProfilePayload,
  UserProfileResponse,
} from "../types/settings.types";

function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

export async function fetchMyProfile(): Promise<UserProfileResponse> {
  try {
    const { data } = await api.get<UserProfileResponse>("/user/my-profile");
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function updateProfile(
  payload: UpdateProfilePayload,
): Promise<void> {
  try {
    const formData = new FormData();

    if (payload.firstName) formData.append("firstName", payload.firstName);
    if (payload.lastName) formData.append("lastName", payload.lastName);
    if (payload.phone) formData.append("phone", payload.phone);
    if (payload.street) formData.append("street", payload.street);
    if (payload.location) formData.append("location", payload.location);
    if (payload.postalCode) formData.append("postalCode", payload.postalCode);
    if (payload.dateOfBirth)
      formData.append("dateOfBirth", payload.dateOfBirth);
    if (payload.image) formData.append("image", payload.image);

    await api.put("/user/update-profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
