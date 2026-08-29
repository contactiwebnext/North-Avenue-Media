import React from "react";
import { Globe2, Zap, BookOpen, Sparkles } from "lucide-react";
import { Logo } from "./Logo";

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
      desc: "Unearthing breakthroughs in synthetic biology, epigenetic skincare, neuro-olfaction, and spatial digital dermis.",
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
    <section id="about" className="py-20 sm:py-24 relative border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4 text-black text-xs font-bold uppercase tracking-[0.25em]">
          <span className="w-6 h-[1.5px] bg-black" />
          <span>ABOUT NORTH AVENUE MEDIA</span>
        </div>

        {/* Positioning Statement Headline */}
        <div className="max-w-4xl mb-16 flex flex-col md:flex-row gap-8 items-start">
          <div className="shrink-0 p-4 bg-neutral-900 border border-neutral-800 hidden sm:flex items-center justify-center">
            <Logo variant="stacked" theme="light" size="sm" />
          </div>
          <div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-black font-bold leading-tight mb-6">
              “The voice driving beauty’s next era in media, global events, industry insights, and innovation.”
            </h2>
            <p className="text-neutral-700 text-base sm:text-lg leading-relaxed font-normal font-sans">
              Founded as an independent international media platform, North Avenue Media bridges the gap between high-luxury aesthetic craftsmanship and rigorous industry intelligence. We cover the culture, business and innovation shaping the global beauty and fashion matrix.
            </p>
          </div>
        </div>

        {/* Strategic Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="border border-neutral-200 bg-white p-6 sm:p-7 hover:border-black transition-all shadow-sm group"
              >
                <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center text-black mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif-luxury text-xl text-black font-bold mb-2">
                  {p.title}
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Global Bureau Presence */}
        <div className="border border-neutral-200 bg-neutral-50 p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-neutral-600 uppercase font-sans">Global Footprint</span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-black mt-1">
                Editorial Bureaus &amp; Correspondent Desks
              </h3>
            </div>
            <p className="text-xs text-neutral-600 max-w-md font-sans leading-relaxed">
              Our journalists, olfactory critics, and cosmetic scientists report live from the key epicenters of global luxury and formulation innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bureaus.map((b, i) => (
              <div
                key={i}
                className="p-4 bg-white border border-neutral-200 flex items-start gap-3 hover:border-black transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-black mt-1.5 shrink-0" />
                <div>
                  <h4 className="font-serif-luxury text-base font-bold text-black">{b.city}</h4>
                  <p className="text-xs text-neutral-600 font-sans mt-0.5">{b.role}</p>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">{b.landmark}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
