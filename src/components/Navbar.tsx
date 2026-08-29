import React, { useState, useEffect } from "react";
import { Search, Bookmark, Menu, X, Globe, ArrowRight } from "lucide-react";
import { BREAKING_TICKER_ITEMS } from "../data/mockData";
import { Logo } from "./Logo";

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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % BREAKING_TICKER_ITEMS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Nav links matching Layout.jpeg: EDITORIAL, REPORTS, EVENTS, PARTNERSHIPS, ABOUT, CONTACT
  const navLinks = [
    { id: "editorial", label: "EDITORIAL" },
    { id: "insights", label: "REPORTS" },
    { id: "events", label: "EVENTS" },
    { id: "contact", label: "PARTNERSHIPS" },
    { id: "about", label: "ABOUT" },
    { id: "contact", label: "CONTACT" },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Editorial Ticker Bar */}
      <div className="bg-[#F8F8F8] border-b border-neutral-200 text-[11px] text-neutral-800 py-1.5 px-4 hidden md:flex items-center justify-between tracking-wider uppercase font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black text-white text-[10px] font-bold tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
            INTELLIGENCE DESK
          </span>
          <span className="text-neutral-300">|</span>
          <span className="text-neutral-700 truncate max-w-xl transition-opacity duration-500 font-sans text-xs">
            {BREAKING_TICKER_ITEMS[tickerIndex]}
          </span>
        </div>

        <div className="flex items-center gap-4 text-neutral-600 text-[10px]">
          <span className="flex items-center gap-1.5 text-neutral-800 font-medium">
            <Globe className="w-3 h-3 text-[#C5A059]" />
            PARIS • MILAN • NEW YORK • TOKYO • DUBAI
          </span>
          <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Main Navigation Bar - Matches Layout.jpeg */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-neutral-200 py-3 shadow-md shadow-black/5"
            : "bg-white border-b border-neutral-200/80 py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Monogram: Official NORTH AVENUE MEDIA Mark */}
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center group text-left transition-opacity hover:opacity-80"
            id="nav-brand-logo"
            aria-label="North Avenue Media Home"
          >
            <Logo variant="horizontal" theme="dark" size="md" />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id && idx === navLinks.findIndex(l => l.id === link.id);
              return (
                <button
                  key={`${link.id}-${idx}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors hover:text-neutral-500 ${
                    isActive ? "text-black font-bold" : "text-black/80"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action CTAs: Search, Bookmarks, and PARTNER WITH US */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full text-black hover:bg-neutral-100 transition-all"
              title="Search editorial coverage"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Bookmarks / Saved Stories */}
            <button
              onClick={onOpenBookmarks}
              className="p-2 relative rounded-full text-black hover:bg-neutral-100 transition-all"
              title="Saved reading list"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarksCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* PARTNER WITH US CTA Button - Exactly as in Layout.jpeg */}
            <button
              onClick={() => handleNavClick("contact")}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-none border border-black bg-transparent text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-200"
              id="nav-partner-btn"
            >
              PARTNER WITH US
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-black hover:bg-neutral-100 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-neutral-200 px-6 py-6 mt-3 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-3 font-semibold uppercase tracking-[0.2em] text-xs text-black">
              {navLinks.map((link, idx) => (
                <button
                  key={`mobile-${link.id}-${idx}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left py-2.5 border-b border-neutral-100 transition-colors ${
                    activeSection === link.id
                      ? "text-black font-bold"
                      : "text-neutral-700 hover:text-black"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  handleNavClick("contact");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 border border-black bg-black text-white font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2"
              >
                <span>PARTNER WITH US</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onOpenSubscribe();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 border border-neutral-300 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2"
              >
                <span>SUBSCRIBE</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
