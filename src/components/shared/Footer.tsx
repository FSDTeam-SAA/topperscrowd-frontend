import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  Product: [
    { name: "Browse", href: "/browse" },
    { name: "Library", href: "/library" },
  ],
  Legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Cookies", href: "/cookies" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com" },
  { name: "Instagram", href: "https://instagram.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="bg-[#fff8f5] ">
      <div className="mx-auto container px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-2">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={150}
                height={150}
              />
            </Link>
            <p className="text-sm text-slate-900">
              A better way to experience books. Listen anywhere, anytime.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <h4 className="font-serif text-2xl font-bold uppercase text-slate-900">
                {heading}
              </h4>
              <div className="flex flex-col gap-3 text-sm text-slate-500">
                {links.map((link) => (
                  <Link key={link.name} href={link.href}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-500 pt-4">
          <span className="text-xs text-slate-900">
            &copy; {new Date().getFullYear()} Ka Thorian. All rights reserved.
          </span>

          {/* Social Links */}
          <div className="flex gap-5 text-xs text-slate-900">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
