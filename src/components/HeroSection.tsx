import React from "react";
import { ArrowUpRight, Volume2, Sparkles, Clock, TrendingUp, ShieldCheck, Newspaper, Flame } from "lucide-react";
import { Article } from "../types";
import heroBgImage from "../assets/images/hero_luxury_bg_1787600794156.jpg";

interface HeroSectionProps {
  coverArticle: Article;
  onReadArticle: (article: Article) => void;
  onExploreSection: (sectionId: string) => void;
  onPlayAudioPreview: (article: Article) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  coverArticle,
  onReadArticle,
  onExploreSection,
  onPlayAudioPreview,
}) => {
  return (
    <section id="hero" className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 overflow-hidden">
      {/* Background Image with Cinematic Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src={heroBgImage}
          alt="North Avenue Luxury Editorial Atmosphere"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Layered dark vignetting & brand gold tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/85 via-[#0A0A0A]/70 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C5A059]/10 via-transparent to-[#0A0A0A]/90" />
      </div>

      {/* Ambient background subtle radial accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#C5A059]/8 via-[#C5A059]/12 to-transparent blur-[130px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Statement Banner */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#C5A059]/35 text-xs font-semibold uppercase tracking-[0.25em] text-[#E5D7BF] mb-6 shadow-[0_0_15px_rgba(197,160,89,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>GLOBAL BEAUTY & MEDIA INTELLIGENCE</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#FDFCF8] tracking-tight mb-6">
            The voice driving beauty’s next era in{" "}
            <span className="italic font-light text-gold-gradient">media, global events,</span>{" "}
            industry insights, and innovation.
          </h1>

          <p className="text-neutral-300 text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            Where luxury culture, biotechnology breakthroughs, and high-level market intelligence converge to shape the future of aesthetic discourse.
          </p>

          {/* Quick Pillar Jump Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-8">
            {[
              { label: "Haute Formulations", id: "editorial" },
              { label: "Global Summits", id: "events" },
              { label: "Quarterly Intelligence", id: "insights" },
              { label: "Biotech & AI", id: "innovation" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onExploreSection(item.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#141414] border border-[#C5A059]/20 text-neutral-300 hover:text-[#C5A059] hover:border-[#C5A059]/60 hover:bg-[#1A1A1A] transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dual Grid: Cover Story + Executive Intelligence Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left / Lead Cover Story Card */}
          <div className="lg:col-span-7 flex flex-col justify-between glass-panel rounded-2xl p-6 sm:p-8 border border-[#C5A059]/20 hover:border-[#C5A059]/45 transition-all group">
            <div>
              {/* Category & Metadata */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#FDFCF8] text-[11px] font-bold uppercase tracking-widest">
                  ★ THE COVER ESSAY
                </span>
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    {coverArticle.readTime}
                  </span>
                  <span>•</span>
                  <span>{coverArticle.publishedAt}</span>
                </div>
              </div>

              {/* Cover Image Container */}
              <div className="relative rounded-xl overflow-hidden mb-6 aspect-[16/9] img-zoom-container">
                <img
                  src={coverArticle.heroImage}
                  alt={coverArticle.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />

                {/* Listen to Audio Briefing button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayAudioPreview(coverArticle);
                  }}
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-[#C5A059]/40 text-[#E5D7BF] text-xs font-medium hover:bg-[#C5A059] hover:text-black transition-all shadow-lg"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen to Editorial Briefing</span>
                </button>
              </div>

              {/* Headline & Subtitle */}
              <h2
                onClick={() => onReadArticle(coverArticle)}
                className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#FDFCF8] group-hover:text-[#C5A059] cursor-pointer transition-colors leading-tight mb-3"
              >
                {coverArticle.title}
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 font-sans">
                {coverArticle.subtitle}
              </p>
            </div>

            {/* Author Footer & Read CTA */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={coverArticle.author.avatar}
                  alt={coverArticle.author.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#C5A059]/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-xs font-semibold text-[#FDFCF8]">{coverArticle.author.name}</p>
                  <p className="text-[11px] text-neutral-400">{coverArticle.author.role}</p>
                </div>
              </div>

              <button
                onClick={() => onReadArticle(coverArticle)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-[#C5A059] hover:text-black text-[#E5D7BF] text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>Read Full Story</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right / Executive Editorial Intelligence Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Today's Editorial Pulse / Key Insights Panel */}
            <div className="flex-1 glass-panel rounded-2xl p-6 border border-[#C5A059]/25 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#C5A059]" />
                    <span className="font-semibold text-xs tracking-wider uppercase text-[#FDFCF8]">
                      Executive Editorial Dispatch
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">
                    Daily Briefing
                  </span>
                </div>

                <div className="space-y-4">
                  <div
                    onClick={() => onExploreSection("editorial")}
                    className="group cursor-pointer p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#C5A059]/40 transition-all"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#C5A059] mb-1">
                      <span>Haute Formulations</span>
                      <span className="text-neutral-500 font-normal">Paris Bureau</span>
                    </div>
                    <h4 className="font-serif-luxury text-sm text-[#FDFCF8] group-hover:text-[#C5A059] transition-colors leading-snug">
                      Algorithmic Sillage: The High-Art Fragrance Revolution Meets Neuro-Olfaction
                    </h4>
                  </div>

                  <div
                    onClick={() => onExploreSection("insights")}
                    className="group cursor-pointer p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#C5A059]/40 transition-all"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#C5A059] mb-1">
                      <span>Market Valuation</span>
                      <span className="text-neutral-500 font-normal">New York</span>
                    </div>
                    <h4 className="font-serif-luxury text-sm text-[#FDFCF8] group-hover:text-[#C5A059] transition-colors leading-snug">
                      Q3 2026 Ultra-Prestige Beauty M&A & Private Equity Index
                    </h4>
                  </div>

                  <div
                    onClick={() => onExploreSection("events")}
                    className="group cursor-pointer p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#C5A059]/40 transition-all"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#C5A059] mb-1">
                      <span>Global Summit</span>
                      <span className="text-neutral-500 font-normal">Milan</span>
                    </div>
                    <h4 className="font-serif-luxury text-sm text-[#FDFCF8] group-hover:text-[#C5A059] transition-colors leading-snug">
                      Milano Global Beauty & Aesthetic Forum • Accreditations Open
                    </h4>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  Curated by North Avenue Board
                </span>
                <button
                  onClick={() => onExploreSection("editorial")}
                  className="text-[#C5A059] hover:underline font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1"
                >
                  <span>View All Stories</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Real-time Global Intelligence Counter */}
            <div className="glass-panel rounded-xl p-5 border border-[#C5A059]/15 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#C5A059]">7</div>
                <div className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">Global Bureaus</div>
              </div>
              <div className="border-x border-white/10">
                <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#FDFCF8]">$680B</div>
                <div className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">Market Tracked</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#C5A059]">100%</div>
                <div className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">Editorial Integrity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
