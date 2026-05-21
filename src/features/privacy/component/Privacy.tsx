"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileText,
  ChevronRight,
  ArrowRight,
  Database,
  Eye,
  CreditCard,
  Settings,
  Share2,
  Globe,
  MapPin,
  UserCheck,
  Cookie,
  Users,
  Ban,
  Mail,
  Shield,
  AlertTriangle,
  RefreshCw,
  CheckCircle,
  Phone,
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

export default function PrivacyPolicy() {
  const lastUpdated = "May 2026";

  const sections = [
    {
      id: "collection",
      title: "Collection of Personal Information",
      icon: <Database className="w-6 h-6 text-orange-500" />,
      content: `We collect personal information when you register on our site, place an order, subscribe to our newsletter, respond to a survey, fill out a form, or enter information on our site. The information collected includes your name, email address, mailing address, phone number, and credit card details.\n\nWe also collect information automatically when you visit our site, including your IP address, browser type, operating system, referring URLs, and pages visited. This is done using cookies and similar tracking technologies.`,
    },
    {
      id: "use",
      title: "Use and Processing of Collected Information",
      icon: <Eye className="w-6 h-6 text-orange-500" />,
      content: `We use the information we collect in various ways, including to:\n\n• Provide, operate, and maintain our website\n• Improve, personalize, and expand our website\n• Understand and analyze how you use our website\n• Develop new products, services, features, and functionality\n• Communicate with you, either directly or through one of our partners\n• Send you emails and process your transactions\n• Find and prevent fraud`,
    },
    {
      id: "payment",
      title: "Payment Information",
      icon: <CreditCard className="w-6 h-6 text-orange-500" />,
      content: `We use third-party payment processors to handle billing on our behalf. When you make a payment, your payment information is transmitted directly to our payment processors and is not stored on our servers. These processors are PCI DSS compliant and use industry-standard encryption to protect your data.`,
    },
    {
      id: "managing",
      title: "Managing Information",
      icon: <Settings className="w-6 h-6 text-orange-500" />,
      content: `You have control over your personal information. You can review and update your account details at any time through your profile settings. You may also request access to, correction of, or deletion of your personal data by contacting us. We will respond to your request within 30 days.`,
    },
    {
      id: "disclosure",
      title: "Disclosure of Information",
      icon: <Share2 className="w-6 h-6 text-orange-500" />,
      content: `We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers.\n\nWe may disclose your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.`,
    },
    {
      id: "transfer",
      title: "Transfer of Personal Information",
      icon: <Globe className="w-6 h-6 text-orange-500" />,
      content: `Your information may be transferred to and maintained on computers located outside of your state, province, country, or governmental jurisdiction where data protection laws may differ. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.`,
    },
    {
      id: "region",
      title: "Region-Specific Notices",
      icon: <MapPin className="w-6 h-6 text-orange-500" />,
      content: `Depending on your location, you may have additional rights under applicable privacy laws. Residents of the European Economic Area (EEA) have rights under GDPR including the right to access, rectify, and erase their data. California residents have rights under CCPA including the right to know, delete, and opt-out of the sale of personal information.`,
    },
    {
      id: "rights",
      title: "How to Exercise Your Rights",
      icon: <UserCheck className="w-6 h-6 text-orange-500" />,
      content: `To exercise any of your privacy rights, please contact our privacy team via the contact information below. We will acknowledge your request within 10 business days and fulfill it within 30 days, subject to identity verification and applicable legal exceptions.`,
    },
    {
      id: "cookies",
      title: "Cookies",
      icon: <Cookie className="w-6 h-6 text-orange-500" />,
      content: `Our website uses cookies to enhance your experience. Cookies are small files placed on your device that help us analyze web traffic and remember your preferences. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our site may not function properly.`,
    },
    {
      id: "children",
      title: "Privacy of Children",
      icon: <Users className="w-6 h-6 text-orange-500" />,
      content: `Our website is not directed to children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us and we will delete that information from our systems.`,
    },
    {
      id: "donotsell",
      title: "Do Not Sell My Personal Information",
      icon: <Ban className="w-6 h-6 text-orange-500" />,
      content: `We do not sell personal information to third parties. If you are a California resident and wish to opt out of the sale of personal information (as defined by the CCPA), you may submit a request using our Do Not Sell link or by contacting us directly.`,
    },
    {
      id: "email",
      title: "Email Marketing",
      icon: <Mail className="w-6 h-6 text-orange-500" />,
      content: `With your permission, we may send you emails about our products, services, and promotions. You may opt out of receiving any or all of these communications by clicking the unsubscribe link in any email we send. Please note that even after unsubscribing from marketing emails, we may still send you transactional emails related to your account.`,
    },
    {
      id: "security",
      title: "Information Security",
      icon: <Shield className="w-6 h-6 text-orange-500" />,
      content: `We take appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use SSL encryption for all data transmission and restrict access to personal data to employees who need it to perform their job functions.`,
    },
    {
      id: "breach",
      title: "Data Breach",
      icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
      content: `In the event of a data breach that is likely to result in a risk to the rights and freedoms of individuals, we will notify the relevant supervisory authority within 72 hours of becoming aware of the breach. Affected individuals will be notified without undue delay when the breach is likely to result in a high risk to their rights and freedoms.`,
    },
    {
      id: "changes",
      title: "Changes and Amendments",
      icon: <RefreshCw className="w-6 h-6 text-orange-500" />,
      content: `We reserve the right to modify this privacy policy at any time. We will notify you of any changes by posting the new policy on this page and updating the effective date. We encourage you to review this policy periodically. Your continued use of the website after changes are posted constitutes your acceptance of those changes.`,
    },
    {
      id: "acceptance",
      title: "Acceptance of This Policy",
      icon: <CheckCircle className="w-6 h-6 text-orange-500" />,
      content: `By using this website, you signify your acceptance of this Privacy Policy. If you do not agree to this policy, please do not use our site. Your continued use of the site following the posting of changes to this policy will be deemed your acceptance of those changes.`,
    },
    {
      id: "contacting",
      title: "Contacting Us",
      icon: <Phone className="w-6 h-6 text-orange-500" />,
      content: `If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this website, please contact us at:\n\nKa Thorian Publishing LLC\nEmail: privacy@kathorian.com`,
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
              At{" "}
              <span className="text-zinc-900 font-semibold">
                Ka Thor&apos;ian
              </span>
              , we respect your privacy and are committed to protecting your
              personal data. This policy explains how we collect, use, and
              safeguard your information.
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
                <p className="text-zinc-500 leading-relaxed text-sm md:text-base flex-grow whitespace-pre-line">
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
