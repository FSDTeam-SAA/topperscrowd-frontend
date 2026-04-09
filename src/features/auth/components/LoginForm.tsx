"use client";

import { useState } from "react";
import { AuthInput, AuthButton, AuthCheckbox } from "./AuthFormComponents";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Logged in successfully");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a]">
      <div className="w-full max-w-[496px] px-4 md:px-0 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Welcome</h1>
          <p className="text-center text-base text-gray-400">
            Sign in to oversee accounts, listings, and updates
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="space-y-4">
            <AuthInput
              label="Email Address"
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={setEmail}
            />

            <AuthInput
              label="Password"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={setPassword}
            />
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex items-center justify-between">
            <AuthCheckbox
              label="Remember me"
              checked={rememberMe}
              onChange={setRememberMe}
            />
            <Link
              href="/auth/forgot-password"
              className="text-sm font-semibold text-white underline hover:text-indigo-400"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Login Button */}
        <AuthButton onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </AuthButton>

        {/* Sign Up Link */}
        <p className="text-center text-base text-white">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-bold text-indigo-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
