"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileText,
  ChevronRight,
  ArrowRight,
  Scale,
  UserCheck,
  CreditCard,
  FileCheck,
  Link as LinkIcon,
  Shield,
  RefreshCw,
  CheckCircle,
  Mail,
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

export default function Terms() {
  const lastUpdated = "May 9, 2026";

  const sections = [
    {
      id: "accounts",
      title: "Accounts and membership",
      icon: <UserCheck className="w-6 h-6 text-orange-500" />,
      content: `If you create an account on the Website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may monitor and review new accounts before you may sign in and start using the Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration.`,
    },
    {
      id: "billing",
      title: "Billing and payments",
      icon: <CreditCard className="w-6 h-6 text-orange-500" />,
      content: `You shall pay all fees or charges to your account in accordance with the fees, charges, and billing terms in effect at the time a fee or charge is due and payable. If, in our judgment, your purchase constitutes a high-risk transaction, we will require you to provide us with a copy of your valid government-issued photo identification, and possibly a copy of a recent bank statement for the credit or debit card used for the purchase. We reserve the right to change product pricing at any time. We also reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the email and/or billing address/phone number provided at the time the order was made.`,
    },
    {
      id: "accuracy",
      title: "Accuracy of information",
      icon: <FileCheck className="w-6 h-6 text-orange-500" />,
      content: `Occasionally there may be information on the Website that contains typographical errors, inaccuracies or omissions that may relate to promotions and offers. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information on the Website or Services is inaccurate at any time without prior notice (including after you have submitted your order). We undertake no obligation to update, amend or clarify information on the Website including, without limitation, pricing information, except as required by law. No specified update or refresh date applied on the Website should be taken to indicate that all information on the Website or Services has been modified or updated.`,
    },
    {
      id: "links",
      title: "Links to other resources",
      icon: <LinkIcon className="w-6 h-6 text-orange-500" />,
      content: `Although the Website and Services may link to other resources (such as websites, mobile applications, etc.), we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked resource, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their resources. We do not assume any responsibility or liability for the actions, products, services, and content of any other third parties. You should carefully review the legal statements and other conditions of use of any resource which you access through a link on the Website. Your linking to any other off-site resources is at your own risk.`,
    },
    {
      id: "intellectual",
      title: "Intellectual property rights",
      icon: <Shield className="w-6 h-6 text-orange-500" />,
      content: `"Intellectual Property Rights" means all present and future rights conferred by statute, common law or equity in or in relation to any copyright and related rights, trademarks, designs, patents, inventions, goodwill and the right to sue for passing off, rights to inventions, rights to use, and all other intellectual property rights, in each case whether registered or unregistered and including all applications and rights to apply for and be granted, rights to claim priority from, such rights and all similar or equivalent rights or forms of protection and any other results of intellectual activity which subsist or will subsist now or in the future in any part of the world. This Agreement does not transfer to you any intellectual property owned by Ka Thor'ian publishing LLC or third parties, and all rights, titles, and interests in and to such property will remain (as between the parties) solely with Ka Thor'ian publishing LLC. All trademarks, service marks, graphics and logos used in connection with the Website and Services, are trademarks or registered trademarks of Ka Thor'ian publishing LLC or its licensors. Other trademarks, service marks, graphics and logos used in connection with the Website and Services may be the trademarks of other third parties. Your use of the Website and Services grants you no right or license to reproduce or otherwise use any of Ka Thor'ian publishing LLC or third party trademarks.`,
    },
    {
      id: "changes",
      title: "Changes and amendments",
      icon: <RefreshCw className="w-6 h-6 text-orange-500" />,
      content: `We reserve the right to modify this Agreement or its terms related to the Website and Services at any time at our discretion. When we do, we will send you an email to notify you. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.\nAn updated version of this Agreement will be effective immediately upon the posting of the revised Agreement unless otherwise specified. Your continued use of the Website and Services after the effective date of the revised Agreement (or such other act specified at that time) will constitute your consent to those changes.`,
    },
    {
      id: "acceptance",
      title: "Acceptance of these terms",
      icon: <CheckCircle className="w-6 h-6 text-orange-500" />,
      content: `You acknowledge that you have read this Agreement and agree to all its terms and conditions. By accessing and using the Website and Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to access or use the Website and Services.`,
    },
    {
      id: "contact",
      title: "Contacting us",
      icon: <Mail className="w-6 h-6 text-orange-500" />,
      content: `If you have any questions, concerns, or complaints regarding this Agreement, we encourage you to contact us using the details below:\n\nstevegroff@kathorianpublishingllc.com`,
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
              <Scale className="w-3.5 h-3.5" />
              Legal Framework
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-zinc-900"
            >
              Terms of <br />
              <span className="text-orange-500">Service</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-500 leading-relaxed mb-8"
            >
              Please read these terms carefully before using the{" "}
              <span className="text-zinc-900 font-semibold">
                Ka Thor&apos;ian
              </span>{" "}
              platform. They govern your relationship with our services.
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
              <span>Version 1.2</span>
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

            {/* CTA Section - Spans full width on desktop */}
            <motion.div
              variants={fadeIn}
              className="lg:col-span-3 relative overflow-hidden rounded-[40px] border border-zinc-100 bg-zinc-50 p-8 md:p-14 group shadow-sm shadow-zinc-200/50 mt-4"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                <Scale className="w-64 h-64 text-zinc-900 rotate-12" />
              </div>

              <div className="relative z-10 max-w-3xl">
                <div className="inline-block px-3 py-1 rounded-lg bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-lg shadow-orange-500/20">
                  Ready to Listen?
                </div>
                <h3 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-zinc-900">
                  Join the <span className="text-orange-500">Ka Thorian</span>{" "}
                  <br />
                  Community Today
                </h3>
                <p className="text-zinc-500 leading-relaxed mb-10 text-lg md:text-xl">
                  By using our platform, you agree to these terms. Dive into a
                  world of cinematic audio storytelling and immersive
                  experiences.
                </p>

                <div className="flex flex-wrap gap-5">
                  <Link
                    href="/dashboard"
                    className="px-10 py-4 rounded-2xl bg-zinc-900 text-white font-bold hover:bg-orange-500 transition-all hover:scale-105 flex items-center gap-2 group/btn shadow-xl shadow-zinc-900/10"
                  >
                    Get Started{" "}
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/privacy"
                    className="px-10 py-4 rounded-2xl bg-white border border-zinc-200 text-zinc-900 font-bold hover:bg-zinc-50 transition-all hover:border-zinc-300 shadow-sm"
                  >
                    Privacy Policy
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
                Have questions about our terms? Reach out to our legal team:
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
