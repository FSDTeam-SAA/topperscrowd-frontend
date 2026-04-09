"use client";

import { useState, useEffect, useRef } from "react";
import { AuthButton } from "./AuthFormComponents";
import { useRouter, useSearchParams } from "next/navigation";
import { Clock } from "lucide-react";
import {
  verifyEmail,
  resendOtp,
  verifyForgotOtp,
  resendForgotOtp,
} from "../api/auth.api";
import { toast } from "sonner";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

function OTPInput({ value, onChange, length = 6 }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const otpArray = value
    .split("")
    .concat(Array(length - value.length).fill(""));

  const handleChange = (index: number, char: string) => {
    if (!/^[0-9]?$/.test(char)) return;
    const newOtp = otpArray.map((c, i) => (i === index ? char : c)).join("");
    onChange(newOtp);
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (pasted) {
      onChange(pasted);
      const focusIndex = Math.min(pasted.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex gap-4">
      {otpArray.map((char, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={char}
          onChange={(e) => handleChange(index, e.target.value)}
          onPaste={handlePaste}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !char && index > 0) {
              const newOtp = otpArray
                .map((c, i) => (i === index - 1 ? "" : c))
                .join("");
              onChange(newOtp);
              inputRefs.current[index - 1]?.focus();
            }
          }}
          placeholder="-"
          className="h-16 w-12 rounded border-2 border-white bg-transparent text-center text-2xl font-semibold text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none"
        />
      ))}
    </div>
  );
}

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const flow = searchParams.get("flow") || "signup";
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(179);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      if (flow === "forgot-password") {
        const response = await verifyForgotOtp(otp);
        toast.success(response.message || "OTP verified successfully");
        router.push("/auth/change-password");
      } else {
        const response = await verifyEmail(otp);
        toast.success(response.message || "Email verified successfully");
        router.push("/auth/login");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Verification failed",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);

    try {
      if (flow === "forgot-password") {
        await resendForgotOtp();
      } else {
        await resendOtp();
      }
      toast.success("OTP resent successfully");
      setOtp("");
      setTimeLeft(179);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to resend OTP",
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a]">
      <div className="w-[496px] space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Verify Email</h1>
          <p className="text-center text-base text-gray-400">
            {email
              ? `Enter OTP sent to ${email}`
              : "Enter OTP to verify your email address"}
          </p>
        </div>

        {/* OTP Input */}
        <div className="space-y-6">
          <OTPInput value={otp} onChange={setOtp} length={6} />

          {/* Timer and Resend */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </span>
            </div>

            <div className="text-sm text-white">
              Didn&apos;t get a code?{" "}
              <button
                onClick={handleResend}
                disabled={timeLeft > 0 || resending}
                className="font-semibold text-indigo-600 underline hover:text-indigo-400 disabled:text-gray-400 disabled:no-underline"
              >
                {resending ? "Resending..." : "Resend"}
              </button>
            </div>
          </div>
        </div>

        {/* Verify Button */}
        <AuthButton
          onClick={handleVerify}
          disabled={loading || otp.length !== 6}
        >
          {loading ? "Verifying..." : "Verify"}
        </AuthButton>
      </div>
    </div>
  );
}
