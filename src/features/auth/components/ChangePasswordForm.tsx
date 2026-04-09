"use client";

import { useState } from "react";
import { AuthInput, AuthButton } from "./AuthFormComponents";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { resetPassword } from "../api/auth.api";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword(newPassword);
      toast.success(response.message || "Password reset successfully");
      router.push("/auth/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to change password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a]">
      <div className="w-full max-w-[496px] px-4 md:px-0 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Change Password</h1>
          <p className="text-center text-base text-gray-400">
            Create a new password for your account
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <AuthInput
            label="Create New Password"
            type="password"
            placeholder="Enter password"
            value={newPassword}
            onChange={setNewPassword}
          />

          <AuthInput
            label="Confirm New Password"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </div>

        {/* Change Password Button */}
        <AuthButton onClick={handleChangePassword} disabled={loading}>
          {loading ? "Changing..." : "Change Password"}
        </AuthButton>

        {/* Back to Login */}
        <p className="text-center text-base text-white">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="font-bold text-indigo-600 hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
