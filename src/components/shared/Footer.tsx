import Link from "next/link";

const footerLinks = {
  Product: ["Browse", "Library"],
  // Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

const socialLinks = ["Twitter", "Instagram", "LinkedIn"];

export default function Footer() {
  return (
    <footer className="bg-[#fff8f5] ">
      <div className="mx-auto container px-6 py-16">
        <div className="grid grid-cols-5 gap-8 mb-12">
          <div className="col-span-3 flex flex-col gap-2">
            <h2 className="font-serif text-4xl font-bold text-slate-900">
              Ka Thorian
            </h2>
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
                  <Link key={link} href="#">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-slate-500 pt-4">
          <span className="text-xs text-slate-900">
            &copy; 2026 Ka Thorian. All rights reserved.
          </span>
          <div className="flex gap-5 text-xs text-slate-900">
            {socialLinks.map((link) => (
              <Link key={link} href="#">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
