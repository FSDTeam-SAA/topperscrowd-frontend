"use client";

import { useRef, useState } from "react";
import { Pencil, Loader2, Eye, EyeOff, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tab, UpdateProfilePayload } from "../types/settings.types";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useMyProfile, useUpdateProfile } from "../hooks/useSettings";

function PersonalInformationTab() {
  const { data: profileData, isLoading: isProfileLoading } = useMyProfile();
  const updateProfileMutation = useUpdateProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const profile = profileData?.data;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    location: "",
    postalCode: "",
    dateOfBirth: "",
  });

  const handleEdit = () => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone || "",
        street: profile.street || "",
        location: profile.location || "",
        postalCode: profile.postalCode || "",
        dateOfBirth: profile.dateOfBirth
          ? profile.dateOfBirth.split("T")[0]
          : "",
      });
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImagePreview(null);
    setSelectedImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const payload: UpdateProfilePayload = {};

    if (formData.firstName) payload.firstName = formData.firstName;
    if (formData.lastName) payload.lastName = formData.lastName;
    if (formData.phone) payload.phone = formData.phone;
    if (formData.street) payload.street = formData.street;
    if (formData.location) payload.location = formData.location;
    if (formData.postalCode) payload.postalCode = formData.postalCode;
    if (formData.dateOfBirth) payload.dateOfBirth = formData.dateOfBirth;
    if (selectedImage) payload.image = selectedImage;

    updateProfileMutation.mutate(payload, {
      onSuccess: () => {
        setIsEditing(false);
        setImagePreview(null);
        setSelectedImage(null);
      },
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const initials = profile
    ? `${profile.firstName?.charAt(0) || ""}${profile.lastName?.charAt(0) || ""}`
    : "";

  const displayName = profile
    ? `${profile.firstName || ""} ${profile.lastName || ""}`.trim()
    : "";

  const avatarUrl = imagePreview || profile?.image?.url;

  const inputClass =
    "w-full rounded-lg border border-[#e4e4e4] p-4 text-base text-[#0f172a] placeholder:text-[#64748b] focus:border-[#4f46e5] focus:outline-none";

  if (isProfileLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-[#4f46e5]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Profile Card */}
      <div className="flex items-center gap-3 rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
        <div className="relative">
          <Avatar className="size-[120px]">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="bg-[#4f46e5] text-3xl font-semibold text-white">
              {initials || "U"}
            </AvatarFallback>
          </Avatar>
          {isEditing && (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex size-9 items-center justify-center rounded-full bg-[#4f46e5] text-white shadow-md transition-colors hover:bg-[#4338ca]"
              >
                <Camera className="size-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-[#0f172a]">
            {displayName || "User"}
          </h2>
          <p className="text-base capitalize text-[#64748b]">
            {profile?.role || "User"}
          </p>
        </div>
      </div>

      {/* Personal Information Form */}
      <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-[#0f172a]">
            Personal Information
          </h3>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#4338ca]"
            >
              <Pencil className="size-5" />
              Edit
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleCancel}
                className="rounded-lg border border-[#e4e4e4] px-6 py-3 text-base font-medium text-[#64748b] transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={updateProfileMutation.isPending}
                className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#4338ca] disabled:opacity-50"
              >
                {updateProfileMutation.isPending && (
                  <Loader2 className="size-5 animate-spin" />
                )}
                Save
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-5">
          {/* First Name / Last Name */}
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-[#0f172a]">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  className={inputClass}
                />
              ) : (
                <div className="rounded-lg border border-[#e4e4e4] p-4">
                  <span className="text-base text-[#64748b]">
                    {profile?.firstName || "-"}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-[#0f172a]">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  className={inputClass}
                />
              ) : (
                <div className="rounded-lg border border-[#e4e4e4] p-4">
                  <span className="text-base text-[#64748b]">
                    {profile?.lastName || "-"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Email / Phone */}
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-[#0f172a]">
                Email Address
              </label>
              <div className="rounded-lg border border-[#e4e4e4] p-4">
                <span className="text-base text-[#64748b]">
                  {profile?.email || "-"}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-[#0f172a]">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className={inputClass}
                />
              ) : (
                <div className="rounded-lg border border-[#e4e4e4] p-4">
                  <span className="text-base text-[#64748b]">
                    {profile?.phone || "-"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Street / Location */}
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-[#0f172a]">
                Street
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleChange("street", e.target.value)}
                  placeholder="Enter street address"
                  className={inputClass}
                />
              ) : (
                <div className="rounded-lg border border-[#e4e4e4] p-4">
                  <span className="text-base text-[#64748b]">
                    {profile?.street || "-"}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-[#0f172a]">
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="Enter location"
                  className={inputClass}
                />
              ) : (
                <div className="rounded-lg border border-[#e4e4e4] p-4">
                  <span className="text-base text-[#64748b]">
                    {profile?.location || "-"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Postal Code / Date of Birth */}
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-[#0f172a]">
                Postal Code
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                  placeholder="Enter postal code"
                  className={inputClass}
                />
              ) : (
                <div className="rounded-lg border border-[#e4e4e4] p-4">
                  <span className="text-base text-[#64748b]">
                    {profile?.postalCode || "-"}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-[#0f172a]">
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  className={inputClass}
                />
              ) : (
                <div className="rounded-lg border border-[#e4e4e4] p-4">
                  <span className="text-base text-[#64748b]">
                    {profile?.dateOfBirth
                      ? new Date(profile.dateOfBirth).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )
                      : "-"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChangePasswordTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Failed to change password",
        );
      } else {
        toast.error("Failed to change password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[#e4e4e4] p-4 pr-12 text-base text-[#0f172a] placeholder:text-[#64748b] focus:border-[#4f46e5] focus:outline-none";

  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
      <h3 className="text-2xl font-bold text-[#0f172a]">Change Password</h3>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-[#0f172a]">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputClass}
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#0f172a]"
            >
              {showCurrent ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-[#0f172a]">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputClass}
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#0f172a]"
              >
                {showNew ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-[#0f172a]">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#0f172a]"
              >
                {showConfirm ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-8 py-3 text-base font-medium text-white transition-colors hover:bg-[#4338ca] disabled:opacity-50"
          >
            {isLoading && <Loader2 className="size-5 animate-spin" />}
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-[#1e2a2a]">Settings</h1>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-5">
        <button
          onClick={() => setActiveTab("personal")}
          className={cn(
            "rounded-lg border p-4 text-center text-2xl font-medium transition-colors",
            activeTab === "personal"
              ? "border-white bg-[#4f46e5] text-[#f1f1f1]"
              : "border-[#4f46e5] bg-white text-[#4f46e5] hover:bg-[#4f46e5]/5",
          )}
        >
          Personal Information
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={cn(
            "rounded-lg border p-4 text-center text-2xl font-medium transition-colors",
            activeTab === "password"
              ? "border-white bg-[#4f46e5] text-[#f1f1f1]"
              : "border-[#4f46e5] bg-white text-[#4f46e5] hover:bg-[#4f46e5]/5",
          )}
        >
          Change Password
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "personal" ? (
        <PersonalInformationTab />
      ) : (
        <ChangePasswordTab />
      )}
    </div>
  );
}
