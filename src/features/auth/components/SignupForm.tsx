"use client";

import { useState } from "react";
import { AuthInput, AuthButton } from "./AuthFormComponents";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "../api/auth.api";
import { toast } from "sonner";

export default function SignupForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser({
        firstName,
        lastName,
        email,
        password,
      });

      toast.success(
        response.message || "Account created! Please verify your email.",
      );
      router.push(
        `/auth/verify-email?flow=signup&email=${encodeURIComponent(email)}`,
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Signup failed. Please try again.",
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
          <h1 className="text-4xl font-bold text-white">Create Your Account</h1>
          <p className="text-center text-base text-gray-400">
            Step into the future of growth — Join ToppersCrowd today
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <AuthInput
              label="First Name"
              type="text"
              placeholder="Name Here"
              value={firstName}
              onChange={setFirstName}
            />
            <AuthInput
              label="Last Name"
              type="text"
              placeholder="Name Here"
              value={lastName}
              onChange={setLastName}
            />
          </div>

          <AuthInput
            label="Email Address"
            type="email"
            placeholder="hello@example.com"
            value={email}
            onChange={setEmail}
          />

          <AuthInput
            label="Create Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={setPassword}
          />

          <AuthInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </div>

        {/* Signup Button */}
        <AuthButton onClick={handleSignup} disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </AuthButton>

        {/* Login Link */}
        <p className="text-center text-base text-white">
          Already have an account?{" "}
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
