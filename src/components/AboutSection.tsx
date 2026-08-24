import React from "react";
import { Sparkles, Globe2, Award, Zap, BookOpen, Users, Compass, CheckCircle2 } from "lucide-react";

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: BookOpen,
      title: "Beauty & Fashion Media",
      desc: "In-depth investigative journalism, cultural criticism, and creative direction spotlighting the visionary voices shaping global aesthetic standards.",
    },
    {
      icon: Globe2,
      title: "Global Events & Summits",
      desc: "Convening world-class summits in Paris, Milan, New York, Tokyo, Seoul, and Dubai to connect creators, founders, scientists, and executives.",
    },
    {
      icon: Zap,
      title: "Industry Insights & Intelligence",
      desc: "Data-driven market indexes, private equity analyses, consumer psychographics, and clinical biotechnology validation reports.",
    },
    {
      icon: Sparkles,
      title: "Innovation & Future Tech",
      desc: "Unearthing the breakthroughs in synthetic biology, epigenetic skincare, neuro-olfaction, and spatial digital dermis.",
    },
  ];

  const bureaus = [
    { city: "Paris", role: "European Haute Bureau & Science Desk", landmark: "Palais de Tokyo" },
    { city: "New York", role: "Global Commercial & Private Equity Desk", landmark: "Hudson Yards" },
    { city: "Milan", role: "Design, Packaging & Olfactory Atelier", landmark: "Via Montenapoleone" },
    { city: "Tokyo & Seoul", role: "Asia-Pacific Bio-Aesthetics & Tech Lab", landmark: "DDP & Roppongi" },
    { city: "Dubai", role: "Middle East Luxe Conclave & Fragrance Bureau", landmark: "DIFC" },
    { city: "London", role: "Creative Direction & Cultural Analysis", landmark: "Mayfair" },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 relative border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4 text-[#C5A059] text-xs font-bold uppercase tracking-[0.25em]">
          <span className="w-6 h-[1px] bg-[#C5A059]" />
          <span>ABOUT NORTH AVENUE MEDIA</span>
        </div>

        {/* Positioning Statement Headline */}
        <div className="max-w-4xl mb-16">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#FDFCF8] leading-tight mb-6">
            “The voice driving beauty’s next era in media, global events, industry insights, and innovation.”
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light font-sans">
            Founded as an independent international media house, North Avenue Media bridges the traditional divide between high-luxury aesthetic craftsmanship and rigorous scientific intelligence. We champion the creators, biochemists, visionary executives, and cultural leaders redefining global beauty.
          </p>
        </div>

        {/* Strategic Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="glass-panel rounded-xl p-6 border border-[#C5A059]/15 hover:border-[#C5A059]/45 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/25 flex items-center justify-center text-[#C5A059] mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif-luxury text-xl text-[#FDFCF8] font-medium mb-2 group-hover:text-[#C5A059] transition-colors">
                  {p.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Global Bureau Presence */}
        <div className="glass-panel rounded-2xl p-8 sm:p-10 border border-[#C5A059]/20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-[#C5A059] uppercase">Global Footprint</span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FDFCF8] mt-1">
                Editorial Bureaus & Correspondent Desks
              </h3>
            </div>
            <p className="text-xs text-neutral-400 max-w-md font-sans">
              Our journalists, olfactory critics, and cosmetic scientists report live from the key epicenters of global luxury and formulation innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bureaus.map((b, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#C5A059]/40 hover:bg-white/[0.04] transition-all flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-[#C5A059] mt-1.5 shrink-0 shadow-[0_0_6px_#C5A059]" />
                <div>
                  <h4 className="font-serif-luxury text-base text-[#FDFCF8] font-semibold">{b.city}</h4>
                  <p className="text-xs text-[#C5A059] font-medium">{b.role}</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5 font-sans">{b.landmark}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
