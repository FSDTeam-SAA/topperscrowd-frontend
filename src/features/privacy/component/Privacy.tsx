"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  Database,
  Lock,
  RefreshCw,
  UserCheck,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Privacy() {
  const lastUpdated = "May 10, 2026";

  const sections = [
    {
      id: "welcome",
      title: "Welcome to Ka Thorian",
      icon: <Shield className="w-6 h-6 text-orange-500" />,
      content:
        "This Privacy Policy explains how we collect, use, and protect your information when you use our platform, listen to audio stories, browse our library, or interact with our services. We are committed to ensuring that your privacy is protected.",
    },
    {
      id: "collection",
      title: "Information We Collect",
      icon: <Database className="w-6 h-6 text-orange-500" />,
      content:
        "We may collect information such as your name and email address, account and profile information, listening activity and preferences, device, browser, and usage analytics, as well as payment and subscription details.",
    },
    {
      id: "usage",
      title: "How We Use Your Information",
      icon: <Eye className="w-6 h-6 text-orange-500" />,
      content:
        "Your information helps us provide and improve our audio experience, personalize recommendations and content, maintain platform security and performance, send important updates, and respond to support requests.",
    },
    {
      id: "protection",
      title: "Data Protection",
      icon: <Lock className="w-6 h-6 text-orange-500" />,
      content:
        "We implement industry-standard security measures to protect your data from unauthorized access, misuse, or disclosure. While no system is completely secure, we continuously work to safeguard your information.",
    },
    {
      id: "rights",
      title: "Your Rights",
      icon: <UserCheck className="w-6 h-6 text-orange-500" />,
      content:
        "You may request access, correction, or deletion of your personal information at any time by contacting our support team. We respect your control over your personal data.",
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      icon: <RefreshCw className="w-6 h-6 text-orange-500" />,
      content:
        "We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy occasionally.",
    },
  ];

  return (
    <div className="bg-[#FFFFFF] text-zinc-900 min-h-screen font-sans selection:bg-orange-500/20">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-orange-100/50 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-50/50 blur-[100px] rounded-full" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-orange-50/30 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[11px] font-bold tracking-wider uppercase text-orange-600 mb-8 shadow-sm"
            >
              <Shield className="w-3.5 h-3.5" />
              Privacy Center
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-zinc-900"
            >
              Your data, <br />
              <span className="text-orange-500">completely protected.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-500 leading-relaxed mb-8"
            >
              At <span className="text-zinc-900 font-semibold">Ka Thorian</span>
              , we believe immersive storytelling should come with transparency
              and absolute respect for your privacy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4 text-sm text-zinc-400"
            >
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" /> Last Updated:{" "}
                {lastUpdated}
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-200" />
              <span>Version 2.0</span>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-6xl mx-auto px-6 pb-32">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {sections.map((section) => (
              <motion.div
                key={section.id}
                variants={fadeIn}
                whileHover={{ y: -8 }}
                className="group p-8 rounded-[32px] border border-zinc-100 bg-white hover:border-orange-200 hover:shadow-[0_20px_50px_rgba(255,139,54,0.12)] transition-all duration-500 flex flex-col h-full shadow-sm shadow-zinc-200/50"
              >
                <div className="mb-6 p-4 rounded-2xl bg-orange-50 border border-orange-100 w-fit group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 text-orange-500">
                  {React.cloneElement(
                    section.icon as React.ReactElement<{ className?: string }>,
                    {
                      className:
                        "w-6 h-6 group-hover:text-white transition-colors duration-500",
                    },
                  )}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-orange-600 transition-colors">
                  {section.title}
                </h3>
                <p className="text-zinc-500 leading-relaxed text-sm md:text-base flex-grow">
                  {section.content}
                </p>
              </motion.div>
            ))}

            {/* Featured Experience - Spans full width on desktop */}
            <motion.div
              variants={fadeIn}
              className="lg:col-span-3 relative overflow-hidden rounded-[40px] border border-zinc-100 bg-zinc-50 p-8 md:p-14 group shadow-sm shadow-zinc-200/50 mt-4"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                <Shield className="w-64 h-64 text-zinc-900 rotate-12" />
              </div>

              <div className="relative z-10 max-w-3xl">
                <div className="inline-block px-3 py-1 rounded-lg bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-lg shadow-orange-500/20">
                  Privacy First
                </div>
                <h3 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-zinc-900">
                  The Midnight Archivist <br />
                  <span className="text-orange-500">Experience</span>
                </h3>
                <p className="text-zinc-500 leading-relaxed mb-10 text-lg md:text-xl">
                  Journey into the heart of a forgotten city where memories are
                  traded like currency. A cinematic audio experience narrated by
                  Julian Vane, built with total data anonymity.
                </p>

                <div className="flex flex-wrap gap-5">
                  <Link
                    href="/dashboard"
                    className="px-10 py-4 rounded-2xl bg-zinc-900 text-white font-bold hover:bg-orange-500 transition-all hover:scale-105 flex items-center gap-2 group/btn shadow-xl shadow-zinc-900/10"
                  >
                    Start Listening
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/category"
                    className="px-10 py-4 rounded-2xl bg-white border border-zinc-200 text-zinc-900 font-bold hover:bg-zinc-50 transition-all hover:border-zinc-300 shadow-sm"
                  >
                    Browse Library
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-24 text-center"
          >
            <div className="inline-block p-8 rounded-[32px] bg-zinc-50 border border-zinc-100 max-w-2xl w-full">
              <p className="text-zinc-500 text-sm font-medium">
                If you have any questions regarding this Privacy Policy, please
                contact us at:
              </p>
              <p className="mt-3 text-xl text-orange-500 font-bold hover:underline cursor-pointer decoration-2 underline-offset-4">
                stevegroff@kathorianpublishingllc.com
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
