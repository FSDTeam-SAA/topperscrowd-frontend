"use client";

import { useState } from "react";
import { AuthInput, AuthButton } from "./AuthFormComponents";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forgotPassword } from "../api/auth.api";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);

    try {
      const response = await forgotPassword(email);
      toast.success(response.message || "OTP sent to your email");
      router.push(
        `/auth/verify-email?flow=forgot-password&email=${encodeURIComponent(email)}`,
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send OTP",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a]">
      <div className="w-[496px] space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Forgot Password</h1>
          <p className="text-center text-base text-gray-400">
            Enter your email to recover your password
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="hello@example.com"
            value={email}
            onChange={setEmail}
          />
        </div>

        {/* Send OTP Button */}
        <AuthButton onClick={handleSendOTP} disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
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
