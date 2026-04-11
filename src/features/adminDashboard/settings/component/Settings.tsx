"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tab } from "../types/settings.types";

function PersonalInformationTab() {
  return (
    <div className="flex flex-col gap-5">
      {/* Profile Card */}
      <div className="flex items-center gap-3 rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
        <Avatar className="size-[120px]">
          <AvatarImage src="/avatar.png" alt="Demo Name" />
          <AvatarFallback className="bg-[#4f46e5] text-3xl font-semibold text-white">
            DN
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-[#0f172a]">Demo Name</h2>
          <p className="text-base text-[#64748b]">Super admin</p>
        </div>
      </div>

      {/* Personal Information Form */}
      <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-[#0f172a]">
            Personal Information
          </h3>
          <button className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#4338ca]">
            <Pencil className="size-5" />
            Edit
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-5">
          {/* First Name / Last Name */}
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-[#0f172a]">
                First Name
              </label>
              <div className="rounded-lg border border-[#e4e4e4] p-4">
                <span className="text-base text-[#64748b]">Demo</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-[#0f172a]">
                Last Name
              </label>
              <div className="rounded-lg border border-[#e4e4e4] p-4">
                <span className="text-base text-[#64748b]">Name</span>
              </div>
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
                  solace@example.com
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-[#0f172a]">
                Phone
              </label>
              <div className="rounded-lg border border-[#e4e4e4] p-4">
                <span className="text-base text-[#64748b]">(307) 555-0133</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-[#0f172a]">Bio</label>
            <div className="h-[146px] rounded-lg border border-[#e4e4e4] p-4">
              <p className="text-base leading-relaxed text-[#64748b]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChangePasswordTab() {
  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
      <h3 className="text-2xl font-bold text-[#0f172a]">Change Password</h3>

      <div className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-[#0f172a]">
            Current Password
          </label>
          <input
            type="password"
            placeholder="Enter current password"
            className="rounded-lg border border-[#e4e4e4] p-4 text-base text-[#0f172a] placeholder:text-[#64748b] focus:border-[#4f46e5] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-[#0f172a]">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="rounded-lg border border-[#e4e4e4] p-4 text-base text-[#0f172a] placeholder:text-[#64748b] focus:border-[#4f46e5] focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-[#0f172a]">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="rounded-lg border border-[#e4e4e4] p-4 text-base text-[#0f172a] placeholder:text-[#64748b] focus:border-[#4f46e5] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4">
          <button className="rounded-lg bg-[#4f46e5] px-8 py-3 text-base font-medium text-white transition-colors hover:bg-[#4338ca]">
            Update Password
          </button>
        </div>
      </div>
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
