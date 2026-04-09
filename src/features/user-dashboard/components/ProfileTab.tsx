"use client";

import { Mail, Phone, MapPin, Edit2 } from "lucide-react";

export default function ProfileTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">My Profile</h2>

        {/* Profile Information */}
        <div className="rounded-lg border border-gray-200 bg-white p-8">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Marcos Alonso
              </h3>
              <p className="text-slate-600">Premium Member since 2024</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </button>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 border-t border-gray-200 pt-8">
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-slate-600" />
              <div>
                <p className="text-sm text-slate-600">Email Address</p>
                <p className="text-slate-900 font-medium">marcos@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-slate-600" />
              <div>
                <p className="text-sm text-slate-600">Phone Number</p>
                <p className="text-slate-900 font-medium">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-slate-600" />
              <div>
                <p className="text-sm text-slate-600">Address</p>
                <p className="text-slate-900 font-medium">
                  123 Main St, New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-8">
          <h3 className="mb-6 text-lg font-bold text-slate-900">
            Communication Preferences
          </h3>

          <div className="space-y-4">
            {[
              { label: "Email Notifications", enabled: true },
              { label: "Order Updates", enabled: true },
              { label: "Marketing Emails", enabled: false },
              { label: "SMS Notifications", enabled: false },
            ].map((pref, index) => (
              <label key={index} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked={pref.enabled}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-slate-900">{pref.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
