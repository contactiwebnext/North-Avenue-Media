import React from "react";
import { ArrowRight, Sparkles, Globe, Award, BookOpen, Users } from "lucide-react";
import { Article } from "../types";

interface HeroSectionProps {
  coverArticle?: Article;
  onReadArticle?: (article: Article) => void;
  onExploreSection: (sectionId: string) => void;
  onPlayAudioPreview?: (article: Article) => void;
  onOpenSubscribe?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreSection,
}) => {
  return (
    <section id="hero" className="relative min-h-[600px] lg:min-h-[700px] flex items-center pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 overflow-hidden border-b border-neutral-200 bg-neutral-950">
      {/* Editorial Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://kwlri12qqowyib0q.public.blob.vercel-storage.com/Create_video_for_North_Avenue_202608250115.mp4"
          alt="High fashion editorial background"
          className="w-full h-full object-cover object-[70%_25%] opacity-45 scale-105 transition-transform duration-1000"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Multi-layered Editorial Overlays for Optimal Text Legibility & Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl text-white">
          {/* Eyebrow Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
            <span>THE VOICE OF THE NEXT ERA IN BEAUTY, FASHION &amp; CULTURE</span>
          </div>

          {/* Display Headline in Bold Luxury Serif */}
          <h1 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.02] uppercase mb-8 drop-shadow-sm">
            A NEW ERA<br />
            BEGINS.
          </h1>

          {/* Description Paragraph */}
          <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl mb-10 font-sans">
            North Avenue Media is an independent media platform covering the culture, business and innovation shaping the global beauty and fashion industry.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <button
              onClick={() => onExploreSection("latest")}
              className="px-8 py-4 bg-white text-black text-xs sm:text-sm font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group shadow-xl"
              id="hero-read-latest-btn"
            >
              <span>READ THE LATEST</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onExploreSection("contact")}
              className="px-8 py-4 bg-transparent border-2 border-white text-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors flex items-center justify-center backdrop-blur-sm"
              id="hero-partner-btn"
            >
              <span>PARTNER WITH US</span>
            </button>
          </div>

          {/* Publication Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-white/20">
            <div className="space-y-1">
              <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white block">45K+</span>
              <span className="text-xs text-neutral-400 uppercase tracking-wider block font-sans">Industry Leaders</span>
            </div>
            <div className="space-y-1">
              <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white block">18</span>
              <span className="text-xs text-neutral-400 uppercase tracking-wider block font-sans">Global Summits</span>
            </div>
            <div className="space-y-1">
              <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white block">120+</span>
              <span className="text-xs text-neutral-400 uppercase tracking-wider block font-sans">Annual Dossiers</span>
            </div>
            <div className="space-y-1">
              <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white block">30+</span>
              <span className="text-xs text-neutral-400 uppercase tracking-wider block font-sans">Global Markets</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
