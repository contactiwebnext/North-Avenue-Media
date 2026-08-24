import React from "react";
import { Sparkles, Phone, Mail, Globe, ArrowUpRight } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSubscribe: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSubscribe }) => {
  return (
    <footer className="bg-[#050507] border-t border-[#C5A059]/20 pt-16 pb-12 text-center text-xs text-neutral-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="font-display-luxury text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#FDFCF8]">
              NORTH AVENUE
            </span>
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
          </div>

          <p className="font-serif-luxury text-base sm:text-lg text-[#E5D7BF] italic">
            “The voice driving beauty’s next era in media, global events, industry insights, and innovation.”
          </p>

          <p className="text-xs text-neutral-400 leading-relaxed max-w-lg">
            Independent global intelligence bureau reporting across luxury fashion, cellular biotechnology, haute parfumerie, and private capital dynamics.
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 uppercase tracking-[0.15em] text-[11px] font-medium text-neutral-300">
          <button onClick={() => onNavigate("hero")} className="hover:text-[#C5A059] transition-colors">
            Home
          </button>
          <button onClick={() => onNavigate("about")} className="hover:text-[#C5A059] transition-colors">
            About
          </button>
          <button onClick={() => onNavigate("editorial")} className="hover:text-[#C5A059] transition-colors">
            Editorial
          </button>
          <button onClick={() => onNavigate("events")} className="hover:text-[#C5A059] transition-colors">
            Global Events
          </button>
          <button onClick={() => onNavigate("insights")} className="hover:text-[#C5A059] transition-colors">
            Insights
          </button>
          <button onClick={() => onNavigate("innovation")} className="hover:text-[#C5A059] transition-colors">
            Innovation
          </button>
          <button onClick={() => onNavigate("contact")} className="hover:text-[#C5A059] transition-colors">
            Contact
          </button>
        </div>

        {/* Direct Contacts & Global Bureau Lines */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-300 pt-4 border-t border-white/5">
          <a
            href="tel:+12028768594"
            className="flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>+1 202-876-8594</span>
          </a>

          <span className="text-neutral-600 hidden sm:inline">•</span>

          <a
            href="mailto:thenorthavenuemedia@gmail.com"
            className="flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>thenorthavenuemedia@gmail.com</span>
          </a>

          <span className="text-neutral-600 hidden sm:inline">•</span>

          <span className="flex items-center gap-1.5 text-neutral-400">
            <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Paris • New York • Milan • Tokyo • Dubai • London</span>
          </span>
        </div>

        {/* Center-Aligned Requirement Text & Copyright */}
        <div className="pt-8 border-t border-white/5 space-y-3">
          <div className="text-sm font-medium text-neutral-300">
            Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-[#C5A059] hover:underline font-semibold">iWebNext</a>
          </div>

          <p className="text-[11px] text-neutral-500">
            © {new Date().getFullYear()} North Avenue Media LLC. All editorial rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
