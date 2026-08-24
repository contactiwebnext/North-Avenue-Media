import React, { useState, useEffect } from "react";
import { Search, Bookmark, Menu, X, Globe, Sparkles, ArrowRight } from "lucide-react";
import { BREAKING_TICKER_ITEMS } from "../data/mockData";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenSubscribe: () => void;
  bookmarksCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenSearch,
  onOpenBookmarks,
  onOpenSubscribe,
  bookmarksCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % BREAKING_TICKER_ITEMS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "editorial", label: "Editorial" },
    { id: "events", label: "Global Events" },
    { id: "insights", label: "Insights" },
    { id: "innovation", label: "Innovation" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Editorial Ticker Bar */}
      <div className="bg-[#121212] border-b border-[#C5A059]/15 text-[11px] text-[#C5A059] py-1.5 px-4 hidden md:flex items-center justify-between tracking-wider uppercase font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#C5A059]/15 text-[#FDFCF8] text-[10px] font-bold tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
            INTELLIGENCE DESK
          </span>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-300 truncate max-w-xl transition-opacity duration-500 font-sans">
            {BREAKING_TICKER_ITEMS[tickerIndex]}
          </span>
        </div>

        <div className="flex items-center gap-4 text-neutral-400 text-[10px]">
          <span className="flex items-center gap-1 text-[#E5D7BF]">
            <Globe className="w-3 h-3 text-[#C5A059]" />
            PARIS • MILAN • NEW YORK • TOKYO • DUBAI
          </span>
          <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#C5A059]/20 py-3 shadow-2xl shadow-black/80"
            : "bg-[#0A0A0A]/75 backdrop-blur-md border-b border-white/10 py-4.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Editorial Wordmark */}
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-3 group text-left"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display-luxury text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#FDFCF8] group-hover:text-[#C5A059] transition-colors">
                  NORTH AVENUE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mb-1 shadow-[0_0_8px_#C5A059]" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-medium -mt-0.5">
                MEDIA • INTELLIGENCE • EVENTS
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-medium uppercase tracking-[0.15em] text-neutral-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors hover:text-[#C5A059] ${
                    isActive ? "text-[#FDFCF8] font-semibold" : "text-neutral-400"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059] shadow-[0_0_8px_#C5A059]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action CTAs: Search, Bookmarks, Subscribe */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full text-neutral-300 hover:text-[#C5A059] hover:bg-white/5 transition-all"
              title="Search editorial coverage"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Bookmarks / Saved Stories */}
            <button
              onClick={onOpenBookmarks}
              className="p-2 relative rounded-full text-neutral-300 hover:text-[#C5A059] hover:bg-white/5 transition-all"
              title="Saved reading list"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarksCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C5A059] text-black font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Subscribe CTA Button */}
            <button
              onClick={onOpenSubscribe}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-gradient-to-r from-[#DFC17B] via-[#C5A059] to-[#9E7D3B] text-black text-xs font-bold uppercase tracking-wider hover:opacity-95 hover:shadow-[0_0_20px_rgba(197,160,89,0.35)] transition-all active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Subscribe</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#121212]/98 border-b border-[#C5A059]/20 px-6 py-6 mt-3 space-y-4 backdrop-blur-2xl">
            <div className="flex flex-col space-y-3 font-medium uppercase tracking-wider text-sm">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left py-2 border-b border-white/5 transition-colors ${
                    activeSection === link.id
                      ? "text-[#C5A059] font-bold"
                      : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  onOpenSubscribe();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-md bg-[#C5A059] text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(197,160,89,0.3)]"
              >
                <span>Join Executive Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
