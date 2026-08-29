import React, { useState } from "react";
import { Instagram, Linkedin, Youtube, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSubscribe: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSubscribe }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer className="bg-black text-white border-t border-neutral-800 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 3-Column Footer Grid matching Layout.jpeg */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-neutral-800">
          {/* Left Column: Brand Logo, Mission & Pillars */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex flex-col text-left">
              <Logo variant="horizontal" theme="light" size="lg" />
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed max-w-sm">
              An independent media platform shaping the conversation across beauty, fashion &amp; culture.
            </p>

            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
              INDUSTRY INTELLIGENCE &bull; EDITORIAL &bull; EVENTS &bull; INNOVATION
            </div>
          </div>

          {/* Center Column: Stay in the know / Email Subscription */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif-luxury text-sm uppercase tracking-[0.2em] text-white font-semibold">
              STAY IN THE KNOW
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Insights, invites and intelligence delivered straight to you.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-neutral-900 border border-[#C5A059] text-xs text-[#E5D7BF]">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>You are on the executive intelligence list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 pt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-neutral-900 border border-neutral-700 text-white text-xs px-3.5 py-2.5 rounded-none focus:outline-none focus:border-white flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#9B334B] hover:bg-[#82273D] text-white text-[11px] font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-none transition-colors whitespace-nowrap"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Follow Us & Contact */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h4 className="font-serif-luxury text-sm uppercase tracking-[0.2em] text-white font-semibold mb-3">
                FOLLOW US
              </h4>
              <div className="flex items-center gap-4 text-white">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded transition-colors text-neutral-300 hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded transition-colors text-neutral-300 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded transition-colors text-neutral-300 hover:text-white"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded transition-colors text-neutral-300 hover:text-white text-xs font-bold"
                  aria-label="TikTok"
                >
                  &#9835;
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-serif-luxury text-sm uppercase tracking-[0.2em] text-white font-semibold mb-1">
                CONTACT
              </h4>
              <a
                href="mailto:hello@northavenuemedia.com"
                className="text-xs text-neutral-400 hover:text-white transition-colors"
              >
                hello@northavenuemedia.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, iWebNext attribution, and Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} North Avenue Media. All rights reserved.
          </div>

          <div className="text-center font-medium text-neutral-400">
            Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-neutral-200 hover:underline font-semibold">iWebNext</a>
          </div>

          <div className="flex items-center gap-6 uppercase tracking-[0.15em] text-[10px]">
            <a href="#hero" onClick={(e) => { e.preventDefault(); onNavigate("about"); }} className="hover:text-neutral-300 transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#hero" onClick={(e) => { e.preventDefault(); onNavigate("about"); }} className="hover:text-neutral-300 transition-colors">
              TERMS OF USE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
