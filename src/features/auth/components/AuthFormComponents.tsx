"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface AuthInputProps {
  label?: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function AuthInput({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-white">{label}</label>
      )}
      <div className="relative flex items-center">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded border border-gray-600 bg-transparent px-3 py-3 text-base text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-400 hover:text-white"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function AuthCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 cursor-pointer rounded border border-white accent-indigo-600"
      />
      <span className="text-sm text-white">{label}</span>
    </label>
  );
}

export function AuthButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-lg bg-indigo-600 py-3 text-base font-bold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function AuthLink({
  text,
  linkText,
  href,
  onClick,
}: {
  text: string;
  linkText: string;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <p className="text-center text-base text-white">
      {text}{" "}
      <button
        onClick={onClick}
        className="font-bold text-indigo-600 hover:underline"
      >
        {linkText}
      </button>
    </p>
  );
}
