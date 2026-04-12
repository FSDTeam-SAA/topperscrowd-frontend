export type Tab = "personal" | "password";

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
  phone?: string;
  street?: string;
  location?: string;
  postalCode?: string;
  dateOfBirth?: string;
  image?: {
    public_id: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: UserProfile;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  street?: string;
  location?: string;
  postalCode?: string;
  dateOfBirth?: string;
  image?: File;
}
