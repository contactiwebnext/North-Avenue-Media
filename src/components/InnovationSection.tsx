import React, { useState } from "react";
import { Sparkles, Cpu, Dna, Layers, Leaf, ArrowRight, CheckCircle2 } from "lucide-react";
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
        return <Dna className="w-4 h-4 text-black" />;
      case "Neuro-Cosmetics":
        return <Cpu className="w-4 h-4 text-black" />;
      case "Spatial Media":
        return <Layers className="w-4 h-4 text-black" />;
      case "Circular Packaging":
        return <Leaf className="w-4 h-4 text-black" />;
      default:
        return <Sparkles className="w-4 h-4 text-black" />;
    }
  };

  return (
    <section id="innovation" className="py-20 sm:py-24 relative border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-3 text-black text-xs font-bold uppercase tracking-[0.25em]">
              <span className="w-6 h-[1.5px] bg-black" />
              <span>THE FUTURE OF BEAUTY &amp; MEDIA</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-black font-bold">
              Innovation &amp; Emerging Technologies
            </h2>
          </div>
          <p className="text-xs text-neutral-600 max-w-sm font-sans leading-relaxed">
            Spotlighting the synthetic biology, spatial media graphics, and bio-circular engineering dismantling beauty conventions.
          </p>
        </div>

        {/* Dynamic Innovation Spotlight Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Innovation List */}
          <div className="lg:col-span-6 space-y-3">
            {innovations.map((item) => {
              const isCurrent = activeItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`p-5 cursor-pointer transition-all border ${
                    isCurrent
                      ? "bg-neutral-50 border-black shadow-md"
                      : "bg-white border-neutral-200 hover:border-black"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getSectorIcon(item.sector)}
                      <span className="text-[11px] font-bold uppercase tracking-wider text-black font-sans">
                        {item.sector}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold uppercase">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-lg font-bold text-black mb-1.5 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-2 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right / Visual Showcase */}
          <div className="lg:col-span-6 border border-neutral-200 bg-neutral-50 overflow-hidden shadow-md">
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2.5 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                  {activeItem.sector}
                </span>
                <h4 className="font-serif-luxury text-xl font-bold text-white mt-1">
                  {activeItem.title}
                </h4>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed">
                {activeItem.description}
              </p>

              <div className="p-4 bg-white border border-neutral-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-black font-sans">
                    Market &amp; Scientific Breakthrough
                  </h5>
                  {activeItem.metrics && (
                    <span className="text-[11px] font-bold text-black font-sans">
                      {activeItem.metrics.label}: {activeItem.metrics.value}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  {activeItem.breakthrough}
                </p>
              </div>

              <button
                onClick={() => onSelectInnovation(activeItem)}
                className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>Read Full Technical Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
