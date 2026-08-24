import React, { useState } from "react";
import { Sparkles, Cpu, Dna, Layers, Leaf, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { InnovationItem } from "../types";

interface InnovationSectionProps {
  innovations: InnovationItem[];
  onSelectInnovation: (item: InnovationItem) => void;
}

export const InnovationSection: React.FC<InnovationSectionProps> = ({
  innovations,
  onSelectInnovation,
}) => {
  const [activeItem, setActiveItem] = useState<InnovationItem>(innovations[0]);

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case "Biotechnology":
        return <Dna className="w-4 h-4 text-[#d4af37]" />;
      case "Neuro-Cosmetics":
        return <Cpu className="w-4 h-4 text-[#d4af37]" />;
      case "Spatial Media":
        return <Layers className="w-4 h-4 text-[#d4af37]" />;
      case "Circular Packaging":
        return <Leaf className="w-4 h-4 text-[#d4af37]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#d4af37]" />;
    }
  };

  return (
    <section id="innovation" className="py-20 sm:py-28 relative border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#C5A059] text-xs font-bold uppercase tracking-[0.25em]">
              <span className="w-6 h-[1px] bg-[#C5A059]" />
              <span>THE FUTURE OF BEAUTY & MEDIA</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#FDFCF8] font-normal">
              Innovation & Emerging Technologies
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm font-sans">
            Spotlighting the synthetic biology, spatial media graphics, and bio-circular engineering dismantling beauty conventions.
          </p>
        </div>

        {/* Dynamic Innovation Spotlight Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Innovation List */}
          <div className="lg:col-span-6 space-y-4">
            {innovations.map((item) => {
              const isCurrent = activeItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    isCurrent
                      ? "bg-[#161616] border-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.2)]"
                      : "bg-[#121212]/80 border-white/5 hover:border-[#C5A059]/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getSectorIcon(item.sector)}
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">
                        {item.sector}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-neutral-300 font-mono">
                      {item.status}
                    </span>
                  </div>

                  <h3 className={`font-serif-luxury text-xl font-medium ${
                    isCurrent ? "text-[#FDFCF8]" : "text-neutral-300"
                  }`}>
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed line-clamp-2 font-sans">
                    {item.tagline}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right / Visual Breakdown Showcase */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-8 border border-[#C5A059]/30 relative overflow-hidden">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 img-zoom-container">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] text-xs font-semibold font-sans">
                  {activeItem.sector}
                </span>
                <div className="px-3 py-1 rounded-full bg-[#C5A059] text-black font-bold text-xs shadow-md font-sans">
                  {activeItem.metrics.label}: {activeItem.metrics.value}
                </div>
              </div>
            </div>

            <h3 className="font-serif-luxury text-2xl text-[#FDFCF8] mb-2">
              {activeItem.title}
            </h3>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
              {activeItem.description}
            </p>

            <div className="p-4 rounded-xl bg-black/50 border border-[#C5A059]/20 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
                Scientific & Engineering Breakthrough
              </span>
              <p className="text-xs text-neutral-200 leading-relaxed font-light font-sans">
                {activeItem.breakthrough}
              </p>
            </div>

            <button
              onClick={() => onSelectInnovation(activeItem)}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#C5A059] hover:text-black border border-[#C5A059]/30 text-xs font-bold uppercase tracking-wider text-[#E5D7BF] transition-all flex items-center justify-center gap-2 font-sans"
            >
              <span>Explore Technical Case Study</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
