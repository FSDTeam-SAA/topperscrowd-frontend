/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Cookie,
  Settings,
  ShieldCheck,
  Info,
  RefreshCw,
  CheckCircle,
  Mail,
  ChevronRight,
  ArrowRight,
  FileText,
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

export default function Cookies() {
  const lastUpdated = "May 9, 2026";

  const sections = [
    {
      id: "what-are-cookies",
      title: "What are cookies?",
      icon: <Cookie className="w-6 h-6 text-orange-500" />,
      content:
        "Cookies are small pieces of data stored in text files that are saved on your computer or other devices when websites are loaded in a browser. They are widely used to remember you and your preferences, either for a single visit or for multiple repeat visits.",
    },
    {
      id: "types",
      title: "What type of cookies do we use?",
      icon: <Info className="w-6 h-6 text-orange-500" />,
      content:
        "We use Necessary cookies to recognize your account and Functionality cookies to remember your preferences and customizations for future visits, ensuring a consistent and efficient experience.",
    },
    {
      id: "options",
      title: "What are your cookie options?",
      icon: <Settings className="w-6 h-6 text-orange-500" />,
      content:
        "If you don't like the idea of cookies, you can change your browser's settings to delete existing cookies and refuse new ones. You can learn more about managing cookies at internetcookies.com.",
    },
    {
      id: "changes",
      title: "Changes and amendments",
      icon: <RefreshCw className="w-6 h-6 text-orange-500" />,
      content:
        "We reserve the right to modify this Policy at any time. When we do, we will post a notification on the main page and send you an email. Revised versions are effective immediately upon posting.",
    },
    {
      id: "acceptance",
      title: "Acceptance of this policy",
      icon: <CheckCircle className="w-6 h-6 text-orange-500" />,
      content:
        "By accessing and using the Website and Services, you acknowledge that you have read this Policy and agree to all its terms and conditions. Continued use constitutes consent.",
    },
    {
      id: "contact",
      title: "Contacting us",
      icon: <Mail className="w-6 h-6 text-orange-500" />,
      content:
        "If you have any questions, concerns, or complaints regarding this Policy or the use of cookies, we encourage you to contact us directly via email.",
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
              <ShieldCheck className="w-3.5 h-3.5" />
              User Experience
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-zinc-900"
            >
              Cookie <br />
              <span className="text-orange-500">Policy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-3xl mx-auto text-lg md:text-xl text-zinc-500 leading-relaxed mb-8"
            >
              This policy describes what cookies are and how they&apos;re being
              used by{" "}
              <span className="text-zinc-900 font-semibold">
                Ka Thor&apos;ian
              </span>{" "}
              and its related services. We believe in total transparency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4 text-sm text-zinc-400"
            >
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Last Updated: {lastUpdated}
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-200" />
              <span>Version 1.1</span>
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

            {/* CTA Section - Spans full width on desktop */}
            <motion.div
              variants={fadeIn}
              className="lg:col-span-3 relative overflow-hidden rounded-[40px] border border-zinc-100 bg-zinc-50 p-8 md:p-14 group shadow-sm shadow-zinc-200/50 mt-4"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                <Cookie className="w-64 h-64 text-zinc-900 rotate-12" />
              </div>

              <div className="relative z-10 max-w-3xl">
                <div className="inline-block px-3 py-1 rounded-lg bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-lg shadow-orange-500/20">
                  Privacy Guaranteed
                </div>
                <h3 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-zinc-900">
                  Your browsing <br />
                  <span className="text-orange-500">is your business</span>
                </h3>
                <p className="text-zinc-500 leading-relaxed mb-10 text-lg md:text-xl">
                  We only use cookies that are absolutely necessary to provide
                  you with the best storytelling experience. No hidden tracking,
                  just pure immersion.
                </p>

                <div className="flex flex-wrap gap-5">
                  <Link
                    href="/dashboard"
                    className="px-10 py-4 rounded-2xl bg-zinc-900 text-white font-bold hover:bg-orange-500 transition-all hover:scale-105 flex items-center gap-2 group/btn shadow-xl shadow-zinc-900/10"
                  >
                    Back to Listening{" "}
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/privacy"
                    className="px-10 py-4 rounded-2xl bg-white border border-zinc-200 text-zinc-900 font-bold hover:bg-zinc-50 transition-all hover:border-zinc-300 shadow-sm"
                  >
                    Full Privacy Policy
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
                Questions about cookies? We're here to help:
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
